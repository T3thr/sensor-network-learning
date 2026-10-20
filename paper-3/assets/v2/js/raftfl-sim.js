/* Raft failover simulator for Paper III Version 2 (Raft-FL, SEAMS 2024, IEEE Doc ID: 10556381).
   A teaching model, not a full Raft: every node is a sensor-network gateway that is both an FL node
   and a Raft member. Rules kept from Raft and from the paper:
   - randomised election timeout (150-300 ms of simulated time), heartbeat every 60 ms;
   - a candidate needs votes from a majority of ALL members (not only live ones);
   - a node only votes for a candidate whose checkpoint round is at least its own;
   - the leader (= FL aggregator) finishes one FL round every 420 ms and replicates the checkpoint;
     the round is committed only when a majority of all members acknowledged it (Level 3).
   Simulated milliseconds are not comparable with the 1.27-3.76 s measured in the paper. */
(function () {
  'use strict';
  const P = window.RAFTFL_PREFIX || '';
  const svg = document.getElementById(P + 'sim-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (id) => document.getElementById(P + id);
  const W = 560, H = 460, CX = 280, CY = 220, R = 165;
  const HB = 60, ROUND = 420, TARGET = 30;
  const COLORS = { follower: '#3B82F6', candidate: '#F59E0B', leader: '#10B981', down: '#64748B' };

  let nodes = [], msgs = [], now = 0, running = false, last = 0, speed = 0.25, raf = 0;
  let term = 0, committed = 0, msgCount = 0, crashAt = null, lastFailover = null, finished = false;

  const rnd = (a, b) => a + Math.random() * (b - a);
  const quorum = () => Math.floor(nodes.length / 2) + 1;
  const alive = () => nodes.filter((n) => n.up);
  const leader = () => nodes.find((n) => n.up && n.role === 'leader');

  function log(text, cls) {
    const el = $('sim-log');
    const line = document.createElement('div');
    if (cls) line.className = cls;
    line.textContent = `[${String(Math.round(now)).padStart(5, ' ')} ms] ${text}`;
    el.prepend(line);
    while (el.childNodes.length > 80) el.removeChild(el.lastChild);
  }

  function init(n) {
    nodes = Array.from({ length: n }, (_, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return { id: i + 1, x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), up: true, role: 'follower', term: 0, voted: null, votes: 0, timer: rnd(150, 300), limit: 0, hb: 0, round: 0, acks: new Set(), pending: 0, train: ROUND };
    });
    nodes.forEach((x) => { x.limit = x.timer; });
    msgs = []; now = 0; term = 0; committed = 0; msgCount = 0; crashAt = null; lastFailover = null; finished = false;
    $('sim-log').innerHTML = '';
    log(`สร้างคลัสเตอร์ ${n} เกตเวย์ quorum = ${quorum()} เสียง ทนการดับพร้อมกันได้ ${Math.floor((n - 1) / 2)} โหนด`);
    if (n === 2) log('N = 2: ถ้าดับ 1 โหนดจะเหลือ 1 ใน 2 ซึ่งต่ำกว่า quorum (ตรงกับจุด 1 worker ใน Fig. 3)', 'warn');
    buildSvg(); render(); kpis();
  }

  function send(from, to, type, data) {
    msgCount += 1;
    msgs.push({ from, to, type, data, t0: now, dur: rnd(18, 34) });
  }

  function becomeFollower(n, t) { n.role = 'follower'; n.term = t; n.voted = null; n.timer = n.limit = rnd(150, 300); }

  function startElection(n) {
    n.role = 'candidate'; n.term += 1; n.voted = n.id; n.votes = 1;
    term = Math.max(term, n.term);
    n.timer = n.limit = rnd(150, 300);
    if (!n.warned) log(`GW${n.id} หมด election timeout: เป็น candidate term ${n.term} ขอคะแนนเสียง`);
    nodes.forEach((m) => { if (m !== n) send(n, m, 'vote-req', { term: n.term, round: n.round }); });
    if (n.votes >= quorum()) becomeLeader(n);
  }

  function becomeLeader(n) {
    n.role = 'leader'; n.hb = 0; n.train = ROUND; n.pending = 0; n.acks = new Set();
    if (crashAt !== null) { lastFailover = now - crashAt; crashAt = null; log(`GW${n.id} ชนะ term ${n.term} เป็น aggregator ใหม่ ใช้เวลาเลือกใหม่ ${Math.round(lastFailover)} ms และฝึกต่อจากรอบ ${n.round + 1}`, 'ok'); }
    else log(`GW${n.id} ชนะ term ${n.term} ด้วยเสียงข้างมาก เป็น aggregator`, 'ok');
    heartbeat(n);
  }

  function heartbeat(n) { nodes.forEach((m) => { if (m !== n) send(n, m, 'hb', { term: n.term, round: n.round }); }); }

  function deliver(m) {
    const to = m.to, from = m.from;
    if (!to.up) return; // lost: the receiver is down
    const d = m.data;
    if (d.term > to.term) becomeFollower(to, d.term);
    if (m.type === 'hb') {
      if (d.term >= to.term) { if (to.role !== 'follower') becomeFollower(to, d.term); to.timer = to.limit = rnd(150, 300); }
    } else if (m.type === 'vote-req') {
      const grant = d.term >= to.term && (to.voted === null || to.voted === from.id) && d.round >= to.round && to.role !== 'leader';
      if (grant) { to.voted = from.id; to.timer = to.limit = rnd(150, 300); }
      if (from.up) send(to, from, 'vote', { term: to.term, granted: grant });
    } else if (m.type === 'vote') {
      if (to.role === 'candidate' && d.granted && d.term === to.term) {
        to.votes += 1;
        if (to.votes >= quorum()) becomeLeader(to);
      }
    } else if (m.type === 'append') {
      if (d.term >= to.term) {
        if (to.role !== 'follower') becomeFollower(to, d.term);
        to.timer = to.limit = rnd(150, 300);
        to.round = Math.max(to.round, d.round);
        if (from.up) send(to, from, 'ack', { term: to.term, round: d.round });
      }
    } else if (m.type === 'ack') {
      if (to.role === 'leader' && d.round === to.pending) {
        to.acks.add(from.id);
        if (to.acks.size + 1 >= quorum()) {
          to.round = to.pending; committed = Math.max(committed, to.round); to.pending = 0;
          if (committed === TARGET && !finished) { finished = true; log(`ฝึกครบ ${TARGET} รอบ ได้ converged model`, 'ok'); }
        }
      }
    }
  }

  function step(dt) {
    now += dt;
    // deliver messages whose travel time is over
    const due = msgs.filter((m) => now - m.t0 >= m.dur);
    msgs = msgs.filter((m) => now - m.t0 < m.dur);
    due.forEach(deliver);
    nodes.forEach((n) => {
      if (!n.up) return;
      if (n.role === 'leader') {
        n.hb -= dt;
        if (n.hb <= 0) { heartbeat(n); n.hb = HB; }
        if (!finished) {
          n.train -= dt;
          if (n.train <= 0) {
            n.train = ROUND;
            if (n.pending) { if (n.stuck !== n.pending) { n.stuck = n.pending; log(`checkpoint รอบ ${n.pending} ยัง commit ไม่ได้: ได้ ack ${n.acks.size + 1} จาก quorum ${quorum()}`, 'warn'); } }
            else {
              n.pending = n.round + 1; n.acks = new Set();
              nodes.forEach((m) => { if (m !== n) send(n, m, 'append', { term: n.term, round: n.pending }); });
            }
          }
        }
      } else {
        n.timer -= dt;
        if (n.timer <= 0) {
          if (alive().length < quorum() && n.role === 'candidate') {
            // keeps retrying but can never win; log once per node per term
            if (!n.warned) { log(`GW${n.id} เลือกตั้งไม่สำเร็จ: ทำงานอยู่ ${alive().length} โหนด ต้องการ ${quorum()} เสียง`, 'warn'); n.warned = true; }
          }
          startElection(n);
        }
      }
    });
  }

  // ---------- drawing ----------
  let gLinks, gMsgs, gNodes;
  function el(tag, attrs, parent) { const e = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); if (parent) parent.appendChild(e); return e; }
  function buildSvg() {
    svg.innerHTML = '';
    el('rect', { x: 0, y: 0, width: W, height: H, fill: 'transparent' }, svg);
    gLinks = el('g', {}, svg); gMsgs = el('g', {}, svg); gNodes = el('g', {}, svg);
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      el('line', { x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, stroke: '#94A3B8', 'stroke-opacity': 0.18, 'stroke-width': 1 }, gLinks);
    }
    nodes.forEach((n) => {
      const g = el('g', { cursor: 'pointer' }, gNodes);
      n.ring = el('circle', { cx: n.x, cy: n.y, r: 31, fill: 'none', stroke: '#94A3B8', 'stroke-width': 4, 'stroke-opacity': 0.25 }, g);
      n.arc = el('circle', { cx: n.x, cy: n.y, r: 31, fill: 'none', stroke: '#F59E0B', 'stroke-width': 4, transform: `rotate(-90 ${n.x} ${n.y})`, 'stroke-dasharray': `${2 * Math.PI * 31}`, 'stroke-dashoffset': 0 }, g);
      n.body = el('circle', { cx: n.x, cy: n.y, r: 26, fill: COLORS.follower }, g);
      n.label = el('text', { x: n.x, y: n.y - 2, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 700, fill: '#FFFFFF', 'font-family': 'Tahoma, sans-serif' }, g);
      n.label.textContent = `GW${n.id}`;
      n.sub = el('text', { x: n.x, y: n.y + 13, 'text-anchor': 'middle', 'font-size': 10, fill: '#FFFFFF', 'font-family': 'Tahoma, sans-serif' }, g);
      const ty = n.y > CY ? n.y + 50 : n.y - 42;
      n.tag = el('text', { x: n.x, y: ty, 'text-anchor': 'middle', 'font-size': 11, fill: 'currentColor', 'font-family': 'Tahoma, sans-serif' }, g);
      g.addEventListener('click', () => toggleNode(n));
    });
    const c = el('text', { x: CX, y: CY - 6, 'text-anchor': 'middle', 'font-size': 13, fill: '#94A3B8', 'font-family': 'Tahoma, sans-serif' }, svg);
    c.textContent = 'คลัสเตอร์เกตเวย์';
    svg.status = el('text', { x: CX, y: CY + 14, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 700, fill: '#10B981', 'font-family': 'Tahoma, sans-serif' }, svg);
  }
  const msgColor = { hb: '#10B981', 'vote-req': '#F59E0B', vote: '#FBBF24', append: '#3B82F6', ack: '#93C5FD' };
  function render() {
    nodes.forEach((n) => {
      const role = n.up ? n.role : 'down';
      n.body.setAttribute('fill', COLORS[role]);
      n.sub.textContent = n.up ? `t${n.term} · r${n.round}` : 'ดับ';
      n.tag.textContent = role === 'leader' ? 'aggregator' : (role === 'candidate' ? `ได้ ${n.votes}/${quorum()} เสียง` : '');
      const frac = n.up && n.role !== 'leader' ? Math.max(0, n.timer / n.limit) : 0;
      n.arc.setAttribute('stroke-dashoffset', `${2 * Math.PI * 31 * (1 - frac)}`);
      n.arc.setAttribute('stroke', n.role === 'candidate' ? '#F59E0B' : '#60A5FA');
    });
    gMsgs.innerHTML = '';
    msgs.forEach((m) => {
      const p = Math.min(1, (now - m.t0) / m.dur);
      el('circle', { cx: m.from.x + (m.to.x - m.from.x) * p, cy: m.from.y + (m.to.y - m.from.y) * p, r: m.type === 'append' ? 5 : 3.5, fill: msgColor[m.type] }, gMsgs);
    });
    const L = leader();
    const ok = alive().length >= quorum();
    svg.status.textContent = !ok ? (L ? `GW${L.id} ยังเป็น leader แต่ commit ไม่ได้` : 'ต่ำกว่า quorum: ระบบหยุด') : (L ? `aggregator: GW${L.id}` : 'กำลังเลือกตั้ง');
    svg.status.setAttribute('fill', !ok ? '#EF4444' : (L ? '#10B981' : '#F59E0B'));
  }
  function kpis() {
    const L = leader();
    $('k-term').textContent = term;
    $('k-leader').textContent = L ? `GW${L.id}` : '-';
    $('k-quorum').textContent = `${alive().length}/${quorum()}`;
    $('k-quorum-box').classList.toggle('bad', alive().length < quorum());
    $('k-quorum-box').classList.toggle('ok', alive().length >= quorum());
    $('k-round').textContent = `${committed}/${TARGET}`;
    $('k-failover').textContent = lastFailover === null ? '-' : Math.round(lastFailover);
    $('k-msgs').textContent = msgCount;
  }

  function toggleNode(n) {
    if (n.up) crash(n); else { n.up = true; becomeFollower(n, n.term); n.warned = false; log(`GW${n.id} กลับมาทำงานเป็น follower (checkpoint รอบ ${n.round})`); }
    render(); kpis();
  }
  function crash(n) {
    if (!n.up) return;
    const wasLeader = n.role === 'leader';
    n.up = false;
    if (wasLeader) { crashAt = now; log(`GW${n.id} (aggregator) ดับ: worker จะรอจนหมด election timeout`, 'warn'); }
    else log(`GW${n.id} ดับ`);
    if (alive().length < quorum()) log(`เหลือ ${alive().length} จาก ${nodes.length} โหนด ต่ำกว่า quorum ${quorum()}: เลือกผู้นำและ commit checkpoint ไม่ได้`, 'warn');
  }

  function loop(ts) {
    if (!running) return;
    let dt = Math.min(50, (ts - last)) * speed; last = ts;
    while (dt > 0) { const s = Math.min(5, dt); step(s); dt -= s; }
    render(); kpis();
    raf = requestAnimationFrame(loop);
  }
  function setRunning(v) {
    running = v; $('sim-run').textContent = v ? 'หยุดชั่วคราว' : 'เริ่ม';
    if (v) { last = performance.now(); raf = requestAnimationFrame(loop); } else cancelAnimationFrame(raf);
  }

  $('sim-run').addEventListener('click', () => setRunning(!running));
  $('sim-crash-leader').addEventListener('click', () => { const L = leader(); if (L) crash(L); else log('ยังไม่มี leader ให้ปิด (รอการเลือกตั้ง)'); render(); kpis(); });
  $('sim-crash-random').addEventListener('click', () => { const a = alive(); if (a.length) crash(a[Math.floor(Math.random() * a.length)]); render(); kpis(); });
  $('sim-heal').addEventListener('click', () => { nodes.forEach((n) => { if (!n.up) { n.up = true; becomeFollower(n, n.term); n.warned = false; } }); log('เปิดทุกโหนดกลับมาเป็น follower'); render(); kpis(); });
  $('sim-reset').addEventListener('click', () => { setRunning(false); init(+$('sim-n').value); });
  $('sim-n').addEventListener('input', (e) => { $('sim-n-val').textContent = e.target.value; setRunning(false); init(+e.target.value); });
  $('sim-speed').addEventListener('input', (e) => { speed = +e.target.value / 100; $('sim-speed-val').textContent = `${speed.toFixed(2)}x`; });

  init(5);
  // expose for automated checks
  window.RAFTFL_SIM = { state: () => ({ now, term, committed, alive: alive().length, quorum: quorum(), leader: leader() ? leader().id : null, lastFailover }), step: (ms) => { for (let t = 0; t < ms; t += 5) step(5); render(); kpis(); }, crashLeader: () => { const L = leader(); if (L) crash(L); }, crash: (id) => crash(nodes[id - 1]), init };
})();
