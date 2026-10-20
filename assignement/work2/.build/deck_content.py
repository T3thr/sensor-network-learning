"""Content of the 7-slide Paper II deck (Story Validator, IEEE CoG 2021).

Scope note: this deck presents the research paper only. It deliberately makes no
reference to any senior project or product, so the talk lands inside 5-8 minutes.

Every figure on these slides is cropped from the published paper by
``extract_figures.py``; nothing is redrawn as a text-box stand-in. Box heights
come from ``lh_px`` (real line boxes) rather than from eyeballed numbers, which
is what ``validate_layout`` checks against the rendered text metrics.
"""
from __future__ import annotations

from pathlib import Path

from deck_theme import (
    AMBER, AMBER_LINE, AMBER_TINT, CARD, CONTENT_BOTTOM, CONTENT_L, CONTENT_R, CONTENT_TOP,
    CONTENT_W, COL_R_W, COL_R_X, DARK_CARD, DARK_LINE, H, HALF_R_X, HALF_W, INK, INK_MUTED,
    INK_SOFT, LH_BODY, LH_LOOSE, LH_TIGHT, MARGIN, ON_DARK, ON_DARK_MUTED, ON_DARK_SOFT,
    PURPLE, PURPLE_DARK, PURPLE_LINE, PURPLE_TINT, RULE, Run, Slide, T_BODY, T_BODY_SM,
    T_CAPTION, T_CARD_HEAD, T_HERO, T_HERO_SUB, T_METRIC, T_METRIC_SM, T_MICRO,
    arrow, bullets, card, chart, content_slide, image, line, lh_px, math, metric_tile,
    rect, text,
)

ASSETS = Path(__file__).resolve().parent / "slide-assets"
TOTAL = 6  # numbered content slides (the cover carries no number)

CITE = "C. Veloso and R. Prada, “Validating the plot of Interactive Narrative games,” IEEE CoG 2021"
DOI = "doi:10.1109/CoG52621.2021.9618897"

# line boxes used throughout
H_HEAD = lh_px(T_CARD_HEAD)          # 31
H_BODY = lh_px(T_BODY)               # 24
H_CAP = lh_px(T_CAPTION)             # 20
H_MICRO = lh_px(T_MICRO)             # 18
H_SM2 = lh_px(T_BODY_SM, 2, LH_BODY)  # 55 -- two lines of small body copy
H_CAP2 = lh_px(T_CAPTION, 2, LH_BODY)  # 47 -- two-line caption


# ---------------------------------------------------------------- components
def feature_card(x, y, w, head, body, *, accent=PURPLE, h=114):
    """Accent-barred card: one header line over up to two body lines."""
    els = card(x, y, w, h, accent=accent)
    els.append(text(x + 20, y + 13, w - 40, H_HEAD, head, size=T_CARD_HEAD, bold=True,
                    color=INK, line_height=LH_TIGHT))
    els.append(text(x + 20, y + 48, w - 40, H_SM2, body, size=T_BODY_SM, color=INK_SOFT,
                    line_height=LH_BODY))
    return els


def numbered_row(x, y, w, h, n, head, body):
    """Numbered row used for the five narrative metrics."""
    return [rect(x, y, w, h, fill=CARD, stroke=RULE, radius=8),
            rect(x + 14, y + (h - 30) / 2, 30, 30, fill=PURPLE, radius=8),
            text(x + 14, y + (h - 30) / 2 + 5, 30, H_CAP, str(n), size=T_CAPTION, bold=True,
                 color=ON_DARK, align="center", line_height=LH_TIGHT),
            text(x + 58, y + 10, w - 74, H_BODY, head, size=T_BODY, bold=True, color=INK,
                 line_height=LH_TIGHT),
            text(x + 58, y + 36, w - 74, H_CAP, body, size=T_CAPTION, color=INK_MUTED,
                 line_height=LH_TIGHT)]


def map_row(x, y, w, h, left, right):
    """Two-cell mapping row: paper concept -> game-engine construct."""
    lw = w * 0.42
    ty = y + (h - H_BODY) / 2
    return [rect(x, y, w, h, fill=CARD, stroke=RULE, radius=8),
            rect(x, y, 4, h, fill=PURPLE),
            text(x + 20, ty, lw - 28, H_BODY, left, size=T_BODY, bold=True, color=PURPLE,
                 line_height=LH_TIGHT),
            text(x + lw, ty, 26, H_BODY, "→", size=T_BODY, color=INK_MUTED,
                 align="center", line_height=LH_TIGHT),
            text(x + lw + 32, ty, w - lw - 50, H_BODY, right, size=T_BODY_SM, color=INK_SOFT,
                 line_height=LH_TIGHT)]


def figure(x, y, w, h, path, alt, *, pad=10):
    """Published figure inside a framed panel, letterboxed and centred."""
    return [rect(x, y, w, h, fill=CARD, stroke=RULE, radius=10),
            image(x + pad, y + pad, w - 2 * pad, h - 2 * pad, path, alt=alt)]


def caption(x, y, w, txt, *, lines=1, color=INK_MUTED):
    return text(x, y, w, lh_px(T_CAPTION, lines, LH_BODY if lines > 1 else LH_TIGHT), txt,
                size=T_CAPTION, color=color, line_height=LH_BODY if lines > 1 else LH_TIGHT)


# ------------------------------------------------------------------ slide 01
def slide_cover() -> Slide:
    s = Slide(PURPLE_DARK)
    s.add(rect(0, 0, 10, H, fill=PURPLE), zone="bleed")

    x = MARGIN + 30
    s.add(text(x, 112, 700, H_CAP, "IEEE CONFERENCE ON GAMES (CoG) 2021", size=T_CAPTION,
               bold=True, color=ON_DARK_MUTED, letter_spacing=2.4, line_height=LH_TIGHT),
          text(x, 148, 1100, lh_px(T_HERO), "Story Validator", size=T_HERO, bold=True,
               color=ON_DARK, line_height=LH_TIGHT),
          text(x, 244, 1100, lh_px(T_HERO_SUB), "Validating the plot of Interactive Narrative games",
               size=T_HERO_SUB, color=ON_DARK_SOFT, line_height=LH_TIGHT),
          zone="chrome")

    s.add(rect(x, 318, 4, 80, fill=PURPLE_LINE),
          text(x + 22, 320, 900, lh_px(T_CARD_HEAD, 2, LH_BODY),
               "“ถ้าเรื่องหนึ่งมี 14 ฉากและ 20 เส้นทาง\n"
               "จะรู้ได้อย่างไรว่าทุกเส้นทางเดินไปถึงฉากจบจริง”",
               size=T_CARD_HEAD, bold=True, color=ON_DARK, line_height=LH_BODY),
          zone="chrome")

    s.add(line(x, 468, CONTENT_R - x, color=DARK_LINE),
          text(x, 492, 620, H_BODY, "Carolina Veloso · Rui Prada", size=T_BODY, bold=True,
               color=ON_DARK, line_height=LH_TIGHT),
          text(x, 520, 620, H_CAP, "INESC-ID / Instituto Superior Técnico, Universidade de Lisboa",
               size=T_CAPTION, color=ON_DARK_MUTED, line_height=LH_TIGHT),
          text(x, 546, 620, H_CAP, DOI, size=T_CAPTION, color=ON_DARK_MUTED,
               line_height=LH_TIGHT),
          zone="chrome")

    s.add(rect(760, 484, CONTENT_R - 760, 88, fill=DARK_CARD, stroke=DARK_LINE, radius=10),
          text(780, 502, CONTENT_R - 800, H_BODY, "นายธีรภัทร ภู่ระย้า · รหัสนิสิต 663624",
               size=T_BODY, bold=True, color=ON_DARK, align="right", line_height=LH_TIGHT),
          text(780, 530, CONTENT_R - 800, H_CAP, "305432 เครือข่ายเซนเซอร์ · นำเสนอบทความที่ 2",
               size=T_CAPTION, color=ON_DARK_SOFT, align="right", line_height=LH_TIGHT),
          zone="chrome")

    s.notes = (
        "0:00-0:35 | เปิดด้วยคำถาม: ถ้าเรื่องมี 14 ฉากและ 20 เส้นทาง จะรู้ได้อย่างไรว่าทุกเส้นทางจบได้จริง "
        "แนะนำบทความ Validating the plot of Interactive Narrative games ของ Carolina Veloso และ Rui Prada "
        "จาก INESC-ID เสนอในงาน IEEE Conference on Games 2021 ยังไม่ลงรายละเอียดเทคนิค"
    )
    return s


# ------------------------------------------------------------------ slide 02
def slide_problem() -> Slide:
    s = content_slide("ปัญหา: ทำไมการตรวจโครงเรื่องด้วยสายตาจึงไม่พอ", 1, TOTAL,
                      f"{CITE} · Section I, II · Fig. 1")

    s.add(figure(CONTENT_L, CONTENT_TOP, 660, 296, ASSETS / "fig1_twine_storyboard.png",
                 "Fig. 1 bird's-eye view of a Twine storyboard"))
    s.add(caption(CONTENT_L, 436, 660,
                  "Fig. 1 — ผังเรื่องใน Twine ของจริง: โหนดและลิงก์พันกันจนไล่ด้วยสายตาไม่ครบ"))

    s.add(card(CONTENT_L, 468, 660, 144, fill=AMBER_TINT, stroke=AMBER_LINE))
    s.add(text(CONTENT_L + 24, 486, 180, lh_px(T_METRIC), "76%", size=T_METRIC, bold=True,
               color=AMBER, align="center", line_height=LH_TIGHT))
    s.add(text(CONTENT_L + 24, 552, 180, H_MICRO, "ของผู้ตอบแบบสอบถาม", size=T_MICRO,
               color=INK_MUTED, align="center", line_height=LH_TIGHT))
    s.add(text(CONTENT_L + 226, 486, 410, lh_px(T_BODY, 3, LH_LOOSE),
               "ยังเขียนบทเกมด้วยโปรแกรมพิมพ์เอกสารทั่วไป\n"
               "(Word, Google Docs, LibreOffice Writer)\n"
               "มีเพียง 24% ที่เคยใช้เครื่องมืออย่าง Twine",
               size=T_BODY, color=INK, line_height=LH_LOOSE))

    items = [
        ("Authorial Intent vs Player Agency", "สารที่ผู้แต่งอยากสื่อ ปะทะกับอิสระของผู้เล่น"),
        ("State-Space Explosion", "เพิ่มทางเลือกไม่กี่จุด เส้นทางทวีคูณจนไล่ไม่ไหว"),
        ("Guarded Links และตัวแปรสถานะ", "ค่าที่สะสมระหว่างทาง ล็อกและปลดล็อกฉากข้างหน้า"),
        ("Playtesting กับคนจริงมีต้นทุนสูง", "Twine และ Ren’Py ช่วยพิมพ์บท แต่ไม่ตรวจโครงสร้าง"),
    ]
    for i, (head, body) in enumerate(items):
        s.add(feature_card(COL_R_X, CONTENT_TOP + i * 122, COL_R_W, head, body,
                           accent=AMBER if i == 1 else PURPLE))

    s.notes = (
        "0:35-1:30 | ความท้าทายสี่ข้อของ Interactive Narrative: ความตั้งใจของผู้แต่งปะทะอิสระของผู้เล่น, "
        "การแตกกิ่งแบบทวีคูณ, ตัวแปรสถานะที่ผูกเงื่อนไขกับลิงก์, และต้นทุน playtesting "
        "ภาพซ้ายคือ Fig. 1 ผังเรื่องจริงใน Twine ชี้ให้เห็นว่ามนุษย์ไล่ตรวจด้วยตาเปล่าไม่ครบ "
        "ปิดท้ายด้วยผลสำรวจในบทความ 76% ยังเขียนบทด้วยโปรแกรมพิมพ์เอกสาร มีเพียง 24% ที่เคยใช้ Twine"
    )
    return s


# ------------------------------------------------------------------ slide 03
def slide_model() -> Slide:
    s = content_slide("แบบจำลองกราฟ และตัวชี้วัดโครงเรื่อง 5 มิติ", 2, TOTAL,
                      f"{CITE} · Section IV, V · Fig. 3")

    chips = ["เรื่องจาก Twine (story.json)", "ท่องกราฟด้วย DFS", "ตัวชี้วัด 5 มิติ + ผังภาพ"]
    cx = CONTENT_L
    for i, label in enumerate(chips):
        s.add(rect(cx, CONTENT_TOP, 352, 54, fill=PURPLE_TINT, stroke=PURPLE_LINE, radius=10))
        s.add(text(cx + 14, CONTENT_TOP + 15, 324, H_BODY, label, size=T_BODY, bold=True,
                   color=PURPLE, align="center", line_height=LH_TIGHT))
        cx += 352
        if i < len(chips) - 1:
            s.add(arrow(cx + 10, CONTENT_TOP + 27, 36))
            cx += 56

    s.add(text(CONTENT_L, 200, HALF_W, H_HEAD, "Passage = Node · Link = Guarded Edge",
               size=T_CARD_HEAD, bold=True, color=INK, line_height=LH_TIGHT))
    s.add(figure(CONTENT_L, 236, HALF_W, 318, ASSETS / "fig3_architecture.png",
                 "Fig. 3 general architecture of the Story Validator tool"))
    s.add(caption(CONTENT_L, 562, HALF_W, lines=2,
                  txt="Fig. 3 — สถาปัตยกรรมเครื่องมือ: โหลด story.json → DFS → ตัวชี้วัด\n"
                      "→ ผังภาพ GraphViz และรายงาน PDF"))

    s.add(text(HALF_R_X, 200, HALF_W, H_HEAD, "ตัวชี้วัดโครงเรื่อง 5 มิติ (Section IV)",
               size=T_CARD_HEAD, bold=True, color=INK, line_height=LH_TIGHT))
    metrics = [
        ("Total Narrative Paths", "นับทุกเส้นทางจากจุดเริ่มต้นถึงฉากจบ"),
        ("Stroke Points", "ฉากที่ทุกเส้นทางต้องผ่าน จึงข้ามไม่ได้"),
        ("Lost Plot และ Dead-Ends", "ฉากที่เข้าไม่ถึง และเส้นทางที่ไปไม่ถึงฉากจบ"),
        ("Evolution of Variables", "ไทม์ไลน์ค่าตัวแปรตลอดเส้นทางที่เลือก"),
        ("Endings Hit Percentage", "สัดส่วนการเข้าถึงฉากจบแต่ละแบบ"),
    ]
    for i, (head, body) in enumerate(metrics):
        s.add(numbered_row(HALF_R_X, 240 + i * 70, HALF_W, 62, i + 1, head, body))

    s.notes = (
        "1:30-2:45 | แบบจำลอง: Passage เป็น Node, Link เป็น Directed Edge ที่กำกับด้วยเงื่อนไขตัวแปร "
        "เครื่องมือใช้ Depth-First Search ท่องกราฟเพื่อสร้าง playthrough ทุกเส้นทาง แล้วสรุปเป็นตัวชี้วัดห้ามิติ "
        "เน้นอธิบาย Lost Plot กับ Dead-End ให้ชัด: Lost Plot คือฉากที่ไม่มีเส้นทางใดไปถึง "
        "ส่วน Dead-End คือฉากที่ไม่มีลิงก์ออกและไม่ได้ติดแท็ก ENDING-POINT"
    )
    return s


# ------------------------------------------------------------------ slide 04
def slide_case() -> Slide:
    s = content_slide("กรณีทดสอบ The Murder Case และการจำลองผู้เล่น", 3, TOTAL,
                      f"{CITE} · Section V, VI-A · Fig. 8")

    s.add(figure(CONTENT_L, CONTENT_TOP, 660, 396, ASSETS / "fig8_problem_analysis.png",
                 "Fig. 8 analysing problems 1 and 3 in the failed version"))
    s.add(text(CONTENT_L, 536, 660, H_CAP2,
               "Fig. 8 — ฉบับที่จงใจใส่บั๊ก: Path Dialog Tree เผยว่าหลัง “Choice 5”\n"
               "ไม่มีฉากต่อ เส้นทางจึงหยุดกลางคัน (Dead-End)",
               size=T_CAPTION, color=INK_MUTED, line_height=LH_BODY))

    tiles = [("14", "Passages", "ฉากในเรื่อง"), ("20", "Narrative Paths", "เส้นทางที่เป็นไปได้"),
             ("3", "Endings", "ฉากจบ"), ("3", "Variables", "โกรธ สับสน กลัว")]
    tw = (COL_R_W - 12) / 2
    for i, (value, label, sub) in enumerate(tiles):
        s.add(metric_tile(COL_R_X + (i % 2) * (tw + 12), CONTENT_TOP + (i // 2) * 104,
                          tw, 92, value, label, sub=sub,
                          color=PURPLE if i < 2 else INK))

    s.add(card(COL_R_X, 340, COL_R_W, 108, fill=AMBER_TINT, stroke=AMBER_LINE, accent=AMBER))
    s.add(text(COL_R_X + 20, 352, COL_R_W - 40, H_HEAD, "TMC – failed version: บั๊ก 5 จุด",
               size=T_CARD_HEAD, bold=True, color=AMBER, line_height=LH_TIGHT))
    s.add(bullets(COL_R_X + 20, 388, COL_R_W - 40, 58, [
        "Path #7, #8, #14 เดินไปไม่ถึงฉากจบ",
        "Ending 1 และ Choice 6 ไม่มีเส้นทางใดเข้าถึง",
    ], size=T_BODY_SM, color=INK, bullet_color=AMBER, gap=4))

    s.add(card(COL_R_X, 460, COL_R_W, 152, fill=PURPLE_TINT, stroke=PURPLE_LINE, accent=PURPLE))
    s.add(text(COL_R_X + 20, 470, COL_R_W - 40, H_HEAD, "Player Persona · Greedy Search",
               size=T_CARD_HEAD, bold=True, color=PURPLE, line_height=LH_TIGHT))
    s.add(text(COL_R_X + 20, 508, COL_R_W - 40, lh_px(T_CARD_HEAD, 1, LH_BODY),
               math("*total*_{ℓ} = Σ_{i=1}^{n} *v*_{i,ℓ} · *w*_{i}",
                    color=INK, size=T_CARD_HEAD),
               size=T_CARD_HEAD, color=INK, line_height=LH_BODY))
    s.add(text(COL_R_X + 20, 548, COL_R_W - 40, H_CAP,
               [Run("v", italic=True, color=INK_SOFT), Run("i,ℓ", color=INK_SOFT, baseline="sub"),
                Run(" = ผลต่างตัวแปรบนลิงก์", color=INK_SOFT), Run("   ·   ", color=INK_MUTED),
                Run("w", italic=True, color=INK_SOFT), Run("i", color=INK_SOFT, baseline="sub"),
                Run(" = น้ำหนัก persona", color=INK_SOFT)],
               size=T_CAPTION, line_height=LH_TIGHT))
    s.add(text(COL_R_X + 20, 576, COL_R_W - 40, H_MICRO,
               "ตัวอย่างน้ำหนัก: fear 75% · confusion 15% · anger 5%",
               size=T_MICRO, color=INK_MUTED, line_height=LH_TIGHT))

    s.notes = (
        "2:45-3:45 | เรื่องทดสอบชื่อ The Murder Case สร้างบน Twine ผู้เล่นเป็นนักสืบสอบปากคำผู้ต้องสงสัย "
        "มี 14 Passages, 20 เส้นทาง, 3 ฉากจบ และตัวแปรอารมณ์สามตัวคือ anger, confusion, fear "
        "ผู้เขียนทำฉบับ TMC failed version ที่จงใจใส่บั๊กห้าจุด "
        "ส่วน Player Persona ใช้ informed greedy search ให้ผู้แต่งกำหนดน้ำหนักของแต่ละตัวแปร "
        "แล้วเลือกลิงก์ที่ได้ผลรวมถ่วงน้ำหนักสูงสุดในแต่ละก้าว จึงจำลองสไตล์ผู้เล่นได้"
    )
    return s


# ------------------------------------------------------------------ slide 05
def slide_results() -> Slide:
    s = content_slide("ผลการประเมินเชิงประจักษ์กับผู้ใช้ 20 คน", 4, TOTAL,
                      f"{CITE} · Section VI-B, VI-C (User Study 2)")

    cw = 556
    rx = CONTENT_L + cw + 56
    s.add(text(CONTENT_L, CONTENT_TOP, cw, H_HEAD, "เวลาเฉลี่ยต่อภารกิจ (วินาที)",
               size=T_CARD_HEAD, bold=True, color=INK, line_height=LH_TIGHT))
    s.add(chart(CONTENT_L, 170, cw, 250,
                categories=["ตรวจพบบั๊กครบ 5 จุด", "เสนอวิธีแก้ไข"],
                series=[{"name": "วินาที", "values": [52.3, 146.2], "colors": [PURPLE, AMBER]}],
                ymax=160, ystep=40, axis_unit=" s"))
    s.add(caption(CONTENT_L, 428, cw, "SD = 22.66 s และ 31.84 s ตามลำดับ · ผู้เข้าร่วม 20 คน"))

    s.add(text(rx, CONTENT_TOP, cw, H_HEAD, "คะแนนความง่ายในการใช้งาน (SUS)",
               size=T_CARD_HEAD, bold=True, color=INK, line_height=LH_TIGHT))
    s.add(chart(rx, 170, cw, 250,
                categories=["Study 1 (5 คน)", "Study 2 (20 คน)"],
                series=[{"name": "SUS", "values": [83.5, 92.4], "colors": ["#A78BFA", PURPLE]}],
                ymax=100, ystep=25))
    s.add(caption(rx, 428, cw, "เกณฑ์ Bangor et al. [22]: ≥ 80.3 จัดเป็น Truly Superior"))

    s.add(card(CONTENT_L, 460, CONTENT_W, 152, accent=PURPLE))
    s.add(text(CONTENT_L + 22, 472, 600, H_HEAD, "สิ่งที่ตัวเลขบอก และไม่ได้บอก",
               size=T_CARD_HEAD, bold=True, color=INK, line_height=LH_TIGHT))
    s.add(bullets(CONTENT_L + 22, 508, 600, 102, [
        "ผู้ใช้ 100% พบบั๊กที่ 1, 3, 4, 5 ด้วยฟังก์ชัน Lost Plot",
        "3 คน (15%) พลาดบั๊กที่ 2 เพราะไล่ดูผังด้วยสายตาแทนตัวกรอง",
        "SUS เพิ่มจาก 83.5 เป็น 92.4 หลังเพิ่ม Tooltips และ Print Report",
    ], size=T_BODY, color=INK_SOFT, gap=7))
    s.add(rect(720, 492, 504, 104, fill=AMBER_TINT, stroke=AMBER_LINE, radius=10))
    s.add(text(742, 514, 460, lh_px(T_BODY_SM, 2, LH_LOOSE),
               "ตัวเลขทั้งหมดวัดตอน “มีเครื่องมือ” เท่านั้น\n"
               "บทความไม่ได้วัดเวลาของกลุ่มที่ไม่ใช้เครื่องมือ",
               size=T_BODY_SM, bold=True, color=AMBER, line_height=LH_LOOSE))

    s.notes = (
        "3:45-4:55 | User Study 2 มีผู้เข้าร่วม 20 คน หญิง 8 ชาย 12 "
        "เวลาเฉลี่ยในการระบุบั๊กครบทั้งห้าจุดคือ 52.3 วินาที ส่วนเบี่ยงเบนมาตรฐาน 22.66 "
        "เวลาเฉลี่ยในการเสนอวิธีแก้คือ 146.2 วินาที ส่วนเบี่ยงเบนมาตรฐาน 31.84 "
        "คะแนน SUS เพิ่มจาก 83.5 ใน Study 1 เป็น 92.4 ใน Study 2 ซึ่งเข้าเกณฑ์ truly superior "
        "จุดที่ต้องพูดให้ตรง: ตัวเลขนี้วัดตอนมีเครื่องมือเท่านั้น ไม่มีกลุ่มเปรียบเทียบที่ไม่ใช้เครื่องมือ"
    )
    return s


# ------------------------------------------------------------------ slide 06
def slide_contribution() -> Slide:
    s = content_slide("Contribution และการต่อยอดเชิงวิศวกรรมซอฟต์แวร์", 5, TOTAL,
                      f"{CITE} · Section IV, V, VII")

    s.add(text(CONTENT_L, CONTENT_TOP, HALF_W, H_HEAD, "Contribution หลัก 3 ข้อ",
               size=T_CARD_HEAD, bold=True, color=INK, line_height=LH_TIGHT))
    contribs = [
        ("นิยามตัวชี้วัดโครงเรื่องให้วัดได้", "เปลี่ยนคุณภาพเชิงบรรยายเป็นตัวเลขที่ตรวจซ้ำได้"),
        ("ระบบตรวจโครงเรื่องอัตโนมัติ", "DFS และ GraphViz ชี้ Dead-End กับฉากที่เข้าไม่ถึง"),
        ("จำลองผู้เล่นด้วย Persona", "ถ่วงน้ำหนักตัวแปรเพื่อทดสอบตามสไตล์การเล่น"),
    ]
    for i, (head, body) in enumerate(contribs):
        s.add(feature_card(CONTENT_L, 172 + i * 128, HALF_W, head, body, h=104))

    s.add(text(HALF_R_X, CONTENT_TOP, HALF_W, H_HEAD, "แมปสู่สถาปัตยกรรมเอนจินเกมเชิงโต้ตอบ",
               size=T_CARD_HEAD, bold=True, color=INK, line_height=LH_TIGHT))
    rows = [
        ("Passage", "Block หรือโหนดฉากในเอนจิน"),
        ("Guarded Link", "เงื่อนไขที่ตรวจก่อนเปิดทางเลือก"),
        ("Story Variables", "Runtime state ที่ติดตามระหว่างเล่น"),
        ("DFS + Metrics", "ขั้นตอน Verification ในสาย QA"),
    ]
    for i, (left, right) in enumerate(rows):
        s.add(map_row(HALF_R_X, 172 + i * 62, HALF_W, 56, left, right))

    s.add(card(HALF_R_X, 428, HALF_W, 104, fill=AMBER_TINT, stroke=AMBER_LINE, accent=AMBER))
    s.add(text(HALF_R_X + 20, 440, HALF_W - 40, H_HEAD, "ช่องว่างของเครื่องมือปัจจุบัน",
               size=T_CARD_HEAD, bold=True, color=AMBER, line_height=LH_TIGHT))
    s.add(text(HALF_R_X + 20, 476, HALF_W - 40, H_SM2,
               "ตรวจได้ว่ามีฉากและทรัพยากรครบ แต่ไม่ตรวจว่า\nทุกเส้นทางเดินไปถึงฉากจบได้จริงหรือไม่",
               size=T_BODY_SM, color=INK, line_height=LH_BODY))

    s.add(rect(CONTENT_L, 552, CONTENT_W, 60, fill=PURPLE_TINT, stroke=PURPLE_LINE, radius=10))
    s.add(rect(CONTENT_L, 552, 4, 60, fill=PURPLE))
    s.add(text(CONTENT_L + 26, 566, CONTENT_W - 52, H_HEAD,
               "คุณค่าหลัก: เปลี่ยนการตรวจบทจากการอ่านด้วยสายตา ให้เป็นการตรวจสอบกราฟที่ทำซ้ำได้",
               size=T_CARD_HEAD, bold=True, color=PURPLE, align="center", line_height=LH_TIGHT))

    s.notes = (
        "4:55-5:55 | Contribution สามข้อ: นิยามตัวชี้วัดโครงเรื่อง, สร้างระบบตรวจอัตโนมัติ, และจำลองผู้เล่นด้วย persona "
        "คุณค่าเชิงวิศวกรรมคือโมเดล Passage-Link-Variable แมปเข้ากับเอนจินเล่าเรื่องได้ตรง ๆ "
        "ช่องว่างของเครื่องมือปัจจุบันคือตรวจแค่ว่าทรัพยากรครบ แต่ไม่ตรวจความครบถ้วนของเส้นทาง "
        "งานนี้จึงเป็นพิมพ์เขียวของขั้นตอน verification ในสาย QA ก่อนปล่อยเนื้อหา"
    )
    return s


# ------------------------------------------------------------------ slide 07
def slide_limits() -> Slide:
    s = content_slide("ข้อจำกัดที่ต้องวิจารณ์ และบทสรุป", 6, TOTAL, f"{CITE} · {DOI}", dark=True)

    limits = [
        ("1", "ไม่มีกลุ่มควบคุมเปรียบเทียบ (No Control Baseline)",
         "วัดได้ว่าเมื่อมีเครื่องมือใช้เวลาเท่าใด แต่ไม่ได้วัดว่าถ้าไม่ใช้จะนานแค่ไหน"),
        ("2", "DFS เสี่ยงต่อ State-Space Explosion",
         "ไม่มีรายงานเวลาประมวลผลบนกราฟขนาดใหญ่ที่มีหลายร้อยโหนดและมี Loop"),
        ("3", "บั๊กทั้ง 5 จุดแก้ได้ด้วย Lost Plot อย่างเดียว",
         "Stroke Points และ Endings Hit Percentage จึงยังไม่ถูกทดสอบในสถานการณ์จริง"),
    ]
    lw = 736
    for i, (num, head, body) in enumerate(limits):
        y = CONTENT_TOP + i * 120
        s.add(rect(CONTENT_L, y, lw, 108, fill=DARK_CARD, stroke=DARK_LINE, radius=10))
        s.add(rect(CONTENT_L, y, 4, 108, fill=PURPLE_LINE))
        s.add(text(CONTENT_L + 22, y + 13, 34, H_HEAD, num, size=T_CARD_HEAD, bold=True,
                   color=PURPLE_LINE, line_height=LH_TIGHT))
        s.add(text(CONTENT_L + 56, y + 13, lw - 80, H_HEAD, head, size=T_CARD_HEAD, bold=True,
                   color=ON_DARK, line_height=LH_TIGHT))
        s.add(text(CONTENT_L + 56, y + 48, lw - 80, H_SM2, body, size=T_BODY_SM,
                   color=ON_DARK_SOFT, line_height=LH_BODY))

    rx, rw = CONTENT_L + lw + 20, CONTENT_R - (CONTENT_L + lw + 20)
    s.add(rect(rx, CONTENT_TOP, rw, 150, fill=DARK_CARD, stroke=PURPLE_LINE, radius=10))
    s.add(text(rx, 150, rw, lh_px(T_METRIC), "52.3 s", size=T_METRIC, bold=True,
               color=PURPLE_LINE, align="center", line_height=LH_TIGHT))
    s.add(text(rx + 18, 218, rw - 36, H_SM2,
               "คือเวลา “เมื่อมีเครื่องมือ”\nไม่ใช่ “เร็วกว่าเดิมกี่เท่า”",
               size=T_BODY_SM, color=ON_DARK_SOFT, align="center", line_height=LH_BODY))

    s.add(rect(rx, 294, rw, 186, fill=DARK_CARD, stroke=DARK_LINE, radius=10))
    s.add(text(rx + 20, 308, rw - 40, H_HEAD, "ขอบเขตของหลักฐาน", size=T_CARD_HEAD, bold=True,
               color=ON_DARK, line_height=LH_TIGHT))
    s.add(bullets(rx + 20, 346, rw - 40, 96, [
        "ทดสอบกับเรื่องเดียว ขนาด 14 ฉาก",
        "ผู้ใช้ 20 คน ส่วนใหญ่เป็นผู้เล่นเกม",
        "ยังไม่ทดสอบกับเกมเชิงพาณิชย์",
    ], size=T_BODY_SM, color=ON_DARK_SOFT, bullet_color=PURPLE_LINE, gap=7))

    s.add(rect(CONTENT_L, 498, CONTENT_W, 114, fill=DARK_CARD, stroke=PURPLE_LINE, radius=10))
    s.add(rect(CONTENT_L, 498, 4, 114, fill=PURPLE_LINE))
    s.add(text(CONTENT_L + 28, 540, 110, H_HEAD, "บทสรุป", size=T_CARD_HEAD, bold=True,
               color=PURPLE_LINE, line_height=LH_TIGHT))
    s.add(text(CONTENT_L + 150, 522, CONTENT_W - 190, lh_px(T_CARD_HEAD, 2, LH_BODY),
               "Story Validator เปลี่ยนการตรวจโครงเรื่องให้เป็นโจทย์วิศวกรรมที่วัดผลได้\n"
               "แต่ยังต้องพิสูจน์กับกราฟขนาดใหญ่และมีกลุ่มเปรียบเทียบ ก่อนนำไปใช้งานจริง",
               size=T_CARD_HEAD, bold=True, color=ON_DARK, line_height=LH_BODY))

    s.notes = (
        "5:55-6:45 | วิจารณ์สามข้อ: หนึ่ง ไม่มีกลุ่มควบคุม จึงบอกได้แค่ว่าเครื่องมือใช้งานได้ ไม่ใช่ว่าเร็วกว่าเดิมกี่เท่า "
        "สอง DFS เสี่ยง state-space explosion และบทความไม่รายงานเวลาบนกราฟใหญ่ "
        "สาม บั๊กทั้งห้าจุดแก้ได้ด้วย Lost Plot อย่างเดียว ตัวชี้วัดอื่นจึงยังไม่ถูกพิสูจน์ "
        "สรุป: งานนี้เปลี่ยนการตรวจโครงเรื่องให้เป็นโจทย์วิศวกรรมที่วัดผลได้ แต่หลักฐานยังจำกัด จบการนำเสนอและเปิดให้ซักถาม"
    )
    return s


def build_deck() -> list[Slide]:
    return [slide_cover(), slide_problem(), slide_model(), slide_case(),
            slide_results(), slide_contribution(), slide_limits()]
