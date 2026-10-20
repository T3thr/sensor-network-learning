# Assignment Paper 4: Publish-Time Optimizations
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร

เอกสารและชุดผลงานสำหรับ Assignment Paper 4 (10 คะแนนเต็ม)
ศึกษาบทความ IEEE Conference ปี 2025 ขึ้นไป โดยนำเสนอสถาปัตยกรรม ผลทดลอง และข้อวิจารณ์จากการอ่านในฐานะผู้สนใจบทความ

**ความคืบหน้าล่าสุด:** รายงาน 2 หน้า สไลด์ 7 หน้า บทพูด 4:55 นาที และคำถามประกอบการนำเสนอ 15 ข้อจัดทำแล้ว [พอร์ทัล 12 ส่วน](../../paper-4/index.html) และ [บทแปลคู่ขนาน 5 หน้า](../../paper-4/translation.html) ผ่านการตรวจฟีเจอร์ในเบราว์เซอร์ มีไฟล์แก้ไขได้และหลักฐานแยกข้อสรุปจากการอ่านออกจากแนวทางวิจัยต่อของผู้แต่ง ดู [ผลตรวจเว็บ](./06_evidence/portal-review.md) และ [ผลตรวจรายงานกับสไลด์](./06_evidence/report-slides-review.md)

---

## 1. บทความที่ได้รับการคัดเลือก (Selected Paper)
- **Primary Paper:** *Publish-Time Optimizations for Web-Based Visualizations*
- **Authors:** Ron Pechuk, Jeffrey Heer (University of Washington / Mosaic)
- **Conference & Year:** IEEE Visualization and Visual Analytics (VIS 2025), pp. 226–230
- **DOI:** [10.1109/VIS60296.2025.00051](https://doi.org/10.1109/VIS60296.2025.00051)
- **IEEE Document ID:** 11298742

---

## 2. โครงสร้างโฟลเดอร์และการจัดเก็บชิ้นงาน (Work 4 Structure)

```text
assignement/work4/
├── 00_research/        # Search logs, candidate matrix, author copies, metadata
├── 01_original/        # ไฟล์บทความที่ได้รับ (ดู provenance ใน 05_study/evidence/)
├── 02_report/          # รายงานฉบับย่อภาษาไทย 2 หน้า (.docx, .pdf, .md)
├── 03_slides/          # สไลด์นำเสนอ 7 หน้า อัตราส่วน 16:9 (.pptx, .pdf)
├── 04_presentation/    # บทพูดนำเสนอ 5 นาที (Rehearsal Script) และแนวทางตอบข้อซักถาม (Q&A Defense)
├── 05_study/           # บันทึกวิเคราะห์เนื้อหาบทความเชิงลึก (Zero-to-Hero Study Guide)
├── 06_evidence/        # บันทึกการตรวจสอบความถูกต้องและเช็กลิสต์ส่งงาน
├── .build_v4/          # ตัวสร้าง DOCX / PPTX และภาพตรวจการจัดหน้า
├── assignment-paper4.png # ใบประกาศโจทย์งาน Assignment 4
└── README.md           # สรุปภาพรวมและแผนการดำเนินงาน

paper-4/                # เว็บไซต์ Interactive Portal (สไลด์แบบโต้ตอบ, ห้องซ้อมนำเสนอ Teleprompter Studio)
├── index.html          # หน้าหลักพอร์ทัล Paper IV
├── translation.html    # บทแปลเทียบย่อหน้า ครบ 5 หน้า รวมรายการอ้างอิง
└── assets/             # รูป สไลด์ CSS และ JavaScript
```
