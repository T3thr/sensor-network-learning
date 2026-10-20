/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * Paper III (OmniLedger): Interactive Shard Allocation & Cross-Shard Transaction Simulator
 *
 * A. Shard allocation and compromise probability  (Section IV-A, VI-B Eq. 1, VI-C Eq. 2)
 * B. Cross-shard transaction cost                 (Appendix C, Eq. 3)
 * C. Atomix step-through                          (Section IV-C, Fig. 3)
 * Everything is computed in the browser.
 */
(function () {
  const byId = (id) => document.getElementById(id);
  if (!byId('p3-sim')) return;

  // ── Math helpers ──────────────────────────────────────────────────────────
  // Sum over k in [lo, hi] of C(n,k) p^k (1-p)^(n-k), computed in log space.
  function binomRange(n, p, lo, hi) {
    if (p <= 0) return lo <= 0 && hi >= 0 ? 1 : 0;
    if (p >= 1) return lo <= n && hi >= n ? 1 : 0;
    let logC = 0;
    let sum = 0;
    for (let k = 0; k <= n; k++) {
      if (k > 0) logC += Math.log(n - k + 1) - Math.log(k);
      if (k >= lo && k <= hi) sum += Math.exp(logC + k * Math.log(p) + (n - k) * Math.log1p(-p));
    }
    return sum;
  }
  const shardFailure = (s, p) => binomRange(s, p, Math.floor(s / 3) + 1, s);

  function hashSeed(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffleInPlace(arr, rnd) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }
  const sci = (x) => {
    if (x === 0) return '0';
    if (x >= 0.001) return x.toLocaleString('en-US', { maximumSignificantDigits: 3 });
    const e = Math.floor(Math.log10(x));
    return `${(x / Math.pow(10, e)).toFixed(1)} × 10<sup>${String(e).replace('-', '−')}</sup>`;
  };
  const pct = (x) => `${(x * 100).toLocaleString('en-US', { maximumFractionDigits: x < 0.01 ? 3 : 1 })}%`;

  // ── Tabs ──────────────────────────────────────────────────────────────────
  document.querySelectorAll('.p3-sim-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.p3-sim-tab').forEach((t) => t.classList.toggle('active', t === tab));
      document.querySelectorAll('.p3-sim-pane').forEach((p) => p.classList.toggle('active', p.id === tab.dataset.pane));
    });
  });

  // ── A. Shard allocation ───────────────────────────────────────────────────
  let epochCounter = 1;

  function readA() {
    return {
      n: parseInt(byId('simA-n').value, 10),
      f: parseFloat(byId('simA-f').value),
      s: parseInt(byId('simA-s').value, 10),
      seed: byId('simA-seed').value || 'epoch-1',
    };
  }

  // Deal a random permutation of N validators into m shards; the first K ids are malicious.
  function allocate(n, f, s, seedText) {
    const m = Math.max(1, Math.floor(n / s));
    const k = Math.round(n * f);
    const ids = shuffleInPlace(Array.from({ length: n }, (_, i) => i), mulberry32(hashSeed(seedText)));
    const size = new Array(m).fill(0);
    const bad = new Array(m).fill(0);
    ids.forEach((v, i) => { const j = i % m; size[j] += 1; if (v < k) bad[j] += 1; });
    const shards = size.map((sz, j) => ({ size: sz, bad: bad[j], compromised: bad[j] > Math.floor(sz / 3) }));
    return { m, k, shards };
  }

  function renderA() {
    const { n, f, s, seed } = readA();
    if (s > n) { byId('simA-stats').innerHTML = '<p class="p3-warn">ขนาด shard ต้องไม่เกินจำนวน validator ทั้งหมด</p>'; byId('simA-grid').innerHTML = ''; return; }
    const { m, k, shards } = allocate(n, f, s, seed);
    const compromised = shards.filter((x) => x.compromised).length;
    const pShard = shardFailure(s, f);
    const printedSum = binomRange(s, f, 0, s);       // Eq. (1) as printed: upper bound n
    const unionBound = m * pShard;
    const epochBound = (4 / 3) * m * pShard;
    const years = epochBound > 0 ? 1 / epochBound / 365 : Infinity;

    const grid = byId('simA-grid');
    grid.classList.toggle('compact', m > 120);
    grid.innerHTML = shards.map((x, j) => {
      const w = Math.min(100, (x.bad / x.size) * 100).toFixed(1);
      const title = `shard ${j + 1}: ผู้โจมตี ${x.bad} จาก ${x.size} (เกณฑ์ ${Math.floor(x.size / 3)})`;
      if (m > 120) return `<div class="p3-shard${x.compromised ? ' bad' : ''}" title="${title}"></div>`;
      return `<div class="p3-shard${x.compromised ? ' bad' : ''}" title="${title}"><div class="p3-shard-head"><span>S${j + 1}</span><strong>${x.bad}/${x.size}</strong></div><div class="bar"><i style="width:${w}%"></i><b></b></div></div>`;
    }).join('');

    byId('simA-stats').innerHTML = `
      <div class="p3-kv">
        <div><span>จำนวน shard (m = ⌊N / s⌋)</span><strong>${m.toLocaleString('en-US')}</strong></div>
        <div><span>ผู้โจมตีทั้งระบบ (N × สัดส่วน)</span><strong>${k.toLocaleString('en-US')} จาก ${n.toLocaleString('en-US')}</strong></div>
        <div><span>shard ที่ถูกยึดใน epoch นี้ (เกิน ⌊ขนาด/3⌋)</span><strong class="${compromised ? 'p3-warn' : 'p3-ok'}">${compromised} จาก ${m}</strong></div>
        <div><span>โอกาสล้มเหลวต่อ shard, สมการ (1) ที่แก้ขอบบนเป็น ⌊s/3⌋</span><strong>${sci(pShard)}</strong></div>
        <div><span>สมการ (1) ตามที่พิมพ์ (ขอบบน n): ผลรวม</span><strong>${printedSum.toFixed(6)}</strong><em class="p3-note"> เท่ากับ 1 เสมอ จึงใช้คำนวณไม่ได้</em></div>
        <div><span>ขอบบนต่อ epoch, สมการ (2): (4/3) × m × P[X<sub>S</sub>]</span><strong>${epochBound >= 1 ? 'เกิน 1 (ล้มเหลวเกือบทุก epoch)' : sci(epochBound)}</strong></div>
        <div><span>union bound ไม่คูณ 4/3 (m × P[X<sub>S</sub>])</span><strong>${unionBound >= 1 ? 'เกิน 1' : sci(unionBound)}</strong></div>
        <div><span>เวลาเฉลี่ยก่อนล้มเหลว เมื่อ epoch ยาว 1 วัน</span><strong>${years === Infinity ? 'ไม่ล้มเหลวในแบบจำลอง' : (years >= 1 ? `${years.toLocaleString('en-US', { maximumFractionDigits: 1 })} ปี` : `${(years * 365).toLocaleString('en-US', { maximumFractionDigits: 1 })} วัน`)}</strong></div>
      </div>
      <p class="p3-note">ตัวเลขอ้างอิงของบทความ: ผู้โจมตี 12.5% กับ 16 shard ได้ 4 × 10<sup>−5</sup> ต่อ epoch หรือราว 68.5 ปี (หน้า 591) ค่าในหน้านี้คำนวณซ้ำจากสมการ (1) แบบแก้ขอบบน จึงต่างจากบทความเล็กน้อย (4.6 × 10<sup>−5</sup> หรือราว 60 ปีสำหรับกรณีเดียวกัน)</p>
      <p class="p3-note">ค่าวิเคราะห์ใช้ขนาด shard s และแบบจำลองทวินามของบทความ ส่วนภาพด้านล่างใช้ผู้โจมตีจำนวนคงที่ ${k} คนสุ่มแจกจริงด้วย seed "${seed}" (แบบ hypergeometric) ขนาด shard จริงจึงเป็น ${Math.floor(n / m)} ถึง ${Math.ceil(n / m)} คน</p>`;
    byId('simA-mc-out').innerHTML = '';
  }

  function monteCarloA() {
    const { n, f, s, seed } = readA();
    if (s > n) return;
    const epochs = 2000;
    const out = byId('simA-mc-out');
    out.innerHTML = '<span class="p3-muted">กำลังจำลอง 2,000 epoch ...</span>';
    setTimeout(() => {
      let bad = 0;
      let badShards = 0;
      let m = 1;
      for (let e = 0; e < epochs; e++) {
        const r = allocate(n, f, s, `${seed}#mc${e}`);
        m = r.m;
        const c = r.shards.filter((x) => x.compromised).length;
        badShards += c;
        if (c > 0) bad += 1;
      }
      const pShard = shardFailure(s, f);
      out.innerHTML = `ผลจำลอง: มี shard ถูกยึดอย่างน้อยหนึ่ง shard ใน <strong>${bad.toLocaleString('en-US')} จาก ${epochs.toLocaleString('en-US')} epoch (${pct(bad / epochs)})</strong>, รวม shard ที่ถูกยึด ${badShards.toLocaleString('en-US')} ครั้ง
        เทียบกับ union bound m × P[X<sub>S</sub>] = ${m * pShard >= 1 ? 'เกิน 1' : pct(m * pShard)}
        ${bad === 0 ? `<br><span class="p3-muted">ไม่พบเลยเป็นเรื่องปกติเมื่อความน่าจะเป็นต่อ epoch ต่ำกว่า 1 ใน 2,000 มาก</span>` : ''}`;
    }, 30);
  }

  ['simA-n', 'simA-f', 'simA-s', 'simA-seed'].forEach((id) => byId(id).addEventListener('change', renderA));
  byId('simA-run').addEventListener('click', () => { epochCounter += 1; byId('simA-seed').value = `epoch-${epochCounter}`; renderA(); });
  byId('simA-mc').addEventListener('click', monteCarloA);
  document.querySelectorAll('[data-sima-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [n, s, f] = btn.dataset.simaPreset.split(',');
      byId('simA-n').value = n;
      byId('simA-s').value = s;
      byId('simA-f').value = f;
      renderA();
    });
  });

  // ── B. Cross-shard cost (Appendix C) ──────────────────────────────────────
  // dist[k] = P(a transaction with u UTXOs touches exactly k of m shards).
  function distribution(u, m, printed) {
    let prev = new Array(m + 2).fill(0);
    prev[1] = 1; // one UTXO touches one shard
    for (let j = 2; j <= u; j++) {
      const cur = new Array(m + 2).fill(0);
      for (let k = 1; k <= Math.min(j, m); k++) {
        const newShard = printed ? (m - k) / m : (m - k + 1) / m; // Eq. (3) as printed vs corrected
        cur[k] = newShard * prev[k - 1] + (k / m) * prev[k];
      }
      prev = cur;
    }
    return prev;
  }

  const TABLE2 = { 1: 1, 2: 869 / 439, 4: 1674 / 439, 8: 3240 / 439, 16: 5850 / 439 };

  function renderB() {
    const u = parseInt(byId('simB-u').value, 10);
    const m = parseInt(byId('simB-m').value, 10);
    byId('simB-u-val').textContent = u;
    byId('simB-m-val').textContent = m;
    const d = distribution(u, m, false);
    const printed = distribution(u, m, true);
    let ek = 0; let einv = 0; let sum = 0; let sumPrinted = 0;
    for (let k = 1; k <= m; k++) { ek += k * d[k]; einv += d[k] / k; sum += d[k]; sumPrinted += printed[k]; }
    const paperSpeed = m * einv;
    const workSpeed = m / ek;
    const maxK = Math.min(u, m);
    let bars = '';
    for (let k = 1; k <= maxK; k++) {
      bars += `<div class="p3-bar-row"><span>แตะ ${k} shard</span><div class="p3-bar"><i style="width:${(d[k] * 100).toFixed(2)}%"></i></div><strong>${pct(d[k])}</strong></div>`;
    }
    byId('simB-bars').innerHTML = bars;
    const measured = TABLE2[m] ? `${TABLE2[m].toFixed(2)} เท่า` : 'ไม่มีจุดวัดใน Table II';
    byId('simB-stats').innerHTML = `
      <div class="p3-kv">
        <div><span>โอกาสเป็นธุรกรรมภายใน shard เดียว</span><strong>${pct(d[1])}</strong></div>
        <div><span>จำนวน shard ที่แตะโดยเฉลี่ย E[k]</span><strong>${ek.toFixed(2)}</strong></div>
        <div><span>อัตราเร่งตามสูตรบทความ m × E[1/k]</span><strong>${paperSpeed.toFixed(2)} เท่า</strong></div>
        <div><span>อัตราเร่งแบบนับงานรวม m / E[k]</span><strong>${workSpeed.toFixed(2)} เท่า</strong></div>
        <div><span>อัตราเร่งเชิงเส้นในอุดมคติ</span><strong>${m} เท่า</strong></div>
        <div><span>Table II วัดได้ (ไม่ระบุสัดส่วนข้าม shard)</span><strong>${measured}</strong></div>
        <div><span>ผลรวมความน่าจะเป็น: สมการ (3) แบบแก้ (m − k + 1)/m</span><strong>${sum.toFixed(4)}</strong></div>
        <div><span>ผลรวมความน่าจะเป็น: สมการ (3) ตามที่พิมพ์ (m − k)/m</span><strong class="${Math.abs(sumPrinted - 1) > 1e-9 ? 'p3-warn' : ''}">${sumPrinted.toFixed(4)}</strong></div>
      </div>
      <p class="p3-note">ลองตั้ง 4 UTXO กับ 4 shard จะได้ 1.56 เท่าตรงกับ Appendix C และ 3 UTXO กับ 4 shard จะได้ 1.88 เท่า แสดงว่าตัวเลข 1.56 มาจากกรณี 4 UTXO ไม่ใช่ 3 UTXO ตามข้อความ ส่วนสูตรนับงานรวมให้ 1.46 และ 1.73 เท่า</p>`;
  }
  ['simB-u', 'simB-m'].forEach((id) => byId(id).addEventListener('input', renderB));

  // ── C. Atomix step-through ────────────────────────────────────────────────
  const C = { step: 0, proofs: {}, stuck: false, log: [] };
  const UTXO = {
    A: { shard: 1, label: 'A: 5 เหรียญ' },
    B: { shard: 2, label: 'B: 3 เหรียญ' },
    C: { shard: 3, label: 'C: 8 เหรียญ (output)' },
  };
  let state = {};

  function resetC() {
    C.step = 0; C.proofs = {}; C.stuck = false; C.log = [];
    state = { A: 'unspent', B: byId('simC-double').checked ? 'spent-other' : 'unspent', C: 'none' };
    logC('client เตรียม cross-TX: ใช้ A (shard 1) และ B (shard 2) เพื่อสร้าง C ใน shard 3');
    renderC();
  }
  function logC(msg) { C.log.push(msg); }

  const badge = (key) => {
    const st = state[key];
    if (st === 'none') return '';
    const cls = { unspent: 'unspent', locked: 'locked', spent: 'spent', 'spent-other': 'spent', created: 'created' }[st];
    const text = { unspent: 'ยังไม่ถูกใช้', locked: 'ถูกล็อก', spent: 'ถูกใช้แล้ว', 'spent-other': 'ถูกใช้ในธุรกรรมอื่นแล้ว', created: 'สร้างใหม่' }[st];
    return `<span class="p3-utxo ${cls}">${UTXO[key].label} · ${text}</span>`;
  };

  function renderC() {
    const labels = ['เริ่มต้น', '1. Initialize', '2. Lock', '3. Unlock', 'เสร็จสิ้น'];
    byId('simC-steps').innerHTML = labels.map((l, i) => `<span class="p3-step${i === C.step ? ' active' : ''}${i < C.step ? ' done' : ''}">${l}</span>`).join('');
    const proof = (sh) => {
      const p = C.proofs[sh];
      if (!p) return '';
      return p === 'accept' ? '<div class="p3-proof ok">proof-of-acceptance (ลายเซ็นร่วมของ shard)</div>' : '<div class="p3-proof bad">proof-of-rejection (ลายเซ็นร่วมของ shard)</div>';
    };
    byId('simC-s1').innerHTML = `<h5>Input shard 1</h5>${badge('A')}${proof(1)}`;
    byId('simC-s2').innerHTML = `<h5>Input shard 2</h5>${badge('B')}${proof(2)}`;
    byId('simC-s3').innerHTML = `<h5>Output shard 3</h5>${badge('C') || '<span class="p3-muted">ยังไม่มี UTXO ของธุรกรรมนี้</span>'}`;
    const holds = Object.keys(C.proofs).length;
    byId('simC-client').innerHTML = `<h5>Client</h5><p class="p3-note">${C.stuck ? 'ล่มหลังขั้น Lock: ไม่ได้ส่ง unlock' : `ถือ proof ${holds} จาก 2 ใบ`}</p>`;
    byId('simC-log').innerHTML = C.log.map((l, i) => `<div>${String(i + 1).padStart(2, '0')}. ${l}</div>`).join('');
    byId('simC-log').scrollTop = byId('simC-log').scrollHeight;
    byId('simC-next').disabled = C.step >= 4 || C.stuck;
    byId('simC-rescue').disabled = !C.stuck;
  }

  function unlock(by) {
    const accepted = C.proofs[1] === 'accept' && C.proofs[2] === 'accept';
    if (accepted) {
      state.A = 'spent'; state.B = 'spent'; state.C = 'created';
      logC(`${by} ส่ง unlock-to-commit พร้อม proof-of-acceptance ครบทั้งสองใบไปยัง shard 3`);
      logC('shard 3 ตรวจ proof แล้วสร้าง UTXO C ในบล็อกถัดไป: ธุรกรรม commit สำเร็จ');
    } else {
      if (state.A === 'locked') state.A = 'unspent';
      logC(`${by} ส่ง unlock-to-abort พร้อม proof-of-rejection ของ shard 2 ไปยัง input shard`);
      logC('shard 1 ปลดล็อก A ให้กลับมาใช้ได้: ธุรกรรม abort และไม่มีเงินหาย');
    }
    C.step = 4;
    logC(accepted ? 'สรุป: ทุก input ยอมรับ จึง commit ได้เพียงทางเดียว' : 'สรุป: proof-of-rejection เพียงใบเดียวก็บังคับให้ abort');
  }

  function nextC() {
    if (C.step === 0) {
      C.step = 1;
      logC('Initialize: client gossip cross-TX จนถึง input shard 1 และ 2');
    } else if (C.step === 1) {
      C.step = 2;
      state.A = 'locked'; C.proofs[1] = 'accept';
      logC('Lock: shard 1 ตรวจผ่าน consensus ภายใน shard ทำเครื่องหมาย A ว่าถูกใช้ แล้วออก proof-of-acceptance');
      if (state.B === 'spent-other') {
        C.proofs[2] = 'reject';
        logC('Lock: shard 2 พบว่า B ถูกใช้ไปแล้ว (double spend) จึงออก proof-of-rejection');
      } else {
        state.B = 'locked'; C.proofs[2] = 'accept';
        logC('Lock: shard 2 ตรวจผ่าน ล็อก B แล้วออก proof-of-acceptance');
      }
    } else if (C.step === 2) {
      C.step = 3;
      if (byId('simC-crash').checked) {
        C.stuck = true;
        logC('client ล่มก่อนส่ง unlock: UTXO ที่ถูกล็อกยังค้างอยู่ (บทความยอมรับข้อนี้ หน้า 588)');
        logC('ทางแก้ตามบทความ: ฝ่ายอื่น เช่น validator ที่ได้ค่าธรรมเนียม ส่ง unlock แทนได้ เพราะข้อมูลถูก gossip แล้ว');
      } else {
        unlock('client');
      }
    }
    renderC();
  }

  byId('simC-next').addEventListener('click', nextC);
  byId('simC-reset').addEventListener('click', resetC);
  byId('simC-rescue').addEventListener('click', () => { C.stuck = false; unlock('validator (ทำแทน client)'); renderC(); });
  ['simC-double', 'simC-crash'].forEach((id) => byId(id).addEventListener('change', resetC));

  renderA();
  renderB();
  resetC();
})();
