// Build the Paper III Version 2 deck (7 slides, 16 x 9 in) on the light academic theme of
// SLIDES_DESIGN_SYSTEM.md.
//
//   NODE_PATH=../../work1/.build/node_modules node build_slides_v2.js
//
// slides.html (templates below)
//   -> 03_slides_v2/Assignment_Paper_3_v2_5-to-8-min.pdf   (Chromium print, 16 x 9 in)
//   -> .build_v2/slides-hires/slide-N.png                   (2x, for the PPTX)
//   -> ../../paper-3/assets/v2/slides/slide-N.png           (1600 px, for the web slide viewer and studio)
//
// Tokens: banner #0F2D4A 0.95 in, canvas #F8FAFC, white cards with a 1 px #E2E8F0 border and no
// shadow, footer 0.45 in with the citation left and "Slide N / 7" right. Type: IBM Plex Thai,
// card titles 14.5 pt bold, body 11.5 pt regular, metric numbers 24 pt bold, captions 10.5 pt.
// A layout check fails the build if any card overflows or runs into the footer.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const deck = require('./deck_v2');

const ROOT = path.resolve(__dirname, '..');
const OUT_HTML = path.join(__dirname, 'slides.html');
const OUT_PDF = path.join(ROOT, '03_slides_v2', 'Assignment_Paper_3_v2_5-to-8-min.pdf');
const HIRES = path.join(__dirname, 'slides-hires');
const WEB = path.resolve(ROOT, '..', '..', 'paper-3', 'assets', 'v2', 'slides');
const FIGS = path.resolve(ROOT, '..', '..', 'paper-3', 'assets', 'v2', 'figs');
const fig = (name) => 'file://' + path.join(FIGS, name);

const REF = 'Dautov &amp; Husom · SEAMS 2024 · IEEE Doc ID: 10556381 · DOI: 10.1145/3643915.3644093';

const CSS = `
@page { size: 16in 9in; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #FFFFFF; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "IBM Plex Thai", Tahoma, sans-serif; font-weight: 400; color: #334155; }
b, strong, h1, h2, h3 { font-weight: 700; }
.slide { width: 16in; height: 9in; background: #F8FAFC; display: flex; flex-direction: column; overflow: hidden; position: relative; break-after: page; }
.banner { height: 0.95in; flex: none; background: #0F2D4A; display: flex; align-items: center; justify-content: space-between; padding: 0 0.8in; }
.banner h1 { font-size: 21pt; color: #FFFFFF; line-height: 1.25; }
.banner .tag { font-size: 10.5pt; color: #CBD5E1; white-space: nowrap; }
.content { flex: 1; min-height: 0; padding: 0.35in 0.8in 0.25in; display: flex; flex-direction: column; gap: 0.2in; }
.footer { height: 0.45in; flex: none; border-top: 1px solid #E2E8F0; background: #F8FAFC; display: flex; justify-content: space-between; align-items: center; padding: 0 0.8in; font-size: 10.5pt; color: #64748B; }
.footer .num { font-size: 12pt; font-weight: 700; color: #0F2D4A; }
.grid2 { display: grid; gap: 0.3in; min-height: 0; flex: 1; }
.col { display: flex; flex-direction: column; gap: 0.18in; min-height: 0; }
.card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 0.18in 0.24in; overflow: hidden; }
.vc { display: flex; flex-direction: column; justify-content: center; }
.card h2 { font-size: 15pt; color: #0F2D4A; line-height: 1.35; margin-bottom: 0.08in; }
.card h3 { font-size: 14.5pt; color: #0F2D4A; line-height: 1.35; margin-bottom: 0.05in; }
.royal h2, .royal h3 { color: #1E3A8A; }
.hazard h2, .hazard h3 { color: #991B1B; }
.good h2, .good h3 { color: #047857; }
.card p, .card li, .card td, .card th { font-size: 11.5pt; line-height: 1.55; color: #334155; }
.card strong, .card b { color: #0F172A; }
.card ul, .card ol { padding-left: 0; list-style: none; }
.card ul li { padding-left: 0.2in; position: relative; margin-bottom: 0.04in; }
.card ul li::before { content: ""; position: absolute; left: 0.04in; top: 0.1in; width: 0.07in; height: 0.07in; border-radius: 50%; background: #2563EB; }
.hazard ul li::before { background: #991B1B; }
.card ol { counter-reset: s; }
.card ol li { counter-increment: s; padding-left: 0.3in; position: relative; margin-bottom: 0.04in; }
.card ol li::before { content: counter(s); position: absolute; left: 0; top: 0.03in; width: 0.2in; height: 0.2in; border-radius: 50%; background: #E0E7FF; color: #1E3A8A; font-size: 9.5pt; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.src { margin-top: 0.08in; padding-top: 0.06in; border-top: 1px dashed #E2E8F0; font-size: 10pt !important; color: #64748B !important; line-height: 1.45 !important; }
.num-item { display: grid; grid-template-columns: 0.4in 1fr; gap: 0.02in 0.08in; align-items: start; }
.badge { width: 0.32in; height: 0.32in; border-radius: 50%; background: #1E3A8A; color: #FFFFFF; font-weight: 700; font-size: 11.5pt; display: flex; align-items: center; justify-content: center; margin-top: 0.02in; }
.hazard .badge { background: #991B1B; }
.good .badge { background: #047857; }
.navy .badge { background: #0F2D4A; }
.figbox { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 0.12in; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 0; overflow: hidden; }
.figbox img { display: block; max-width: 100%; max-height: 100%; object-fit: contain; flex: none; }
.caption { font-size: 10.5pt; color: #64748B; line-height: 1.4; margin-top: 0.06in; text-align: center; }
.metrics { display: grid; gap: 0.16in; }
.metric { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 0.1in 0.16in; text-align: center; display: flex; flex-direction: column; justify-content: center; }
.metric .val { font-size: 24pt; font-weight: 700; color: #0F2D4A; line-height: 1.15; white-space: nowrap; }
.metric .val.red { color: #991B1B; }
.metric .val.green { color: #059669; }
.metric .lbl { font-size: 10.5pt; color: #64748B; margin-top: 0.05in; line-height: 1.4; }
.formula { font-family: Menlo, Consolas, monospace; font-size: 12pt; color: #0F172A; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.1in 0.16in; line-height: 1.6; }
.formula .c { color: #64748B; }
table.mini { width: 100%; border-collapse: collapse; }
table.mini th { color: #0F2D4A; text-align: left; font-size: 11pt !important; padding: 0.04in 0.08in; border-bottom: 1.5px solid #0F2D4A; }
table.mini td { padding: 0.035in 0.08in; border-bottom: 1px solid #E2E8F0; vertical-align: top; }
table.mini tr.hl td { background: #EFF6FF; color: #0F172A; font-weight: 700; }
table.mini.tight td, table.mini.tight th { line-height: 1.3; padding-top: 0.025in; padding-bottom: 0.025in; }
table.mini td.n, table.mini th.n { text-align: right; font-variant-numeric: tabular-nums; }
.facts { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 0.08in 0.22in; align-content: space-evenly; }
.fact .fk { font-size: 10.5pt; color: #1E3A8A; font-weight: 700; }
.fact .fv { font-size: 11.5pt; color: #334155; line-height: 1.45; }
.label { font-size: 11pt; font-weight: 700; color: #1E3A8A; margin-bottom: -0.06in; }
.label.hz { color: #991B1B; } .label.gd { color: #047857; }
.nw { white-space: nowrap; }
/* cover (centered, no banner) */
.cover { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 1.3in; }
.cover .kicker { font-size: 13pt; color: #1E3A8A; font-weight: 700; margin-bottom: 0.3in; }
.cover h1 { font-size: 34pt; line-height: 1.25; color: #0F2D4A; }
.cover .th { font-size: 19pt; font-weight: 600; color: #1E3A8A; margin-top: 0.2in; line-height: 1.45; }
.cover .rule { width: 2.2in; height: 3.5px; background: #2563EB; margin: 0.34in auto; }
.cover .meta { font-size: 13.5pt; color: #334155; line-height: 1.75; }
.cover .meta b { color: #0F172A; }
.cover .ids { display: inline-flex; gap: 0.18in; margin-top: 0.18in; }
.cover .ids span { font-size: 12pt; font-weight: 700; color: #0F2D4A; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.06in 0.16in; }
.cover .who { margin-top: 0.34in; font-size: 14pt; color: #0F172A; }
`;

const footer = (src, n) => `<div class="footer"><span>${REF}${src ? ' · ' + src : ''}</span><span class="num">Slide ${n} / 7</span></div>`;
const banner = (title, tag) => `<div class="banner"><h1>${title}</h1>${tag ? `<span class="tag">${tag}</span>` : ''}</div>`;
const item = (n, title, body, extra = '') => `<div class="num-item"><div class="badge">${n}</div><div><h3>${title}</h3><p>${body}</p>${extra}</div></div>`;
const src = (t) => `<p class="src">${t}</p>`;

// Schematic drawings (captioned with the section they summarise).
const spofSvg = `
<svg viewBox="0 0 520 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Thai, Tahoma" font-size="15">
  <g stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 5">
    <line x1="260" y1="118" x2="80" y2="230"/><line x1="260" y1="118" x2="200" y2="240"/>
    <line x1="260" y1="118" x2="320" y2="240"/><line x1="260" y1="118" x2="440" y2="230"/>
  </g>
  <circle cx="260" cy="80" r="50" fill="#FEF2F2" stroke="#991B1B" stroke-width="3"/>
  <text x="260" y="77" fill="#991B1B" text-anchor="middle" font-weight="700" font-size="16">aggregator</text>
  <text x="260" y="99" fill="#991B1B" text-anchor="middle" font-size="13">1 เครื่อง</text>
  <circle cx="311" cy="37" r="16" fill="#991B1B"/>
  <g stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"><line x1="304" y1="30" x2="318" y2="44"/><line x1="318" y1="30" x2="304" y2="44"/></g>
  <g fill="#FFFFFF" stroke="#2563EB" stroke-width="2">
    <rect x="30" y="230" width="100" height="44" rx="8"/><rect x="150" y="240" width="100" height="44" rx="8"/>
    <rect x="270" y="240" width="100" height="44" rx="8"/><rect x="390" y="230" width="100" height="44" rx="8"/>
  </g>
  <g fill="#1E3A8A" text-anchor="middle" font-size="14"><text x="80" y="257">worker 1</text><text x="200" y="267">worker 2</text><text x="320" y="267">worker 3</text><text x="440" y="257">worker n</text></g>
  <text x="260" y="312" fill="#991B1B" text-anchor="middle" font-size="15" font-weight="700">aggregator ดับ: การฝึกหยุดทั้งระบบ</text>
</svg>`;

const raftSvg = `
<svg viewBox="0 0 560 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Thai, Tahoma" font-size="14">
  <defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1E3A8A"/></marker></defs>
  <g stroke-width="2.5">
    <rect x="15" y="95" width="130" height="56" rx="10" fill="#EFF6FF" stroke="#2563EB"/>
    <rect x="215" y="95" width="130" height="56" rx="10" fill="#FFFBEB" stroke="#B45309"/>
    <rect x="415" y="95" width="130" height="56" rx="10" fill="#ECFDF5" stroke="#047857"/>
  </g>
  <g text-anchor="middle" font-weight="700" font-size="16"><text x="80" y="129" fill="#1E3A8A">follower</text><text x="280" y="129" fill="#92400E">candidate</text><text x="480" y="129" fill="#065F46">leader</text></g>
  <g stroke="#1E3A8A" stroke-width="2" fill="none" marker-end="url(#a)">
    <path d="M145,110 L213,110"/><path d="M345,110 L413,110"/>
    <path d="M280,95 C280,40 240,40 262,93"/>
    <path d="M415,145 C340,215 150,215 90,153"/><path d="M215,140 L147,140"/>
  </g>
  <g fill="#334155" font-size="13" text-anchor="middle">
    <text x="179" y="92">timeout</text><text x="379" y="92">เสียงข้างมาก</text>
    <text x="250" y="30">timeout ซ้ำ (term ใหม่)</text>
    <text x="280" y="238">พบ term ที่ใหม่กว่า</text><text x="181" y="165">พบ leader</text>
  </g>
</svg>`;

const slides = [];

// 1. Cover
slides.push(`<section class="slide"><div class="cover">
  <div class="kicker">305432 เครือข่ายเซนเซอร์ (Sensor Networks) · Assignment Paper 3</div>
  <h1>Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning</h1>
  <div class="th">การใช้โปรโตคอล Raft เพื่อความทนทานต่อความผิดพลาดและการกู้คืนตนเองในการเรียนรู้แบบสหพันธ์</div>
  <div class="rule"></div>
  <div class="meta"><b>Rustem Dautov, Erik Johannes Husom</b> · SINTEF Digital, Oslo, Norway<br>2024 IEEE/ACM 19th Symposium on Software Engineering for Adaptive and Self-Managing Systems (SEAMS), pp. 110-121</div>
  <div class="ids"><span>IEEE Doc ID: 10556381</span><span>DOI: 10.1145/3643915.3644093</span></div>
  <div class="who">นำเสนอโดย <b>นายธีรภัทร์ ภู่ระยา</b> ลำดับที่ 10 · รหัสนิสิต 66362416</div>
</div>${footer('', 1)}</section>`);

// 2. Problem
slides.push(`<section class="slide">${banner('ที่มาและปัญหาความท้าทาย (Research Challenges &amp; Problem Statement)', 'Section 1-3')}
<div class="content"><div class="grid2" style="grid-template-columns: 0.53fr 0.47fr;">
  <div class="col">
    <div class="card royal vc" style="flex:1.1;">
      <h2>Federated Learning ทำงานอย่างไร (Section 2)</h2>
      <ol>
        <li><b>Model initialisation:</b> aggregator สร้างโมเดลตั้งต้น</li>
        <li><b>Local training:</b> worker ฝึกด้วยข้อมูลของตนเอง ข้อมูลดิบไม่ออกจากเครื่อง</li>
        <li><b>Model update:</b> worker ส่งเฉพาะพารามิเตอร์ที่เปลี่ยน</li>
        <li><b>Aggregation:</b> aggregator รวมพารามิเตอร์ เช่น หาค่าเฉลี่ย</li>
        <li><b>Iteration:</b> ทำขั้นที่ 2 ถึง 4 ซ้ำหลายรอบ</li>
      </ol>
    </div>
    <div class="card hazard vc" style="flex:1;">
      <h2>Single Point of Failure (Section 2.1)</h2>
      <table class="mini">
        <tr><td style="width:24%;"><b>จุดอ่อน</b></td><td>การรวมโมเดลยังอยู่ที่ <b>aggregator เครื่องเดียว</b></td></tr>
        <tr><td><b>สาเหตุที่ดับ</b></td><td>ฮาร์ดแวร์เสีย เครือข่ายขาด หรือเหตุไม่คาดคิด</td></tr>
        <tr><td><b>ผลกระทบ</b></td><td>การฝึกหยุดทั้งระบบ และความคืบหน้าที่ยังไม่บันทึกหายไป</td></tr>
      </table>
    </div>
    <div class="card vc" style="flex:1;">
      <h3>ทางเลือกเดิมและเหตุผลที่ผู้เขียนไม่เลือก (Section 3)</h3>
      <table class="mini">
        <tr><td><b>Gossip / swarm learning</b></td><td>ไม่มีจุดกลาง แต่ยังซับซ้อนเกินกว่าจะใช้ซ้ำได้ทั่วไป</td></tr>
        <tr><td><b>DLT (blockchain)</b></td><td>ใช้พลังประมวลผล พื้นที่ และพลังงานเกินกำลังอุปกรณ์ IoT</td></tr>
        <tr><td><b>Behera et al.</b></td><td>ใช้ Raft เลือกผู้นำใหม่ แต่ไม่สำเนาสถานะการฝึก</td></tr>
      </table>
    </div>
  </div>
  <div class="col">
    <div class="card" style="flex:1; display:flex; flex-direction:column;">
      <h2>จุดอ่อนของโครงสร้างแบบ star</h2>
      <div style="flex:1; min-height:0;">${spofSvg}</div>
      <p class="caption">ภาพที่ 1: โครงสร้างแบบ star ของ Federated Learning (สรุปจาก Section 2.1)</p>
    </div>
    <div class="card navy">
      <h3>ข้อกำหนดของทางแก้ (Section 1)</h3>
      <ul>
        <li>สำเนาสถานะส่วนกลางของคลัสเตอร์ FL ไปยังทุกโหนดอย่างต่อเนื่อง</li>
        <li>โหนดใดก็ได้ต้องขึ้นเป็น aggregator แทนได้เมื่อเครื่องเดิมดับ</li>
        <li>ผนวกกับเฟรมเวิร์ก FL เดิมได้โดยไม่เพิ่ม software stack</li>
      </ul>
    </div>
  </div>
</div></div>${footer('Section 1, 2.1, 3', 2)}</section>`);

// 3. Raft + leader election
slides.push(`<section class="slide">${banner('สถาปัตยกรรม Raft-FL และกลไก Leader Election', 'Section 4.1 · Fig. 2')}
<div class="content"><div class="grid2" style="grid-template-columns: 0.52fr 0.48fr;">
  <div class="col">
    <div class="card" style="flex:1.15; display:flex; flex-direction:column;">
      <h2>สถานะของโหนดใน Raft</h2>
      <div style="flex:1; min-height:0;">${raftSvg}</div>
      <p class="caption">ภาพที่ 2: การเปลี่ยนสถานะ follower, candidate และ leader ตามนิยามของ Raft [Ongaro and Ousterhout, 2014]</p>
    </div>
    <div class="figbox" style="flex:0.62;"><img src="${fig('fig2_election.png')}" style="width:100%;"></div>
    <div class="caption" style="margin-top:-0.1in;">ภาพที่ 3: ช่วง Leader Election ใน Fig. 2 ของบทความ (หน้า 117)</div>
  </div>
  <div class="col">
    <div class="card royal vc" style="flex:1;">${item(1, 'Leader Election', 'follower ที่ไม่ได้รับ heartbeat จนหมด <b>randomised election timeout</b> จะเปลี่ยนเป็น candidate เพิ่มหมายเลข <b>term</b> แล้วส่ง request_vote ผู้ที่ได้<b>เสียงข้างมาก</b>ของสมาชิกทั้งหมดเป็น leader')}</div>
    <div class="card royal vc" style="flex:0.8;">${item(2, 'Heartbeat', 'leader ส่งสัญญาณเป็นระยะ เมื่อสัญญาณเงียบนานเกิน timeout จะเริ่มการเลือกตั้งรอบใหม่')}</div>
    <div class="card royal vc" style="flex:0.8;">${item(3, 'Log Replication', 'leader ส่ง log entry ให้ follower และ <b>commit เมื่อเสียงข้างมากตอบรับ</b> ในบทความนี้ log คือ checkpoint ของพารามิเตอร์')}</div>
    <div class="formula"><span class="c">// quorum of an N-node Raft cluster</span><br>Q = floor(N/2) + 1 &nbsp;&nbsp; f_max = floor((N-1)/2)<br><span class="c">// testbed N = 11 -&gt;</span> Q = 6, f_max = 5</div>
    <div class="card navy" style="flex:none;"><h3>การจับคู่กับ Federated Learning</h3><p><b>Raft leader = FL aggregator</b> และ follower = worker ทุกโหนดรันโค้ดชุดเดียวกัน (Section 5.3)</p></div>
  </div>
</div></div>${footer('Section 4.1, 5.3', 3)}</section>`);

// 4. Checkpoint & self-recovery
slides.push(`<section class="slide">${banner('กลไก Checkpoint Logging และ Self-Recovery Workflow', 'Table 1 · Fig. 1')}
<div class="content"><div class="grid2" style="grid-template-columns: 0.4fr 0.6fr;">
  <div class="col">
    <div class="figbox" style="flex:1;"><img src="${fig('fig1.png')}" style="height:100%;"></div>
    <div class="caption" style="margin-top:-0.08in;">ภาพที่ 4: Algorithm of a Raft-enhanced FL node (Fig. 1 ของบทความ หน้า 116)</div>
  </div>
  <div class="col">
    <div class="card"><h2>ระดับการกู้คืน 5 ระดับ (Table 1, หน้า 114)</h2>
      <table class="mini"><tr><th>ระดับ</th><th>สิ่งที่สำเนา</th><th>ผลเมื่อ aggregator ดับ</th></tr>
        <tr><td>Level 0</td><td>ไม่มี</td><td>ความคืบหน้าหาย</td></tr>
        <tr><td>Level 1</td><td>พารามิเตอร์บนดิสก์ของ aggregator เดิม</td><td>ต้องรอเครื่องเดิมกลับมา</td></tr>
        <tr><td>Level 2</td><td>ไม่มี แต่เลือกผู้นำใหม่ด้วย Raft</td><td>ฝึกใหม่ตั้งแต่ต้น</td></tr>
        <tr class="hl"><td>Level 3</td><td>พารามิเตอร์ที่รวมแล้ว (บทความเลือก)</td><td>ผู้นำใหม่ฝึกต่อจาก checkpoint</td></tr>
        <tr><td>Level 4</td><td>เพิ่มพารามิเตอร์ของ worker ทุกตัว</td><td>ครบที่สุด แต่ซ้ำซ้อนมาก</td></tr></table>
    </div>
    <div class="card royal" style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">
      <h2>Self-Recovery Workflow (Section 5.3)</h2>
      ${item(1, 'Check state', 'aggregator ตรวจสถานะที่สำเนาไว้: จำนวนรอบที่ฝึกแล้ว รอบที่เหลือ และพารามิเตอร์ล่าสุด')}
      ${item(2, 'Checkpoint 3 จุด', 'หลังตั้งค่าพารามิเตอร์ หลังรวมผลการฝึก และหลังรวมผลการประเมิน โดยเขียนลง <b>replicated key-value</b> ของ PySyncObj ที่คัดลอกแบบ asynchronous')}
      ${item(3, 'Aggregator alive?', 'worker ตรวจหลังทุกรอบการฝึกและการประเมิน ถ้า aggregator ไม่ตอบ ทุกโหนดกลับไปเลือกตั้งใหม่')}
      ${item(4, 'Resume', 'aggregator คนใหม่ใช้พารามิเตอร์จาก checkpoint ล่าสุด ไม่ต้องเริ่มฝึกใหม่ตั้งแต่ต้น')}
    </div>
  </div>
</div></div>${footer('Section 4.2, 5.3', 4)}</section>`);

// 5. Results
const rows = [[1, 0.98, '1.77', 1.81], [2, 2.15, '5.17', 2.40], [3, 3.10, '7.94', 2.56], [4, 4.06, '10.9', 2.68], [5, 5.02, '16.0', 3.19], [6, 5.97, '22.6', 3.79], [7, 6.93, '29.3', 4.23], [8, 7.88, '36.8', 4.67], [9, 8.84, '43.9', 4.97], [10, 9.80, '49.1', 5.01]];
slides.push(`<section class="slide">${banner('ผลการทดลองเชิงประจักษ์บน Raspberry Pi 11 บอร์ด', 'Section 6 · Fig. 3-4')}
<div class="content"><div class="grid2" style="grid-template-columns: 0.56fr 0.44fr;">
  <div class="col">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.16in; flex:none;">
      <div class="col" style="gap:0.04in;"><div class="figbox"><img src="${fig('fig3.png')}" style="height:3.3in;"></div><div class="caption">ภาพที่ 5: Fig. 3 เวลาเลือก aggregator ใหม่ (s)</div></div>
      <div class="col" style="gap:0.04in;"><div class="figbox"><img src="${fig('fig4.png')}" style="height:3.3in;"></div><div class="caption">ภาพที่ 6: Fig. 4 ทราฟฟิกต่อ 1 รอบการฝึก (MB)</div></div>
    </div>
    <div class="card" style="flex:1; display:flex; flex-direction:column;"><h2>Testbed (Section 6, 6.1)</h2><div class="facts">
      <div class="fact"><div class="fk">ฮาร์ดแวร์</div><div class="fv">Raspberry Pi 3 จำนวน 11 บอร์ด (1 aggregator + worker สูงสุด 10)</div></div>
      <div class="fact"><div class="fk">เครือข่ายและซอฟต์แวร์</div><div class="fv">wireless LAN, Raspbian Bullseye 64-bit, Python 3.9</div></div>
      <div class="fact"><div class="fk">งานเรียนรู้</div><div class="fv">CNN บน CIFAR-10, update ประมาณ 250 kB</div></div>
      <div class="fact"><div class="fk">Baseline</div><div class="fv">Flower PyTorch quick-start tutorial</div></div>
      <div class="fact"><div class="fk">การทดลองที่ 1</div><div class="fv">จงใจปิด aggregator แล้ววัดเวลาเลือกใหม่</div></div>
      <div class="fact"><div class="fk">การทดลองที่ 2</div><div class="fv">iftop แยก port 8080 (FL) และ 5000 (Raft), 1 รอบการฝึก</div></div>
    </div></div>
  </div>
  <div class="col">
    <div class="metrics" style="grid-template-columns: 1fr 1fr;">
      <div class="metric"><div class="val">1.27-3.76 s</div><div class="lbl">เวลาเลือกใหม่ที่ 1 ถึง 10 worker</div></div>
      <div class="metric"><div class="val red">49.1 MB</div><div class="lbl">ทราฟฟิกแบบมี Raft ที่ 10 worker (เดิม 9.8 MB)</div></div>
    </div>
    <div class="card" style="flex:1;"><h2>อัตราส่วนทราฟฟิกแบบมี Raft ต่อ Flower เดิม</h2>
      <table class="mini tight"><tr><th>worker</th><th class="n">Flower เดิม (MB)</th><th class="n">มี Raft (MB)</th><th class="n">อัตราส่วน*</th></tr>
        ${rows.map(([w, b, r, x]) => `<tr${w === 1 || w === 10 ? ' class="hl"' : ''}><td>${w}</td><td class="n">${b.toFixed(2)}</td><td class="n">${r}</td><td class="n">${x.toFixed(2)}x</td></tr>`).join('')}
      </table>
      <p class="src" style="margin-top:0.02in;padding-top:0.03in;">* คำนวณจากป้ายตัวเลขบน Fig. 4 (หน้า 118)</p>
    </div>
    <div class="card hazard"><h3>ข้อสังเกตจากตัวเลขในกราฟ</h3><ul>
      <li>"approx. 5 times" ตรงเฉพาะที่ <b>9 ถึง 10 worker</b> (1 worker = 1.81 เท่า)</li>
      <li>เวลาเลือกใหม่เพิ่ม <b>2.96 เท่า</b> แต่ยังต่ำกว่า 4 วินาที</li>
      <li>ไม่มีค่า SD และไม่วัดความแม่นยำหลังกู้คืน</li></ul></div>
  </div>
</div></div>${footer('Section 6.1-6.2, Fig. 3, Fig. 4', 5)}</section>`);

// 6. Contributions & practical links
slides.push(`<section class="slide">${banner('คุณูปการและการเชื่อมโยงกับเครือข่ายเซนเซอร์และ Distributed Event Streaming', 'Section 1, 7')}
<div class="content"><div class="grid2" style="grid-template-columns: 1fr 1fr;">
  <div class="col">
    <div class="label">คุณูปการทางวิชาการ (Academic Contributions)</div>
    <div class="card royal vc" style="flex:1;">${item(1, 'กรอบระดับการกู้คืน 5 ระดับ', 'แยก Level 0 ถึง 4 ตามสิ่งที่สำเนา ทำให้เลือกระดับตามต้นทุนได้ และชี้ว่า <b>Level 3</b> คุ้มค่าที่สุดสำหรับ SPOF ของ aggregator', src('Table 1 และ Section 4.2 หน้า 114'))}</div>
    <div class="card royal vc" style="flex:1;">${item(2, 'ต้นแบบบน Flower ที่เปิดซอร์สโค้ด', 'ผนวก Raft (PySyncObj) เข้ากับโค้ด FL โดยตรง ไม่ต้องใช้ blockchain หรือบริการภายนอก และ<b>ทุกโหนดรันโค้ดชุดเดียวกัน</b>', src('Section 5.3 หน้า 115, github.com/SINTEF-9012/raft_flower'))}</div>
    <div class="card royal vc" style="flex:1;">${item(3, 'ตัวเลขต้นทุนจากฮาร์ดแวร์จริง', 'วัดเวลาเลือกใหม่และทราฟฟิกที่ 1 ถึง 10 worker บน Raspberry Pi จริง ทำให้เห็นข้อแลกเปลี่ยน<b>ระหว่างความทนทานกับแบนด์วิดท์</b>เป็นตัวเลข', src('Section 6.2, Fig. 3 และ Fig. 4 หน้า 118'))}</div>
  </div>
  <div class="col">
    <div class="label">การประยุกต์ใช้ในงานวิศวกรรม (Practical Impact)</div>
    <div class="card navy vc" style="flex:1;">${item('A', 'เกตเวย์ของเครือข่ายเซนเซอร์', 'เกตเวย์ที่รวมข้อมูลก็เป็น SPOF แนวทางที่เหมาะคือให้<b>เกตเวย์ 3 หรือ 5 เครื่อง</b>เป็นสมาชิก Raft ส่วนโหนดเซนเซอร์ที่ใช้แบตเตอรี่ทำหน้าที่ FL client', src('สอดคล้องกับ selective state replication, Section 7.1 หน้า 119'))}</div>
    <div class="card navy" style="flex:1.5;"><div class="num-item"><div class="badge">B</div><div><h3>เทียบกับระบบที่ใช้ Raft ในอุตสาหกรรม</h3>
      <table class="mini"><tr><th></th><th>สมาชิก Raft</th><th>ที่เก็บ log</th></tr>
        <tr><td><b>Raft-FL</b></td><td>ทุกโหนด FL</td><td>หน่วยความจำ</td></tr>
        <tr><td><b>etcd</b></td><td>คลัสเตอร์ 3 หรือ 5 เครื่อง</td><td>ดิสก์ (WAL)</td></tr>
        <tr><td><b>Kafka KRaft</b></td><td>controller quorum</td><td>ดิสก์ (metadata log)</td></tr></table>
      ${src('Apache Kafka KIP-500; Ongaro and Ousterhout (2014)')}</div></div></div>
    <div class="card navy vc" style="flex:1;">${item('C', 'Event-driven backend ด้วย Go', 'งานที่ต้องมีผู้ทำเพียงรายเดียว เช่น scheduler หรือ ordered consumer ใช้รูปแบบเดียวกันได้: <b>เลือกผู้นำและบันทึก checkpoint ของ offset</b>')}</div>
  </div>
</div></div>${footer('Section 1, 5.3, 7.1', 6)}</section>`);

// 7. Limitations & conclusion
slides.push(`<section class="slide">${banner('ข้อจำกัดทางวิศวกรรมและบทสรุป (Engineering Limitations &amp; Conclusion)', 'Section 6.3')}
<div class="content"><div class="grid2" style="grid-template-columns: 1fr 1fr;">
  <div class="col">
    <div class="label hz">ข้อจำกัด 3 ข้อ</div>
    <div class="card hazard vc" style="flex:1;">${item(1, 'ไม่อภิปรายเงื่อนไข Quorum', 'คลัสเตอร์ 11 โหนดทนการดับพร้อมกันได้ไม่เกิน <b>5 โหนด</b> จุด 1 worker ใน Fig. 3 เหลือ 1 ใน 2 โหนด ซึ่ง Raft มาตรฐานเลือกผู้นำไม่ได้', src('Section 6.2.1 ระบุการทดลอง 2 ถึง 10 worker (หน้า 116) ขณะที่ Fig. 3 เริ่มที่ 1 worker'))}</div>
    <div class="card hazard vc" style="flex:1;">${item(2, 'ขอบเขตการวัดแคบ', 'วัดทราฟฟิกเพียง <b>1 รอบแบบ clean run</b> ไม่มีค่า SD ไม่วัดความแม่นยำหลังกู้คืน และสถานะเก็บในหน่วยความจำเท่านั้น', src('Section 6.2.2 และ 6.3 หน้า 118 ถึง 119, เชิงอรรถ 11 หน้า 116'))}</div>
    <div class="card hazard vc" style="flex:1;">${item(3, 'ข้อมูลทดลองและรูปแบบความผิดพลาด', 'CIFAR-10 เป็นภาพ ไม่ใช่ time series จากเซนเซอร์ พารามิเตอร์ 250 kB เล็กกว่าโมเดลจริง และ Raft รับมือเฉพาะ <b>crash fault</b>', src('Section 6 หน้า 116 และ Section 6.3 หน้า 119'))}</div>
  </div>
  <div class="col">
    <div class="label gd">บทสรุป</div>
    <div class="metrics" style="grid-template-columns: 1fr 1fr;">
      <div class="metric"><div class="val green">&lt; 4 s</div><div class="lbl">กู้คืนตนเองได้เมื่อมีไม่เกิน 10 worker</div></div>
      <div class="metric"><div class="val red">1.8-5.0x</div><div class="lbl">ทราฟฟิกที่เพิ่มขึ้นเทียบกับ Flower เดิม</div></div>
    </div>
    <div class="card good vc" style="flex:1;">${item(1, 'สิ่งที่บทความพิสูจน์ได้', 'Raft แก้ SPOF ของ FL ได้ด้วยกลไกมาตรฐาน และผนวกกับเฟรมเวิร์กเดิมได้โดยไม่เพิ่ม software stack')}</div>
    <div class="card good vc" style="flex:1;">${item(2, 'ข้อแลกเปลี่ยนหลัก', '<b>ความทนทานต้องแลกด้วยการสำเนาข้อมูล</b> ซึ่งแพงขึ้นเร็วกว่าเส้นตรงเมื่อโหนดเพิ่ม และต้องมีโหนดเหลือมากกว่าครึ่ง')}</div>
    <div class="card good vc" style="flex:1;">${item(3, 'แนวทางต่อยอด', 'สำเนาเฉพาะบางโหนด (selective replication) หรือใช้ gossip ตามที่ผู้เขียนเสนอ และวัดซ้ำด้วยข้อมูลเซนเซอร์พร้อมค่า SD')}</div>
  </div>
</div></div>${footer('Section 6.2-6.3, 7.1', 7)}</section>`);

// Keep "Fig. 3", "Section 6.2.1", "Level 3" and hyphenated terms together at line ends.
function tidy(h) {
  return h
    .replace(/(Table|Fig\.|Section|Level|Slide) ((?:\d+(?:\.\d+)*|[IVX]+)(?![\w-]))/g, '$1 $2')
    .replace(/>([^<]+)</g, (m, t) => '>' + t.replace(/\b([A-Za-z]+(?:-[A-Za-z]+)+)\b/g, '<span class="nw">$1</span>') + '<');
}
const protectSvg = (s) => s.replace(/<svg[\s\S]*?<\/svg>/g, (x) => x.replace(/>/g, '\u0000'));
const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><title>Assignment Paper 3 v2: Raft-FL (7 slides)</title><style>${CSS}</style></head><body>${slides.map(protectSvg).map(tidy).map((s) => s.replace(/\u0000/g, '>')).join('\n')}</body></html>`;

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

  const problems = await page.evaluate(() => {
    const out = [];
    if (!document.fonts.check('12pt "IBM Plex Thai"')) out.push('IBM Plex Thai is not available');
    document.querySelectorAll('.slide').forEach((s, i) => {
      const sr = s.getBoundingClientRect();
      const footer = s.querySelector('.footer');
      const fTop = footer ? footer.getBoundingClientRect().top : sr.bottom;
      s.querySelectorAll('.card, .metric, .figbox, .formula, .caption, .label, .cover > *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) out.push(`slide ${i + 1}: overflow in ${el.className} "${(el.innerText || '').slice(0, 40)}"`);
        if (r.bottom > fTop + 0.5) out.push(`slide ${i + 1}: ${el.className} runs into footer by ${(r.bottom - fTop).toFixed(1)}px`);
        if (r.right > sr.right - 0.5 || r.left < sr.left) out.push(`slide ${i + 1}: ${el.className} leaves the slide`);
      });
      s.querySelectorAll('img').forEach((img) => { if (!img.complete || !img.naturalWidth) out.push(`slide ${i + 1}: image not loaded ${img.src}`); });
    });
    return out;
  });
  if (problems.length) console.error('LAYOUT PROBLEMS:\n' + problems.join('\n'));

  await page.pdf({ path: OUT_PDF, width: '16in', height: '9in', printBackground: true, preferCSSPageSize: true });
  const handles = await page.$$('.slide');
  for (let i = 0; i < handles.length; i++) await handles[i].screenshot({ path: path.join(HIRES, `slide-${i + 1}.png`) });
  await browser.close();

  const sharp = require('sharp');
  for (let i = 1; i <= handles.length; i++) {
    await sharp(path.join(HIRES, `slide-${i}.png`)).resize({ width: 1600 }).png({ compressionLevel: 9 }).toFile(path.join(WEB, `slide-${i}.png`));
  }
  console.log(`slides: ${handles.length}  PDF -> ${OUT_PDF}`);
  if (problems.length) process.exitCode = 2;
}

if (deck.stages.length !== 7) throw new Error('deck_v2.js must have 7 stages');
main().catch((e) => { console.error(e); process.exit(1); });
