# ตัวสร้างรายงานและสไลด์ v4

เนื้อหารายงานอยู่ใน [Markdown](../02_report/Assignment_Paper_4_PublishTimeOpt_Short_Report_TH.md) ตัวสร้าง `build_report.py` ใช้ package ของรายงาน Work 3 v3 แทนเนื้อหาและคง footer / styles หลัก ขนาดตัวอักษรกับระยะบรรทัดปรับเพื่อให้ครบ 2 หน้า

สไลด์สร้างด้วย `@oai/artifact-tool` ผ่าน `build_slides.mjs` เนื้อหาและ Speaker Notes อยู่ใน `deck_v4.mjs` ตารางและผังงานเป็นวัตถุ native ส่วนภาพ Figure เป็นหลักฐานจากต้นฉบับ

ใช้ Python, Node และ LibreOffice ใน bundled runtime ที่จัดเตรียมไว้ ตัวสร้างไม่ติดตั้งหรือแก้ dependency กลาง ก่อนเรียกตัวตรวจสไลด์ต้องตั้ง `RUNTIME_NODE_MODULES` เป็นโฟลเดอร์ node_modules ของ runtime ฟอนต์ IBM Plex Sans Thai ลงทะเบียนจากไฟล์ local การเรนเดอร์ DOCX / PDF ต้องใช้ `FONTCONFIG_FILE` ชี้ `fonts.conf` เพื่อให้พบฟอนต์ไทย

`report-render-research` คือภาพ DOCX ชุดที่ผ่านการตรวจรับภายใน `slides-render` เป็นภาพจาก Artifact Tool และ `slides-pdf-render-research` เป็นภาพจาก PDF ที่แปลงจาก PPTX ด้วย LibreOffice ตรวจครบทุกหน้าแล้ว ผลตรวจค่าตาราง ขนาดหน้า Notes และ SHA-256 อยู่ใน [06_evidence](../06_evidence/report-slides-review.md)

`verify_delivery.py` คัดลอก PDF ที่ตรวจแล้ว แนบฟอนต์ และตรวจข้อมูล 9 คู่ในตารางทั้งสองไฟล์ `export_notes.mjs` สร้างเอกสารโครงสไลด์จากข้อมูลชุดเดียวกับ PowerPoint

ตัว finalizer ของ PPTX ไม่เขียนทับไฟล์ส่งมอบเดิม ตัวสร้างจึงใช้โฟลเดอร์ revision ที่ไม่ซ้ำและเก็บ receipt แยกจากโฟลเดอร์นั้น เมื่อผ่านการตรวจจะคัดลอกไปแทนที่ชื่อไฟล์ส่งมอบเดิม

ตัวสร้างเว็บ `build_portal.py` และ `build_translation.py` เรียกจากราก `other-project` บทแปลอ่าน `primary-extracted-text.txt` แล้วจับคู่หน่วยต้นฉบับกับคำแปลแบบสถิต เนื้อหาเว็บจึงอ่านได้แม้ปิด JavaScript ส่วนไฟล์ `pubtime-data.js` เป็นชุดข้อมูลของอภิธานศัพท์ คำถาม ควิซ และบทพูด ตัวจำลองแสดงสมมติฐานฐานเวลาและใช้สัดส่วนเฉลี่ย Table 1 โดยไม่สร้างข้อมูลทดลองรายเงื่อนไขแทนต้นฉบับ
