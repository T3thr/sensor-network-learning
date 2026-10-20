# หลักฐานการค้นคว้า Paper_III

ดาวน์โหลดจาก IEEE Xplore ทีละบทความเมื่อวันที่ 26 กันยายน 2026 เวลาประมาณ 11:02 น. (เวลาไทย, UTC+7) จาก `https://ieeexplore.ieee.org/stampPDF/getPDF.jsp?tp=&arnumber=<ID>` ไม่ได้ใช้ crawler

ทุกไฟล์มีแถบลิขสิทธิ์ระบุว่า `Authorized licensed use limited to: IEEE Xplore. Downloaded on September 26,2026 ... from IEEE Xplore.` เป็นการเข้าถึงแบบฟรีที่ IEEE Xplore เปิดให้สำหรับบทความของ IEEE SP และ EuroS&P ไม่ได้ล็อกอิน และไม่ได้ใช้สิทธิ์ UniNet ของมหาวิทยาลัยนเรศวร

แนวทางการค้น: 3 โดเมนตามความถนัดของนิสิต (Distributed Systems, Zero-Trust Identity, Edge AI/Federated Learning) รายละเอียดคำค้นอยู่ที่ `assignement/work3/00_research/03_search_log.md`

## 1. ตัวจริง

**OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding**

- ผู้แต่ง: Eleftherios Kokoris-Kogias, Philipp Jovanovic, Linus Gasser, Nicolas Gailly, Bryan Ford (EPFL, Switzerland); Ewa Syta (Trinity College, USA)
- งานประชุม: 2018 IEEE Symposium on Security and Privacy (SP)
- วันที่ประชุม: 20-24 พฤษภาคม 2018, San Francisco, CA, USA
- DOI: <https://doi.org/10.1109/SP.2018.000-5>
- IEEE Xplore: <https://ieeexplore.ieee.org/document/8418625/>
- ไฟล์: `Paper_III_1_PRIMARY_OmniLedger_8418625.pdf` (สำเนาเดียวกันที่ `assignement/work3/01_original/`)
- สถานะ: 16 หน้า (หน้า 583-598), ฟรีบน IEEE Xplore
- เหตุผลที่เลือก: มีแบบจำลองความน่าจะเป็น โปรโตคอลข้าม shard และผลทดลอง 1,800 โหนด (13,000 tps) prototype เขียนด้วย Go ตรงทักษะของนิสิต

## 2. สำรอง 1

**Back to the Drawing Board: A Critical Evaluation of Poisoning Attacks on Production Federated Learning**

- ผู้แต่ง: Virat Shejwalkar, Amir Houmansadr (University of Massachusetts Amherst); Peter Kairouz, Daniel Ramage (Google Research)
- งานประชุม: 2022 IEEE Symposium on Security and Privacy (SP)
- วันที่ประชุม: 22-26 พฤษภาคม 2022, San Francisco, CA, USA
- DOI: <https://doi.org/10.1109/SP46214.2022.9833647>
- IEEE Xplore: <https://ieeexplore.ieee.org/document/9833647/>
- ไฟล์: `Paper_III_2_BACKUP1_FL-Poisoning_9833647.pdf`
- สถานะ: 18 หน้า (หน้า 1354-1371), ฟรีบน IEEE Xplore
- เหตุผลที่เลือก: ใกล้วิชาเครือข่ายเซนเซอร์ที่สุด (การเรียนรู้บนอุปกรณ์ปลายทาง) มีผลทดลองเป็นระบบบน 3 dataset แต่เป็น simulation และแกนเป็น ML

## 3. สำรอง 2 (เปลี่ยนเมื่อ 27 กันยายน 2026)

**Burglars' IoT Paradise: Understanding and Mitigating Security Risks of General Messaging Protocols on IoT Clouds**

- ผู้แต่ง: Yan Jia, Yuhang Mao, Shangru Zhao (Xidian University); Luyi Xing, Dongfang Zhao, XiaoFeng Wang (Indiana University Bloomington); Yuqing Zhang (University of Chinese Academy of Sciences)
- งานประชุม: 2020 IEEE Symposium on Security and Privacy (SP)
- วันที่ประชุม: 18-21 พฤษภาคม 2020, San Francisco, CA, USA (ตามที่ IEEE Xplore ระบุ)
- DOI: <https://doi.org/10.1109/SP40000.2020.00051>
- IEEE Xplore: <https://ieeexplore.ieee.org/document/9152619/>
- ไฟล์: `Paper_III_3_BACKUP2_BurglarsIoT_9152619.pdf`
- สถานะ: 17 หน้า (หน้า 465-481), ฟรีบน IEEE Xplore, ดาวน์โหลดเมื่อ 27 กันยายน 2026 เวลาประมาณ 02:36 น. PDF แทบไม่มีชั้นข้อความ (ข้อความถูกวาดเป็นเส้น) คัดลอกข้อความไม่ได้ ถ้าต้องยกข้อความให้ใช้มุมมอง HTML บน IEEE Xplore
- เหตุผลที่เลือก: ตรงทั้งงาน Kafka (MQTT แบบ publish-subscribe), งาน Keycloak (identity, session และการเพิกถอนสิทธิ์) และวิชาเครือข่ายเซนเซอร์ (อุปกรณ์ IoT) โจมตีสำเร็จอย่างน้อยหนึ่งประเภทบน IoT cloud 7 จาก 8 ราย และเสนอ MOUCON ที่ทดสอบบน Mosquitto

**PESTO (สำรอง 2 เดิม, ไม่ได้เลือกแล้ว)**: Proactively Secure Distributed Single Sign-On, or How to Trust a Hacked Server (IEEE EuroS&P 2020, DOI <https://doi.org/10.1109/EuroSP48549.2020.00044>) เปลี่ยนชื่อไฟล์จาก `Paper_III_3_BACKUP2_PESTO_9230400.pdf` เป็น `Paper_III_CANDIDATE_PESTO_9230400.pdf` และเก็บไว้เป็นหลักฐาน เหตุผลที่เปลี่ยนออก: ตรงทักษะเท่ากัน แต่การทดลองมีเพียง n = 2 เนื้อหาส่วนใหญ่เป็นบทพิสูจน์ทาง cryptography และไม่เกี่ยวกับวิชา

## ตรวจความไม่ซ้ำ

ทั้งสามรายการที่เลือก (8418625, 9833647, 9152619) ไม่ซ้ำกันเอง และไม่ซ้ำกับ Paper_I (9256703, 10635077, 9826168) และ Paper_II (9618897, 10645625, 11274671) ทั้งชื่อ ผู้แต่ง ปี งานประชุม DOI และ IEEE document number

ใช้รายการนี้ตรวจซ้ำอีกครั้งเมื่อทำ Paper_IV (ควรกันไฟล์ผู้สมัคร 9230400 ไว้ด้วยถ้าไม่ต้องการใช้ซ้ำ)

## การตรวจไฟล์

ค่าแฮชอยู่ใน `MANIFEST.sha256` ตรวจผ่านทั้งเก้าไฟล์ (Paper I, II, III) ด้วย `shasum -a 256 -c MANIFEST.sha256` เมื่อ 26 กันยายน 2026 และตรวจผ่านทั้งสิบไฟล์หลังเพิ่ม 9152619 และเปลี่ยนชื่อไฟล์ PESTO เมื่อ 27 กันยายน 2026
