// Build the Paper III short report PDF from the Markdown source of truth.
//
//   NODE_PATH=../../work1/.build/node_modules node build_report_pdf.js
//
// Markdown -> HTML (marked, GFM tables) -> Chromium print (A4, Tahoma, page
// numbers bottom-right). Headings are kept with the paragraph that follows and
// tables never split across pages, per REPORT_DESIGN_SYSTEM.md section 6.2.
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, '02_report', 'Assignment_Paper_3_OmniLedger_Short_Report_TH.md');
const OUT_HTML = path.join(__dirname, 'report.html');
const OUT_PDF = path.join(ROOT, '02_report', 'Assignment_Paper_3_OmniLedger_Short_Report_TH.pdf');

const CSS = `
@page { size: A4; margin: 1in 1in 1in 1in; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: Tahoma, sans-serif; font-size: 10.5pt; line-height: 1.55; color: #0F172A; margin: 0; }
h1 { font-size: 15pt; line-height: 1.35; color: #0F2D4A; margin: 0 0 8pt; }
h2 { font-size: 12.5pt; line-height: 1.4; color: #0F2D4A; margin: 16pt 0 6pt; padding-bottom: 3pt; border-bottom: 1px solid #CBD5E1;
     break-after: avoid; page-break-after: avoid; }
p { margin: 0 0 6pt; text-align: justify; text-justify: inter-word; orphans: 3; widows: 3; }
p.meta { background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 6px; padding: 8pt 10pt; line-height: 1.6; text-align: left; margin-bottom: 10pt; }
p.lead, p.caption { break-after: avoid; page-break-after: avoid; }
p.caption { margin-top: 8pt; margin-bottom: 4pt; text-align: left; }
p.eq { text-align: center; font-family: "Cambria Math", "Times New Roman", serif; font-size: 11.5pt; margin: 6pt 0 8pt; padding: 6pt 8pt;
       background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; break-inside: avoid; }
ol, ul { margin: 0 0 6pt; padding-left: 20pt; }
li { margin: 0 0 4pt; text-align: justify; text-justify: inter-word; }
strong { color: #0F172A; }
table { width: 100%; border-collapse: collapse; margin: 4pt 0 10pt; font-size: 9.5pt; line-height: 1.45; break-inside: avoid; page-break-inside: avoid; }
thead { display: table-header-group; }
th { background: #0F2D4A; color: #FFFFFF; font-weight: bold; padding: 4pt 6pt; border: 1px solid #0F2D4A; }
td { padding: 3.5pt 6pt; border: 1px solid #CBD5E1; vertical-align: top; }
tr:nth-child(even) td { background: #F8FAFC; }
sup, sub { font-size: 70%; line-height: 0; }
.refs p { text-align: left; padding-left: 22pt; text-indent: -22pt; margin-bottom: 4pt; font-size: 10pt; }
`;

function buildHtml(md) {
  let html = marked.parse(md, { gfm: true });
  // First paragraph after the title is the metadata block.
  html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>\s*)<p>/, '$1<p class="meta">');
  // Table captions ("ตารางที่ N ...") and list/table lead-ins stay with what follows.
  html = html.replace(/<p><strong>(ตารางที่ \d[^<]*)<\/strong>([^<]*)<\/p>/g, '<p class="caption"><strong>$1</strong>$2</p>');
  html = html.replace(/<p>(<strong>[^<]*(?:ประการ|Section III\)|Section I\))[^<]*<\/strong>:?[^<]*)<\/p>(\s*<ol>)/g, '<p class="lead">$1</p>$2');
  // References block.
  html = html.replace(/(<h2[^>]*>เอกสารอ้างอิง[\s\S]*?<\/h2>)([\s\S]*)$/, '$1<div class="refs">$2</div>');
  return `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><title>Assignment Paper 3: OmniLedger Short Report</title><style>${CSS}</style></head><body>${html}</body></html>`;
}

async function main() {
  const md = fs.readFileSync(SOURCE, 'utf8');
  fs.writeFileSync(OUT_HTML, buildHtml(md));
  let browser;
  try { browser = await chromium.launch(); }
  catch (e) { browser = await chromium.launch({ channel: 'chrome' }); }
  const page = await browser.newPage();
  await page.goto('file://' + OUT_HTML, { waitUntil: 'load' });
  await page.pdf({
    path: OUT_PDF, format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="width:100%; font-family:Tahoma; font-size:8.5pt; color:#64748B; padding:0 1in; display:flex; justify-content:space-between;">
        <span>Assignment Paper 3: OmniLedger (IEEE SP 2018) · 305432 เครือข่ายเซนเซอร์</span>
        <span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  });
  await browser.close();
  console.log('HTML ->', OUT_HTML);
  console.log('PDF  ->', OUT_PDF, (fs.statSync(OUT_PDF).size / 1024).toFixed(0) + ' KB');
}

main().catch((e) => { console.error(e); process.exit(1); });
