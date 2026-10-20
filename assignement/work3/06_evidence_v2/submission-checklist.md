# เช็กลิสต์ส่งงาน: Paper III Version 2 (Raft-FL, SEAMS 2024)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks): กำหนดส่ง 28 กันยายน 2026 เวลา 14:00 น.

**บทความ:** R. Dautov and E. J. Husom, "Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning," SEAMS 2024, pp. 110-121, **IEEE Doc ID: 10556381**, DOI: 10.1145/3643915.3644093  
**ผู้จัดทำ:** นายธีรภัทร์ ภู่ระยา ลำดับที่ 10 รหัสนิสิต 66362416  
**ตรวจล่าสุด:** 28 กันยายน 2026

---

## 1. ไฟล์ที่ส่ง

| ชิ้นงาน | ไฟล์ | ขนาด | สถานะ |
| :--- | :--- | ---: | :---: |
| บทความต้นฉบับ | `01_original_v2/Paper_III_2_PRIMARY_RaftFL_10556381.pdf` (12 หน้า) | 956,188 ไบต์ | พร้อม |
| รายงานฉบับย่อ (PDF, A4, 10 หน้า) | `02_report_v2/Assignment_Paper_3_v2_Short_Report_TH.pdf` | 267,452 ไบต์ | พร้อม |
| รายงานฉบับย่อ (DOCX) | `02_report_v2/Assignment_Paper_3_v2_Short_Report_TH.docx` | 159,209 ไบต์ | พร้อม (ผ่าน validate.py) |
| รายงานต้นฉบับ Markdown | `02_report_v2/Assignment_Paper_3_v2_Short_Report_TH.md` | 36,969 ไบต์ | พร้อม |
| สไลด์ (PPTX, 7 หน้า, Speaker Notes ภาษาไทย) | `03_slides_v2/Assignment_Paper_3_v2_5-to-8-min.pptx` | 2,817,451 ไบต์ | พร้อม (ผ่าน validate.py) |
| สไลด์ (PDF, 16 x 9 นิ้ว) | `03_slides_v2/Assignment_Paper_3_v2_5-to-8-min.pdf` | 771,446 ไบต์ | พร้อม |
| สคริปต์ 5 นาที | `04_presentation_v2/presentation-script-5-min.md` | 17,670 ไบต์ | พร้อม |
| โพย Q&A 15 ข้อ | `04_presentation_v2/qna-cheatsheet.md` | 33,246 ไบต์ | พร้อม |
| แผนเวลาสไลด์ | `04_presentation_v2/slide-plan.md` | 5,368 ไบต์ | พร้อม |
| คอร์ส Zero-to-Hero + โค้ด Go | `05_study_v2/zero-to-hero-course.md`, `05_study_v2/code/raftsim/` | 21,640 ไบต์ | พร้อม (`go vet` ผ่าน) |
| หน้าบทเรียน Paper III (v1 และ v2 ในหน้าเดียว) | `paper-3/index.html?v=2` | 185,804 ไบต์ | พร้อม |
| หน้าแปลไทย Paper III (v1 และ v2 ในหน้าเดียว) | `paper-3/translation.html?v=2` | 440,756 ไบต์ | พร้อม |

`paper-3/v2/index.html` และ `paper-3/v2/translation.html` เหลือเป็นหน้าส่งต่อ (redirect) ไปยังหน้ารวมข้างต้น เพื่อให้ลิงก์เดิมยังใช้ได้

---

## 2. การเทียบกับรูบริก 10 คะแนน

| เกณฑ์ | คะแนน | หลักฐาน |
| :--- | :---: | :--- |
| 1. บทความต้นฉบับ IEEE Conference, 3 บทความ, DOI และหมายเลขครบ | 2 | PRIMARY 10556381 (SEAMS 2024), BACKUP 10579526 และ 10579519 (SPW 2024), ระเบียนใน `00_research_v2/05_selected_papers.md` |
| 2. สรุปสาระ, Contributions 3 ข้อ, Critical Evaluation, ตารางผลเชิงปริมาณ | 2 | รายงานหัวข้อ 2 ถึง 5 (ตารางที่ 2 มี 10 แถวจาก Fig. 3 และ 4, Contribution 3 ข้อ, จุดเด่น 3 ข้อ, จุดด้อยและข้อจำกัด 6 ข้อ) |
| 3. สไลด์ 7 หน้า 16:9 PPTX และ PDF | 2 | `03_slides_v2/` ธีมสว่างตาม SLIDES_DESIGN_SYSTEM.md |
| 4. การนำเสนอไม่เกิน 5 นาทีและการตอบคำถาม | 4 | สคริปต์ 815 คำ (ICU) ที่ 172 คำต่อนาที = 4:45, ห้องซ้อมบนเว็บ, Q&A 15 ข้อพร้อมเลขหน้า |

---

## 3. ผลการตรวจคุณภาพ

| การตรวจ | ผล |
| :--- | :--- |
| ความยาวและรูปแบบรายงาน | 10 หน้า A4 ฟอนต์ TH Sarabun 16 pt ระยะบรรทัด 1.6 ระยะขอบ 1 นิ้ว เลขหน้า "หน้า N" มุมขวาล่าง โครงสร้าง 7 หัวข้อตามรายงาน Paper II ไม่มีหัวข้อค้างท้ายหน้า (ตรวจตำแหน่งหัวข้อจาก PDF ด้วย `pdftotext -bbox-layout`) |
| DOCX และ PPTX | `validate.py` ผ่านทั้งสองไฟล์ |
| สไลด์ | แถบหัว #0F2D4A สูง 0.95 นิ้ว พื้น #F8FAFC การ์ดขาวขอบ #E2E8F0 ไม่มีเงา ฟอนต์ IBM Plex Thai ฟุตเตอร์ "Slide N / 7" พร้อม IEEE Doc ID ตัวตรวจใน `build_slides_v2.js` ไม่พบการ์ดล้นหรือชนฟุตเตอร์ ตรวจด้วยตาทั้ง 7 หน้า |
| เวลาสคริปต์ | 815 คำ, 172 คำต่อนาที, 4:45 นาที; ที่ 170 คำต่อนาทีใช้ 4:48; ประโยคที่ตัดได้ 54 คำ |
| Emoji และ Em Dash | สแกน 36 ไฟล์ของ Version 2 (Markdown, HTML, JS, CSS, ข้อความใน PDF, DOCX, PPTX): ไม่พบ emoji; em dash ไม่พบในเนื้อหา พบเฉพาะในพร้อมท์ค้นคว้าที่ยกกฎ "ห้ามใช้ Em Dash" มาอ้าง |
| ความสอดคล้องของตัวเลข | ค่า 10556381, DOI, 1.27, 3.76, 0.98, 9.8, 1.77, 49.1, 1.81, 5.01, 2.96, 250 kB ตรงกันในรายงาน (MD และ PDF) สไลด์ Q&A คอร์ส หน้าบทเรียน และหน้าแปล สคริปต์พูดใช้ค่าปัดเศษ (1.8 เท่า, 5 เท่า, เกือบ 3 เท่า) |
| หน้าแปลไทย Version 2 | ครบทุกย่อหน้า หัวข้อ เชิงอรรถ ภาพ 4 ภาพ ตาราง 1 ตาราง และอ้างอิง 35 รายการของหน้า 110 ถึง 121 (ตรวจประโยคต่อประโยคกับข้อความที่ดึงจาก PDF) มีบทวิเคราะห์ตารางที่ 1 และภาพที่ 1 ถึง 4 แยกกล่องและระบุว่าไม่อยู่ในต้นฉบับ |
| หน้าเว็บ (Playwright) | 97 จาก 97 ข้อผ่าน รายละเอียดใน `.build_v2/qa_web_v2_result.json`: ตัวสลับเวอร์ชัน (dropdown, แท็บ, การ์ดในแถบข้าง, `?v=`, ลิงก์ #section) ไม่มี id ซ้ำ ลิงก์และภาพทุกไฟล์มีอยู่จริง ไม่มี error ใน console ซิมูเลเตอร์ ห้องซ้อม Slide Preview Q&A แบบทดสอบ โหมดอ่าน 3 แบบ Compare View 50:50 ที่ 1440 px และคอลัมน์เดียวที่ 768 และ 390 px ไม่มี scroll แนวนอน โหมดมืด และหน้า Paper I, Paper II ที่ใช้ไฟล์ร่วม |

---

## 4. ไฟล์ของ Version 1 และไฟล์ร่วมที่แก้

| ไฟล์ | การแก้ |
| :--- | :--- |
| `paper-3/index.html`, `paper-3/translation.html` | ห่อเนื้อหา Version 1 เดิมไว้ใน panel `#p3-panel-v1` โดยไม่แก้เนื้อหา เพิ่มตัวสลับเวอร์ชันและ panel Version 2 ลบแถบแจ้งเวอร์ชันและลิงก์ breadcrumb ที่มี emoji ลิงก์ภายในของ v1 เติม `?v=1` สร้างด้วย `.build_v2/build_paper3_pages.js` |
| `assets/js/header-component.js` | เมนู Paper III ชี้หน้ารวมพร้อม `?v=1` และ `?v=2` ลิงก์ด่วน (แปลเปเปอร์ ห้องซ้อม ซิมูเลเตอร์ ถาม-ตอบ) เปลี่ยนตามเวอร์ชันที่เปิดอยู่ |
| `assets/js/common.js` | Scroll spy เลือกเฉพาะลิงก์และหัวข้อที่มองเห็น เพื่อให้แถบข้างของเวอร์ชันที่เปิดอยู่ทำงานถูก |
| `assets/js/translation.js` | ประกาศตัวแปร `currentViewMode` และ `currentStudyMode` ที่ขาด (เดิมทำให้เกิด error บนหน้าแปลทุกหน้า) ไม่เลื่อนขึ้นบนสุดตอนโหลดหน้า และไม่รับปุ่มลูกศรเมื่อ Compare View ถูกซ่อน |
| `index.html` (Portal) | ลิงก์ Paper III ชี้ `paper-3/index.html?v=1` หรือ `?v=2` และ `paper-3/translation.html?v=1` หรือ `?v=2` |

ไฟล์ใน `00_research` ถึง `06_evidence` และ `.build` ของ Version 1 ไม่ถูกแก้

---

## 5. สิ่งที่นิสิตต้องทำก่อนส่ง

1. [ ] ซ้อมจับเวลาอย่างน้อย 3 รอบในห้องซ้อม (`paper-3/index.html?v=2#v2-sec-rehearsal`) ให้อยู่ในช่วง 4:30 ถึง 4:55
2. [ ] เปิดสไลด์กับโปรเจกเตอร์ห้องเรียนหรือจอที่คล้ายกันเพื่อตรวจความคมชัดของตัวเลขบนกราฟหน้า 5
3. [ ] อ่านโพย Q&A ข้อ 1 (DOI 10.1145), ข้อ 2 (quorum), ข้อ 3 (ทราฟฟิก 5 เท่า) ให้ตอบบรรทัดสั้นได้ภายใน 20 วินาที
4. [ ] ส่ง PDF รายงาน, PPTX และ PDF สไลด์ ใน Microsoft Teams ก่อน 28 กันยายน 2026 เวลา 14:00 น.

---

## 6. คำสั่งสร้างใหม่

```bash
cd assignement/work3/.build_v2
export NODE_PATH=../../work1/.build/node_modules
node build_report_pdf_v2.js && node build_report_docx_v2.js
node build_slides_v2.js && node build_pptx_v2.js
node build_docs_v2.js
node build_paper3_pages.js
node qa_web_v2.js
```
