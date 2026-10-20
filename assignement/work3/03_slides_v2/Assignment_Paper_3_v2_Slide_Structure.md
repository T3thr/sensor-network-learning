# โครงสร้างสไลด์ 7 หน้า Version 2: Raft-FL (SEAMS 2024, IEEE Doc ID: 10556381)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks)

สไลด์ขนาด 16:9 ตาม SLIDES_DESIGN_SYSTEM.md: แถบหัวสีกรมท่า (#0F2D4A) สูง 0.95 นิ้ว พื้นหลัง #F8FAFC การ์ดพื้นขาวขอบ #E2E8F0 ฟอนต์ IBM Plex Thai (หัวข้อการ์ด 14.5 pt ตัวหนา เนื้อหา 11.5 pt ตัวเลขสถิติ 24 pt ตัวหนา) และฟุตเตอร์ระบุ SEAMS 2024, IEEE Doc ID: 10556381 พร้อมเลขหน้า Slide N / 7

1. **หน้าปกบทความวิจัย (Cover Slide)** (0:00 ถึง 0:25): หน้าปก: ชื่อบทความ ผู้แต่ง SEAMS 2024 IEEE Doc ID DOI ชื่อนิสิต
2. **ที่มาและปัญหาความท้าทาย (Research Challenges & Problem Statement)** (0:25 ถึง 1:05): ขั้นตอน FL 5 ขั้น + ตาราง SPOF + ทางเลือกเดิม (Section 3) + แผนภาพโครงสร้างแบบ star (สรุปจาก Section 2.1)
3. **สถาปัตยกรรม Raft-FL และกลไก Leader Election** (1:05 ถึง 1:50): แผนภาพสถานะ Raft + ช่วง Leader Election ของ Fig. 2 (หน้า 117) + สูตร quorum
4. **กลไก Checkpoint Logging และ Self-Recovery Workflow** (1:50 ถึง 2:35): Fig. 1 (หน้า 116) + ตาราง Level 0 ถึง 4 จาก Table 1 (หน้า 114) + workflow 4 ขั้น
5. **ผลการทดลองเชิงประจักษ์บน Raspberry Pi 11 บอร์ด** (2:35 ถึง 3:25): Fig. 3 และ Fig. 4 (หน้า 118) + testbed + ตารางอัตราส่วน 10 แถว + ข้อสังเกต 3 ข้อ
6. **คุณูปการและการเชื่อมโยงกับเครือข่ายเซนเซอร์และ Distributed Event Streaming** (3:25 ถึง 4:10): คุณูปการ 3 ข้อ (ซ้าย) + การประยุกต์ใช้ 3 ข้อ พร้อมตารางเทียบ Raft-FL, etcd และ Kafka KRaft (ขวา)
7. **ข้อจำกัดทางวิศวกรรมและบทสรุป (Engineering Limitations & Conclusion)** (4:10 ถึง 4:45): ข้อจำกัด 3 ข้อพร้อมเลขหน้า + ตัวเลขสรุป 2 กล่อง + บทสรุป 3 ข้อ
