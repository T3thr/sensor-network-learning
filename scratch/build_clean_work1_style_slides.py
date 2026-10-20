#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates clean, academic slides for Assignment Paper 2 (Story Validator)
strictly matching the clean, non-AI-slop design system of Work 1 (Assignment_Paper_1_IoT-CAD).

Requirements:
1. Authentic, simple, natural titles from the paper (no bombastic AI words).
2. Clean cover slide: NO decorative quote, NO "Assignment Paper 2" tag, everything centered.
3. Clean footer: NO raw DOI, NO course code popping up in Slide 7. Only clean citation & page number.
4. Natural Thai terminology without awkward parenthesized English.
5. Slide 02 (The Proposed Model & Metrics) structured into 2 clear zones with distinct cards and breathing space.
6. NO corner-accent colored bars, NO summary/callout boxes ("สรุปปัญหา", "ข้อควรระวัง", "สรุปบทเรียน").
"""

import os
import subprocess
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

BASE_DIR = "/Users/3rapat/student/universty/NU/project/senior/senior-subject/sensor-network"
WORK2_DIR = os.path.join(BASE_DIR, "assignement/work2")
BUILD_DIR = os.path.join(WORK2_DIR, ".build")
ASSETS_DIR = os.path.join(BUILD_DIR, "slide-assets")
SLIDES_DIR = os.path.join(WORK2_DIR, "03_slides")
os.makedirs(SLIDES_DIR, exist_ok=True)
os.makedirs(BUILD_DIR, exist_ok=True)

HTML_OUT = os.path.join(BUILD_DIR, "slides.html")
PDF_OUT = os.path.join(SLIDES_DIR, "Assignment_Paper_2_StoryValidator_5-to-8-min.pdf")
PPTX_OUT = os.path.join(SLIDES_DIR, "Assignment_Paper_2_StoryValidator_5-to-8-min.pptx")

FIG1_PATH = os.path.join(ASSETS_DIR, "fig1_twine_storyboard.png")
FIG8_PATH = os.path.join(ASSETS_DIR, "fig8_problem_analysis.png")

# Colors matching Work 1
C_NAVY_RGB = RGBColor(15, 45, 74)     # #0F2D4A (Work 1 top header navy)
C_BLUE_RGB = RGBColor(30, 58, 138)    # #1E3A8A (Academic blue)
C_INK_RGB = RGBColor(15, 23, 42)      # #0F172A (Deep charcoal body)
C_MUTED_RGB = RGBColor(100, 116, 139) # #64748B (Muted grey)
C_CARD_BG_RGB = RGBColor(255, 255, 255) # White card
C_LIGHT_BG_RGB = RGBColor(248, 250, 252) # #F8FAFC
C_BORDER_RGB = RGBColor(226, 232, 240) # #E2E8F0
C_ACCENT_BLUE_RGB = RGBColor(37, 99, 235) # #2563EB
C_RED_RGB = RGBColor(185, 28, 28)     # #B91C1C

FONT_TH = "TH Sarabun New"

# ==============================================================================
# 1. GENERATE CLEAN HTML SLIDES
# ==============================================================================
html_content = f"""<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<style>
  @page {{
    size: 16in 9in;
    margin: 0;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: 'TH Sarabun New', 'Sarabun', Tahoma, -apple-system, sans-serif;
    color: #0F172A;
    background: #E2E8F0;
    -webkit-font-smoothing: antialiased;
  }}
  .slide {{
    width: 16in;
    height: 9in;
    position: relative;
    page-break-after: always;
    background: #F8FAFC;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }}

  /* Work 1 style top banner */
  .top-banner {{
    height: 0.95in;
    background: #0F2D4A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8in;
    flex-shrink: 0;
  }}
  .top-banner-title {{
    font-size: 22pt;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.3px;
  }}
  
  /* Slide body area */
  .slide-content {{
    flex: 1;
    padding: 0.35in 0.8in 0.25in 0.8in;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }}

  /* Work 1 style footer */
  .footer {{
    height: 0.45in;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8in;
    border-top: 1px solid #E2E8F0;
    font-size: 11pt;
    color: #64748B;
    background: #F8FAFC;
    flex-shrink: 0;
  }}
  .footer-page {{
    font-size: 13pt;
    font-weight: 700;
    color: #0F2D4A;
  }}

  /* Clean academic cards */
  .card {{
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 0.22in 0.28in;
  }}
  .card-title {{
    font-size: 14.5pt;
    font-weight: 700;
    color: #0F2D4A;
    margin-bottom: 0.08in;
  }}
  .card-body {{
    font-size: 12.5pt;
    color: #334155;
    line-height: 1.5;
  }}
  .sub-card {{
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 0.12in 0.18in;
    margin-bottom: 0.1in;
  }}
  .sub-card:last-child {{
    margin-bottom: 0;
  }}

  /* Metric summary stat boxes */
  .metric-box {{
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 0.18in 0.2in;
    text-align: center;
    flex: 1;
  }}
  .metric-val {{
    font-size: 30pt;
    font-weight: 700;
    color: #0F2D4A;
    line-height: 1.1;
  }}
  .metric-lbl {{
    font-size: 12pt;
    color: #64748B;
    margin-top: 0.04in;
  }}
</style>
</head>
<body>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 1: COVER (Exactly matching Work 1 centered layout)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide" style="justify-content: center; align-items: center; text-align: center; padding: 0 1.2in; background: #FFFFFF;">
  <div style="font-size: 18pt; color: #475569; font-weight: 600; margin-bottom: 0.35in;">
    วิชา 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
  </div>

  <div style="font-size: 34pt; font-weight: 700; color: #0F2D4A; line-height: 1.25; max-width: 13.5in; margin-bottom: 0.15in;">
    Story Validator: Validating the Plot of Interactive Narrative Games
  </div>

  <div style="font-size: 20pt; color: #1E3A8A; font-weight: 600; margin-bottom: 0.35in;">
    การตรวจสอบโครงเรื่องของเกมแบบโต้ตอบด้วยแบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น
  </div>

  <div style="width: 1.2in; height: 3.5px; background: #2563EB; border-radius: 2px; margin-bottom: 0.35in;"></div>

  <div style="font-size: 15.5pt; color: #334155; font-weight: 600; margin-bottom: 0.08in;">
    2021 IEEE Conference on Games (CoG)
  </div>
  <div style="font-size: 14.5pt; color: #64748B; margin-bottom: 0.6in;">
    คณะผู้วิจัย: Carolina Veloso, Rui Prada (INESC-ID &amp; Instituto Superior Técnico, Universidade de Lisboa)
  </div>

  <div style="font-size: 17.5pt; font-weight: 700; color: #0F2D4A; margin-bottom: 0.06in;">
    นายธีรภัทร ภู่ระย้า ลำดับที่ 10
  </div>
  <div style="font-size: 16pt; color: #475569;">
    รหัสนิสิต 66362416
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 2: THE CHALLENGES (Slide 1)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="top-banner">
    <div class="top-banner-title">ปัญหาและความท้าทายในการตรวจสอบ Interactive Story</div>
  </div>

  <div class="slide-content">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35in;">
      <!-- Left Column -->
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="card-title" style="font-size: 16pt; color: #0F2D4A; margin-bottom: 0.15in;">
            ความท้าทายหลักของโครงเรื่องแบบแตกแขนง
          </div>
          <div class="card-body" style="font-size: 13pt;">
            <div style="margin-bottom: 0.14in;">
              • <strong>Authorial Intent vs Player Agency:</strong> การรักษาสมดุลระหว่างสิ่งที่คนแต่งต้องการเล่า กับอิสระในการตัดสินใจของผู้เล่น
            </div>
            <div style="margin-bottom: 0.14in;">
              • <strong>State-Space Explosion:</strong> โครงเรื่องแตกกิ่งก้านสาขาทวีคูณตามทางเลือก จนเกินขีดความสามารถที่จะตรวจสอบด้วยสายตามนุษย์
            </div>
            <div style="margin-bottom: 0.14in;">
              • <strong>Guarded Variables &amp; Logic:</strong> การผูกเงื่อนไขกับตัวแปรสะสม (เช่น ค่าอารมณ์, สกิล) เสี่ยงต่อการเกิดข้อผิดพลาดเชิงตรรกะในเส้นทางที่คาดไม่ถึง
            </div>
            <div>
              • <strong>High Playtesting Cost:</strong> การทดสอบเล่นด้วยคนจริงมีต้นทุนสูง ช้า และไม่ครอบคลุมทุกเส้นทางของเรื่องราว
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div style="display: flex; flex-direction: column; gap: 0.2in;">
        <div class="card" style="text-align: center; padding: 0.18in;">
          <img src="{FIG1_PATH}" style="width: 100%; max-height: 2.7in; object-fit: contain; border-radius: 6px;" alt="Twine Storyboard">
          <div style="font-size: 11pt; color: #64748B; margin-top: 0.08in;">
            ภาพที่ 1: ผังโครงเรื่องแบบ Node &amp; Link ใน Twine ซึ่งซับซ้อนเกินกว่าจะตรวจทานด้วยสายตามนุษย์
          </div>
        </div>

        <div class="card" style="padding: 0.18in 0.24in;">
          <div class="card-title" style="font-size: 14pt; margin-bottom: 0.06in;">ปัญหาการตรวจสอบในทางปฏิบัติ</div>
          <div class="card-body" style="font-size: 12.5pt;">
            ผลสำรวจในบทความพบว่า <strong>76% ของนักเขียนบทเกมยังคงใช้ MS Word หรือ Google Docs</strong> ในการร่างบท โดยเครื่องมืออย่าง Twine หรือ Ren'Py ช่วยเพียงการเรียบเรียง แต่ขาดระบบตรวจสอบความถูกต้องเชิงตรรกะแบบอัตโนมัติ ทำให้มักพบ Dead-Ends และ Lost Plot
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>เอกสารอ้างอิง: Veloso &amp; Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)</div>
    <div class="footer-page">1</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 3: GRAPH MODEL & METRICS (Slide 2 - 2 Distinct Zones, No Cramming!)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="top-banner">
    <div class="top-banner-title">แบบจำลองกราฟและตัวชี้วัดโครงเรื่อง (The Proposed Model &amp; Metrics)</div>
  </div>

  <div class="slide-content">
    <div style="display: grid; grid-template-columns: 0.42fr 0.58fr; gap: 0.35in;">
      <!-- Zone 1: Graph Representation -->
      <div style="display: flex; flex-direction: column; gap: 0.18in;">
        <div style="font-size: 15.5pt; font-weight: 700; color: #0F2D4A;">
          แบบจำลองโครงเรื่องด้วยกราฟ (Graph Representation)
        </div>

        <div class="card" style="padding: 0.22in 0.25in;">
          <div class="card-title" style="font-size: 14.5pt; color: #1E3A8A; margin-bottom: 0.08in;">
            1. นิยามกราฟระบุทิศทาง G = (V, E)
          </div>
          <div class="card-body" style="font-size: 12.5pt;">
            • <strong>Passage (โหนด V):</strong> แต่ละฉากของเนื้อเรื่อง บรรจุเนื้อหาบทสนทนาและคำสั่งตัวแปร<br>
            • <strong>Link (เส้นเชื่อม E):</strong> ทางเลือกของผู้เล่น พร้อมเงื่อนไขตัวแปรกำกับ (Guarded Edges)
          </div>
        </div>

        <div class="card" style="padding: 0.22in 0.25in;">
          <div class="card-title" style="font-size: 14.5pt; color: #1E3A8A; margin-bottom: 0.08in;">
            2. การท่องกราฟด้วย DFS
          </div>
          <div class="card-body" style="font-size: 12.5pt;">
            • ใช้อัลกอริทึม <strong>Depth-First Search (DFS)</strong> เริ่มจากจุดเริ่มต้นและท่องไปจนสุดฉากจบทีละเส้นทาง<br>
            • รวบรวมร่องรอยการเล่น (Playthrough Traces) ทุกเส้นทางที่เป็นไปได้แบบอัตโนมัติ เพื่อนำไปคำนวณตัวชี้วัด
          </div>
        </div>
      </div>

      <!-- Zone 2: Narrative Metrics -->
      <div>
        <div style="font-size: 15.5pt; font-weight: 700; color: #0F2D4A; margin-bottom: 0.18in;">
          ตัวชี้วัดคุณภาพโครงเรื่อง 5 ด้าน (Narrative Metrics)
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.1in;">
          <div class="sub-card">
            <div style="font-size: 13.5pt; font-weight: 700; color: #1E3A8A;">1. Number of Paths (N<sub>paths</sub>)</div>
            <div style="font-size: 12pt; color: #334155; margin-top: 0.02in;">
              นับผลรวมของเส้นทางการเล่นที่เป็นไปได้ทั้งหมดตั้งแต่จุดเริ่มต้นจนถึงฉากจบ พร้อมบันทึก Passage ที่แวะผ่าน
            </div>
          </div>

          <div class="sub-card">
            <div style="font-size: 13.5pt; font-weight: 700; color: #1E3A8A;">2. Stroke Points (S<sub>points</sub>)</div>
            <div style="font-size: 12pt; color: #334155; margin-top: 0.02in;">
              ฉากสำคัญที่ทุกเส้นทางในกราฟต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญตามเจตจำนงของผู้แต่งครบถ้วน
            </div>
          </div>

          <div class="sub-card">
            <div style="font-size: 13.5pt; font-weight: 700; color: #1E3A8A;">3. Endings Hit Percentage (P<sub>endings</sub>)</div>
            <div style="font-size: 12pt; color: #334155; margin-top: 0.02in;">
              คำนวณสัดส่วนความน่าจะเป็นในการจบแต่ละแบบ และตรวจหาฉากจบที่ไม่สามารถเข้าถึงได้จริง
            </div>
          </div>

          <div class="sub-card">
            <div style="font-size: 13.5pt; font-weight: 700; color: #991B1B;">4. Dead-Ends (D<sub>ends</sub>) &amp; Lost Plot (L<sub>plot</sub>)</div>
            <div style="font-size: 12pt; color: #334155; margin-top: 0.02in;">
              • <strong>Dead-End:</strong> ฉากที่ดำเนินไปแล้วไม่มีทางเลือกให้ไปต่อจนจบเกม<br>
              • <strong>Lost Plot:</strong> ฉากที่ไม่สามารถเข้าถึงได้จริงเนื่องจากเงื่อนไขตัวแปรขัดแย้ง
            </div>
          </div>

          <div class="sub-card">
            <div style="font-size: 13.5pt; font-weight: 700; color: #1E3A8A;">5. Evolution of Variables (V<sub>evol</sub>)</div>
            <div style="font-size: 12pt; color: #334155; margin-top: 0.02in;">
              พล็อต Dotted Chart ติดตามการเปลี่ยนแปลงค่าตัวแปรตลอดเส้นเรื่อง เพื่อตรวจจับค่าหลุดกรอบ (Out-of-range)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>เอกสารอ้างอิง: Veloso &amp; Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)</div>
    <div class="footer-page">2</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 4: TMC & PERSONAS (Slide 3)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="top-banner">
    <div class="top-banner-title">กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น</div>
  </div>

  <div class="slide-content">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35in;">
      <!-- Left Column: TMC Scenario -->
      <div style="display: flex; flex-direction: column; gap: 0.18in;">
        <div class="card">
          <div class="card-title" style="font-size: 15pt; color: #0F2D4A;">ฉากทดสอบ The Murder Case (TMC)</div>
          <div class="card-body">
            บทสนทนาแนวสืบสวนสอบปากคำผู้ต้องสงสัยคดีฆาตกรรม กำกับด้วยตัวแปรอารมณ์ 3 ด้าน: โกรธ (Anger), สับสน (Confusion), และกลัว (Fear)<br><br>
            <strong>ขนาดบททดสอบ:</strong> 14 Passages · 20 Paths · 3 ฉากจบ
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="color: #991B1B;">บั๊กทดสอบ 5 จุดที่จงใจฝังไว้ (Injected Defects)</div>
          <div class="card-body" style="font-size: 12pt;">
            • <strong>บั๊ก 1 &amp; 3:</strong> เส้นทาง #7 และ #14 เกิด Dead-End ที่ Choice 5<br>
            • <strong>บั๊ก 2:</strong> เส้นทาง #8 เกิด Loop วนซ้ำไม่รู้จบ<br>
            • <strong>บั๊ก 4 &amp; 5:</strong> ฉาก Ending 1 และ Choice 6 เข้าไม่ถึง (Lost Plot)
          </div>
        </div>
      </div>

      <!-- Right Column: Player Personas -->
      <div style="display: flex; flex-direction: column; gap: 0.18in;">
        <div class="card">
          <div class="card-title" style="font-size: 15pt; color: #0F2D4A;">การจำลองพฤติกรรมผู้เล่น (Player Personas)</div>
          <div class="card-body">
            ใช้อัลกอริทึม Heuristic Greedy Search คำนวณค่าน้ำหนักอารมณ์เพื่อจำลองการตัดสินใจของผู้เล่นแต่ละสไตล์:<br>
            <div style="font-family: monospace; font-size: 11pt; background: #F1F5F9; padding: 0.08in; border-radius: 6px; margin: 0.08in 0; text-align: center;">
              Score(L) = &Sigma;<sub>i=1..n</sub> (w<sub>i</sub> &times; v<sub>i</sub>), &nbsp; L* = arg max<sub>L &isin; Links</sub> Score(L)
            </div>
            • <strong>Aggressive Persona:</strong> ให้น้ำหนัก Anger = 0.75, Confusion = 0.15, Fear = 0.10<br>
            • <strong>Paranoid Persona:</strong> ให้น้ำหนัก Fear = 0.70, Confusion = 0.20, Anger = 0.10
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 14pt;">ประโยชน์ในการทดสอบ</div>
          <div class="card-body" style="font-size: 12.5pt;">
            ช่วยให้นักเขียนพยากรณ์ได้ว่าผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กใดบ้างตามแนวโน้มการตัดสินใจจริง ก่อนเปิดทดสอบเล่นกับผู้ใช้
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>เอกสารอ้างอิง: Veloso &amp; Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)</div>
    <div class="footer-page">3</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 5: USER EVALUATION & RESULTS (Slide 4 - Clean Titles, No AI Slop)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="top-banner">
    <div class="top-banner-title">ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด</div>
  </div>

  <div class="slide-content">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35in;">
      <!-- Left Column: Tool Analysis -->
      <div style="display: flex; flex-direction: column; gap: 0.18in;">
        <div class="card" style="text-align: center; padding: 0.18in;">
          <img src="{FIG8_PATH}" style="width: 100%; max-height: 3.0in; object-fit: contain; border-radius: 6px;" alt="Problem Analysis UI">
          <div style="font-size: 11pt; color: #64748B; margin-top: 0.08in;">
            ภาพที่ 2: ระบบ Story Validator ชี้ตำแหน่ง Choice 5 ที่เกิดปัญหา Dead-End บนผังต้นไม้
          </div>
        </div>

        <div class="card" style="padding: 0.16in 0.22in;">
          <div class="card-title" style="font-size: 13.5pt; margin-bottom: 0.04in;">การตรวจจับบั๊กในกราฟ</div>
          <div class="card-body" style="font-size: 12pt;">
            บั๊กทดสอบที่ 1, 3, 4, 5 ถูกตรวจพบได้ 100% ผ่านตัวกรอง Lost Plot ในทันที โดยชี้ตำแหน่งโหนดที่มีปัญหาได้อย่างแม่นยำ
          </div>
        </div>
      </div>

      <!-- Right Column: User Study Stats & Findings -->
      <div style="display: flex; flex-direction: column; gap: 0.18in;">
        <div style="display: flex; gap: 0.15in;">
          <div class="metric-box">
            <div class="metric-val">52.3s</div>
            <div class="metric-lbl">เวลาตรวจพบบั๊ก (&sigma; = 22.7s)</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">146.2s</div>
            <div class="metric-lbl">เวลาแก้ปัญหา (&sigma; = 31.8s)</div>
          </div>
          <div class="metric-box">
            <div class="metric-val" style="color: #059669;">92.4</div>
            <div class="metric-lbl">คะแนน SUS (Truly Superior)</div>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 14.5pt; margin-bottom: 0.08in;">ข้อค้นพบจากการทดสอบกับผู้ใช้ 20 คน (Study 2)</div>
          <div class="card-body" style="font-size: 12.5pt;">
            • <strong>ความล้มเหลวของการตรวจด้วยตาเปล่า:</strong> ผู้ใช้ 3 คน (15%) ที่ไม่ยอมเปิดตัวกรองอัตโนมัติ หาบั๊กไม่พบเพราะพยายามกวาดสายตาไล่ดูบนแผนผังด้วยตนเอง<br><br>
            • <strong>ความยากในการแก้ไข:</strong> บั๊กที่ 5 แก้ยากที่สุด (ผู้ใช้ 25% ติดขัด) เนื่องจากเงื่อนไขตัวแปรมีความซับซ้อนซ้อนกันหลายชั้น<br><br>
            • <strong>การพัฒนาเครื่องมือ:</strong> การเพิ่มระบบ Tooltips และหน้าต่างสรุปรายงาน ช่วยดันคะแนน SUS จาก 83.5 ใน Study 1 ขึ้นเป็น 92.4 ใน Study 2
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>เอกสารอ้างอิง: Veloso &amp; Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)</div>
    <div class="footer-page">4</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 6: ACADEMIC CONTRIBUTIONS & APPLICATIONS (Slide 5 - Matching Work 1)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="top-banner">
    <div class="top-banner-title">การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน</div>
  </div>

  <div class="slide-content">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35in;">
      <!-- Left Column: Academic Contributions -->
      <div style="display: flex; flex-direction: column; gap: 0.16in;">
        <div style="font-size: 15.5pt; font-weight: 700; color: #0F2D4A; margin-bottom: 0.04in;">
          การมีส่วนร่วมทางวิชาการ (Academic Contributions)
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #1E3A8A;">1. การนิยามตัวชี้วัดโครงเรื่องด้วยทฤษฎีกราฟ</div>
          <div class="card-body" style="font-size: 12pt;">
            แปลงแนวคิดการแต่งเรื่องที่เป็นนามธรรม ให้กลายเป็นตัวชี้วัดเชิงคณิตศาสตร์ (เช่น Stroke Points, Lost Plot, Dead-Ends) ที่โปรแกรมคอมพิวเตอร์คำนวณซ้ำได้อัตโนมัติ
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #1E3A8A;">2. สถาปัตยกรรมการตรวจพิสูจน์แบบออฟไลน์</div>
          <div class="card-body" style="font-size: 12pt;">
            ออกแบบระบบตรวจพิสูจน์กราฟเนื้อเรื่องแบบอัตโนมัติ ช่วยลดภาระและต้นทุนก่อนเข้าสู่ขั้นตอน Human Playtesting
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #1E3A8A;">3. การจำลองพฤติกรรมผู้เล่นด้วย Persona</div>
          <div class="card-body" style="font-size: 12pt;">
            นำ Heuristic Search มาพยากรณ์แนวโน้มการตัดสินใจของผู้เล่นแต่ละกลุ่ม ช่วยค้นหาจุดบกพร่องที่ซ่อนอยู่ตามบุคลิกผู้เล่น
          </div>
        </div>
      </div>

      <!-- Right Column: Applications -->
      <div style="display: flex; flex-direction: column; gap: 0.16in;">
        <div style="font-size: 15.5pt; font-weight: 700; color: #0F2D4A; margin-bottom: 0.04in;">
          การประยุกต์ใช้งานกับเกมเล่าเรื่อง (Applications)
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #0F2D4A;">1. โครงสร้าง Node &amp; Edge ใน Game Engine</div>
          <div class="card-body" style="font-size: 12pt;">
            สามารถนำโมเดล Directed Graph ไปเชื่อมต่อกับเอนจินเกมเชิงโต้ตอบยุคใหม่ (เช่น Unity, Unreal Engine) ได้ทันที
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #0F2D4A;">2. การประเมินเงื่อนไขตัวแปรขณะเล่น</div>
          <div class="card-body" style="font-size: 12pt;">
            แนวคิด Guarded Edges สอดคล้องกับการตรวจประเมินค่าตัวแปรใน Game Runtime State ก่อนอนุญาตให้ผู้เล่นเลือกเส้นทาง
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #0F2D4A;">3. ระบบตรวจสอบคุณภาพอัตโนมัติใน CI/CD</div>
          <div class="card-body" style="font-size: 12pt;">
            ผสานอัลกอริทึม DFS Validation เข้ากับกระบวนการ Continuous Integration เพื่อสแกนหา Dead-Ends ก่อนส่งมอบเกม
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>เอกสารอ้างอิง: Veloso &amp; Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)</div>
    <div class="footer-page">5</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 7: LIMITATIONS & CONCLUSION (Slide 6 - Pure Work 1 Style, No Slop)
     ══════════════════════════════════════════════════════════════════════════ -->
<div class="slide">
  <div class="top-banner">
    <div class="top-banner-title">ข้อจำกัด และบทสรุป</div>
  </div>

  <div class="slide-content">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35in;">
      <!-- Left Column: Limitations -->
      <div style="display: flex; flex-direction: column; gap: 0.16in;">
        <div style="font-size: 15.5pt; font-weight: 700; color: #991B1B; margin-bottom: 0.04in;">
          ข้อจำกัดที่ระบุในบทความ (Limitations &amp; Risks)
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #991B1B;">1. ขาดกลุ่มควบคุมเปรียบเทียบ (No Control Baseline)</div>
          <div class="card-body" style="font-size: 12pt;">
            บทความวัดเวลาตรวจบั๊กได้ 52.3 วินาที แต่ไม่ได้วัดเทียบกับกลุ่มที่ตรวจด้วยสายตาเปล่าใน Twine จึงยังไม่เห็นความเร็วเปรียบเทียบเชิงสถิติ
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #991B1B;">2. ปัญหา State-Space Explosion ของ DFS</div>
          <div class="card-body" style="font-size: 12pt;">
            การท่องทุกเส้นทางด้วย DFS ทำงานได้ดีในเรื่องขนาดเล็ก แต่หากกราฟมีหลายร้อยฉากและมีวงวน (Loops) จำนวนเส้นทางจะพุ่งสูงแบบ Exponential
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #991B1B;">3. ขอบเขตชุดทดสอบมีขนาดเล็ก</div>
          <div class="card-body" style="font-size: 12pt;">
            บั๊กทั้ง 5 จุดใน TMC ถูกตรวจพบด้วย Lost Plot เพียงอย่างเดียว ยังไม่ได้พิสูจน์คุณค่าของ Stroke Points หรือตัวแปรที่ซับซ้อนสูงในเกมระดับอุตสาหกรรม
          </div>
        </div>
      </div>

      <!-- Right Column: Conclusion & Future Work -->
      <div style="display: flex; flex-direction: column; gap: 0.16in;">
        <div style="font-size: 15.5pt; font-weight: 700; color: #0F2D4A; margin-bottom: 0.04in;">
          บทสรุปและการประยุกต์ใช้งาน (Conclusion &amp; Applications)
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #1E3A8A;">1. การยกระดับสู่ Automated QA</div>
          <div class="card-body" style="font-size: 12pt;">
            Story Validator วางรากฐานสำคัญของการนำทฤษฎีกราฟและการจำลอง Persona มาตรวจพิสูจน์เกมเล่าเรื่องแบบอัตโนมัติ ช่วยลดต้นทุน Playtesting และรักษาคุณภาพเนื้อเรื่อง
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #1E3A8A;">2. การเชื่อมต่อ Game Engine เชิงพาณิชย์</div>
          <div class="card-body" style="font-size: 12pt;">
            พัฒนาปลั๊กอินเชื่อมต่อไปยัง Unity, Unreal Engine หรือ Visual Novel Engines ยอดนิยม เพื่อให้นักพัฒนาเข้าถึงได้สะดวก
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="font-size: 13.5pt; color: #1E3A8A;">3. การใช้ AI/LLM ช่วยซ่อมแซมเนื้อเรื่อง</div>
          <div class="card-body" style="font-size: 12pt;">
            ประยุกต์ใช้ Large Language Models ร่วมกับกราฟ เพื่อช่วยเสนอแนวทางแก้ไขเงื่อนไขตัวแปรหรือเส้นทางที่ตันโดยอัตโนมัติ
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>เอกสารอ้างอิง: Veloso &amp; Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)</div>
    <div class="footer-page">6</div>
  </div>
</div>

</body>
</html>
"""

with open(HTML_OUT, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"Generated clean Work-1 style HTML: {HTML_OUT}")

# Render HTML to PDF via Headless Chrome
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={PDF_OUT}",
    HTML_OUT
]
subprocess.run(chrome_cmd, check=True)
print(f"Generated clean Work-1 style PDF: {PDF_OUT}")


# ==============================================================================
# 2. GENERATE CLEAN PPTX SLIDES (Matching Work 1 Style)
# ==============================================================================
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

def set_shape_flat(shape, fill_color, border_color=None, border_width=1):
    if fill_color:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
    else:
        shape.fill.background()
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()

def add_work1_header(slide, title_text):
    # Top banner navy bar
    header_box = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.85))
    set_shape_flat(header_box, C_NAVY_RGB, None)
    tf = header_box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.8)
    tf.margin_top = Inches(0.18)
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.name = FONT_TH
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)

def add_work1_footer(slide, page_num_str):
    # Divider rule
    rule = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.92), Inches(11.733), Pt(1))
    set_shape_flat(rule, C_BORDER_RGB, None)
    
    # Footer text left
    tb_l = slide.shapes.add_textbox(Inches(0.8), Inches(6.96), Inches(8.0), Inches(0.4))
    p_l = tb_l.text_frame.paragraphs[0]
    p_l.text = "เอกสารอ้างอิง: Veloso & Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)"
    p_l.font.name = FONT_TH
    p_l.font.size = Pt(11)
    p_l.font.color.rgb = C_MUTED_RGB
    
    # Page number right
    tb_r = slide.shapes.add_textbox(Inches(10.533), Inches(6.96), Inches(2.0), Inches(0.4))
    p_r = tb_r.text_frame.paragraphs[0]
    p_r.alignment = PP_ALIGN.RIGHT
    p_r.text = page_num_str
    p_r.font.name = FONT_TH
    p_r.font.size = Pt(13)
    p_r.font.bold = True
    p_r.font.color.rgb = C_NAVY_RGB


# ------------------------------------------------------------------------------
# PPTX SLIDE 1: COVER (Centered, No Quote, No Assignment Paper 2 tag)
# ------------------------------------------------------------------------------
s1 = prs.slides.add_slide(blank_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_shape_flat(bg1, RGBColor(255, 255, 255), None)

tb_c = s1.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(5.3))
tf_c = tb_c.text_frame
tf_c.word_wrap = True

p_course = tf_c.paragraphs[0]
p_course.alignment = PP_ALIGN.CENTER
p_course.text = "วิชา 305432 เครือข่ายเซนเซอร์ (Sensor Networks)"
p_course.font.name = FONT_TH
p_course.font.size = Pt(18)
p_course.font.bold = True
p_course.font.color.rgb = C_MUTED_RGB

p_title = tf_c.add_paragraph()
p_title.alignment = PP_ALIGN.CENTER
p_title.text = "Story Validator: Validating the Plot of Interactive Narrative Games"
p_title.font.name = FONT_TH
p_title.font.size = Pt(32)
p_title.font.bold = True
p_title.font.color.rgb = C_NAVY_RGB
p_title.space_before = Pt(16)

p_sub = tf_c.add_paragraph()
p_sub.alignment = PP_ALIGN.CENTER
p_sub.text = "การตรวจสอบโครงเรื่องของเกมแบบโต้ตอบด้วยแบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น"
p_sub.font.name = FONT_TH
p_sub.font.size = Pt(20)
p_sub.font.bold = True
p_sub.font.color.rgb = C_BLUE_RGB
p_sub.space_before = Pt(8)

# Center divider line
div_line = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(5.866), Inches(3.6), Inches(1.6), Pt(3))
set_shape_flat(div_line, C_ACCENT_BLUE_RGB, None)

tb_meta = s1.shapes.add_textbox(Inches(1.0), Inches(3.85), Inches(11.333), Inches(2.8))
tf_meta = tb_meta.text_frame
tf_meta.word_wrap = True

p_conf = tf_meta.paragraphs[0]
p_conf.alignment = PP_ALIGN.CENTER
p_conf.text = "2021 IEEE Conference on Games (CoG)"
p_conf.font.name = FONT_TH
p_conf.font.size = Pt(15.5)
p_conf.font.bold = True
p_conf.font.color.rgb = C_INK_RGB

p_auth = tf_meta.add_paragraph()
p_auth.alignment = PP_ALIGN.CENTER
p_auth.text = "คณะผู้วิจัย: Carolina Veloso, Rui Prada (INESC-ID & Instituto Superior Técnico, Universidade de Lisboa)"
p_auth.font.name = FONT_TH
p_auth.font.size = Pt(14)
p_auth.font.color.rgb = C_MUTED_RGB
p_auth.space_before = Pt(4)

p_pres = tf_meta.add_paragraph()
p_pres.alignment = PP_ALIGN.CENTER
p_pres.text = "นายธีรภัทร ภู่ระย้า ลำดับที่ 10"
p_pres.font.name = FONT_TH
p_pres.font.size = Pt(17.5)
p_pres.font.bold = True
p_pres.font.color.rgb = C_NAVY_RGB
p_pres.space_before = Pt(28)

p_id = tf_meta.add_paragraph()
p_id.alignment = PP_ALIGN.CENTER
p_id.text = "รหัสนิสิต 66362416"
p_id.font.name = FONT_TH
p_id.font.size = Pt(16)
p_id.font.color.rgb = C_MUTED_RGB
p_id.space_before = Pt(3)

s1.notes_slide.notes_text_frame.text = (
    "เวลา 0:00–0:40\n"
    "สวัสดีครับอาจารย์และเพื่อนนิสิตทุกคน วันนี้ผม ธีรภัทร ภู่ระย้า ขอเสนอสรุปบทความวิจัยเรื่อง "
    "'Story Validator: Validating the Plot of Interactive Narrative Games' "
    "จากที่ประชุมวิชาการ IEEE Conference on Games (CoG) ปี 2021 ครับ\n\n"
    "งานวิจัยนี้นำเสนอเครื่องมือเชิงวิศวกรรมสำหรับตรวจสอบและทดสอบความถูกต้องของโครงเรื่องเกมแบบแตกกิ่งก้าน "
    "โดยแปลงบทสนทนาเป็นกราฟและจำลองพฤติกรรมผู้เล่นด้วย Persona ครับ"
)


# ------------------------------------------------------------------------------
# PPTX SLIDE 2: THE CHALLENGES (Slide 1)
# ------------------------------------------------------------------------------
s2 = prs.slides.add_slide(blank_layout)
bg2 = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_shape_flat(bg2, C_LIGHT_BG_RGB, None)
add_work1_header(s2, "ปัญหาและความท้าทายในการตรวจสอบ Interactive Story")
add_work1_footer(s2, "1")

# Left Column Card
c_l2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.15), Inches(5.65), Inches(5.5))
set_shape_flat(c_l2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_l2 = c_l2.text_frame
tf_l2.word_wrap = True
tf_l2.margin_left = tf_l2.margin_right = Inches(0.25)
tf_l2.margin_top = Inches(0.2)

p = tf_l2.paragraphs[0]
p.text = "ความท้าทายหลักของโครงเรื่องแบบแตกแขนง"
p.font.name = FONT_TH
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB

challenges = [
    ("Authorial Intent vs Player Agency:", "การรักษาสมดุลระหว่างสิ่งที่คนแต่งต้องการเล่า กับอิสระในการตัดสินใจของผู้เล่น"),
    ("State-Space Explosion:", "โครงเรื่องแตกกิ่งก้านสาขาทวีคูณตามทางเลือก จนเกินขีดความสามารถที่จะตรวจสอบด้วยสายตามนุษย์"),
    ("Guarded Variables & Logic:", "การผูกเงื่อนไขกับตัวแปรสะสม (เช่น ค่าอารมณ์, สกิล) เสี่ยงต่อการเกิดข้อผิดพลาดเชิงตรรกะในเส้นทางที่คาดไม่ถึง"),
    ("High Playtesting Cost:", "การทดสอบเล่นด้วยคนจริงมีต้นทุนสูง ช้า และไม่ครอบคลุมทุกเส้นทางของเรื่องราว")
]
for head, desc in challenges:
    p_item = tf_l2.add_paragraph()
    p_item.text = f"• {head} {desc}"
    p_item.font.name = FONT_TH
    p_item.font.size = Pt(12.5)
    p_item.font.color.rgb = C_INK_RGB
    p_item.space_before = Pt(8)

# Right Column: Fig 1 Card + Survey Card
c_r2_img = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.15), Inches(5.733), Inches(3.5))
set_shape_flat(c_r2_img, C_CARD_BG_RGB, C_BORDER_RGB, 1)
if os.path.exists(FIG1_PATH):
    s2.shapes.add_picture(FIG1_PATH, Inches(7.0), Inches(1.25), width=Inches(5.333))

p_cap = s2.shapes.add_textbox(Inches(6.8), Inches(4.2), Inches(5.733), Inches(0.4)).text_frame.paragraphs[0]
p_cap.alignment = PP_ALIGN.CENTER
p_cap.text = "ภาพที่ 1: ผังโครงเรื่องแบบ Node & Link ใน Twine ซึ่งซับซ้อนเกินกว่าจะตรวจทานด้วยสายตามนุษย์"
p_cap.font.name = FONT_TH
p_cap.font.size = Pt(11)
p_cap.font.color.rgb = C_MUTED_RGB

c_r2_text = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.8), Inches(5.733), Inches(1.85))
set_shape_flat(c_r2_text, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_r2 = c_r2_text.text_frame
tf_r2.word_wrap = True
tf_r2.margin_left = tf_r2.margin_right = Inches(0.25)
tf_r2.margin_top = Inches(0.15)
p_t2 = tf_r2.paragraphs[0]
p_t2.text = "ปัญหาการตรวจสอบในทางปฏิบัติ"
p_t2.font.name = FONT_TH
p_t2.font.size = Pt(14)
p_t2.font.bold = True
p_t2.font.color.rgb = C_NAVY_RGB

p_d2 = tf_r2.add_paragraph()
p_d2.text = "ผลสำรวจในบทความพบว่า 76% ของนักเขียนบทเกมยังคงใช้ MS Word หรือ Google Docs ในการร่างบท โดยเครื่องมืออย่าง Twine หรือ Ren'Py ช่วยเพียงการเรียบเรียง แต่ขาดระบบตรวจสอบความถูกต้องเชิงตรรกะแบบอัตโนมัติ ทำให้มักพบ Dead-Ends และ Lost Plot"
p_d2.font.name = FONT_TH
p_d2.font.size = Pt(12)
p_d2.font.color.rgb = C_INK_RGB
p_d2.space_before = Pt(4)

s2.notes_slide.notes_text_frame.text = (
    "เวลา 0:40–1:40\n"
    "สไลด์แรกกล่าวถึงปัญหาสำคัญ 4 ด้านของการสร้างเกมเล่าเรื่องเชิงโต้ตอบครับ "
    "ข้อแรกคือการรักษาสมดุลระหว่างเจตจำนงของคนแต่งกับอิสระของผู้เล่น "
    "ข้อสองคือปัญหา State-Space Explosion เมื่อมีทางเลือกแตกกิ่งก้านมากเกินไป "
    "ข้อสามคือการผูกเงื่อนไขกับตัวแปรที่ซับซ้อน และข้อสี่คือการ Playtesting ด้วยคนจริงมีราคาสูงมากครับ\n\n"
    "นอกจากนี้ ผลสำรวจพบว่า 76% ยังคงเขียนบน Word หรือ Docs ทำให้ไม่มีเครื่องมือตรวจจับข้อผิดพลาดเชิงตรรกะโดยอัตโนมัติครับ"
)


# ------------------------------------------------------------------------------
# PPTX SLIDE 3: GRAPH MODEL & METRICS (Slide 2 - 2 Distinct Zones)
# ------------------------------------------------------------------------------
s3 = prs.slides.add_slide(blank_layout)
bg3 = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_shape_flat(bg3, C_LIGHT_BG_RGB, None)
add_work1_header(s3, "แบบจำลองกราฟและตัวชี้วัดโครงเรื่อง (The Proposed Model & Metrics)")
add_work1_footer(s3, "2")

# Zone 1 (Left 42%): Graph Model
tb_z1 = s3.shapes.add_textbox(Inches(0.8), Inches(1.05), Inches(5.0), Inches(0.4))
p_z1 = tb_z1.text_frame.paragraphs[0]
p_z1.text = "แบบจำลองโครงเรื่องด้วยกราฟ (Graph Representation)"
p_z1.font.name = FONT_TH
p_z1.font.size = Pt(15.5)
p_z1.font.bold = True
p_z1.font.color.rgb = C_NAVY_RGB

# Card 1.1: Directed Graph G = (V, E)
c_m1 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.0), Inches(2.45))
set_shape_flat(c_m1, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_m1 = c_m1.text_frame
tf_m1.word_wrap = True
tf_m1.margin_left = tf_m1.margin_right = Inches(0.22)
tf_m1.margin_top = Inches(0.18)

p = tf_m1.paragraphs[0]
p.text = "1. นิยามกราฟระบุทิศทาง G = (V, E)"
p.font.name = FONT_TH
p.font.size = Pt(14)
p.font.bold = True
p.font.color.rgb = C_BLUE_RGB

p_body = tf_m1.add_paragraph()
p_body.text = "• Passage (โหนด V): แต่ละฉากของเนื้อเรื่อง บรรจุเนื้อหาบทสนทนาและคำสั่งตัวแปร\n• Link (เส้นเชื่อม E): ทางเลือกของผู้เล่น พร้อมเงื่อนไขตัวแปรกำกับ (Guarded Edges)"
p_body.font.name = FONT_TH
p_body.font.size = Pt(12)
p_body.font.color.rgb = C_INK_RGB
p_body.space_before = Pt(6)

# Card 1.2: DFS Traversal
c_m2 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.1), Inches(5.0), Inches(2.55))
set_shape_flat(c_m2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_m2 = c_m2.text_frame
tf_m2.word_wrap = True
tf_m2.margin_left = tf_m2.margin_right = Inches(0.22)
tf_m2.margin_top = Inches(0.18)

p = tf_m2.paragraphs[0]
p.text = "2. การท่องกราฟด้วย DFS"
p.font.name = FONT_TH
p.font.size = Pt(14)
p.font.bold = True
p.font.color.rgb = C_BLUE_RGB

p_body = tf_m2.add_paragraph()
p_body.text = "• ใช้อัลกอริทึม Depth-First Search (DFS) เริ่มจากจุดเริ่มต้นและท่องไปจนสุดฉากจบทีละเส้นทาง\n• รวบรวมร่องรอยการเล่น (Playthrough Traces) ทุกเส้นทางที่เป็นไปได้แบบอัตโนมัติ เพื่อนำไปคำนวณตัวชี้วัด"
p_body.font.name = FONT_TH
p_body.font.size = Pt(12)
p_body.font.color.rgb = C_INK_RGB
p_body.space_before = Pt(6)

# Zone 2 (Right 58%): 5 Narrative Metrics
tb_z2 = s3.shapes.add_textbox(Inches(6.2), Inches(1.05), Inches(6.333), Inches(0.4))
p_z2 = tb_z2.text_frame.paragraphs[0]
p_z2.text = "ตัวชี้วัดคุณภาพโครงเรื่อง 5 ด้าน (Narrative Metrics)"
p_z2.font.name = FONT_TH
p_z2.font.size = Pt(15.5)
p_z2.font.bold = True
p_z2.font.color.rgb = C_NAVY_RGB

metrics_data = [
    ("1. Number of Paths (Npaths)", C_BLUE_RGB, "นับผลรวมของเส้นทางการเล่นที่เป็นไปได้ทั้งหมดตั้งแต่จุดเริ่มต้นจนถึงฉากจบ พร้อมบันทึก Passage ที่แวะผ่าน"),
    ("2. Stroke Points (Spoints)", C_BLUE_RGB, "ฉากสำคัญที่ทุกเส้นทางในกราฟต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญตามเจตจำนงของผู้แต่งครบถ้วน"),
    ("3. Endings Hit Percentage (Pendings)", C_BLUE_RGB, "คำนวณสัดส่วนความน่าจะเป็นในการจบแต่ละแบบ และตรวจหาฉากจบที่ไม่สามารถเข้าถึงได้จริง"),
    ("4. Dead-Ends (Dends) & Lost Plot (Lplot)", C_RED_RGB, "• Dead-End: ฉากที่ดำเนินไปแล้วไม่มีทางเลือกให้ไปต่อจนจบเกม\n• Lost Plot: ฉากที่ไม่สามารถเข้าถึงได้จริงเนื่องจากเงื่อนไขตัวแปรขัดแย้ง"),
    ("5. Evolution of Variables (Vevol)", C_BLUE_RGB, "พล็อต Dotted Chart ติดตามการเปลี่ยนแปลงค่าตัวแปรตลอดเส้นเรื่อง เพื่อตรวจจับค่าหลุดกรอบ (Out-of-range)")
]

for idx, (m_title, m_color, m_desc) in enumerate(metrics_data):
    y_pos = Inches(1.5 + idx * 1.03)
    card_h = Inches(0.95) if idx != 3 else Inches(1.05)
    c_sub = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.2), y_pos, Inches(6.333), card_h)
    set_shape_flat(c_sub, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_s = c_sub.text_frame
    tf_s.word_wrap = True
    tf_s.margin_left = tf_s.margin_right = Inches(0.18)
    tf_s.margin_top = Inches(0.1)
    
    p = tf_s.paragraphs[0]
    p.text = m_title
    p.font.name = FONT_TH
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = m_color
    
    p_d = tf_s.add_paragraph()
    p_d.text = m_desc
    p_d.font.name = FONT_TH
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = C_INK_RGB
    p_d.space_before = Pt(2)

s3.notes_slide.notes_text_frame.text = (
    "เวลา 1:40–2:50\n"
    "หน้าที่ 2 อธิบายแบบจำลองทางคณิตศาสตร์และตัวชี้วัด 5 มิติครับ\n\n"
    "ฝั่งซ้ายคือการแปลงโครงเรื่องเป็น Directed Graph G = (V, E) โดย Passage คือโหนด และ Link คือเส้นเชื่อมที่มีเงื่อนไขตัวแปรกำกับ "
    "จากนั้นใช้อัลกอริทึม DFS ท่องไปในทุกกิ่งก้านเพื่อสร้างร่องรอยการเล่นครับ\n\n"
    "ฝั่งขวาคือตัวชี้วัด 5 ด้าน ได้แก่ Total Paths, Stroke Points หรือฉากบังคับผ่าน, สัดส่วนฉากจบ, "
    "การตรวจจับ Dead-Ends และ Lost Plot และการติดตามค่าตัวแปรด้วย Dotted Chart เพื่อตรวจจับค่าหลุดกรอบครับ"
)


# ------------------------------------------------------------------------------
# PPTX SLIDE 4: TMC & PERSONAS (Slide 3)
# ------------------------------------------------------------------------------
s4 = prs.slides.add_slide(blank_layout)
bg4 = s4.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_shape_flat(bg4, C_LIGHT_BG_RGB, None)
add_work1_header(s4, "กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น")
add_work1_footer(s4, "3")

# Left Column: TMC Scenario & Bugs
c_tmc1 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.15), Inches(5.65), Inches(2.6))
set_shape_flat(c_tmc1, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_t1 = c_tmc1.text_frame
tf_t1.word_wrap = True
tf_t1.margin_left = tf_t1.margin_right = Inches(0.22)
tf_t1.margin_top = Inches(0.18)

p = tf_t1.paragraphs[0]
p.text = "ฉากทดสอบ The Murder Case (TMC)"
p.font.name = FONT_TH
p.font.size = Pt(15)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB

p_desc = tf_t1.add_paragraph()
p_desc.text = "บทสนทนาแนวสืบสวนสอบปากคำผู้ต้องสงสัยคดีฆาตกรรม กำกับด้วยตัวแปรอารมณ์ 3 ด้าน: โกรธ (Anger), สับสน (Confusion), และกลัว (Fear)\n\nขนาดบททดสอบ: 14 Passages · 20 Paths · 3 ฉากจบ"
p_desc.font.name = FONT_TH
p_desc.font.size = Pt(12.5)
p_desc.font.color.rgb = C_INK_RGB
p_desc.space_before = Pt(6)

c_tmc2 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.95), Inches(5.65), Inches(2.7))
set_shape_flat(c_tmc2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_t2 = c_tmc2.text_frame
tf_t2.word_wrap = True
tf_t2.margin_left = tf_t2.margin_right = Inches(0.22)
tf_t2.margin_top = Inches(0.18)

p = tf_t2.paragraphs[0]
p.text = "บั๊กทดสอบ 5 จุดที่จงใจฝังไว้ (Injected Defects)"
p.font.name = FONT_TH
p.font.size = Pt(14)
p.font.bold = True
p.font.color.rgb = C_RED_RGB

p_bugs = tf_t2.add_paragraph()
p_bugs.text = "• บั๊ก 1 & 3: เส้นทาง #7 และ #14 เกิด Dead-End ที่ Choice 5\n• บั๊ก 2: เส้นทาง #8 เกิด Loop วนซ้ำไม่รู้จบ\n• บั๊ก 4 & 5: ฉาก Ending 1 และ Choice 6 เข้าไม่ถึง (Unreachable / Lost Plot)"
p_bugs.font.name = FONT_TH
p_bugs.font.size = Pt(12)
p_bugs.font.color.rgb = C_INK_RGB
p_bugs.space_before = Pt(6)

# Right Column: Personas & Benefits
c_per1 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.15), Inches(5.733), Inches(3.5))
set_shape_flat(c_per1, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_p1 = c_per1.text_frame
tf_p1.word_wrap = True
tf_p1.margin_left = tf_p1.margin_right = Inches(0.22)
tf_p1.margin_top = Inches(0.18)

p = tf_p1.paragraphs[0]
p.text = "การจำลองพฤติกรรมผู้เล่น (Player Personas)"
p.font.name = FONT_TH
p.font.size = Pt(15)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB

p_form = tf_p1.add_paragraph()
p_form.text = "ใช้อัลกอริทึม Heuristic Greedy Search คำนวณค่าน้ำหนักอารมณ์เพื่อจำลองการตัดสินใจของผู้เล่นแต่ละสไตล์:\nScore(L) = Σ (wi × vi),  L* = arg max Score(L)\n\n• Aggressive Persona: ให้น้ำหนัก Anger = 0.75, Confusion = 0.15, Fear = 0.10\n• Paranoid Persona: ให้น้ำหนัก Fear = 0.70, Confusion = 0.20, Anger = 0.10"
p_form.font.name = FONT_TH
p_form.font.size = Pt(12)
p_form.font.color.rgb = C_INK_RGB
p_form.space_before = Pt(4)

c_per2 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.85), Inches(5.733), Inches(1.8))
set_shape_flat(c_per2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_p2 = c_per2.text_frame
tf_p2.word_wrap = True
tf_p2.margin_left = tf_p2.margin_right = Inches(0.22)
tf_p2.margin_top = Inches(0.15)

p = tf_p2.paragraphs[0]
p.text = "ประโยชน์ในการทดสอบ"
p.font.name = FONT_TH
p.font.size = Pt(14)
p.font.bold = True
p.font.color.rgb = C_BLUE_RGB

p_d = tf_p2.add_paragraph()
p_d.text = "ช่วยให้นักเขียนพยากรณ์ได้ว่าผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กใดบ้างตามแนวโน้มการตัดสินใจจริง ก่อนเปิดทดสอบเล่นกับผู้ใช้"
p_d.font.name = FONT_TH
p_d.font.size = Pt(12)
p_d.font.color.rgb = C_INK_RGB
p_d.space_before = Pt(4)

s4.notes_slide.notes_text_frame.text = (
    "เวลา 2:50–4:00\n"
    "สไลด์ที่ 3 คือกรณีศึกษา The Murder Case บทสนทนาสืบสวนสอบสวนที่ฝังบั๊กไว้ 5 จุดครับ\n\n"
    "เพื่อทดสอบว่าผู้เล่นจะเจอบั๊กหรือไม่ ผู้แต่งสร้าง Persona ขึ้นมา 2 กลุ่ม ได้แก่ สายก้าวร้าว ที่เน้นเลือกช้อยส์อารมณ์โกรธ "
    "และสายหวาดระแวง ที่เน้นเลือกช้อยส์อารมณ์กลัว โดยใช้อัลกอริทึม Heuristic Greedy Search คำนวณค่าน้ำหนักเพื่อจำลองการตัดสินใจ "
    "ทำให้นักเขียนเห็นภาพล่วงหน้าว่าผู้เล่นกลุ่มไหนมีโอกาสหลุดไปติด Dead-Ends ครับ"
)


# ------------------------------------------------------------------------------
# PPTX SLIDE 5: USER EVALUATION & RESULTS (Slide 4)
# ------------------------------------------------------------------------------
s5 = prs.slides.add_slide(blank_layout)
bg5 = s5.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_shape_flat(bg5, C_LIGHT_BG_RGB, None)
add_work1_header(s5, "ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด")
add_work1_footer(s5, "4")

# Left Column: Fig 8 Image & Finding
c_r5_img = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.15), Inches(5.65), Inches(3.8))
set_shape_flat(c_r5_img, C_CARD_BG_RGB, C_BORDER_RGB, 1)
if os.path.exists(FIG8_PATH):
    s5.shapes.add_picture(FIG8_PATH, Inches(1.0), Inches(1.25), width=Inches(5.25))

p_cap5 = s5.shapes.add_textbox(Inches(0.8), Inches(4.55), Inches(5.65), Inches(0.4)).text_frame.paragraphs[0]
p_cap5.alignment = PP_ALIGN.CENTER
p_cap5.text = "ภาพที่ 2: ระบบ Story Validator ชี้ตำแหน่ง Choice 5 ที่เกิดปัญหา Dead-End บนผังต้นไม้"
p_cap5.font.name = FONT_TH
p_cap5.font.size = Pt(11)
p_cap5.font.color.rgb = C_MUTED_RGB

c_r5_text = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.1), Inches(5.65), Inches(1.55))
set_shape_flat(c_r5_text, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_r5 = c_r5_text.text_frame
tf_r5.word_wrap = True
tf_r5.margin_left = tf_r5.margin_right = Inches(0.22)
tf_r5.margin_top = Inches(0.12)
p = tf_r5.paragraphs[0]
p.text = "การตรวจจับบั๊กในกราฟ"
p.font.name = FONT_TH
p.font.size = Pt(13.5)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB
p_d = tf_r5.add_paragraph()
p_d.text = "บั๊กทดสอบที่ 1, 3, 4, 5 ถูกตรวจพบได้ 100% ผ่านตัวกรอง Lost Plot ในทันที โดยชี้ตำแหน่งโหนดที่มีปัญหาได้อย่างแม่นยำ"
p_d.font.name = FONT_TH
p_d.font.size = Pt(12)
p_d.font.color.rgb = C_INK_RGB
p_d.space_before = Pt(3)

# Right Column: 3 Metric Stats + Findings Card
stats = [
    ("52.3s", "เวลาตรวจพบบั๊ก (σ = 22.7s)", C_NAVY_RGB),
    ("146.2s", "เวลาแก้ปัญหา (σ = 31.8s)", C_NAVY_RGB),
    ("92.4", "คะแนน SUS (Truly Superior)", RGBColor(5, 150, 105))
]
for idx, (val, lbl, col) in enumerate(stats):
    x_pos = Inches(6.8 + idx * 1.95)
    c_st = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, Inches(1.15), Inches(1.85), Inches(1.3))
    set_shape_flat(c_st, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_st = c_st.text_frame
    tf_st.word_wrap = True
    p_v = tf_st.paragraphs[0]
    p_v.alignment = PP_ALIGN.CENTER
    p_v.text = val
    p_v.font.name = FONT_TH
    p_v.font.size = Pt(28)
    p_v.font.bold = True
    p_v.font.color.rgb = col
    
    p_l = tf_st.add_paragraph()
    p_l.alignment = PP_ALIGN.CENTER
    p_l.text = lbl
    p_l.font.name = FONT_TH
    p_l.font.size = Pt(10)
    p_l.font.color.rgb = C_MUTED_RGB
    p_l.space_before = Pt(2)

c_find = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.65), Inches(5.733), Inches(4.0))
set_shape_flat(c_find, C_CARD_BG_RGB, C_BORDER_RGB, 1)
tf_f = c_find.text_frame
tf_f.word_wrap = True
tf_f.margin_left = tf_f.margin_right = Inches(0.22)
tf_f.margin_top = Inches(0.18)

p = tf_f.paragraphs[0]
p.text = "ข้อค้นพบจากการทดสอบกับผู้ใช้ 20 คน (Study 2)"
p.font.name = FONT_TH
p.font.size = Pt(14.5)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB

findings = [
    ("ความล้มเหลวของการตรวจด้วยตาเปล่า:", "ผู้ใช้ 3 คน (15%) ที่ไม่ยอมเปิดตัวกรองอัตโนมัติ หาบั๊กไม่พบเพราะพยายามกวาดสายตาไล่ดูบนแผนผังด้วยตนเอง"),
    ("ความยากในการแก้ไข:", "บั๊กที่ 5 แก้ยากที่สุด (ผู้ใช้ 25% ติดขัด) เนื่องจากเงื่อนไขตัวแปรมีความซับซ้อนซ้อนกันหลายชั้น"),
    ("การพัฒนาเครื่องมือ:", "การเพิ่มระบบ Tooltips และหน้าต่างสรุปรายงาน ช่วยดันคะแนน SUS จาก 83.5 ใน Study 1 ขึ้นเป็น 92.4 ใน Study 2")
]
for h, b in findings:
    p_item = tf_f.add_paragraph()
    p_item.text = f"• {h} {b}"
    p_item.font.name = FONT_TH
    p_item.font.size = Pt(12)
    p_item.font.color.rgb = C_INK_RGB
    p_item.space_before = Pt(6)

s5.notes_slide.notes_text_frame.text = (
    "เวลา 4:00–5:10\n"
    "ผลการประเมินจากผู้ใช้ 20 คนยืนยันว่า Story Validator ช่วยลดเวลาตรวจจับบั๊กเหลือเฉลี่ย 52.3 วินาที "
    "และใช้เวลาแก้ปัญหาเฉลี่ยเพียง 146.2 วินาที พร้อมได้คะแนนความพึงพอใจการใช้งาน หรือ SUS สูงถึง 92.4 เต็ม 100 ครับ\n\n"
    "ข้อสังเกตที่น่าสนใจคือ ผู้ใช้ที่ไม่ใช้ตัวกรองอัตโนมัติ 3 คนหาบั๊กไม่พบเลย ซึ่งพิสูจน์ว่าสายตามนุษย์ไม่เพียงพอสำหรับการตรวจผังเรื่องที่ซับซ้อนครับ"
)


# ------------------------------------------------------------------------------
# PPTX SLIDE 6: ACADEMIC CONTRIBUTIONS & APPLICATIONS (Slide 5)
# ------------------------------------------------------------------------------
s6 = prs.slides.add_slide(blank_layout)
bg6 = s6.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_shape_flat(bg6, C_LIGHT_BG_RGB, None)
add_work1_header(s6, "การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน")
add_work1_footer(s6, "5")

# Left Column: Academic Contributions
tb_c_title = s6.shapes.add_textbox(Inches(0.8), Inches(1.05), Inches(5.65), Inches(0.4))
p = tb_c_title.text_frame.paragraphs[0]
p.text = "การมีส่วนร่วมทางวิชาการ (Academic Contributions)"
p.font.name = FONT_TH
p.font.size = Pt(15.5)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB

contribs = [
    ("1. การนิยามตัวชี้วัดโครงเรื่องด้วยทฤษฎีกราฟ", C_BLUE_RGB, "แปลงแนวคิดการแต่งเรื่องที่เป็นนามธรรม ให้กลายเป็นตัวชี้วัดเชิงคณิตศาสตร์ (เช่น Stroke Points, Lost Plot, Dead-Ends) ที่โปรแกรมคอมพิวเตอร์คำนวณซ้ำได้อัตโนมัติ"),
    ("2. สถาปัตยกรรมการตรวจพิสูจน์แบบออฟไลน์", C_BLUE_RGB, "ออกแบบระบบตรวจพิสูจน์กราฟเนื้อเรื่องแบบอัตโนมัติ ช่วยลดภาระและต้นทุนก่อนเข้าสู่ขั้นตอน Human Playtesting"),
    ("3. การจำลองพฤติกรรมผู้เล่นด้วย Persona", C_BLUE_RGB, "นำ Heuristic Search มาพยากรณ์แนวโน้มการตัดสินใจของผู้เล่นแต่ละกลุ่ม ช่วยค้นหาจุดบกพร่องที่ซ่อนอยู่ตามบุคลิกผู้เล่น")
]
for idx, (title, col, desc) in enumerate(contribs):
    c = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5 + idx * 1.75), Inches(5.65), Inches(1.6))
    set_shape_flat(c, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf = c.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.2)
    tf.margin_top = Inches(0.12)
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_TH
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = col
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_TH
    p_d.font.size = Pt(11.5)
    p_d.font.color.rgb = C_INK_RGB
    p_d.space_before = Pt(3)

# Right Column: Applications
tb_a_title = s6.shapes.add_textbox(Inches(6.8), Inches(1.05), Inches(5.733), Inches(0.4))
p = tb_a_title.text_frame.paragraphs[0]
p.text = "การประยุกต์ใช้งานกับเกมเล่าเรื่อง (Applications)"
p.font.name = FONT_TH
p.font.size = Pt(15.5)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB

apps = [
    ("1. โครงสร้าง Node & Edge ใน Game Engine", C_NAVY_RGB, "สามารถนำโมเดล Directed Graph ไปเชื่อมต่อกับเอนจินเกมเชิงโต้ตอบยุคใหม่ (เช่น Unity, Unreal Engine) ได้ทันที"),
    ("2. การประเมินเงื่อนไขตัวแปรขณะเล่น", C_NAVY_RGB, "แนวคิด Guarded Edges สอดคล้องกับการตรวจประเมินค่าตัวแปรใน Game Runtime State ก่อนอนุญาตให้ผู้เล่นเลือกเส้นทาง"),
    ("3. ระบบตรวจสอบคุณภาพอัตโนมัติใน CI/CD", C_NAVY_RGB, "ผสานอัลกอริทึม DFS Validation เข้ากับกระบวนการ Continuous Integration เพื่อสแกนหา Dead-Ends ก่อนส่งมอบเกม")
]
for idx, (title, col, desc) in enumerate(apps):
    c = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.5 + idx * 1.75), Inches(5.733), Inches(1.6))
    set_shape_flat(c, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf = c.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.2)
    tf.margin_top = Inches(0.12)
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_TH
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = col
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_TH
    p_d.font.size = Pt(11.5)
    p_d.font.color.rgb = C_INK_RGB
    p_d.space_before = Pt(3)

s6.notes_slide.notes_text_frame.text = (
    "เวลา 5:10–6:20\n"
    "ในแง่คุณค่าทางวิชาการและการต่อยอด บทความนี้ให้คุณูปการสำคัญ 3 ด้านครับ "
    "คือการเปลี่ยนการวิจารณ์บทที่เป็นนามธรรมให้เป็นตัวชี้วัดคณิตศาสตร์, การวางสถาปัตยกรรมออฟไลน์เทสติ้ง "
    "และการนำเสนอโมเดลจำลองผู้เล่นด้วย Heuristic\n\n"
    "ซึ่งในทางวิศวกรรมซอฟต์แวร์ เราสามารถนำโมเดล Directed Graph นี้ไปประยุกต์ใช้กับเอนจินเกมอย่าง Unity, Unreal "
    "หรือนำไปทำเป็น Automated QA Pipeline ในขั้นตอน CI/CD เพื่อตรวจสอบคุณภาพของบทเกมก่อน Release สู่ตลาดได้ทันทีครับ"
)


# ------------------------------------------------------------------------------
# PPTX SLIDE 7: LIMITATIONS & CONCLUSION (Slide 6 - Pure Work 1 Style)
# ------------------------------------------------------------------------------
s7 = prs.slides.add_slide(blank_layout)
bg7 = s7.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
set_shape_flat(bg7, C_LIGHT_BG_RGB, None)
add_work1_header(s7, "ข้อจำกัด และบทสรุป")
add_work1_footer(s7, "6")

# Left Column: Limitations & Risks
tb_l7_title = s7.shapes.add_textbox(Inches(0.8), Inches(1.05), Inches(5.65), Inches(0.4))
p = tb_l7_title.text_frame.paragraphs[0]
p.text = "ข้อจำกัดที่ระบุในบทความ (Limitations & Risks)"
p.font.name = FONT_TH
p.font.size = Pt(15.5)
p.font.bold = True
p.font.color.rgb = C_RED_RGB

lims = [
    ("1. ขาดกลุ่มควบคุมเปรียบเทียบ (No Control Baseline)", C_RED_RGB, "บทความวัดเวลาตรวจบั๊กได้ 52.3 วินาที แต่ไม่ได้วัดเทียบกับกลุ่มที่ตรวจด้วยสายตาเปล่าใน Twine จึงยังไม่เห็นความเร็วเปรียบเทียบเชิงสถิติ"),
    ("2. ปัญหา State-Space Explosion ของ DFS", C_RED_RGB, "การท่องทุกเส้นทางด้วย DFS ทำงานได้ดีในเรื่องขนาดเล็ก แต่หากกราฟมีหลายร้อยฉากและมีวงวน (Loops) จำนวนเส้นทางจะพุ่งสูงแบบ Exponential"),
    ("3. ขอบเขตชุดทดสอบมีขนาดเล็ก", C_RED_RGB, "บั๊กทั้ง 5 จุดใน TMC ถูกตรวจพบด้วย Lost Plot เพียงอย่างเดียว ยังไม่ได้พิสูจน์คุณค่าของ Stroke Points หรือตัวแปรที่ซับซ้อนสูงในเกมระดับอุตสาหกรรม")
]
for idx, (title, col, desc) in enumerate(lims):
    c = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5 + idx * 1.75), Inches(5.65), Inches(1.6))
    set_shape_flat(c, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf = c.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.2)
    tf.margin_top = Inches(0.12)
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_TH
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = col
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_TH
    p_d.font.size = Pt(11.5)
    p_d.font.color.rgb = C_INK_RGB
    p_d.space_before = Pt(3)

# Right Column: Conclusion & Future Work
tb_r7_title = s7.shapes.add_textbox(Inches(6.8), Inches(1.05), Inches(5.733), Inches(0.4))
p = tb_r7_title.text_frame.paragraphs[0]
p.text = "บทสรุปและการประยุกต์ใช้งาน (Conclusion & Applications)"
p.font.name = FONT_TH
p.font.size = Pt(15.5)
p.font.bold = True
p.font.color.rgb = C_NAVY_RGB

conc = [
    ("1. การยกระดับสู่ Automated QA", C_BLUE_RGB, "Story Validator วางรากฐานสำคัญของการนำทฤษฎีกราฟและการจำลอง Persona มาตรวจพิสูจน์เกมเล่าเรื่องแบบอัตโนมัติ ช่วยลดต้นทุน Playtesting และรักษาคุณภาพเนื้อเรื่อง"),
    ("2. การเชื่อมต่อ Game Engine เชิงพาณิชย์", C_BLUE_RGB, "พัฒนาปลั๊กอินเชื่อมต่อไปยัง Unity, Unreal Engine หรือ Visual Novel Engines ยอดนิยม เพื่อให้นักพัฒนาเข้าถึงได้สะดวก"),
    ("3. การใช้ AI/LLM ช่วยซ่อมแซมเนื้อเรื่อง", C_BLUE_RGB, "ประยุกต์ใช้ Large Language Models ร่วมกับกราฟ เพื่อช่วยเสนอแนวทางแก้ไขเงื่อนไขตัวแปรหรือเส้นทางที่ตันโดยอัตโนมัติ")
]
for idx, (title, col, desc) in enumerate(conc):
    c = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.5 + idx * 1.75), Inches(5.733), Inches(1.6))
    set_shape_flat(c, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf = c.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.2)
    tf.margin_top = Inches(0.12)
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_TH
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = col
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_TH
    p_d.font.size = Pt(11.5)
    p_d.font.color.rgb = C_INK_RGB
    p_d.space_before = Pt(3)

s7.notes_slide.notes_text_frame.text = (
    "เวลา 6:20–7:30\n"
    "สุดท้ายในด้านข้อจำกัด บทความนี้ยังมีจุดที่ต้องพัฒนาต่อ คือยังขาดการทดลองเปรียบเทียบกับกลุ่มควบคุมที่ตรวจด้วยมือ "
    "และอัลกอริทึม DFS ยังเสี่ยงต่อปัญหา State-Space Explosion หากนำไปใช้กับเกมขนาดใหญ่ที่มีทางเลือกมหาศาลครับ\n\n"
    "โดยสรุป Story Validator ถือเป็นก้าวแรกที่สำคัญมากในการนำ Computer Science มาช่วยนักเขียนบทเกม "
    "และในอนาคต การผสานงานวิจัยนี้เข้ากับ LLM เพื่อช่วยแนะนำวิธีแก้ปัญหาตรรกะแบบอัตโนมัติ จะเป็นทิศทางที่น่าสนใจอย่างยิ่งครับ ขอจบการนำเสนอเพียงเท่านี้ครับ"
)

prs.save(PPTX_OUT)
print(f"Generated clean Work-1 style PPTX: {PPTX_OUT}")
