import os
import subprocess
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

ROOT = Path("/Users/3rapat/student/universty/NU/project/senior/senior-subject/sensor-network/assignement/work2")
ASSETS_DIR = ROOT / ".build" / "slide-assets"
HTML_OUT = ROOT / ".build" / "slides.html"
PDF_OUT = ROOT / "03_slides" / "Assignment_Paper_2_StoryValidator_5-to-8-min.pdf"
PPTX_OUT = ROOT / "03_slides" / "Assignment_Paper_2_StoryValidator_5-to-8-min.pptx"

# ==============================================================================
# 1. HTML GENERATOR FOR HIGH-PERFORMANCE PIXEL-PERFECT PDF
# ==============================================================================
html_code = """<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<style>
  @page {
    size: 16in 9in;
    margin: 0;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Sarabun', 'Thonburi', 'Leelawadee UI', 'Tahoma', sans-serif;
    background: #F8FAFC;
    color: #0F172A;
    -webkit-font-smoothing: antialiased;
  }
  .slide {
    width: 16in;
    height: 9in;
    position: relative;
    page-break-after: always;
    overflow: hidden;
    padding: 0.65in 0.85in;
    background-color: #F8FAFC;
    color: #0F172A;
  }

  /* Standardized Header across ALL content slides */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.35in;
    border-bottom: 1.5px solid #E2E8F0;
    padding-bottom: 0.15in;
  }
  .slide-title {
    font-size: 25pt;
    font-weight: 700;
    color: #0F172A;
    margin: 0;
    line-height: 1.25;
    letter-spacing: -0.02em;
  }
  .page-num {
    font-size: 16pt;
    font-weight: 700;
    color: #64748B;
    font-family: 'Courier New', monospace;
  }

  /* Standardized Footer across ALL slides */
  .footer {
    position: absolute;
    bottom: 0.35in;
    left: 0.85in;
    right: 0.85in;
    display: flex;
    justify-content: space-between;
    font-size: 11pt;
    color: #64748B;
    border-top: 1px solid #E2E8F0;
    padding-top: 0.12in;
    line-height: 1.4;
  }

  /* Card and Container Styles */
  .card {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 0.3in 0.35in;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .card-title {
    font-size: 16pt;
    font-weight: 700;
    color: #1E3A8A;
    margin-bottom: 0.15in;
    line-height: 1.3;
  }

  /* Grid Layouts */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4in;
    align-items: stretch;
  }

  /* Typography Scale */
  p, ul {
    margin: 0;
    padding: 0;
  }
  .body-text {
    font-size: 13.5pt;
    line-height: 1.6;
    color: #334155;
  }
  .bullet-list {
    list-style: none;
    margin-top: 0.1in;
  }
  .bullet-list li {
    position: relative;
    padding-left: 0.28in;
    margin-bottom: 0.14in;
    font-size: 13.5pt;
    line-height: 1.55;
    color: #334155;
  }
  .bullet-list li::before {
    content: "•";
    position: absolute;
    left: 0.08in;
    color: #1E3A8A;
    font-weight: bold;
    font-size: 16pt;
    line-height: 1.3;
  }

  /* Stat Highlight Components */
  .stat-card {
    text-align: center;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 0.2in 0.15in;
  }
  .stat-val {
    font-size: 38pt;
    font-weight: 700;
    line-height: 1;
    color: #1E3A8A;
    margin-bottom: 0.06in;
    font-family: 'Courier New', monospace;
  }
  .stat-lbl {
    font-size: 13pt;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 0.04in;
    line-height: 1.3;
  }
  .stat-sub {
    font-size: 11pt;
    color: #64748B;
  }

  /* Math Box */
  .math-box {
    background: #F1F5F9;
    border-left: 4px solid #1E3A8A;
    padding: 0.14in 0.2in;
    font-family: 'Cambria Math', 'Times New Roman', serif;
    font-size: 15pt;
    color: #0F172A;
    text-align: center;
    margin: 0.12in 0;
    border-radius: 0 6px 6px 0;
  }

  /* Figure Box */
  .fig-box {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 0.12in;
    text-align: center;
  }
  .fig-img {
    max-width: 100%;
    max-height: 2.8in;
    object-fit: contain;
    border-radius: 4px;
  }
  .fig-cap {
    font-size: 11pt;
    color: #64748B;
    margin-top: 0.06in;
    line-height: 1.3;
  }

  /* Subscript formatting */
  sub {
    font-size: 0.75em;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
    bottom: -0.25em;
  }
</style>
</head>
<body>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 1: COVER SLIDE (Light Academic Theme - Unified with whole deck)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide" style="display: flex; flex-direction: column; justify-content: space-between; padding-top: 0.9in; padding-bottom: 0.6in;">
  <div>
    <div style="font-size: 12.5pt; font-weight: 700; color: #1E3A8A; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.15in;">
      บทความวิจัยสำหรับการประชุมวิชาการ · IEEE Conference on Games (CoG 2021)
    </div>
    <div style="font-size: 44pt; font-weight: 700; color: #0F172A; line-height: 1.15; margin-bottom: 0.08in;">
      Story Validator
    </div>
    <div style="font-size: 22pt; color: #475569; margin-bottom: 0.4in; font-weight: 400; line-height: 1.3;">
      Validating the Plot of Interactive Narrative Games
    </div>
    
    <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-left: 4px solid #1E3A8A; border-radius: 0 8px 8px 0; padding: 0.25in 0.35in; max-width: 13.5in; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
      <div style="font-size: 17.5pt; font-weight: 600; color: #1E293B; line-height: 1.5;">
        “เมื่อโครงเรื่องแบบแตกกิ่งก้านสาขามีความซับซ้อนเกินกว่าจะตรวจสอบด้วยสายตามนุษย์<br>
        เราจะใช้การวิเคราะห์กราฟและจำลองพฤติกรรมผู้เล่นเพื่อตรวจพิสูจน์ข้อผิดพลาดเชิงตรรกะได้อย่างไร”
      </div>
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1.5px solid #E2E8F0; padding-top: 0.25in;">
    <div>
      <div style="font-size: 16.5pt; font-weight: 700; color: #0F172A;">นายธีรภัทร ภู่ระย้า &nbsp;&nbsp;รหัสนิสิต 663624</div>
      <div style="font-size: 12.5pt; color: #64748B; margin-top: 0.04in;">305432 เครือข่ายเซนเซอร์ · การนำเสนอบทความวิจัยวิชาการ (Assignment Paper 2)</div>
    </div>
    <div style="text-align: right; font-size: 12.5pt; color: #64748B; line-height: 1.45;">
      <strong>Carolina Veloso &amp; Rui Prada</strong><br>
      INESC-ID &amp; Instituto Superior Técnico, Universidade de Lisboa
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 2: MOTIVATION & THE 4 CHALLENGES (Slide 01)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="header">
    <div class="slide-title">ปัญหาและแรงจูงใจ: ข้อจำกัดในการตรวจสอบ Interactive Narrative</div>
    <div class="page-num">01</div>
  </div>

  <div class="grid-2" style="height: 6.2in;">
    <!-- Left: 4 Core Challenges -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div class="card-title">4 ความท้าทายหลักของการเล่าเรื่องเชิงโต้ตอบ</div>
      <ul class="bullet-list">
        <li><strong>Authorial Intent vs Player Agency:</strong> การรักษาสมดุลระหว่างสิ่งที่คนแต่งต้องการเล่า กับอิสระในการตัดสินใจของผู้เล่น</li>
        <li><strong>State-Space Explosion:</strong> โครงเรื่องแตกกิ่งก้านทวีคูณ (Combinatorial Explosion) จนเกินขีดความสามารถที่จะตรวจทานด้วยสายตามนุษย์</li>
        <li><strong>Guarded Variables &amp; Logic:</strong> ตัวแปรสะสม (เช่น ค่าอารมณ์, สกิล) ที่กำกับทางเลือก เสี่ยงต่อการเกิดข้อผิดพลาดเชิงตรรกะในอนาคต</li>
        <li><strong>High Playtesting Cost:</strong> การทดสอบเล่นด้วยคนจริงมีต้นทุนสูง ช้า และไม่อาจครอบคลุมทุกกิ่งก้านของเรื่องราว</li>
      </ul>
      <div style="background: #F1F5F9; border-left: 3px solid #1E3A8A; padding: 0.12in 0.16in; font-size: 12pt; color: #334155; border-radius: 0 6px 6px 0;">
        <strong>สรุปปัญหา:</strong> เครื่องมือสร้างเกมเดิม (Twine, Ren'Py) ช่วยเพียงการเรียบเรียงบท แต่ขาดระบบตรวจสอบความต่อเนื่องและความถูกต้องเชิงตรรกะอัตโนมัติ
      </div>
    </div>

    <!-- Right: Visual Evidence & Survey Stat -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title">หลักฐานเชิงประจักษ์จากงานวิจัย</div>
        <div class="fig-box" style="margin-bottom: 0.2in;">
          <img class="fig-img" src="slide-assets/fig1_twine_storyboard.png" alt="Twine Storyboard Graph">
          <div class="fig-cap">ภาพที่ 1: ผังโครงเรื่องแบบ Node &amp; Link ใน Twine ซึ่งซับซ้อนเกินกว่าจะตรวจสอบข้อผิดพลาดด้วยสายตา</div>
        </div>
      </div>

      <div style="background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; padding: 0.16in 0.2in; display: flex; align-items: center; gap: 0.25in;">
        <div style="font-size: 42pt; font-weight: 700; color: #991B1B; line-height: 1; font-family: 'Courier New', monospace;">76%</div>
        <div style="font-size: 12.5pt; color: #7F1D1D; line-height: 1.45;">
          <strong>ของนักเขียนบทเกมยังคงใช้ MS Word หรือ Google Docs</strong><br>
          ทำให้เกิดปัญหาเส้นเรื่องตัน (Dead-Ends), ลืมติดตามค่าตัวแปร, และผู้เล่นข้ามเหตุการณ์สำคัญโดยไม่ตั้งใจ (Lost Plot)
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>Veloso &amp; Prada, IEEE CoG 2021 · Section I &amp; II (Introduction &amp; Challenges)</div>
    <div>doi:10.1109/CoG52621.2021.9618897</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 3: GRAPH MODEL & 5 FORMAL METRICS (Slide 02 - Centered & Subscripts)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide" style="display: flex; flex-direction: column; justify-content: space-between;">
  <div class="header">
    <div class="slide-title">แบบจำลองเชิงวิศวกรรมและตัวชี้วัดคุณภาพโครงเรื่อง 5 มิติ</div>
    <div class="page-num">02</div>
  </div>

  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; max-width: 12.0in; margin: 0 auto;">
    <!-- Top Card: Graph Formalization (Symmetrical & Centered) -->
    <div class="card" style="padding: 0.22in 0.35in; margin-bottom: 0.22in; border: 1px solid #CBD5E1; border-top: 3px solid #1E3A8A; text-align: center; width: 100%;">
      <div style="font-size: 15pt; font-weight: 700; color: #1E3A8A; margin-bottom: 0.05in;">การแปลงโครงเรื่องเป็นกราฟระบุทิศทาง (Directed Graph Formalization)</div>
      <div class="body-text" style="font-size: 12.5pt; max-width: 11.2in; margin: 0 auto; line-height: 1.5;">
        นิยามโครงเรื่องในรูปกราฟ <strong>G = (V, E)</strong> โดย <strong>Passage คือโหนด (V)</strong> และ <strong>Link คือเส้นเชื่อมที่มีเงื่อนไขกำกับ (Guarded Edges E)</strong><br>
        ใช้อัลกอริทึม <strong>Depth-First Search (DFS)</strong> สำรวจทุกเส้นทางที่เป็นไปได้แบบอัตโนมัติ เพื่อสร้างร่องรอยการเล่น (Playthrough Traces)
      </div>
    </div>

    <!-- Metrics Row 1: 3 Centered Cards -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.22in; margin-bottom: 0.22in; width: 100%;">
      <div class="card" style="padding: 0.2in 0.22in; text-align: center; border: 1px solid #CBD5E1; border-top: 3px solid #1E3A8A;">
        <div style="font-size: 14pt; font-weight: 700; color: #1E3A8A; margin-bottom: 0.04in;">1. Number of Paths (N<sub style="font-size: 0.75em; vertical-align: -0.2em;">paths</sub>)</div>
        <div style="font-size: 12pt; color: #0F172A; font-weight: 600; margin-bottom: 0.05in;">จำนวนเส้นทางการเล่นทั้งหมด</div>
        <div style="font-size: 11.5pt; color: #475569; line-height: 1.45;">นับผลรวมของเส้นทางการเล่นที่เป็นไปได้ทั้งหมดตั้งแต่จุดเริ่มต้นจนถึงฉากจบ พร้อมบันทึก Passage ที่แวะผ่าน</div>
      </div>
      <div class="card" style="padding: 0.2in 0.22in; text-align: center; border: 1px solid #CBD5E1; border-top: 3px solid #1E3A8A;">
        <div style="font-size: 14pt; font-weight: 700; color: #1E3A8A; margin-bottom: 0.04in;">2. Stroke Points (S<sub style="font-size: 0.75em; vertical-align: -0.2em;">points</sub>)</div>
        <div style="font-size: 12pt; color: #0F172A; font-weight: 600; margin-bottom: 0.05in;">จุดบังคับผ่านของเนื้อเรื่อง</div>
        <div style="font-size: 11.5pt; color: #475569; line-height: 1.45;">ฉากสำคัญที่ทุกเส้นทางต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญตามเจตจำนงของผู้แต่งครบถ้วน</div>
      </div>
      <div class="card" style="padding: 0.2in 0.22in; text-align: center; border: 1px solid #CBD5E1; border-top: 3px solid #1E3A8A;">
        <div style="font-size: 14pt; font-weight: 700; color: #1E3A8A; margin-bottom: 0.04in;">3. Endings Hit % (P<sub style="font-size: 0.75em; vertical-align: -0.2em;">endings</sub>)</div>
        <div style="font-size: 12pt; color: #0F172A; font-weight: 600; margin-bottom: 0.05in;">การแจกแจงสัดส่วนฉากจบ</div>
        <div style="font-size: 11.5pt; color: #475569; line-height: 1.45;">คำนวณสัดส่วนความน่าจะเป็นในการจบแต่ละแบบ และตรวจหาฉากจบที่ไม่สามารถเข้าถึงได้จริง</div>
      </div>
    </div>

    <!-- Metrics Row 2: 2 Centered Cards (Horizontally Balanced & Centered) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.22in; width: 100%;">
      <div class="card" style="padding: 0.2in 0.25in; border: 1px solid #CBD5E1; border-top: 3px solid #991B1B;">
        <div style="font-size: 14pt; font-weight: 700; color: #991B1B; margin-bottom: 0.04in; text-align: center;">4. Dead-Ends (D<sub style="font-size: 0.75em; vertical-align: -0.2em;">ends</sub>) &amp; Lost Plot (L<sub style="font-size: 0.75em; vertical-align: -0.2em;">plot</sub>)</div>
        <div style="font-size: 12pt; color: #0F172A; font-weight: 600; margin-bottom: 0.05in; text-align: center;">ทางตันและฉากที่ไม่ถูกเข้าถึง</div>
        <div style="font-size: 11.5pt; color: #475569; line-height: 1.45; max-width: 5.2in; margin: 0 auto;">
          • <strong>Dead-End (D<sub style="font-size: 0.75em; vertical-align: -0.2em;">ends</sub>):</strong> ฉากที่ดำเนินไปแล้วไม่มีทางเลือกให้ไปต่อจนจบเกม<br>
          • <strong>Lost Plot (L<sub style="font-size: 0.75em; vertical-align: -0.2em;">plot</sub>):</strong> ฉากที่ไม่สามารถเข้าถึงได้จริงเนื่องจากเงื่อนไขตัวแปรขัดแย้ง
        </div>
      </div>
      <div class="card" style="padding: 0.2in 0.25in; border: 1px solid #CBD5E1; border-top: 3px solid #1E3A8A;">
        <div style="font-size: 14pt; font-weight: 700; color: #1E3A8A; margin-bottom: 0.04in; text-align: center;">5. Evolution of Variables (V<sub style="font-size: 0.75em; vertical-align: -0.2em;">evol</sub>)</div>
        <div style="font-size: 12pt; color: #0F172A; font-weight: 600; margin-bottom: 0.05in; text-align: center;">การติดตามวิวัฒนาการตัวแปร</div>
        <div style="font-size: 11.5pt; color: #475569; line-height: 1.45; max-width: 5.2in; margin: 0 auto;">
          พล็อต Dotted Chart แสดงการเปลี่ยนแปลงของตัวแปรอารมณ์และสถานะตลอดเส้นเรื่อง เพื่อตรวจจับค่าตัวแปรผิดปกติ (Out-of-range anomalies)
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>Veloso &amp; Prada, IEEE CoG 2021 · Section IV (The Proposed Model &amp; Metrics)</div>
    <div>doi:10.1109/CoG52621.2021.9618897</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 4: THE MURDER CASE & PERSONA SEARCH (Slide 03)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="header">
    <div class="slide-title">กรณีศึกษา The Murder Case และการจำลอง Persona</div>
    <div class="page-num">03</div>
  </div>

  <div class="grid-2" style="height: 6.2in;">
    <!-- Left: The Murder Case Scenario -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title">ฉากทดสอบ The Murder Case (TMC)</div>
        <div class="body-text" style="font-size: 12.5pt; margin-bottom: 0.12in;">
          บทสนทนาแนวสืบสวนสอบปากคำผู้ต้องสงสัยคดีฆาตกรรม กำกับด้วยตัวแปรอารมณ์ 3 ด้าน: <em>โกรธ (Anger), สับสน (Confusion), กลัว (Fear)</em>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.1in; margin-bottom: 0.18in;">
          <div class="stat-card" style="padding: 0.08in 0.05in;"><div style="font-size: 20pt; font-weight: 700; color: #1E3A8A;">14</div><div style="font-size: 10pt; color: #475569;">Passages</div></div>
          <div class="stat-card" style="padding: 0.08in 0.05in;"><div style="font-size: 20pt; font-weight: 700; color: #1E3A8A;">20</div><div style="font-size: 10pt; color: #475569;">Paths</div></div>
          <div class="stat-card" style="padding: 0.08in 0.05in;"><div style="font-size: 20pt; font-weight: 700; color: #1E3A8A;">3</div><div style="font-size: 10pt; color: #475569;">ฉากจบ</div></div>
          <div class="stat-card" style="padding: 0.08in 0.05in;"><div style="font-size: 20pt; font-weight: 700; color: #991B1B;">5</div><div style="font-size: 10pt; color: #991B1B;">บั๊กทดสอบ</div></div>
        </div>
      </div>

      <div style="background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; padding: 0.16in 0.2in;">
        <div style="font-size: 13pt; font-weight: 700; color: #991B1B; margin-bottom: 0.06in;">ชุดข้อผิดพลาดที่จงใจฝังไว้ (TMC - Failed Version):</div>
        <div style="font-size: 11.5pt; color: #7F1D1D; line-height: 1.5;">
          • <strong>ปัญหา 1 &amp; 3:</strong> เส้นทาง #7 และ #14 เกิดทางตัน (Dead-End ที่ Choice 5)<br>
          • <strong>ปัญหา 2:</strong> เส้นทาง #8 เกิดวงวนไม่รู้จบ (Loop วนซ้ำ)<br>
          • <strong>ปัญหา 4 &amp; 5:</strong> ฉาก Ending 1 และ Choice 6 เข้าไม่ถึง (Unreachable Passages)
        </div>
      </div>
    </div>

    <!-- Right: Persona Greedy Search -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title">การจำลองพฤติกรรมผู้เล่น (Player Personas)</div>
        <div class="body-text" style="font-size: 12.5pt; margin-bottom: 0.1in;">
          ใช้อัลกอริทึม <strong>Heuristic Greedy Search</strong> คำนวณค่าน้ำหนักเพื่อจำลองการตัดสินใจตามบุคลิกภาพของผู้เล่นแต่ละกลุ่ม:
        </div>

        <div class="math-box">
          Score(L) = &sum;<sub>i=1..n</sub> (w<sub>i</sub> &times; v<sub>i</sub>), &nbsp;&nbsp;&nbsp;
          L<sup>*</sup> = arg max<sub>L &isin; Links</sub> Score(L)
        </div>

        <ul class="bullet-list" style="margin-top: 0.1in;">
          <li><strong>Aggressive Persona (สายก้าวร้าว):</strong><br>
            <span style="font-size: 11.5pt; color: #64748B;">W<sub>โกรธ</sub> = 0.75, W<sub>สับสน</sub> = 0.15, W<sub>กลัว</sub> = 0.10</span>
          </li>
          <li><strong>Paranoid Persona (สายระแวง):</strong><br>
            <span style="font-size: 11.5pt; color: #64748B;">W<sub>กลัว</sub> = 0.70, W<sub>สับสน</sub> = 0.20, W<sub>โกรธ</sub> = 0.10</span>
          </li>
        </ul>
      </div>

      <div style="background: #F1F5F9; border-left: 3px solid #1E3A8A; padding: 0.12in 0.16in; font-size: 12pt; color: #334155; border-radius: 0 6px 6px 0;">
        <strong>ประโยชน์:</strong> ช่วยให้นักเขียนพยากรณ์ได้ว่า ผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กตัวใดบ้าง ก่อนการเปิดทดสอบจริงกับผู้เล่น
      </div>
    </div>
  </div>

  <div class="footer">
    <div>Veloso &amp; Prada, IEEE CoG 2021 · Section V &amp; VI-A (Prototype &amp; The Scenario)</div>
    <div>doi:10.1109/CoG52621.2021.9618897</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 5: EMPIRICAL EVALUATION & RESULTS (Slide 04)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="header">
    <div class="slide-title">ผลการประเมินเชิงประจักษ์: เวลาตรวจจับบั๊กและคะแนน SUS</div>
    <div class="page-num">04</div>
  </div>

  <div class="grid-2" style="height: 6.2in;">
    <!-- Left: Visual Analysis Graphic -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div class="card-title">การตรวจจับจุดบกพร่องบนกราฟเนื้อเรื่อง</div>
      <div class="fig-box">
        <img class="fig-img" src="slide-assets/fig8_problem_analysis.png" alt="Bug Diagnosis on Graph" style="max-height: 3.6in;">
        <div class="fig-cap">ภาพที่ 2: ระบบ Story Validator ชี้ชัดตำแหน่งข้อผิดพลาดทั้ง 5 จุดบนโครงสร้างกราฟ TMC</div>
      </div>
      <div style="background: #F1F5F9; padding: 0.1in 0.14in; border-radius: 6px; font-size: 11.5pt; color: #475569; line-height: 1.4;">
        <strong>ผลการทดสอบ:</strong> ปัญหาที่ 1, 3, 4, 5 ตรวจพบได้ <strong>100%</strong> ผ่านตัวกรอง Lost Plot ทันที
      </div>
    </div>

    <!-- Right: 3 Key Empirical Stats + Findings -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title">ตัวเลขสถิติจากการทดสอบกับผู้ใช้ 20 คน (Study 2)</div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.15in; margin-bottom: 0.2in;">
          <div class="stat-card">
            <div class="stat-val">52.3s</div>
            <div class="stat-lbl">ตรวจพบบั๊ก</div>
            <div class="stat-sub">&sigma; = 22.7 s</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">146.2s</div>
            <div class="stat-lbl">แก้ปัญหา</div>
            <div class="stat-sub">&sigma; = 31.8 s</div>
          </div>
          <div class="stat-card" style="border-color: #0F766E;">
            <div class="stat-val" style="color: #0F766E;">92.4</div>
            <div class="stat-lbl">คะแนน SUS</div>
            <div class="stat-sub">Truly Superior</div>
          </div>
        </div>

        <div style="font-size: 13.5pt; font-weight: 700; color: #0F172A; margin-bottom: 0.08in;">ข้อค้นพบเชิงพฤติกรรมที่สำคัญ:</div>
        <ul class="bullet-list" style="margin-top: 0;">
          <li><strong>ความล้มเหลวของการตรวจด้วยตาเปล่า:</strong> มีผู้ใช้ 3 คน (15%) หาปัญหาที่ 2 ไม่พบ เพราะพยายามกวาดสายตาไล่ดูบนแผนผังต้นไม้ แทนที่จะใช้ตัวกรองอัตโนมัติ</li>
          <li><strong>ความยากในการแก้ไข:</strong> 25% ของผู้ใช้ติดขัดในการแก้ปัญหาที่ 5 เนื่องจากความซับซ้อนของเงื่อนไขตัวแปรที่ผูกซ้อนกันหลายชั้น</li>
          <li><strong>วิวัฒนาการความสามารถในการใช้งาน:</strong> SUS เพิ่มจาก 83.5 (Study 1, 5 คน) สู่ 92.4 หลังเพิ่มระบบ Tooltips และหน้าต่างสรุปรายงาน</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>Veloso &amp; Prada, IEEE CoG 2021 · Section VI-B &amp; VI-C (User Evaluation &amp; Results)</div>
    <div>doi:10.1109/CoG52621.2021.9618897</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 6: CONTRIBUTIONS & ENGINEERING VALUE (Slide 05)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="header">
    <div class="slide-title">คุณูปการทางวิชาการและการต่อยอดทางวิศวกรรมซอฟต์แวร์</div>
    <div class="page-num">05</div>
  </div>

  <div class="grid-2" style="height: 6.2in;">
    <!-- Left: Academic Contributions -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title">คุณูปการทางวิชาการ (Scientific Contributions)</div>
        <ul class="bullet-list">
          <li>
            <strong>Formal Structural Metrics:</strong> นิยามตัวชี้วัดเชิงโครงสร้างจากนามธรรมสู่นิพจน์ทางคณิตศาสตร์ (Stroke Points, Lost Plot, Dead-Ends) ที่โปรแกรมสามารถคำนวณซ้ำได้อย่างแม่นยำ
          </li>
          <li>
            <strong>Automated Offline Verification:</strong> สถาปัตยกรรมการตรวจพิสูจน์กราฟเนื้อเรื่องแบบออฟไลน์ ช่วยลดภาระและต้นทุนก่อนเข้าสู่ขั้นตอน Human Playtesting
          </li>
          <li>
            <strong>Persona-Informed Simulation:</strong> กรอบการใช้ Heuristic Search เพื่อจำลองพฤติกรรมผู้เล่นตามโปรไฟล์ ช่วยพยากรณ์จุดบกพร่องตามแนวโน้มการตัดสินใจจริง
          </li>
        </ul>
      </div>
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.14in 0.18in; border-radius: 6px; font-size: 12pt; color: #475569;">
        <strong>ผลสะท้อน:</strong> ได้รับการยืนยันผ่านการทดสอบกับผู้ใช้จริง 2 รอบ แสดงให้เห็นถึงการแก้ปัญหาที่มีอยู่จริงในอุตสาหกรรมเกม
      </div>
    </div>

    <!-- Right: Software Engineering Relevance -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title">การประยุกต์ใช้กับสถาปัตยกรรมระบบเกมเล่าเรื่อง</div>
        <ul class="bullet-list">
          <li>
            <strong>Node &amp; Edge Schema:</strong> โครงสร้าง Passage และ Link สามารถเชื่อมโยงสู่โมเดลข้อมูลแบบ Directed Graph ของเอนจินเกมเชิงโต้ตอบยุคใหม่ได้ทันที
          </li>
          <li>
            <strong>Dynamic Branching Evaluation:</strong> แนวคิด Guarded Condition สอดคล้องกับการตรวจประเมินค่าตัวแปรใน Game Runtime State ก่อนอนุญาตให้เลือกเส้นทาง
          </li>
          <li>
            <strong>Pre-Publish Quality Assurance:</strong> สามารถนำ DFS Validation ไปผสานในกระบวนการ CI/CD หรือ Content Moderation เพื่อสแกนหา Dead-Ends ก่อนเผยแพร่สู่ผู้เล่น
          </li>
        </ul>
      </div>
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.14in 0.18in; border-radius: 6px; font-size: 12pt; color: #475569;">
        <strong>คุณค่า:</strong> เป็นพิมพ์เขียวเชิงวิศวกรรมในการสร้างระบบ Automated Quality Assurance สำหรับแพลตฟอร์ม Interactive Fiction
      </div>
    </div>
  </div>

  <div class="footer">
    <div>Veloso &amp; Prada, IEEE CoG 2021 · Section VII &amp; Discussion</div>
    <div>doi:10.1109/CoG52621.2021.9618897</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 7: LIMITATIONS & DISCUSSION (Slide 06 - Light Theme, Unified, NO Thank You)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="header">
    <div class="slide-title">ข้อจำกัด การวิจารณ์เชิงวิชาการ และบทสรุป</div>
    <div class="page-num">06</div>
  </div>

  <div class="grid-2" style="height: 6.2in;">
    <!-- Left: 3 Scientific Critiques -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title" style="color: #991B1B;">3 ข้อจำกัดเชิงวิชาการสำคัญ (Scientific Limitations)</div>
        <ul class="bullet-list">
          <li>
            <strong>ขาดกลุ่มควบคุมเปรียบเทียบ (No Control Baseline):</strong> บทความวัดเวลาตรวจบั๊กได้ 52.3 วินาที แต่ไม่ได้วัดเทียบกับกลุ่มที่ตรวจด้วยตาเปล่าใน Twine จึงบอกได้เพียงเครื่องมือใช้งานได้จริง แต่ยังไม่พิสูจน์ความเร็วเปรียบเทียบเชิงสถิติ
          </li>
          <li>
            <strong>ปัญหา State-Space Explosion ของ DFS:</strong> การท่องทุกเส้นทางด้วย DFS ทำงานได้ดีในเรื่องขนาดเล็ก แต่หากกราฟมีหลายร้อยฉากและมีวงวน (Loops) จำนวนเส้นทางจะพุ่งสูงแบบ Exponential
          </li>
          <li>
            <strong>ขอบเขตของชุดทดสอบ (Evaluation Scope):</strong> บั๊กทั้ง 5 จุดใน TMC ถูกตรวจพบด้วยฟังก์ชัน Lost Plot เพียงอย่างเดียว ยังไม่ได้พิสูจน์คุณค่าของ Stroke Points หรือตัวแปรที่มีความซับซ้อนสูงในสเกลระดับอุตสาหกรรม
          </li>
        </ul>
      </div>
      <div style="background: #FEF2F2; border-left: 3px solid #991B1B; padding: 0.12in 0.16in; font-size: 12pt; color: #7F1D1D; border-radius: 0 6px 6px 0;">
        <strong>ข้อควรระวัง:</strong> เหมาะสำหรับการตรวจพิสูจน์เกมขนาดเล็กถึงปานกลาง หากนำไปใช้กับเกมสเกลใหญ่จำเป็นต้องมี Heuristic Pruning เพื่อตัดกิ่งกราฟ
      </div>
    </div>

    <!-- Right: Synthesis & Future Directions (Academic, NO Thank You) -->
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="card-title">บทสรุปภาพรวมและการต่อยอด (Synthesis &amp; Future Work)</div>
        <div class="body-text" style="font-size: 13.5pt; line-height: 1.65; margin-bottom: 0.2in;">
          Story Validator ได้วางรากฐานสำคัญของการนำ <strong>ทฤษฎีกราฟและการจำลอง Persona</strong> มาใช้ตรวจพิสูจน์เกมการเล่าเรื่องแบบมีปฏิสัมพันธ์ ช่วยยกระดับจากการทดสอบด้วยสายตาของมนุษย์สู่การตรวจสอบเชิงระบบแบบอัตโนมัติ (Automated Quality Assurance) เพื่อธำรงไว้ซึ่งเจตจำนงของผู้ประพันธ์ได้อย่างครบถ้วน
        </div>

        <div style="font-size: 13.5pt; font-weight: 700; color: #0F172A; margin-bottom: 0.08in;">ทิศทางการพัฒนาต่อยอดในอนาคต:</div>
        <ul class="bullet-list" style="margin-top: 0;">
          <li><strong>Commercial Engine Integration:</strong> การพัฒนาปลั๊กอินเชื่อมต่อกับเอนจินเกมเชิงพาณิชย์ เช่น Unity, Unreal Engine หรือระบบ Web-based Visual Novels</li>
          <li><strong>Automated Narrative Repair:</strong> การนำโมเดลภาษาขนาดใหญ่ (LLMs) มาช่วยเสนอแนวทางการซ่อมแซมเส้นเรื่องและเงื่อนไขตัวแปรที่ผิดพลาดโดยอัตโนมัติ</li>
        </ul>
      </div>
      
      <div style="background: #F1F5F9; border: 1px solid #E2E8F0; padding: 0.14in 0.18in; border-radius: 6px; font-size: 12pt; color: #475569;">
        <strong>สรุปบทเรียน:</strong> การตรวจสอบโครงสร้างกราฟก่อนส่งมอบเกม ช่วยลดต้นทุน Playtesting และเพิ่มคุณภาพของเนื้อเรื่องได้อย่างมีนัยสำคัญ
      </div>
    </div>
  </div>

  <div class="footer">
    <div>Veloso &amp; Prada, IEEE CoG 2021 · Section VII (Discussion &amp; Conclusion)</div>
    <div>doi:10.1109/CoG52621.2021.9618897 · 305432 เครือข่ายเซนเซอร์</div>
  </div>
</div>

</body>
</html>
"""

# Write HTML & render PDF
HTML_OUT.write_text(html_code, encoding="utf-8")
print(f"Generated clean HTML: {HTML_OUT}")

subprocess.run([
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={PDF_OUT}",
    str(HTML_OUT)
], check=True)
print(f"Generated refined PDF slides: {PDF_OUT}")

# ==============================================================================
# 2. PYTHON-PPTX BUILDER FOR PPTX (100% UNIFIED LIGHT THEME)
# ==============================================================================
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

FONT_TH = "Tahoma"

# Consistent, Calming Light Palette across ALL slides
C_LIGHT_BG = RGBColor(0xF8, 0xFA, 0xFC)  # Slate 50
C_WHITE = RGBColor(0xFF, 0xFF, 0xFF)
C_INK = RGBColor(0x0F, 0x17, 0x2A)       # Deep charcoal text
C_MUTED = RGBColor(0x64, 0x74, 0x8B)     # Muted slate
C_BORDER = RGBColor(0xE2, 0xE8, 0xF0)
C_BLUE = RGBColor(0x1E, 0x3A, 0x8A)      # Deep Academic Blue
C_RED = RGBColor(0x99, 0x1B, 0x1B)       # Deep Crimson
C_TEAL = RGBColor(0x0F, 0x76, 0x6E)

def set_flat_box(shape, fill=None, line=None, width=1):
    if fill:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill
    else:
        shape.fill.background()
    if line:
        shape.line.color.rgb = line
        shape.line.width = Pt(width)
    else:
        shape.line.fill.background()

def add_clean_header(slide, title, page_str=None):
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(10.5), Inches(0.7))
    tf = t_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_TH
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = C_INK

    if page_str:
        p_box = slide.shapes.add_textbox(Inches(11.5), Inches(0.4), Inches(1.0), Inches(0.5))
        ptf = p_box.text_frame
        ptf.margin_left = ptf.margin_top = ptf.margin_right = ptf.margin_bottom = 0
        pp = ptf.paragraphs[0]
        pp.text = page_str
        pp.alignment = PP_ALIGN.RIGHT
        pp.font.name = "Courier New"
        pp.font.size = Pt(16)
        pp.font.bold = True
        pp.font.color.rgb = C_MUTED

    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.15), Inches(11.733), Inches(0.015))
    set_flat_box(line, C_BORDER, None)

def add_clean_footer(slide, text="Veloso & Prada, IEEE CoG 2021 · doi:10.1109/CoG52621.2021.9618897"):
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.9), Inches(11.733), Inches(0.012))
    set_flat_box(line, C_BORDER, None)
    
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(6.98), Inches(11.733), Inches(0.35))
    tf = t_box.text_frame
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = FONT_TH
    p.font.size = Pt(10.5)
    p.font.color.rgb = C_MUTED

blank_layout = prs.slide_layouts[6]

# ------------------------------------------------------------------------------
# PPTX SLIDE 1: COVER (Clean Light Academic Theme)
# ------------------------------------------------------------------------------
s1 = prs.slides.add_slide(blank_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_flat_box(bg1, C_LIGHT_BG, None)

t_sub = s1.shapes.add_textbox(Inches(1.0), Inches(0.9), Inches(11.3), Inches(0.4))
p = t_sub.text_frame.paragraphs[0]
p.text = "บทความวิจัยสำหรับการประชุมวิชาการ · IEEE Conference on Games (CoG 2021)"
p.font.name = FONT_TH
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = C_BLUE

t_main = s1.shapes.add_textbox(Inches(1.0), Inches(1.35), Inches(11.3), Inches(1.8))
tf = t_main.text_frame
p1 = tf.paragraphs[0]
p1.text = "Story Validator"
p1.font.name = FONT_TH
p1.font.size = Pt(44)
p1.font.bold = True
p1.font.color.rgb = C_INK

p2 = tf.add_paragraph()
p2.text = "Validating the Plot of Interactive Narrative Games"
p2.font.name = FONT_TH
p2.font.size = Pt(22)
p2.font.color.rgb = C_MUTED
p2.space_before = Pt(6)

# Hook Box
hook_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(2.95), Inches(11.333), Inches(2.2))
set_flat_box(hook_box, C_WHITE, C_BORDER, 1)
# Left border bar
bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.0), Inches(2.95), Inches(0.08), Inches(2.2))
set_flat_box(bar, C_BLUE, None)

tf_h = hook_box.text_frame
tf_h.word_wrap = True
tf_h.margin_left = Inches(0.35)
tf_h.margin_top = Inches(0.4)
ph = tf_h.paragraphs[0]
ph.text = "“เมื่อโครงเรื่องแบบแตกกิ่งก้านสาขามีความซับซ้อนเกินกว่าจะตรวจสอบด้วยสายตามนุษย์\nเราจะใช้การวิเคราะห์กราฟและจำลองพฤติกรรมผู้เล่นเพื่อตรวจพิสูจน์ข้อผิดพลาดเชิงตรรกะได้อย่างไร”"
ph.font.name = FONT_TH
ph.font.size = Pt(17)
ph.font.bold = True
ph.font.color.rgb = C_INK
ph.line_spacing = 1.3

# Bottom Presenter & Author Info
line_s1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.0), Inches(5.6), Inches(11.333), Inches(0.015))
set_flat_box(line_s1, C_BORDER, None)

t_info = s1.shapes.add_textbox(Inches(1.0), Inches(5.8), Inches(6.5), Inches(1.2))
tf_info = t_info.text_frame
p_i1 = tf_info.paragraphs[0]
p_i1.text = "นายธีรภัทร ภู่ระย้า   รหัสนิสิต 663624"
p_i1.font.name = FONT_TH
p_i1.font.size = Pt(15)
p_i1.font.bold = True
p_i1.font.color.rgb = C_INK

p_i2 = tf_info.add_paragraph()
p_i2.text = "305432 เครือข่ายเซนเซอร์ · การนำเสนอบทความวิจัยวิชาการ (Assignment Paper 2)"
p_i2.font.name = FONT_TH
p_i2.font.size = Pt(12)
p_i2.font.color.rgb = C_MUTED
p_i2.space_before = Pt(3)

t_auth = s1.shapes.add_textbox(Inches(7.2), Inches(5.8), Inches(5.1), Inches(1.2))
tf_auth = t_auth.text_frame
p_a1 = tf_auth.paragraphs[0]
p_a1.text = "Carolina Veloso & Rui Prada\nINESC-ID & Instituto Superior Técnico, Univ. of Lisbon"
p_a1.alignment = PP_ALIGN.RIGHT
p_a1.font.name = FONT_TH
p_a1.font.size = Pt(12)
p_a1.font.color.rgb = C_MUTED

s1.notes_slide.notes_text_frame.text = (
    "เวลา 0:00–0:35\n"
    "สวัสดีครับ วันนี้ผมขอเสนอบทความวิจัย 'Story Validator: Validating the plot of Interactive Narrative games' "
    "จากงานประชุมวิชาการ IEEE Conference on Games 2021 โดยผู้วิจัยจากมหาวิทยาลัยลิสบอนและ INESC-ID\n\n"
    "หัวใจสำคัญของงานนี้คือการแก้ปัญหาโลกแตกของเกมเล่าเรื่องแบบโต้ตอบ: เมื่อเรื่องเล่าแตกกิ่งออกไปหลายสิบเส้นทาง "
    "มนุษย์ไม่สามารถกดเล่นเพื่อตรวจบั๊กได้ครบทุกจุด บทความนี้จึงเสนอเครื่องมือช่วยตรวจสอบกราฟและพฤติกรรมผู้เล่นแบบอัตโนมัติครับ"
)

# ------------------------------------------------------------------------------
# PPTX SLIDE 2: MOTIVATION (Slide 01)
# ------------------------------------------------------------------------------
s2 = prs.slides.add_slide(blank_layout)
bg2 = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_flat_box(bg2, C_LIGHT_BG, None)
add_clean_header(s2, "ปัญหาและแรงจูงใจ: ข้อจำกัดในการตรวจสอบ Interactive Narrative", "01")
add_clean_footer(s2, "Veloso & Prada, IEEE CoG 2021 · Section I & II (Introduction & Challenges)")

# Left Card: 4 Challenges
c_left = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.35), Inches(5.7), Inches(5.35))
set_flat_box(c_left, C_WHITE, C_BORDER, 1)
tf_l = c_left.text_frame
tf_l.word_wrap = True
tf_l.margin_left = tf_l.margin_right = Inches(0.25)
tf_l.margin_top = Inches(0.2)

p = tf_l.paragraphs[0]
p.text = "4 ความท้าทายหลักของการเล่าเรื่องเชิงโต้ตอบ"
p.font.name = FONT_TH
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_BLUE

challenges = [
    ("Authorial Intent vs Player Agency", "การรักษาสมดุลระหว่างสิ่งที่คนแต่งต้องการเล่า กับอิสระของผู้เล่นในการตัดสินใจ"),
    ("State-Space Explosion", "โครงเรื่องแตกกิ่งทวีคูณจนเกินขีดความสามารถที่สายตามนุษย์จะกวาดตรวจได้หมด"),
    ("Guarded Variables & Logic", "ตัวแปรสะสม (อารมณ์, สกิล) ที่กำกับทางเลือก เสี่ยงต่อบั๊กตรรกะในอนาคต"),
    ("High Playtesting Cost", "การทดสอบเล่นด้วยคนจริงมีต้นทุนสูง ช้า และไม่อาจครอบคลุมทุกเส้นทาง")
]
for title, desc in challenges:
    pt = tf_l.add_paragraph()
    pt.text = f"• {title}:"
    pt.font.name = FONT_TH
    pt.font.size = Pt(13)
    pt.font.bold = True
    pt.font.color.rgb = C_INK
    pt.space_before = Pt(8)
    
    pd = tf_l.add_paragraph()
    pd.text = f"   {desc}"
    pd.font.name = FONT_TH
    pd.font.size = Pt(12)
    pd.font.color.rgb = C_MUTED

# Right Card: Image + Survey Stat
c_right = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.35), Inches(5.733), Inches(5.35))
set_flat_box(c_right, C_WHITE, C_BORDER, 1)
tf_r = c_right.text_frame
tf_r.word_wrap = True
tf_r.margin_left = tf_r.margin_right = Inches(0.25)
tf_r.margin_top = Inches(0.2)

p_r = tf_r.paragraphs[0]
p_r.text = "หลักฐานเชิงประจักษ์จากงานวิจัย"
p_r.font.name = FONT_TH
p_r.font.size = Pt(16)
p_r.font.bold = True
p_r.font.color.rgb = C_BLUE

img_path = ASSETS_DIR / "fig1_twine_storyboard.png"
if img_path.exists():
    s2.shapes.add_picture(str(img_path), Inches(7.05), Inches(1.9), Inches(5.2), Inches(2.2))

stat_box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.05), Inches(4.3), Inches(5.2), Inches(2.15))
set_flat_box(stat_box, RGBColor(0xFE, 0xF2, 0xF2), RGBColor(0xFC, 0xA5, 0xA5), 1)
tf_sb = stat_box.text_frame
tf_sb.word_wrap = True
tf_sb.margin_left = tf_sb.margin_right = Inches(0.2)
tf_sb.margin_top = Inches(0.15)

psb1 = tf_sb.paragraphs[0]
psb1.text = "76% ของนักเขียนบทเกมยังใช้ MS Word หรือ Google Docs"
psb1.font.name = FONT_TH
psb1.font.size = Pt(13)
psb1.font.bold = True
psb1.font.color.rgb = C_RED

psb2 = tf_sb.add_paragraph()
psb2.text = "ทำให้ขาดระบบตรวจสอบตรรกะจนเกิดปัญหาสำคัญ:\n• เกิดทางตัน (Dead-Ends) ที่ผู้เล่นไปต่อไม่ได้\n• ตกหล่นการติดตามตัวแปรไอเทมและอารมณ์\n• ผู้เล่นหลุดข้ามเหตุการณ์สำคัญไปโดยไม่รู้ตัว (Lost Plot)"
psb2.font.name = FONT_TH
psb2.font.size = Pt(11.5)
psb2.font.color.rgb = RGBColor(0x7F, 0x1D, 0x1D)
psb2.space_before = Pt(4)

s2.notes_slide.notes_text_frame.text = (
    "เวลา 0:35–1:40\n"
    "หน้าที่ 1 คือปัญหาของงานวิจัยครับ การแต่งเกม Interactive Narrative แตกต่างจากการเขียนนิยายทั่วไป "
    "เพราะมี 4 ความท้าทายหลัก: ต้องรักษาสมดุลระหว่างเจตจำนงของคนแต่งกับทางเลือกของผู้เล่น, เกิด State-Space Explosion เมื่อมีตัวเลือกเยอะ "
    "และมีตัวแปรเงื่อนไขที่ซับซ้อน\n\n"
    "ผลสำรวจของบทความพบสถิติที่น่าตกใจว่า นักเขียนบทเกมถึง 76% ยังคงใช้โปรแกรม Word หรือ Google Docs ธรรมดาในการเขียนบท "
    "ทำให้ไม่มีระบบตรวจสอบอัตโนมัติ และมักเกิดบั๊ก Dead-Ends หรือ Lost Plot ก่อนเกมออกสู่ตลาดครับ"
)

# ------------------------------------------------------------------------------
# PPTX SLIDE 3: METRICS (Slide 02 - Centered & Subscripts)
# ------------------------------------------------------------------------------
s3 = prs.slides.add_slide(blank_layout)
bg3 = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_flat_box(bg3, C_LIGHT_BG, None)
add_clean_header(s3, "แบบจำลองเชิงวิศวกรรมและตัวชี้วัดคุณภาพโครงเรื่อง 5 มิติ", "02")
add_clean_footer(s3, "Veloso & Prada, IEEE CoG 2021 · Section IV (The Proposed Model & Metrics)")

# Perfectly Centered Top Banner (Width 11.733in, X=0.80in)
c_top = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(1.35), Inches(11.733), Inches(1.15))
set_flat_box(c_top, C_WHITE, C_BORDER, 1)

tf_top = c_top.text_frame
tf_top.word_wrap = True
tf_top.margin_left = tf_top.margin_right = Inches(0.25)
tf_top.margin_top = Inches(0.12)
p_t1 = tf_top.paragraphs[0]
p_t1.alignment = PP_ALIGN.CENTER
p_t1.text = "การแปลงโครงเรื่องเป็นกราฟระบุทิศทาง (Directed Graph Formalization)"
p_t1.font.name = FONT_TH
p_t1.font.size = Pt(14)
p_t1.font.bold = True
p_t1.font.color.rgb = C_BLUE

p_t2 = tf_top.add_paragraph()
p_t2.alignment = PP_ALIGN.CENTER
p_t2.text = "นิยามโครงเรื่องในรูปกราฟ G = (V, E) โดย Passage คือโหนด (V) และ Link คือเส้นเชื่อมที่มีเงื่อนไขกำกับ (Guarded Edges E) แล้วใช้อัลกอริทึม Depth-First Search (DFS) ท่องไปในทุกเส้นทางที่เป็นไปได้แบบอัตโนมัติ เพื่อสร้างร่องรอยการเล่น (Playthrough Traces)"
p_t2.font.name = FONT_TH
p_t2.font.size = Pt(12)
p_t2.font.color.rgb = C_INK
p_t2.space_before = Pt(3)

# Row 1 (3 centered cards, total width = 11.733in, matching Top Banner!)
r1_items = [
    ("1. Number of Paths", "N", "paths", "จำนวนเส้นทางการเล่นทั้งหมด", "นับผลรวมของเส้นทางการเล่นที่เป็นไปได้ทั้งหมดตั้งแต่จุดเริ่มต้นจนถึงฉากจบ พร้อมบันทึก Passage ที่แวะผ่าน"),
    ("2. Stroke Points", "S", "points", "จุดบังคับผ่านของเนื้อเรื่อง", "ฉากสำคัญที่ทุกเส้นทางต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญตามเจตจำนงของผู้แต่งครบถ้วน"),
    ("3. Endings Hit %", "P", "endings", "การแจกแจงสัดส่วนฉากจบ", "คำนวณสัดส่วนความน่าจะเป็นในการจบแต่ละแบบ และตรวจหาฉากจบที่ไม่สามารถเข้าถึงได้จริง")
]
for i, (m_prefix, sym_base, sym_sub, m_sub, m_desc) in enumerate(r1_items):
    x = Inches(0.80 + i * (3.75 + 0.241))
    card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.70), Inches(3.75), Inches(1.82))
    set_flat_box(card, C_WHITE, C_BORDER, 1)
    tf_c = card.text_frame
    tf_c.word_wrap = True
    tf_c.margin_left = tf_c.margin_right = Inches(0.18)
    tf_c.margin_top = Inches(0.15)
    
    # Title with true subscript
    p = tf_c.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = ""
    run1 = p.add_run()
    run1.text = f"{m_prefix} ("
    run1.font.name = FONT_TH
    run1.font.size = Pt(13)
    run1.font.bold = True
    run1.font.color.rgb = C_BLUE
    
    run_base = p.add_run()
    run_base.text = sym_base
    run_base.font.name = FONT_TH
    run_base.font.size = Pt(13)
    run_base.font.bold = True
    run_base.font.color.rgb = C_BLUE
    
    run_sub = p.add_run()
    run_sub.text = sym_sub
    run_sub.font.name = FONT_TH
    run_sub.font.size = Pt(9.5)
    run_sub.font.subscript = True
    run_sub.font.bold = True
    run_sub.font.color.rgb = C_BLUE
    
    run_close = p.add_run()
    run_close.text = ")"
    run_close.font.name = FONT_TH
    run_close.font.size = Pt(13)
    run_close.font.bold = True
    run_close.font.color.rgb = C_BLUE
    
    p_s = tf_c.add_paragraph()
    p_s.alignment = PP_ALIGN.CENTER
    p_s.text = m_sub
    p_s.font.name = FONT_TH
    p_s.font.size = Pt(11.5)
    p_s.font.bold = True
    p_s.font.color.rgb = C_INK
    p_s.space_before = Pt(3)
    
    p_d = tf_c.add_paragraph()
    p_d.alignment = PP_ALIGN.CENTER
    p_d.text = m_desc
    p_d.font.name = FONT_TH
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = C_MUTED
    p_d.space_before = Pt(4)

# Row 2 (2 centered cards horizontally, total width = 11.733in, matching Top Banner!)
r2_width = Inches(5.746)
r2_gap = Inches(0.241)

# Card 4: Dead-Ends & Lost Plot
c4 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(4.72), r2_width, Inches(1.82))
set_flat_box(c4, C_WHITE, C_BORDER, 1)
tf4 = c4.text_frame
tf4.word_wrap = True
tf4.margin_left = tf4.margin_right = Inches(0.22)
tf4.margin_top = Inches(0.15)

p4 = tf4.paragraphs[0]
p4.alignment = PP_ALIGN.CENTER
p4.text = ""
r_t4_1 = p4.add_run()
r_t4_1.text = "4. Dead-Ends ("
r_t4_1.font.name = FONT_TH
r_t4_1.font.size = Pt(13)
r_t4_1.font.bold = True
r_t4_1.font.color.rgb = C_RED

r_d_base = p4.add_run()
r_d_base.text = "D"
r_d_base.font.name = FONT_TH
r_d_base.font.size = Pt(13)
r_d_base.font.bold = True
r_d_base.font.color.rgb = C_RED

r_d_sub = p4.add_run()
r_d_sub.text = "ends"
r_d_sub.font.name = FONT_TH
r_d_sub.font.size = Pt(9.5)
r_d_sub.font.subscript = True
r_d_sub.font.bold = True
r_d_sub.font.color.rgb = C_RED

r_t4_2 = p4.add_run()
r_t4_2.text = ") & Lost Plot ("
r_t4_2.font.name = FONT_TH
r_t4_2.font.size = Pt(13)
r_t4_2.font.bold = True
r_t4_2.font.color.rgb = C_RED

r_l_base = p4.add_run()
r_l_base.text = "L"
r_l_base.font.name = FONT_TH
r_l_base.font.size = Pt(13)
r_l_base.font.bold = True
r_l_base.font.color.rgb = C_RED

r_l_sub = p4.add_run()
r_l_sub.text = "plot"
r_l_sub.font.name = FONT_TH
r_l_sub.font.size = Pt(9.5)
r_l_sub.font.subscript = True
r_l_sub.font.bold = True
r_l_sub.font.color.rgb = C_RED

r_t4_3 = p4.add_run()
r_t4_3.text = ")"
r_t4_3.font.name = FONT_TH
r_t4_3.font.size = Pt(13)
r_t4_3.font.bold = True
r_t4_3.font.color.rgb = C_RED

p4_sub = tf4.add_paragraph()
p4_sub.alignment = PP_ALIGN.CENTER
p4_sub.text = "ทางตันและฉากที่ไม่ถูกเข้าถึง"
p4_sub.font.name = FONT_TH
p4_sub.font.size = Pt(11.5)
p4_sub.font.bold = True
p4_sub.font.color.rgb = C_INK
p4_sub.space_before = Pt(2)

p4_desc = tf4.add_paragraph()
p4_desc.alignment = PP_ALIGN.CENTER
p4_desc.text = "• Dead-End: ฉากที่ผู้เล่นดำเนินไปแล้วไม่มีทางเลือกให้ไปต่อจนจบเกม\n• Lost Plot: ฉากที่ไม่สามารถเข้าถึงได้จริงเนื่องจากเงื่อนไขตัวแปรขัดแย้ง"
p4_desc.font.name = FONT_TH
p4_desc.font.size = Pt(11)
p4_desc.font.color.rgb = C_MUTED
p4_desc.space_before = Pt(4)

# Card 5: Evolution of Variables
c5 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80 + 5.746 + 0.241), Inches(4.72), r2_width, Inches(1.82))
set_flat_box(c5, C_WHITE, C_BORDER, 1)
tf5 = c5.text_frame
tf5.word_wrap = True
tf5.margin_left = tf5.margin_right = Inches(0.22)
tf5.margin_top = Inches(0.15)

p5 = tf5.paragraphs[0]
p5.alignment = PP_ALIGN.CENTER
p5.text = ""
r_t5_1 = p5.add_run()
r_t5_1.text = "5. Evolution of Variables ("
r_t5_1.font.name = FONT_TH
r_t5_1.font.size = Pt(13)
r_t5_1.font.bold = True
r_t5_1.font.color.rgb = C_BLUE

r_v_base = p5.add_run()
r_v_base.text = "V"
r_v_base.font.name = FONT_TH
r_v_base.font.size = Pt(13)
r_v_base.font.bold = True
r_v_base.font.color.rgb = C_BLUE

r_v_sub = p5.add_run()
r_v_sub.text = "evol"
r_v_sub.font.name = FONT_TH
r_v_sub.font.size = Pt(9.5)
r_v_sub.font.subscript = True
r_v_sub.font.bold = True
r_v_sub.font.color.rgb = C_BLUE

r_t5_2 = p5.add_run()
r_t5_2.text = ")"
r_t5_2.font.name = FONT_TH
r_t5_2.font.size = Pt(13)
r_t5_2.font.bold = True
r_t5_2.font.color.rgb = C_BLUE

p5_sub = tf5.add_paragraph()
p5_sub.alignment = PP_ALIGN.CENTER
p5_sub.text = "การติดตามวิวัฒนาการตัวแปร"
p5_sub.font.name = FONT_TH
p5_sub.font.size = Pt(11.5)
p5_sub.font.bold = True
p5_sub.font.color.rgb = C_INK
p5_sub.space_before = Pt(2)

p5_desc = tf5.add_paragraph()
p5_desc.alignment = PP_ALIGN.CENTER
p5_desc.text = "พล็อต Dotted Chart แสดงการเปลี่ยนแปลงของตัวแปรอารมณ์และสถานะตลอดเส้นเรื่อง เพื่อตรวจจับค่าตัวแปรผิดปกติ (Out-of-range anomalies)"
p5_desc.font.name = FONT_TH
p5_desc.font.size = Pt(11)
p5_desc.font.color.rgb = C_MUTED
p5_desc.space_before = Pt(4)

s3.notes_slide.notes_text_frame.text = (
    "เวลา 1:40–2:50\n"
    "หน้าที่ 2 คือหัวใจทางวิศวกรรมของบทความครับ ผู้แต่งนำเสนอแบบจำลองที่แปลงโครงเรื่องเป็น Directed Graph G = (V, E) "
    "แล้วนิยามตัวชี้วัด 5 มิติ ได้แก่ จำนวนเส้นทางทั้งหมด (N_paths), จุดบังคับผ่าน (S_points), สัดส่วนฉากจบ (P_endings), "
    "ตรวจจับ Dead-Ends (D_ends) และ Lost Plot (L_plot) และติดตามวิวัฒนาการตัวแปร (V_evol)\n\n"
    "จุดเด่นคือการเปลี่ยนแนวคิดการแต่งเรื่องที่เป็นนามธรรม ให้กลายเป็นตัวชี้วัดเชิงคณิตศาสตร์ที่โปรแกรมคอมพิวเตอร์สามารถคำนวณและดีบักได้อย่างแม่นยำครับ"
)

# ------------------------------------------------------------------------------
# PPTX SLIDE 4: TMC & PERSONAS (Slide 03)
# ------------------------------------------------------------------------------
s4 = prs.slides.add_slide(blank_layout)
bg4 = s4.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_flat_box(bg4, C_LIGHT_BG, None)
add_clean_header(s4, "กรณีศึกษา The Murder Case และการจำลอง Persona", "03")
add_clean_footer(s4, "Veloso & Prada, IEEE CoG 2021 · Section V & VI-A (Prototype & The Scenario)")

# Left Card: TMC Scenario
c_tmc = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.35), Inches(5.7), Inches(5.35))
set_flat_box(c_tmc, C_WHITE, C_BORDER, 1)
tf_tmc = c_tmc.text_frame
tf_tmc.word_wrap = True
tf_tmc.margin_left = tf_tmc.margin_right = Inches(0.25)
tf_tmc.margin_top = Inches(0.2)

p = tf_tmc.paragraphs[0]
p.text = "ฉากทดสอบ The Murder Case (TMC)"
p.font.name = FONT_TH
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_BLUE

p_sub = tf_tmc.add_paragraph()
p_sub.text = "บทสนทนาแนวสืบสวนสอบปากคำผู้ต้องสงสัยคดีฆาตกรรม ควบคุมด้วยตัวแปรอารมณ์ 3 มิติ: โกรธ (Anger), สับสน (Confusion), กลัว (Fear)"
p_sub.font.name = FONT_TH
p_sub.font.size = Pt(12)
p_sub.font.color.rgb = C_MUTED
p_sub.space_before = Pt(4)

# 4 Stat boxes in TMC
stats_tmc = [("14", "Passages"), ("20", "Paths"), ("3", "ฉากจบ"), ("5", "บั๊กฝังไว้")]
for i, (val, lbl) in enumerate(stats_tmc):
    bx = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.05 + i * 1.3), Inches(2.55), Inches(1.15), Inches(0.85))
    set_flat_box(bx, RGBColor(0xF1, 0xF5, 0xF9), C_BORDER, 1)
    ptf = bx.text_frame
    ptf.margin_left = ptf.margin_top = ptf.margin_right = ptf.margin_bottom = 0
    pv = ptf.paragraphs[0]
    pv.text = val
    pv.alignment = PP_ALIGN.CENTER
    pv.font.name = FONT_TH
    pv.font.size = Pt(18)
    pv.font.bold = True
    pv.font.color.rgb = C_RED if i == 3 else C_BLUE
    
    pl = ptf.add_paragraph()
    pl.text = lbl
    pl.alignment = PP_ALIGN.CENTER
    pl.font.name = FONT_TH
    pl.font.size = Pt(10)
    pl.font.color.rgb = C_MUTED

# Bug List Box
b_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.05), Inches(3.65), Inches(5.2), Inches(2.8))
set_flat_box(b_box, RGBColor(0xFE, 0xF2, 0xF2), RGBColor(0xFC, 0xA5, 0xA5), 1)
tf_b = b_box.text_frame
tf_b.word_wrap = True
tf_b.margin_left = tf_b.margin_right = Inches(0.2)
tf_b.margin_top = Inches(0.15)
pb1 = tf_b.paragraphs[0]
pb1.text = "ชุดข้อผิดพลาดที่จงใจฝังไว้ (TMC - Failed Version):"
pb1.font.name = FONT_TH
pb1.font.size = Pt(13)
pb1.font.bold = True
pb1.font.color.rgb = C_RED

bugs = [
    "ปัญหา 1: เส้นทาง #7 ไปไม่ถึงฉากจบ (เกิด Dead-End ที่ Choice 5)",
    "ปัญหา 2: เส้นทาง #8 เกิดวงวนไม่รู้จบ (Loop วนซ้ำ)",
    "ปัญหา 3: เส้นทาง #14 ไปไม่ถึงฉากจบ (เกิด Dead-End ที่ Choice 5)",
    "ปัญหา 4: ฉาก Ending 1 ไม่มีทางไปถึง (Unreachable Passage)",
    "ปัญหา 5: ฉาก Choice 6 ไม่มีทางไปถึง (Unreachable Passage)"
]
for b in bugs:
    p = tf_b.add_paragraph()
    p.text = f"• {b}"
    p.font.name = FONT_TH
    p.font.size = Pt(11)
    p.font.color.rgb = RGBColor(0x7F, 0x1D, 0x1D)
    p.space_before = Pt(3)

# Right Card: Persona Search
c_per = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.35), Inches(5.733), Inches(5.35))
set_flat_box(c_per, C_WHITE, C_BORDER, 1)
tf_p = c_per.text_frame
tf_p.word_wrap = True
tf_p.margin_left = tf_p.margin_right = Inches(0.25)
tf_p.margin_top = Inches(0.2)

p_p = tf_p.paragraphs[0]
p_p.text = "การจำลองพฤติกรรมผู้เล่น (Player Personas)"
p_p.font.name = FONT_TH
p_p.font.size = Pt(16)
p_p.font.bold = True
p_p.font.color.rgb = C_BLUE

p_pd = tf_p.add_paragraph()
p_pd.text = "ใช้อัลกอริทึม Heuristic Greedy Search คำนวณค่าน้ำหนักตัวแปรเพื่อจำลองการตัดสินใจตามบุคลิกภาพ:"
p_pd.font.name = FONT_TH
p_pd.font.size = Pt(12.5)
p_pd.font.color.rgb = C_INK
p_pd.space_before = Pt(4)

# Math block
m_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.05), Inches(2.45), Inches(5.2), Inches(0.95))
set_flat_box(m_box, RGBColor(0xF1, 0xF5, 0xF9), C_BLUE, 1)
tf_m = m_box.text_frame
tf_m.margin_left = tf_m.margin_top = tf_m.margin_right = tf_m.margin_bottom = 0
pm = tf_m.paragraphs[0]
pm.text = "Score(L) = Σ (w_i × v_i)   |   L* = arg max Score(L)"
pm.alignment = PP_ALIGN.CENTER
pm.font.name = "Cambria Math"
pm.font.size = Pt(14)
pm.font.bold = True
pm.font.color.rgb = C_INK

p_ex1 = tf_p.add_paragraph()
p_ex1.text = "• Aggressive Persona (สายก้าวร้าว): W_โกรธ = 0.75, W_สับสน = 0.15, W_กลัว = 0.10"
p_ex1.font.name = FONT_TH
p_ex1.font.size = Pt(12)
p_ex1.font.color.rgb = C_MUTED
p_ex1.space_before = Pt(85)

p_ex2 = tf_p.add_paragraph()
p_ex2.text = "• Paranoid Persona (สายระแวง): W_กลัว = 0.70, W_สับสน = 0.20, W_โกรธ = 0.10"
p_ex2.font.name = FONT_TH
p_ex2.font.size = Pt(12)
p_ex2.font.color.rgb = C_MUTED
p_ex2.space_before = Pt(4)

p_ben = tf_p.add_paragraph()
p_ben.text = "ประโยชน์: ช่วยให้นักเขียนพยากรณ์ได้ล่วงหน้าว่า ผู้เล่นที่มีสไตล์การตัดสินใจเฉพาะกลุ่มจะเดินไปเจอบั๊กจุดใดบ้าง โดยไม่ต้องรอให้ผู้เล่นจริงมาเผชิญหน้ากับความผิดพลาด"
p_ben.font.name = FONT_TH
p_ben.font.size = Pt(12)
p_ben.font.color.rgb = C_INK
p_ben.space_before = Pt(14)

s4.notes_slide.notes_text_frame.text = (
    "เวลา 2:50–3:55\n"
    "หน้าที่ 3 คือการทดสอบในบทความครับ ผู้แต่งสร้างกรณีศึกษาชื่อ The Murder Case เป็นบทสอบปากคำคดีฆาตกรรม มี 14 ฉาก 20 เส้นทาง "
    "และได้จงใจฝังข้อผิดพลาด 5 จุด ทั้ง Dead-End, ลูปวนซ้ำ และฉากที่เข้าไม่ถึง\n\n"
    "นอกจากนี้ ยังมีโมเดล Heuristic Greedy Search ที่จำลองพฤติกรรมผู้เล่นตามน้ำหนักอารมณ์ เช่น ผู้เล่นสายก้าวร้าว หรือสายระแวง "
    "เพื่อตรวจดูว่าผู้เล่นแต่ละบุคลิกภาพจะเดินไปตกหลุมพรางหรือเจอบั๊กตัวไหนบ้างครับ"
)

# ------------------------------------------------------------------------------
# PPTX SLIDE 5: EMPIRICAL RESULTS (Slide 04)
# ------------------------------------------------------------------------------
s5 = prs.slides.add_slide(blank_layout)
bg5 = s5.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_flat_box(bg5, C_LIGHT_BG, None)
add_clean_header(s5, "ผลการประเมินเชิงประจักษ์: เวลาตรวจจับบั๊กและคะแนน SUS", "04")
add_clean_footer(s5, "Veloso & Prada, IEEE CoG 2021 · Section VI-B & VI-C (User Evaluation & Results)")

# Left Card: Graphic Fig 8
c_g = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.35), Inches(5.7), Inches(5.35))
set_flat_box(c_g, C_WHITE, C_BORDER, 1)
tf_g = c_g.text_frame
tf_g.word_wrap = True
tf_g.margin_left = tf_g.margin_right = Inches(0.25)
tf_g.margin_top = Inches(0.2)
p_g = tf_g.paragraphs[0]
p_g.text = "การตรวจจับจุดบกพร่องบนกราฟเนื้อเรื่อง"
p_g.font.name = FONT_TH
p_g.font.size = Pt(16)
p_g.font.bold = True
p_g.font.color.rgb = C_BLUE

img_f8 = ASSETS_DIR / "fig8_problem_analysis.png"
if img_f8.exists():
    s5.shapes.add_picture(str(img_f8), Inches(1.05), Inches(1.9), Inches(5.2), Inches(3.4))

p_cap = tf_g.add_paragraph()
p_cap.text = "ภาพที่ 2: ระบบ Story Validator ชี้ชัดตำแหน่งข้อผิดพลาดทั้ง 5 จุดบนโครงสร้างกราฟ TMC โดยปัญหาที่ 1, 3, 4, 5 ถูกตรวจพบครบ 100% ผ่านตัวกรอง Lost Plot"
p_cap.font.name = FONT_TH
p_cap.font.size = Pt(11)
p_cap.font.color.rgb = C_MUTED
p_cap.space_before = Pt(260)

# Right Card: Stats & Findings
c_st = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.35), Inches(5.733), Inches(5.35))
set_flat_box(c_st, C_WHITE, C_BORDER, 1)
tf_s = c_st.text_frame
tf_s.word_wrap = True
tf_s.margin_left = tf_s.margin_right = Inches(0.25)
tf_s.margin_top = Inches(0.2)
p_st = tf_s.paragraphs[0]
p_st.text = "ตัวเลขสถิติจากการทดสอบกับผู้ใช้ 20 คน (Study 2)"
p_st.font.name = FONT_TH
p_st.font.size = Pt(16)
p_st.font.bold = True
p_st.font.color.rgb = C_BLUE

stats_data = [("52.3s", "ตรวจพบบั๊ก", "σ = 22.7 s"), ("146.2s", "แก้ปัญหา", "σ = 31.8 s"), ("92.4", "คะแนน SUS", "Truly Superior")]
for i, (v, l, s) in enumerate(stats_data):
    sc = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.05 + i * 1.76), Inches(2.0), Inches(1.68), Inches(1.3))
    set_flat_box(sc, RGBColor(0xF8, 0xFA, 0xFC), C_TEAL if i == 2 else C_BORDER, 1.5 if i == 2 else 1)
    tf_sc = sc.text_frame
    tf_sc.margin_left = tf_sc.margin_top = tf_sc.margin_right = tf_sc.margin_bottom = 0
    pv = tf_sc.paragraphs[0]
    pv.text = v
    pv.alignment = PP_ALIGN.CENTER
    pv.font.name = FONT_TH
    pv.font.size = Pt(22)
    pv.font.bold = True
    pv.font.color.rgb = C_TEAL if i == 2 else C_BLUE
    
    pl = tf_sc.add_paragraph()
    pl.text = l
    pl.alignment = PP_ALIGN.CENTER
    pl.font.name = FONT_TH
    pl.font.size = Pt(11.5)
    pl.font.bold = True
    pl.font.color.rgb = C_INK
    
    ps = tf_sc.add_paragraph()
    ps.text = s
    ps.alignment = PP_ALIGN.CENTER
    ps.font.name = FONT_TH
    ps.font.size = Pt(10)
    ps.font.color.rgb = C_MUTED

p_fnd = tf_s.add_paragraph()
p_fnd.text = "ข้อค้นพบเชิงพฤติกรรมที่สำคัญ:"
p_fnd.font.name = FONT_TH
p_fnd.font.size = Pt(13.5)
p_fnd.font.bold = True
p_fnd.font.color.rgb = C_INK
p_fnd.space_before = Pt(120)

findings = [
    "ความล้มเหลวของการกวาดสายตา: มีผู้ใช้ 3 คน (15%) พลาดปัญหาที่ 2 เพราะพยายามกวาดสายตาไล่ดูบนแผนผังต้นไม้ แทนที่จะใช้ฟังก์ชันตัวกรองอัตโนมัติ",
    "ความยากในการแก้ไข: 25% ของผู้ใช้ติดขัดในการแก้ปัญหาที่ 5 เนื่องจากความซับซ้อนของเงื่อนไขตัวแปรที่ผูกซ้อนกันหลายชั้น",
    "วิวัฒนาการความสามารถใช้งาน: คะแนน SUS พุ่งขึ้นจาก 83.5 (Study 1, 5 คน) สู่ 92.4 หลังปรับปรุง Tooltips และระบบสรุปรายงาน"
]
for f in findings:
    p = tf_s.add_paragraph()
    p.text = f"• {f}"
    p.font.name = FONT_TH
    p.font.size = Pt(11.5)
    p.font.color.rgb = C_MUTED
    p.space_before = Pt(4)

s5.notes_slide.notes_text_frame.text = (
    "เวลา 3:55–4:55\n"
    "หน้าที่ 4 คือผลการประเมินเชิงประจักษ์ครับ ผู้แต่งทดสอบกับผู้ใช้ 20 คนใน User Study 2 "
    "พบว่าผู้ใช้ใช้เวลาเฉลี่ยเพียง 52.3 วินาทีในการตรวจพบบั๊กทั้ง 5 จุด และคะแนน SUS สูงถึง 92.4 จัดอยู่ในเกณฑ์ Truly Superior\n\n"
    "ที่น่าสนใจคือ มีผู้ใช้ 3 คนที่หาปัญหาที่ 2 ไม่พบ เพราะไปพยายามนั่งเพ่งผังต้นไม้แทนที่จะกดฟังก์ชัน Lost Plot "
    "สิ่งนี้พิสูจน์ว่า เมื่อโครงเรื่องมีความซับซ้อน มนุษย์ต้องการเครื่องมือคำนวณทางคณิตศาสตร์มาช่วย ไม่สามารถพึ่งพาเพียงสายตาได้อีกต่อไปครับ"
)

# ------------------------------------------------------------------------------
# PPTX SLIDE 6: CONTRIBUTIONS & VALUE (Slide 05)
# ------------------------------------------------------------------------------
s6 = prs.slides.add_slide(blank_layout)
bg6 = s6.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_flat_box(bg6, C_LIGHT_BG, None)
add_clean_header(s6, "คุณูปการทางวิชาการและการต่อยอดทางวิศวกรรมซอฟต์แวร์", "05")
add_clean_footer(s6, "Veloso & Prada, IEEE CoG 2021 · Section VII & Discussion")

# Left Card: Scientific Contributions
c_c = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.35), Inches(5.7), Inches(5.35))
set_flat_box(c_c, C_WHITE, C_BORDER, 1)
tf_c = c_c.text_frame
tf_c.word_wrap = True
tf_c.margin_left = tf_c.margin_right = Inches(0.25)
tf_c.margin_top = Inches(0.2)
p_c = tf_c.paragraphs[0]
p_c.text = "คุณูปการทางวิชาการ (Scientific Contributions)"
p_c.font.name = FONT_TH
p_c.font.size = Pt(16)
p_c.font.bold = True
p_c.font.color.rgb = C_BLUE

contribs = [
    ("Formal Structural Metrics", "นิยามตัวชี้วัดเชิงโครงสร้างจากนามธรรมสู่นิพจน์ทางคณิตศาสตร์ (Stroke Points, Lost Plot, Dead-Ends) ที่สามารถคำนวณซ้ำได้อย่างเป็นระบบ"),
    ("Automated Offline Verification", "สถาปัตยกรรมการตรวจพิสูจน์กราฟเนื้อเรื่องแบบออฟไลน์ ช่วยลดต้นทุนมหาศาลก่อนเข้าสู่ขั้นตอน Human Playtesting"),
    ("Persona-Informed Simulation", "กรอบการใช้ Heuristic Search จำลองพฤติกรรมตามโปรไฟล์ผู้เล่น ช่วยพยากรณ์จุดบกพร่องตามแนวโน้มการตัดสินใจจริง")
]
for t, d in contribs:
    p = tf_c.add_paragraph()
    p.text = f"• {t}:"
    p.font.name = FONT_TH
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_INK
    p.space_before = Pt(8)
    
    pd = tf_c.add_paragraph()
    pd.text = f"   {d}"
    pd.font.name = FONT_TH
    pd.font.size = Pt(12)
    pd.font.color.rgb = C_MUTED

# Right Card: Software Engineering Value
c_v = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.35), Inches(5.733), Inches(5.35))
set_flat_box(c_v, C_WHITE, C_BORDER, 1)
tf_v = c_v.text_frame
tf_v.word_wrap = True
tf_v.margin_left = tf_v.margin_right = Inches(0.25)
tf_v.margin_top = Inches(0.2)
p_v = tf_v.paragraphs[0]
p_v.text = "การประยุกต์ใช้กับสถาปัตยกรรมระบบเกมเล่าเรื่อง"
p_v.font.name = FONT_TH
p_v.font.size = Pt(16)
p_v.font.bold = True
p_v.font.color.rgb = C_BLUE

values = [
    ("Node & Edge Schema", "โครงสร้าง Passage และ Link สามารถเชื่อมโยงสู่โมเดลข้อมูลแบบ Directed Graph ของเอนจินเกมเชิงโต้ตอบยุคใหม่ได้โดยตรง"),
    ("Dynamic Branching Evaluation", "แนวคิด Guarded Condition สอดคล้องกับการตรวจประเมินค่าตัวแปรใน Game Runtime State ก่อนอนุญาตให้เลือกเส้นทาง"),
    ("Pre-Publish Quality Assurance", "สามารถนำ DFS Validation ไปผสานในกระบวนการ CI/CD หรือ Content Moderation เพื่อสแกนหา Dead-Ends ก่อนเผยแพร่สู่ผู้เล่น")
]
for t, d in values:
    p = tf_v.add_paragraph()
    p.text = f"• {t}:"
    p.font.name = FONT_TH
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_INK
    p.space_before = Pt(8)
    
    pd = tf_v.add_paragraph()
    pd.text = f"   {d}"
    pd.font.name = FONT_TH
    pd.font.size = Pt(12)
    pd.font.color.rgb = C_MUTED

s6.notes_slide.notes_text_frame.text = (
    "เวลา 4:55–5:55\n"
    "หน้าที่ 5 คือคุณค่าของงานวิจัยต่อวงการวิศวกรรมซอฟต์แวร์ครับ บทความนี้นอกจากจะให้โมเดลคณิตศาสตร์สำหรับวัดคุณภาพเนื้อเรื่องแล้ว "
    "แนวคิดทั้ง Passage, Link และ Guarded Conditions ยังสามารถนำไปประยุกต์ใช้กับสถาปัตยกรรมของเอนจินเกมเชิงโต้ตอบ "
    "เช่น การนำ DFS ไปใส่ในระบบ CI/CD หรือ Moderation Service เพื่อตรวจจับ Dead-Ends ก่อนกด Publish สู่ผู้เล่นได้อย่างมีนัยสำคัญครับ"
)

# ------------------------------------------------------------------------------
# PPTX SLIDE 7: LIMITATIONS & DISCUSSION (Slide 06 - Clean Light Theme, NO Thank You)
# ------------------------------------------------------------------------------
s7 = prs.slides.add_slide(blank_layout)
bg7 = s7.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_flat_box(bg7, C_LIGHT_BG, None)
add_clean_header(s7, "ข้อจำกัด การวิจารณ์เชิงวิชาการ และบทสรุป", "06")
add_clean_footer(s7, "Veloso & Prada, IEEE CoG 2021 · Section VII (Discussion & Conclusion) · 305432 เครือข่ายเซนเซอร์")

# Left Card: 3 Limitations
c_lim = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.35), Inches(5.7), Inches(5.35))
set_flat_box(c_lim, C_WHITE, C_BORDER, 1)
tf_lim = c_lim.text_frame
tf_lim.word_wrap = True
tf_lim.margin_left = tf_lim.margin_right = Inches(0.25)
tf_lim.margin_top = Inches(0.2)
p_lim = tf_lim.paragraphs[0]
p_lim.text = "3 ข้อจำกัดเชิงวิชาการสำคัญ (Scientific Limitations)"
p_lim.font.name = FONT_TH
p_lim.font.size = Pt(16)
p_lim.font.bold = True
p_lim.font.color.rgb = C_RED

lims = [
    ("ขาดกลุ่มควบคุม (No Control Baseline)", "วัดได้ว่าใช้เครื่องมือแล้วตรวจได้ใน 52.3 วินาที แต่ไม่ได้วัดเทียบกับกลุ่มที่ตรวจด้วยตาเปล่าใน Twine จึงบอกได้เพียงเครื่องมือใช้งานได้จริง แต่ยังไม่พิสูจน์ความเร็วเปรียบเทียบเชิงสถิติ"),
    ("State-Space Explosion ของ DFS", "การสำรวจทุกเส้นทางด้วย DFS ทำงานได้ดีในเรื่องขนาดเล็ก แต่หากกราฟมีหลายร้อยฉากและมีวงวน (Loops) จำนวนเส้นทางจะพุ่งสูงแบบ Exponential"),
    ("ขอบเขตของชุดทดสอบ (Evaluation Scope)", "บั๊กทั้ง 5 จุดใน TMC ถูกตรวจพบด้วยฟังก์ชัน Lost Plot เพียงอย่างเดียว ยังไม่ได้พิสูจน์คุณค่าของ Stroke Points หรือตัวแปรที่มีความซับซ้อนสูงในสเกลระดับอุตสาหกรรม")
]
for t, d in lims:
    p = tf_lim.add_paragraph()
    p.text = f"• {t}:"
    p.font.name = FONT_TH
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_INK
    p.space_before = Pt(8)
    
    pd = tf_lim.add_paragraph()
    pd.text = f"   {d}"
    pd.font.name = FONT_TH
    pd.font.size = Pt(11.5)
    pd.font.color.rgb = C_MUTED

# Right Card: Synthesis & Future Directions
c_con = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.35), Inches(5.733), Inches(5.35))
set_flat_box(c_con, C_WHITE, C_BORDER, 1)
tf_con = c_con.text_frame
tf_con.word_wrap = True
tf_con.margin_left = tf_con.margin_right = Inches(0.25)
tf_con.margin_top = Inches(0.2)
p_con = tf_con.paragraphs[0]
p_con.text = "บทสรุปภาพรวมและการต่อยอด (Synthesis & Future Work)"
p_con.font.name = FONT_TH
p_con.font.size = Pt(16)
p_con.font.bold = True
p_con.font.color.rgb = C_BLUE

p_cd = tf_con.add_paragraph()
p_cd.text = "Story Validator ได้วางรากฐานสำคัญของการนำ ทฤษฎีกราฟและการจำลอง Persona มาใช้ตรวจพิสูจน์เกมการเล่าเรื่องแบบมีปฏิสัมพันธ์ ช่วยยกระดับจากการทดสอบด้วยสายตาของมนุษย์สู่การตรวจสอบเชิงระบบแบบอัตโนมัติ (Automated Quality Assurance) เพื่อธำรงไว้ซึ่งเจตจำนงของผู้ประพันธ์ได้อย่างครบถ้วน"
p_cd.font.name = FONT_TH
p_cd.font.size = Pt(13)
p_cd.font.color.rgb = C_INK
p_cd.space_before = Pt(8)

p_fut = tf_con.add_paragraph()
p_fut.text = "ทิศทางการพัฒนาต่อยอดในอนาคต:"
p_fut.font.name = FONT_TH
p_fut.font.size = Pt(13.5)
p_fut.font.bold = True
p_fut.font.color.rgb = C_INK
p_fut.space_before = Pt(12)

fut_items = [
    ("Commercial Engine Integration", "พัฒนาปลั๊กอินเชื่อมต่อกับเอนจินเกมเชิงพาณิชย์ เช่น Unity, Unreal Engine หรือระบบ Web Visual Novels"),
    ("Automated Narrative Repair", "นำโมเดลภาษาขนาดใหญ่ (LLMs) มาช่วยวิเคราะห์และเสนอแนะการซ่อมแซมเส้นเรื่องที่ผิดพลาดโดยอัตโนมัติ"),
    ("Heuristic Graph Pruning", "พัฒนาเทคนิคตัดกิ่งกราฟที่ไม่จำเป็น เพื่อแก้ปัญหา State-Space Explosion ในเกมขนาดยาว")
]
for t, d in fut_items:
    p = tf_con.add_paragraph()
    p.text = f"• {t}:"
    p.font.name = FONT_TH
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_INK
    p.space_before = Pt(6)
    
    pd = tf_con.add_paragraph()
    pd.text = f"   {d}"
    pd.font.name = FONT_TH
    pd.font.size = Pt(11.5)
    pd.font.color.rgb = C_MUTED

s7.notes_slide.notes_text_frame.text = (
    "เวลา 5:55–6:45\n"
    "สไลด์สุดท้ายคือการวิจารณ์อย่างเป็นกลางตามหลักวิชาการครับ ข้อจำกัดสำคัญคือการขาดกลุ่มควบคุมเปรียบเทียบ "
    "และการใช้ DFS อาจติดปัญหา State-Space Explosion เมื่อโครงเรื่องมีขนาดใหญ่มาก\n\n"
    "แต่โดยสรุป Story Validator ถือเป็นก้าวสำคัญที่เปลี่ยนผ่านจากการทดลองเล่นด้วยคน สู่การตรวจสอบตรรกะแบบอัตโนมัติ "
    "และสามารถนำไปต่อยอดร่วมกับเอนจินเกมสมัยใหม่ได้อย่างมีนัยสำคัญ ขอจบการนำเสนอเท่านี้ครับ"
)

prs.save(str(PPTX_OUT))
print(f"Generated refined PPTX slides: {PPTX_OUT}")
