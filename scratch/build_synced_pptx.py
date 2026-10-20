#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Synchronizes PowerPoint presentation with Assignment_Paper_2_StoryValidator.pdf (SSOT).
Requirements:
1. Use Assignment_Paper_2_StoryValidator.pdf as SSOT for visual layout.
2. Produce pixel-perfect PPTX matching the PDF 100%.
3. Produce editable PPTX with native shapes and true mathematical subscripts.
4. Embed the 5-minute concise, non-AI-slop presentation script into Speaker Notes.
"""

import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

BASE_DIR = "/Users/3rapat/student/universty/NU/project/senior/senior-subject/sensor-network"
WORK2_DIR = os.path.join(BASE_DIR, "assignement/work2")
SLIDES_DIR = os.path.join(WORK2_DIR, "03_slides")
BUILD_DIR = os.path.join(WORK2_DIR, ".build")
HIRES_DIR = os.path.join(BUILD_DIR, "slides-hires")
ASSETS_DIR = os.path.join(BUILD_DIR, "slide-assets")

PDF_SSOT = os.path.join(SLIDES_DIR, "Assignment_Paper_2_StoryValidator.pdf")
PPTX_5MIN = os.path.join(SLIDES_DIR, "Assignment_Paper_2_StoryValidator_5-to-8-min.pptx")
PPTX_SSOT = os.path.join(SLIDES_DIR, "Assignment_Paper_2_StoryValidator.pptx")
PPTX_EDITABLE = os.path.join(SLIDES_DIR, "Assignment_Paper_2_StoryValidator_editable.pptx")

FIG1_PATH = os.path.join(ASSETS_DIR, "fig1_twine_storyboard.png")
FIG8_PATH = os.path.join(ASSETS_DIR, "fig8_problem_analysis.png")

# 5-Minute Presentation Scripts (Calibrated to 5:00 total)
SCRIPT_NOTES = [
    # Slide 1 (0:00 - 0:30)
    (
        "[0:00 - 0:30 · บทนำและโจทย์ตั้งต้นของงานวิจัย]\n"
        "สวัสดีครับอาจารย์และเพื่อนๆ ทุกคน ผมธีรภัทร ภู่ระย้า วันนี้ขอสรุปบทความวิจัยเรื่อง "
        "'Story Validator: Validating the Plot of Interactive Narrative Games' "
        "จากการประชุมวิชาการ IEEE Conference on Games ปี 2021 ครับ\n\n"
        "ในการพัฒนาเกมที่มีเนื้อเรื่องแตกแขนง สิ่งที่ท้าทายมากคือ เมื่อเรื่องราวมีทางเลือกซับซ้อน "
        "เราจะมั่นใจได้อย่างไรว่าทุกเส้นทางที่ผู้เล่นเลือก จะสามารถดำเนินไปถึงฉากจบได้จริงโดยไม่ติดบั๊กกลางคัน "
        "เปเปอร์นี้นำเสนอเครื่องมือวิศวกรรมที่ใช้แบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น มาตรวจความถูกต้องของโครงเรื่องแบบอัตโนมัติครับ"
    ),
    # Slide 2 (0:30 - 1:15)
    (
        "[0:30 - 1:15 · ปัญหาและความท้าทายในการตรวจสอบ]\n"
        "ความท้าทายของเกมเล่าเรื่องแบบแตกแขนงมี 4 ข้อสำคัญครับ\n"
        "1. การรักษาสมดุลระหว่างเจตจำนงของคนแต่งกับอิสระในการตัดสินใจของผู้เล่น\n"
        "2. ปัญหา State-Space Explosion เมื่อมีทางเลือกมาก เส้นทางจะทวีคูณจนเกินขีดความสามารถที่มนุษย์จะตรวจด้วยตาเปล่าได้ครบ\n"
        "3. การผูกเงื่อนไขกับตัวแปรสะสม เช่น ค่าอารมณ์ ซึ่งเสี่ยงต่อการเกิดข้อผิดพลาดเชิงตรรกะในเส้นทางที่คาดไม่ถึง\n"
        "4. การใช้คนจริงทดสอบมีต้นทุนสูง ช้า และไม่ครอบคลุม\n\n"
        "และที่น่าตกใจคือ ผลสำรวจในเปเปอร์พบว่า 76% ของคนเขียนบทยังใช้ MS Word หรือ Google Docs "
        "ทำให้ขาดระบบตรวจจับความถูกต้องเชิงตรรกะ จนเกิดปัญหาทางตันและเนื้อเรื่องหลุดรอดไปถึงผู้เล่นครับ"
    ),
    # Slide 3 (1:15 - 2:05)
    (
        "[1:15 - 2:05 · แบบจำลองกราฟและตัวชี้วัด 5 ด้าน]\n"
        "เพื่อแก้ปัญหานี้ งานวิจัยเสนอแบบจำลอง 2 ส่วนหลักครับ\n\n"
        "ฝั่งซ้ายคือการแปลงโครงเรื่องเป็น Directed Graph G = (V, E) โดยให้แต่ละฉากหรือ Passage เป็นโหนด V "
        "และให้ทางเลือกเป็นเส้นเชื่อม E ที่มีเงื่อนไขตัวแปรกำกับ จากนั้นใช้อัลกอริทึม Depth-First Search หรือ DFS "
        "ท่องกราฟเพื่อรวบรวมร่องรอยการเล่นทุกเส้นทางแบบอัตโนมัติ\n\n"
        "ส่วนฝั่งขวาคือนิยามตัวชี้วัดคุณภาพ 5 ด้าน ได้แก่:\n"
        "1. Number of Paths (N_paths) นับผลรวมเส้นทางทั้งหมดตั้งแต่จุดเริ่มจนถึงฉากจบ\n"
        "2. Stroke Points (S_points) ฉากบังคับผ่านที่ทุกเส้นทางต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญครบถ้วน\n"
        "3. Endings Hit Percentage (P_endings) คำนวณสัดส่วนความน่าจะเป็นในการเข้าถึงฉากจบแต่ละแบบ\n"
        "4. Dead-Ends (D_ends) และ Lost Plot (L_plot) ดักจับฉากทางตันที่ไปต่อไม่ได้ และฉากที่ไม่สามารถเข้าถึงได้จริงเนื่องจากเงื่อนไขตัวแปรขัดแย้ง\n"
        "5. Evolution of Variables (V_evol) พล็อต Dotted Chart ติดตามค่าตัวแปรเพื่อตรวจจับค่าหลุดกรอบครับ"
    ),
    # Slide 4 (2:05 - 2:55)
    (
        "[2:05 - 2:55 · กรณีศึกษา The Murder Case และการจำลอง Persona]\n"
        "ผู้เขียนทดสอบระบบด้วยกรณีศึกษา The Murder Case บทสนทนาสืบสวนสอบปากคำที่มีตัวแปรอารมณ์ 3 ด้าน คือ โกรธ สับสน และกลัว "
        "ขนาด 14 ฉาก 20 เส้นทาง และ 3 ฉากจบ โดยจงใจฝังบั๊กไว้ 5 จุด ได้แก่ เส้นทางที่ 7 และ 14 ติด Dead-End, "
        "เส้นทางที่ 8 วนลูปไม่รู้จบ, และ Ending 1 กับ Choice 6 เข้าไม่ถึงจริง\n\n"
        "ไฮไลต์ของงานนี้คือการสร้าง Player Personas จำลองพฤติกรรมผู้เล่น 2 สไตล์ คือ Aggressive ที่เน้นอารมณ์โกรธ "
        "และ Paranoid ที่เน้นอารมณ์กลัว โดยใช้อัลกอริทึม Heuristic Greedy Search คำนวณค่าน้ำหนักอารมณ์ Score(L) "
        "ช่วยให้นักเขียนพยากรณ์ได้ล่วงหน้าว่าผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กตัวไหนบ้าง ก่อนเปิดทดสอบเล่นกับคนจริงครับ"
    ),
    # Slide 5 (2:55 - 3:45)
    (
        "[2:55 - 3:45 · ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด]\n"
        "ผลการทดสอบกับผู้ใช้ 20 คนใน User Study 2 ยืนยันประสิทธิภาพอย่างชัดเจนครับ\n"
        "Story Validator ช่วยให้ผู้ใช้ตรวจพบบั๊กได้ในเวลาเฉลี่ยเพียง 52.3 วินาที และใช้เวลาแก้ปัญหาเสร็จใน 146.2 วินาที "
        "พร้อมได้คะแนนความพึงพอใจการใช้งาน หรือ SUS สูงถึง 92.4 เต็ม 100 อยู่ในระดับ Truly Superior ครับ\n\n"
        "ข้อค้นพบสำคัญคือ ผู้ใช้ 15% ที่พยายามตรวจด้วยตาเปล่าโดยไม่เปิดตัวกรองอัตโนมัติ ไม่สามารถหาบั๊กพบเลย "
        "และบั๊กที่มีเงื่อนไขตัวแปรซับซ้อนหลายชั้นเป็นจุดที่ผู้ใช้ติดขัดมากที่สุด แสดงให้เห็นว่าสายตามนุษย์ไม่เพียงพอสำหรับการตรวจผังเรื่องที่ซับซ้อน "
        "และเครื่องมืออัตโนมัตินี้มีความจำเป็นอย่างยิ่งครับ"
    ),
    # Slide 6 (3:45 - 4:25)
    (
        "[3:45 - 4:25 · การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน]\n"
        "คุณค่าทางวิชาการของเปเปอร์นี้มี 3 ด้านครับ คือการแปลงการเล่าเรื่องให้เป็นตัวชี้วัดเชิงคณิตศาสตร์, "
        "การวางสถาปัตยกรรมตรวจสอบกราฟแบบออฟไลน์, และการจำลองพฤติกรรมผู้เล่นด้วย Persona\n\n"
        "ในทางปฏิบัติ เราสามารถต่อยอดโมเดล Directed Graph นี้ไปเชื่อมต่อกับ Game Engine สมัยใหม่ เช่น Unity หรือ Unreal Engine "
        "ใช้แนวคิด Guarded Edges ประเมินเงื่อนไขตัวแปรระหว่างรันไทม์ และผสานอัลกอริทึม DFS Validation เข้ากับกระบวนการ CI/CD "
        "เพื่อสแกนหาข้อผิดพลาดของบทเกมโดยอัตโนมัติก่อนส่งมอบเกมสู่ตลาดครับ"
    ),
    # Slide 7 (4:25 - 5:00)
    (
        "[4:25 - 5:00 · ข้อจำกัด และบทสรุปภาพรวม]\n"
        "สุดท้ายในด้านข้อจำกัด เปเปอร์นี้ยังขาดกลุ่มควบคุมเปรียบเทียบเชิงสถิติ "
        "และการใช้ DFS ยังมีความเสี่ยงต่อปัญหา State-Space Explosion หากนำไปใช้กับเกมขนาดใหญ่ที่มีทางเลือกมหาศาล\n\n"
        "โดยสรุป Story Validator ได้วางรากฐานสำคัญของการนำวิทยาการคอมพิวเตอร์มาช่วยยกระดับงานเขียนบทเกมสู่ Automated QA "
        "และในอนาคต การนำโมเดลนี้ไปผสานร่วมกับ AI หรือ Large Language Models เพื่อช่วยแนะนำวิธีแก้ไขเงื่อนไขตัวแปรและเนื้อเรื่องที่ติดตัน "
        "จะเป็นทิศทางที่น่าสนใจอย่างยิ่งครับ\n\n"
        "ผมขอจบการนำเสนอเพียงเท่านี้ ขอบคุณครับ"
    )
]

def build_pixel_perfect_pptx():
    """Builds PPTX with high-res SSOT slide visuals and 5-min speaker notes."""
    prs = Presentation()
    prs.slide_width = Inches(13.333333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    for idx in range(7):
        slide = prs.slides.add_slide(blank_layout)
        img_path = os.path.join(HIRES_DIR, f"slide-{idx+1}.png")
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, 0, 0, width=Inches(13.333333), height=Inches(7.5))
        
        # Add Speaker Notes
        notes_slide = slide.notes_slide
        notes_slide.notes_text_frame.text = SCRIPT_NOTES[idx]

    prs.save(PPTX_5MIN)
    shutil.copyfile(PPTX_5MIN, PPTX_SSOT)
    print(f"Generated SSOT-Matched PPTX: {PPTX_5MIN}")
    print(f"Generated SSOT-Matched PPTX: {PPTX_SSOT}")

def build_editable_shapes_pptx():
    """Builds PPTX with native editable shapes, top-aligned text, true subscripts, and 5-min notes."""
    prs = Presentation()
    prs.slide_width = Inches(13.333333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    FONT = "TH Sarabun New"
    C_NAVY_RGB = RGBColor(15, 45, 74)
    C_BLUE_RGB = RGBColor(30, 58, 138)
    C_INK_RGB = RGBColor(15, 23, 42)
    C_MUTED_RGB = RGBColor(100, 116, 139)
    C_CARD_BG_RGB = RGBColor(255, 255, 255)
    C_LIGHT_BG_RGB = RGBColor(248, 250, 252)
    C_BORDER_RGB = RGBColor(226, 232, 240)
    C_ACCENT_BLUE_RGB = RGBColor(37, 99, 235)
    C_RED_RGB = RGBColor(185, 28, 28)

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
        h_box = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(0.85))
        set_shape_flat(h_box, C_NAVY_RGB, None)
        tf = h_box.text_frame
        tf.word_wrap = True
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.margin_left = Inches(0.8)
        tf.margin_top = Inches(0.2)
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.name = FONT
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = RGBColor(255, 255, 255)

    def add_work1_footer(slide, page_num_str):
        rule = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.92), Inches(11.733), Pt(1))
        set_shape_flat(rule, C_BORDER_RGB, None)
        
        tb_l = slide.shapes.add_textbox(Inches(0.8), Inches(6.96), Inches(8.0), Inches(0.4))
        p_l = tb_l.text_frame.paragraphs[0]
        p_l.text = "เอกสารอ้างอิง: Veloso & Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)"
        p_l.font.name = FONT
        p_l.font.size = Pt(11)
        p_l.font.color.rgb = C_MUTED_RGB
        
        tb_r = slide.shapes.add_textbox(Inches(10.533), Inches(6.96), Inches(2.0), Inches(0.4))
        p_r = tb_r.text_frame.paragraphs[0]
        p_r.alignment = PP_ALIGN.RIGHT
        p_r.text = page_num_str
        p_r.font.name = FONT
        p_r.font.size = Pt(13)
        p_r.font.bold = True
        p_r.font.color.rgb = C_NAVY_RGB

    # --- Slide 1: Cover ---
    s1 = prs.slides.add_slide(blank_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(7.5))
    set_shape_flat(bg1, RGBColor(255, 255, 255), None)

    tb_c = s1.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(5.3))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True
    tf_c.vertical_anchor = MSO_ANCHOR.TOP

    p_course = tf_c.paragraphs[0]
    p_course.alignment = PP_ALIGN.CENTER
    p_course.text = "วิชา 305432 เครือข่ายเซนเซอร์ (Sensor Networks)"
    p_course.font.name = FONT
    p_course.font.size = Pt(18)
    p_course.font.bold = True
    p_course.font.color.rgb = C_MUTED_RGB

    p_title = tf_c.add_paragraph()
    p_title.alignment = PP_ALIGN.CENTER
    p_title.text = "Story Validator: Validating the Plot of Interactive Narrative Games"
    p_title.font.name = FONT
    p_title.font.size = Pt(30)
    p_title.font.bold = True
    p_title.font.color.rgb = C_NAVY_RGB
    p_title.space_before = Pt(16)

    p_sub = tf_c.add_paragraph()
    p_sub.alignment = PP_ALIGN.CENTER
    p_sub.text = "การตรวจสอบโครงเรื่องของเกมแบบโต้ตอบด้วยแบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น"
    p_sub.font.name = FONT
    p_sub.font.size = Pt(19)
    p_sub.font.bold = True
    p_sub.font.color.rgb = C_BLUE_RGB
    p_sub.space_before = Pt(8)

    div_line = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(5.866), Inches(3.6), Inches(1.6), Pt(3))
    set_shape_flat(div_line, C_ACCENT_BLUE_RGB, None)

    tb_meta = s1.shapes.add_textbox(Inches(1.0), Inches(3.85), Inches(11.333), Inches(2.8))
    tf_meta = tb_meta.text_frame
    tf_meta.word_wrap = True
    tf_meta.vertical_anchor = MSO_ANCHOR.TOP

    p_conf = tf_meta.paragraphs[0]
    p_conf.alignment = PP_ALIGN.CENTER
    p_conf.text = "2021 IEEE Conference on Games (CoG)"
    p_conf.font.name = FONT
    p_conf.font.size = Pt(15.5)
    p_conf.font.bold = True
    p_conf.font.color.rgb = C_INK_RGB

    p_auth = tf_meta.add_paragraph()
    p_auth.alignment = PP_ALIGN.CENTER
    p_auth.text = "คณะผู้วิจัย: Carolina Veloso, Rui Prada (INESC-ID & Instituto Superior Técnico, Universidade de Lisboa)"
    p_auth.font.name = FONT
    p_auth.font.size = Pt(14)
    p_auth.font.color.rgb = C_MUTED_RGB
    p_auth.space_before = Pt(4)

    p_pres = tf_meta.add_paragraph()
    p_pres.alignment = PP_ALIGN.CENTER
    p_pres.text = "นายธีรภัทร ภู่ระย้า ลำดับที่ 10"
    p_pres.font.name = FONT
    p_pres.font.size = Pt(17.5)
    p_pres.font.bold = True
    p_pres.font.color.rgb = C_NAVY_RGB
    p_pres.space_before = Pt(26)

    p_id = tf_meta.add_paragraph()
    p_id.alignment = PP_ALIGN.CENTER
    p_id.text = "รหัสนิสิต 66362416"
    p_id.font.name = FONT
    p_id.font.size = Pt(16)
    p_id.font.color.rgb = C_MUTED_RGB
    p_id.space_before = Pt(3)

    s1.notes_slide.notes_text_frame.text = SCRIPT_NOTES[0]

    # --- Slide 2: Challenges ---
    s2 = prs.slides.add_slide(blank_layout)
    bg2 = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(7.5))
    set_shape_flat(bg2, C_LIGHT_BG_RGB, None)
    add_work1_header(s2, "ปัญหาและความท้าทายในการตรวจสอบ Interactive Story")
    add_work1_footer(s2, "1")

    # Left card
    c_l2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.15), Inches(5.65), Inches(5.5))
    set_shape_flat(c_l2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_l2 = c_l2.text_frame
    tf_l2.word_wrap = True
    tf_l2.vertical_anchor = MSO_ANCHOR.TOP
    tf_l2.margin_left = tf_l2.margin_right = Inches(0.25)
    tf_l2.margin_top = Inches(0.2)

    p = tf_l2.paragraphs[0]
    p.text = "ความท้าทายหลักของโครงเรื่องแบบแตกแขนง"
    p.font.name = FONT
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
        p_item.font.name = FONT
        p_item.font.size = Pt(12.5)
        p_item.font.color.rgb = C_INK_RGB
        p_item.space_before = Pt(8)

    # Right Card 1: Fig 1
    c_r2_img = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.15), Inches(5.733), Inches(3.5))
    set_shape_flat(c_r2_img, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    if os.path.exists(FIG1_PATH):
        s2.shapes.add_picture(FIG1_PATH, Inches(7.0), Inches(1.25), width=Inches(5.333))

    p_cap = s2.shapes.add_textbox(Inches(6.8), Inches(4.2), Inches(5.733), Inches(0.4)).text_frame.paragraphs[0]
    p_cap.alignment = PP_ALIGN.CENTER
    p_cap.text = "ภาพที่ 1: ผังโครงเรื่องแบบ Node & Link ใน Twine ซึ่งซับซ้อนเกินกว่าจะตรวจทานด้วยสายตามนุษย์"
    p_cap.font.name = FONT
    p_cap.font.size = Pt(11)
    p_cap.font.color.rgb = C_MUTED_RGB

    # Right Card 2: Practice Survey
    c_r2_text = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.75), Inches(5.733), Inches(1.9))
    set_shape_flat(c_r2_text, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_r2 = c_r2_text.text_frame
    tf_r2.word_wrap = True
    tf_r2.vertical_anchor = MSO_ANCHOR.TOP
    tf_r2.margin_left = tf_r2.margin_right = Inches(0.25)
    tf_r2.margin_top = Inches(0.18)

    p_t2 = tf_r2.paragraphs[0]
    p_t2.text = "ปัญหาการตรวจสอบในทางปฏิบัติ"
    p_t2.font.name = FONT
    p_t2.font.size = Pt(14)
    p_t2.font.bold = True
    p_t2.font.color.rgb = C_NAVY_RGB

    p_d2 = tf_r2.add_paragraph()
    p_d2.text = "ผลสำรวจในบทความพบว่า 76% ของนักเขียนบทเกมยังคงใช้ MS Word หรือ Google Docs ในการร่างบท โดยเครื่องมืออย่าง Twine หรือ Ren'Py ช่วยเพียงการเรียบเรียง แต่ขาดระบบตรวจสอบความถูกต้องเชิงตรรกะแบบอัตโนมัติ ทำให้มักพบ Dead-Ends และ Lost Plot"
    p_d2.font.name = FONT
    p_d2.font.size = Pt(12)
    p_d2.font.color.rgb = C_INK_RGB
    p_d2.space_before = Pt(4)

    s2.notes_slide.notes_text_frame.text = SCRIPT_NOTES[1]

    # --- Slide 3: Model & Metrics (with true subscripts) ---
    s3 = prs.slides.add_slide(blank_layout)
    bg3 = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(7.5))
    set_shape_flat(bg3, C_LIGHT_BG_RGB, None)
    add_work1_header(s3, "แบบจำลองกราฟและตัวชี้วัดโครงเรื่อง (The Proposed Model & Metrics)")
    add_work1_footer(s3, "2")

    # Left Zone Header
    tb_z1 = s3.shapes.add_textbox(Inches(0.8), Inches(1.05), Inches(5.0), Inches(0.4))
    p_z1 = tb_z1.text_frame.paragraphs[0]
    p_z1.text = "แบบจำลองโครงเรื่องด้วยกราฟ (Graph Representation)"
    p_z1.font.name = FONT
    p_z1.font.size = Pt(15.5)
    p_z1.font.bold = True
    p_z1.font.color.rgb = C_NAVY_RGB

    # Card 1.1: G = (V, E)
    c_m1 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.0), Inches(2.45))
    set_shape_flat(c_m1, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_m1 = c_m1.text_frame
    tf_m1.word_wrap = True
    tf_m1.vertical_anchor = MSO_ANCHOR.TOP
    tf_m1.margin_left = tf_m1.margin_right = Inches(0.22)
    tf_m1.margin_top = Inches(0.18)

    p = tf_m1.paragraphs[0]
    p.text = "1. นิยามกราฟระบุทิศทาง G = (V, E)"
    p.font.name = FONT
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = C_BLUE_RGB

    p_body = tf_m1.add_paragraph()
    p_body.text = "• Passage (โหนด V): แต่ละฉากของเนื้อเรื่อง บรรจุเนื้อหาบทสนทนาและคำสั่งตัวแปร\n• Link (เส้นเชื่อม E): ทางเลือกของผู้เล่น พร้อมเงื่อนไขตัวแปรกำกับ (Guarded Edges)"
    p_body.font.name = FONT
    p_body.font.size = Pt(12)
    p_body.font.color.rgb = C_INK_RGB
    p_body.space_before = Pt(6)

    # Card 1.2: DFS
    c_m2 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.1), Inches(5.0), Inches(2.55))
    set_shape_flat(c_m2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_m2 = c_m2.text_frame
    tf_m2.word_wrap = True
    tf_m2.vertical_anchor = MSO_ANCHOR.TOP
    tf_m2.margin_left = tf_m2.margin_right = Inches(0.22)
    tf_m2.margin_top = Inches(0.18)

    p = tf_m2.paragraphs[0]
    p.text = "2. การท่องกราฟด้วย DFS"
    p.font.name = FONT
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = C_BLUE_RGB

    p_body = tf_m2.add_paragraph()
    p_body.text = "• ใช้อัลกอริทึม Depth-First Search (DFS) เริ่มจากจุดเริ่มต้นและท่องไปจนสุดฉากจบทีละเส้นทาง\n• รวบรวมร่องรอยการเล่น (Playthrough Traces) ทุกเส้นทางที่เป็นไปได้แบบอัตโนมัติ เพื่อนำไปคำนวณตัวชี้วัด"
    p_body.font.name = FONT
    p_body.font.size = Pt(12)
    p_body.font.color.rgb = C_INK_RGB
    p_body.space_before = Pt(6)

    # Right Zone Header
    tb_z2 = s3.shapes.add_textbox(Inches(6.2), Inches(1.05), Inches(6.333), Inches(0.4))
    p_z2 = tb_z2.text_frame.paragraphs[0]
    p_z2.text = "ตัวชี้วัดคุณภาพโครงเรื่อง 5 ด้าน (Narrative Metrics)"
    p_z2.font.name = FONT
    p_z2.font.size = Pt(15.5)
    p_z2.font.bold = True
    p_z2.font.color.rgb = C_NAVY_RGB

    # 5 Metrics with true subscripts
    metrics_spec = [
        ("1. Number of Paths (N", "paths", ")", C_BLUE_RGB, "นับผลรวมของเส้นทางการเล่นที่เป็นไปได้ทั้งหมดตั้งแต่จุดเริ่มต้นจนถึงฉากจบ พร้อมบันทึก Passage ที่แวะผ่าน"),
        ("2. Stroke Points (S", "points", ")", C_BLUE_RGB, "ฉากสำคัญที่ทุกเส้นทางในกราฟต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญตามเจตจำนงของผู้แต่งครบถ้วน"),
        ("3. Endings Hit Percentage (P", "endings", ")", C_BLUE_RGB, "คำนวณสัดส่วนความน่าจะเป็นในการจบแต่ละแบบ และตรวจหาฉากจบที่ไม่สามารถเข้าถึงได้จริง"),
        ("4. Dead-Ends (D", "ends", ") & Lost Plot (L", "plot", ")", C_RED_RGB, "• Dead-End: ฉากที่ดำเนินไปแล้วไม่มีทางเลือกให้ไปต่อจนจบเกม\n• Lost Plot: ฉากที่ไม่สามารถเข้าถึงได้จริงเนื่องจากเงื่อนไขตัวแปรขัดแย้ง"),
        ("5. Evolution of Variables (V", "evol", ")", C_BLUE_RGB, "พล็อต Dotted Chart ติดตามการเปลี่ยนแปลงค่าตัวแปรตลอดเส้นเรื่อง เพื่อตรวจจับค่าหลุดกรอบ (Out-of-range)")
    ]

    for idx, spec in enumerate(metrics_spec):
        y_pos = Inches(1.5 + idx * 1.03)
        card_h = Inches(0.95) if idx != 3 else Inches(1.05)
        c_sub = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.2), y_pos, Inches(6.333), card_h)
        set_shape_flat(c_sub, C_CARD_BG_RGB, C_BORDER_RGB, 1)
        tf_s = c_sub.text_frame
        tf_s.word_wrap = True
        tf_s.vertical_anchor = MSO_ANCHOR.TOP
        tf_s.margin_left = tf_s.margin_right = Inches(0.18)
        tf_s.margin_top = Inches(0.1)

        p = tf_s.paragraphs[0]
        col = spec[3] if idx != 3 else spec[5]
        desc = spec[4] if idx != 3 else spec[6]

        if idx == 3: # Dead-Ends & Lost Plot has two subscripts
            r1 = p.add_run(); r1.text = "4. Dead-Ends (D"; r1.font.bold = True; r1.font.color.rgb = col
            r2 = p.add_run(); r2.text = "ends"; r2.font.bold = True; r2.font.color.rgb = col; r2.font.subscript = True
            r3 = p.add_run(); r3.text = ") & Lost Plot (L"; r3.font.bold = True; r3.font.color.rgb = col
            r4 = p.add_run(); r4.text = "plot"; r4.font.bold = True; r4.font.color.rgb = col; r4.font.subscript = True
            r5 = p.add_run(); r5.text = ")"; r5.font.bold = True; r5.font.color.rgb = col
        else:
            r1 = p.add_run(); r1.text = spec[0]; r1.font.bold = True; r1.font.color.rgb = col
            r2 = p.add_run(); r2.text = spec[1]; r2.font.bold = True; r2.font.color.rgb = col; r2.font.subscript = True
            r3 = p.add_run(); r3.text = spec[2]; r3.font.bold = True; r3.font.color.rgb = col

        p_d = tf_s.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = C_INK_RGB
        p_d.space_before = Pt(2)

    s3.notes_slide.notes_text_frame.text = SCRIPT_NOTES[2]

    # --- Slide 4: TMC & Personas ---
    s4 = prs.slides.add_slide(blank_layout)
    bg4 = s4.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(7.5))
    set_shape_flat(bg4, C_LIGHT_BG_RGB, None)
    add_work1_header(s4, "กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น")
    add_work1_footer(s4, "3")

    # Left Column: TMC Scenario & Bugs
    c_tmc1 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.15), Inches(5.65), Inches(2.6))
    set_shape_flat(c_tmc1, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_t1 = c_tmc1.text_frame
    tf_t1.word_wrap = True
    tf_t1.vertical_anchor = MSO_ANCHOR.TOP
    tf_t1.margin_left = tf_t1.margin_right = Inches(0.22)
    tf_t1.margin_top = Inches(0.18)

    p = tf_t1.paragraphs[0]
    p.text = "ฉากทดสอบ The Murder Case (TMC)"
    p.font.name = FONT
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_RGB

    p_desc = tf_t1.add_paragraph()
    p_desc.text = "บทสนทนาแนวสืบสวนสอบปากคำผู้ต้องสงสัยคดีฆาตกรรม กำกับด้วยตัวแปรอารมณ์ 3 ด้าน: โกรธ (Anger), สับสน (Confusion), และกลัว (Fear)\n\nขนาดบททดสอบ: 14 Passages · 20 Paths · 3 ฉากจบ"
    p_desc.font.name = FONT
    p_desc.font.size = Pt(12.5)
    p_desc.font.color.rgb = C_INK_RGB
    p_desc.space_before = Pt(6)

    c_tmc2 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.95), Inches(5.65), Inches(2.7))
    set_shape_flat(c_tmc2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_t2 = c_tmc2.text_frame
    tf_t2.word_wrap = True
    tf_t2.vertical_anchor = MSO_ANCHOR.TOP
    tf_t2.margin_left = tf_t2.margin_right = Inches(0.22)
    tf_t2.margin_top = Inches(0.18)

    p = tf_t2.paragraphs[0]
    p.text = "บั๊กทดสอบ 5 จุดที่จงใจฝังไว้ (Injected Defects)"
    p.font.name = FONT
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = C_RED_RGB

    p_bugs = tf_t2.add_paragraph()
    p_bugs.text = "• บั๊ก 1 & 3: เส้นทาง #7 และ #14 เกิด Dead-End ที่ Choice 5\n• บั๊ก 2: เส้นทาง #8 เกิด Loop วนซ้ำไม่รู้จบ\n• บั๊ก 4 & 5: ฉาก Ending 1 และ Choice 6 เข้าไม่ถึง (Lost Plot)"
    p_bugs.font.name = FONT
    p_bugs.font.size = Pt(12)
    p_bugs.font.color.rgb = C_INK_RGB
    p_bugs.space_before = Pt(6)

    # Right Column: Personas & Benefits
    c_per1 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.15), Inches(5.733), Inches(3.5))
    set_shape_flat(c_per1, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_p1 = c_per1.text_frame
    tf_p1.word_wrap = True
    tf_p1.vertical_anchor = MSO_ANCHOR.TOP
    tf_p1.margin_left = tf_p1.margin_right = Inches(0.22)
    tf_p1.margin_top = Inches(0.18)

    p = tf_p1.paragraphs[0]
    p.text = "การจำลองพฤติกรรมผู้เล่น (Player Personas)"
    p.font.name = FONT
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_RGB

    p_info = tf_p1.add_paragraph()
    p_info.text = "ใช้อัลกอริทึม Heuristic Greedy Search คำนวณค่าน้ำหนักอารมณ์เพื่อจำลองการตัดสินใจของผู้เล่นแต่ละสไตล์:"
    p_info.font.name = FONT
    p_info.font.size = Pt(12)
    p_info.font.color.rgb = C_INK_RGB
    p_info.space_before = Pt(3)

    # Shaded Formula Box
    c_fbox = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.0), Inches(2.2), Inches(5.333), Inches(0.55))
    set_shape_flat(c_fbox, RGBColor(241, 245, 249), C_BORDER_RGB, 1)
    tf_fb = c_fbox.text_frame
    tf_fb.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_fb = tf_fb.paragraphs[0]
    p_fb.alignment = PP_ALIGN.CENTER
    p_fb.text = "Score(L) = Σ (wi × vi),   L* = arg maxL ∈ Links Score(L)"
    p_fb.font.name = "Courier New"
    p_fb.font.size = Pt(11)
    p_fb.font.bold = True
    p_fb.font.color.rgb = C_INK_RGB

    tb_pdesc = s4.shapes.add_textbox(Inches(7.0), Inches(2.85), Inches(5.333), Inches(1.6))
    tf_pd = tb_pdesc.text_frame
    tf_pd.word_wrap = True
    p1 = tf_pd.paragraphs[0]
    p1.text = "• Aggressive Persona: ให้น้ำหนัก Anger = 0.75, Confusion = 0.15, Fear = 0.10"
    p1.font.name = FONT; p1.font.size = Pt(12); p1.font.color.rgb = C_INK_RGB
    p2 = tf_pd.add_paragraph()
    p2.text = "• Paranoid Persona: ให้น้ำหนัก Fear = 0.70, Confusion = 0.20, Anger = 0.10"
    p2.font.name = FONT; p2.font.size = Pt(12); p2.font.color.rgb = C_INK_RGB; p2.space_before = Pt(4)

    # Right Card 2: Benefit
    c_per2 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.85), Inches(5.733), Inches(1.8))
    set_shape_flat(c_per2, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_p2 = c_per2.text_frame
    tf_p2.word_wrap = True
    tf_p2.vertical_anchor = MSO_ANCHOR.TOP
    tf_p2.margin_left = tf_p2.margin_right = Inches(0.22)
    tf_p2.margin_top = Inches(0.15)

    p = tf_p2.paragraphs[0]
    p.text = "ประโยชน์ในการทดสอบ"
    p.font.name = FONT
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = C_BLUE_RGB

    p_d = tf_p2.add_paragraph()
    p_d.text = "ช่วยให้นักเขียนพยากรณ์ได้ว่าผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กใดบ้างตามแนวโน้มการตัดสินใจจริง ก่อนเปิดทดสอบเล่นกับผู้ใช้"
    p_d.font.name = FONT
    p_d.font.size = Pt(12)
    p_d.font.color.rgb = C_INK_RGB
    p_d.space_before = Pt(4)

    s4.notes_slide.notes_text_frame.text = SCRIPT_NOTES[3]

    # --- Slide 5: Results & SUS ---
    s5 = prs.slides.add_slide(blank_layout)
    bg5 = s5.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(7.5))
    set_shape_flat(bg5, C_LIGHT_BG_RGB, None)
    add_work1_header(s5, "ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด")
    add_work1_footer(s5, "4")

    # Left Card 1: Fig 8 Image
    c_r5_img = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.15), Inches(5.65), Inches(3.8))
    set_shape_flat(c_r5_img, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    if os.path.exists(FIG8_PATH):
        s5.shapes.add_picture(FIG8_PATH, Inches(1.0), Inches(1.25), width=Inches(5.25))

    p_cap5 = s5.shapes.add_textbox(Inches(0.8), Inches(4.55), Inches(5.65), Inches(0.4)).text_frame.paragraphs[0]
    p_cap5.alignment = PP_ALIGN.CENTER
    p_cap5.text = "ภาพที่ 2: ระบบ Story Validator ชี้ตำแหน่ง Choice 5 ที่เกิดปัญหา Dead-End บนผังต้นไม้"
    p_cap5.font.name = FONT
    p_cap5.font.size = Pt(11)
    p_cap5.font.color.rgb = C_MUTED_RGB

    # Left Card 2: Bug Detection Note
    c_r5_text = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.1), Inches(5.65), Inches(1.55))
    set_shape_flat(c_r5_text, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_r5 = c_r5_text.text_frame
    tf_r5.word_wrap = True
    tf_r5.vertical_anchor = MSO_ANCHOR.TOP
    tf_r5.margin_left = tf_r5.margin_right = Inches(0.22)
    tf_r5.margin_top = Inches(0.12)
    p = tf_r5.paragraphs[0]
    p.text = "การตรวจจับบั๊กในกราฟ"
    p.font.name = FONT
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_RGB
    p_d = tf_r5.add_paragraph()
    p_d.text = "บั๊กทดสอบที่ 1, 3, 4, 5 ถูกตรวจพบได้ 100% ผ่านตัวกรอง Lost Plot ในทันที โดยชี้ตำแหน่งโหนดที่มีปัญหาได้อย่างแม่นยำ"
    p_d.font.name = FONT
    p_d.font.size = Pt(12)
    p_d.font.color.rgb = C_INK_RGB
    p_d.space_before = Pt(3)

    # Right Column: 3 Metric Stats
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
        tf_st.vertical_anchor = MSO_ANCHOR.TOP
        tf_st.margin_top = Inches(0.12)
        p_v = tf_st.paragraphs[0]
        p_v.alignment = PP_ALIGN.CENTER
        p_v.text = val
        p_v.font.name = FONT
        p_v.font.size = Pt(28)
        p_v.font.bold = True
        p_v.font.color.rgb = col
        
        p_l = tf_st.add_paragraph()
        p_l.alignment = PP_ALIGN.CENTER
        p_l.text = lbl
        p_l.font.name = FONT
        p_l.font.size = Pt(10)
        p_l.font.color.rgb = C_MUTED_RGB
        p_l.space_before = Pt(2)

    # Findings Card
    c_find = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.65), Inches(5.733), Inches(4.0))
    set_shape_flat(c_find, C_CARD_BG_RGB, C_BORDER_RGB, 1)
    tf_f = c_find.text_frame
    tf_f.word_wrap = True
    tf_f.vertical_anchor = MSO_ANCHOR.TOP
    tf_f.margin_left = tf_f.margin_right = Inches(0.22)
    tf_f.margin_top = Inches(0.18)

    p = tf_f.paragraphs[0]
    p.text = "ข้อค้นพบจากการทดสอบกับผู้ใช้ 20 คน (Study 2)"
    p.font.name = FONT
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
        p_item.font.name = FONT
        p_item.font.size = Pt(12)
        p_item.font.color.rgb = C_INK_RGB
        p_item.space_before = Pt(6)

    s5.notes_slide.notes_text_frame.text = SCRIPT_NOTES[4]

    # --- Slide 6: Contributions & Applications ---
    s6 = prs.slides.add_slide(blank_layout)
    bg6 = s6.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(7.5))
    set_shape_flat(bg6, C_LIGHT_BG_RGB, None)
    add_work1_header(s6, "การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน")
    add_work1_footer(s6, "5")

    tb_c_title = s6.shapes.add_textbox(Inches(0.8), Inches(1.05), Inches(5.65), Inches(0.4))
    p = tb_c_title.text_frame.paragraphs[0]
    p.text = "การมีส่วนร่วมทางวิชาการ (Academic Contributions)"
    p.font.name = FONT; p.font.size = Pt(15.5); p.font.bold = True; p.font.color.rgb = C_NAVY_RGB

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
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.margin_left = tf.margin_right = Inches(0.2)
        tf.margin_top = Inches(0.12)
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = FONT; p.font.size = Pt(13.5); p.font.bold = True; p.font.color.rgb = col
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT; p_d.font.size = Pt(11.5); p_d.font.color.rgb = C_INK_RGB; p_d.space_before = Pt(3)

    tb_a_title = s6.shapes.add_textbox(Inches(6.8), Inches(1.05), Inches(5.733), Inches(0.4))
    p = tb_a_title.text_frame.paragraphs[0]
    p.text = "การประยุกต์ใช้งานกับเกมเล่าเรื่อง (Applications)"
    p.font.name = FONT; p.font.size = Pt(15.5); p.font.bold = True; p.font.color.rgb = C_NAVY_RGB

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
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.margin_left = tf.margin_right = Inches(0.2)
        tf.margin_top = Inches(0.12)
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = FONT; p.font.size = Pt(13.5); p.font.bold = True; p.font.color.rgb = col
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT; p_d.font.size = Pt(11.5); p_d.font.color.rgb = C_INK_RGB; p_d.space_before = Pt(3)

    s6.notes_slide.notes_text_frame.text = SCRIPT_NOTES[5]

    # --- Slide 7: Limitations & Conclusion ---
    s7 = prs.slides.add_slide(blank_layout)
    bg7 = s7.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333333), Inches(7.5))
    set_shape_flat(bg7, C_LIGHT_BG_RGB, None)
    add_work1_header(s7, "ข้อจำกัด และบทสรุป")
    add_work1_footer(s7, "6")

    tb_l7_title = s7.shapes.add_textbox(Inches(0.8), Inches(1.05), Inches(5.65), Inches(0.4))
    p = tb_l7_title.text_frame.paragraphs[0]
    p.text = "ข้อจำกัดที่ระบุในบทความ (Limitations & Risks)"
    p.font.name = FONT; p.font.size = Pt(15.5); p.font.bold = True; p.font.color.rgb = C_RED_RGB

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
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.margin_left = tf.margin_right = Inches(0.2)
        tf.margin_top = Inches(0.12)
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = FONT; p.font.size = Pt(13.5); p.font.bold = True; p.font.color.rgb = col
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT; p_d.font.size = Pt(11.5); p_d.font.color.rgb = C_INK_RGB; p_d.space_before = Pt(3)

    tb_r7_title = s7.shapes.add_textbox(Inches(6.8), Inches(1.05), Inches(5.733), Inches(0.4))
    p = tb_r7_title.text_frame.paragraphs[0]
    p.text = "บทสรุปและการประยุกต์ใช้งาน (Conclusion & Applications)"
    p.font.name = FONT; p.font.size = Pt(15.5); p.font.bold = True; p.font.color.rgb = C_NAVY_RGB

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
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.margin_left = tf.margin_right = Inches(0.2)
        tf.margin_top = Inches(0.12)
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = FONT; p.font.size = Pt(13.5); p.font.bold = True; p.font.color.rgb = col
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT; p_d.font.size = Pt(11.5); p_d.font.color.rgb = C_INK_RGB; p_d.space_before = Pt(3)

    s7.notes_slide.notes_text_frame.text = SCRIPT_NOTES[6]

    prs.save(PPTX_EDITABLE)
    print(f"Generated Editable Native-Shape PPTX: {PPTX_EDITABLE}")

if __name__ == "__main__":
    build_pixel_perfect_pptx()
    build_editable_shapes_pptx()
