# รายการตรวจสอบความสมบูรณ์ในการส่งงาน Version 3 (Submission Checklist)
## 305432 เครือข่ายเซนเซอร์: เกณฑ์ 10 คะแนนเต็ม (Rubric Alignment)

- **บทความหลัก:** Prompt-to-SQL Injections in LLM-Integrated Web Applications: Risks and Defenses (ICSE 2025), IEEE Doc ID: 11029790, DOI: 10.1109/ICSE55347.2025.00007
- **ผู้จัดทำ:** นายธีรภัทร์ ภู่ระยา รหัสนิสิต 66362416
- **กำหนดส่ง (ตามใบสั่งงาน):** 28 กันยายน 2026 เวลา 14:00 (อนุญาตให้ส่งหลายครั้ง)
- **ตรวจเมื่อ:** 28 กันยายน 2026

---

## 1. ตารางตรวจตามเกณฑ์ของอาจารย์

| เกณฑ์การให้คะแนน | ข้อกำหนดย่อย | หลักฐาน | สถานะตรวจสอบ |
| :--- | :--- | :--- | :---: |
| **1. ความน่าสนใจของบทความ (2%)** | Conference Paper จาก IEEE Xplore ปี 2024-2026, มี DOI/DocID ชัดเจน, มี PDF | ICSE 2025, Content Type = Conferences, Open Access, `01_original_v3/Paper_III_3_PRIMARY_P2SQL_11029790.pdf` (HTTP 200, `%PDF-`, 13 หน้า) | [x] |
| **2. เอกสารฉบับย่อและการวิเคราะห์ (2%)** | รายงาน 7 หัวข้อ, วิเคราะห์ Contribution 3 ข้อ, จุดเด่นและจุดด้อยตามจริง | `02_report_v3/Assignment_Paper_3_v3_Short_Report_TH.md` หัวข้อ 1-7, Contribution 3 ข้อ (5.1), จุดเด่น 5 ข้อ (5.2), จุดด้อย 6 ข้อ (6) | [x] |
| **3. สไลด์นำเสนอ (2%)** | 7 หน้าพอดีสำหรับเวลา 5 นาที, ธีมสว่างวิชาการ, Speaker Notes ครบทุกหน้า, Footer `Slide X / 7` | `03_slides_v3/Assignment_Paper_3_v3_5-to-8-min.pdf` และ `.pptx` (7 หน้า, Speaker Notes 7 หน้า) | [x] |
| **4. ทักษะการนำเสนอ (4%)** | สคริปต์ 800-850 คำ คุมเวลา 4:30-4:55 นาที, คลังคำถาม 15 ข้อ | `04_presentation_v3/presentation-script-5-min.md` (828 คำ, 4:55 นาทีที่ประมาณ 168 คำต่อนาที, ไม่เอ่ยเลขหน้าสไลด์), `04_presentation_v3/qna-cheatsheet.md` (15 ข้อ พร้อมเลขหน้า) | [x] |
| **Anti-AI-Slop Standards** | ไร้อีโมจิ, ไม่มี Em Dash ในภาษาไทย, ตัวเลขตรงกับ PDF ต้นฉบับ | ผลตรวจอัตโนมัติในหัวข้อ 3 | [x] |

## 2. ไฟล์ที่ต้องแนบใน Microsoft Teams (ตามใบสั่งงาน)

| ลำดับ | สิ่งที่อาจารย์กำหนด | ไฟล์ | สถานะ |
| :---: | :--- | :--- | :---: |
| 1 | บทความต้นฉบับ | `01_original_v3/Paper_III_3_PRIMARY_P2SQL_11029790.pdf` | [x] พร้อม |
| 2 | บทความฉบับแปลตามข้อ 1-3 (สรุป 2 หน้า, Contribution, จุดเด่นและจุดด้อย) | `02_report_v3/Assignment_Paper_3_v3_Short_Report_TH.pdf` (10 หน้า) และ `.docx` | [x] พร้อม |
| 3 | สไลด์นำเสนอ (pptx หรือ pdf) | `03_slides_v3/Assignment_Paper_3_v3_5-to-8-min.pptx` / `.pdf` | [x] พร้อม |

## 3. ผลการตรวจคุณภาพ (28 กันยายน 2026)

| รายการตรวจ | วิธีตรวจ | ผล |
| :--- | :--- | :--- |
| ปีตีพิมพ์และประเภท | IEEE `/rest/search` record: `publicationYear = 2025`, `contentType = IEEE Conferences`, `isJournal = false` | ผ่าน |
| การเข้าถึง | `xplGlobal.document.metadata`: `isOpenAccess = true`, `isFreeDocument = true` | ผ่าน |
| ความถูกต้องของไฟล์ | SHA-256 บันทึกใน `00_research_v3/evidence/MANIFEST.sha256` | ผ่าน |
| อีโมจิ และ Em Dash (U+2014) | สแกนไฟล์ `.md` ทั้งหมดใน `00_research_v3`, `02_report_v3`, `03_slides_v3`, `04_presentation_v3`, `06_evidence_v3` | ผ่าน (0 รายการ) |
| จำนวนคำของสคริปต์ | ICU word segmentation นับเฉพาะบรรทัดบทพูด | 828 คำ (ผ่านช่วง 800-850) |
| จำนวนสไลด์และ Footer | นับหัวข้อ `### สไลด์ที่` และข้อความ `Slide X / 7` | 7 สไลด์, Footer ครบ 1/7 ถึง 7/7 |
| ตัวเลขตรงกับ PDF | เทียบกับ Table II, III, VI, VII และ Figure 3, 4 จากภาพหน้า PDF ที่เรนเดอร์ 110 dpi | ผ่าน (ดูตารางหัวข้อ 4) |
| เลขหน้า | IEEE metadata ระบุ pp. 1768-1780 แต่เลขพิมพ์ใน PDF คือ 1769-1781 เอกสารอ้างเลขพิมพ์ใน PDF | บันทึกไว้ในรายงานหัวข้อ 1.1 และ Q&A |

## 4. ตาราง Claim-to-Evidence (ตัวเลขสำคัญ)

| Claim ในเอกสาร | ค่าในบทความ | ตำแหน่งใน PDF |
| :--- | :--- | :--- |
| อัตราสำเร็จการโจมตี 7 แบบ | 1.0 ทุกช่อง ยกเว้น RI.1 agent 0.6, RI.2 chain ไม่รองรับ | Table II, p. 1772 |
| ทดซ้ำการโจมตีละ 20 ครั้ง, temperature 0 | "repeated each execution 20 times" | Section III-A, p. 1771 |
| LLM 7 รุ่น | GPT-3.5, GPT-4, PaLM2, Llama 2 70B, Vicuna 1.3 33B, Guanaco 65B, Tulu 30B | Table III, p. 1773 |
| red team 22/23, เครื่องมืออัตโนมัติ 11/23 | นับจากเครื่องหมายใน Table VI, Finding 8 | Table VI, p. 1775 |
| LLM guard บน GPT-3.5: 55%, 88%, 100%; Rebuff 78% | ค่าที่พิมพ์บนแท่งกราฟ | Figure 3, p. 1778 |
| LLM guard บน GPT-4: 98%, 95%, 93%; Rebuff 80% | ค่าที่พิมพ์บนแท่งกราฟ | Figure 3, p. 1778 |
| False positive 0 จาก 150 | Finding 11 | p. 1778 |
| เวลา 147.30 → 67.53 → 64.15 วินาที, ลด 54.15% และ 56.45% | Section VI-C-2 และ Figure 4 | p. 1778 |
| Overhead 0.7 ms และ 1.87 ms | Section VI-C-2 | p. 1778 |
| 99.55% บน 1,120 prompts | Finding 13 | p. 1778-1779 |
| LangChain 80,000 ดาว, LlamaIndex 29,600 ดาว | Table I | p. 1771 |

## 5. งานที่ยังค้าง

1. [x] สร้างสไลด์ PPTX และ PDF (`.build_v3/build_slides_v3.js`, `build_pptx_v3.js`) ครอป Figure 1-3 ที่ 400 dpi
2. [x] สร้างรายงาน PDF (TH Sarabun New 16pt, ระยะขอบ 1 นิ้ว, 10 หน้า) และ DOCX (`build_report_pdf_v3.js`, `build_report_docx_v3.js`)
3. [ ] ซ้อมพูดจับเวลา 3 รอบ บันทึกเวลาจริงแต่ละรอบ
4. [ ] `05_study_v3/zero-to-hero-course.md` ยังเป็นแม่แบบว่าง (ไม่อยู่ในขอบเขตงานรอบนี้)

## 6. เว็บไซต์ประกอบการนำเสนอ (paper-3, Version 3)

| หน้า | เนื้อหา | สถานะ |
| :--- | :--- | :---: |
| `paper-3/index.html?v=3` | 12 ส่วน: ภาพรวม, อภิธานศัพท์ 20 คำพร้อมคำอ่าน, ที่มา, การโจมตี 7 แบบ, LangShield, ผลการทดลอง, ซิมูเลเตอร์ Attack vs Defense, วิจารณ์และต่อยอด, ห้องซ้อม 5:00 (828 คำ ซิงก์สไลด์ 7 หน้า), Q&A 15 ข้อ, แบบทดสอบ 5 ข้อ, เอกสารและตัวดูบทความ 13 หน้า | [x] |
| `paper-3/translation.html?v=3` | Compare View 13 หน้า: ภาพหน้าต้นฉบับซ้าย บทแปลขวา ทุกหน้ามีสรุป จุดโฟกัส บทแปลทีละย่อหน้า และบทวิเคราะห์ (43 หน่วยแปล, 9 กล่องโค้ด) | [x] |
| QA | `qa_web_v2.js` 98/98 ผ่าน, ทดสอบ v3 บน http และ file:// ไม่มี console error, 1440 px แสดง 50:50 ไม่มี scroll แนวนอน | [x] |

สร้างใหม่: `cd assignement/work3/.build_v3 && node build_p3v3_pages.js`

