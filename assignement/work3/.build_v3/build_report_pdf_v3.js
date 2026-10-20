// Build the Paper III Version 3 (P2SQL) short report PDF from the Markdown source of truth.
//
//   NODE_PATH=../../work1/.build/node_modules node build_report_pdf_v3.js
//
// Typesetting follows REPORT_DESIGN_SYSTEM.md and the Paper II report:
//   - TH Sarabun New (loaded from the copy that ships with Microsoft Word), body 16 pt, line height 1.6
//   - A4, 1 inch margins, page number "หน้า N" bottom right
//   - title centred, metadata as bold-label lines, body paragraphs justified with a first-line indent
//   - every heading is kept together with the block that follows it (no orphan headings); tables,
//     figures and their captions never split
// After printing, the script reads the PDF layout (pdftotext -bbox) and moves any major heading that
// starts in the bottom quarter of a page to the next page, then prints again (up to 4 passes).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { marked } = require('marked');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, '02_report_v3', 'Assignment_Paper_3_v3_Short_Report_TH.md');
const OUT_HTML = path.join(__dirname, 'report.html');
const OUT_PDF = path.join(ROOT, '02_report_v3', 'Assignment_Paper_3_v3_Short_Report_TH.pdf');
const FONT_DIR = 'file:///Applications/Microsoft%20Word.app/Contents/Resources/DFonts/';

const CSS = `
@font-face { font-family: "Sarabun Report"; src: url("${FONT_DIR}thsarabun.ttf"); font-weight: 400; }
@font-face { font-family: "Sarabun Report"; src: url("${FONT_DIR}thsarabun-bold.ttf"); font-weight: 700; }
@font-face { font-family: "Sarabun Report"; src: url("${FONT_DIR}thsarabun-italic.ttf"); font-weight: 400; font-style: italic; }
@page { size: A4; margin: 1in 1in 1in 1in; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Sarabun Report", "TH Sarabun New", Tahoma, sans-serif; font-size: 16pt; line-height: 1.45; color: #111827; margin: 0; }
h1 { font-size: 22pt; line-height: 1.3; text-align: center; color: #0F2D4A; margin: 0 0 14pt; }
h2 { font-size: 18pt; line-height: 1.35; color: #0F2D4A; margin: 20pt 0 6pt; }
h3 { font-size: 16pt; line-height: 1.4; color: #0F2D4A; margin: 12pt 0 4pt; }
.keep > h2:first-child, .keep > h3:first-child { margin-top: 0; }
.keep { break-inside: avoid; page-break-inside: avoid; }
.keep.major, .keep.minor { break-inside: auto; page-break-inside: auto; }
h2, h3, p.tcaption, p.figure { break-after: avoid; page-break-after: avoid; }
p { orphans: 3; widows: 3; }
.keep.major { margin-top: 20pt; }
.keep.minor { margin-top: 12pt; }
.pb { break-before: page; page-break-before: always; margin-top: 0 !important; }
p { margin: 0 0 6pt; text-align: justify; text-indent: 0.45in; orphans: 2; widows: 2; }
p.meta { text-indent: 0; text-align: left; line-height: 1.6; margin-bottom: 10pt; }
p.lead { break-after: avoid; page-break-after: avoid; }
p.caption { text-indent: 0; text-align: center; font-size: 14pt; line-height: 1.45; color: #374151; margin: 4pt 0 10pt; }
p.tcaption { text-indent: 0; text-align: left; font-size: 15pt; line-height: 1.45; margin: 8pt 0 4pt; }
p.figure { text-indent: 0; text-align: center; margin: 8pt 0 2pt; }
p.figure img { width: 54%; }
pre { font-family: Menlo, Tahoma, monospace; font-size: 10pt; line-height: 1.55; color: #0F172A; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 8pt 12pt; margin: 4pt 0 12pt; white-space: pre-wrap; break-inside: avoid; page-break-inside: avoid; }
pre code { font-family: inherit; }
code { font-family: Menlo, "Sarabun Report", monospace; font-size: 11.5pt; }
p.eq { text-indent: 0; text-align: center; font-family: "Cambria Math", "Times New Roman", serif; font-size: 12.5pt; line-height: 1.5; margin: 4pt 0 8pt; padding: 5pt 8pt; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; }
ol, ul { margin: 0 0 8pt; padding-left: 0.45in; }
li { margin: 0 0 3pt; text-align: justify; padding-left: 2pt; }
strong { color: #0F172A; }
table { width: 100%; border-collapse: collapse; margin: 2pt 0 10pt; font-size: 14.5pt; line-height: 1.35; break-inside: avoid; page-break-inside: avoid; }
thead { display: table-header-group; }
th { background: #0F2D4A; color: #FFFFFF; font-weight: 700; padding: 4pt 8pt; border: 1px solid #0F2D4A; }
td { padding: 3pt 8pt; border: 1px solid #CBD5E1; vertical-align: top; }
tr:nth-child(even) td { background: #F1F5F9; }
sup, sub { font-size: 70%; line-height: 0; }
.refs p { text-indent: -0.4in; padding-left: 0.4in; text-align: left; font-size: 15pt; line-height: 1.5; margin-bottom: 4pt; }
`;

const isCaption = (h) => /^<p><strong>ตารางที่ \d/.test(h);
const isFigCaption = (h) => /^<p><strong>ภาพที่ \d/.test(h);
const isFigure = (h) => /^<p><img /.test(h);

function blocksFromMarkdown(md) {
  const tokens = marked.lexer(md, { gfm: true });
  const out = [];
  for (const t of tokens) {
    if (t.type === 'space') continue;
    let html = marked.parser(Object.assign([t], { links: tokens.links || {} })).trim();
    out.push({ t, html });
  }
  return out;
}

function style(b, idx, blocks) {
  let h = b.html;
  if (b.t.type === 'heading' && b.t.depth === 1) return h;
  if (/^<p><strong>ชื่อบทความ:/.test(h)) return h.replace('<p>', '<p class="meta">');
  if (isCaption(h)) return h.replace('<p>', '<p class="tcaption">');
  if (isFigCaption(h)) return h.replace('<p>', '<p class="caption">');
  if (isFigure(h)) {
    return h.replace(/<p><img src="([^"]+)" alt="([^"]*)"><\/p>/, (m, src, alt) => `<p class="figure"><img src="file://${path.resolve(path.dirname(SOURCE), src)}" alt="${alt}"></p>`);
  }
  const next = blocks[idx + 1];
  if (b.t.type === 'paragraph' && next && (next.t.type === 'list' || next.t.type === 'html' || next.t.type === 'code')) return h.replace('<p>', '<p class="lead">');
  return h;
}

// Group a heading with the block after it (and a table caption with its table, a figure with its
// caption) so that no heading or caption is left alone at the bottom of a page.
function buildHtml(md, breakBefore) {
  const blocks = blocksFromMarkdown(md);
  const html = [];
  let inRefs = false;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const h = style(b, i, blocks);
    if (b.t.type === 'heading' && b.t.depth >= 2) {
      if (/เอกสารอ้างอิง/.test(b.t.text)) inRefs = true;
      const group = [h];
      let j = i + 1;
      const take = () => { group.push(style(blocks[j], j, blocks)); j++; };
      if (j < blocks.length && blocks[j].t.type !== 'heading') {
        const first = blocks[j].html;
        take();
        if (isCaption(first) && j < blocks.length) take(); // caption + table
        else if (isFigure(first) && j < blocks.length) take(); // figure + caption
      }
      const cls = `keep ${b.t.depth === 2 ? 'major' : 'minor'}${breakBefore.has(b.t.text) ? ' pb' : ''}`;
      html.push(`<div class="${cls}" data-heading="${b.t.text.replace(/"/g, '&quot;')}">${group.join('\n')}</div>`);
      i = j - 1;
      continue;
    }
    if (isCaption(b.html) || isFigure(b.html)) {
      html.push(`<div class="keep">${h}\n${style(blocks[i + 1], i + 1, blocks)}</div>`);
      i += 1;
      continue;
    }
    html.push(h);
  }
  let body = html.join('\n');
  body = body.replace(/(<div class="keep major[^"]*" data-heading="เอกสารอ้างอิง">[\s\S]*)$/, '<div class="refs">$1</div>');
  return `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><title>Assignment Paper 3 v3: P2SQL Short Report</title><style>${CSS}</style></head><body>${body}</body></html>`;
}

// Find major headings that start in the bottom quarter of a page, using the PDF text layout.
function headingsTooLow(pdf, headings) {
  const xml = execFileSync('pdftotext', ['-bbox-layout', pdf, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const pages = [...xml.matchAll(/<page width="([\d.]+)" height="([\d.]+)">([\s\S]*?)<\/page>/g)];
  const low = [];
  const pos = [];
  pages.forEach((pg, pi) => {
    const H = parseFloat(pg[2]);
    for (const ln of pg[3].matchAll(/<line xMin="[\d.]+" yMin="([\d.]+)"[^>]*>([\s\S]*?)<\/line>/g)) {
      const text = [...ln[2].matchAll(/<word[^>]*>([^<]*)<\/word>/g)].map((w) => w[1]).join(' ');
      for (const hd of headings) {
        if (text.replace(/\s+/g, '') === hd.replace(/\s+/g, '')) {
          const y = parseFloat(ln[1]) / H;
          pos.push({ hd, page: pi + 1, y: +y.toFixed(3) });
          if (y > 0.82) low.push(hd);
        }
      }
    }
  });
  return { low, pos, pages: pages.length };
}

async function main() {
  const md = fs.readFileSync(SOURCE, 'utf8');
  const majors = [...md.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const breakBefore = new Set();
  let browser;
  try { browser = await chromium.launch(); } catch (e) { browser = await chromium.launch({ channel: 'chrome' }); }
  let report;
  for (let pass = 1; pass <= 4; pass++) {
    fs.writeFileSync(OUT_HTML, buildHtml(md, breakBefore));
    const page = await browser.newPage();
    await page.goto('file://' + OUT_HTML, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const fontOk = await page.evaluate(() => document.fonts.check('16pt "Sarabun Report"'));
    if (!fontOk) throw new Error('TH Sarabun New did not load from Microsoft Word fonts');
    await page.pdf({
      path: OUT_PDF, format: 'A4', printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<div></div>',
      footerTemplate: '<div style="width:100%; font-family:Tahoma; font-size:8.5pt; color:#6B7280; padding:0 1in; text-align:right;">หน้า <span class="pageNumber"></span></div>',
    });
    await page.close();
    report = headingsTooLow(OUT_PDF, majors);
    const fresh = report.low.filter((h) => !breakBefore.has(h));
    if (!fresh.length) break;
    fresh.forEach((h) => breakBefore.add(h));
  }
  await browser.close();
  console.log('PDF  ->', OUT_PDF, `${report.pages} pages`, (fs.statSync(OUT_PDF).size / 1024).toFixed(0) + ' KB');
  console.log('major headings (page, y):', report.pos.map((p) => `${p.hd.split(' ')[0]}@${p.page}:${p.y}`).join('  '));
  if (breakBefore.size) console.log('moved to next page:', [...breakBefore].join(' | '));
}

main().catch((e) => { console.error(e); process.exit(1); });
