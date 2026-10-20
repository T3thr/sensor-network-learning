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
    text(s,String(i),1360,835,90,23,17.33,true,C.navy,'right');
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
  ['แต่ละเซสชันต้องคำนวณข้อมูลใหม่','เมื่อเปิดเว็บ เบราว์เซอร์ต้องโหลดข้อมูล รันคิวรี และวาดภาพ\nการทำงานซ้ำนี้เพิ่มเวลารอ โดยเฉพาะกับข้อมูลขนาดใหญ่'],
  ['แคชยังไม่พร้อมในช่วงเริ่มเซสชัน','แคชที่สร้างระหว่างใช้งานยังไม่มีผลให้ใช้ตอนเริ่มต้น\nจึงต้องรอคำนวณก่อน แม้คำขอถัดไปจะใช้แคชได้ (Cold Start)'],
  ['ภาพแสดงแล้ว แต่ระบบยังรับอินพุตไม่ได้','การกรองหรือซูมต้องรอคอมโพเนนต์และตัวกลางคิวรีเริ่มทำงาน\nการเห็นภาพจึงไม่เท่ากับระบบพร้อมรับการโต้ตอบ']
];
const evalMetrics=[
  ['TTR: เวลาจนภาพข้อมูลปรากฏครบ','Time-to-Render วัดตั้งแต่ส่งคำขอจนภาพข้อมูลครบถ้วน\nต่างจาก FCP ซึ่งนับเนื้อหาแรกที่ปรากฏบนหน้าเว็บ'],
  ['TTA: เวลาจนระบบพร้อมโต้ตอบ','Time-to-Activation วัดจนพร้อมรับการเลือก กรอง หรือซูม\nเทียบแนวคิดกับ TTI แต่ไม่ใช่เวลาประมวลผลทุกการคลิก'],
  ['SC: ขนาดทรัพยากรทั้งหมดที่เผยแพร่','Storage Cost รวมข้อมูล สคริปต์ ภาพ และผลคำนวณล่วงหน้า\nใช้เทียบกับกรณีไม่ปรับปรุง (none) เพื่อประเมินต้นทุนพื้นที่']
];
colCard3Items(s,86.4,130,664,625,'ปัญหาเมื่อเปิดเว็บแสดงภาพข้อมูล',runTimeLimits,C.navy);
colCard3Items(s,785.6,130,664,625,'ตัวชี้วัดเวลาและพื้นที่จัดเก็บ',evalMetrics,C.navy);
text(s,'ที่มา: Sections 1 และ 3.1 (หน้า PDF 1–2)',86.4,768,1363.2,24,15,false,C.muted,'left');

// ==========================================
// Slide 3: Mosaic Publisher Architecture
// ==========================================
s=slide(2);
card(s,86.4,130,864,385,'งานสามกลุ่มที่ย้ายไปทำก่อนเปิดเว็บ');
await image(s,'fig1-publish-time-overview.png',118.4,196,800,255);
text(s,'Figure 1: เตรียมข้อมูล ผลคิวรี และภาพก่อนคำขอ แล้วใช้ผลในช่วงรันไทม์ (PDF หน้า 1)',118.4,463,800,24,14.67,false,C.muted,'center');

card(s,86.4,533,864,222,'ขั้นตอนเตรียมทรัพยากรของ Publisher');
flow(s,['1. อ่านข้อกำหนด\nและจำลองอินพุต','2. ใช้ DuckDB คำนวณ\nและบันทึกผลล่วงหน้า','3. แก้ข้อกำหนด\nและสร้าง JavaScript'],118.4,596,800,88);
text(s,'วิเคราะห์โครงสร้างข้อกำหนด (AST) และจำลองอินพุตใน Virtual DOM (PDF หน้า 3)',118.4,705,800,24,14.67,false,C.muted,'center');

card(s,985.6,130,464,625,'ทรัพยากรที่ส่งไปยังเบราว์เซอร์');
const deliverables=[
  ['ข้อมูลที่เตรียมพร้อมใช้','เลือกคอลัมน์และแปลงข้อมูลก่อนเผยแพร่\nเบราว์เซอร์จึงโหลดข้อมูลที่พร้อมวิเคราะห์'],
  ['ผลคิวรีและผลรวมล่วงหน้า','เติมแคชและฐานข้อมูล DuckDB-WASM\nCoordinator ใช้ผลที่เตรียมแทนคำนวณซ้ำ'],
  ['ภาพเริ่มต้นและสคริปต์โต้ตอบ','ส่งภาพที่วาดแล้วให้แสดงก่อน\nพร้อม JavaScript เปิดการโต้ตอบภายหลัง']
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
card(s,86.4,130,806,350,'เวลาที่ใช้โหลดภาพและเริ่มระบบโต้ตอบ');
await image(s,'fig4-latency-breakdown.png',118.4,196,742,215);
text(s,'Figure 4: เวลาเฉลี่ยแยกตามขั้นตอน จาก 5 รูปแบบภาพที่ข้อมูล 10 ล้านแถว (PDF หน้า 4)',118.4,428,742,24,14.67,false,C.muted,'center');

card(s,86.4,498,806,257,'เห็นภาพก่อน แล้วจึงเปิดการโต้ตอบ');
flow(s,['1. ภาพปรากฏครบ\nถึงจุดวัด TTR','2. เริ่มคอมโพเนนต์\nฝั่งไคลเอนต์ (Hydration)','3. พร้อมกรองและซูม\nถึงจุดวัด TTA'],118.4,568,742,96);
text(s,'ผังแสดงขั้นตอนตาม Section 4.3 ไม่ได้แสดงสัดส่วนเวลา (PDF หน้า 3)',118.4,684,742,24,14.67,false,C.muted,'center');

card(s,927.6,130,522,625,'ภาพสองประเภทและต้นทุน Hydration');
const viewCategories=[
  ['ภาพสถิต (Static Views)','ส่งเนื้อหาที่วาดไว้โดยไม่ต้องเพิ่ม\nสคริปต์สำหรับการโต้ตอบ',C.navy],
  ['ภาพโต้ตอบ (Interactive Views)','ส่งภาพพร้อม JavaScript เพื่อเริ่มคอมโพเนนต์\nและส่วนรับอินพุต ก่อนกรองหรือซูมได้',C.navy],
  ['Hydration ยังเป็นคอขวด','วิธีที่ทดลองใช้ต้นทุนใกล้การเรนเดอร์เต็มชุด\nผู้วิจัยเสนอให้ลดงานเริ่มคอมโพเนนต์ต่อไป',C.red]
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
card(s,86.4,130,850,365,'ผล TTR และ TTA เมื่อขนาดข้อมูลเพิ่มขึ้น');
await image(s,'fig3-ttr-tta.png',116.4,194,790,230);
text(s,'Figure 3: เส้นมัธยฐาน (Median) และแรเงา IQR จากข้อมูล 10k–10M แถว (หน้า PDF 4)',116.4,440,790,22,14.67,false,C.muted,'center');

card(s,971.6,130,478,365,'ผลเทียบกรณีไม่ปรับปรุง (none)');
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
text(s,'Table 1: ค่าเฉลี่ย ± SD ของการเปลี่ยนแปลง (%)',995.6,376,430,22,14,false,C.muted);
text(s,'+most คือระดับรวมที่เพิ่มภาพล่วงหน้า\nในกราฟใช้ชื่อ +prerender',995.6,404,430,40,13.5,false,C.muted);

const statsData=[
  ['−83.7%','เวลาจนภาพข้อมูลปรากฏครบ (TTR)','ชุดรวมเทียบ none · SD = 2.1%'],
  ['−33.3%','เวลาจนระบบพร้อมโต้ตอบ (TTA)','แคชลด TTA 32.3% · ชุดรวม SD = 9.6%'],
  ['+21.2%','ขนาดทรัพยากรที่เผยแพร่ (SC)','พื้นที่เพิ่มเฉลี่ย · SD = 29.9%']
];
for(let i=0;i<3;i++){
  const statX=86.4+i*465.1;
  card(s,statX,512,433,160,'');
  text(s,statsData[i][0],statX+28,528,377,44,36,true,C.navy);
  text(s,statsData[i][1],statX+28,574,377,28,19,true,C.ink);
  text(s,statsData[i][2],statX+28,604,377,44,14.67,false,C.muted);
}

shape(s,86.4,688,1363.2,56,'#FFFFFF',C.border,8);
text(s,'สภาพแวดล้อม: MacBook Pro (M1 Pro, RAM 16 GB), Node 22.9.0, Local Server, DuckDB-WASM',110,696,1316,22,15,false,C.body,'center');
text(s,'TTA ลดเพิ่มจาก +cache อีก 1.0 จุดเปอร์เซ็นต์ (33.3 − 32.3) เมื่อเทียบฐาน none เดียวกัน',110,720,1316,22,15,true,C.ink,'center');

text(s,'ที่มา: Figure 3 และ Table 1 (PDF หน้า 4) · ตารางเฉลี่ยข้าม 5 รูปแบบภาพและข้อมูล 10k–10M แถว',86.4,768,1363.2,22,14.67,false,C.muted,'center');

// ==========================================
// Slide 6: Contributions & Practical Applications
// ==========================================
s=slide(5);
const contributions=[
 ['พัฒนา Publisher บนระบบ Mosaic','เตรียมข้อมูล ผลคิวรี และภาพเริ่มต้นจากข้อกำหนดเดิม\nเติมแคชผ่านตัวกลางคิวรี และแก้แหล่งข้อมูลเฉพาะส่วนที่จำเป็น'],
 ['ประเมินทั้งการแสดงภาพและการโต้ตอบ','ใช้ TTR และ TTA แยกเวลารอของสองขั้นตอน\nพร้อมวัด SC เพื่อรายงานต้นทุนพื้นที่ของการปรับปรุง'],
 ['เปรียบเทียบการปรับปรุงทีละระดับ','ทดสอบ 5 รูปแบบภาพและข้อมูล 10k–10M แถว\nพบว่าแคชช่วย TTA ส่วนภาพล่วงหน้าช่วย TTR เด่นกว่า']
];
const limitations=[
 ['ยังไม่ครอบคลุมอุปกรณ์และเครือข่ายอื่น','ทดสอบบน M1 Pro กับ local server\nยังไม่มีผลบนมือถือหรือเครือข่ายระยะไกล'],
 ['ยังมีต้นทุนเริ่มระบบและพื้นที่เพิ่ม','Hydration ใช้วิธีสร้างคอมโพเนนต์ตามปกติ\nSC เพิ่มเฉลี่ย 21.2% และต่างกันมากระหว่างกรณี (SD 29.9%)'],
 ['การอัปเดตข้อมูลและรายละเอียดการวัด','ข้อมูลที่เปลี่ยนต้องสร้างทรัพยากรใหม่\nเอกสารไม่ได้ระบุจำนวนรอบทดลองซ้ำ']
];
colCard3Items(s,86.4,130,664,625,'ผลงานสำคัญของบทความ',contributions,C.navy);
colCard3Items(s,785.6,130,664,625,'ข้อจำกัดของการทดลอง',limitations,C.red);
text(s,'ที่มา: Sections 3–5 (PDF หน้า 2–4) · พิจารณาข้อจำกัดตามสภาพแวดล้อมและข้อมูลที่รายงาน',86.4,768,1363.2,24,15,false,C.muted,'left');

// Slide 7: Experimental findings and the authors' future directions
s=slide(6);
const conclusions=[
 ['แคชล่วงหน้าลดเวลาจนพร้อมโต้ตอบ','การเพิ่มแคชและผลรวม (+cache) ลด TTA เฉลี่ย 32.3%\nช่วยลดงานคิวรีที่ต้องคำนวณตอนเปิดเว็บ'],
 ['ภาพล่วงหน้าทำให้เห็นข้อมูลเร็วขึ้น','ชุดรวมลด TTR เฉลี่ย 83.7% และ TTA 33.3%\nภาพแสดงเร็วขึ้น แต่ยังต้องรอเริ่มคอมโพเนนต์โต้ตอบ'],
 ['การลดเวลารอต้องแลกกับพื้นที่จัดเก็บ','SC เพิ่มเฉลี่ย 21.2% (SD 29.9%) เทียบ none\nต้นทุนพื้นที่ต่างกันตามรูปแบบภาพและขนาดข้อมูล']
];
const future=[
 ['ลดภาระการเริ่มคอมโพเนนต์','ศึกษาวิธี Hydration ที่ละเอียดขึ้น\nเพื่อลดต้นทุนที่ยังใกล้การเรนเดอร์เต็มชุด (§5)'],
 ['ผสานการคำนวณและสร้างใหม่เฉพาะส่วน','ใช้ทั้งช่วงเผยแพร่และรันไทม์ (Hybrid) และสร้างใหม่\nเฉพาะส่วนที่เปลี่ยน (Incremental Regeneration, §6)'],
 ['เลือกระดับการปรับปรุงโดยอัตโนมัติ','พัฒนาวิธีเลือกการตั้งค่าจากข้อมูลและข้อกำหนดภาพ\nให้เหมาะกับประโยชน์และต้นทุนของแต่ละกรณี (§6)']
];
colCard3Items(s,86.4,130,664,625,'ผลที่ได้จากการทดลอง',conclusions,C.navy);
colCard3Items(s,785.6,130,664,625,'แนวทางที่ผู้วิจัยเสนอ',future,C.navy);
text(s,'ที่มา: ผลทดลอง Table 1 / Figure 4 · แนวทางอนาคต Sections 5–6 (PDF หน้า 4) ยังไม่ได้ทดสอบ',86.4,768,1363.2,24,15,false,C.muted,'left');

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
