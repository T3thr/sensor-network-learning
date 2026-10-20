// Build the Paper III presentation documents and the web-studio data from one source.
//
//   node build_presentation_docs.js
//
// Inputs : deck_script.js (spoken script, timings, keywords), qna_data.js (15 Q&A items)
// Outputs: 04_presentation/presentation-script-5-to-8-min.md
//          04_presentation/qna-cheatsheet.md
//          04_presentation/slide-plan.md
//          ../../assets/js/omniledger-data.js        (teleprompter data for the shared studio)
//          ../../paper-3/index.html                  (Q&A cards between the QNA markers)
//
// Thai has no spaces between words, so "words" are counted with Intl.Segmenter (ICU, locale th,
// word granularity, isWordLike). The design pace is stated in those units.
const fs = require('fs');
const path = require('path');
const deck = require('./deck_script');
const qna = require('./qna_data');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.resolve(ROOT, '..', '..');
const OUT_DIR = path.join(ROOT, '04_presentation');
const DATA_JS = path.join(SITE, 'assets', 'js', 'omniledger-data.js');
const PAGE = path.join(SITE, 'paper-3', 'index.html');

const DESIGN_WPM = 172;
const seg = new Intl.Segmenter('th', { granularity: 'word' });
const plain = (t) => t.replace(/\*\*/g, '').replace(/\s*\{b\}\s*/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const countWords = (t) => [...seg.segment(plain(t))].filter((s) => s.isWordLike).length;
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;
const md = (t) => t.replace(/\s*\{b\}\s*/g, ' `[หายใจ]` ').replace(/\s+/g, ' ').trim();
const html = (t) => t
  .replace(/&/g, '&amp;')
  .replace(/&amp;(lt|gt|amp);/g, '&$1;')
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const htmlScript = (t) => html(t)
  .replace(/<strong>(.+?)<\/strong>/g, '<span class="highlight-key">$1</span>')
  .replace(/\s*\{b\}\s*/g, ' <span class="breath-mark">[หายใจ]</span> ')
  .trim();

// ── 1. Word counts and pacing ───────────────────────────────────────────────
const stages = deck.stages.map((st) => {
  const words = st.paragraphs.reduce((n, p) => n + countWords(p), 0);
  const seconds = st.end - st.start;
  return { ...st, words, seconds, wpm: (words / seconds) * 60 };
});
const totalWords = stages.reduce((n, s) => n + s.words, 0);
const lastEnd = stages[stages.length - 1].end;
const at = (wpm) => (totalWords / wpm) * 60;
const paces = [160, 165, DESIGN_WPM, 180, 186];

// Sentences that can be dropped if a rehearsal runs long (must exist verbatim in deck_script.js).
const CUTS = [
  { stage: 3, text: 'และใช้ข้อมูลหนึ่งหมื่นบล็อกแรกของ Bitcoin' },
  { stage: 4, text: 'ข้อสาม ByzCoinX เพิ่ม throughput ยี่สิบเปอร์เซ็นต์ และลด latency สามสิบห้าเปอร์เซ็นต์' },
  { stage: 5, text: 'และ state blocks คล้าย snapshot ที่ช่วยให้เครื่องใหม่เริ่มงานได้เร็ว' },
];
CUTS.forEach((c) => {
  const joined = deck.stages[c.stage].paragraphs.join(' ');
  if (!plain(joined).includes(c.text)) throw new Error(`cut sentence not found in stage ${c.stage + 1}: ${c.text}`);
  c.words = countWords(c.text);
  c.seconds = (c.words / DESIGN_WPM) * 60;
});

// ── 2. presentation-script-5-to-8-min.md ────────────────────────────────────
const m = deck.meta;
const script = [];
script.push(`# บทพูดนำเสนอ OmniLedger (Assignment Paper 3): Academic Peer ความยาว ${mmss(lastEnd)} นาที`, '');
script.push(`> **วิชา:** ${m.course}  `);
script.push(`> **ผู้นำเสนอ:** ${m.presenter} ลำดับที่ ${m.order} (รหัสนิสิต ${m.studentId})  `);
script.push(`> **บทความ:** E. Kokoris-Kogias, P. Jovanovic, L. Gasser, N. Gailly, E. Syta and B. Ford, "${m.paperTitle}," in *${m.venue}*, 2018, pp. 583–598, doi: ${m.doi}  `);
script.push('> **สไลด์:** [Assignment_Paper_3_OmniLedger_5-to-8-min.pdf](../03_slides/Assignment_Paper_3_OmniLedger_5-to-8-min.pdf) และไฟล์ .pptx ในโฟลเดอร์เดียวกัน (speaker notes ในไฟล์ .pptx มาจากบทนี้)  ');
script.push('> **ต้นฉบับ:** [Paper_III_1_PRIMARY_OmniLedger_8418625.pdf](../01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf)  ');
script.push(`> **เวลาเป้าหมาย:** ${mmss(lastEnd)} ตามตารางด้านล่าง ช่วงที่ยอมรับ 4:30 ถึง 4:55 และห้ามเกิน 5:00`, '');
script.push('## 1. วิธีคุมเวลา', '');
script.push(`- บทพูดทั้งหมดมี **${totalWords.toLocaleString('en-US')} คำ** นับด้วย \`Intl.Segmenter\` ภาษาไทย (ICU) เพราะภาษาไทยไม่เว้นวรรคระหว่างคำ จึงนับคำด้วยการเว้นวรรคไม่ได้`);
script.push(`- ความเร็วที่ออกแบบไว้คือ **${DESIGN_WPM} คำต่อนาที** ในหน่วยนี้ ซึ่งให้เวลารวม ${mmss(at(DESIGN_WPM))} นาที`);
script.push('- เกณฑ์ 125 ถึง 135 คำต่อนาทีที่พบทั่วไปมาจากการพูดภาษาอังกฤษซึ่งนับคำด้วยช่องว่าง จึงเทียบกับการนับคำภาษาไทยแบบ ICU โดยตรงไม่ได้ ตัวตัดสินจริงคือเวลาที่จับได้ตอนซ้อม');
script.push('- ความเร็วที่ต่างกันให้เวลารวมดังนี้', '');
script.push('| ความเร็ว (คำ ICU ต่อนาที) | เวลารวม | อยู่ในช่วง 4:30 ถึง 4:55 |', '|:---:|:---:|:---:|');
paces.forEach((w) => {
  const t = at(w);
  script.push(`| ${w} | ${mmss(t)} | ${t >= 270 && t <= 295 ? 'ใช่' : (t > 295 ? 'เกิน ให้ตัดประโยคสำรอง' : 'สั้นกว่า เพิ่มช่วงหยุดได้')} |`);
});
script.push('', '**ประโยคที่ตัดได้ถ้าซ้อมแล้วเกิน 4:55** (ตัดครบทั้งสามประโยคลดได้ประมาณ ' +
  `${Math.round(CUTS.reduce((n, c) => n + c.seconds, 0))} วินาที)`, '');
CUTS.forEach((c) => script.push(`- ${deck.stages[c.stage].slideTitle}: "${c.text}" (${c.words} คำ, ประมาณ ${Math.round(c.seconds)} วินาที)`));
script.push('', '## 2. ตารางควบคุมเวลา (Pacing Table)', '');
script.push('| ช่วงเวลา | หัวข้อสไลด์ | วินาที | คำ | คำต่อนาที | คีย์เวิร์ดกันลืม |', '|:---:|---|:---:|:---:|:---:|---|');
stages.forEach((s) => script.push(`| ${mmss(s.start)} ถึง ${mmss(s.end)} | ${s.slideTitle} | ${s.seconds} | ${s.words} | ${Math.round(s.wpm)} | ${s.keywords.join(' · ')} |`));
script.push(`| **รวม** | | **${lastEnd}** | **${totalWords}** | **${Math.round((totalWords / lastEnd) * 60)}** | บัฟเฟอร์ ${300 - lastEnd} วินาทีก่อนครบ 5:00 |`, '');
script.push('## 3. บทพูดคำต่อคำ', '');
script.push('ตัวหนาคือคำหรือตัวเลขที่ต้องเน้นเสียง `[หายใจ]` คือจุดหยุดหายใจสั้น ๆ ที่วางไว้แล้ว', '');
stages.forEach((s) => {
  script.push(`### ${mmss(s.start)} ถึง ${mmss(s.end)} · ${s.slideTitle}`, '');
  script.push(`**คีย์เวิร์ดกันลืม:** ${s.keywords.join(' · ')}  `);
  script.push(`**ความยาว:** ${s.words} คำ ใน ${s.seconds} วินาที (${Math.round(s.wpm)} คำต่อนาที)`, '');
  s.paragraphs.forEach((p, i) => { script.push(`> ${md(p)}`); if (i < s.paragraphs.length - 1) script.push('>'); });
  script.push('');
});
script.push('## 4. เช็กลิสต์ก่อนขึ้นพูด', '');
[
  'ซ้อมจับเวลาจริงอย่างน้อยสามรอบในห้องซ้อมบนเว็บ paper-3 (หมวดที่ 8) และจดเวลาที่ได้ทุกรอบ',
  'ตัวเลขที่ต้องพูดให้ตรงกับสไลด์: 60 เครื่อง, 1,800 โหนด, 439 ถึง 5,850 tps, 1.38 วินาที, 4 × 10⁻⁵ ต่อ epoch, 68.5 ปี, 1.56 เท่า และ 62.96 วินาที',
  'เมื่อพูดถึง 13,000 tps ต้องพูดต่อทันทีว่าไม่ตรงกับกราฟ และค่าที่อ่านจากกราฟเป็นค่าประมาณของผู้นำเสนอ',
  'ข้อความเรื่อง Kafka, two-phase commit, Saga และเครือข่ายเซนเซอร์ต้องบอกว่าเป็นความเห็นของผู้นำเสนอ ไม่ได้อยู่ในบทความ',
  'เตรียมคำตอบจาก qna-cheatsheet.md ข้อสมการที่ (1), Appendix C และ Atomix ให้พูดคำตอบสั้นได้ภายใน 20 วินาที',
].forEach((t) => script.push(`- [ ] ${t}`));
script.push('');
fs.writeFileSync(path.join(OUT_DIR, 'presentation-script-5-to-8-min.md'), script.join('\n'));

// ── 3. qna-cheatsheet.md ────────────────────────────────────────────────────
const catLabel = Object.fromEntries(qna.categories.map((c) => [c.key, c.label]));
const q = [];
q.push('# Q&A Cheatsheet: คำถามที่อาจารย์น่าจะถามและแนวคำตอบ (Assignment Paper 3: OmniLedger)', '');
q.push(`รวม ${qna.items.length} คำถาม ครอบคลุมกลไก Atomix และ ByzCoinX, การวิเคราะห์สมการที่ (1), ปัญหา cross-shard overhead และการเชื่อมโยงกับเครือข่ายเซนเซอร์ ทุกข้อมี "คำตอบสั้น" สำหรับพูดก่อนภายใน 10 ถึง 20 วินาที ตามด้วยคำตอบเต็มถ้าอาจารย์ถามต่อ และตำแหน่งหลักฐานในบทความเพื่อเปิดให้ดูได้ทันที`, '');
q.push('**หลักการตอบ:** ตอบสั้นก่อน, อ้างตำแหน่งในบทความ, แยกให้ชัดว่าส่วนใดเป็นข้อมูลของผู้เขียนและส่วนใดเป็นความเห็นหรือการคำนวณของผู้นำเสนอ', '');
q.push('## สารบัญคำถาม', '');
q.push('| ข้อ | หมวด | คำถาม |', '|:---:|---|---|');
qna.items.forEach((it, i) => q.push(`| Q${i + 1} | ${catLabel[it.cat]} | ${it.q} |`));
q.push('');
qna.items.forEach((it, i) => {
  q.push(`## Q${i + 1}. ${it.q}`, '');
  q.push(`- **หมวด:** ${catLabel[it.cat]}`);
  q.push(`- **เจตนาของคำถาม:** ${it.intent}`);
  q.push(`- **คำตอบสั้น:** ${it.short}`, '');
  q.push(`**คำตอบเต็ม:** ${it.answer}`, '');
  q.push(`- **หลักฐานในบทความ:** ${it.evidence}`);
  q.push(`- **ชี้ที่สไลด์:** ${it.slide}`, '');
});
fs.writeFileSync(path.join(OUT_DIR, 'qna-cheatsheet.md'), q.join('\n'));

// ── 4. slide-plan.md ────────────────────────────────────────────────────────
const PLAN = [
  { goal: 'บอกว่าบทความคืออะไร มาจากเวทีใด และตั้งคำถามหลักของการนำเสนอ', visual: 'ชื่อบทความสองภาษา, IEEE SP 2018, DOI 10.1109/SP.2018.000-5, ผู้แต่ง EPFL และ Trinity College', evidence: 'หน้า 583' },
  { goal: 'ให้ผู้ฟังเห็นว่าระบบเดิมได้เพียงสองในสามด้าน และความท้าทายสามข้อที่ OmniLedger ต้องแก้', visual: 'Fig. 1 สามเหลี่ยมข้อแลกเปลี่ยน, การ์ดความท้าทาย 3 ข้อ, threat model 25%, กล่องตัวเลข Elastico 1 ชม., Bitcoin 600 s, Visa 4,000 tx/s', evidence: 'Section I ถึง III, Fig. 1, Table IV' },
  { goal: 'อธิบายสถาปัตยกรรมสี่ส่วนในหนึ่ง epoch และตัวชี้วัดที่ใช้ประเมิน', visual: 'Fig. 2 สถาปัตยกรรม, การ์ด 4 เสาหลัก (Sharding, ByzCoinX, Atomix, State blocks และ trust-but-verify), การ์ดตัวชี้วัด 4 ด้าน', evidence: 'Section IV ถึง V, Fig. 2' },
  { goal: 'แสดงสภาพแวดล้อมการทดลองและคณิตศาสตร์ความปลอดภัย พร้อมจุดผิดของสมการที่ (1)', visual: 'กล่องตัวเลข 60 ถึง 1,800 โหนด, 20 Mbps และ 100 ms, สมการ (1) ที่แก้ขอบบนแล้ว, สมการ (2), Fig. 5', evidence: 'Section VI ถึง VIII-A, หน้า 591 ถึง 592' },
  { goal: 'สรุปผลเชิงตัวเลขและชี้ว่าตัวเลขพาดหัว 13,000 tps ไม่ตรงกับกราฟ', visual: 'Fig. 6 พร้อมตารางค่าที่อ่านจากกราฟ, กล่อง 439 ถึง 5,850 tps, 1.38 s, 4 × 10⁻⁵, ข้อค้นพบ 4 ข้อ', evidence: 'Section VIII, Fig. 6 ถึง 9, Table I ถึง II' },
  { goal: 'แยกคุณูปการทางวิชาการที่มีหลักฐาน ออกจากการประยุกต์ที่เป็นความเห็นของผู้นำเสนอ', visual: 'สองคอลัมน์: คุณูปการ 3 ข้อพร้อมบรรทัดหลักฐาน, การประยุกต์ 3 ข้อพร้อมบรรทัดจุดต่างหรือข้อจำกัด', evidence: 'Section IV ถึง VIII' },
  { goal: 'วิจารณ์อย่างตรงไปตรงมาด้วยตัวเลขของบทความเอง และสรุปวิธีนำไปใช้อย่างระมัดระวัง', visual: 'แถบเทียบ 3.81 เท่า, 1.56 เท่า, 1.46 ถึง 1.73 เท่า, ภาพ Eq. (3) ตามที่พิมพ์, การ์ดข้อสรุปและงานต่อยอด', evidence: 'Section X, Appendix C, Table I, II, IV' },
];
const plan = [];
plan.push('# ผังโครงสร้างสไลด์ (Slide Plan): OmniLedger 7 สไลด์ ภายใน 5 นาที', '');
plan.push('ขนาดสไลด์ 16 × 9 นิ้ว ตาม SLIDES_DESIGN_SYSTEM.md (แถบหัว #0F2D4A, การ์ด #FFFFFF, ขอบ #E2E8F0, พื้นหลัง #F8FAFC) ทุกสไลด์เนื้อหามีกล่องตัวเลขเด่นและฟุตเตอร์อ้างอิง IEEE พร้อมเลขหน้า', '');
plan.push('| ลำดับ | หัวข้อสไลด์ | วัตถุประสงค์การสื่อสาร | องค์ประกอบบนสไลด์ | หลักฐานในบทความ | ช่วงเวลา | วินาที |', '|:---:|---|---|---|---|:---:|:---:|');
stages.forEach((s, i) => plan.push(`| ${i + 1} | ${s.slideTitle} | ${PLAN[i].goal} | ${PLAN[i].visual} | ${PLAN[i].evidence} | ${mmss(s.start)} ถึง ${mmss(s.end)} | ${s.seconds} |`));
plan.push('', `**เวลารวม:** ${mmss(lastEnd)} นาที จากบทพูด ${totalWords} คำ ที่ ${DESIGN_WPM} คำต่อนาที (นับแบบ ICU) เหลือบัฟเฟอร์ ${300 - lastEnd} วินาทีก่อนครบ 5:00 นาที เฉลี่ย ${Math.round(lastEnd / 7)} วินาทีต่อสไลด์ สไลด์เนื้อหาทุกหน้าอยู่ในช่วง 35 ถึง 55 วินาที`, '');
plan.push('**ไฟล์ที่เกี่ยวข้อง:** `03_slides/Assignment_Paper_3_OmniLedger_5-to-8-min.pdf` และ `.pptx` (สร้างจาก `.build/build_slides.js` และ `.build/build_pptx.js`), บทพูดใน `presentation-script-5-to-8-min.md`', '');
fs.writeFileSync(path.join(OUT_DIR, 'slide-plan.md'), plan.join('\n'));

// ── 5. Web-studio data (assets/js/omniledger-data.js) ───────────────────────
const webStages = stages.map((s, i) => ({
  id: i,
  start: s.start,
  end: s.end,
  title: s.title,
  timeLabel: `${mmss(s.start)}-${mmss(s.end)}`,
  slide: { num: `สไลด์ ${i + 1} / ${stages.length}`, title: s.slideTitle, bullets: s.keywords, diagram: '', citation: 'Kokoris-Kogias et al., IEEE SP 2018 (IEEE Xplore: 8418625)' },
  slideImage: `assets/slides/slide-${i + 1}.png`,
  words: s.words,
  scriptHtml: `<p><strong>[${mmss(s.start)}-${mmss(s.end)} · ${html(s.slideTitle)}]</strong></p>\n` +
    s.paragraphs.map((p) => `<p>${htmlScript(p)}</p>`).join('\n'),
}));
const dataJs = `// GENERATED by assignement/work3/.build/build_presentation_docs.js from deck_script.js.
// Do not edit by hand; edit deck_script.js and rebuild.
// Registers Paper III (OmniLedger) with the shared presentation studio in presentation.js.
(function () {
  if (typeof PRESENTATION_DATA === 'undefined') return;
  PRESENTATION_DATA['omniledger'] = { peer: ${JSON.stringify(webStages, null, 2).replace(/\n/g, '\n  ')} };
  window.OMNILEDGER_PACING = ${JSON.stringify({ totalWords, designWpm: DESIGN_WPM, scriptEnd: lastEnd, cap: 300 })};
})();
`;
fs.writeFileSync(DATA_JS, dataJs);

// ── 6. Q&A cards injected into paper-3/index.html ───────────────────────────
if (fs.existsSync(PAGE)) {
  const page = fs.readFileSync(PAGE, 'utf8');
  const START = '<!-- QNA:START (generated by build_presentation_docs.js) -->';
  const END = '<!-- QNA:END -->';
  if (page.includes(START) && page.includes(END)) {
    const filters = [`<button class="btn-filter active" data-category="all">ทั้งหมด (${qna.items.length} ข้อ)</button>`]
      .concat(qna.categories.map((c) => `<button class="btn-filter" data-category="${c.key}">${c.label} (${qna.items.filter((x) => x.cat === c.key).length})</button>`))
      .concat(['<button class="btn btn-secondary" id="qna-random-btn" style="margin-left: auto; padding: 4px 10px; font-size: 0.80rem;">สุ่มคำถาม</button>']);
    const cards = qna.items.map((it, i) => `
            <div class="qna-card" data-category="${it.cat}">
              <button class="qna-question-btn" type="button">
                <span><span class="qna-q-num">Q${i + 1}.</span> ${html(it.q)}</span>
                <span class="qna-q-arrow" aria-hidden="true">▼</span>
              </button>
              <div class="qna-answer-pane">
                <p style="margin: 0 0 8px;"><strong>เจตนาของคำถาม:</strong> ${html(it.intent)}</p>
                <p style="margin: 0 0 8px;"><strong>คำตอบสั้น:</strong> ${html(it.short)}</p>
                <p style="margin: 0 0 8px;"><strong>คำตอบเต็ม:</strong> ${html(it.answer)}</p>
                <div class="qna-keywords-box">หลักฐาน: ${html(it.evidence)} · ชี้ที่สไลด์: ${html(it.slide)}</div>
              </div>
            </div>`).join('\n');
    const block = `${START}
          <div class="qna-filter-bar">
            ${filters.join('\n            ')}
          </div>
          <div class="qna-list">${cards}
          </div>
          ${END}`;
    const updated = page.replace(new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END}`), block);
    fs.writeFileSync(PAGE, updated);
    console.log('Q&A cards  ->', PAGE);
  } else {
    console.log('Q&A markers not found in paper-3/index.html (skipped)');
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
console.log('stage words :', stages.map((s) => s.words).join(', '), '=', totalWords);
console.log('stage wpm   :', stages.map((s) => Math.round(s.wpm)).join(', '));
console.log('total at    :', paces.map((w) => `${w} wpm ${mmss(at(w))}`).join(' | '));
console.log('cuts        :', CUTS.map((c) => `${c.words}w/${c.seconds.toFixed(1)}s`).join(', '));
['presentation-script-5-to-8-min.md', 'qna-cheatsheet.md', 'slide-plan.md'].forEach((f) => console.log('MD ->', path.join(OUT_DIR, f)));
console.log('JS ->', DATA_JS);
if (at(DESIGN_WPM) < 270 || at(DESIGN_WPM) > 295) { console.error('Script length outside 4:30 to 4:55 at design pace'); process.exitCode = 2; }
