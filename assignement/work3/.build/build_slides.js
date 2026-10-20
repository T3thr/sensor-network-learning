// Build the Paper III 7-slide deck (16 x 9 in) from one HTML source.
//
//   NODE_PATH=../../work1/.build/node_modules node build_slides.js
//
// slides.html (this file's templates, SLIDES_DESIGN_SYSTEM.md tokens)
//   -> 03_slides/Assignment_Paper_3_OmniLedger_5-to-8-min.pdf   (Chromium print, 16 x 9 in)
//   -> .build/slides-hires/slide-N.png                          (2x, for the PPTX)
//   -> ../../paper-3/assets/slides/slide-N.png                  (1600 px, for the web studio)
// A layout check fails the build if any card overflows or content runs into the footer.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const OUT_HTML = path.join(__dirname, 'slides.html');
const OUT_PDF = path.join(ROOT, '03_slides', 'Assignment_Paper_3_OmniLedger_5-to-8-min.pdf');
const HIRES = path.join(__dirname, 'slides-hires');
const WEB = path.resolve(ROOT, '..', '..', 'paper-3', 'assets', 'slides');

const REF = 'เอกสารอ้างอิง: Kokoris-Kogias et al., IEEE SP 2018 (IEEE Xplore: 8418625)';

const CSS = `
@page { size: 16in 9in; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #FFFFFF; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: Tahoma, sans-serif; color: #334155; }
.slide { width: 16in; height: 9in; background: #F8FAFC; display: flex; flex-direction: column; overflow: hidden; position: relative; break-after: page; }
.banner { height: 0.95in; flex: none; background: #0F2D4A; display: flex; align-items: center; padding: 0 0.8in; }
.banner h1 { font-size: 21pt; font-weight: 700; color: #FFFFFF; line-height: 1.25; }
.content { flex: 1; min-height: 0; padding: 0.35in 0.8in 0.25in; display: flex; flex-direction: column; gap: 0.22in; }
.footer { height: 0.45in; flex: none; border-top: 1px solid #E2E8F0; background: #F8FAFC; display: flex; justify-content: space-between; align-items: center; padding: 0 0.8in; font-size: 11pt; color: #64748B; }
.footer .num { font-size: 13pt; font-weight: 700; color: #0F2D4A; }
.grid2 { display: grid; gap: 0.3in; min-height: 0; flex: 1; }
.col { display: flex; flex-direction: column; gap: 0.18in; min-height: 0; }
.card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 0.18in 0.26in; overflow: hidden; }
.vc { display: flex; flex-direction: column; justify-content: center; }
.card h2 { font-size: 16pt; font-weight: 700; color: #0F2D4A; line-height: 1.3; margin-bottom: 0.08in; }
.card h3 { font-size: 14pt; font-weight: 700; color: #0F2D4A; line-height: 1.3; margin-bottom: 0.04in; }
.royal h2, .royal h3 { color: #1E3A8A; }
.hazard h2, .hazard h3 { color: #991B1B; }
.body, .card p, .card li { font-size: 13pt; line-height: 1.5; color: #334155; }
.card strong { color: #0F172A; }
.card ul { list-style: none; }
.card ul li { padding-left: 0.22in; position: relative; margin-bottom: 0.05in; }
.card ul li::before { content: "•"; position: absolute; left: 0.03in; color: #2563EB; font-weight: 700; }
.evi { margin-top: 0.1in; padding-top: 0.08in; border-top: 1px dashed #E2E8F0; font-size: 11.5pt !important; color: #475569 !important; line-height: 1.45 !important; }
.evi b { color: #1E3A8A; }
.hazard .evi b { color: #991B1B; }
.num-item { display: grid; grid-template-columns: 0.4in 1fr; gap: 0.04in 0.1in; }
.num-badge { width: 0.33in; height: 0.33in; border-radius: 50%; background: #1E3A8A; color: #FFF; font-weight: 700; font-size: 13pt; display: flex; align-items: center; justify-content: center; margin-top: 0.02in; }
.hazard .num-badge, .num-badge.red { background: #991B1B; }
.stack { display: flex; flex-direction: column; justify-content: space-evenly; flex: 1; gap: 0.12in; }
.fig { display: flex; flex-direction: column; align-items: center; }
.fig img { display: block; max-width: 100%; object-fit: contain; flex: none; }
.caption { font-size: 11pt; color: #64748B; line-height: 1.4; margin-top: 0.07in; text-align: center; }
.metrics { display: grid; gap: 0.18in; }
.metric { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 0.14in 0.16in; text-align: center; display: flex; flex-direction: column; justify-content: center; }
.metric .val { font-size: 29pt; font-weight: 700; color: #0F2D4A; line-height: 1.1; white-space: nowrap; }
.metric .val.sm { font-size: 25pt; }
.metric .val.green { color: #059669; }
.metric .lbl { font-size: 12pt; color: #64748B; line-height: 1.35; margin-top: 0.06in; }
.eq { font-family: "Cambria Math", "STIX Two Math", "Times New Roman", serif; font-size: 18pt; color: #0F172A; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.1in 0.16in; text-align: center; margin: 0.04in 0 0.1in; line-height: 1.5; }
.eq sub, .eq sup { font-size: 62%; }
.tag { display: inline-block; font-size: 12pt; font-weight: 700; color: #1E3A8A; background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 6px; padding: 0.02in 0.1in; margin-right: 0.06in; }
.section-label { font-size: 15.5pt; font-weight: 700; color: #0F2D4A; margin-bottom: -0.04in; }
.section-label.royal { color: #1E3A8A; }
.section-label.hazard { color: #991B1B; }
.note { font-size: 11.5pt; color: #64748B; line-height: 1.4; }
.nw { white-space: nowrap; }
.figlist { align-self: stretch; margin-top: 0.14in; border-top: 1px dashed #E2E8F0; padding-top: 0.1in; }
.figlist li { font-size: 12.5pt !important; margin-bottom: 0.04in !important; }
table.mini { border-collapse: collapse; width: 100%; font-size: 11.5pt; margin-top: 0.1in; }
table.mini th { background: #0F2D4A; color: #FFF; font-weight: 700; padding: 0.05in 0.08in; white-space: nowrap; }
table.mini td { border-bottom: 1px solid #E2E8F0; padding: 0.04in 0.08in; text-align: center; color: #334155; }
table.mini td:first-child { text-align: left; }
.bars { margin-top: 0.08in; display: grid; grid-template-columns: 2.9in 1fr 0.95in; gap: 0.06in 0.1in; align-items: center; font-size: 11.5pt; color: #334155; }
.bar { height: 0.2in; border-radius: 4px; background: #E2E8F0; position: relative; }
.bar i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; background: #0F2D4A; }
.bar i.red { background: #991B1B; }
.bars .v { font-weight: 700; color: #0F172A; text-align: right; }
/* cover */
.cover { justify-content: center; align-items: center; text-align: center; padding: 0.7in 1.4in; gap: 0; }
.cover .kicker { font-size: 14pt; color: #64748B; letter-spacing: 0.02em; }
.cover .title { font-size: 34pt; font-weight: 700; color: #0F2D4A; line-height: 1.25; margin-top: 0.28in; }
.cover .divider { width: 3.2in; height: 3.5px; background: #2563EB; margin: 0.3in auto; }
.cover .th { font-size: 19pt; font-weight: 700; color: #1E3A8A; line-height: 1.45; }
.cover .venue { font-size: 14pt; color: #334155; margin-top: 0.34in; line-height: 1.55; }
.cover .authors { font-size: 13pt; color: #334155; margin-top: 0.2in; line-height: 1.5; }
.cover .inst { font-size: 12pt; color: #64748B; }
.cover .presenter { margin-top: 0.42in; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 0.14in 0.36in; font-size: 14pt; color: #0F172A; line-height: 1.5; }
`;

const banner = (t) => `<div class="banner"><h1>${t}</h1></div>`;
const footer = (refs, n) => `<div class="footer"><div>${REF} · ${refs}</div><div class="num">${n}</div></div>`;
const img = (file, h) => `<img src="slide-assets/${file}" style="max-height:${h}in" alt="">`;
const item = (n, title, text) => `<div class="num-item"><div class="num-badge">${n}</div><div><h3>${title}</h3><p>${text}</p></div></div>`;

const slides = [];

// 1. Cover
slides.push(`<section class="slide"><div class="content cover">
  <div class="kicker">305432 เครือข่ายเซนเซอร์ (Sensor Networks) · Assignment Paper 3</div>
  <div class="title">OmniLedger: A Secure, Scale-Out,<br>Decentralized Ledger via Sharding</div>
  <div class="divider"></div>
  <div class="th">บัญชีแยกประเภทแบบกระจายศูนย์ที่ปลอดภัยและขยายขนาดแบบ Scale-Out ด้วยการแบ่ง Shard</div>
  <div class="venue">2018 IEEE Symposium on Security and Privacy (SP) · San Francisco, CA, USA · หน้า 583–598<br>DOI: 10.1109/SP.2018.000-5 · IEEE Xplore: 8418625</div>
  <div class="authors">Eleftherios Kokoris-Kogias, Philipp Jovanovic, Linus Gasser, Nicolas Gailly, Ewa Syta, Bryan Ford<br><span class="inst">École Polytechnique Fédérale de Lausanne (EPFL), Switzerland · Trinity College, USA</span></div>
  <div class="presenter">ผู้นำเสนอ: นายธีรภัทร ภู่ระย้า ลำดับที่ 10 · รหัสนิสิต 66362416</div>
</div></section>`);

// 2. Research challenges & problem statement
slides.push(`<section class="slide">${banner('ที่มาและปัญหาความท้าทาย (Research Challenges &amp; Problem Statement)')}
<div class="content"><div class="grid2" style="grid-template-columns: 0.56fr 0.44fr;">
  <div class="col">
    <div class="card royal" style="flex:1; display:flex; flex-direction:column;">
      <h2>ความท้าทายหลัก 3 ประการที่ผู้เขียนตั้งไว้ (Section I)</h2>
      <div class="stack">
        ${item(1, 'เลือก validator ที่เป็นตัวแทนทางสถิติ', 'สุ่มกลุ่ม validator จากระบบ permissionless โดยทนต่อ Sybil attack ผ่าน Proof-of-Work หรือ Proof-of-Stake')}
        ${item(2, 'ไม่ให้ shard ใดถูกยึดตลอดอายุระบบ', 'shard ต้องใหญ่พอ และต้องสร้างใหม่เป็นระยะด้วยค่าสุ่มที่ผู้โจมตีบิดเบือนไม่ได้ (bias-resistant)')}
        ${item(3, 'ธุรกรรมข้าม shard ต้องเป็น atomic', 'สำเร็จทั้งหมดหรือยกเลิกทั้งหมด เงินต้องไม่ถูกใช้ซ้ำและไม่ถูกล็อกค้างถาวร')}
      </div>
    </div>
    <div class="card">
      <h2>แบบจำลองผู้โจมตี (Threat Model, Section III)</h2>
      <ul>
        <li>validator ที่ไม่ซื่อสัตย์มีได้ไม่เกิน <strong>25% (n = 4f)</strong></li>
        <li>ผู้โจมตีปรับตัวได้ช้าในระดับ epoch (mildly adaptive)</li>
        <li>ช่องทางสื่อสารระหว่าง validator ที่ซื่อสัตย์เป็นแบบ synchronous</li>
      </ul>
    </div>
  </div>
  <div class="col">
    <div class="card fig" style="flex:1; justify-content:center;">
      ${img('fig1_tradeoffs_trim.png', 2.75)}
      <div class="caption">ภาพที่ 1: ระบบเดิมได้เพียงสองในสามด้าน (Fig. 1 ของบทความ)</div>
      <ul class="figlist">
        <li><strong>Elastico:</strong> ขยายได้และกระจายศูนย์ แต่ shard เล็ก (100 validator) ล้มเหลว 2.76% ต่อ shard ต่อบล็อกที่ผู้โจมตี 25%</li>
        <li><strong>ByzCoin:</strong> กระจายศูนย์และปลอดภัย แต่ความจุรวมไม่เพิ่มตามจำนวน validator</li>
        <li><strong>RSCoin:</strong> ขยายได้และปลอดภัย แต่สละการกระจายศูนย์แบบ permissionless</li>
      </ul>
    </div>
    <div class="metrics" style="grid-template-columns: repeat(3, 1fr);">
      <div class="metric"><div class="val">1 ชม.</div><div class="lbl">เวลาก่อนล้มเหลวของ Elastico (Table IV)</div></div>
      <div class="metric"><div class="val">600 s</div><div class="lbl">latency ของ Bitcoin (Table IV)</div></div>
      <div class="metric"><div class="val">4,000</div><div class="lbl">tx/s ค่าเฉลี่ยของ Visa ที่บทความใช้เทียบ</div></div>
    </div>
  </div>
</div></div>${footer('Section I–III, Fig. 1, Table IV', 2)}</section>`);

// 3. Proposed logical model & metrics
slides.push(`<section class="slide">${banner('แบบจำลองเชิงตรรกะและตัวชี้วัด (Proposed Logical Model &amp; Metrics)')}
<div class="content"><div class="grid2" style="grid-template-columns: 0.64fr 0.36fr;">
  <div class="col">
    <div class="card fig">
      ${img('fig2_architecture.png', 2.45)}
      <div class="caption">ภาพที่ 2: สถาปัตยกรรม OmniLedger ในหนึ่ง epoch: (1) Sharding (2) Consensus (3) TX Commit (Fig. 2 ของบทความ)</div>
    </div>
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.16in; flex:1;">
      <div class="card royal vc"><h3>1. Sharding ด้วยค่าสุ่มที่บิดเบือนไม่ได้</h3><p>เลือกผู้นำด้วย VRF ให้ผู้นำรัน RandHound แล้วจัด validator เข้า shard ทยอยสลับครั้งละ k = log(n/m)</p></div>
      <div class="card royal vc"><h3>2. ByzCoinX ภายใน shard</h3><p>Byzantine consensus สื่อสารแบบกลุ่มความลึกคงที่ ทนโหนดล้ม และ commit ธุรกรรมที่ไม่ขัดแย้งแบบขนาน</p></div>
      <div class="card royal vc"><h3>3. Atomix ข้าม shard</h3><p>Initialize → Lock (proof-of-acceptance หรือ rejection) → Unlock to Commit หรือ Unlock to Abort</p></div>
      <div class="card royal vc"><h3>4. State blocks และ trust-but-verify</h3><p>สรุปสถานะเพื่อตัดประวัติเก่า และให้กลุ่ม optimistic ยืนยันธุรกรรมมูลค่าต่ำก่อน core ตรวจซ้ำ</p></div>
    </div>
  </div>
  <div class="col">
    <div class="section-label">ตัวชี้วัดที่ใช้ประเมิน 4 ด้าน</div>
    <div class="card vc" style="flex:1;"><h3>Throughput (tps)</h3><p>จำนวนธุรกรรมต่อวินาทีเมื่อเพิ่ม shard และสัดส่วนผู้โจมตี</p><p class="note">Table II, Fig. 6</p></div>
    <div class="card vc" style="flex:1;"><h3>Confirmation latency (วินาที)</h3><p>เวลายืนยันแบบ regular และแบบสองชั้นของ trust-but-verify</p><p class="note">Table I, Fig. 8</p></div>
    <div class="card vc" style="flex:1;"><h3>Failure probability ต่อ epoch</h3><p>โอกาสที่ shard ใดถูกยึด รวมทั้ง epoch ด้วย union bound</p><p class="note">Eq. (1)–(2), Section VI</p></div>
    <div class="card vc" style="flex:1;"><h3>ต้นทุน bootstrap</h3><p>เวลาเปลี่ยน epoch และแบนด์วิดท์ของ validator ใหม่</p><p class="note">Fig. 7, Fig. 11</p></div>
  </div>
</div></div>${footer('Section IV–V, Fig. 2', 3)}</section>`);

// 4. Scenario study & system formulation
slides.push(`<section class="slide">${banner('กรณีศึกษาและการจำลองระบบ (Scenario Study &amp; System Formulation)')}
<div class="content">
  <div class="metrics" style="grid-template-columns: repeat(4, 1fr); flex:none;">
    <div class="metric"><div class="val">60 → 1,800</div><div class="lbl">เครื่องจริงบน DeterLab → โหนดที่จำลอง (ต้นแบบภาษา Go)</div></div>
    <div class="metric"><div class="val sm">20 Mbps · 100 ms</div><div class="lbl">แบนด์วิดท์และความหน่วงที่กำหนดทุกลิงก์</div></div>
    <div class="metric"><div class="val">10,000</div><div class="lbl">บล็อกแรกของ Bitcoin ที่ใช้เป็นข้อมูลตั้งต้น</div></div>
    <div class="metric"><div class="val">1% – 25%</div><div class="lbl">สัดส่วนผู้โจมตีที่ทดสอบใน 4 การตั้งค่า</div></div>
  </div>
  <div class="grid2" style="grid-template-columns: 0.54fr 0.46fr;">
    <div class="card royal vc">
      <h2>สมการหลักของความปลอดภัย (Section VI)</h2>
      <div class="eq">P[X ≤ ⌊n/3⌋] = Σ<sub>k=0</sub><sup>⌊n/3⌋</sup> C(n, k) · m<sup>k</sup> · (1 − m)<sup>n−k</sup>   (1)</div>
      <div class="eq">P[X<sub>E</sub>] ≤ Σ<sub>k=0</sub><sup>l</sup> (1/4<sup>k</sup>) · n · P[X<sub>S</sub>]  ⇒  (4/3) · n · P[X<sub>S</sub>]   (2)</div>
      <ul>
        <li><strong>X</strong> จำนวนโหนดไม่ซื่อสัตย์ใน shard, <strong>m</strong> สัดส่วนผู้โจมตี (≤ 0.25)</li>
        <li><strong>n</strong> ขนาด shard ใน (1) แต่เป็นจำนวน shard ใน (2), <strong>l</strong> รอบที่ผู้โจมตีคุมผู้นำ</li>
        <li><strong>P[X<sub>S</sub>]</strong> โอกาส shard ล้มเหลว, <strong>P[X<sub>E</sub>]</strong> โอกาสล้มเหลวทั้ง epoch</li>
        <li>ผู้โจมตี 12.5% กับ 16 shard ได้ <strong>4 × 10<sup>−5</sup> ต่อ epoch</strong> (≈ 1 ครั้งใน 68.5 ปี)</li>
      </ul>
      <p class="evi"><b>หมายเหตุ:</b> สมการ (1) เขียนตามรูปที่ถูกต้อง ในบทความพิมพ์ขอบบนของผลรวมเป็น n ซึ่งทำให้ผลรวมเท่ากับ 1 เสมอ (หน้า 591)</p>
    </div>
    <div class="col">
      <div class="card fig" style="flex:1; justify-content:center;">
        ${img('raw/img-005.png', 2.55)}
        <div class="caption">ภาพที่ 3: ขนาด shard ที่ต้องใช้เพื่อให้โอกาสล้มเหลว 10<sup>−6</sup> (ซ้าย) และความมั่นใจของกลุ่ม optimistic (ขวา) (Fig. 5)</div>
      </div>
      <div class="card">
        <h3>4 การตั้งค่าที่ทดสอบ [ขนาด shard, ผู้โจมตี]</h3>
        <p><span class="tag">[4, 1%]</span><span class="tag">[25, 5%]</span><span class="tag">[70, 12.5%]</span><span class="tag">[600, 25%]</span></p>
        <p class="note" style="margin-top:0.06in;">ผู้โจมตีมากขึ้น shard ต้องใหญ่ขึ้นมากเพื่อรักษาระดับความเสี่ยงเดิม</p>
      </div>
    </div>
  </div>
</div>${footer('Section VI–VIII-A, Eq. (1)–(2), Fig. 5', 4)}</section>`);

// 5. Quantitative evaluation & findings
slides.push(`<section class="slide">${banner('ผลการทดสอบเชิงปริมาณและข้อค้นพบ (Quantitative Evaluation &amp; Findings)')}
<div class="content"><div class="grid2" style="grid-template-columns: 0.5fr 0.5fr;">
  <div class="card fig" style="justify-content:center;">
    ${img('fig6_throughput.png', 4.4)}
    <div class="caption">ภาพที่ 4: throughput ที่ 1,800 โหนด ตามการตั้งค่า [ขนาด shard, ผู้โจมตี] (Fig. 6, สเกล log)</div>
    <table class="mini">
      <tr><th>อ่านจากกราฟ (tps)</th><th>[4, 1%]</th><th>[25, 5%]</th><th>[70, 12.5%]</th><th>[600, 25%]</th></tr>
      <tr><td>regular</td><td>431,600</td><td>25,700</td><td>6,800</td><td>450</td></tr>
      <tr><td>trust-but-verify</td><td>431,600</td><td>91,200</td><td>19,900</td><td>2,200</td></tr>
    </table>
    <p class="note" style="align-self:stretch; margin-top:0.06in;">ค่าในตารางผู้นำเสนออ่านจากพิกัดแท่งกราฟในไฟล์ PDF จึงเป็นค่าประมาณ บทความไม่ได้พิมพ์ตัวเลขเหล่านี้</p>
  </div>
  <div class="col">
    <div class="metrics" style="grid-template-columns: repeat(3, 1fr);">
      <div class="metric"><div class="val sm">439 → 5,850</div><div class="lbl">tps เมื่อเพิ่ม shard จาก 1 เป็น 16 (Table II)</div></div>
      <div class="metric"><div class="val green">1.38 s</div><div class="lbl">ยืนยันชั้นแรก (Table I) เมื่อผู้โจมตี ≤ 12.5%</div></div>
      <div class="metric"><div class="val">4 × 10<sup style="font-size:55%">−5</sup></div><div class="lbl">โอกาสล้มเหลวต่อ epoch ≈ 1 ครั้งใน 68.5 ปี</div></div>
    </div>
    <div class="card" style="flex:1; display:flex; flex-direction:column;">
      <h2>ข้อค้นพบสำคัญ</h2>
      <div class="stack">
        ${item(1, 'Scale-out ใกล้เชิงเส้นแต่ลดลงตามจำนวน shard', 'ประสิทธิภาพต่อ shard 99.0% ที่ 2 shard เหลือ 83.3% ที่ 16 shard (Table II: shard ละ 70 โหนด ผู้โจมตี 12.5%)')}
        ${item(2, 'ByzCoinX ทำงานขนานได้ผล', 'throughput เพิ่ม 20% และ latency ต่อบล็อกลด 35% เมื่อแบ่งเป็น 4 บล็อกขนาน แต่ขนานมากกว่านั้นเริ่มช้าลง (Fig. 9)')}
        ${item(3, 'การเปลี่ยน epoch มีต้นทุนสูง', 'RandHound ใช้เวลามากกว่า 70% ของการ bootstrap กรณีแย่สุดประมาณ 3 ชั่วโมง ระบบจึงใช้ epoch ยาว 1 วัน (Fig. 7)')}
        <div class="num-item"><div class="num-badge red">4</div><div><h3 style="color:#991B1B;">ตัวเลขพาดหัวไม่ตรงกับกราฟ</h3><p>Section VIII-B ระบุ <strong>13,000 tps</strong> ที่ 1,800 โหนด 25 shard แต่ Fig. 6 อ่านได้ ≈ 6,800 หรือ ≈ 19,900 tps และการยืนยันขั้นสุดท้ายที่ผู้โจมตี 25% ใช้ <strong>62.96 s</strong> (Table I)</p></div></div>
      </div>
    </div>
  </div>
</div></div>${footer('Section VIII, Fig. 6–9, Table I–II', 5)}</section>`);

// 6. Academic contributions & practical impact
slides.push(`<section class="slide">${banner('คุณูปการทางวิชาการและการประยุกต์ใช้ (Academic Contributions &amp; Practical Impact)')}
<div class="content"><div class="grid2" style="grid-template-columns: 1fr 1fr;">
  <div class="col">
    <div class="section-label royal">คุณูปการทางวิชาการ (Academic Contributions)</div>
    <div class="card royal vc" style="flex:1;"><h2>1. การแบ่ง shard ที่วัดความเสี่ยงได้</h2><p>RandHound ร่วมกับ VRF สุ่มสมาชิก shard ที่ผู้โจมตีบิดเบือนไม่ได้ และ Eq. (1)–(2) ผูกขนาด shard กับโอกาสล้มเหลว (เช่น 10<sup>−6</sup>)</p><p class="evi"><b>หลักฐาน:</b> Fig. 5 และ Table IV: เวลาก่อนล้มเหลว 68.5 ปี เทียบ Elastico ที่ใช้ shard เล็ก 1 ชั่วโมง</p></div>
    <div class="card royal vc" style="flex:1;"><h2>2. Atomix: atomic commit ข้าม shard</h2><p>lock แล้ว unlock โดยใช้ proof ที่มีลายเซ็นของ shard เป็นหลักฐาน ไม่ต้องมีผู้ประสานกลางและ shard ไม่ต้องคุยกันเอง</p><p class="evi"><b>หลักฐาน:</b> Fig. 8: shard 70 โหนด latency ที่ client เห็นราว 9 ถึง 12 s จาก 1 ถึง 7 shard (shard 600 โหนดเพิ่มจากราว 15 เป็น 26 s)</p></div>
    <div class="card royal vc" style="flex:1;"><h2>3. วิศวกรรมระบบที่วัดผลได้</h2><p>ByzCoinX, state blocks และ trust-but-verify ถูกพัฒนาเป็นต้นแบบภาษา Go และทดลองที่ 1,800 โหนด</p><p class="evi"><b>หลักฐาน:</b> ByzCoinX +20% / −35% (Fig. 9) และ state blocks คุ้มเมื่อ validator ตามไม่ทันเกิน 19 วัน (Fig. 11)</p></div>
  </div>
  <div class="col">
    <div class="section-label">การประยุกต์ใช้ (ความเห็นของผู้นำเสนอ)</div>
    <div class="card vc" style="flex:1;"><h2>1. Kafka partition และข้อความข้าม partition</h2><p>shard คล้าย partition ที่กระจายตาม key จึงขยาย throughput ด้วยการแบ่ง state เหมือนกัน</p><p class="evi"><b>จุดต่าง:</b> Kafka รับมือโหนดล้ม (crash fault) แต่ไม่ได้ออกแบบให้ทนโหนดที่ตั้งใจโกง จึงไม่ต้องสุ่มสมาชิกใหม่ทุก epoch</p></div>
    <div class="card vc" style="flex:1;"><h2>2. Two-phase commit และ Saga ใน microservices</h2><p>Atomix มีโครง lock แล้ว commit หรือย้อนกลับ คล้าย prepare/commit ของ two-phase commit</p><p class="evi"><b>จุดต่าง:</b> Atomix ใช้ client และ proof ที่มีลายเซ็นแทน coordinator ส่วน Saga ย้อนงานด้วย compensating transaction</p></div>
    <div class="card vc" style="flex:1;"><h2>3. ชั้น gateway ของเครือข่ายเซนเซอร์</h2><p>แบ่ง gateway ตามพื้นที่เป็นกลุ่ม สุ่มสลับสมาชิก และบันทึกเหตุการณ์ข้ามพื้นที่แบบ atomic</p><p class="evi"><b>ข้อจำกัด:</b> ไม่เหมาะรันบนโหนดเซนเซอร์ เพราะ BFT และลายเซ็นดิจิทัลมีต้นทุนพลังงานและการสื่อสารสูง</p></div>
  </div>
</div></div>${footer('Section IV–VIII · ฝั่งขวาเป็นความเห็นของผู้นำเสนอ', 6)}</section>`);

// 7. Engineering limitations & conclusion
slides.push(`<section class="slide">${banner('ข้อจำกัดทางวิศวกรรมและบทสรุป (Engineering Limitations &amp; Conclusion)')}
<div class="content"><div class="grid2" style="grid-template-columns: 1.08fr 0.92fr;">
  <div class="col">
    <div class="section-label hazard">ข้อจำกัดที่ตรวจพบ (Limitations)</div>
    <div class="card hazard vc" style="flex:1.15;"><h2>1. ผล scale-out ไม่ได้แยกผลของธุรกรรมข้าม shard</h2>
      <div class="bars">
        <div>Table II (ผลทดลอง, 4 shard)</div><div class="bar"><i style="width:95.3%"></i></div><div class="v">3.81×</div>
        <div>Appendix C (ประมาณการของผู้เขียน)</div><div class="bar"><i class="red" style="width:39%"></i></div><div class="v">1.56×</div>
        <div>คิดแบบงานรวม (ผู้นำเสนอ)</div><div class="bar"><i class="red" style="width:43.3%"></i></div><div class="v">1.46–1.73×</div>
      </div>
      <p class="evi"><b>ประเด็น:</b> ค่าอุดมคติคือ 4× บทความไม่ระบุสัดส่วนธุรกรรมข้าม shard ในการทดลอง throughput ขณะที่ Appendix C คาดว่าธุรกรรมส่วนใหญ่จะข้าม shard</p></div>
    <div class="card hazard vc" style="flex:1.3;"><h2>2. สมการและตัวเลขไม่สอดคล้อง</h2>
      <div class="fig">${img('appC_eq3_only.png', 0.82)}<div class="caption" style="margin-top:0.03in;">Eq. (3) ตามที่พิมพ์ (Appendix C, หน้า 597): สัมประสิทธิ์ (m − k)/m ควรเป็น (m − k + 1)/m</div></div>
      <p class="evi"><b>จุดอื่น:</b> Eq. (1) ขอบบนเป็น n, throughput มีทั้ง 6,000 และ 13,000 tps, Table IV อ้าง 2,400 validator ทั้งที่ทดลองสูงสุด 1,800 โหนด</p></div>
    <div class="card hazard vc" style="flex:0.7;"><h2>3. ขอบเขตการทดลองจำกัด</h2><p>เครือข่ายจำลองแบบค่าคงที่ กรณีผู้โจมตี 25% ที่ 4,000 tps (≈ 4,200 โหนด) เป็นเพียงค่าประมาณ และไม่รายงานส่วนเบี่ยงเบนมาตรฐาน</p></div>
  </div>
  <div class="col">
    <div class="section-label">บทสรุปและการต่อยอด (Conclusion)</div>
    <div class="card vc" style="flex:1;"><h2>1. ข้อสรุปหลัก</h2><p>sharding ร่วมกับ BFT consensus และ atomic commit ทำให้ขยายแบบ scale-out ได้ โดยวัดความเสี่ยงเป็นตัวเลข</p><p class="evi"><b>หลักฐาน:</b> 439 → 5,850 tps (Table II), ยืนยันชั้นแรก 1.38 s และ 4 × 10<sup>−5</sup> ต่อ epoch</p></div>
    <div class="card vc" style="flex:1;"><h2>2. วิธีนำไปใช้อย่างระมัดระวัง</h2><p>นำแนวคิดสถาปัตยกรรมและแบบจำลองความเสี่ยงไปใช้ และทดสอบ throughput กับภาระงานจริงก่อนอ้างอิงตัวเลข</p><p class="evi"><b>ตัวอย่าง:</b> วัดสัดส่วนธุรกรรมที่ข้าม partition ก่อนเลือกจำนวน shard</p></div>
    <div class="card vc" style="flex:1;"><h2>3. งานต่อยอดที่ผู้เขียนระบุ</h2><p>จัด shard ตาม locality เพื่อลดธุรกรรมข้าม shard ลดต้นทุน epoch ด้วย BLS signature และเพิ่มการป้องกัน censorship</p><p class="evi"><b>ที่มา:</b> Section X (Limitation and Future Work) และ Appendix A</p></div>
  </div>
</div></div>${footer('Section X, Appendix C, Table I, II, IV', 7)}</section>`);

// Keep "Table II", "Fig. 6", "Eq. (1)" and Thai compounds such as ผู้โจมตี from splitting at a line end.
function tidy(h) {
  return h
    .replace(/(Table|Fig\.|Eq\.|Section|Appendix) ((?:\(\d\)|[IVX]+(?:-[A-Z])?|\d+|[A-C])(?![\w-]))/g, '$1\u00A0$2')
    .replace(/>([^<]+)</g, (m, t) => '>' + t
      .replace(/(ผู้นำเสนอ|ผู้โจมตี|ผู้เขียน|ผู้ประสาน|ผู้นำ)/g, '<span class="nw">$1</span>')
      .replace(/\b([A-Za-z]+(?:-[A-Za-z]+)+)\b/g, '<span class="nw">$1</span>') + '<');
}
const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><title>Assignment Paper 3: OmniLedger (7 slides)</title><style>${CSS}</style></head><body>${tidy(slides.join('\n'))}</body></html>`;

async function main() {
  fs.writeFileSync(OUT_HTML, html);
  fs.mkdirSync(HIRES, { recursive: true });
  fs.mkdirSync(WEB, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_PDF), { recursive: true });
  let browser;
  try { browser = await chromium.launch(); } catch (e) { browser = await chromium.launch({ channel: 'chrome' }); }
  const page = await browser.newPage({ viewport: { width: 1536, height: 864 }, deviceScaleFactor: 2 });
  await page.goto('file://' + OUT_HTML, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  // Layout check: every card fits, content stays above the footer, nothing leaves the slide.
  const problems = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.slide').forEach((s, i) => {
      const sr = s.getBoundingClientRect();
      const footer = s.querySelector('.footer');
      const fTop = footer ? footer.getBoundingClientRect().top : sr.bottom;
      s.querySelectorAll('.card, .metric, .section-label, .eq, .fig img').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) out.push(`slide ${i + 1}: overflow in ${el.className} "${(el.innerText || '').slice(0, 40)}"`);
        if (r.bottom > fTop + 0.5) out.push(`slide ${i + 1}: ${el.className} runs into footer by ${(r.bottom - fTop).toFixed(1)}px`);
        if (r.right > sr.right - 0.5 || r.left < sr.left) out.push(`slide ${i + 1}: ${el.className} leaves the slide`);
      });
    });
    return out;
  });
  if (problems.length) { console.error('LAYOUT PROBLEMS:\n' + problems.join('\n')); }

  await page.pdf({ path: OUT_PDF, width: '16in', height: '9in', printBackground: true, preferCSSPageSize: true });
  const handles = await page.$$('.slide');
  for (let i = 0; i < handles.length; i++) {
    const hi = path.join(HIRES, `slide-${i + 1}.png`);
    await handles[i].screenshot({ path: hi });
  }
  await browser.close();

  // Web copies at 1600 px wide.
  const sharp = require('sharp');
  for (let i = 1; i <= handles.length; i++) {
    await sharp(path.join(HIRES, `slide-${i}.png`)).resize({ width: 1600 }).png({ compressionLevel: 9 }).toFile(path.join(WEB, `slide-${i}.png`));
  }
  console.log(`slides: ${handles.length}  PDF -> ${OUT_PDF}`);
  console.log(`hi-res PNG -> ${HIRES}  web PNG -> ${WEB}`);
  if (problems.length) process.exitCode = 2;
}

main().catch((e) => { console.error(e); process.exit(1); });
