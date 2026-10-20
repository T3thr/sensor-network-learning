# scratch/assemble_paper3_translation.py
# Assemble paper-3/translation.html with strict quality checks
import os, sys, re

# Import page modules
sys.path.insert(0, os.path.dirname(__file__))
from gen_p1_4 import get_page_1, get_page_2, get_page_3, get_page_4
from gen_p5_8 import get_page_5, get_page_6, get_page_7, get_page_8
from gen_p9_12 import get_page_9, get_page_10, get_page_11, get_page_12
from gen_p13_16 import get_page_13, get_page_14, get_page_15, get_page_16

def assemble_html():
    header_html = """<!DOCTYPE html>
<html lang="th" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>อ่านบทความวิจัยแปลไทยคู่ขนาน (Compare View 16 หน้า) · OmniLedger (IEEE S&amp;P 2018) · 305432 เครือข่ายเซนเซอร์</title>
  <meta name="description" content="อ่านบทความวิจัยต้นฉบับ OmniLedger (IEEE S&amp;P 2018) ฉบับแปลไทยเจาะลึกแบบเทียบเคียงต้นฉบับ 1:1 ครบทั้ง 16 หน้า แปลละเอียดทุกย่อหน้า พร้อมบทวิเคราะห์สูตร ตาราง และเทคนิคการนำเสนอหน้าชั้นเรียน">

  <!-- Google Fonts: IBM Plex Sans Thai & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <!-- Main & Interactive Stylesheets -->
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/interactive.css">
  <script src="../assets/js/header-component.js"></script>

  <style>
    /* Clean Styling Adjustments for Paper III */
    .compare-top-controls {
      border-color: var(--rule);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    }
    .btn-mode-pill.active {
      background: var(--card-bg);
      color: var(--accent2);
      font-weight: 800;
      border: 1px solid var(--accent2);
    }
    .thai-page-badge-row .badge {
      font-size: 0.78rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }
    .thai-section-heading {
      color: var(--ink);
      font-size: 1.30rem;
      font-weight: 800;
      line-height: 1.4;
      margin: 14px 0 16px;
      border-bottom: 2px solid var(--rule);
      padding-bottom: 8px;
    }
    .thai-summary-box {
      background: var(--accent2-bg);
      border-left: 4px solid var(--accent2);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      color: var(--ink);
    }
    .exam-cue-card {
      border: 1.5px solid var(--purple-light);
      border-left: 4px solid var(--purple);
      background: var(--card-bg);
    }
    .trans-section-unit {
      border-color: var(--rule);
      background: var(--card-bg);
    }
    .trans-section-unit:hover {
      border-color: var(--accent2);
    }
    .original-en-quote {
      border-left-color: var(--accent2);
      background: var(--paper);
    }
    .formula-display-box {
      font-family: 'Cambria Math', 'STIX Two Math', 'Times New Roman', serif;
      font-size: 0.96rem;
      line-height: 1.7;
      background: var(--paper2);
      border: 1px solid var(--rule);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      margin: 12px 0;
      color: var(--ink);
    }
    .academic-table th {
      color: var(--ink);
      font-weight: 700;
    }
    .academic-table td {
      color: var(--ink-soft);
    }
    .badge-accent {
      background: var(--accent2);
      color: #FFFFFF;
    }
  </style>
</head>
<body data-paper="omniledger">

<!-- ═══════════ Unified Standardized Header Component ═══════════ -->
<site-header data-page="translation-3" data-base="../"></site-header>

<!-- ═══════════ Main Container ═══════════ -->
<div class="compare-view-container">
  
  <!-- Breadcrumb -->
  <div class="breadcrumb" style="margin-bottom: 12px;">
    <a href="../index.html">หน้าหลัก Portal</a>
    <span class="sep">/</span>
    <a href="index.html">Paper III: OmniLedger</a>
    <span class="sep">/</span>
    <span>อ่านบทความแปลไทยฉบับสมบูรณ์ (Compare View 16 หน้า ละเอียดครบทุกย่อหน้า)</span>
  </div>

  <!-- Page Title & Header Banner -->
  <div style="margin-bottom: 20px;">
    <h1 class="book-title" style="font-size: 1.65rem; margin-bottom: 8px;">
      OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding
    </h1>
    <div class="subtitle" style="font-size: 0.96rem; margin-bottom: 14px; line-height: 1.7;">
      บทความวิจัยตัวจริงจากการประชุมวิชาการระดับสากล 2018 IEEE Symposium on Security and Privacy (S&amp;P) : ถอดความภาษาไทยเจาะลึก 1:1 เทียบเคียงหน้าต่อหน้า ละเอียดครบทุกย่อหน้า ครอบคลุม Abstract, Section I ถึง X, และ Appendix A ถึง D พร้อมการวิเคราะห์สูตร ตารางการทดลอง และจุดบกพร่องที่ตรวจพบจริง
    </div>
  </div>

  <!-- ═══════════ Top Control Bar (View Mode & Study Mode) ═══════════ -->
  <div class="compare-top-controls">
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <span style="font-size: 0.82rem; font-weight: 700; color: var(--ink-muted);">โหมดการแสดงผล:</span>
      <div class="view-mode-group">
        <button class="btn-mode-pill active" id="view-mode-compare" title="แสดงต้นฉบับคู่กับบทแปลไทย 50:50">Compare View (มุมมองคู่ขนาน)</button>
        <button class="btn-mode-pill" id="view-mode-thai" title="แสดงเฉพาะบทแปลภาษาไทย">แปลไทยเจาะลึก (Thai Only)</button>
        <button class="btn-mode-pill" id="view-mode-paper" title="แสดงเฉพาะเปเปอร์ต้นฉบับ">เปเปอร์ต้นฉบับ (Original Paper)</button>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <span style="font-size: 0.82rem; font-weight: 700; color: var(--ink-muted);">ระดับเนื้อหา:</span>
      <div class="study-mode-group">
        <button class="btn-mode-pill" id="study-mode-summary" title="แสดงสรุปสาระสำคัญประจำหน้า">สรุปสาระสำคัญ (Summary)</button>
        <button class="btn-mode-pill active" id="study-mode-trans" title="แสดงคำแปลละเอียดทุกย่อหน้า">แปลละเอียดทุกย่อหน้า (Detailed)</button>
      </div>

      <a href="index.html#sec-rehearsal" class="btn btn-secondary" style="padding: 5px 12px; font-size: 0.80rem; text-decoration: none;">
        สลับไปห้องซ้อมนำเสนอ 5 นาที (Rehearsal Studio) &rarr;
      </a>
    </div>
  </div>

  <!-- ═══════════ Compare Grid (Dual Pane: Paper Left + Thai Right) ═══════════ -->
  <div class="compare-grid" id="compare-grid" data-max-pages="16" data-paper-label="IEEE S&amp;P 2018" data-paper-alt="OmniLedger Page" data-storage-prefix="sn_paper3">
    
    <!-- Left: Original Paper Pane -->
    <section class="compare-paper-pane" id="compare-paper-pane">
      <div class="compare-pane-header">
        <span id="compare-paper-page-label">IEEE S&amp;P 2018 · หน้า 1 จาก 16</span>
        <div style="display: flex; gap: 6px;">
          <a href="../assignement/work3/01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf" target="_blank" class="btn btn-secondary" style="padding: 2px 8px; font-size: 0.74rem;">
            เปิดไฟล์ PDF เต็ม &nearr;
          </a>
        </div>
      </div>
      <div class="compare-paper-img-box" id="compare-paper-img-box">
        <img id="compare-paper-img" class="compare-paper-img" src="assets/pages/page-1.png" alt="OmniLedger Page 1">
      </div>
    </section>

    <!-- Right: Thai Study & Translation Pane -->
    <section class="compare-thai-pane" id="compare-thai-pane">
"""

    footer_html = """
    </section>
  </div>
</div>

<!-- ═══════════ Persistent Learning Dock ═══════════ -->
<div class="learning-dock">
  <div class="dock-left">
    <button class="btn btn-secondary" id="dock-btn-prev" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 700;">
      &larr; หน้าก่อนหน้า
    </button>
    <span id="dock-current-page-text" style="font-family: var(--font-mono); font-size: 0.84rem; font-weight: 700; color: var(--accent2);">
      หน้า 1 จาก 16
    </span>
    <button class="btn btn-secondary" id="dock-btn-next" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 700;">
      หน้าถัดไป &rarr;
    </button>
  </div>

  <div class="dock-center">
    <span style="font-size: 0.78rem; color: var(--ink-muted); margin-right: 4px;">ข้ามไปหน้า:</span>
    <select class="dock-page-dropdown" id="dock-page-select">
      <option value="1">หน้า 1: ชื่อบทความ คณะผู้ประพันธ์ บทคัดย่อ และบทนำ (Sec. I)</option>
      <option value="2">หน้า 2: 6 นวัตกรรมหลัก และรากฐานเทคโนโลยี (Sec. II.A-D)</option>
      <option value="3">หน้า 3: ข้อบกพร่องของ Elastico และ Threat Model (Sec. II.E, III)</option>
      <option value="4">หน้า 4: ภาพรวมสถาปัตยกรรม Fig. 2 Overview (Sec. IV.A)</option>
      <option value="5">หน้า 5: ค่าสุ่ม RandHound, VRF และหน้าต่างเลื่อน (Sec. IV.A-B)</option>
      <option value="6">หน้า 6: โปรโตคอลธุรกรรมข้าม Shard Atomix (Sec. IV.C, Fig. 3)</option>
      <option value="7">หน้า 7: การกู้คืนความล้มเหลว Atomix และ ByzCoinX (Sec. IV.C, V.A-B)</option>
      <option value="8">หน้า 8: State Blocks และระบบ Trust-but-Verify (Sec. V.C-D)</option>
      <option value="9">หน้า 9: การวิเคราะห์ความปลอดภัย และข้อบกพร่องใน Eq. (1) (Sec. VI.A-B)</option>
      <option value="10">หน้า 10: การทดลอง DeterLab 1,800 โหนด และตาราง Table I (Sec. VII, VIII.A)</option>
      <option value="11">หน้า 11: Throughput ตาราง Table II และต้นทุน Epoch (Sec. VIII.B-E)</option>
      <option value="12">หน้า 12: สมรรถนะ ByzCoinX Table III และ State Blocks (Sec. VIII.E-F)</option>
      <option value="13">หน้า 13: ตารางเปรียบเทียบ Table IV และข้อจำกัดที่ยอมรับจริง (Sec. IX, X)</option>
      <option value="14">หน้า 14: คลังเอกสารอ้างอิงมาตรฐานสากล 67 รายการ (References [1]-[67])</option>
      <option value="15">หน้า 15: Appendix A-C บทพิสูจน์ และอัตราเร่งลดเหลือ 1.56 เท่า</option>
      <option value="16">หน้า 16: Appendix D Stateful Objects และบทสังเคราะห์ทางวิศวกรรม</option>
    </select>
  </div>

  <div class="dock-right">
    <button class="btn btn-secondary" id="dock-btn-bookmark" title="บันทึกหน้านี้" style="padding: 6px 12px; font-size: 0.84rem;">
      บันทึกหน้า (Bookmark)
    </button>
    <button class="btn btn-secondary" id="dock-btn-flag" title="ทำเครื่องหมายว่าต้องทบทวนเพิ่ม" style="padding: 6px 12px; font-size: 0.84rem;">
      ติดดาวทบทวน (Flag)
    </button>
    <a href="index.html#sec-rehearsal" class="btn btn-primary" style="padding: 6px 14px; font-size: 0.82rem; text-decoration: none; background: var(--accent2); border-color: var(--accent2);">
      ซ้อมพรีเซนต์ (Rehearsal Studio)
    </a>
    <a href="index.html" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.82rem; text-decoration: none;">
      &larr; สารบัญบทเรียน (Overview)
    </a>
  </div>
</div>

<!-- JavaScript Modules -->
<script src="../assets/js/common.js"></script>
<script src="../assets/js/translation.js"></script>
</body>
</html>
"""

    pages = [
        get_page_1(),
        get_page_2(),
        get_page_3(),
        get_page_4(),
        get_page_5(),
        get_page_6(),
        get_page_7(),
        get_page_8(),
        get_page_9(),
        get_page_10(),
        get_page_11(),
        get_page_12(),
        get_page_13(),
        get_page_14(),
        get_page_15(),
        get_page_16()
    ]

    full_html = header_html + "\n".join(pages) + footer_html
    return full_html

def validate_content(html):
    print("Running strict quality validations...")
    
    # Check 1: Zero-Emoji Policy
    # Regex matching emojis across standard unicode blocks
    emoji_pattern = re.compile(
        r'[\U00010000-\U0010ffff]|'
        r'[\u2600-\u27BF]|'
        r'[\u2300-\u23FF]|'
        r'[\u2B50-\u2B55]|'
        r'[\u203C\u2049\u2139\u2194-\u2199\u21A9-\u21AA\u2934\u2935\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE]'
    )
    emojis_found = emoji_pattern.findall(html)
    if emojis_found:
        print(f"FAILED: Found {len(emojis_found)} emojis in HTML: {set(emojis_found)}")
        return False
    else:
        print("PASSED: Zero emojis found.")

    # Check 2: Zero Em-Dash Policy (—, \u2014, &mdash;)
    em_dash_pattern = re.compile(r'—|\u2014|&mdash;')
    em_dashes_found = em_dash_pattern.findall(html)
    if em_dashes_found:
        print(f"FAILED: Found {len(emashes_found)} em-dashes in HTML!")
        return False
    else:
        print("PASSED: Zero em-dashes found.")

    # Check 3: Check all 16 pages exist
    for p in range(1, 17):
        assert f'data-page="{p}"' in html, f"Missing data-page={p}!"
    print("PASSED: All 16 pages present.")

    # Check 4: Check specific critical flaws highlighted
    assert "สมการที่ (1)" in html, "Missing Equation (1) flaw mention!"
    assert "62.96" in html, "Missing 62.96s latency flaw mention!"
    assert "1.56" in html, "Missing 1.56x acceleration drop mention!"
    assert "Table IV" in html, "Missing Table IV mention!"
    print("PASSED: Critical paper flaws and analysis highlighted.")

    return True

if __name__ == '__main__':
    html = assemble_html()
    if not validate_content(html):
        print("Validation failed! Aborting write.")
        sys.exit(1)

    targets = [
        "/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/paper-3/translation.html",
        "/Users/3rapat/student/universty/NU/project/senior/senior-subject/sensor-network/paper-3/translation.html"
    ]

    for t in targets:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        with open(t, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Successfully generated and synced: {t} ({len(html)} bytes)")

    print("ALL DONE SUCCESSFULLY!")
