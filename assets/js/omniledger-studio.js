/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * Paper III (OmniLedger) additions to the shared rehearsal studio in presentation.js.
 *
 * Load order on paper-3/index.html: presentation.js -> omniledger-data.js -> this file.
 * - Per-slide concept explainer for the 'omniledger' paper (other papers keep the original).
 * - 5:00 countdown cap (the script itself ends at 4:45, the last 15 s are buffer).
 * - Pace panel: expected word position at the design pace, teleprompter follow mode,
 *   and a per-browser rehearsal log (localStorage, optional).
 */
(function () {
  if (typeof PresentationStudio === 'undefined' || !document.body || document.body.dataset.paper !== 'omniledger') return;

  const CONCEPTS = [
    // 1. Cover
    `<div class="p3-concept">
      <h4>OmniLedger ในหนึ่งย่อหน้า</h4>
      <p>ระบบบัญชีแยกประเภทแบบกระจายศูนย์ที่แบ่ง validator เป็นหลาย <strong>shard</strong> ให้แต่ละ shard ประมวลผลธุรกรรมคนละส่วนพร้อมกัน ความจุรวมจึงเพิ่มตามจำนวนเครื่อง (scale-out) โดยยังทนผู้โจมตีแบบ Byzantine ได้ไม่เกิน 25% ต่างจาก Bitcoin ที่ทุกเครื่องต้องตรวจทุกธุรกรรม</p>
      <h4>บริบทของบทความ</h4>
      <p>ตีพิมพ์ใน 2018 IEEE Symposium on Security and Privacy (SP) หน้า 583 ถึง 598 โดยทีมจาก EPFL (สวิตเซอร์แลนด์) และ Trinity College (สหรัฐอเมริกา) เป็นงานต่อยอดจาก ByzCoin (USENIX Security 2016) และ RandHound (IEEE SP 2017) ของกลุ่มผู้เขียนเดียวกัน ต้นแบบเขียนด้วยภาษา Go</p>
      <h4>คำถามหลักที่ต้องพูดให้ผู้ฟังจำได้</h4>
      <p>ระบบบัญชีแบบกระจายศูนย์จะขยายตามจำนวนเครื่องได้อย่างไร โดยที่ความเสี่ยงของระบบยังวัดเป็นตัวเลขได้</p>
    </div>`,
    // 2. Research challenges
    `<div class="p3-concept">
      <h4>อ่านสามเหลี่ยมใน Fig. 1</h4>
      <p>จุดยอดคือคุณสมบัติสามอย่าง ขอบคือระบบที่ได้สองอย่าง: Elastico (กระจายศูนย์และขยายได้ แต่ shard เล็กจนล้มเหลวง่าย), ByzCoin (กระจายศูนย์และปลอดภัย แต่ความจุรวมไม่เพิ่ม), RSCoin (ขยายได้และปลอดภัย แต่เป็นระบบแบบมีธนาคารกลาง) OmniLedger วางตัวเองไว้กลางสามเหลี่ยม</p>
      <h4>Sybil attack และ permissionless</h4>
      <p>ระบบแบบ permissionless เปิดให้ใครก็เข้าร่วมได้ ผู้โจมตีจึงอาจสร้างตัวตนปลอมจำนวนมาก (Sybil attack) OmniLedger ให้ validator สร้างตัวตนผ่านกลไกที่ปลอมยาก เช่น Proof-of-Work หรือ Proof-of-Stake แล้วบันทึกใน identity blockchain ก่อนเข้าร่วม epoch ถัดไป</p>
      <h4>ตัวเลขบนสไลด์มาจากไหน</h4>
      <p>1 ชั่วโมงคือเวลาก่อนล้มเหลวของ Elastico ที่ผู้เขียนประเมินใน Table IV, 600 วินาทีคือ latency ของ Bitcoin ใน Table IV และ 4,000 tx/s คือค่าเฉลี่ยของ Visa ที่บทความใช้เป็นเส้นอ้างอิงใน Fig. 6</p>
    </div>`,
    // 3. Logical model
    `<div class="p3-concept">
      <h4>หนึ่ง epoch ทำงานอย่างไร (Fig. 2)</h4>
      <p>(1) ต้น epoch เลือก leader ด้วย VRF แล้ว leader รัน RandHound ได้ค่าสุ่ม rnd<sub>e</sub> ทุกคนใช้ค่านี้จัด validator เข้า shard (2) ภายใน shard ใช้ ByzCoinX ตกลงลำดับธุรกรรม (3) ธุรกรรมข้าม shard ใช้ Atomix ที่ client เป็นผู้ขับเคลื่อน</p>
      <h4>สี่เสาหลักตอบคำถามคนละข้อ</h4>
      <p><strong>Sharding:</strong> ใครอยู่ shard ไหนโดยผู้โจมตีเลือกไม่ได้ <strong>ByzCoinX:</strong> shard เดียวตกลงกันเร็วและทนโหนดล้มได้อย่างไร <strong>Atomix:</strong> เงินข้าม shard จะไม่หายและไม่ถูกใช้ซ้ำได้อย่างไร <strong>State blocks และ trust-but-verify:</strong> ลดข้อมูลที่ต้องเก็บ และยืนยันธุรกรรมมูลค่าต่ำให้เร็วขึ้นได้อย่างไร</p>
      <h4>ตัวชี้วัดสี่ด้าน</h4>
      <p>throughput (tps), latency ในการยืนยัน (วินาที), โอกาสล้มเหลวต่อ epoch และต้นทุน bootstrap ของ validator ใหม่ ตัวชี้วัดแต่ละด้านโยงกับตารางหรือกราฟในบทความ จึงตรวจสอบได้ทุกตัว</p>
    </div>`,
    // 4. Scenario and formulation
    `<div class="p3-concept">
      <h4>อ่านสมการที่ (1) ด้วยตัวอย่าง</h4>
      <p>shard 70 โหนด ผู้โจมตี 12.5%: shard ปลอดภัยเมื่อผู้โจมตีไม่เกิน ⌊70/3⌋ = 23 โหนด ใช้การแจกแจงทวินามรวมจาก k = 0 ถึง 23 แล้วเอา 1 ลบ ได้โอกาสล้มเหลวราว 2.2 × 10<sup>−6</sup> ต่อ shard (คำนวณซ้ำ) บทความพิมพ์ขอบบนของผลรวมเป็น n ซึ่งทำให้ผลรวมเท่ากับ 1 เสมอ ลองดูผลของทั้งสองแบบได้ในซิมูเลเตอร์หมวดที่ 5</p>
      <h4>สมการที่ (2) และตัวคูณ 4/3</h4>
      <p>รวมความเสี่ยงทุก shard ด้วย union bound และเผื่อกรณีผู้โจมตีได้เป็น leader แล้วสั่งสุ่มใหม่ โอกาสรอบที่ k คือ 1/4<sup>k</sup> รวมเป็นอนุกรมเรขาคณิตได้ 4/3 ที่ผู้โจมตี 12.5% กับ 16 shard ได้ 4 × 10<sup>−5</sup> ต่อ epoch หรือราว 68.5 ปีต่อหนึ่งครั้งเมื่อ epoch ยาว 1 วัน</p>
      <h4>อ่าน Fig. 5</h4>
      <p>กราฟซ้ายคือขนาด shard ที่ต้องใช้เพื่อให้ล้มเหลว 10<sup>−6</sup> ตามสัดส่วนผู้โจมตี (แกนตั้งเป็นสเกล log) กราฟขวาคือความมั่นใจของกลุ่ม optimistic ข้อความใน Section VI-B เรียกซ้ายขวาสลับกับคำบรรยายใต้ภาพ</p>
    </div>`,
    // 5. Results
    `<div class="p3-concept">
      <h4>ระวังสเกล log ใน Fig. 6</h4>
      <p>แกนตั้งของ Fig. 6 เป็นสเกล log ความสูงแท่งที่ต่างกันหนึ่งช่องคือต่างกันสิบเท่า บทความไม่พิมพ์ตัวเลขของแท่ง ตารางบนสไลด์เป็นค่าที่ผู้นำเสนออ่านจากพิกัดเวกเตอร์ในไฟล์ PDF และตรวจความถูกต้องกับเส้น Visa ที่อ่านได้ราว 4,120 (บทความบอกประมาณ 4,000)</p>
      <h4>Table II กับประสิทธิภาพต่อ shard</h4>
      <p>439, 869, 1,674, 3,240, 5,850 tps ที่ 1, 2, 4, 8, 16 shard ให้อัตราเร่ง 1.98, 3.81, 7.38, 13.33 เท่า หรือประสิทธิภาพต่อ shard 99.0%, 95.3%, 92.3%, 83.3% ผลนี้ใช้ผู้โจมตี 12.5% และ shard ละ 70 โหนด</p>
      <h4>ประโยคที่ต้องพูดเรื่อง 13,000 tps</h4>
      <p>ข้อความ Section VIII-B บอก 13,000 tps ที่ 1,800 โหนด 25 shard แต่บทนำบอก 6,000 tps และกราฟอ่านได้ราว 6,800 หรือ 19,900 tps ให้พูดว่าตัวเลขนี้ไม่สอดคล้องกับกราฟ และอ้าง Table II กับ Fig. 6 แทน</p>
    </div>`,
    // 6. Contributions and impact
    `<div class="p3-concept">
      <h4>แยกคุณูปการออกจากความเห็น</h4>
      <p>คอลัมน์ซ้ายของสไลด์มีหลักฐานจากบทความทุกข้อ คอลัมน์ขวาเป็นการประยุกต์ที่ผู้นำเสนอเสนอเอง ตอนพูดต้องบอกคำว่า "ความเห็นของผม" ก่อนเข้าคอลัมน์ขวา</p>
      <h4>Atomix เทียบกับ two-phase commit และ Saga</h4>
      <p>ทั้งสามแบบมีขั้นเตรียมและขั้นยืนยัน แต่ Atomix ใช้ shard ที่รัน BFT เป็นผู้เข้าร่วม ใช้ proof ที่มี collective signature แทนผู้ประสานกลาง และล็อก input ไว้ก่อนจึงกัน double spend ได้ Saga ไม่ล็อกแต่ย้อนงานด้วย compensating transaction จึงเหมาะกับงานที่ยอมรับความสอดคล้องแบบ eventual</p>
      <h4>ชั้น gateway ของเครือข่ายเซนเซอร์</h4>
      <p>โหนดเซนเซอร์ใช้แบตเตอรี่และแบนด์วิดท์ต่ำ จึงไม่ควรรัน BFT เอง แต่ชั้น gateway หรือ fog มีทรัพยากรพอ แนวคิดที่นำไปใช้ได้คือแบ่ง gateway ตามพื้นที่, สุ่มสลับสมาชิกด้วยค่าสุ่มที่ตรวจสอบได้, ใช้ lock แล้ว unlock กับเหตุการณ์ข้ามพื้นที่ และใช้ checkpoint แบบ state block</p>
    </div>`,
    // 7. Limitations and conclusion
    `<div class="p3-concept">
      <h4>Appendix C ในภาษาง่าย</h4>
      <p>ถ้ากำหนด UTXO ให้ shard ตาม hash แบบสุ่ม ธุรกรรมที่มีหลาย UTXO มักแตะหลาย shard งานต่อธุรกรรมจึงเพิ่มตามจำนวน shard ที่แตะ ผู้เขียนคำนวณเองว่าเมื่อเพิ่มจาก 1 เป็น 4 shard อัตราเร่งจะเหลือราว 1.56 เท่า ไม่ใช่ 3.81 เท่าใน Table II และตัวเลข 1.56 ตรงกับธุรกรรม 4 UTXO ไม่ใช่ 3 UTXO ตามที่ข้อความระบุ</p>
      <h4>ทำไมคิดแบบงานรวมได้ต่ำกว่า</h4>
      <p>สูตรของผู้เขียนเฉลี่ยค่า 1/k ส่วนการนับงานรวมใช้ 1/(ค่าเฉลี่ยของ k) ตามอสมการของ Jensen ค่าแรกไม่ต่ำกว่าค่าหลังเสมอ ผลแบบนับงานรวมจึงได้ 1.46 ถึง 1.73 เท่า</p>
      <h4>วิจารณ์อย่างสุภาพและมีหลักฐาน</h4>
      <p>ใช้รูปประโยค "ตัวเลขในข้อความ X ไม่ตรงกับตาราง Y หน้า Z" แทนการตัดสินว่าผู้เขียนผิด และปิดด้วยข้อสรุปที่ยังยืนได้ คือสถาปัตยกรรมและแบบจำลองความเสี่ยงมีคุณค่า แต่ต้องทดสอบ throughput กับภาระงานจริงก่อนอ้างตัวเลข</p>
    </div>`,
  ];

  const originalExplainer = PresentationStudio.prototype.renderConceptExplainer;
  PresentationStudio.prototype.renderConceptExplainer = function (index) {
    if (this.activePaper !== 'omniledger') return originalExplainer.call(this, index);
    const el = document.getElementById('concept-content');
    if (el) el.innerHTML = CONCEPTS[index] || '';
  };

  const pace = window.OMNILEDGER_PACING || { totalWords: 0, designWpm: 172, scriptEnd: 285, cap: 300 };
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const LOG_KEY = 'p3_rehearsal_log';
  const readLog = () => { try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); } catch (e) { return []; } };
  const writeLog = (rows) => { try { localStorage.setItem(LOG_KEY, JSON.stringify(rows.slice(-10))); } catch (e) { /* storage unavailable */ } };

  function renderLog() {
    const box = document.getElementById('p3-rehearsal-log');
    if (!box) return;
    const rows = readLog();
    if (!rows.length) { box.innerHTML = '<span class="p3-muted">ยังไม่มีบันทึกในเบราว์เซอร์นี้</span>'; return; }
    box.innerHTML = rows.slice().reverse().map((r) => {
      const ok = r.seconds >= 270 && r.seconds <= 295;
      const tag = ok ? 'อยู่ในช่วง 4:30 ถึง 4:55' : (r.seconds > 295 ? 'ยาวเกิน ตัดประโยคสำรอง' : 'สั้นกว่าเป้า');
      return `<div class="p3-log-row"><span>${r.when}</span><strong>${fmt(r.seconds)}</strong><span class="${ok ? 'p3-ok' : 'p3-warn'}">${tag}</span></div>`;
    }).join('');
  }

  function stageAt(studio, t) {
    const stages = studio.stages;
    let i = stages.findIndex((s) => t >= s.start && t < s.end);
    if (i === -1) i = t >= stages[stages.length - 1].end ? stages.length - 1 : 0;
    return i;
  }

  function updatePace(studio) {
    const t = studio.currentTime;
    const stages = studio.stages;
    const i = stageAt(studio, t);
    const st = stages[i];
    const before = stages.slice(0, i).reduce((n, s) => n + (s.words || 0), 0);
    const frac = Math.min(1, Math.max(0, (t - st.start) / (st.end - st.start)));
    const expected = t >= pace.scriptEnd ? pace.totalWords : Math.round(before + frac * (st.words || 0));
    const el = document.getElementById('p3-pace-now');
    if (el) {
      el.textContent = t >= pace.scriptEnd
        ? `ตามแผนบทพูดควรจบแล้ว (4:45) เหลือเวลาสำรอง ${fmt(Math.max(0, pace.cap - t))}`
        : `ตามแผนควรพูดถึงคำที่ ${expected.toLocaleString('en-US')} จาก ${pace.totalWords.toLocaleString('en-US')} (สไลด์ ${i + 1}: ${st.title.replace(/^\d+\.\s*/, '')})`;
    }
    const follow = document.getElementById('p3-follow');
    const box = studio.teleprompterContainer;
    const section = document.getElementById(`script-stage-${i}`);
    if (studio.isRunning && follow && follow.checked && box && section) {
      const top = section.offsetTop - box.offsetTop;
      const span = Math.max(0, section.offsetHeight - box.clientHeight * 0.4);
      box.scrollTo({ top: Math.max(0, top + frac * span - 12), behavior: 'smooth' });
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    const studio = window.presentationStudio;
    if (!studio || studio.activePaper !== 'omniledger') return;
    studio.totalDuration = pace.cap;

    const baseUpdate = studio.updateTimerDisplay.bind(studio);
    studio.updateTimerDisplay = function () { baseUpdate(); updatePace(studio); };
    studio.updateTimerDisplay();

    const summary = document.getElementById('p3-pace-summary');
    if (summary) {
      summary.textContent = `บทพูด ${pace.totalWords.toLocaleString('en-US')} คำ (นับคำไทยแบบ ICU) ที่ ${pace.designWpm} คำต่อนาที ใช้เวลา ${fmt(pace.totalWords / pace.designWpm * 60)} ตัวจับเวลานับถอยหลังจาก ${fmt(pace.cap)}`;
    }
    const logBtn = document.getElementById('p3-log-btn');
    if (logBtn) {
      logBtn.addEventListener('click', () => {
        if (studio.currentTime <= 0) return;
        const rows = readLog();
        rows.push({ when: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }), seconds: studio.currentTime });
        writeLog(rows);
        renderLog();
      });
    }
    const clearBtn = document.getElementById('p3-log-clear');
    if (clearBtn) clearBtn.addEventListener('click', () => { writeLog([]); renderLog(); });
    renderLog();
  });
})();
