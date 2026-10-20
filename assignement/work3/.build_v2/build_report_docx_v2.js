// Build the Paper III Version 2 short report DOCX from the same Markdown as the PDF.
//
//   NODE_PATH=../../work1/.build/node_modules node build_report_docx.js
//
// Tahoma throughout (Thai + Latin), Thai-distributed body text, headings kept
// with the next paragraph, tables kept on one page with a repeating header row,
// page numbers bottom-right (REPORT_DESIGN_SYSTEM.md sections 3, 4 and 6).
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  HeadingLevel, ShadingType, BorderStyle, Footer, PageNumber, LevelFormat, TabStopType, ImageRun,
} = require('docx');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, '02_report_v2', 'Assignment_Paper_3_v2_Short_Report_TH.md');
const OUTPUT = path.join(ROOT, '02_report_v2', 'Assignment_Paper_3_v2_Short_Report_TH.docx');

const FONT = 'TH SarabunPSK'; // family name of the TH Sarabun font that ships with Microsoft Word
const MATH_FONT = 'Cambria Math';
const NAVY = '0F2D4A';
const INK = '0F172A';
const RULE = 'CBD5E1';
const BODY = 32;   // half-points: 16 pt
const TABLE = 29;  // 14.5 pt
const CONTENT_WIDTH = 11906 - 2 * 1440; // A4 width minus 1-inch margins, in DXA

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

function run(text, st, size, font) {
  return new TextRun({
    text, font: { ascii: font || FONT, hAnsi: font || FONT, cs: font || FONT, eastAsia: font || FONT },
    size, sizeComplexScript: size, bold: !!st.bold, boldComplexScript: !!st.bold,
    italics: !!st.em, italicsComplexScript: !!st.em, superScript: !!st.sup, subScript: !!st.sub,
    color: st.color || INK,
  });
}

// Walk marked inline tokens into TextRuns, honouring **bold**, *em*, <sup>, <sub>.
function inlineRuns(tokens, size, base = {}, font) {
  const out = [];
  const st = { ...base };
  const walk = (toks, local) => {
    for (const t of toks) {
      if (t.type === 'strong') walk(t.tokens, { ...local, bold: true });
      else if (t.type === 'em') walk(t.tokens, { ...local, em: true });
      else if (t.type === 'html') {
        const tag = t.raw.trim().toLowerCase();
        if (tag === '<sup>') st.sup = true; else if (tag === '</sup>') st.sup = false;
        else if (tag === '<sub>') st.sub = true; else if (tag === '</sub>') st.sub = false;
        else if (tag === '<br>' || tag === '<br/>') out.push(new TextRun({ break: 1 }));
      } else if (t.type === 'br') out.push(new TextRun({ break: 1 }));
      else if (t.type === 'codespan') out.push(run(decode(t.text), { ...local, ...st }, size, 'Consolas'));
      else if (t.tokens && t.type !== 'text') walk(t.tokens, local);
      else if (t.type === 'text' || t.type === 'escape') {
        if (t.tokens && t.tokens.length && t.tokens.some((x) => x.type !== 'text')) { walk(t.tokens, local); continue; }
        const text = decode(t.text || t.raw || '');
        // Soft line breaks inside the metadata block ("two spaces + newline").
        const parts = text.split(/ {2,}\n|\n/);
        parts.forEach((p, i) => {
          if (i > 0) out.push(new TextRun({ break: 1 }));
          if (p) out.push(run(p, { ...local, ...st }, size, font));
        });
      }
    }
  };
  walk(tokens, base);
  return out;
}

// Equation blocks are raw HTML: <p class="eq">... <sup>k</sup> ...</p>
function eqRuns(html) {
  const inner = html.replace(/^\s*<p class="eq">/, '').replace(/<\/p>\s*$/, '');
  const out = [];
  const st = {};
  for (const piece of inner.split(/(<\/?su[bp]>)/)) {
    if (piece === '<sup>') st.sup = true; else if (piece === '</sup>') st.sup = false;
    else if (piece === '<sub>') st.sub = true; else if (piece === '</sub>') st.sub = false;
    else if (piece) out.push(run(decode(piece), { ...st }, 25, MATH_FONT));
  }
  return out;
}

const border = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const cellBorders = { top: border, left: border, bottom: border, right: border };

function buildTable(tok) {
  const n = tok.header.length;
  // Column widths: give the first (label) column more room when the table is wide.
  // Weight each column by its longest cell (headers wrap, so they count ~half), clamped.
  const len = (s) => (s || '').replace(/<[^>]+>|\*\*/g, '').length;
  let weights = tok.header.map((h, i) => {
    const cells = tok.rows.map((r) => len(r[i] && r[i].text));
    return Math.min(40, Math.max(7, 0.55 * len(h.text), ...cells));
  });
  const total = weights.reduce((a, b) => a + b, 0);
  const widths = weights.map((w) => Math.floor((w / total) * CONTENT_WIDTH));
  widths[widths.length - 1] += CONTENT_WIDTH - widths.reduce((a, b) => a + b, 0);
  const align = (i) => (tok.align[i] === 'center' ? AlignmentType.CENTER : AlignmentType.LEFT);
  const rowCount = tok.rows.length + 1;
  const mkRow = (cells, header, rIdx) => new TableRow({
    tableHeader: header, cantSplit: true,
    children: cells.map((c, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      borders: header ? { top: { style: BorderStyle.SINGLE, size: 4, color: NAVY }, left: { style: BorderStyle.SINGLE, size: 4, color: NAVY }, bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY }, right: { style: BorderStyle.SINGLE, size: 4, color: NAVY } } : cellBorders,
      shading: header ? { type: ShadingType.CLEAR, color: 'auto', fill: NAVY } : (rIdx % 2 === 0 ? { type: ShadingType.CLEAR, color: 'auto', fill: 'F8FAFC' } : undefined),
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({
        alignment: header ? AlignmentType.CENTER : align(i),
        keepNext: rIdx < rowCount - 1, keepLines: true,
        spacing: { before: 0, after: 0, line: 252 },
        children: inlineRuns(c.tokens, TABLE, header ? { bold: true, color: 'FFFFFF' } : {}),
      })],
    })),
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    rows: [mkRow(tok.header, true, 0), ...tok.rows.map((r, i) => mkRow(r, false, i + 1))],
  });
}

// Line spacing: TH Sarabun New's Windows metrics give 1.31 em per single line, so "multiple 1.25"
// (w:line 300) is about 26 pt at 16 pt, matching the 1.6 line height of the PDF.
const LINE = 300;
const INDENT = 648; // 0.45 in first-line indent, as in the PDF

function build(md) {
  const tokens = marked.lexer(md, { gfm: true });
  const children = [];
  let listInstance = 0;
  let inRefs = false;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const next = tokens.slice(i + 1).find((x) => x.type !== 'space');
    if (t.type === 'space') continue;
    const plain = (t.text || '').replace(/\*/g, '');

    if (t.type === 'heading' && t.depth === 1) {
      children.push(new Paragraph({
        heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, keepNext: true, spacing: { after: 240 },
        children: inlineRuns(t.tokens, 44, { bold: true, color: NAVY }),
      }));
    } else if (t.type === 'heading') {
      inRefs = /เอกสารอ้างอิง/.test(t.text);
      const major = t.depth === 2;
      children.push(new Paragraph({
        heading: major ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2, keepNext: true, keepLines: true,
        spacing: { before: major ? 360 : 200, after: 80, line: 276 },
        children: inlineRuns(t.tokens, major ? 36 : 32, { bold: true, color: NAVY }),
      }));
    } else if (t.type === 'paragraph' && /^ชื่อบทความ:/.test(plain)) {
      // Metadata lines (bold labels), left aligned, no box: same presentation as the Paper II report.
      children.push(new Paragraph({ spacing: { after: 160, line: 288 }, children: inlineRuns(t.tokens, BODY) }));
    } else if (t.type === 'paragraph' && t.tokens.length === 1 && t.tokens[0].type === 'image') {
      const img = t.tokens[0];
      const file = path.resolve(path.dirname(SOURCE), img.href);
      const buf = fs.readFileSync(file);
      const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20); // PNG IHDR
      const widthPx = Math.round((CONTENT_WIDTH / 1440) * 96 * 0.44);
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, spacing: { before: 120, after: 40 },
        children: [new ImageRun({ type: 'png', data: buf, transformation: { width: widthPx, height: Math.round(widthPx * h / w) },
          altText: { title: img.text, description: img.text, name: path.basename(file) } })],
      }));
    } else if (t.type === 'paragraph' && /^ภาพที่ \d/.test(plain)) {
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER, keepLines: true, spacing: { after: 200, line: 264 },
        children: inlineRuns(t.tokens, 28, { color: '374151' }),
      }));
    } else if (t.type === 'paragraph' && /^ตารางที่ \d/.test(plain)) {
      children.push(new Paragraph({
        alignment: AlignmentType.LEFT, keepNext: true, keepLines: true, spacing: { before: 120, after: 60, line: 264 },
        children: inlineRuns(t.tokens, 30),
      }));
    } else if (t.type === 'paragraph') {
      const keep = next && (next.type === 'table' || next.type === 'list' || next.type === 'html');
      children.push(new Paragraph({
        alignment: inRefs ? AlignmentType.LEFT : AlignmentType.THAI_DISTRIBUTE,
        keepNext: !!keep, keepLines: true, widowControl: true,
        indent: inRefs ? { left: 576, hanging: 576 } : { firstLine: INDENT },
        spacing: { after: 120, line: inRefs ? 276 : LINE },
        children: inlineRuns(t.tokens, inRefs ? 30 : BODY),
      }));
    } else if (t.type === 'html' && /class="eq"/.test(t.raw)) {
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER, keepLines: true,
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'F8FAFC' },
        spacing: { before: 80, after: 160, line: 300 },
        children: eqRuns(t.raw.trim()),
      }));
    } else if (t.type === 'list') {
      listInstance += 1;
      const ref = t.ordered ? 'num' : 'bullet';
      t.items.forEach((item, k) => {
        const inline = item.tokens.flatMap((x) => (x.type === 'text' && x.tokens ? x.tokens : (x.tokens || [])));
        children.push(new Paragraph({
          numbering: { reference: ref, level: 0, instance: listInstance },
          alignment: AlignmentType.THAI_DISTRIBUTE, keepLines: true,
          keepNext: k === 0,
          spacing: { after: 80, line: LINE },
          children: inlineRuns(inline, BODY),
        }));
      });
    } else if (t.type === 'table') {
      children.push(buildTable(t));
      children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
    }
  }
  return children;
}

async function main() {
  const md = fs.readFileSync(SOURCE, 'utf8');
  const doc = new Document({
    creator: 'นายธีรภัทร์ ภู่ระยา (66362416)',
    title: 'รายงานย่อบทความ Raft-FL (Assignment Paper 3 Version 2)',
    description: '305432 เครือข่ายเซนเซอร์: Assignment Paper 3 Version 2',
    styles: {
      default: { document: { run: { font: FONT, size: BODY } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', basedOn: 'Normal', run: { font: FONT, size: 44, bold: true, color: NAVY } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: FONT, size: 36, bold: true, color: NAVY }, paragraph: { outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: FONT, size: 32, bold: true, color: NAVY }, paragraph: { outlineLevel: 1 } },
      ],
    },
    numbering: {
      config: [{
        reference: 'num',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 648, hanging: 324 } }, run: { font: FONT, size: BODY } } }],
      }, {
        reference: 'bullet',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 648, hanging: 324 } }, run: { font: FONT, size: BODY } } }],
      }],
    },
    sections: [{
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ children: ['หน้า ', PageNumber.CURRENT], font: { ascii: FONT, hAnsi: FONT, cs: FONT, eastAsia: FONT }, size: 24, sizeComplexScript: 24, color: '6B7280' }),
            ],
          })],
        }),
      },
      children: build(md),
    }],
  });
  fs.writeFileSync(OUTPUT, await Packer.toBuffer(doc));
  console.log('DOCX ->', OUTPUT, (fs.statSync(OUTPUT).size / 1024).toFixed(0) + ' KB');
}

main().catch((e) => { console.error(e); process.exit(1); });
