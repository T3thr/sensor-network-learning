// Generate 04_presentation_v3/presentation-script-5-min.md from deck_v3.js.
//
//   node build_script_v3.js
//
// Word counts use ICU word segmentation through Swift (wordcount.swift, NSString .byWords), the
// same method used for every earlier count in this assignment. Node's Intl.Segmenter splits Thai
// differently (about 15 words where ICU/Swift gives 11), so it is not used.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const deck = require('./deck_v3');

const OUT = path.resolve(__dirname, '..', '04_presentation_v3', 'presentation-script-5-min.md');
const plain = (t, cut) => (cut ? t.replace(/\[\[.*?\]\]/g, '') : t).replace(/\*\*/g, '').replace(/\[\[|\]\]/g, '').replace(/\s+/g, ' ').trim();
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const input = deck.stages.flatMap((s, i) => [`${i}\t${plain(s.paragraphs.join(' '))}`, `${i}c\t${plain(s.paragraphs.join(' '), true)}`]).join('\n') + '\n';
const out = execFileSync('swift', [path.join(__dirname, 'wordcount.swift')], { input, encoding: 'utf8' });
const counts = {};
out.trim().split('\n').forEach((l) => { const [k, v] = l.split('\t'); counts[k] = +v; });
const words = deck.stages.map((_, i) => counts[i]);
const wordsCut = deck.stages.map((_, i) => counts[i + 'c']);
const total = words.reduce((a, b) => a + b, 0);
const totalCut = wordsCut.reduce((a, b) => a + b, 0);
const wpm = total / (deck.meta.totalSeconds / 60);

const L = [];
L.push('# สคริปต์คำต่อคำสำหรับนำเสนอ 5 นาที (Target 4:55) Version 3');
L.push('## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) · P2SQL / LangShield (ICSE 2025, IEEE Doc ID: 11029790)', '');
L.push(`- **ผู้นำเสนอ:** ${deck.meta.presenter} รหัสนิสิต ${deck.meta.studentId}`);
L.push(`- **ความยาว:** ${total} คำ นับด้วย ICU เพื่อเทียบกับบทเดิม`);
L.push(`- **เวลา:** ${mmss(deck.meta.totalSeconds)} นาที ที่ความเร็วประมาณ ${Math.round(wpm)} คำต่อนาที (ช่วงยอมรับ 4:45 - 5:00 ห้ามเกิน 5:00)`);
L.push('- **หลักการพูด:** เล่าแบบสนทนาทางวิชาการ ใช้ตัวอย่างและเหตุผลเชื่อมแต่ละช่วง เว้นจังหวะให้ผู้ฟังตามทัน คำที่เป็นตัวหนาคือคำที่ควรเน้นเสียง');
L.push('- **การซ้อม:** ทุกย่อหน้าเป็นบทพูดหลัก ใช้การขึ้นย่อหน้าเป็นจังหวะพักและเชื่อมความคิด เวลาที่แสดงเป็นกรอบซ้อม ต้องตรวจด้วยการพูดจริง');
L.push('', '> ไฟล์นี้สร้างจาก `.build_v3/deck_v3.js` ซึ่งใช้สร้างบทในหน้าเว็บ แก้บทพูดที่ไฟล์นั้นแล้วรัน `node build_script_v3.js` และ `node build_p3v3_pages.js --rehearsal-only`', '', '---', '');
deck.stages.forEach((s, i) => {
  L.push(`## ช่วงที่ ${i + 1} · ${s.slideTitle} (${mmss(s.start)} - ${mmss(s.end)}, ${s.end - s.start} วินาที, ${words[i]} คำ)`, '');
  s.paragraphs.forEach((p) => L.push(p.replace(/\[\[(.*?)\]\]/g, '[$1]'), ''));
});
L.push('---', '', '## ผลการนับคำและงบเวลา', '');
L.push(`นับด้วย ICU word segmentation (Swift \`enumerateSubstrings(options: .byWords)\`) เวลาคาดการณ์คำนวณที่ ${Math.round(wpm)} คำต่อนาที`, '');
L.push('| ช่วง | หัวข้อ | งบเวลา | จำนวนคำ | เวลาพูดโดยประมาณ |', '| :---: | :--- | :---: | :---: | :---: |');
deck.stages.forEach((s, i) => L.push(`| ${i + 1} | ${s.slideTitle} | ${s.end - s.start} วินาที | ${words[i]} | ${Math.round((words[i] / wpm) * 60)} วินาที |`));
L.push(`| **รวม** | | **${mmss(deck.meta.totalSeconds)}** | **${total}** | **${mmss(Math.round((total / wpm) * 60))}** |`, '');
L.push(`จุดตรวจเวลาระหว่างซ้อม: จบช่วงปัญหา ${mmss(deck.stages[1].end)}, จบช่วง LangShield ${mmss(deck.stages[3].end)}, จบช่วงผลการทดลอง ${mmss(deck.stages[4].end)}`, '');
L.push('## แผนเนื้อหาและหลักฐานสำหรับตรวจบท (ไม่ต้องอ่านออกเสียง)', '');
L.push('บทพูดครอบคลุมประเด็นหลักของสไลด์ทั้งเจ็ดหน้า ตัวเลขที่ซ้ำและข้อมูลบรรณานุกรมใช้ดูประกอบบนสไลด์ รายละเอียดการทดลองรายโมเดล ตัวอย่างพรอมต์ทั้งหมด งานที่เกี่ยวข้อง และข้อเสนอแนะรายข้ออ่านเพิ่มเติมในบทสอนและต้นฉบับ ไม่อ้างว่าเล่ารายละเอียดทั้งบทความได้ทั้งหมดในห้านาที', '');
L.push('| ช่วง | ประเด็นที่อธิบาย | หลักฐาน |', '| :---: | :--- | :--- |');
deck.stages.forEach((stage, i) => L.push(`| ${i + 1} | ${stage.coverage} | ${stage.source} |`));
L.push('', '## หลักฐานประกอบตัวเลขในบทพูดและสไลด์', '');
L.push('| ตัวเลขที่พูด | ความหมาย | ที่มา |', '| :--- | :--- | :--- |');
[
  ['เจ็ดแบบ / ยี่สิบครั้ง / หนึ่งจุดศูนย์ / หกสิบเปอร์เซ็นต์', 'การโจมตี 7 แบบ ทดซ้ำ 20 ครั้ง อัตราสำเร็จ 1.0 และ RI.1 บน agent 0.6', 'Section III-A, Table II, p. 1771-1772'],
  ['ศูนย์จุดเจ็ด / หนึ่งจุดแปดเจ็ดมิลลิวินาที', 'เวลาเฉลี่ยของ SQL query checking และ query rewriting ตามลำดับ', 'Section VI-C, p. 1778'],
  ['LLM เจ็ดรุ่น', 'โมเดลที่ทดสอบ', 'Table III, p. 1773'],
  ['ยี่สิบสองจากยี่สิบสาม / สิบเอ็ดจากยี่สิบสาม', 'Red Team และเครื่องมืออัตโนมัติ', 'Table VI, p. 1775 และ Finding 8'],
  ['ห้าสิบห้า / แปดสิบแปด / ร้อย / เจ็ดสิบแปด', 'LLM guard รุ่น 1, 2, 3 และ Rebuff บน GPT-3.5', 'Figure 3, p. 1778'],
  ['หนึ่งร้อยห้าสิบ', 'ผลลัพธ์ปกติที่ใช้วัด false positive', 'Finding 11, p. 1778'],
  ['ร้อยสี่สิบเจ็ด / หกสิบสี่ / ห้าสิบหกเปอร์เซ็นต์', '147.30 s, 64.15 s, 56.45%', 'Figure 4, p. 1778'],
  ['หนึ่งพันหนึ่งร้อยยี่สิบ / เก้าสิบเก้าจุดห้าห้า', 'ชุดขยายและอัตราตรวจจับ', 'Section VI-C และ Finding 13, p. 1778-1779'],
  ['หกสิบรายการ', 'จำนวนพรอมต์ที่ใช้ประเมิน LLM guard', 'Section VI-C, p. 1777'],
  ['จำนวนดาวที่อธิบายบนสไลด์', 'LangChain 80,000 และ LlamaIndex 29,600 ณ เวลาที่บทความสำรวจ ไม่ใช่จำนวนผู้ใช้งาน', 'Table I, p. 1771'],
  ['ห้าสิบหก / สิบเอ็ด / ศูนย์จุดหก', 'DeBERTa ลดเวลา 56.45% · เครื่องมืออัตโนมัติ 11 จาก 23 · RI.1 บน agent 0.6', 'Figure 4 p. 1778 · Finding 8 · Table II p. 1772'],
].forEach((r) => L.push(`| ${r.join(' | ')} |`));
L.push('', 'หมายเหตุ: เลขหน้าในเอกสารนี้คือเลขที่พิมพ์ท้ายหน้าใน PDF (1769-1781) ส่วน IEEE Xplore ระบุ pp. 1768-1780', '');
L.push('ข้อควรทราบก่อนนำเสนอ: สไลด์ผลทดลองระบุ 0.43 วินาทีต่อตัวอย่างตามบทความ แต่ Section VI-C.2 ระบุว่าเวลารวม 64.15 วินาทีวัดบนพรอมต์โจมตี 60 รายการ ซึ่งหารกันได้ประมาณ 1.07 วินาที จึงใช้เวลารวมและร้อยละที่ลดลงในบทพูด โดยไม่ยืนยันตัวหารของค่า 0.43 วินาที', '');
fs.writeFileSync(OUT, L.join('\n'));
console.log(`script -> ${OUT}  words ${total} (cut ${totalCut}), ${Math.round(wpm)} wpm`);
