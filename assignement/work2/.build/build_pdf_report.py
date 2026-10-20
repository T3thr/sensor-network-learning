import subprocess
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "02_report" / "Assignment_Paper_2_StoryValidator_Short_Report_TH.md"
OUTPUT_HTML = ROOT / ".build" / "report.html"
OUTPUT_PDF = ROOT / "02_report" / "Assignment_Paper_2_StoryValidator_Short_Report_TH.pdf"

md_content = SOURCE.read_text(encoding="utf-8")

lines = md_content.splitlines()

html_body = []
in_meta = False
in_table = False

for line in lines:
    line_s = line.strip()
    if not line_s:
        continue
    if line_s.startswith("# "):
        html_body.append(f"<h1 class='doc-title'>{line_s[2:]}</h1>")
        continue
    if line_s.startswith("**") and ":**" in line_s:
        formatted = re.sub(r"\*\*(.+?):\*\*", r"<span class='meta-label'>\1:</span>", line_s)
        html_body.append(f"<div class='meta-item'>{formatted}</div>")
        continue
    if line_s.startswith("## "):
        title = line_s[3:]
        if title == "1 ที่มาและปัญหาวิจัย":
            html_body.append("<div class='page-break'></div>")
        html_body.append(f"<h2 class='section-title'>{title}</h2>")
        continue
    if line_s.startswith("|") and line_s.endswith("|"):
        # We render table directly when we see caption or table
        continue
    if line_s.startswith("[") and re.match(r"\[\d+\]", line_s):
        html_body.append(f"<div class='ref-item'>{line_s}</div>")
        continue
    if "ผู้เขียนเก็บข้อมูลการทดสอบกับผู้ใช้ 20 คน" in line_s:
        html_body.append(f"<p>{line_s}</p>")
        table_html = """
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width: 48%; text-align: left;">ตัวชี้วัดการประเมิน (Metrics)</th>
                <th style="width: 32%; text-align: center;">ผลลัพธ์จากการทดลอง (User Study 2)</th>
                <th style="width: 20%; text-align: center;">ส่วนเบี่ยงเบน (SD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>เวลาเฉลี่ยในการตรวจพบปัญหาทั้ง 5 จุด</td>
                <td style="text-align: center; font-weight: bold; color: #173F5F;">52.3 วินาที</td>
                <td style="text-align: center;">22.66 วินาที</td>
              </tr>
              <tr>
                <td>เวลาเฉลี่ยในการเสนอวิธีแก้ไขปัญหา</td>
                <td style="text-align: center; font-weight: bold; color: #173F5F;">146.2 วินาที</td>
                <td style="text-align: center;">31.84 วินาที</td>
              </tr>
              <tr>
                <td>อัตราความสำเร็จในการพบปัญหาที่ 1, 3, 4, 5</td>
                <td style="text-align: center; font-weight: bold; color: #0F9D8B;">100% (20/20 คน)</td>
                <td style="text-align: center;">-</td>
              </tr>
              <tr>
                <td>อัตราความสำเร็จในการพบปัญหาที่ 2 (Looping)</td>
                <td style="text-align: center; font-weight: bold; color: #D94C4C;">85% (17/20 คน)</td>
                <td style="text-align: center;">-</td>
              </tr>
              <tr>
                <td>คะแนนความง่ายในการใช้งาน (SUS Score)</td>
                <td style="text-align: center; font-weight: bold; color: #173F5F;">92.4 คะแนน (Superior)</td>
                <td style="text-align: center;">4.76</td>
              </tr>
            </tbody>
          </table>
          <div class="table-caption">ตารางที่ 1 ผลการประเมินสมรรถนะและความสามารถในการใช้งานจากบทความต้นฉบับ (Section VI-C)</div>
        </div>
        """
        html_body.append(table_html)
        continue

    # Regular paragraph
    # format bold text
    p_text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", line_s)
    html_body.append(f"<p>{p_text}</p>")

full_html = f"""<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<style>
  @page {{
    size: A4;
    margin: 20mm 18mm 20mm 18mm;
  }}
  body {{
    font-family: 'Tahoma', 'Sarabun', 'Leelawadee UI', sans-serif;
    font-size: 11pt;
    line-height: 1.45;
    color: #1a1a1a;
  }}
  .doc-title {{
    font-size: 22pt;
    font-weight: bold;
    text-align: center;
    color: #173F5F;
    margin-bottom: 12px;
  }}
  .meta-container {{
    background: #F4F8FA;
    border-left: 4px solid #173F5F;
    padding: 10px 14px;
    margin-bottom: 18px;
    border-radius: 4px;
  }}
  .meta-item {{
    font-size: 10pt;
    line-height: 1.4;
    color: #333;
    margin-bottom: 2px;
  }}
  .meta-label {{
    font-weight: bold;
    color: #173F5F;
  }}
  .section-title {{
    font-size: 13.5pt;
    font-weight: bold;
    color: #173F5F;
    border-bottom: 1.5px solid #173F5F;
    padding-bottom: 4px;
    margin-top: 18px;
    margin-bottom: 8px;
  }}
  p {{
    text-align: justify;
    text-indent: 2.2em;
    margin-top: 0;
    margin-bottom: 7px;
  }}
  .page-break {{
    page-break-before: always;
  }}
  .table-container {{
    margin: 14px 0;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
  }}
  th, td {{
    border: 1px solid #C5D5E0;
    padding: 6px 10px;
  }}
  th {{
    background-color: #173F5F;
    color: #FFFFFF;
    font-weight: bold;
  }}
  tr:nth-child(even) {{
    background-color: #F7FAFC;
  }}
  .table-caption {{
    font-size: 8.8pt;
    color: #555;
    text-align: center;
    margin-top: 5px;
    font-style: italic;
  }}
  .ref-item {{
    font-size: 9.5pt;
    margin-left: 1.8em;
    text-indent: -1.8em;
    margin-bottom: 4px;
    color: #333;
  }}
</style>
</head>
<body>
{"".join(html_body)}
</body>
</html>
"""

OUTPUT_HTML.write_text(full_html, encoding="utf-8")

subprocess.run([
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    f"--print-to-pdf={OUTPUT_PDF}",
    "--no-pdf-header-footer",
    str(OUTPUT_HTML)
], check=True)

print(f"Generated PDF: {OUTPUT_PDF}")
