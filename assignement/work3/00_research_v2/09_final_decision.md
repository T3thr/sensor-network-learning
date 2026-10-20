# เอกสารบันทึกการตัดสินใจเลือกบทความวิจัยหลัก (Version 2 / ปี 2024+)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร

เอกสารฉบับนี้สรุปผลการตัดสินใจขั้นสุดท้ายของรอบสืบค้น Version 2 (27 กันยายน 2026) และรายการส่งต่อไปยังขั้นตอนจัดทำรายงาน สไลด์ และบทพูด

---

## 1. ผลการตัดสินใจ (Final Selection Verdict)

| บทบาท | บทความ | งานประชุม | DOI | IEEE Doc ID | ไฟล์ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PRIMARY** | Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning | SEAMS 2024 (IEEE/ACM) | 10.1145/3643915.3644093 | 10556381 | `01_original_v2/Paper_III_2_PRIMARY_RaftFL_10556381.pdf` |
| **BACKUP 1** | A Performance Analysis for Confidential Federated Learning | SPW 2024 | 10.1109/SPW63631.2024.00009 | 10579526 | `00_research_v2/raw/Paper_III_v2_BACKUP1_10579526.pdf` |
| **BACKUP 2** | SideGuard: Non-Invasive On-Chip Malware Detection in Heterogeneous IoT Systems by Leveraging Side-Channels | SPW 2024 | 10.1109/SPW63631.2024.00030 | 10579519 | `00_research_v2/raw/Paper_III_v2_BACKUP2_10579519.pdf` |

- **คะแนนความเหมาะสมของ PRIMARY:** 31 จาก 35 ตามเกณฑ์ 6 มิติใน [04_candidate_comparison.md](04_candidate_comparison.md) (หักคะแนนที่ S3 เพราะมีเพียง 2 ตัวชี้วัด และที่ S5 เพราะข้อมูลทดลองเป็นภาพ CIFAR-10 ไม่ใช่ข้อมูลเซนเซอร์)
- **เหตุผลหลัก 3 ข้อ:**
  1. **นำเสนอจบใน 5 นาทีได้จริง:** ปัญหาเป็นประโยคเดียว กลไกใช้ภาพจากบทความ 3 ภาพ (Table 1, Fig. 1, Fig. 2) และไม่มีสมการที่ต้องพิสูจน์
  2. **มีหลักฐานเทียบ baseline:** Raft-enhanced Flower เทียบกับ Flower เดิมที่ 1 ถึง 10 Workers บน Raspberry Pi 3 จำนวน 11 บอร์ด ได้ตัวเลข 20 ค่าจาก Fig. 3 และ Fig. 4
  3. **ตรงกับทักษะนิสิต:** Raft เป็นกลไกฉันทามติของ etcd และ Kafka โหมด KRaft ซึ่งนิสิตใช้อยู่ในงาน Go และ Event-Driven Streaming

---

## 2. การวิเคราะห์เปรียบเทียบกับปัญหาเดิมใน Version 1 (OmniLedger 2018)

| มิติการประเมิน | Version 1: OmniLedger (IEEE S&P 2018) | Version 2: Raft + Federated Learning (SEAMS 2024) | ผลเชิงเปรียบเทียบ |
| :--- | :--- | :--- | :--- |
| **ปีที่ตีพิมพ์** | 2018 | 2024 | ใหม่กว่า 6 ปี ตรงเกณฑ์ปี 2024-2026 |
| **จำนวนกลไกที่ต้องอธิบาย** | 4 ระบบย่อย (RandHound + VRF, ByzCoinX, Atomix, State Blocks) | 1 กลไก (Raft Leader Election + Log Replication) บนเฟรมเวิร์ก FL เดิม | ลดภาระการอธิบายลงชัดเจน |
| **คณิตศาสตร์** | Binomial, union bound และสูตรใน Appendix C ที่ต้องตรวจทาน | ไม่มีสมการ มีเพียงตารางระดับการกู้คืนและกราฟผลลัพธ์ | ไม่ต้องปูทฤษฎีความน่าจะเป็น |
| **สภาพการทดลอง** | เครื่องจริง 60 เครื่องจำลอง 1,800 โหนด | Raspberry Pi 3 จำนวน 11 บอร์ดบน wireless LAN | ใกล้บริบทอุปกรณ์ Edge/IoT ของวิชามากกว่า แต่ขนาดเล็กกว่ามาก |
| **ความเข้มของหลักฐาน** | หลายตาราง หลายกราฟ มีจุดขัดแย้ง (13,000 tps) | 2 กราฟ 20 ตัวเลข อ่านตรงจากป้ายบนกราฟ | ตรวจสอบง่ายกว่า แต่ครอบคลุมน้อยกว่า |
| **ความยาวบทความ** | 16 หน้า (pp. 583-598) | 12 หน้า (pp. 110-121) | สั้นลง |

ข้อสังเกตอย่างตรงไปตรงมา: Version 2 แลกความลึกของงานวิจัยกับความชัดของการนำเสนอ PRIMARY ใหม่เป็น proof of concept ขนาดเล็กที่มีการอ้างอิง 8 ครั้ง เทียบกับ OmniLedger ที่มีการอ้างอิง 1,078 ครั้ง จุดอ่อนนี้ต้องพูดในสไลด์ 7 ไม่ใช่ปิดไว้

---

## 3. ความเสี่ยงและแนวทางรับมือ

| ความเสี่ยง | ผลกระทบ | แนวทางรับมือ |
| :--- | :--- | :--- |
| อาจารย์เห็นว่า DOI ขึ้นต้น 10.1145 (ACM) | ถูกถามว่าเป็นบทความ IEEE หรือไม่ | ระบุ IEEE Document Number 10556381 คู่กับ DOI และชี้ว่า SEAMS เป็นงาน IEEE/ACM ที่ IEEE Xplore จัดเป็น "IEEE Conferences" |
| ถูกถามเรื่องการทดลองเล็ก (11 บอร์ด, 1 รอบ) | คะแนน Critical Evaluation | ยกเองก่อนในสไลด์ 7 พร้อมข้อค้นพบว่าอัตราส่วนทราฟฟิกโตจาก 1.8 เป็น 5.0 เท่า |
| ถูกถามเรื่อง Quorum ของ Raft | ตอบไม่ได้ถ้าไม่เตรียม | เตรียมคำตอบ: คลัสเตอร์ N โหนดทนได้ไม่เกิน floor((N-1)/2) โหนดล่มพร้อมกัน และจุด 1 Worker ใน Fig. 3 บทความไม่อธิบาย |
| อาจารย์ไม่รับหัวข้อ FL | ต้องเปลี่ยนบทความ | ใช้ BACKUP 2 (Track 1) หรือ PrivacyOracle (10579527) ตาม [05_selected_papers.md](05_selected_papers.md) |

---

## 4. ขั้นตอนการส่งมอบงานถัดไป (Handoff Checklist)

1. [x] ดาวน์โหลดและตรวจ PDF ต้นฉบับใน `01_original_v2/` และ BACKUP ทั้งสองใน `00_research_v2/raw/` (SHA-256 ใน [evidence/MANIFEST.sha256](evidence/MANIFEST.sha256))
2. [x] อ่านค่าจาก Fig. 3, Fig. 4 และ Table 1 ของ PRIMARY จาก PDF หน้า 114 และ 118 (บันทึกใน [evidence/verified_metadata.json](evidence/verified_metadata.json))
3. [x] เขียนรายงานฉบับย่อภาษาไทย 7 หัวข้อลงใน `02_report_v2/Assignment_Paper_3_v2_Short_Report_TH.md`
4. [x] จัดทำสไลด์ 7 หน้าตามแผนเวลาในหัวข้อ 1.4 ของ `05_selected_papers.md` ใน `03_slides_v2/`
5. [x] เขียนสคริปต์พูด 4:30 ถึง 4:55 นาที และโพย Q&A ใน `04_presentation_v2/`
6. [x] สรุปบทเรียน Zero-to-Hero (Raft, FL, Flower) ใน `05_study_v2/`
7. [x] ตรวจรูบริก 10 คะแนนใน `06_evidence_v2/submission-checklist.md`
8. [x] อัปเดตหน้าเว็บ `paper-3/v2/index.html` และหน้าศูนย์กลาง `index.html`

---

## 5. เรื่องที่นิสิตต้องยืนยัน

1. **(ยืนยันแล้ว 27 ก.ย. 2026) เลข IEEE ของ OmniLedger:** ข้อความสั่งงานรอบนี้ระบุ 8418624 แต่ไฟล์ต้นฉบับ Version 1 และเอกสารใน `00_research_v2/00_README.md` ใช้ 8418625 ซึ่งเป็นเลขที่ตรวจแล้วใน Version 1 เอกสารรอบนี้ใช้ 8418625
2. **(แก้แล้ว) สิทธิ์ UniNet:** `01_original_v2/README.md` ระบุว่าดาวน์โหลดผ่าน UniNet แต่ไฟล์ทั้ง 3 ดาวน์โหลดโดยไม่ใช้สิทธิ์มหาวิทยาลัย (PRIMARY เป็น Open Access ส่วน BACKUP เป็นเอกสารฟรีของ IEEE)
3. **ขอบเขตการค้น:** ผู้สมัครทั้ง 6 เรื่องมาจากกลุ่มที่ดาวน์โหลดได้ฟรี หากนิสิตเข้า UniNet ได้และต้องการเทียบกับบทความจาก IPSN, INFOCOM หรือ PerCom ปี 2024-2026 ต้องค้นเพิ่มอีกรอบ
