// Build the Paper III PPTX (16 x 9 in, 7 slides) with speaker notes.
//
//   NODE_PATH=../../work1/.build/node_modules node build_pptx.js
//
// Each slide is the full-bleed 2x render from build_slides.js, so Thai text, the
// equations and the figure crops look the same on every machine (PowerPoint would
// otherwise substitute fonts). To change slide content, edit build_slides.js and
// rebuild both. Speaker notes come from deck_script.js, the same source as the
// Markdown script and the web teleprompter, with the stress/breath markup removed.
const path = require('path');
const pptxgen = require('pptxgenjs');
const deck = require('./deck_script');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '03_slides', 'Assignment_Paper_3_OmniLedger_5-to-8-min.pptx');
const HIRES = path.join(__dirname, 'slides-hires');

const clean = (t) => t.replace(/\*\*/g, '').replace(/\s*\{b\}\s*/g, ' ').replace(/\s+/g, ' ').trim();
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const pres = new pptxgen();
pres.defineLayout({ name: 'SLIDE_16x9_IN', width: 16, height: 9 });
pres.layout = 'SLIDE_16x9_IN';
pres.author = `${deck.meta.presenter} (${deck.meta.studentId})`;
pres.title = 'Assignment Paper 3: OmniLedger';
pres.subject = `${deck.meta.paperTitle}, ${deck.meta.venue}`;

deck.stages.forEach((st, i) => {
  const slide = pres.addSlide();
  slide.background = { color: 'F8FAFC' };
  slide.addImage({
    path: path.join(HIRES, `slide-${i + 1}.png`),
    x: 0, y: 0, w: 16, h: 9,
    altText: `สไลด์ ${i + 1}: ${st.slideTitle}`,
  });
  slide.addNotes([
    `เวลา ${mmss(st.start)} ถึง ${mmss(st.end)} (${st.end - st.start} วินาที): ${st.slideTitle}`,
    `คำสำคัญ: ${st.keywords.join(' · ')}`,
    '',
    ...st.paragraphs.map(clean),
  ].join('\n'));
});

pres.writeFile({ fileName: OUT }).then((f) => console.log('PPTX ->', f));
