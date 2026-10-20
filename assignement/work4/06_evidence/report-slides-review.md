# การตรวจรับรายงานและสไลด์ Paper IV

## ชุดส่งมอบ

- รายงาน [PDF 2 หน้า A4](../02_report/Assignment_Paper_4_PublishTimeOpt_Short_Report_TH.pdf) และ [DOCX](../02_report/Assignment_Paper_4_PublishTimeOpt_Short_Report_TH.docx)
- สไลด์ [PDF 7 หน้า 16:9](../03_slides/Assignment_Paper_4_PublishTimeOpt_7_Slides.pdf) และ [PPTX](../03_slides/Assignment_Paper_4_PublishTimeOpt_7_Slides.pptx)
- [โครงสไลด์พร้อมโน้ต](../03_slides/Assignment_Paper_4_PublishTimeOpt_Slide_Structure.md)

## รูปแบบและเนื้อหา

ยึดรายงาน Work 3 v3 โดยใช้ A4 ขอบ 25.4 mm, TH SarabunPSK เนื้อหา 16 pt, หัวข้อกรมท่า, ตารางผล และเลขหน้าด้านขวา ย่อเป็น 2 หน้าตามคำสั่งล่าสุด เนื้อหาครอบคลุมปัญหา สถาปัตยกรรม ผลทดสอบ คุณูปการ ข้อจำกัด ข้อสรุปจากการอ่าน และแนวทางอนาคตของผู้วิจัย

สไลด์ยึดระยะ แถบหัว การ์ด สี และฟุตเตอร์ของ Work 3 v3 แต่เปลี่ยนจากภาพทั้งหน้าเป็นข้อความ ตาราง และผังงานที่แก้ไขได้ กราฟคงเป็นภาพต้นฉบับโดยมีป้ายแกนและคำอธิบายครบ ตารางค่าเฉลี่ยและ σ ถอดข้อมูลครบ 9 คู่ ไม่สร้างข้อมูลดิบของกราฟที่บทความไม่ได้ให้

## ผลตรวจ

- ตรวจภาพรายงานครบ 2 หน้า สไลด์จากตัวสร้างครบ 7 หน้า และ PDF ที่แปลงจาก PPTX ครบ 7 หน้า ไม่พบข้อความล้นหรือป้ายกราฟถูกตัด
- จำนวนหน้าและอัตราส่วนตรงข้อกำหนด ตรวจตาราง DOCX และตาราง native ใน PPTX กับ [ข้อมูลต้นฉบับ](../05_study/paper-metrics.json) ครบ 9 คู่ต่อไฟล์
- PowerPoint package, geometry, font policy และการนำเข้าด้วย Artifact Tool ผ่าน พร้อม Speaker Notes และแหล่งอ้างอิงครบ 7 หน้า
- TTR −83.7%, TTA −33.3%, SC +21.2% ระบุฐานเทียบ `none` และค่า σ รักษาชื่อ `+most` ของ Table 1 แยกจาก `+prerender` ในกราฟ
- นำเสนอเฉพาะสถาปัตยกรรม ผลทดลอง และข้อวิจารณ์ของบทความ แยกข้อสรุปจากการอ่านกับแนวทางอนาคตของทีมวิจัยใน Sections 5–6 หัวข้อรายงานเป็นตัวหนาและไม่มีเลขนำหน้า ไม่อ้างว่ามี progressive hydration benchmark
- ต้นฉบับบทความและ DOCX อ้างอิง Work 3 v3 มี SHA-256 เดิม

[บันทึกผลตรวจและ SHA-256](./report-slides-verification.json) กับ [ผลตรวจ package](../.build_v4/slides-validation.json) เก็บขอบเขตการตรวจไว้ด้วย

## ขอบเขต

PDF ตรวจผ่านตัวเรนเดอร์ LibreOffice ที่จัดเตรียมไว้ ยังไม่ได้เปิดตรวจใน Microsoft PowerPoint ฟอนต์ IBM Plex Sans Thai แนบไว้เพื่อรักษาการจัดบรรทัดบนเครื่องอื่น PDF รายงานแสดงภาษาไทยครบ แต่ฟอนต์ TH SarabunPSK แบบเดิมมีข้อจำกัดการถอดข้อความไทย จึงใช้ DOCX สำหรับแก้ไขและค้นข้อความ

เวลาที่แบ่งใน Speaker Notes รวม 4:55 นาทีเป็นแผน ยังไม่ใช่เวลาซ้อมจริง บทพูดเต็ม คำถามประกอบการนำเสนอ และพอร์ทัลจัดทำแล้วใน Paper IV

**สถานะ:** รายงานและสไลด์ใช้ร่วมกับพอร์ทัล Paper IV

การปรับหน้าสุดท้าย: คอลัมน์ซ้ายเป็นข้อสรุปจาก Figure 4 / Table 1 คอลัมน์ขวาเป็นแนวทางที่ผู้วิจัยเสนอใน Sections 5–6 ได้แก่ finer-grained hydration, hybrid publish/runtime strategies, incremental regeneration และ automatic configuration selection หัวข้อและ Speaker Notes ไม่มีสรรพนามบุรุษที่หนึ่งหรือสอง
