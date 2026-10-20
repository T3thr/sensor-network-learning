import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const base = path.dirname(here); // .../sensor-network

const slidesData = [
  {
    title: "Publish-Time Optimizations for Web-Based Visualizations",
    start: 0,
    end: 25,
    source: "ชื่อเรื่องและ Abstract · PDF หน้า 1",
    beats: [
      {
        cue: "เปิดประเด็น: เสี้ยววินาทีที่ทำลายสมาธิ → การเปลี่ยนวิธีคิดสู่ Publish-Time",
        text: "ความล่าช้าเพียงเสี้ยววินาทีในการเปิดหน้าเว็บ สามารถทำลายสมาธิการวิเคราะห์ข้อมูลได้ทันที บทความ Publish-Time Optimizations for Web-Based Visualizations จาก IEEE VIS 2025 โดย University of Washington จึงเปลี่ยนวิธีคิด จากการคำนวณสดเมื่อเปิดเว็บ มาเป็นการเตรียมข้อมูลและภาพล่วงหน้าตั้งแต่ตอนเผยแพร่ ผ่าน Mosaic Publisher เพื่อให้การเปิดดูข้อมูลขนาดใหญ่ทำได้ทันที"
      }
    ]
  },
  {
    title: "ที่มา ปัญหาความหน่วง และตัวชี้วัด",
    start: 25,
    end: 65,
    source: "§1, §3.1 · PDF หน้า 1–2",
    beats: [
      {
        cue: "ต้นตอความหน่วง: การคำนวณสดซ้ำซากและอาการกดค้าง",
        text: "ปัญหาดั้งเดิมของเว็บวิเคราะห์ข้อมูล คือเบราว์เซอร์ต้องดึงข้อมูลดิบ รันคิวรี และวาดชาร์ตใหม่ทุกครั้ง จึงเกิดความหน่วงเมื่อเริ่มใช้งาน หรือ Cold Start และที่ชวนหงุดหงิดที่สุด คือภาพชาร์ตขึ้นมาแล้ว แต่ปุ่มยังคลิกไม่ติด จนเกิดการกดย้ำ ๆ ด้วยความโมโห"
      },
      {
        cue: "กรอบตัวชี้วัดใหม่: แยกเวลาเห็นภาพ เวลาพร้อมใช้งาน และต้นทุนพื้นที่",
        text: "งานวิจัยนี้จึงแยกตัวชี้วัดเป็นสองแกนสำคัญ คือ TTR หรือเวลาจนสายตามองเห็นชาร์ตครบถ้วน และ TTA คือเวลาที่พร้อมคลิกหรือซูมข้อมูลได้จริง ควบคู่กับ SC เพื่อดูว่าความเร็วที่เพิ่มขึ้นนี้ ต้องแลกกับพื้นที่จัดเก็บบนเซิร์ฟเวอร์เท่าใด"
      }
    ]
  },
  {
    title: "สถาปัตยกรรม Mosaic Publisher",
    start: 65,
    end: 110,
    source: "Figure 1, §4.1–4.3 · PDF หน้า 1, 3",
    beats: [
      {
        cue: "การเปลี่ยนกระบวนทัศน์: เตรียมพร้อมล่วงหน้าผ่านสามเสาหลัก",
        text: "หัวใจของ Mosaic Publisher คือการย้ายงานคำนวณทั้งหมดไปทำล่วงหน้าก่อนปล่อยขึ้นเว็บ เปรียบเสมือนเชฟที่เตรียมวัตถุดิบและเคี่ยวน้ำซุปรอไว้ โดยแบ่งเป็นสามเสาหลัก คือตัดแต่งเฉพาะคอลัมน์ที่จำเป็น คำนวณผลสรุปทางสถิติเตรียมไว้ในฐานข้อมูล และวาดภาพชาร์ตเริ่มต้นรอไว้ล่วงหน้า"
      },
      {
        cue: "กลไกอัตโนมัติ: ค้นหาคิวรีและส่งมอบทรัพยากรพร้อมใช้",
        text: "กระบวนการนี้ทำงานอัตโนมัติ โดยวิเคราะห์โค้ดและจำลองการคลิกเสมือนจริงเพื่อค้นหาคิวรี แล้วใช้ DuckDB สร้างผลลัพธ์สำเร็จรูป สิ่งที่ส่งสู่เบราว์เซอร์จึงเป็นไฟล์ผลรวมและ DuckDB-WASM ที่เติมแคชพร้อมใช้ ช่วยปลดล็อกให้อุปกรณ์ของผู้ใช้ไม่ต้องแบกรับภาระการประมวลผลหนัก ๆ ซ้ำอีก"
      }
    ]
  },
  {
    title: "ภาพล่วงหน้าและการเริ่มระบบโต้ตอบ",
    start: 110,
    end: 155,
    source: "§4.3, Figure 4, §5 · PDF หน้า 3–4",
    beats: [
      {
        cue: "ข้อค้นพบสำคัญ: การมองเห็นภาพและต้นทุน Hydration",
        text: "แม้การวาดภาพล่วงหน้าจะช่วยให้สายตามองเห็นข้อมูลได้เร็ว จนค่า TTR ลดลงอย่างมาก แต่งานวิจัยได้ค้นพบความจริงสำคัญ นั่นคือเวลาส่วนใหญ่ที่ยังเหลืออยู่ มาจากขั้นตอน Client Hydration หรือการรันจาวาสคริปต์เพื่อปลุกให้ภาพนิ่งเหล่านั้นพร้อมตอบสนองต่อการสัมผัส"
      },
      {
        cue: "ความต่างเชิงโครงสร้าง: ทำไมการมองเห็นจึงไม่เท่ากับพร้อมใช้งาน",
        text: "หากเป็นภาพสถิตทั่วไป การส่งภาพที่วาดเสร็จจะจบงานได้ทันที แต่สำหรับภาพเชิงโต้ตอบ เบราว์เซอร์ยังต้องใช้เวลาสร้างคอมโพเนนต์ใหม่เกือบเท่าการวาดชาร์ตเต็มชุด ต้นทุน Hydration จึงเป็นคอขวดที่อธิบายว่า เหตุใดการมองเห็นภาพ จึงไม่เท่ากับการพร้อมรับการคลิกใช้งานจริง"
      }
    ]
  },
  {
    title: "ผลการทดลอง: เวลาเปิดภาพและต้นทุนพื้นที่",
    start: 155,
    end: 215,
    source: "Figure 3–4, Table 1, §5 · PDF หน้า 4",
    beats: [
      {
        cue: "หลักฐานเชิงประจักษ์: ลดเวลารอเห็นภาพได้ถึง 83.7%",
        text: "ผลทดสอบกับชุดข้อมูลจริงห้ารูปแบบ สูงถึงสิบล้านแถว ยืนยันว่าการสร้างภาพล่วงหน้าลดเวลาการเห็นข้อมูล หรือ TTR ลงได้ถึง 83.7% ช่วยตัดปัญหาหน้าจอว่างเปล่าได้อย่างหมดจด ไม่ว่าข้อมูลเบื้องหลังจะมีปริมาณมหาศาลเพียงใด"
      },
      {
        cue: "บทบาทที่แท้จริง: พลังของแคชต่อการตอบสนอง และผลต่างหนึ่งจุดเปอร์เซ็นต์",
        text: "ขณะที่เวลาจนพร้อมโต้ตอบ หรือ TTA ลดลงได้ 33.3% โดยพระเอกตัวจริงคือระบบแคชผลรวมล่วงหน้าที่ลดเวลาไปได้ถึง 32.3% ส่วนภาพล่วงหน้าช่วยเพิ่มความเร็วตอบสนองอีกเพียง 1.0 จุดเปอร์เซ็นต์ ตอกย้ำว่าภาพที่ปรากฏไม่ได้แปลว่าพร้อมโต้ตอบทันที"
      },
      {
        cue: "ข้อแลกเปลี่ยนทางวิศวกรรม: ยอมเสียพื้นที่จัดเก็บเพื่อซื้อเวลาของผู้ใช้",
        text: "แต่ความเร็วนี้ต้องแลกกับพื้นที่จัดเก็บบนเซิร์ฟเวอร์ หรือ SC ที่เพิ่มขึ้นเฉลี่ย 21.2% บนเครื่องทดสอบ M1 Pro ชี้ชัดว่านี่คือข้อแลกเปลี่ยนที่คุ้มค่าอย่างยิ่ง ในการยอมเสียพื้นที่ดิสก์เพื่อแลกกับการคืนเวลาและสมาธิให้แก่ผู้ใช้งาน"
      }
    ]
  },
  {
    title: "ผลงานวิจัยและข้อจำกัดของการทดลอง",
    start: 215,
    end: 250,
    source: "§3–5 · PDF หน้า 2–4; ข้อจำกัดตามสภาพแวดล้อมและข้อมูลที่รายงาน",
    beats: [
      {
        cue: "จุดเด่นเชิงระบบ: การประเมินแบบแยกส่วนที่ใช้งานได้จริง",
        text: "จุดเด่นสำคัญของงานนี้ คือการสร้างระบบที่ใช้ได้จริงกับสเปกเว็บเดิม พร้อมวางกรอบประเมินใหม่ที่แยกเวลามองเห็น เวลาโต้ตอบ และต้นทุนพื้นที่ออกจากกัน ทำให้ระบุได้อย่างแม่นยำว่าความเร็วเกิดขึ้นในขั้นตอนใด"
      },
      {
        cue: "ขอบเขตความเที่ยงตรง: ข้อจำกัดของสภาพแวดล้อมทดสอบ",
        text: "อย่างไรก็ตาม ในเชิงวิชาการยังมีข้อจำกัดสำคัญ เพราะวัดผลบนเครื่องเดี่ยวและเครือข่ายภายในเท่านั้น ยังไม่ได้ทดสอบบนสมาร์ตโฟนหรืออินเทอร์เน็ตระยะไกล อีกทั้งยังมีภาระ Hydration และหากข้อมูลต้นทางเปลี่ยน ก็ต้องประมวลผลไฟล์ล่วงหน้าใหม่ทั้งหมด"
      }
    ]
  },
  {
    title: "สรุปผลและแนวทางวิจัยในอนาคต",
    start: 250,
    end: 295,
    source: "Table 1, Figure 4, §5–6 · PDF หน้า 4",
    beats: [
      {
        cue: "บทสรุปการวิจัย: ข้อค้นพบสำคัญและข้อแลกเปลี่ยน",
        text: "โดยสรุปแล้ว ข้อค้นพบหลักยืนยันว่า การเตรียมแคชล่วงหน้าคือหัวใจสำคัญในการตัดภาระคำนวณ เพื่อให้ระบบพร้อมโต้ตอบได้เร็วขึ้น ขณะที่การสร้างภาพล่วงหน้าช่วยให้เห็นชาร์ตทันทีโดยไม่ต้องรอนาน โดยยอมแลกกับพื้นที่จัดเก็บบนเซิร์ฟเวอร์ที่เพิ่มขึ้นในระดับที่บริหารจัดการได้"
      },
      {
        cue: "ก้าวต่อไป: สถาปัตยกรรมแห่งอนาคตและการปิดการนำเสนอ",
        text: "ก้าวต่อไปคือการพัฒนา Progressive Hydration เพื่อเริ่มระบบเฉพาะส่วนที่จำเป็น ควบคู่กับการปรับปรุงข้อมูลเฉพาะจุดที่เปลี่ยนแปลง การย้ายงานสู่ Publish-Time จึงเป็นรากฐานสำคัญที่ทำให้เว็บข้อมูลขนาดใหญ่เปิดใช้งานได้อย่างลื่นไหล ขอจบการนำเสนอสำหรับการรับฟัง และพร้อมรับข้อซักถามในลำดับถัดไป"
      }
    ]
  }
];

// Enrich slidesData with text field
const slidesWithText = slidesData.map(s => ({
  ...s,
  text: s.beats.map(b => b.text).join('\n\n')
}));

// 1. Update pubtime-data.js
const pubtimePath = path.join(base, 'paper-4/assets/js/pubtime-data.js');
let pubtimeContent = await fs.readFile(pubtimePath, 'utf8');
const slidesStartIdx = pubtimeContent.indexOf('slides: [');
if (slidesStartIdx === -1) {
  throw new Error('slides: [ not found in pubtime-data.js');
}
const preSlides = pubtimeContent.slice(0, slidesStartIdx);
const newSlidesJSON = 'slides: ' + JSON.stringify(slidesWithText, null, 2) + '\n};\n';
pubtimeContent = preSlides + newSlidesJSON;
await fs.writeFile(pubtimePath, pubtimeContent, 'utf8');
console.log('✓ Updated paper-4/assets/js/pubtime-data.js');

// 2. Update deck_v4.mjs
const deckPath = path.join(base, 'assignement/work4/.build_v4/deck_v4.mjs');
const stagesForDeck = slidesWithText.map(s => ({
  title: s.title,
  start: s.start,
  end: s.end,
  notes: s.text,
  source: s.source
}));
const deckMetaStr = "export const meta={title:'Publish-Time Optimizations for Web-Based Visualizations',authors:'Ron Pechuk, Jeffrey Heer',institution:'University of Washington',venue:'2025 IEEE Visualization and Visual Analytics (VIS), pp. 226–230',doi:'10.1109/VIS60296.2025.00051',ieee:'11298742',presenter:'นายธีรภัทร ภู่ระย้า',studentId:'66362416'};\n";
const deckContent = deckMetaStr + 'export const stages = ' + JSON.stringify(stagesForDeck, null, 2) + ';\n';
await fs.writeFile(deckPath, deckContent, 'utf8');
console.log('✓ Updated assignement/work4/.build_v4/deck_v4.mjs');

// 3. Update speaker-notes.json
const speakerNotesPath = path.join(base, 'assignement/work4/.build_v4/speaker-notes.json');
await fs.writeFile(speakerNotesPath, JSON.stringify(stagesForDeck, null, 2) + '\n', 'utf8');
console.log('✓ Updated assignement/work4/.build_v4/speaker-notes.json');

// 4. Update Assignment_Paper_4_Rehearsal_Script_TH.md
const rehearsalMdPath = path.join(base, 'assignement/work4/04_presentation/Assignment_Paper_4_Rehearsal_Script_TH.md');
const clock = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
let rehearsalMd = `# บทพูดนำเสนอ Paper IV — ฉบับทางการเชิงวิชาการ\n\nแผน 4:55 นาที · 7 สไลด์ · เผื่อก่อนครบ 5:00 อีก 5 วินาที\n\nบทพูดเรียบเรียงในรูปแบบการเล่าเรื่องเชิงระบบอย่างเป็นธรรมชาติ โดยคงความถูกต้องทางวิชาการและผลการทดลองครบถ้วน ป้ายจุดชี้ภาพและหลักฐานไม่ต้องอ่านออกเสียง เวลาแต่ละช่วงเป็นแผนซ้อมเพื่อรักษาจังหวะการพูด\n`;

slidesData.forEach((s, i) => {
  rehearsalMd += `\n## สไลด์ ${i + 1} · ${s.title}\n\nช่วง ${clock(s.start)}–${clock(s.end)} · ${s.end - s.start} วินาที\n`;
  s.beats.forEach(b => {
    rehearsalMd += `\n**จุดชี้ภาพ: ${b.cue}**\n\n${b.text}\n`;
  });
  rehearsalMd += `\nหลักฐาน: ${s.source}\n`;
});
await fs.writeFile(rehearsalMdPath, rehearsalMd, 'utf8');
console.log('✓ Updated assignement/work4/04_presentation/Assignment_Paper_4_Rehearsal_Script_TH.md');

// 5. Update presentation-script-from-podcast.th.md
const podcastScriptPath = path.join(base, 'assignement/work4/07_podcast/presentation-script-from-podcast.th.md');
let podcastScriptMd = `# บทพูดนำเสนอ Paper IV — ฉบับเชื่อมโยงพอดแคสต์และการเล่าเรื่องเชิงวิชาการ\n\nแผน 4:55 นาที · 7 สไลด์ · เผื่อก่อนครบ 5:00 อีก 5 วินาที\n\nบทพูดนี้ถอดบทเรียนจากการจัดรายการพอดแคสต์มาสู่การนำเสนอจริง อธิบายงานวิจัยเชิงวิศวกรรมให้เข้าใจง่ายและเห็นภาพ โดยไม่ย่อทอนคุณค่าเชิงวิชาการหรือตัวเลขผลการทดลองสำคัญตามต้นฉบับ IEEE VIS 2025\n`;

slidesData.forEach((s, i) => {
  podcastScriptMd += `\n## สไลด์ ${i + 1} · ${s.title}\n\nช่วง ${clock(s.start)}–${clock(s.end)} · ${s.end - s.start} วินาที\n`;
  s.beats.forEach(b => {
    podcastScriptMd += `\n**จุดชี้ภาพ: ${b.cue}**\n\n${b.text}\n`;
  });
  podcastScriptMd += `\nหลักฐาน: ${s.source}\n`;
});
await fs.writeFile(podcastScriptPath, podcastScriptMd, 'utf8');
console.log('✓ Updated assignement/work4/07_podcast/presentation-script-from-podcast.th.md');

// 6. Export Slide Structure
const slideStructurePath = path.join(base, 'assignement/work4/03_slides/Assignment_Paper_4_PublishTimeOpt_Slide_Structure.md');
let structureMd = `# โครงสไลด์ Paper IV และ Speaker Notes\n\nPublish-Time Optimizations for Web-Based Visualizations\n\n7 สไลด์ 16:9 อ้างอิง Work 3 v3 ช่วงเวลาเป็นแผนรวม 4:55 นาที ปกไม่มีเลขหน้า หน้าเนื้อหาใช้เลข 1–6 บทพูดเต็มซิงก์กับห้องซ้อมบนเว็บ Paper IV\n\n| หน้า | ประเด็น | ช่วงเวลา |\n|---|---|---|\n`;
slidesData.forEach((s, i) => {
  structureMd += `| ${i + 1} | ${s.title} | ${clock(s.start)}–${clock(s.end)} |\n`;
});
slidesData.forEach((s, i) => {
  const fullText = s.beats.map(b => b.text).join('\n\n');
  structureMd += `\n## ${i + 1}. ${s.title}\n\nช่วงเวลา ${clock(s.start)}–${clock(s.end)} (${s.end - s.start} วินาที)\n\n${fullText}\n\nที่มา: ${s.source} DOI: [10.1109/VIS60296.2025.00051](https://doi.org/10.1109/VIS60296.2025.00051)\n`;
});
structureMd += '\nตำแหน่งหน้า PDF อ้าง [ไฟล์ที่ได้รับ](../01_original/Paper_IV_1_PRIMARY_PublishTimeOpt_11298742.pdf) ตาม [ข้อตกลงหลักฐาน](../05_study/evidence/README.md) ไม่ใช่เลขหน้าพิมพ์ของ proceedings\n';
await fs.writeFile(slideStructurePath, structureMd, 'utf8');
console.log('✓ Updated assignement/work4/03_slides/Assignment_Paper_4_PublishTimeOpt_Slide_Structure.md');
