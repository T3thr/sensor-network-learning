import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { meta, stages } from './deck_v4.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
let content = `# โครงสไลด์ Paper IV และ Speaker Notes\n\n${meta.title}\n\n7 สไลด์ 16:9 อ้างอิง Work 3 v3 ช่วงเวลาเป็นแผนรวม 4:55 นาที ยังไม่ใช่เวลาซ้อมที่วัดจริง ปกไม่มีเลขหน้า หน้าเนื้อหาใช้เลข 1–6 ส่วนลำดับสไลด์ในเอกสารนับรวมปกเป็น 7 หน้า บทพูดเต็มซิงก์กับห้องซ้อมบนเว็บ Paper IV\n\n| หน้า | ประเด็น | ช่วงเวลา |\n|---|---|---|\n`;
for (let i = 0; i < stages.length; i++) {
  const s = stages[i];
  content += `| ${i + 1} | ${s.title} | ${clock(s.start)}–${clock(s.end)} |\n`;
}
for (let i = 0; i < stages.length; i++) {
  const s = stages[i];
  content += `\n## ${i + 1}. ${s.title}\n\nช่วงเวลา ${clock(s.start)}–${clock(s.end)} (${s.end - s.start} วินาที)\n\n${s.notes}\n\nที่มา: ${s.source} DOI: [${meta.doi}](https://doi.org/${meta.doi})\n`;
}
content += '\nตำแหน่งหน้า PDF อ้าง [ไฟล์ที่ได้รับ](../01_original/Paper_IV_1_PRIMARY_PublishTimeOpt_11298742.pdf) ตาม [ข้อตกลงหลักฐาน](../05_study/evidence/README.md) ไม่ใช่เลขหน้าพิมพ์ของ proceedings\n';
await fs.writeFile(path.join(root, '03_slides/Assignment_Paper_4_PublishTimeOpt_Slide_Structure.md'), content);
