// Build the Paper III Version 2 PPTX (16 x 9 in, 7 slides) with Thai speaker notes.
//
//   NODE_PATH=../../work1/.build/node_modules node build_pptx_v2.js
//
// Each slide is the full-bleed 2x render from build_slides_v2.js, so Thai text and the paper's
// figures look the same on every machine. To change slide content, edit build_slides_v2.js and
// rebuild both. Speaker notes come from deck_v2.js (the same source as the Markdown script and the
// web teleprompter) and list the time window, key numbers, the full spoken text and the optional cuts.
const path = require('path');
const pptxgen = require('pptxgenjs');
const deck = require('./deck_v2');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '03_slides_v2', 'Assignment_Paper_3_v2_5-to-8-min.pptx');
const HIRES = path.join(__dirname, 'slides-hires');

const clean = (t) => t.replace(/\*\*/g, '').replace(/\s*\{b\}\s*/g, ' ').replace(/\[\[|\]\]/g, '').replace(/\s+/g, ' ').trim();
const cuts = (t) => (t.match(/\[\[(.*?)\]\]/g) || []).map((x) => x.slice(2, -2));
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const pres = new pptxgen();
pres.defineLayout({ name: 'SLIDE_16x9_IN', width: 16, height: 9 });
pres.layout = 'SLIDE_16x9_IN';
pres.author = `${deck.meta.presenter} (${deck.meta.studentId})`;
pres.title = 'Assignment Paper 3 Version 2: Raft-FL (SEAMS 2024, IEEE Doc ID: 10556381)';
pres.subject = `${deck.meta.paperTitle}, ${deck.meta.venue}, DOI ${deck.meta.doi}`;

deck.stages.forEach((st, i) => {
  const slide = pres.addSlide();
  slide.background = { color: 'F8FAFC' };
  slide.addImage({ path: path.join(HIRES, `slide-${i + 1}.png`), x: 0, y: 0, w: 16, h: 9, altText: `สไลด์ ${i + 1}: ${st.slideTitle}` });
  const optional = st.paragraphs.flatMap(cuts);
  slide.addNotes([
    `เวลา ${mmss(st.start)} ถึง ${mmss(st.end)} (${st.end - st.start} วินาที): ${st.slideTitle}`,
    `คำสำคัญ: ${st.keywords.join(' · ')}`,
    '',
    'บทพูด:',
    ...st.paragraphs.map(clean),
    ...(optional.length ? ['', `ประโยคตัดได้ถ้าเวลาไม่พอ: ${optional.join(' / ')}`] : []),
    '',
    `อ้างอิง: ${deck.meta.venueShort}, IEEE Doc ID: ${deck.meta.ieee}, DOI: ${deck.meta.doi}`,
  ].join('\n'));
});

pres.writeFile({ fileName: OUT }).then((f) => console.log('PPTX ->', f));
