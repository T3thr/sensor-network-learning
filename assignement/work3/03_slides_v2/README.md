# สไลด์นำเสนอ 7 หน้า Version 2: Raft-FL (SEAMS 2024, IEEE Doc ID: 10556381)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks)

โฟลเดอร์นี้จัดเก็บสไลด์ 7 หน้าสำหรับ Paper 3 Version 2 ตาม [SLIDES_DESIGN_SYSTEM.md](../../../SLIDES_DESIGN_SYSTEM.md) สำหรับการนำเสนอที่จับเวลาไม่เกิน 5 นาที (เป้าหมาย 4:45)

### ไฟล์
- `Assignment_Paper_3_v2_5-to-8-min.pptx`: PowerPoint 16:9 (16 x 9 นิ้ว) พร้อม Speaker Notes ภาษาไทยครบ 7 หน้า (ช่วงเวลา คำสำคัญ บทพูดเต็ม และประโยคที่ตัดได้)
- `Assignment_Paper_3_v2_5-to-8-min.pdf`: ไฟล์ PDF สำหรับส่งตรวจ
- `Assignment_Paper_3_v2_Slide_Structure.md`: โครงสร้างและหลักฐานบนแต่ละหน้า

### มาตรฐานที่ใช้
- แถบหัว #0F2D4A สูง 0.95 นิ้ว ตัวอักษรสีขาวตัวหนาชิดซ้าย พื้นหลัง #F8FAFC การ์ดพื้นขาว #FFFFFF ขอบ 1 px #E2E8F0 ไม่มีเงา
- ฟอนต์ IBM Plex Thai: หัวข้อการ์ด 14.5 pt ตัวหนา เนื้อหา 11.5 pt ตัวปกติ ตัวเลขสถิติ 24 pt ตัวหนา คำอธิบายภาพ 10.5 pt
- ฟุตเตอร์ทุกหน้า: Dautov and Husom, SEAMS 2024, IEEE Doc ID: 10556381, DOI และเลขหน้า "Slide N / 7" มุมขวาล่าง

### การสร้างใหม่
```bash
cd ../.build_v2 && NODE_PATH=../../work1/.build/node_modules node build_slides_v2.js && NODE_PATH=../../work1/.build/node_modules node build_pptx_v2.js
```
