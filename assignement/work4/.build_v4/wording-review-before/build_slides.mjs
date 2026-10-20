import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {GlobalFonts} from '@napi-rs/canvas';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
import {meta,stages} from './deck_v4.mjs';

const HERE=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.dirname(HERE);
const SKILL='/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations';
const PYTHON='/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const FONT='IBM Plex Sans Thai';
GlobalFonts.registerFromPath(path.join(HERE,'IBMPlexThai-Regular.ttf'));
GlobalFonts.registerFromPath(path.join(HERE,'IBMPlexThai-Bold.ttf'));
const {finalizePresentation}=await import(pathToFileURL(path.join(SKILL,'container_tools/artifact_tool_utils.mjs')).href);
const p=Presentation.create({slideSize:{width:1536,height:864}});
const C={navy:'#0F2D4A',blue:'#1E3A8A',canvas:'#F8FAFC',border:'#E2E8F0',ink:'#0F172A',body:'#475569',muted:'#64748B',red:'#991B1B'};
let id=0;

function shape(s,x,y,w,h,fill,line='none',radius=0){
  return s.shapes.add({name:'shape-'+(++id),geometry:'rect',position:{left:x,top:y,width:w,height:h},fill,line:{fill:line,width:line==='none'?0:1},borderRadius:radius});
}

function text(s,value,x,y,w,h,size=18.67,bold=false,color=C.body,align='left'){
  const t=s.shapes.add({name:'text-'+(++id),geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  t.text=value;
  t.text.style={typeface:FONT,fontSize:size,bold,color,alignment:align,verticalAlignment:'top',autoFit:'none',wrap:'square',insets:{top:0,bottom:0,left:0,right:0}};
  return t;
}

function card(s,x,y,w,h,title='',color=C.navy){
  shape(s,x,y,w,h,'#FFFFFF',C.border,10);
  if(title)text(s,title,x+32,y+24,w-64,36,22,true,color);
}

function line(s,x,y,w){shape(s,x,y,w,1,C.border);}

function slide(i){
  const s=p.slides.add();
  s.background.fill=C.canvas;
  if(i){
    shape(s,0,0,1536,91.2,C.navy);
    text(s,stages[i].title,86.4,24,1363.2,52,28,true,'#FFFFFF');
    line(s,0,820.8,1536);
    text(s,`เอกสารอ้างอิง: Pechuk & Heer, IEEE VIS 2025 (IEEE Doc ID: ${meta.ieee})`,86.4,837,1260,20,14.67,false,C.muted);
    text(s,String(i+1),1360,835,90,23,17.33,true,C.navy,'right');
  }
  s.speakerNotes.textFrame.setText(`เวลา ${stages[i].start}–${stages[i].end} วินาที (${stages[i].end-stages[i].start} วินาที)\n\n${stages[i].notes}\n\nSource: ${stages[i].source}\nDOI: ${meta.doi}`);
  return s;
}

async function image(s,name,x,y,w,h){
  const bytes=await fs.readFile(path.join(ROOT,'05_study/evidence/figures',name));
  s.images.add({blob:new Uint8Array(bytes),contentType:'image/png',alt:name,fit:'contain',position:{left:x,top:y,width:w,height:h}});
}

function flow(s,labels,x,y,w,h){
  const gap=28;
  const box=(w-gap*(labels.length-1))/labels.length;
  labels.forEach((v,i)=>{
    shape(s,x+i*(box+gap),y,box,h,'#F8FAFC',C.border,8);
    text(s,v,x+i*(box+gap)+10,y+20,box-20,h-32,18,true,C.navy,'center');
    if(i<labels.length-1){
      const a=x+(i+1)*box+i*gap+4;
      shape(s,a,y+h/2,18,2,C.navy);
      s.shapes.add({name:'flow-arrow-'+(++id),geometry:'triangle',position:{left:a+14,top:y+h/2-4,width:8,height:10,rotation:90},fill:C.navy,line:{fill:'none',width:0}});
    }
  });
}

function colCard3Items(s,x,y,w,h,title,items,titleColor=C.navy){
  card(s,x,y,w,h,title,titleColor);
  const padX=32;
  const innerX=x+padX;
  const innerW=w-2*padX;
  const itemH=145;
  for(let i=0;i<3;i++){
    const itemY=y+84+i*186;
    text(s,String(i+1),innerX,itemY,28,34,21.33,true,titleColor);
    text(s,items[i][0],innerX+38,itemY,innerW-38,34,20,true,C.ink);
    text(s,items[i][1],innerX+38,itemY+36,innerW-38,itemH-38,16.5,false,C.body);
    if(i<2){
      line(s,innerX,itemY+165,innerW);
    }
  }
}

// ==========================================
// Slide 1: Cover
// ==========================================
let s=slide(0);
text(s,'305432 เครือข่ายเซนเซอร์ (Sensor Networks)',100,165,1336,36,17.33,false,C.body,'center');
text(s,'Publish-Time Optimizations\nfor Web-Based Visualizations',100,230,1336,130,45.33,true,C.ink,'center');
text(s,'การเพิ่มประสิทธิภาพเว็บแสดงภาพข้อมูลเชิงโต้ตอบด้วยการประมวลผลล่วงหน้าช่วงเผยแพร่',100,380,1336,40,21.33,false,C.body,'center');
shape(s,662,450,212,3.5,C.blue);
text(s,`${meta.authors}\n${meta.institution}`,100,500,1336,64,17.33,false,C.body,'center');
text(s,meta.venue,100,580,1336,30,17.33,false,C.body,'center');
text(s,`IEEE Doc ID: ${meta.ieee}     DOI: ${meta.doi}`,100,622,1336,30,17.33,false,C.body,'center');
text(s,`นำเสนอโดย ${meta.presenter}     รหัสนิสิต ${meta.studentId}`,100,708,1336,38,18.67,true,C.ink,'center');

// ==========================================
// Slide 2: Challenges & Metrics
// ==========================================
s=slide(1);
const runTimeLimits=[
  ['การคำนวณซ้ำซ้อนบนเบราว์เซอร์','เบราว์เซอร์ต้องดาวน์โหลดข้อมูลดิบ รันคิวรีรวมกลุ่ม และวาดชาร์ตใหม่ทุกครั้ง\nส่งผลให้เกิดความหน่วงสูง โดยเฉพาะกับชุดข้อมูลขนาดใหญ่'],
  ['ปัญหาความหน่วงตอนเปิดหน้าครั้งแรก','ระบบแคชแบบเดิมทำงานตอนรันไทม์ ทำให้ผู้เข้าชมคนแรก (Cold-Start)\nยังคงต้องรอโหลดข้อมูลและคำนวณใหม่ตั้งแต่ต้นโดยไม่ได้รับประโยชน์จากแคช'],
  ['ภาพปรากฏแต่ยังไม่พร้อมโต้ตอบ','ภาพปรากฏแล้ว แต่ยังต้องเริ่มคอมโพเนนต์และตัวกลางคิวรี\nระบบจึงยังรับการคลิก ซูม หรือการเลือกช่วงข้อมูลไม่ได้']
];
const evalMetrics=[
  ['TTR (Time-to-Render) · เวลาจนภาพปรากฏ','เวลาตั้งแต่เริ่มส่งคำขอ จนกระทั่งชาร์ตแสดงผลครบถ้วนบนหน้าจอ\nสะท้อนความเร็วที่ผู้ใช้รับรู้ได้จริง (Perceived Latency) เทียบเคียงกับ FCP'],
  ['TTA (Time-to-Activation) · เวลาจนพร้อมโต้ตอบ','เวลาจนกระทั่งระบบพร้อมรับการคลิก ซูม หรือเลือกฟิลเตอร์ข้อมูล\nชี้วัดความพร้อมใช้งานจริงของอินเทอร์เฟซ เทียบเคียงกับ TTI บนเว็บ'],
  ['SC (Storage Cost) · ขนาดทรัพยากรที่เผยแพร่','ขนาดทรัพยากรทั้งหมดที่เผยแพร่ รวมข้อมูลและผลคำนวณล่วงหน้า\nเปรียบเทียบพื้นที่กับ Baseline เพื่อประเมินต้นทุนของการลดเวลา']
];
colCard3Items(s,86.4,130,664,625,'ข้อจำกัดของการประมวลผลตอนรันไทม์',runTimeLimits,C.navy);
colCard3Items(s,785.6,130,664,625,'ตัวชี้วัดประสิทธิภาพและต้นทุนระบบ',evalMetrics,C.navy);
text(s,'ที่มา: Sections 1 และ 3.1 (หน้า PDF 1–2)',86.4,768,1363.2,24,15,false,C.muted,'left');

// ==========================================
// Slide 3: Mosaic Publisher Architecture
// ==========================================
s=slide(2);
card(s,86.4,130,864,385,'สถาปัตยกรรมไปป์ไลน์ช่วงเผยแพร่');
await image(s,'fig1-publish-time-overview.png',118.4,196,800,255);
text(s,'Figure 1: การแบ่งกลุ่มงาน 3 ส่วนที่ย้ายไปทำล่วงหน้าก่อนผู้ใช้ส่งคำขอ (หน้า PDF 1)',118.4,463,800,24,14.67,false,C.muted,'center');

card(s,86.4,533,864,222,'ขั้นตอนการประมวลผลของ Publisher');
flow(s,['1. วิเคราะห์ AST &\nจำลอง Virtual DOM','2. คำนวณคิวรีล่วงหน้า\nผ่าน DuckDB','3. Rewrite AST &\nสร้าง JS Bundle'],118.4,596,800,88);
text(s,'สรุปกลไกการทำงานจาก Sections 4.1–4.3 (หน้า PDF 3)',118.4,705,800,24,14.67,false,C.muted,'center');

card(s,985.6,130,464,625,'ชิ้นส่วนผลลัพธ์ส่งมอบให้ไคลเอนต์');
const deliverables=[
  ['ข้อมูลจัดระเบียบพร้อมใช้','กรองเฉพาะคอลัมน์ที่จำเป็นและแปลงข้อมูล\nลดภาระการส่งข้อมูลข้ามเครือข่าย'],
  ['ผลคิวรีสำเร็จรูป','เติมแคชและฐานข้อมูล DuckDB-WASM\nล่วงหน้าผ่าน Mosaic Coordinator'],
  ['ภาพเริ่มต้นและชุดสคริปต์','ส่งภาพเรนเดอร์สำเร็จให้แสดงผลทันที\nพร้อมสคริปต์เปิดการโต้ตอบตามหลัง']
];
for(let i=0;i<3;i++){
  const itemY=214+i*186;
  text(s,String(i+1),1013.6,itemY,28,34,21.33,true,C.navy);
  text(s,deliverables[i][0],1049.6,itemY,372,32,19.5,true,C.ink);
  text(s,deliverables[i][1],1049.6,itemY+36,372,75,16,false,C.body);
  if(i<2)line(s,1013.6,itemY+165,408);
}
text(s,'ที่มา: Sections 3.2–3.4 และ 4.1–4.3 (หน้า PDF 2–3)',86.4,768,1363.2,24,15,false,C.muted,'left');

// ==========================================
// Slide 4: Pre-rendering & Hydration Cost
// ==========================================
s=slide(3);
card(s,86.4,130,806,350,'การแยกสัดส่วนความหน่วงและคอขวด Hydration');
await image(s,'fig4-latency-breakdown.png',118.4,196,742,215);
text(s,'Figure 4: สัดส่วนเวลาเฉลี่ยจาก 5 กรณีทดสอบ ที่ขนาดข้อมูล 10 ล้านแถว (หน้า PDF 4)',118.4,428,742,24,14.67,false,C.muted,'center');

card(s,86.4,498,806,257,'ลำดับเหตุการณ์การแสดงผลและการเปิดระบบโต้ตอบ');
flow(s,['1. ภาพเริ่มต้นปรากฏ\n(TTR ลดลง 83.7%)','2. เริ่มคอมโพเนนต์\nClient Hydration','3. พร้อมรับอินพุต\n(TTA ลดลง 33.3%)'],118.4,568,742,96);
text(s,'ผังสรุปลำดับเหตุการณ์จาก Section 4.3 (แสดงขั้นตอน ไม่ใช่แกนเวลา Benchmark)',118.4,684,742,24,14.67,false,C.muted,'center');

card(s,927.6,130,522,625,'การจำแนกประเภทมุมมองและข้อจำกัด');
const viewCategories=[
  ['มุมมองแบบสถิต (Static Views)','ส่งเฉพาะผลลัพธ์ภาพที่เรนเดอร์สำเร็จ\nไร้สคริปต์ ไม่ต้องเสียต้นทุน Hydration',C.navy],
  ['มุมมองแบบโต้ตอบ (Interactive Views)','ส่งภาพแรกพร้อมสคริปต์ JavaScript\nต้องเติมแคชและผูก Event ก่อนใช้งาน',C.navy],
  ['คอขวด Hydration ฝั่งไคลเอนต์','ใช้เวลาเกือบเท่าการเรนเดอร์สดจากศูนย์\nHydration ที่ละเอียดขึ้นเป็นแนวทางวิจัยต่อ',C.red]
];
for(let i=0;i<3;i++){
  const itemY=214+i*186;
  text(s,String(i+1),957.6,itemY,28,34,21.33,true,viewCategories[i][2]);
  text(s,viewCategories[i][0],993.6,itemY,426,32,19.5,true,viewCategories[i][2]===C.red?C.red:C.ink);
  text(s,viewCategories[i][1],993.6,itemY+36,426,75,16,false,C.body);
  if(i<2)line(s,957.6,itemY+165,462);
}
text(s,'ที่มา: Sections 4.3 และ 5 (หน้า PDF 3–4)',86.4,768,1363.2,24,15,false,C.muted,'left');

// ==========================================
// Slide 5: Quantitative Evaluation & Trade-offs
// ==========================================
s=slide(4);
card(s,86.4,130,850,365,'การเปรียบเทียบ TTR และ TTA ตามขนาดข้อมูล');
await image(s,'fig3-ttr-tta.png',116.4,194,790,230);
text(s,'Figure 3: เส้นมัธยฐาน (Median) และแรเงา IQR จากข้อมูล 10k–10M แถว (หน้า PDF 4)',116.4,440,790,22,14.67,false,C.muted,'center');

card(s,971.6,130,478,365,'การเปลี่ยนแปลงสัมพัทธ์เทียบ Baseline');
const values=[
  ['ระดับ','ΔSC %','ΔTTR %','ΔTTA %'],
  ['+prep','0.0 ± 0.0','−0.6 ± 4.0','−1.0 ± 2.5'],
  ['+cache','21.1 ± 29.8','−16.6 ± 1.3','−32.3 ± 8.9'],
  ['+most','21.2 ± 29.9','−83.7 ± 2.1','−33.3 ± 9.6']
];
const t=s.tables.add({rows:4,columns:4,left:995.6,top:196,width:430,height:165,columnWidths:[94,112,112,112],values});
t.borders.assign({fill:C.border,width:1,style:'solid'});
t.cells.block({row:0,column:0,rowCount:4,columnCount:4}).assign({textStyle:{typeface:FONT,fontSize:16,color:C.body,alignment:'center',autoFit:'none'},margins:{top:6,bottom:6,left:3,right:3},anchor:'center'});
t.cells.block({row:0,column:0,rowCount:1,columnCount:4}).assign({fill:C.navy,textStyle:{typeface:FONT,fontSize:17,bold:true,color:'#FFFFFF',alignment:'center'}});
text(s,'Table 1: ค่าเฉลี่ยและส่วนเบี่ยงเบนมาตรฐาน (Mean ± σ) ข้ามทุกชุดทดสอบ',995.6,376,430,22,14,false,C.muted);
text(s,'แถว +most คือชุดรวมทุกกลยุทธ์ (ในเนื้อหาเปเปอร์ใช้ชื่อ +prerender)',995.6,404,430,40,13.5,false,C.muted);

const statsData=[
  ['−83.7%','เวลาจนภาพปรากฏ (TTR)','σ = 2.1% · ลด Perceived Latency ชัดเจน'],
  ['−33.3%','เวลาพร้อมโต้ตอบ (TTA)','σ = 9.6% · แคชช่วยตัดเวลาหลัก (−32.3%)'],
  ['+21.2%','พื้นที่จัดเก็บเพิ่มเติม (SC)','σ = 29.9% · แลกกับความเร็วในการโหลด']
];
for(let i=0;i<3;i++){
  const statX=86.4+i*465.1;
  card(s,statX,512,433,160,'');
  text(s,statsData[i][0],statX+28,528,377,44,36,true,C.navy);
  text(s,statsData[i][1],statX+28,574,377,28,19,true,C.ink);
  text(s,statsData[i][2],statX+28,604,377,44,14.67,false,C.muted);
}

shape(s,86.4,688,1363.2,56,'#FFFFFF',C.border,8);
text(s,'สภาพแวดล้อม: MacBook Pro (M1 Pro, RAM 16 GB), Node 22.9, Local Server, DuckDB-WASM',110,696,1316,22,15,false,C.body,'center');
text(s,'ผลต่างการลด TTA: 33.3 − 32.3 = 1.0 จุดเปอร์เซ็นต์ เมื่อใช้ Baseline เดียวกัน',110,720,1316,22,15,true,C.ink,'center');

text(s,'ที่มา: Figure 3 และ Table 1 (หน้า PDF 4) · ค่าเฉลี่ยข้าม 5 รูปแบบภาพและขนาดข้อมูล 10k–10M แถว',86.4,768,1363.2,22,14.67,false,C.muted,'center');

// ==========================================
// Slide 6: Contributions & Practical Applications
// ==========================================
s=slide(5);
const contributions=[
 ['กลไกช่วงเผยแพร่ที่ใช้กับระบบจริง','เตรียมข้อมูล ผลคิวรี และภาพเริ่มต้นผ่าน Mosaic Publisher\nใช้ตัวกลางคิวรีร่วมกับการแก้ข้อกำหนดเฉพาะจุด'],
 ['กรอบประเมิน TTR / TTA / SC','แยกเวลาจนภาพครบจากเวลาพร้อมรับอินพุต\nพร้อมรายงานต้นทุนพื้นที่ที่เพิ่มขึ้น'],
 ['ทดสอบแบบเพิ่มระดับการปรับปรุง','ภาพข้อมูล 5 รูปแบบ ที่ข้อมูล 10k–10M แถว\nทำให้เห็นว่าแคชกับภาพล่วงหน้าช่วยคนละช่วง']
];
const limitations=[
 ['สภาพแวดล้อมการทดสอบจำกัด','MacBook Pro M1 Pro และ Local Server\nยังไม่ได้ประเมินมือถือหรือเครือข่ายระยะไกล'],
 ['ต้นทุน Hydration และพื้นที่','ยังเริ่มคอมโพเนนต์ฝั่งไคลเอนต์ตามปกติ\nSC เพิ่มเฉลี่ย 21.2% แต่ σ สูงถึง 29.9%'],
 ['ความสดและการรายงานการทดลอง','ข้อมูลเปลี่ยนต้องสร้างทรัพยากรใหม่\nPDF ไม่ระบุจำนวนรอบทดลองซ้ำ']
];
colCard3Items(s,86.4,130,664,625,'ผลงานหลักของบทความ',contributions,C.navy);
colCard3Items(s,785.6,130,664,625,'ข้อจำกัดจากการอ่าน',limitations,C.red);
text(s,'ที่มา: Sections 3–5 (หน้า PDF 2–4) · ข้อจำกัดสังเคราะห์จากขอบเขตหลักฐาน',86.4,768,1363.2,24,15,false,C.muted,'left');

// Slide 7: Reading synthesis and the authors’ future directions
s=slide(6);
const conclusions=[
 ['แคชลดงานก่อนพร้อมโต้ตอบ','+cache ลด TTA เฉลี่ย 32.3% เทียบ none\nเป็นส่วนหลักของการลด TTA ในชุดทดสอบ'],
 ['ภาพล่วงหน้าลดเวลารอเห็นภาพ','ชุดรวมลด TTR 83.7% และ TTA 33.3%\nภาพมาเร็ว แต่ยังเหลือต้นทุน Hydration'],
 ['ผลด้านความเร็วมีต้นทุนพื้นที่','ชุดรวมเพิ่ม SC เฉลี่ย 21.2% ± 29.9\nประโยชน์ต้องพิจารณาตามเงื่อนไขของระบบ']
];
const future=[
 ['Hydration ที่ละเอียดขึ้น','ลดงานเริ่มคอมโพเนนต์ฝั่งไคลเอนต์\nเพื่อลดต้นทุนที่ยังใกล้การเรนเดอร์เต็มชุด (§5)'],
 ['Hybrid และ Incremental Regeneration','ผสานการปรับปรุงช่วงเผยแพร่กับรันไทม์\nและสร้างทรัพยากรใหม่เฉพาะส่วน (§6)'],
 ['เลือกการตั้งค่าโดยอัตโนมัติ','พัฒนาวิธีเลือกระดับการปรับปรุงจากข้อมูล\nและข้อกำหนดภาพ แนวทางนี้ยังไม่ได้ทดลอง (§6)']
];
colCard3Items(s,86.4,130,664,625,'ข้อสรุปจากการอ่าน',conclusions,C.navy);
colCard3Items(s,785.6,130,664,625,'แนวทางที่ทีมวิจัยเสนอ',future,C.navy);
text(s,'ที่มา: ซ้าย Table 1 / Figure 4 · ขวา Sections 5–6 (หน้า PDF 4) · แนวทางวิจัยต่อยังไม่ได้ประเมิน',86.4,768,1363.2,24,15,false,C.muted,'left');

// ==========================================
// Build, Export & Verify Presentation
// ==========================================
await fs.mkdir(path.join(HERE,'slides-render'),{recursive:true});
const draft=path.join(HERE,'candidate.pptx');
await (await PresentationFile.exportPptx(p)).save(draft);

for(let i=0;i<7;i++){
  const slideObj=p.slides.items[i];
  const b=await p.export({slide:slideObj,format:'png',scale:1.5});
  await fs.writeFile(path.join(HERE,'slides-render',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));
  const layout=await slideObj.export({format:'layout'});
  await fs.writeFile(path.join(HERE,'slides-render',`slide-${i+1}.layout.json`),await layout.text());
}

const deliveryDir=path.join(HERE,'revision-'+Date.now());
const receiptPath=path.join(HERE,path.basename(deliveryDir)+'-validation.json');
const finalPath=path.join(deliveryDir,'Assignment_Paper_4_PublishTimeOpt_7_Slides.pptx');
await fs.mkdir(path.dirname(finalPath),{recursive:true});

const result=await finalizePresentation({
  workspaceDir:ROOT,
  candidatePath:draft,
  finalPath,
  explicitTotalSlideCount:7,
  requiredNativeTableOwnerSlides:[5],
  requiredNativeChartOwnerSlides:[],
  pythonExecutable:PYTHON,
  integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs:['--expected-slide-size-emu','14630400,8229600','--validate-heading-fit','--require-native-table-slide','5'],
  fontPolicy:{basis:'design',families:[FONT]},
  verifyArtifactToolImport:true,
  receiptPath
});

console.log(result);
await fs.copyFile(finalPath,path.join(ROOT,'03_slides','Assignment_Paper_4_PublishTimeOpt_7_Slides.pptx'));
await fs.copyFile(receiptPath,path.join(HERE,'slides-validation.json'));
await fs.writeFile(path.join(HERE,'speaker-notes.json'),JSON.stringify(stages,null,2));
