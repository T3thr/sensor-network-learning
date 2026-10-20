# บันทึกรายละเอียดบทความวิจัยที่ได้รับการคัดเลือก (Version 2 / ปี 2024+)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร

เอกสารฉบับนี้บันทึกรายละเอียดของบทความ 3 เรื่องที่ผ่านการคัดเลือกจาก [04_candidate_comparison.md](04_candidate_comparison.md) ตัวเลขทุกค่าอ่านจากไฟล์ PDF ที่ดาวน์โหลดไว้ (ตรวจ 27 กันยายน 2026) ค่าที่ผู้จัดทำคำนวณเพิ่มเองระบุว่า "คำนวณจาก" พร้อมที่มาทุกครั้ง

---

## 1. บทความตัวจริง (PRIMARY PAPER)

- **สถานะ:** PRIMARY PAPER (ใช้ทำรายงาน สไลด์ 7 หน้า และนำเสนอ 5 นาที)
- **ชื่อบทความวิจัย (ภาษาอังกฤษ):** Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning
- **ชื่อบทความแปลภาษาไทย:** การใช้โปรโตคอล Raft เพื่อความทนทานต่อความผิดพลาดและการกู้คืนตนเองในการเรียนรู้แบบสหพันธ์ (Federated Learning)
- **คณะผู้วิจัยและสถาบัน:** Rustem Dautov และ Erik Johannes Husom (SINTEF Digital, Oslo, Norway)
- **งานประชุมวิชาการและปี:** 2024 IEEE/ACM 19th Symposium on Software Engineering for Adaptive and Self-Managing Systems (SEAMS), Lisbon, Portugal, 15-16 เมษายน 2024, หน้า 110-121 (12 หน้า)
- **เลขระบุเอกสารสากล (DOI):** [https://doi.org/10.1145/3643915.3644093](https://doi.org/10.1145/3643915.3644093) (SEAMS เป็นงานที่ IEEE และ ACM ร่วมจัด DOI จึงขึ้นต้น 10.1145)
- **หมายเลขเอกสาร IEEE Xplore (Doc ID):** [10556381](https://ieeexplore.ieee.org/document/10556381) (Publisher: IEEE, Content Type: IEEE Conferences)
- **สิทธิ์การใช้งาน:** Open Access ภายใต้ Creative Commons Attribution International
- **ยอดอ้างอิงและดาวน์โหลด (27 ก.ย. 2026):** Cited by 8 ใน IEEE Xplore, Full Text Views 827
- **ซอร์สโค้ด:** ผู้แต่งเปิดเผยโค้ดและวิธีรันการทดลองบน GitHub (เชิงอรรถ 8 ของบทความ) ใช้ไลบรารี PySyncObj (https://github.com/bakwc/PySyncObj/)
- **ตำแหน่งจัดเก็บไฟล์ PDF ต้นฉบับ:** `assignement/work3/01_original_v2/Paper_III_2_PRIMARY_RaftFL_10556381.pdf` (956,188 ไบต์, 12 หน้า, SHA-256 `3d3cc138...8c278093d`)
- **แนวคิดหลักใน 1 ประโยค:** บทความนำ Leader Election และ Log Replication ของ Raft มาใส่ในเฟรมเวิร์ก Flower เพื่อให้ Worker ตัวใดก็ได้ขึ้นเป็น Aggregator ใหม่และฝึกต่อจาก checkpoint ล่าสุดเมื่อ Aggregator เดิมล่ม โดยวัดบน Raspberry Pi 3 จำนวน 11 บอร์ดว่าการเลือกใหม่ใช้เวลาไม่เกิน 3.76 วินาที แลกกับทราฟฟิกที่เพิ่มขึ้นสูงสุดประมาณ 5 เท่า

### 1.1 กลไกหลัก (อธิบายจบใน 45 วินาที)

1. **ปัญหา:** FL แบบดั้งเดิมมี Aggregator ตัวเดียวรวมพารามิเตอร์ ถ้าเครื่องนี้ดับ การฝึกหยุดและความคืบหน้าที่ยังไม่ได้บันทึกหายไป (Single Point of Failure)
2. **ระดับการกู้คืน 5 ระดับ (Table 1):** Level 0 ไม่มีการกู้คืน, Level 1 Aggregator เดิมเริ่มใหม่จาก checkpoint บนดิสก์ตัวเอง, Level 2 เลือก Aggregator ใหม่แต่เริ่มฝึกจากศูนย์, **Level 3 เลือก Aggregator ใหม่และทำซ้ำ (replicate) พารามิเตอร์ที่รวมแล้วไปทุกโหนด**, Level 4 ทำซ้ำสถานะของ Worker ทุกตัวด้วย บทความเลือก Level 3 เพราะคุ้มค่าที่สุด
3. **การทำงาน (Fig. 1 และ Fig. 2):** ทุกโหนดรันโค้ดชุดเดียวกัน เริ่มด้วย Raft Leader Election ผู้ชนะเป็น Aggregator ส่วนที่เหลือเป็น Worker Aggregator เขียนพารามิเตอร์ล่าสุดลง replicated key-value object ที่ 3 checkpoints แล้ว PySyncObj กระจายไปทุกโหนดใน thread แยก หลังจบแต่ละรอบ Worker ตรวจว่า Aggregator ยังอยู่หรือไม่ ถ้าไม่อยู่ให้กลับไปเลือกตั้งใหม่ และ Aggregator ใหม่ทำงานต่อจาก checkpoint

### 1.2 การตั้งค่าการทดลอง

| รายการ | ค่า |
| :--- | :--- |
| ฮาร์ดแวร์ | Raspberry Pi 3 จำนวน 11 บอร์ด (1 Aggregator + สูงสุด 10 Workers) เชื่อมผ่าน wireless LAN |
| ซอฟต์แวร์ | Raspbian Bullseye 64-bit, Python 3.9, Flower, PySyncObj, PyTorch |
| งานเรียนรู้ | CNN บน CIFAR-10 (60,000 ภาพ 32x32, 10 คลาส) ขนาด model update ประมาณ 250 kB ต่อครั้ง |
| Baseline | Flower PyTorch quick-start tutorial แบบไม่มี Raft |
| การวัดทราฟฟิก | `iftop` แยก port 8080 (ทราฟฟิก FL) และ port 5000 (Raft election และ replication) |
| ตัวชี้วัด | (1) เวลาเลือก Aggregator ใหม่ (2) ปริมาณทราฟฟิกเครือข่าย 1 รอบการฝึก |

### 1.3 ผลการทดลองเชิงประจักษ์ (Empirical Metrics)

ค่าในคอลัมน์ 2 ถึง 4 อ่านจากป้ายตัวเลขบนกราฟใน PDF หน้า 118 (Fig. 3 และ Fig. 4) คอลัมน์อัตราส่วนคำนวณโดยผู้จัดทำ

| จำนวน Workers | เวลาเลือก Aggregator ใหม่ (s) | ทราฟฟิก Flower เดิม (MB) | ทราฟฟิกแบบมี Raft (MB) | อัตราส่วน Raft / เดิม (คำนวณ) |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 1.27 | 0.98 | 1.77 | 1.81 |
| 2 | 1.33 | 2.15 | 5.17 | 2.40 |
| 3 | 1.46 | 3.10 | 7.94 | 2.56 |
| 4 | 1.70 | 4.06 | 10.9 | 2.68 |
| 5 | 1.97 | 5.02 | 16.0 | 3.19 |
| 6 | 2.25 | 5.97 | 22.6 | 3.79 |
| 7 | 2.47 | 6.93 | 29.3 | 4.23 |
| 8 | 2.76 | 7.88 | 36.8 | 4.67 |
| 9 | 3.13 | 8.84 | 43.9 | 4.97 |
| 10 | 3.76 | 9.80 | 49.1 | 5.01 |

ข้อสรุปสำหรับกล่องสถิติบนสไลด์หน้า 5:
- เลือก Aggregator ใหม่เสร็จภายใน 3.76 วินาทีที่ 10 Workers และทุกการทดลองฝึกโมเดลต่อจนจบ (Section 6.2.1)
- ทราฟฟิกของ Flower เดิมโตแบบเชิงเส้น ประมาณ 0.97 MB ต่อ Worker (คำนวณจาก linear fit ของ Fig. 4)
- ทราฟฟิกแบบมี Raft สูงกว่าเดิม 1.8 เท่าที่ 1 Worker และ 5.0 เท่าที่ 10 Workers

### 1.4 แผนการนำเสนอ 7 สไลด์ (รวม 4:45 นาที)

| สไลด์ | เนื้อหา | ภาพ/หลักฐานจากบทความ | เวลา |
| :---: | :--- | :--- | :---: |
| 1 | ชื่อเรื่อง ผู้แต่ง งานประชุม และคำถามนำ "ถ้าเครื่องกลางของ FL ดับ จะเกิดอะไรขึ้น" | หน้าแรกของบทความ | 0:20 |
| 2 | ปัญหา Single Point of Failure ของ FL บนอุปกรณ์ Edge/IoT | Section 2.1 | 0:40 |
| 3 | Raft ใน 3 แนวคิด: Leader Election, Heartbeat, Log Replication แบบเสียงข้างมาก | Section 4.1 | 0:45 |
| 4 | ระดับการกู้คืน Level 0 ถึง 4 และโฟลว์ของโหนดที่เลือก Level 3 | Table 1, Fig. 1, Fig. 2 | 0:50 |
| 5 | ผลการทดลองบน Raspberry Pi 11 บอร์ด | Fig. 3, Fig. 4 และตารางอัตราส่วนข้างต้น | 0:55 |
| 6 | Academic Contributions 3 ข้อ และความเชื่อมโยงกับ etcd และ Kafka KRaft ที่ใช้ Raft เช่นกัน | Section 1, Section 7 | 0:35 |
| 7 | Critical Evaluation: จุดเด่นและข้อจำกัด | Section 6.3 และข้อค้นพบในหัวข้อ 1.6 | 0:40 |

### 1.5 จุดเด่น (Strengths)

1. **ปัญหาเดียว คำตอบเดียว:** แก้ Single Point of Failure ของ Aggregator ด้วยอัลกอริทึมมาตรฐาน (Raft, Ongaro and Ousterhout 2014) ไม่ต้องสร้างทฤษฎีใหม่ ผู้ฟังเข้าใจได้ในเวลาสั้น
2. **มีกรอบจำแนกระดับการกู้คืน (Table 1):** ใช้อธิบายการตัดสินใจเชิงวิศวกรรมได้ชัดว่าทำไมเลือก Level 3 แทน Level 4
3. **ทดลองบนฮาร์ดแวร์จริง:** Raspberry Pi 3 จำนวน 11 บอร์ดผ่าน wireless LAN ใกล้กับสภาพเครือข่าย Edge มากกว่าการจำลองบนเครื่องเดียว
4. **เปิดเผยข้อจำกัดเอง:** Section 6.3 ระบุ 4 ข้อ (โค้ดซ้ำทุกโหนด, การทดลองแบบ clean run, ข้อมูลโหลดไว้ล่วงหน้า, ทราฟฟิกที่เพิ่มขึ้น)
5. **ทำซ้ำได้:** เป็น Open Access และเปิดซอร์สโค้ด

### 1.6 ข้อจำกัด (Limitations)

ข้อที่บทความยอมรับเอง (Section 6.3 และ 7):
1. ทราฟฟิกเพิ่มขึ้นมาก ขัดกับข้อดีของ FL ที่ประหยัดแบนด์วิดท์ และจะหนักขึ้นเมื่อโมเดลใหญ่ระดับ MB หรือมีหลายสิบหลายร้อยโหนด
2. การวัดทราฟฟิกเป็น clean run ไม่มีโหนดล่มระหว่างวัด และจำกัดที่ 1 รอบการฝึก
3. ทุกโหนดต้องถือโมเดลและโค้ด Aggregator ตั้งแต่เริ่ม
4. สถานะถูกเก็บในหน่วยความจำ ไม่ได้บันทึกลงดิสก์

ข้อค้นพบเพิ่มเติมจากการตรวจตัวเลขของผู้จัดทำ (ใช้ในสไลด์ 7 และการตอบคำถาม):
1. **"ประมาณ 5 เท่า" ใช้ได้เฉพาะที่ 9 ถึง 10 Workers:** อัตราส่วนเพิ่มจาก 1.81 เท่า (1 Worker) เป็น 5.01 เท่า (10 Workers) และส่วนต่างที่เพิ่มต่อ Worker หนึ่งตัวโตจากประมาณ 3 MB (2 ถึง 4 Workers) เป็นประมาณ 7 MB (6 ถึง 9 Workers) จึงเป็นการโตแบบเร็วกว่าเชิงเส้น ขณะที่บทความเขียนว่า "still somewhat linear"
2. **เวลาเลือกใหม่โตเกือบ 3 เท่า:** จาก 1.27 เป็น 3.76 วินาที (2.96 เท่า) ขณะที่บทความใช้คำว่า "grows slightly"
3. **ไม่อภิปราย Quorum ของ Raft:** Raft ต้องได้เสียงข้างมากของสมาชิกทั้งหมด คลัสเตอร์ 11 โหนดจึงทนโหนดล่มพร้อมกันได้ไม่เกิน 5 โหนด บทความกล่าวเพียงว่าเวลารวมแปรตามจำนวนครั้งที่ล่ม นอกจากนี้ Fig. 3 มีจุดที่ 1 Worker (รวม 2 โหนด) ซึ่งตาม Raft มาตรฐานจะเลือกผู้นำไม่ได้เมื่อเหลือ 1 ใน 2 โหนด และข้อความใน Section 6.2.1 ระบุว่าทดลอง 2 ถึง 10 Workers จุดนี้บทความไม่อธิบาย (เป็นคำถามที่ควรเตรียม ไม่ใช่ข้อสรุปว่าผิด)
4. **ความหมายของแท่งสีแดงใน Fig. 4 ไม่ชัด:** Section 6.2.2 แยกวัด port 8080 และ 5000 แต่คำอธิบายกราฟไม่บอกว่าแท่ง "Flower enhanced with RAFT" เป็นทราฟฟิกรวมหรือเฉพาะ port 5000
5. **ไม่มีตัวชี้วัดด้านโมเดล:** เชิงอรรถ 11 (หน้า 116) อ้างว่าความแม่นยำและ loss เท่ากับ baseline เพราะไม่ได้แก้ตรรกะการฝึก แต่ไม่ได้วัดในกรณีที่มีการกู้คืนจริง และไม่วัดเวลาส่งสถานะให้ Aggregator ใหม่
6. **ขอบเขตความผิดพลาด:** รองรับเฉพาะ crash fault ไม่ครอบคลุม Aggregator ที่ประสงค์ร้าย (Byzantine) และยังไม่เทียบกับ DLT หรือ Gossip Learning เชิงตัวเลข (ระบุเป็นงานในอนาคต)
7. **ข้อมูลไม่ใช่ข้อมูลเซนเซอร์:** ใช้ CIFAR-10 ซึ่งเป็นภาพ ไม่ใช่ time series จากเซนเซอร์ ส่วน PySyncObj เป็นไลบรารี Python ไม่ใช่ implementation ระดับ production เช่น etcd/raft

### 1.7 เหตุผลที่มั่นใจว่าอธิบายได้ลึกใน 5 นาที

1. ปัญหาเป็นประโยคเดียว (Aggregator ล่มแล้วระบบหยุด) และผู้ฟังสายคอมพิวเตอร์คุ้นกับแนวคิด Single Point of Failure อยู่แล้ว
2. กลไกทั้งหมดใช้ภาพจากบทความ 3 ภาพ (Table 1, Fig. 1, Fig. 2) ไม่มีสมการที่ต้องพิสูจน์
3. ผลลัพธ์มี 2 กราฟ 20 ตัวเลข อ่านได้ตรงจากป้ายบนกราฟ และคำนวณอัตราส่วนเองได้ด้วยการหารครั้งเดียว
4. ข้อจำกัดมีทั้งที่บทความยอมรับและที่ตรวจพบเอง 7 ข้อ พอสำหรับสไลด์ Critical Evaluation โดยไม่ต้องคาดเดา
5. นิสิตใช้ Kafka ซึ่งตั้งแต่โหมด KRaft ใช้โปรโตคอลฉันทามติตระกูล Raft จัดการ metadata แทน ZooKeeper และ etcd ของ Kubernetes ก็ใช้ Raft จึงตอบคำถามเชิงระบบได้จากประสบการณ์จริง

---

## 2. บทความสำรองที่ 1 (BACKUP PAPER 1)

- **สถานะ:** BACKUP PAPER 1
- **ชื่อบทความวิจัย (ภาษาอังกฤษ):** A Performance Analysis for Confidential Federated Learning
- **ชื่อภาษาไทย:** การวิเคราะห์สมรรถนะของการเรียนรู้แบบสหพันธ์เชิงรักษาความลับ (Confidential Federated Learning)
- **คณะผู้วิจัยและสถาบัน:** Bruno Casella, Iacopo Colonnelli, Gianluca Mittone, Robert Birke, Marco Aldinucci (University of Turin), Walter Riviera (University of Verona), Antonio Sciarappa, Carlo Cavazzoni (Leonardo SpA)
- **งานประชุมวิชาการและปี:** 2024 IEEE Security and Privacy Workshops (SPW), San Francisco, CA, USA, 23 พฤษภาคม 2024, หน้า 40-47 (8 หน้า)
- **DOI & IEEE Doc ID:** [10.1109/SPW63631.2024.00009](https://doi.org/10.1109/SPW63631.2024.00009) / [10579526](https://ieeexplore.ieee.org/document/10579526)
- **ตำแหน่งจัดเก็บไฟล์ PDF:** `assignement/work3/00_research_v2/raw/Paper_III_v2_BACKUP1_10579526.pdf` (411,043 ไบต์, 8 หน้า)
- **แนวคิดหลักใน 1 ประโยค:** รันเฟรมเวิร์ก OpenFL แบบไม่แก้โค้ดภายใน Intel SGX enclave ผ่าน LibOS Gramine พร้อม Disk Encryption และ TLS แล้ววัดว่าแต่ละชั้นความปลอดภัยเพิ่มเวลาเท่าใด โดยความแม่นยำของโมเดลไม่ลดลง
- **การตั้งค่า:** 1 Aggregator + 3 Collaborators บนเซิร์ฟเวอร์ Xeon Platinum 8380 (2 x 40 cores) เชื่อมด้วย Ethernet 100 Gb/s; ResNet-18 และ MobileNetV3-Small; MNIST, CIFAR-10, CIFAR-100; 100 รอบการฝึก รอบละ 1 epoch
- **เมตริกเชิงประจักษ์:**

| โมเดล / Dataset | Baseline (ชม.:นาที) | SGX + TLS + DE (ชม.:นาที) | เพิ่มขึ้น (คำนวณจาก Table 3) |
| :--- | :---: | :---: | :---: |
| ResNet-18 / MNIST | 01:55 | 03:51 | 2.01 เท่า |
| ResNet-18 / CIFAR-10 | 02:01 | 04:07 | 2.04 เท่า |
| ResNet-18 / CIFAR-100 | 01:54 | 04:11 | 2.20 เท่า |
| MobileNetV3-Small / MNIST | 01:40 | 02:54 | 1.74 เท่า |
| MobileNetV3-Small / CIFAR-10 | 01:38 | 02:38 | 1.61 เท่า |
| MobileNetV3-Small / CIFAR-100 | 01:29 | 03:01 | 2.03 เท่า |

  - แบบจำลอง overhead: T = T_baseline + O_Gramine + O_SGX + O_DE + O_TLS โดย O = C x T_baseline; ค่า C (Fig. 3): Gramine 0.754 / 0.282, SGX 0.056 / 0.330, DE 0.046 / 0.040, TLS 0.197 / 0.133 (ResNet-18 / MobileNetV3-Small)
  - Disk Encryption เพิ่มเวลาน้อยที่สุด ส่วน TLS เป็นแหล่ง overhead หลักของการสื่อสาร (Table 4)
- **จุดเด่นและเหตุผลที่เป็นบทความสำรอง:** มี baseline ชัดและการทดลองครบ 6 ระดับความปลอดภัย x 3 datasets x 2 models ใช้ความรู้ FL ชุดเดียวกับ PRIMARY และเชื่อมกับงาน Docker/TLS ของนิสิต เปิดโค้ดบน GitHub
- **ข้อจำกัดที่ต้องระบุ:**
  1. บทคัดย่อและบทสรุปเขียนว่า overhead "at most 2x" แต่ Table 3 ให้ 2.20 เท่าที่ ResNet-18 / CIFAR-100 (114 เป็น 251 นาที)
  2. ตัวเลข "about 2.7x" และ "about 5.9x" ใน Section 5.1 เป็นอัตราส่วนของค่าสัมประสิทธิ์ระหว่างสองโมเดล (0.754 / 0.282 และ 0.330 / 0.056) ไม่ใช่ความช้าลงของระบบ อ้างผิดความหมายได้ง่าย
  3. ทดลองบนเซิร์ฟเวอร์และเครือข่าย 100 Gb/s มีเพียง 3 clients ไม่ใช่อุปกรณ์ Edge หรือเซนเซอร์
  4. ถือว่า TEE ปลอดภัยสมบูรณ์ ไม่รวม side-channel attacks และผู้แต่งยอมรับว่ายังไม่ทราบสาเหตุที่ TLS กระทบเวลาคำนวณ
  5. Table 4 ค่า baseline ของ MobileNetV3-Small / CIFAR-100 เท่ากับ 5.0 วินาที ขณะที่ MNIST และ CIFAR-10 ประมาณ 10 วินาที บทความไม่อธิบาย

---

## 3. บทความสำรองที่ 2 (BACKUP PAPER 2)

- **สถานะ:** BACKUP PAPER 2
- **ชื่อบทความวิจัย (ภาษาอังกฤษ):** SideGuard: Non-Invasive On-Chip Malware Detection in Heterogeneous IoT Systems by Leveraging Side-Channels
- **ชื่อภาษาไทย:** SideGuard: การตรวจจับมัลแวร์บนชิปแบบไม่รุกล้ำในระบบ IoT แบบ Heterogeneous โดยอาศัยช่องทางข้างเคียง (Side-Channel)
- **คณะผู้วิจัยและสถาบัน:** Fatemeh Arkannezhad, Pooya Aghanoury, Justin Feng, Hossein Khalili, Nader Sehatbakhsh (ECE Department, University of California, Los Angeles)
- **งานประชุมวิชาการและปี:** 2024 IEEE Security and Privacy Workshops (SPW), San Francisco, CA, USA, 23 พฤษภาคม 2024, หน้า 253-259 (7 หน้า)
- **DOI & IEEE Doc ID:** [10.1109/SPW63631.2024.00030](https://doi.org/10.1109/SPW63631.2024.00030) / [10579519](https://ieeexplore.ieee.org/document/10579519)
- **ตำแหน่งจัดเก็บไฟล์ PDF:** `assignement/work3/00_research_v2/raw/Paper_III_v2_BACKUP2_10579519.pdf` (320,726 ไบต์, 7 หน้า)
- **แนวคิดหลักใน 1 ประโยค:** ใช้วงจร Time-to-Digital Converter บน embedded FPGA เป็นเซนเซอร์วัดการแกว่งของแรงดันในวงจรจ่ายไฟที่ใช้ร่วมกับ CPU แล้วเทียบ frequency features กับ signature ของโปรแกรมปกติ เพื่อตรวจจับมัลแวร์โดยไม่ต้องแก้ CPU
- **การตั้งค่า:** Terasic DE1-SoC (ARM Cortex-A9 คู่ + Cyclone V FPGA), ทดสอบซ้ำบน DE1-SoC ตัวที่สองและ Xilinx Zynq UltraScale+; แอป MiBench 5 ตัว (bitcount, basicmath, qsort, susan, fft); มัลแวร์ 2 ตระกูล (Ransomware แบบ AES-128-CBC และ Mirai DDoS); ฝึก 5 รอบ ทดสอบ 1,000 รอบปกติ และ 500 รอบต่อมัลแวร์ต่อแอป
- **เมตริกเชิงประจักษ์:**
  - True Positive Rate มากกว่า 99.9% (False Negative ไม่เกิน 0.1% ทุกแอป)
  - False Positive ต่อแอป (Table I): bitcount 1.7%, susan 4.1%, fft 3.5%, basicmath 2.9%, qsort 3.1% เฉลี่ย 3.06%
  - ข้ามอุปกรณ์ (Table II): ฝึกบน DE1 ทดสอบบน DE1 อีกตัว FP เพิ่ม 2.7%; บน Zynq FP เพิ่ม 0.3%; FN เพิ่ม 0%
  - ต้นทุนฮาร์ดแวร์: ใช้พื้นที่ FPGA น้อยกว่า 35%, พลังงานสูงสุดประมาณ 47 mW (ประมาณ 3% ของระบบ), หน่วยความจำ training data น้อยกว่า 100 ไบต์, CPU overhead เป็นศูนย์
- **จุดเด่นและเหตุผลที่เป็นบทความสำรอง:** เป็นผู้สมัคร Track 1 (on-device anomaly detection) เพียงเรื่องเดียวที่ผ่าน Gate ใช้เครือข่ายเซนเซอร์บนชิปจริง มีตัวเลขทั้งด้านความแม่นยำและต้นทุนฮาร์ดแวร์ ทำให้ชุด BACKUP ครอบคลุม Track ที่ PRIMARY ไม่ครอบคลุม
- **ข้อจำกัดที่ต้องระบุ:**
  1. เทียบกับ Hardware Malware Detector เดิมเชิงคุณภาพเท่านั้น (Section IV-D) ไม่มีตัวเลขเทียบ
  2. ทดสอบเพียง 5 แอปและมัลแวร์ 2 ตระกูลที่ผู้แต่งสร้างขึ้นผ่าน buffer overflow ที่ใส่ไว้โดยเจตนา
  3. ไม่ได้ทดสอบผู้โจมตีที่รู้กลไกและปรับพฤติกรรมพลังงานให้คล้าย signature ปกติ (mimicry)
  4. Table I ไม่แยกผลตามตระกูลมัลแวร์ และบทสรุปใช้คำว่า ">95% accuracy" โดยไม่นิยาม accuracy
  5. บทคัดย่อบนหน้า HTML ของ IEEE แสดง "> 5 % accuracy" ซึ่งไม่ตรงกับ PDF (">95%") ต้องอ้างจาก PDF
  6. เป็นงานฮาร์ดแวร์ (Verilog, Quartus) ห่างจากทักษะหลักของนิสิต ต้องเตรียมพื้นฐาน TDC และ FFT เพิ่ม

---

## 4. สำรองลำดับถัดไป (ไม่ได้ดาวน์โหลด)

- **PrivacyOracle** (SPW 2024, IEEE 10579527, DOI [10.1109/SPW63631.2024.00028](https://doi.org/10.1109/SPW63631.2024.00028)): ใช้แทน BACKUP 2 ได้หากอาจารย์ต้องการหัวข้อ LLM กับข้อมูลเซนเซอร์ในอาคารอัจฉริยะ PDF ฟรีขนาดประมาณ 2.4 MB จุดอ่อนหลักคือชุดทดสอบเล็ก (16 และ 144 information flows) และไม่มีระบบ baseline
