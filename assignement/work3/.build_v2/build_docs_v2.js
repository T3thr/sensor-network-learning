// Generate the Version 2 presentation documents and the web data file from deck_v2.js + qna_v2.js.
//
//   node build_docs_v2.js
//
// -> 04_presentation_v2/presentation-script-5-min.md
// -> 04_presentation_v2/qna-cheatsheet.md
// -> 04_presentation_v2/slide-plan.md
// -> 03_slides_v2/Assignment_Paper_3_v2_Slide_Structure.md
// -> ../../paper-3/assets/v2/js/raftfl-data.js   (teleprompter, Q&A accordion, quiz)
//
// Thai has no spaces between words, so words are counted with Intl.Segmenter (ICU, locale th).
const fs = require('fs');
const path = require('path');
const deck = require('./deck_v2');
const qna = require('./qna_v2');

const ROOT = path.resolve(__dirname, '..');
const PRES = path.join(ROOT, '04_presentation_v2');
const WEBJS = path.resolve(ROOT, '..', '..', 'paper-3', 'assets', 'v2', 'js', 'raftfl-data.js');

const seg = new Intl.Segmenter('th', { granularity: 'word' });
const plain = (t) => t.replace(/\*\*/g, '').replace(/\{b\}/g, ' ').replace(/\[\[|\]\]/g, '');
const countWords = (t) => [...seg.segment(plain(t))].filter((s) => s.isWordLike).length;
const cutsOf = (t) => (t.match(/\[\[(.*?)\]\]/g) || []).map((x) => x.slice(2, -2));
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;
const md = (t) => t.replace(/\{b\}/g, '/').replace(/\[\[(.*?)\]\]/g, '[ตัดได้: $1]');

const stages = deck.stages.map((st) => {
  const words = st.paragraphs.reduce((n, p) => n + countWords(p), 0);
  const cutWords = st.paragraphs.flatMap(cutsOf).reduce((n, c) => n + countWords(c), 0);
  const seconds = st.end - st.start;
  return { ...st, words, cutWords, seconds, wpm: (words / seconds) * 60 };
});
const totalWords = stages.reduce((n, s) => n + s.words, 0);
const totalCut = stages.reduce((n, s) => n + s.cutWords, 0);
const at = (wpm) => (totalWords / wpm) * 60;
const planWpm = totalWords / (deck.meta.totalSeconds / 60);

// ---------- presentation-script-5-min.md ----------
const S = [];
S.push('# สคริปต์นำเสนอ 5 นาที: Raft-FL (SEAMS 2024)', '## 305432 เครือข่ายเซนเซอร์ (Sensor Networks): Assignment Paper 3 Version 2', '');
S.push(`**ผู้นำเสนอ:** ${deck.meta.presenter} ลำดับที่ ${deck.meta.order} รหัสนิสิต ${deck.meta.studentId}  `);
S.push(`**บทความ:** ${deck.meta.paperTitle} (${deck.meta.venueShort}, IEEE Doc ID: ${deck.meta.ieee}, DOI: ${deck.meta.doi})  `);
S.push(`**เป้าหมายเวลา:** ${mmss(deck.meta.totalSeconds)} นาที (ช่วงที่ยอมรับ 4:30 ถึง 4:55 และห้ามเกิน 5:00)`, '');
S.push('> ไฟล์นี้สร้างจาก `.build_v2/deck_v2.js` ซึ่งเป็นแหล่งเดียวกับ Speaker Notes ใน PPTX และ Teleprompter บนเว็บ แก้เนื้อหาที่ไฟล์นั้นแล้วรัน `node build_docs_v2.js`', '');
S.push('## วิธีอ่านสคริปต์', '');
S.push('- **ตัวหนา** คือคำหรือตัวเลขที่ต้องเน้นเสียง');
S.push('- เครื่องหมาย `/` คือจุดหายใจที่วางแผนไว้');
S.push('- `[ตัดได้: ...]` คือประโยคสำรองที่ตัดทิ้งได้ถ้าพูดช้ากว่าแผน สไลด์ยังเข้าใจได้ครบ');
S.push(`- บทพูดทั้งหมดมี **${totalWords} คำ** นับด้วย \`Intl.Segmenter\` ภาษาไทย (ICU) เพราะภาษาไทยไม่เว้นวรรคระหว่างคำ`);
S.push(`- ความเร็วตามแผนคือ **${Math.round(planWpm)} คำต่อนาที** ถ้าพูด 160 คำต่อนาทีจะใช้ ${mmss(at(160))} นาที ถ้าพูด 170 คำต่อนาทีจะใช้ ${mmss(at(170))} นาที และถ้าพูด 185 คำต่อนาทีจะใช้ ${mmss(at(185))} นาที`);
S.push(`- ประโยคที่ตัดได้รวม **${totalCut} คำ** ประหยัดได้ประมาณ **${Math.round((totalCut / planWpm) * 60)} วินาที** ที่ความเร็วตามแผน`, '');
S.push('## ตารางเวลา', '');
S.push('| ช่วงเวลา | สไลด์ | วินาที | คำ | คำ/นาที | คำสำคัญ |', '| :---: | :--- | :---: | :---: | :---: | :--- |');
stages.forEach((s) => S.push(`| ${mmss(s.start)} ถึง ${mmss(s.end)} | ${s.slideTitle} | ${s.seconds} | ${s.words} | ${Math.round(s.wpm)} | ${s.keywords.join(' · ')} |`));
S.push(`| **รวม** | 7 สไลด์ | **${deck.meta.totalSeconds}** | **${totalWords}** | **${Math.round(planWpm)}** | |`, '');
stages.forEach((s) => {
  S.push(`## ${s.title} (${mmss(s.start)} ถึง ${mmss(s.end)})`, '');
  S.push(`**สไลด์:** ${s.slideTitle}  `, `**ความยาว:** ${s.words} คำ ใน ${s.seconds} วินาที (${Math.round(s.wpm)} คำต่อนาที)${s.cutWords ? `, ตัดได้ ${s.cutWords} คำ` : ''}`, '');
  s.paragraphs.forEach((p) => S.push(md(p), ''));
});
S.push('## เช็กลิสต์ก่อนขึ้นนำเสนอ', '');
S.push('1. ซ้อมจับเวลาอย่างน้อย 3 รอบในห้องซ้อมบนเว็บ (`paper-3/index.html?v=2#v2-sec-rehearsal`) และบันทึกเวลาทุกรอบ');
S.push('2. ถ้ารอบใดเกิน 4:55 ให้ตัดประโยค `[ตัดได้]` ตามลำดับ สไลด์ 2, สไลด์ 6, สไลด์ 3');
S.push('3. เปิดไฟล์ PDF บทความไว้ที่หน้า 118 (Fig. 3 และ Fig. 4) สำหรับตอบคำถามเรื่องตัวเลข');
S.push('4. ทบทวน 15 คำถามใน `qna-cheatsheet.md` โดยเฉพาะเรื่อง DOI 10.1145, quorum และทราฟฟิก 5 เท่า', '');
fs.writeFileSync(path.join(PRES, 'presentation-script-5-min.md'), S.join('\n'));

// ---------- qna-cheatsheet.md ----------
const Q = [];
Q.push('# โพยตอบคำถามกรรมการ 15 ข้อ: Raft-FL (SEAMS 2024)', '## 305432 เครือข่ายเซนเซอร์: Assignment Paper 3 Version 2', '');
Q.push(`อ้างอิงบทความ: ${deck.meta.authors}, "${deck.meta.paperTitle}," ${deck.meta.venueShort}, pp. ${deck.meta.pages}, **IEEE Doc ID: ${deck.meta.ieee}**, DOI: ${deck.meta.doi}`, '');
Q.push('**วิธีใช้:** ตอบด้วยบรรทัด "ตอบสั้น" ก่อนภายใน 20 วินาที แล้วขยายด้วย "คำตอบเต็ม" ถ้ากรรมการถามต่อ ช่อง "จุดชี้ในเอกสาร" ใช้เลขหน้าที่พิมพ์บนบทความ (110 ถึง 121) โดย PDF หน้า = เลขหน้าที่พิมพ์ ลบ 109 ส่วนที่เป็นการคำนวณหรือความเห็นของผู้นำเสนอระบุไว้ในคำตอบทุกครั้ง', '');
Q.push('| หมวด | จำนวน |', '| :--- | :---: |');
qna.categories.forEach((c) => Q.push(`| ${c.label} | ${qna.items.filter((i) => i.cat === c.key).length} |`));
Q.push('');
qna.items.forEach((it, i) => {
  const cat = qna.categories.find((c) => c.key === it.cat).label;
  Q.push(`## ${i + 1}. ${it.q}`, '');
  Q.push(`- **หมวด:** ${cat}`, `- **กรรมการต้องการตรวจ:** ${it.intent}`, `- **ตอบสั้น:** ${it.short}`, `- **จุดชี้ในเอกสาร:** ${it.evidence}`, `- **สไลด์ที่ชี้:** ${it.slide}`, '');
  Q.push(`**คำตอบเต็ม:** ${it.answer}`, '');
});
fs.writeFileSync(path.join(PRES, 'qna-cheatsheet.md'), Q.join('\n'));

// ---------- slide-plan.md ----------
const P = [];
P.push('# แผนเวลาของสไลด์ 7 หน้า: Raft-FL (SEAMS 2024)', '## 305432 เครือข่ายเซนเซอร์: Assignment Paper 3 Version 2', '');
P.push('ไฟล์สไลด์: `03_slides_v2/Assignment_Paper_3_v2_5-to-8-min.pptx` และ `.pdf` (16:9, 16 x 9 นิ้ว) ทุกสไลด์ยกเว้นหน้าปกมีฟุตเตอร์ระบุ IEEE Doc ID: 10556381 และ DOI', '');
P.push('| สไลด์ | เริ่ม | จบ | วินาที | หัวข้อ | ภาพ/หลักฐานบนสไลด์ | คำสำคัญที่ต้องพูด |', '| :---: | :---: | :---: | :---: | :--- | :--- | :--- |');
const evidence = [
  'หน้าปก: ชื่อบทความ ผู้แต่ง SEAMS 2024 IEEE Doc ID DOI ชื่อนิสิต',
  'ขั้นตอน FL 5 ขั้น + ตาราง SPOF + ทางเลือกเดิม (Section 3) + แผนภาพโครงสร้างแบบ star (สรุปจาก Section 2.1)',
  'แผนภาพสถานะ Raft + ช่วง Leader Election ของ Fig. 2 (หน้า 117) + สูตร quorum',
  'Fig. 1 (หน้า 116) + ตาราง Level 0 ถึง 4 จาก Table 1 (หน้า 114) + workflow 4 ขั้น',
  'Fig. 3 และ Fig. 4 (หน้า 118) + testbed + ตารางอัตราส่วน 10 แถว + ข้อสังเกต 3 ข้อ',
  'คุณูปการ 3 ข้อ (ซ้าย) + การประยุกต์ใช้ 3 ข้อ พร้อมตารางเทียบ Raft-FL, etcd และ Kafka KRaft (ขวา)',
  'ข้อจำกัด 3 ข้อพร้อมเลขหน้า + ตัวเลขสรุป 2 กล่อง + บทสรุป 3 ข้อ',
];
stages.forEach((s, i) => P.push(`| ${i + 1} | ${mmss(s.start)} | ${mmss(s.end)} | ${s.seconds} | ${s.slideTitle} | ${evidence[i]} | ${s.keywords.join(' · ')} |`));
P.push(`| **รวม** | 0:00 | ${mmss(deck.meta.totalSeconds)} | **${deck.meta.totalSeconds}** | | | |`, '');
P.push('## จุดตรวจเวลาระหว่างพูด', '');
P.push('- เปลี่ยนเข้าสไลด์ผลการทดลองไม่เกิน **2:40** ถ้าช้ากว่านี้ให้ตัดประโยคสำรองในสไลด์ 6');
P.push('- เริ่มสไลด์ข้อจำกัดไม่เกิน **4:15** ถ้าช้ากว่านี้ให้พูดเฉพาะหัวข้อการ์ดทั้ง 3 ใบแล้วสรุปทันที');
P.push('- ห้ามพูดเลขสไลด์ ให้เชื่อมด้วยเนื้อหา เช่น "ผู้วิจัยแก้ปัญหานี้ด้วย Raft ครับ"', '');
fs.writeFileSync(path.join(PRES, 'slide-plan.md'), P.join('\n'));

// ---------- 03_slides_v2 structure ----------
const T = [];
T.push('# โครงสร้างสไลด์ 7 หน้า Version 2: Raft-FL (SEAMS 2024, IEEE Doc ID: 10556381)', '## 305432 เครือข่ายเซนเซอร์ (Sensor Networks)', '');
T.push('สไลด์ขนาด 16:9 ตาม SLIDES_DESIGN_SYSTEM.md: แถบหัวสีกรมท่า (#0F2D4A) สูง 0.95 นิ้ว พื้นหลัง #F8FAFC การ์ดพื้นขาวขอบ #E2E8F0 ฟอนต์ IBM Plex Thai (หัวข้อการ์ด 14.5 pt ตัวหนา เนื้อหา 11.5 pt ตัวเลขสถิติ 24 pt ตัวหนา) และฟุตเตอร์ระบุ SEAMS 2024, IEEE Doc ID: 10556381 พร้อมเลขหน้า Slide N / 7', '');
stages.forEach((s, i) => T.push(`${i + 1}. **${s.slideTitle}** (${mmss(s.start)} ถึง ${mmss(s.end)}): ${evidence[i]}`));
T.push('');
fs.writeFileSync(path.join(ROOT, '03_slides_v2', 'Assignment_Paper_3_v2_Slide_Structure.md'), T.join('\n'));

// ---------- web data ----------
const web = {
  meta: deck.meta,
  totalWords, planWpm: Math.round(planWpm),
  stages: stages.map((s) => ({ start: s.start, end: s.end, title: s.title, slideTitle: s.slideTitle, keywords: s.keywords, paragraphs: s.paragraphs, words: s.words })),
  categories: qna.categories,
  qna: qna.items,
  quiz: qna.quiz,
};
fs.mkdirSync(path.dirname(WEBJS), { recursive: true });
fs.writeFileSync(WEBJS, `// Generated by assignement/work3/.build_v2/build_docs_v2.js from deck_v2.js and qna_v2.js. Do not edit by hand.\nwindow.RAFTFL_DATA = ${JSON.stringify(web, null, 1)};\n`);

console.log(`words ${totalWords} (cut ${totalCut}), plan ${Math.round(planWpm)} wpm, at 170 wpm ${mmss(at(170))}`);
console.log('wrote script, qna, slide-plan, slide structure, raftfl-data.js');
