// Build the Paper III Version 3 PPTX (16 x 9 in, 7 slides) with Thai speaker notes.
//
//   NODE_PATH=../../work1/.build/node_modules node build_pptx_v3.js
//
// Each slide is the full-bleed 2x render from build_slides_v3.js, so Thai text (IBM Plex Thai) and the
// paper's figures look identical on any machine. Edit build_slides_v3.js and rebuild both to change a
// slide. Speaker notes come from deck_v3.js, the same source as the Markdown script.
const path = require('path');
const pptxgen = require('pptxgenjs');
const deck = require('./deck_v3');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '03_slides_v3', 'Assignment_Paper_3_v3_5-to-8-min.pptx');
const HIRES = path.join(__dirname, 'slides-hires');
const clean = (t) => t.replace(/\*\*/g, '').replace(/\[\[|\]\]/g, '').replace(/\s+/g, ' ').trim();
const cuts = (t) => (t.match(/\[\[(.*?)\]\]/g) || []).map((x) => x.slice(2, -2));
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const pres = new pptxgen();
pres.defineLayout({ name: 'SLIDE_16x9_IN', width: 16, height: 9 });
pres.layout = 'SLIDE_16x9_IN';
pres.author = `${deck.meta.presenter} (${deck.meta.studentId})`;
pres.title = 'Assignment Paper 3 Version 3: P2SQL (ICSE 2025, IEEE Doc ID: 11029790)';
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
