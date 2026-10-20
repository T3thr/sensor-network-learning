# ทะเบียนต้นฉบับและภาพประกอบ

**ต้นฉบับที่อ่าน:** [Paper_IV_1_PRIMARY_PublishTimeOpt_11298742.pdf](../../01_original/Paper_IV_1_PRIMARY_PublishTimeOpt_11298742.pdf)  
**จำนวน:** 5 หน้า  
**SHA-256:** `c8b6a79fc42049b38009ff4d818a69c4cc3236ff22b87bf6a18fd8b86cdb3593`

ตรวจด้วย pypdf สำหรับข้อความและ pypdfium2 สำหรับภาพ อ่านครบทั้ง 5 หน้าและตรวจภาพหน้าต้นฉบับทุกหน้า ภาพหน้าสำหรับตรวจอยู่ในพื้นที่ชั่วคราว ส่วนภาพครอปที่ต้องใช้ต่ออยู่ในโฟลเดอร์นี้

## ภาพที่เก็บ

| ภาพ | หน้า PDF | เนื้อหา | ไฟล์ |
| :--- | :---: | :--- | :--- |
| Figure 1 | 1 | กรอบกลยุทธ์และเส้นเวลา Publish-Time / Runtime | [fig1](./figures/fig1-publish-time-overview.png) |
| Figure 2 | 3 | ภาพข้อมูล 5 specifications ที่ใช้ประเมิน | [fig2](./figures/fig2-evaluation-visualizations.png) |
| Figure 3 | 4 | Median TTR / TTA และ IQR ตามขนาดข้อมูล | [fig3](./figures/fig3-ttr-tta.png) |
| Figure 4 | 4 | Latency components เฉลี่ยที่ข้อมูล 10M แถว | [fig4](./figures/fig4-latency-breakdown.png) |
| Table 1 | 4 | ค่าเฉลี่ยเปอร์เซ็นต์เปลี่ยนแปลงและ σ | [table1](./figures/table1-metric-changes.png) |

ครอปจาก PDF ที่ **400 dpi** คงชื่อภาพ ป้ายแกน และ legend ไว้ แต่ไม่ติด caption เดิมหรือข้อความคอลัมน์ข้างเคียง Caption ภาษาไทยและตำแหน่งอ้างอิงอยู่ใน [บันทึกการอ่าน](../zero-to-hero-course.md) ภาพของเปเปอร์มีสีและสัญลักษณ์ตามต้นฉบับ ไม่ใช่องค์ประกอบตกแต่งที่เพิ่มเอง

[source-manifest.json](./source-manifest.json) เก็บ SHA-256 ของต้นฉบับและแต่ละภาพ พร้อมพิกัดครอปในหน่วย point ซึ่งอ้างมุมซ้ายบน และขนาดภาพจริง ภาพเป็น PNG ความละเอียดเต็มสำหรับใช้ต่อ หากนำลงเว็บขั้นที่ 5 ให้สร้างสำเนาขนาดไม่เกิน 1,200 px ตามคู่มือเว็บ

## ข้อความและสถานะฉบับ

[primary-extracted-text.txt](./primary-extracted-text.txt) เป็นข้อความสกัดเพื่อค้นและตรวจตำแหน่ง ไม่ใช้แทนการดู PDF เพราะการแยกคอลัมน์อาจทำให้ลำดับข้อความคลาดเคลื่อน

SHA-256 ของไฟล์ที่ได้รับตรงกับ [author copy ที่เก็บในขั้นคัดเลือก](../../00_research/evidence/authorcopy_publishtime_11298742.pdf) ไฟล์ไม่มีเลขหน้า proceedings พิมพ์อยู่บนหน้า และ Section 4 ยังมี `anonymized URL` จึงระบุตำแหน่งเป็นหน้า PDF 1–5 เสมอ ระเบียนประชุม IEEE 2025 และหน้า 226–230 ตรวจจาก [publisher metadata](../../00_research/evidence/publishtime-ieee-publisher-metadata.json) แยกกัน ยังไม่ได้เปรียบเทียบกับไฟล์ฉบับจัดพิมพ์จาก IEEE โดยตรง

## ผลการตรวจ

- ถอดตัวเลข Table 1 จากข้อความ แล้วเทียบกับภาพตารางครบทุกค่า
- ตรวจ Figure 3 ว่า median / IQR ไม่ถูกสลับกับ mean / σ ของ Table 1
- ขยายขอบครอป Figure 3–4 เพื่อเก็บป้ายแกนครบ
- เก็บต้นฉบับที่ได้รับโดยไม่แก้ไข และไม่เติมเลขหน้าเอง
- ยังไม่มีการสร้างรายงาน สไลด์ บทพูด หรือเว็บในขั้นนี้

[verification.json](./verification.json) บันทึกผลตรวจตัวเลข 9 คู่ ลิงก์ Markdown ในขั้นที่ 1 จำนวน 36 จุด SHA-256 และกฎข้อความ โดยไม่พบข้อผิดพลาด สถานะการอนุมัติของผู้จัดทำยังเป็น `pending`
