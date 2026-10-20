/* Paper III Version 2 (Raft-FL) page logic: quorum and traffic calculators, rehearsal studio,
   Q&A accordion with drill mode, quiz markup, paper page viewer and BibTeX copy.
   Data comes from raftfl-data.js (generated from .build_v2/deck_v2.js and qna_v2.js).
   The quiz and the copy button are rendered here synchronously so that common.js (loaded after
   this file) binds its standard .quiz-card and .copy-btn handlers to them. */
(function () {
  'use strict';
  const D = window.RAFTFL_DATA;
  // On the combined Paper III page every v2 element id carries the prefix set in RAFTFL_PREFIX ("v2-")
  // and v2 images live under RAFTFL_ASSETS ("assets/v2/").
  const P = window.RAFTFL_PREFIX || '';
  const BASE = window.RAFTFL_ASSETS || 'assets/';
  const $ = (id) => document.getElementById(P + id);
  const visible = (el) => !!el && el.offsetParent !== null;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const bold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const mmss = (s) => { s = Math.max(0, Math.floor(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };

  // ---------- quorum calculator ----------
  (function quorum() {
    const r = $('q-n'); if (!r) return;
    const draw = () => {
      const n = +r.value; $('q-n-val').textContent = n;
      const q = Math.floor(n / 2) + 1, f = Math.floor((n - 1) / 2);
      let note = '';
      if (n === 2) note = '\n=> ตรงกับจุด 1 worker ใน Fig. 3: ดับ aggregator แล้วเหลือ 1 ใน 2 โหนด ต่ำกว่า quorum';
      else if (n === 11) note = '\n=> ขนาดคลัสเตอร์ในการทดลองของบทความ (1 aggregator + 10 worker)';
      else if (n % 2 === 0) note = `\n=> เลขคู่ไม่เพิ่มความทนทาน: N = ${n} ทนได้ ${f} โหนด เท่ากับ N = ${n - 1}`;
      $('q-out').textContent = `Q     = floor(${n}/2) + 1 = ${q} เสียง\nf_max = floor((${n}-1)/2) = ${f} โหนดที่ดับพร้อมกันได้${note}`;
    };
    r.addEventListener('input', draw); draw();
  })();

  // ---------- traffic calculator (Fig. 3 and Fig. 4 values) ----------
  (function traffic() {
    const r = $('t-w'); if (!r) return;
    const re = [1.27, 1.33, 1.46, 1.7, 1.97, 2.25, 2.47, 2.76, 3.13, 3.76];
    const base = [0.98, 2.15, 3.1, 4.06, 5.02, 5.97, 6.93, 7.88, 8.84, 9.8];
    const raft = [1.77, 5.17, 7.94, 10.9, 16, 22.6, 29.3, 36.8, 43.9, 49.1];
    const max = 49.1;
    const draw = () => {
      const w = +r.value, i = w - 1; $('t-w-val').textContent = w;
      $('t-bars').innerHTML =
        `<div>Flower เดิม</div><div class="v2-bar-track"><div class="v2-bar base" style="width:${(base[i] / max) * 100}%"></div></div><div class="v2-bar-val">${base[i].toFixed(2)} MB</div>` +
        `<div>มี Raft</div><div class="v2-bar-track"><div class="v2-bar raft" style="width:${(raft[i] / max) * 100}%"></div></div><div class="v2-bar-val">${raft[i]} MB</div>`;
      const ratio = raft[i] / base[i];
      const extra = i > 0 ? ` · ทราฟฟิกแบบมี Raft เพิ่มจาก ${w - 1} worker อีก <strong>${(raft[i] - raft[i - 1]).toFixed(2)} MB</strong> (Flower เดิมเพิ่ม ${(base[i] - base[i - 1]).toFixed(2)} MB)` : '';
      $('t-out').innerHTML = `ที่ <strong>${w} worker</strong>: เลือก aggregator ใหม่ใช้ <strong>${re[i]} วินาที</strong> · ทราฟฟิกสูงกว่าเดิม <strong>${ratio.toFixed(2)} เท่า</strong>${extra}`;
    };
    r.addEventListener('input', draw); draw();
  })();

  // ---------- rehearsal studio ----------
  (function studio() {
    const stages = D.stages, total = D.meta.totalSeconds, CAP = 300;
    const tl = $('st-timeline'); if (!tl) return;
    tl.style.gridTemplateColumns = stages.map((s) => `${s.end - s.start}fr`).join(' ');
    tl.innerHTML = stages.map((s, i) => `<div class="st-seg" data-i="${i}" title="${esc(s.slideTitle)}"><div class="fill"></div><span>${i + 1} · ${mmss(s.start)}</span></div>`).join('');
    const segs = [...tl.children];
    $('st-words').textContent = `บทพูด ${D.totalWords} คำ (ICU) ที่ ${D.planWpm} คำต่อนาที`;

    let elapsed = 0, running = false, last = 0, cur = 0, raf = 0;
    const auto = () => document.querySelector('input[name="st-mode"]:checked').value === 'auto';
    const stageAt = (t) => { for (let i = stages.length - 1; i >= 0; i--) if (t >= stages[i].start) return i; return 0; };

    function renderPrompter(i) {
      const s = stages[i];
      const html = s.paragraphs.map((p) => '<p>' + esc(p)
        .replace(/\[\[(.+?)\]\]/g, '<span class="cut" title="ประโยคสำรอง ตัดได้ถ้าเวลาไม่พอ">$1</span>')
        .replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>')
        .replace(/\{b\}/g, '<span class="br" title="จุดหายใจ">/</span>') + '</p>').join('');
      $('st-prompter').innerHTML = `<h3>${esc(s.title)} (${mmss(s.start)} ถึง ${mmss(s.end)})</h3><div class="kw">คำสำคัญ: ${esc(s.keywords.join(' · '))} · ${s.words} คำ</div>${html}<div class="v2-src">ข้อความขีดเส้นประคือประโยคสำรองที่ตัดได้ เครื่องหมาย / คือจุดหายใจ</div>`;
      $('st-img').src = `${BASE}slides/slide-${i + 1}.png`;
      $('st-img').alt = `สไลด์ที่ ${i + 1}: ${s.slideTitle}`;
    }
    function setStage(i) { cur = Math.max(0, Math.min(stages.length - 1, i)); renderPrompter(cur); paint(); }
    function paint() {
      $('st-clock').textContent = mmss(elapsed);
      $('st-clock').classList.toggle('over', elapsed > CAP);
      segs.forEach((el, i) => {
        const s = stages[i];
        el.classList.toggle('active', i === cur);
        const frac = Math.max(0, Math.min(1, (elapsed - s.start) / (s.end - s.start)));
        el.classList.toggle('done', elapsed >= s.end);
        el.querySelector('.fill').style.width = `${frac * 100}%`;
      });
      const pace = $('st-pace');
      if (!running && elapsed === 0) { pace.textContent = 'พร้อม'; pace.className = 'st-pace on'; return; }
      if (auto()) { pace.textContent = elapsed > total ? `เกินเป้าหมาย ${mmss(elapsed - total)}` : 'ตามเวลา'; pace.className = 'st-pace ' + (elapsed > total ? 'behind' : 'on'); return; }
      const planned = stages[cur].end;
      const diff = elapsed - planned;
      if (elapsed < stages[cur].start) { pace.textContent = `เร็วกว่าแผน ${mmss(stages[cur].start - elapsed)}`; pace.className = 'st-pace ahead'; }
      else if (diff > 0) { pace.textContent = `ช้ากว่าแผน ${mmss(diff)}`; pace.className = 'st-pace behind'; }
      else { pace.textContent = 'ตรงแผน'; pace.className = 'st-pace on'; }
    }
    function tick(ts) {
      if (!running) return;
      elapsed += (ts - last) / 1000; last = ts;
      if (auto()) { const i = stageAt(elapsed); if (i !== cur) setStage(i); }
      paint();
      raf = requestAnimationFrame(tick);
    }
    function toggle() {
      running = !running;
      $('st-start').textContent = running ? 'หยุดชั่วคราว' : (elapsed > 0 ? 'ทำต่อ' : 'เริ่ม');
      if (running) { last = performance.now(); raf = requestAnimationFrame(tick); } else cancelAnimationFrame(raf);
      paint();
    }
    function finish() {
      if (elapsed < 20) return;
      const runs = store.get('raftfl_runs', []);
      runs.unshift({ at: new Date().toLocaleString('th-TH'), secs: Math.round(elapsed), mode: auto() ? 'ตามเวลา' : 'เลื่อนเอง' });
      store.set('raftfl_runs', runs.slice(0, 10));
      drawLog();
    }
    function reset() { finish(); running = false; cancelAnimationFrame(raf); elapsed = 0; $('st-start').textContent = 'เริ่ม'; setStage(0); }
    function drawLog() {
      const runs = store.get('raftfl_runs', []);
      $('st-log').innerHTML = runs.length
        ? '<table><tr><th>รอบซ้อม</th><th>เวลา</th><th>ผล</th></tr>' + runs.map((r) => `<tr><td>${esc(r.at)}</td><td>${mmss(r.secs)}</td><td>${r.secs > 300 ? '<span class="v2-pill red">เกิน 5:00</span>' : (r.secs >= 270 && r.secs <= 295 ? '<span class="v2-pill green">อยู่ในช่วง</span>' : '<span class="v2-pill">นอกช่วง 4:30-4:55</span>')}</td></tr>`).join('') + '</table>'
        : '<p class="st-sub" style="margin-top:10px;">ยังไม่มีบันทึกการซ้อม กดรีเซ็ตหลังซ้อมจบเพื่อบันทึกเวลา (เก็บในเบราว์เซอร์นี้เท่านั้น)</p>';
    }
    $('st-start').addEventListener('click', toggle);
    $('st-reset').addEventListener('click', reset);
    $('st-next').addEventListener('click', () => { if (auto()) { elapsed = stages[Math.min(cur + 1, stages.length - 1)].start; } setStage(cur + 1); });
    $('st-prev').addEventListener('click', () => { if (auto()) { elapsed = stages[Math.max(cur - 1, 0)].start; } setStage(cur - 1); });
    segs.forEach((el) => el.addEventListener('click', () => { const i = +el.dataset.i; if (auto()) elapsed = stages[i].start; setStage(i); }));
    $('st-big').addEventListener('change', (e) => $('st-prompter').classList.toggle('big', e.target.checked));
    // Capture phase on window: runs before other page handlers, so when the v2 panel is showing the
    // hidden v1 studio does not also react to Space and the arrow keys.
    window.addEventListener('keydown', (e) => {
      const sec = $('sec-rehearsal');
      if (!visible(sec)) return;
      if (!['Space', 'ArrowRight', 'ArrowLeft'].includes(e.code)) return;
      if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
      e.stopImmediatePropagation();
      const r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.code === 'Space') { if (document.activeElement.tagName === 'BUTTON') return; e.preventDefault(); toggle(); }
      else if (e.code === 'ArrowRight') $('st-next').click();
      else if (e.code === 'ArrowLeft') $('st-prev').click();
    }, true);
    setStage(0); drawLog();
  })();

  // ---------- Q&A accordion ----------
  (function qna() {
    const list = $('qa-list'); if (!list) return;
    const catLabel = (k) => (D.categories.find((c) => c.key === k) || {}).label || k;
    list.innerHTML = D.qna.map((it, i) => `
      <div class="qa-item" data-cat="${it.cat}" data-i="${i}">
        <button class="qa-q" aria-expanded="false"><span class="n">${i + 1}.</span><span>${esc(it.q)} <span class="v2-pill" style="margin-left:6px;">${esc(catLabel(it.cat))}</span></span><span class="chev">&#9656;</span></button>
        <div class="qa-a">
          <div class="short"><strong>ตอบสั้น:</strong> ${bold(it.short)}</div>
          <p>${bold(it.answer)}</p>
          <div class="meta"><strong>กรรมการต้องการตรวจ:</strong> ${esc(it.intent)}</div>
          <div class="meta"><strong>หลักฐาน:</strong> ${esc(it.evidence)} · <strong>สไลด์:</strong> ${esc(it.slide)}</div>
        </div>
      </div>`).join('');
    list.querySelectorAll('.qa-q').forEach((b) => b.addEventListener('click', () => {
      const item = b.parentElement; item.classList.toggle('open'); b.setAttribute('aria-expanded', item.classList.contains('open'));
    }));
    const bar = $('qa-bar');
    let cat = 'all';
    const filters = [{ key: 'all', label: `ทั้งหมด (${D.qna.length})` }, ...D.categories.map((c) => ({ key: c.key, label: `${c.label} (${D.qna.filter((q) => q.cat === c.key).length})` }))];
    const wrap = document.createElement('div'); wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;width:100%;';
    wrap.innerHTML = filters.map((f) => `<button class="qa-filter${f.key === 'all' ? ' active' : ''}" data-cat="${f.key}">${esc(f.label)}</button>`).join('');
    bar.appendChild(wrap);
    const apply = () => {
      const q = $('qa-search').value.trim().toLowerCase();
      list.querySelectorAll('.qa-item').forEach((el) => {
        const it = D.qna[+el.dataset.i];
        const hit = (cat === 'all' || it.cat === cat) && (!q || (it.q + it.short + it.answer).toLowerCase().includes(q));
        el.style.display = hit ? '' : 'none';
      });
    };
    wrap.querySelectorAll('.qa-filter').forEach((b) => b.addEventListener('click', () => {
      cat = b.dataset.cat; wrap.querySelectorAll('.qa-filter').forEach((x) => x.classList.toggle('active', x === b)); apply();
    }));
    $('qa-search').addEventListener('input', apply);

    let timer = 0;
    $('qa-drill-btn').addEventListener('click', () => {
      clearInterval(timer);
      const i = Math.floor(Math.random() * D.qna.length), it = D.qna[i];
      let left = 20;
      const box = $('qa-drill'); box.classList.add('show');
      const draw = () => {
        box.innerHTML = `<div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;"><strong>คำถามที่ ${i + 1}: ${esc(it.q)}</strong><span class="clock">${left > 0 ? '0:' + String(left).padStart(2, '0') : 'หมดเวลา'}</span></div>` +
          (left > 0 ? '<p class="st-sub" style="margin-top:8px;">พูดคำตอบสั้นออกเสียงให้จบก่อนหมดเวลา</p>' : `<div class="qa-a" style="display:block;padding:10px 0 0;"><div class="short"><strong>ตอบสั้น:</strong> ${bold(it.short)}</div><div class="meta">หลักฐาน: ${esc(it.evidence)}</div></div>`);
      };
      draw();
      timer = setInterval(() => { left -= 1; draw(); if (left <= 0) clearInterval(timer); }, 1000);
    });
  })();

  // ---------- quiz (markup only; common.js binds the clicks) ----------
  (function quiz() {
    const box = $('quiz-v2'); if (!box) return;
    const L = ['A', 'B', 'C', 'D'];
    box.innerHTML = D.quiz.map((q, i) => `
      <div class="quiz-card" data-quiz-id="${i + 1}">
        <div class="quiz-question"><strong>ข้อที่ ${i + 1}:</strong> ${esc(q.q)}</div>
        <div class="quiz-options">${q.options.map((o, k) => `<div class="quiz-option"${k === q.answer ? ' data-correct="true"' : ''}>${L[k]}. ${esc(o)}</div>`).join('')}</div>
        <div class="quiz-feedback" data-explanation="${esc(q.explanation)}"></div>
      </div>`).join('');
  })();

  // ---------- paper page viewer ----------
  (function viewer() {
    const img = $('pv-img'); if (!img) return;
    const MAX = 12;
    const marks = [[1, 'หน้า 110: Abstract และ Introduction'], [2, 'หน้า 111: Section 2 FL และแรงจูงใจ'], [3, 'หน้า 112: Section 3 งานที่เกี่ยวข้อง'], [4, 'หน้า 113: Section 4.1 Raft'], [5, 'หน้า 114: Table 1 ระดับการกู้คืน'], [6, 'หน้า 115: Section 5 Flower และ PySyncObj'], [7, 'หน้า 116: Fig. 1 และ Section 6'], [8, 'หน้า 117: Fig. 2 และ 6.2.1'], [9, 'หน้า 118: Fig. 3 และ Fig. 4'], [10, 'หน้า 119: Section 6.3 และ 7'], [11, 'หน้า 120: References'], [12, 'หน้า 121: References (ต่อ)']];
    let page = 1;
    const jumps = $('pv-jumps');
    jumps.innerHTML = marks.map(([p, t]) => `<button class="pv-jump" data-p="${p}">${esc(t)}</button>`).join('');
    const set = (p) => {
      page = Math.max(1, Math.min(MAX, p));
      img.src = `${BASE}pages/page-${page}.png`; img.alt = `บทความหน้า ${109 + page}`;
      $('pv-label').textContent = `หน้า ${109 + page} (PDF หน้า ${page} จาก ${MAX})`;
      jumps.querySelectorAll('.pv-jump').forEach((b) => b.classList.toggle('active', +b.dataset.p === page));
    };
    jumps.querySelectorAll('.pv-jump').forEach((b) => b.addEventListener('click', () => set(+b.dataset.p)));
    $('pv-prev').addEventListener('click', () => set(page - 1));
    $('pv-next').addEventListener('click', () => set(page + 1));
    document.querySelectorAll('.v2-page-btn').forEach((b) => b.addEventListener('click', () => {
      set(+b.dataset.page); $('paper-viewer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    set(1);
  })();

  // ---------- slide viewer ----------
  (function slides() {
    const img = $('sv-img'); if (!img) return;
    const N = 7; let i = 1;
    const thumbs = $('sv-thumbs');
    thumbs.innerHTML = Array.from({ length: N }, (_, k) => `<button type="button" data-i="${k + 1}" aria-label="สไลด์ที่ ${k + 1}"><img src="${BASE}slides/slide-${k + 1}.png" alt="" loading="lazy"></button>`).join('');
    const set = (n) => {
      i = Math.max(1, Math.min(N, n));
      img.src = `${BASE}slides/slide-${i}.png`; img.alt = `สไลด์ที่ ${i}`;
      $('sv-label').textContent = `Slide ${i} / ${N}`;
      thumbs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', +b.dataset.i === i));
    };
    thumbs.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => set(+b.dataset.i)));
    $('sv-prev').addEventListener('click', () => set(i - 1));
    $('sv-next').addEventListener('click', () => set(i + 1));
    set(1);
  })();

  // ---------- BibTeX copy (common.js binds .copy-btn[data-copy]) ----------
  (function bib() {
    const b = $('bibtex-copy'), pre = $('bibtex'); if (b && pre) b.setAttribute('data-copy', pre.textContent);
  })();
})();
