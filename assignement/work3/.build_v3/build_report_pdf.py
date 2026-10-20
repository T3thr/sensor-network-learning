import subprocess
import sys
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "02_report_v3" / "Assignment_Paper_3_v3_Short_Report_TH.md"
BUILD_DIR = ROOT / ".build_v3"
BUILD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_HTML = BUILD_DIR / "report.html"
OUTPUT_PDF = ROOT / "02_report_v3" / "Assignment_Paper_3_v3_Short_Report_TH.pdf"
OUTPUT_DOCX = ROOT / "02_report_v3" / "Assignment_Paper_3_v3_Short_Report_TH.docx"

md_content = SOURCE.read_text(encoding="utf-8")
lines = md_content.splitlines()

html_body = []
in_table = False
table_rows = []

def flush_table():
    global in_table, table_rows
    if not in_table or not table_rows:
        return
    html = ['<div class="table-container"><table>']
    for i, row in enumerate(table_rows):
        cells = [c.strip() for c in row.split('|')[1:-1]]
        if i == 0:
            html.append('<thead><tr>')
            for c in cells:
                html.append(f'<th>{c}</th>')
            html.append('</tr></thead><tbody>')
        elif i == 1 and all(set(c).issubset({'-', ':', ' '}) for c in cells):
            continue  # Separator line
        else:
            html.append('<tr>')
            for c in cells:
                c_fmt = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', c)
                c_fmt = re.sub(r'`(.+?)`', r'<code>\1</code>', c_fmt)
                html.append(f'<td>{c_fmt}</td>')
            html.append('</tr>')
    html.append('</tbody></table></div>')
    html_body.append('\n'.join(html))
    in_table = False
    table_rows = []

for line in lines:
    line_s = line.strip()
    if not line_s:
        if in_table:
            flush_table()
        continue

    # Table rows
    if line_s.startswith('|') and line_s.endswith('|'):
        in_table = True
        table_rows.append(line_s)
        continue
    elif in_table:
        flush_table()

    # Title
    if line_s.startswith('# '):
        html_body.append(f"<h1 class='doc-title'>{line_s[2:]}</h1>")
        continue

    # Meta
    if line_s.startswith('**') and ':**' in line_s:
        formatted = re.sub(r'\*\*(.+?):\*\*', r"<span class='meta-label'>\1:</span>", line_s)
        formatted = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', formatted)
        formatted = re.sub(r'`(.+?)`', r'<code>\1</code>', formatted)
        html_body.append(f"<div class='meta-item'>{formatted}</div>")
        continue

    # Section Headers
    if line_s.startswith('## '):
        title = line_s[3:]
        html_body.append(f"<h2 class='section-title'>{title}</h2>")
        continue

    if line_s.startswith('### '):
        title = line_s[4:]
        html_body.append(f"<h3 class='subsection-title'>{title}</h3>")
        continue

    # Separator
    if line_s == '---':
        html_body.append("<hr class='doc-divider'>")
        continue

    # Blockquotes
    if line_s.startswith('> '):
        text = line_s[2:]
        html_body.append(f"<blockquote class='callout-box'>{text}</blockquote>")
        continue

    # Bullet lists
    if line_s.startswith('- ') or line_s.startswith('* '):
        text = line_s[2:]
        text_fmt = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
        text_fmt = re.sub(r'`(.+?)`', r'<code>\1</code>', text_fmt)
        html_body.append(f"<li class='bullet-item'>{text_fmt}</li>")
        continue

    # Numbered lists
    m_num = re.match(r'^(\d+)\.\s+(.+)$', line_s)
    if m_num:
        num = m_num.group(1)
        text = m_num.group(2)
        text_fmt = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
        text_fmt = re.sub(r'`(.+?)`', r'<code>\1</code>', text_fmt)
        html_body.append(f"<div class='numbered-item'><span class='num-badge'>{num}</span><div class='num-text'>{text_fmt}</div></div>")
        continue

    # Normal paragraph
    p_fmt = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', line_s)
    p_fmt = re.sub(r'`(.+?)`', r'<code>\1</code>', p_fmt)
    html_body.append(f"<p class='doc-p'>{p_fmt}</p>")

if in_table:
    flush_table()

full_html = f"""<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>รายงานสรุปบทความวิจัย P2SQL (ICSE 2025)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  @page {{
    size: A4;
    margin: 18mm 18mm 18mm 18mm;
    @bottom-center {{
      content: counter(page);
    }}
  }}
  * {{
    box-sizing: border-box;
  }}
  body {{
    font-family: 'Sarabun', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 10pt;
    line-height: 1.65;
    color: #1e293b;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }}
  .doc-title {{
    font-size: 15pt;
    font-weight: 800;
    color: #0f2d4a;
    line-height: 1.35;
    margin: 0 0 10px 0;
    border-bottom: 2.5px solid #0f2d4a;
    padding-bottom: 8px;
  }}
  .meta-item {{
    font-size: 9pt;
    color: #334155;
    margin-bottom: 3px;
    line-height: 1.5;
  }}
  .meta-label {{
    font-weight: 700;
    color: #0f2d4a;
  }}
  .doc-divider {{
    border: 0;
    border-top: 1px solid #cbd5e1;
    margin: 14px 0;
  }}
  .section-title {{
    font-size: 11.5pt;
    font-weight: 800;
    color: #0f2d4a;
    background: #f1f5f9;
    border-left: 4px solid #0f2d4a;
    padding: 6px 12px;
    margin: 18px 0 10px 0;
    page-break-after: avoid;
  }}
  .subsection-title {{
    font-size: 10.5pt;
    font-weight: 700;
    color: #1e3a8a;
    margin: 12px 0 6px 0;
    page-break-after: avoid;
  }}
  .doc-p {{
    margin: 0 0 8px 0;
    text-align: justify;
    line-height: 1.65;
  }}
  .bullet-item {{
    margin: 0 0 4px 18px;
    line-height: 1.6;
  }}
  .numbered-item {{
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    align-items: flex-start;
  }}
  .num-badge {{
    background: #0f2d4a;
    color: #ffffff;
    font-weight: 700;
    font-size: 8pt;
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    flex-shrink: 0;
  }}
  .num-text {{
    flex: 1;
    text-align: justify;
    line-height: 1.6;
  }}
  .callout-box {{
    background: #f8fafc;
    border-left: 3.5px solid #0284c7;
    padding: 8px 12px;
    margin: 10px 0;
    font-size: 9.5pt;
    color: #334155;
    font-style: italic;
  }}
  .table-container {{
    margin: 12px 0;
    overflow-x: auto;
    page-break-inside: avoid;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 8.8pt;
    line-height: 1.45;
  }}
  th {{
    background: #0f2d4a;
    color: #ffffff;
    font-weight: 700;
    padding: 6px 8px;
    text-align: left;
    border: 1px solid #0f2d4a;
  }}
  td {{
    padding: 5px 8px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }}
  tr:nth-child(even) td {{
    background: #f8fafc;
  }}
  code {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    background: #f1f5f9;
    color: #991b1b;
    padding: 1px 4px;
    border-radius: 3px;
    border: 1px solid #e2e8f0;
  }}
  strong {{
    font-weight: 700;
    color: #0f172a;
  }}
</style>
</head>
<body>
{"".join(html_body)}
</body>
</html>
"""

OUTPUT_HTML.write_text(full_html, encoding="utf-8")
print(f"Generated HTML: {OUTPUT_HTML}")

# Generate PDF with Chrome Headless
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
subprocess.run([
    CHROME,
    "--headless",
    "--disable-gpu",
    f"--print-to-pdf={OUTPUT_PDF}",
    "--no-pdf-header-footer",
    str(OUTPUT_HTML)
], check=True)

print(f"Generated PDF: {OUTPUT_PDF} ({OUTPUT_PDF.stat().st_size / 1024:.1f} KB)")
