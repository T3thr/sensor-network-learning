# บันทึกประวัติการสืบค้นบทความวิจัย (IEEE Xplore Search Log)
## Assignment Paper 3: 305432 เครือข่ายเซนเซอร์

วันที่สืบค้น: 26 กันยายน 2026 (Asia/Bangkok)

ฐานข้อมูล: IEEE Xplore เท่านั้น (ประเภทเอกสาร Conferences)

---

## 0. วิธีการสืบค้นและข้อจำกัดของวิธี

1. เปิด IEEE Xplore ผ่านเบราว์เซอร์ โดย **ไม่ล็อกอินและไม่ใช้สิทธิ์ UniNet ของมหาวิทยาลัยนเรศวร** เพื่อให้มั่นใจว่าไฟล์ที่เลือกดาวน์โหลดได้จริงโดยไม่ต้องพึ่งเครือข่ายมหาวิทยาลัย
2. ใช้คำค้นและตัวกรองแบบเดียวกับหน้า Search Results ของ IEEE Xplore (Content Type = Conferences, Sort = Most Cited By Papers) โดยเรียกบริการค้นหาชุดเดียวกับที่หน้าเว็บใช้แสดงผล เพื่ออ่านผลครั้งละ 100 รายการ ขั้นตอนนี้ไม่มีการดาวน์โหลดไฟล์
3. อ่านข้อมูลเมตา (ผู้แต่ง สังกัด งานประชุม วันที่ สถานที่ หน้า DOI) จากหน้า document ของ IEEE ทีละรายการ และตรวจว่า DOI ทั้งหมด redirect ไปยังหน้า IEEE Xplore ของบทความนั้นจริง
4. อ่านเนื้อหาฉบับเต็มผ่านมุมมอง HTML ของ IEEE สำหรับผู้สมัคร 6 เรื่อง (บทนำ วิธีการ การทดลอง ข้อจำกัด) และอ่าน PDF ฉบับเต็มเพื่อตรวจตัวเลข ตาราง และสมการของ 3 เรื่องที่เลือก
5. ตรวจสิทธิ์ PDF ของผู้สมัครทั้ง 6 เรื่องด้วยการขอไฟล์จาก `stampPDF/getPDF.jsp` ได้ HTTP 200, `application/pdf` และไฟล์ขึ้นต้นด้วย `%PDF` ทุกเรื่อง จากนั้นดาวน์โหลดจริงเฉพาะ 3 เรื่องที่เลือก (นิสิตยืนยันอนุญาตในแชตก่อนดาวน์โหลด) ในรอบที่ 3 (27 ก.ย. 2026) ตรวจผู้สมัครใหม่อีก 3 เรื่องด้วยวิธีเดียวกัน และดาวน์โหลดเพิ่มเฉพาะ 9152619 ซึ่งเป็น BACKUP 2 ใหม่ หลังนิสิตอนุญาตในแชตอีกครั้ง

ข้อจำกัด: จำนวนผลลัพธ์และยอด Cited by เป็นค่า ณ วันที่สืบค้น ไม่ใช่ค่าถาวร และการคัดกรองรอบที่ 2 ตรวจเฉพาะ 200 ถึง 300 รายการแรกที่มีการอ้างอิงสูงสุดของแต่ละคำค้น จึงไม่ใช่ Systematic Literature Review ที่ครอบคลุมทั้งสาขา

---

## 1. บันทึกประวัติการสืบค้น (Search History Table)

### รอบที่ 1: ตัวกรอง Open Access Only + Conferences (วิธีเดียวกับ Paper I)

| ลำดับที่ | วันที่สืบค้น | แนวทางวิจัย (Domain) | คำค้นหาหลัก (Query String) | จำนวนผลลัพธ์ที่พบ | ผลและการตัดสินใจ |
|:---:|:---:|---|---|:---:|---|
| 1 | 2026-09-26 | Domain 3: Edge AI | `"federated learning" AND "anomaly detection" AND "edge"` | 0 | ไม่มีผล |
| 2 | 2026-09-26 | Domain 3: Edge AI | `"federated learning" AND "anomaly detection"` | 2 | 11126136 (SOSE 2025, DevSecOps pipeline) และ 11120893 (CHASE 2025, scoping review) ไม่ตรงโจทย์หรือเป็น review |
| 3 | 2026-09-26 | Domain 3: Edge AI | `"federated learning" AND "IoT"` | 2 | 10556381 (SEAMS 2024, Raft + FL บน Raspberry Pi) และ 11120893 |
| 4 | 2026-09-26 | Domain 3: Edge AI | `"federated learning" AND "sensor"` | 0 | ไม่มีผล |
| 5 | 2026-09-26 | Domain 3: Edge AI | `"TinyML"` | 0 | ไม่มีผล |
| 6 | 2026-09-26 | Domain 3: Edge AI | `"anomaly detection" AND "wireless sensor network"` | 0 | ไม่มีผล |
| 7 | 2026-09-26 | Domain 3: Edge AI | `"edge" AND "anomaly detection" AND "IoT"` | 0 | ไม่มีผล |
| 8 | 2026-09-26 | Domain 1: Distributed Systems | `"Kafka"` | 1 | 11520501 (ISC 2026, metadata indexing ของ HPC file system) ไม่ตรงโจทย์ |
| 9 | 2026-09-26 | Domain 1: Distributed Systems | `"stream processing"` | 1 | 11520501 (รายการเดิม) |
| 10 | 2026-09-26 | Domain 1: Distributed Systems | `"consensus" AND "Raft"` | 1 | 10556381 (รายการเดิมจากลำดับ 3) |
| 11 | 2026-09-26 | Domain 1: Distributed Systems | `"microservices" AND "resilience"` | 1 | 10174151 (SEAMS 2023, CHESS) เป็น artifact paper ของเครื่องมือ chaos engineering |
| 12 | 2026-09-26 | Domain 2: Zero-Trust Security | `"zero trust"` | 1 | 11645170 (COMPSAC 2026, ZT-IoT project) เป็นรายงานโครงการ ยังไม่มีการอ้างอิง |
| 13 | 2026-09-26 | Domain 2: Zero-Trust Security | `"OAuth"`, `"OpenID Connect"`, `"service mesh"`, `"Keycloak"` | 0 ทุกคำ | ไม่มีผล |
| 14 | 2026-09-26 | ตรวจเทียบวิธี | `"Internet of Things"` | 43 | พบ 9256703 และ 9826168 ของ Paper I ยืนยันว่าตัวกรองทำงานเหมือนตอนค้น Paper I |

ข้อสรุปรอบที่ 1: Conference Paper แบบ Open Access ในสามโดเมนมีน้อยมาก และส่วนใหญ่เป็นงานใหม่ที่ยังมีการอ้างอิงน้อยหรือเป็น review จึงไม่พอสำหรับเลือกบทความหลักที่ต้องมีทั้งสมการและผลการทดลองเชิงปริมาณ

### รอบที่ 2: Conferences ทั้งหมด เรียงตาม Most Cited แล้วคัดเฉพาะรายการที่ IEEE ระบุว่าอ่านและดาวน์โหลดได้ฟรี

ข้อสังเกตที่พบระหว่างค้น: IEEE Xplore ระบุบทความของ IEEE Symposium on Security and Privacy (SP), IEEE European Symposium on Security and Privacy (EuroS&P), IEEE Computer Security Foundations Symposium (CSF) และ IEEE Security and Privacy Workshops (SPW) ว่าเป็นเอกสารฟรี (`isFreeDocument = true`) แม้ไม่ได้ติดป้าย Open Access จึงดาวน์โหลดฉบับเต็มได้โดยไม่ต้องล็อกอิน

| ลำดับที่ | วันที่สืบค้น | แนวทางวิจัย (Domain) | คำค้นหาหลัก (Query String) | Conferences ทั้งหมด | รายการฟรีที่พบในกลุ่มที่อ้างอิงสูงสุด (IEEE ID, งานประชุม, Cited by) |
|:---:|:---:|---|---|:---:|---|
| 15 | 2026-09-26 | Domain 2 | `"zero trust"` | 1,397 | 10646823 (SP 2024, 11) |
| 16 | 2026-09-26 | Domain 2 | `"OAuth"` | 276 | 6266164 (CSF 2012, 59), **7961984** (EuroS&P 2017, 43), **9230400** (EuroS&P 2020, 40), 8835218 (SP 2019, 30), 9230361 (EuroS&P 2020, 8) และรายการอื่นที่ไม่เกี่ยวข้อง |
| 17 | 2026-09-26 | Domain 2 | `"OpenID Connect"` | 86 | 8049720 (CSF 2017, 68), 7961984, 8835218, 9230361 |
| 18 | 2026-09-26 | Domain 2 | `"single sign-on"` | 515 | 6234424 (SP 2012, 133), 8049720, 6956594 (SP 2014, 50), 7961984, 9230400, 8835218, 9833753 (SP 2022, 21), 7163063 (SP 2015, 11), 10190538 (EuroS&P 2023, 9), 9230361 |
| 19 | 2026-09-26 | Domain 3 | `"federated learning"` | 21,943 | 8835245 (SP 2019, 1,406), 8835269 (SP 2019, 1,329), **9833647** (SP 2022, 259), 10190537 (EuroS&P 2023, 124), 10179336 (SP 2023, 123), 10179468 (SP 2023, 110), 10179400 (SP 2023, 101) และอีก 6 รายการ |
| 20 | 2026-09-26 | Domain 3 | `"federated learning" AND "anomaly detection"` | 2,631 | 10646664 (SP 2024, 38), 11126136 (SOSE 2025, 28) |
| 21 | 2026-09-26 | Domain 3 | `"anomaly detection" AND "IoT"` | 6,120 | **8424629** (SPW 2018, 683) |
| 22 | 2026-09-26 | Domain 3 | `"wireless sensor network"` | 22,172 | 7365929 (LCN Workshops 2015, 60), 7960032 (ICIS 2017, 57) |
| 23 | 2026-09-26 | Domain 3 | `"edge computing" AND "federated"` | 3,396 | 10179350 (SP 2023, 26) |
| 24 | 2026-09-26 | Domain 3 | `"TinyML" OR "tiny machine learning"` | 1,140 | 9367584 (GC Workshops 2020, 23) |
| 25 | 2026-09-26 | Domain 1 | `"Byzantine" AND "consensus"` | 1,725 | 9152792 (SP 2020, 156), **9519440** (SP 2021, 109), 9230373 (EuroS&P 2020, 40), 9833658 (SP 2022, 33), 9833617 (SP 2022, 15) |
| 26 | 2026-09-26 | Domain 1 | `"sharding" AND "blockchain"` | 431 | **8418625** (SP 2018, 1,078) |
| 27 | 2026-09-26 | Domain 1 | `"state machine replication"` | 183 | 9152792, 8049715 (CSF 2017, 51), 9833658, 9519415 (SP 2021, 13) |
| 28 | 2026-09-26 | Domain 1 | `"publish/subscribe" OR "message queue"` | 2,345 | 7743223 (EMSOFT 2016, 207) |
| 29 | 2026-09-26 | Domain 1 | `"stream processing"` | 4,312 | ไม่พบรายการฟรีในกลุ่มที่ตรวจ |
| 30 | 2026-09-26 | Domain 1 | `"microservices"` | 7,425 | ไม่พบรายการฟรีในกลุ่มที่ตรวจ |

รายการตัวหนาคือ 6 บทความที่นำเข้าตารางเปรียบเทียบ

ลิงก์หน้าผลค้นหาสำหรับตรวจซ้ำ (ผลลัพธ์อาจเปลี่ยนตามวันที่เปิด):
- [รอบที่ 1: "federated learning" AND "anomaly detection", Open Access, Conferences](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=%22federated%20learning%22%20AND%20%22anomaly%20detection%22&highlight=true&returnType=SEARCH&matchPubs=true&openAccess=true&returnFacets=ALL&refinements=ContentType%3AConferences&sortType=paper-citations)
- [รอบที่ 2: "sharding" AND "blockchain", Conferences, Most Cited](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=%22sharding%22%20AND%20%22blockchain%22&highlight=true&returnType=SEARCH&matchPubs=true&returnFacets=ALL&refinements=ContentType%3AConferences&sortType=paper-citations)
- [รอบที่ 2: "OAuth", Conferences, Most Cited](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=%22OAuth%22&highlight=true&returnType=SEARCH&matchPubs=true&returnFacets=ALL&refinements=ContentType%3AConferences&sortType=paper-citations)
- [รอบที่ 2: "federated learning", Conferences, Most Cited](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=%22federated%20learning%22&highlight=true&returnType=SEARCH&matchPubs=true&returnFacets=ALL&refinements=ContentType%3AConferences&sortType=paper-citations)

---

## 2. รายชื่อบทความผู้สมัครเบื้องต้น (Candidate Pool: 6 บทความ)

| หมายเลข | ชื่องานวิจัยภาษาอังกฤษ | ผู้แต่งหลัก / สถาบัน | งานประชุม IEEE (Venue & Year) | DOI / Document ID | สถานะการเข้าถึง PDF |
|:---:|---|---|---|:---:|:---:|
| 1 | OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding | Eleftherios Kokoris-Kogias และคณะ (EPFL, Switzerland; Trinity College, USA) | 2018 IEEE Symposium on Security and Privacy (SP) | 10.1109/SP.2018.000-5 / 8418625 | ฟรี, ดาวน์โหลดแล้ว 16 หน้า |
| 2 | Red Belly: A Secure, Fair and Scalable Open Blockchain | Tyler Crain, Christopher Natoli, Vincent Gramoli (University of Sydney; CSIRO) | 2021 IEEE Symposium on Security and Privacy (SP) | 10.1109/SP40001.2021.00087 / 9519440 | ฟรี, ตรวจแล้วเปิดได้ 18 หน้า |
| 3 | PESTO: Proactively Secure Distributed Single Sign-On, or How to Trust a Hacked Server | Carsten Baum และคณะ (Aarhus University; IBM Research Zurich; HPI Potsdam; VMware Research) | 2020 IEEE European Symposium on Security and Privacy (EuroS&P) | 10.1109/EuroSP48549.2020.00044 / 9230400 | ฟรี, ดาวน์โหลดแล้ว 20 หน้า |
| 4 | SoK: Single Sign-On Security – An Evaluation of OpenID Connect | Christian Mainka และคณะ (Ruhr University Bochum; ecsec GmbH) | 2017 IEEE European Symposium on Security and Privacy (EuroS&P) | 10.1109/EuroSP.2017.32 / 7961984 | ฟรี, ตรวจแล้วเปิดได้ 16 หน้า |
| 5 | Back to the Drawing Board: A Critical Evaluation of Poisoning Attacks on Production Federated Learning | Virat Shejwalkar, Amir Houmansadr (UMass Amherst); Peter Kairouz, Daniel Ramage (Google Research) | 2022 IEEE Symposium on Security and Privacy (SP) | 10.1109/SP46214.2022.9833647 / 9833647 | ฟรี, ดาวน์โหลดแล้ว 18 หน้า |
| 6 | Machine Learning DDoS Detection for Consumer Internet of Things Devices | Rohan Doshi, Noah Apthorpe, Nick Feamster (Princeton University) | 2018 IEEE Security and Privacy Workshops (SPW) | 10.1109/SPW.2018.00013 / 8424629 | ฟรี, ตรวจแล้วเปิดได้ 7 หน้า |

หมายเหตุ: ชื่อบทความที่ 4 ใน IEEE Xplore ใช้เครื่องหมายขีดยาวคั่นระหว่าง "Security" กับ "An Evaluation" เอกสารนี้แทนด้วยขีดสั้น (–) ตามกฎการจัดพิมพ์ของชุดงาน ไม่ได้เปลี่ยนเนื้อหาชื่อเรื่อง

ตรวจความไม่ซ้ำ: ทั้ง 6 IEEE ID ไม่ซ้ำกับ Paper I (9256703, 10635077, 9826168) และ Paper II (9618897, 10645625, 11274671)

หมายเหตุ 27 กันยายน 2026: ตารางนี้เป็นชุดผู้สมัครจากรอบที่ 1 และ 2 หลังการค้นรอบที่ 3 ชุด 6 เรื่องที่ใช้เปรียบเทียบใน `04_candidate_comparison.md` เปลี่ยนเป็น 8418625, 9519440, 9230400, 9152619, 9833647 และ 8418651 (ดูหัวข้อ 5.3) ผู้สมัครใหม่ 9152619, 8418651 และ 7958578 ไม่ซ้ำกับ Paper I และ Paper II เช่นกัน

---

## 3. Lead ที่พบแต่ไม่นำเข้ารอบเปรียบเทียบ

| IEEE ID | บทความ / งานประชุม | เหตุผลที่ไม่นำเข้า |
|---|---|---|
| 8884802 | DÏoT: A Federated Self-learning Anomaly Detection System for IoT (ICDCS 2019, Cited by 603) | ตรง Domain 3 มากที่สุด แต่สถานะ locked ดาวน์โหลดไม่ได้โดยไม่มีสิทธิ์สมาชิก และหัวข้อ IoT anomaly detection ซ้อนกับ Paper I (IoT-CAD) |
| 9252066 | End-to-End Evaluation of Federated Learning and Split Learning for Internet of Things (SRDS 2020) | สถานะ locked |
| 10556381 | Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning (SEAMS 2024, Open Access, Cited by 8) | เป็นตัวเลือก Open Access ที่เชื่อม Consensus กับ FL บนอุปกรณ์ปลายทางได้ดีที่สุด (Raspberry Pi 3 จำนวน 11 บอร์ด, วัดเวลาเลือกผู้นำใหม่ได้ภายใน 4 วินาทีเมื่อมีโหนดไม่เกิน 10 โหนด) แต่เป็น proof of concept ขนาดเล็ก ใช้ Raft เดิมกับ Flower โดยไม่มีอัลกอริทึมหรือสมการใหม่ เก็บไว้เป็นตัวเลือกหากอาจารย์ต้องการงานที่มีฮาร์ดแวร์ปลายทางชัดเจน |
| 10174151 | CHESS: A Framework for Evaluation of Self-Adaptive Systems Based on Chaos Engineering (SEAMS 2023, Open Access) | เป็น artifact paper ของเครื่องมือ ไม่มีการทดลองเปรียบเทียบเชิงปริมาณ |
| 8835245, 8835269 | Membership/feature inference attacks ต่อ FL (SP 2019, อ้างอิงมากกว่า 1,300 ครั้ง) | ผลกระทบสูงมาก แต่เนื้อหาเน้นภายในโมเดล deep learning ห่างจากทักษะระบบของนิสิต |
| 10179336 | FedRecover (SP 2023) | คณิตศาสตร์หนัก (การประมาณ Hessian ด้วย L-BFGS) และแคบกว่า 9833647 ในโดเมนเดียวกัน |
| 9152792 | Sync HotStuff (SP 2020) | เน้นทฤษฎี synchronous BFT; ใน Domain 1 เลือก OmniLedger และ Red Belly ที่มีการทดลองขนาดใหญ่กว่า |
| 8835218, 8049720 | Formal security analysis ของ OpenID FAPI (SP 2019) และ OpenID Connect (CSF 2017) | เป็น formal analysis ไม่มีผลการทดลองเชิงปริมาณตามเกณฑ์บทความหลัก |
| 9833753 | Towards Automated Auditing for Account and Session Management Flaws in Single Sign-On Deployments (SP 2022) | ไม่ได้อ่านฉบับเต็มในรอบนี้ เก็บเป็น related work ของ Domain 2 |
| 6234424 | Signing Me onto Your Accounts through Facebook and Google (SP 2012) | งานคลาสสิก แต่ศึกษาระบบ SSO ยุคปี 2012 ที่เปลี่ยนไปมากแล้ว |
| 10646823 | P4Control (SP 2024) | ผูกกับ programmable switch และ eBPF ห่างจากประสบการณ์ของนิสิต |
| 7743223 | Exploring the performance of ROS2 (EMSOFT 2016) | เป็นการวัดประสิทธิภาพ DDS ของ ROS2 โดยเฉพาะ และเป็นงานปี 2016 |

---

## 4. การดาวน์โหลดและตรวจไฟล์

ดาวน์โหลดเมื่อ 26 กันยายน 2026 เวลาประมาณ 11:02 น. (04:02 UTC) จาก `https://ieeexplore.ieee.org/stampPDF/getPDF.jsp?tp=&arnumber=<ID>` ทีละไฟล์ ไม่ได้ใช้ crawler

ทุกไฟล์มีแถบท้ายหน้า `Authorized licensed use limited to: IEEE Xplore. Downloaded on September 26,2026 ... from IEEE Xplore.` ซึ่งหมายถึงการเข้าถึงแบบฟรีของ IEEE เอง ไม่ใช่สิทธิ์ของมหาวิทยาลัย

| ไฟล์ | ขนาด (ไบต์) | หน้า | SHA-256 |
|---|---:|:---:|---|
| `work3/01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf` (สำเนาเดียวกันใน `sensor-network/raw/`) | 1,772,141 | 16 | `bbfd73b28036343db48d97b4d7456c886193afd5640dd6458902248e7fb08b32` |
| `sensor-network/raw/Paper_III_2_BACKUP1_FL-Poisoning_9833647.pdf` | 1,177,683 | 18 | `ff37454b61920276844c796230be90c001fd39ba7e1c29ed8b00ecbb30432a40` |
| `sensor-network/raw/Paper_III_3_BACKUP2_PESTO_9230400.pdf` (เปลี่ยนชื่อเป็น `Paper_III_CANDIDATE_PESTO_9230400.pdf` เมื่อ 27 ก.ย. 2026) | 483,095 | 20 | `cef83833273cda033a535462a8e30a6edf2bddb6acaf1ff46b7cec1f6c58e97b` |

เพิ่มค่าแฮชทั้งสามลงใน `sensor-network/raw/MANIFEST.sha256` แล้ว และ `shasum -a 256 -c MANIFEST.sha256` ผ่านครบทั้ง 9 ไฟล์ (Paper I, II, III)

ดาวน์โหลดเพิ่มเมื่อ 27 กันยายน 2026 เวลาประมาณ 02:36 น. (19:36 UTC ของวันที่ 26) หลังนิสิตอนุญาตในแชต ด้วยวิธีเดิม:

| ไฟล์ | ขนาด (ไบต์) | หน้า | SHA-256 |
|---|---:|:---:|---|
| `sensor-network/raw/Paper_III_3_BACKUP2_BurglarsIoT_9152619.pdf` | 10,444,991 | 17 | `a1d88009295c108d51b101b3f37c33542ba1943522b1aeff69fa377eab967c85` |

PDF นี้แทบไม่มีชั้นข้อความ (pdftotext ได้เพียงแถบท้ายหน้า) เพราะข้อความถูกวาดเป็นเส้น ตรวจความครบถ้วนโดยเรนเดอร์ทั้ง 17 หน้าแล้วพบเนื้อหาครบทุกหน้า ตัวเลขใน Table I และ Table II อ่านจากภาพหน้ากระดาษความละเอียด 400 dpi

`MANIFEST.sha256` ปรับชื่อไฟล์ของ PESTO ตามชื่อใหม่ (ค่าแฮชเดิม) และเพิ่มไฟล์ใหม่ `shasum -a 256 -c MANIFEST.sha256` ผ่านครบทั้ง 10 ไฟล์เมื่อ 27 กันยายน 2026

ข้อมูลเมตาแบบเครื่องอ่านได้อยู่ที่ `evidence/verified_metadata.json`

---

## 5. รอบที่ 3: ตรวจซ้ำเชิงลึก (27 กันยายน 2026)

เหตุผลที่ค้นเพิ่ม: รอบที่ 2 ใช้คำค้นแคบ (เช่น `"anomaly detection" AND "IoT"`) และตรวจเฉพาะ 200 ถึง 300 รายการแรกของแต่ละคำค้น จึงอาจพลาดบทความฟรีด้าน sensor และ IoT ที่ใช้คำอื่น รอบนี้แยกเป็นสองส่วน วิธีเข้าถึงเหมือนเดิม (ไม่ล็อกอิน ไม่ดาวน์โหลดไฟล์ระหว่างค้น)

### 5.1 ตัวกรอง Open Access + Conferences ด้วยคำค้นกว้าง

| ลำดับที่ | คำค้นหาหลัก (Query String) | จำนวนผลลัพธ์ | รายการที่น่าสนใจ (IEEE ID, งานประชุม, Cited by) |
|:---:|---|:---:|---|
| 31 | `"microservices"` | 27 | 10556461 (AST 2024, 4), 10298503 (ASE 2023, 4) ส่วนใหญ่เป็นงาน software engineering ที่อ้างอิงน้อย |
| 32 | `"event-driven"` | 2 | ไม่เกี่ยวข้อง |
| 33 | `"message broker" OR "message queue" OR "publish/subscribe"` | 0 | ไม่มีผล |
| 34 | `"distributed transaction" OR "two-phase commit" OR "saga pattern"` | 0 | ไม่มีผล |
| 35 | `"consensus"` | 14 | ส่วนใหญ่ใช้คำนี้ในความหมายอื่น (EMBC) มี 10556381 รายการเดิม |
| 36 | `"Byzantine"` | 1 | 11645392 (COMPSAC 2026, 0) |
| 37 | `"blockchain" AND "sharding"` | 0 | ไม่มีผล |
| 38 | `"authentication" AND "microservices"` | 1 | 10298503 (รายการเดิม) |
| 39 | `"JSON Web Token" OR "JWT"` | 0 | ไม่มีผล |
| 40 | `"identity management"` | 4 | 9794078 (ICSE 2022, 5) เรื่อง access control policy |
| 41 | `"access control" AND "cloud"` | 4 | ไม่เกี่ยวข้อง |
| 42 | `"federated learning"` | 13 | 10136141 (SaTML 2023, 9) และรายการเดิม |
| 43 | `"anomaly detection"` | 33 | 10548351 MetaLog (ICSE 2024, 26) เป็นการตรวจ log ของซอฟต์แวร์ ไม่ใช่ข้อมูลเซนเซอร์ |
| 44 | `"sensor network" OR "sensor networks"` | 17 | มี 9256703 ของ Paper I และงาน WSN ของ CACRE 2024 ที่อ้างอิง 3 ถึง 4 ครั้ง |
| 45 | `"edge computing"` | 13 | 11645209 SINETStream บน MicroPython (COMPSAC 2026, 0) |
| 46 | `"Golang" OR "Go programming language" OR "Go language"` | 2 | ไม่มีงานด้าน concurrency ของ Go |
| 47 | `"concurrency bug" OR "concurrency bugs"` | 1 | 10549700 (ICSE 2024, 1) |
| 48 | `"stream processing" OR "streaming"` | 13 | 9796428 UDAVA (CAIN 2022, 5) ตรวจความถูกต้องข้อมูลเซนเซอร์ในโรงงาน |

ข้อสรุป 5.1: กลุ่ม Open Access ยังเล็กมาก (มากที่สุด 33 รายการต่อคำค้น) ไม่พบรายการที่ดีกว่าบทความที่เลือก

### 5.2 สแกนเชิงลึกเฉพาะกลุ่มงานประชุมที่ดาวน์โหลดฟรี

รูปแบบคำค้น: `("Publication Title":"Security and Privacy") AND (<คำค้น>)` ประเภท Conferences เรียงตาม Most Cited ตรวจสูงสุด 300 รายการ นับเฉพาะรายการที่ไม่ locked และไม่ใช่หน้าปกหรือสารบัญ

| ลำดับที่ | กลุ่มคำค้น | ทั้งหมด | ฟรี | รายการที่น่าสนใจ (IEEE ID, งานประชุม, Cited by) |
|:---:|---|:---:|:---:|---|
| 49 | `"sensor"` | 415 | 77 (จาก 300) | 6547107 Ghost Talk (SP 2013, 227), 7961948 WALNUT (EuroS&P 2017, 224), 9519442 Camera and LiDAR fusion (SP 2021, 217), 8418629 Learning from Mutants (SP 2018, 119), **8418651 Crowd-GPS-Sec** (SP 2018, 111), 8418641 Perceptio (SP 2018, 91) |
| 50 | `"Internet of Things" OR "IoT"` | 631 | 105 (จาก 300) | **7958578 IoT Goes Nuclear** (SP 2017, 334), 8835392 SoK Home IoT (SP 2019, 327), 9230403 IoTFinder (EuroS&P 2020, 100), **9152619 Burglars' IoT Paradise** (SP 2020, 75) |
| 51 | `"edge computing" OR "edge devices"` | 122 | 10 | 9581273 Sponge Examples (EuroS&P 2021, 91), 10179382 ShadowNet (SP 2023, 51) |
| 52 | `"federated learning" AND ("IoT" OR "edge" OR "mobile" OR "devices")` | 64 | 9 | 10190537, 10179336, 10179401, 8844592, 10188630 (ส่วนใหญ่อยู่ในรอบที่ 2 แล้ว) |
| 53 | `"TinyML" OR "microcontroller" OR "embedded"` | 289 | 82 | ส่วนใหญ่เป็น firmware security เช่น 9152796 Karonte (SP 2020, 127) |
| 54 | `"stream processing" OR "Kafka" OR "publish/subscribe"` | 16 | 1 | 9230389 AVGuardian (EuroS&P 2020, 16) เรื่องสิทธิ์เกินจำเป็นใน publish-subscribe ของรถยนต์ไร้คนขับ |
| 55 | `"microservice" OR "microservices" OR "Kubernetes" OR "container"` | 90 | 15 | 10646668 SoK Docker (SP 2024, 23), 10579536 WENDIGO: GraphQL DoS (SPW 2024, 6), 10646601 (SP 2024, 5) |
| 56 | `"OAuth" OR "OpenID" OR "single sign-on" OR "identity provider"` | 44 | 9 | ชุดเดียวกับรอบที่ 2 |
| 57 | `"zero trust" OR "zero-trust"` | 21 | 1 | 10646823 (รายการเดิม) |
| 58 | `"consensus" AND "throughput"` | 26 | 8 | 8806762 Ekiden (EuroS&P 2019, 319), 9152798 OHIE (SP 2020, 132) และรายการเดิม |

### 5.3 ผู้สมัครใหม่ที่อ่านฉบับเต็มและให้คะแนนด้วยเกณฑ์เดิม

ทั้งสามเรื่องเป็น IEEE Conference Publication ที่ดาวน์โหลดฟรี (ตรวจแล้วได้ HTTP 200, `application/pdf` และหัวไฟล์ `%PDF` แต่ยังไม่ได้บันทึกไฟล์)

| IEEE ID | บทความ | งานประชุม / หน้า / DOI | ขนาด PDF | คะแนน (5 เกณฑ์) | ข้อสังเกตหลัก |
|---|---|---|---:|:---:|---|
| 9152619 | Burglars' IoT Paradise: Understanding and Mitigating Security Risks of General Messaging Protocols on IoT Clouds | SP 2020 / 465-481 / 10.1109/SP40000.2020.00051 | 10,444,991 ไบต์ | 5, 3, 4, 4, 5 = **21** | ตรงทั้งสามโดเมน: MQTT แบบ publish-subscribe (ใกล้ Kafka), identity, session และ authorization (ใกล้ Keycloak) บน IoT cloud 8 ราย โจมตีสำเร็จอย่างน้อยหนึ่งประเภทใน 7 ราย (Table I หน้า 475); เสนอแบบจำลอง MOUCON และทดสอบบน Mosquitto ที่ 1,000 ถึง 8,000 client (delay เพิ่มไม่เกิน 0.63% ตาม Table II หน้า 478 ส่วนร้อยละของ memory และ CPU บางช่องไม่ตรงกับค่าดิบ ดู `04` หัวข้อ 4); ผลการวัดแต่ละแพลตฟอร์มเป็นแบบสำเร็จหรือไม่สำเร็จ และคณิตศาสตร์เป็นแบบจำลองเชิงเซตมากกว่าสมการ |
| 8418651 | Crowd-GPS-Sec: Leveraging Crowdsourcing to Detect and Localize GPS Spoofing Attacks | SP 2018 / 1018-1031 / 10.1109/SP.2018.00012 | 843,446 ไบต์ | 5, 5, 4, 4, 3 = **21** | เครือข่ายเซนเซอร์ภาคพื้นดิน OpenSky มากกว่า 700 จุด รับข้อความสูงสุด 200,000 ข้อความต่อวินาที; สมการ 13 สมการ (TDoA, multilateration, การหาตำแหน่งผู้ปลอมสัญญาณ); ตรวจจับได้ในเวลาน้อยกว่า 2 วินาทีบนข้อมูลจริง 1 ชั่วโมง (141,693 ตำแหน่ง 142 ลำ) แต่ประมาณ 27% ของเครื่องบินในชุดข้อมูลไม่ถูกครอบคลุมโดย test ใดเลย (ผู้ประเมินคำนวณจาก 100 − 61.2 − 2.9 − 8.9) และการหาตำแหน่ง 150 เมตรมาจาก simulation ใน MATLAB |
| 7958578 | IoT Goes Nuclear: Creating a ZigBee Chain Reaction | SP 2017 / 195-212 / 10.1109/SP.2017.14 | 1,743,725 ไบต์ | 5, 4, 4, 5, 2 = **20** | ตรงวิชาเครือข่ายเซนเซอร์มาก (ZigBee บน IEEE 802.15.4); ใช้ percolation theory ประมาณว่าหลอด Philips Hue ประมาณ 15,000 ดวงในปารีสพอให้ worm แพร่ทั้งเมือง; ยึดหลอดจากระยะ 50 เมตรและสั่ง factory reset ได้ไกลกว่า 150 เมตร; ใช้ correlation power analysis หา key ของ firmware update; ห่างจากทักษะของนิสิตเพราะเน้นฮาร์ดแวร์และ side-channel; ข้อมูลเมตาของ IEEE ระบุสังกัดของ Adi Shamir และ Colin O'Flynn ในลักษณะที่น่าจะสลับกัน ต้องตรวจกับหน้าแรกของ PDF ถ้าเลือกใช้ |

รายการอื่นที่พบแต่ไม่ได้อ่านเต็ม: 8418641 Perceptio (การจับคู่อุปกรณ์ IoT จากเหตุการณ์ที่เซนเซอร์หลายชนิดรับรู้ร่วมกัน), 8418629 Learning from Mutants (anomaly detection บน testbed ระบบบำบัดน้ำ), 9152798 OHIE (blockchain scaling อีกแนวทาง), 10579536 WENDIGO (GraphQL ตรงงานนิสิตแต่อ้างอิง 6 ครั้งและเป็น workshop)

ข้อสรุป 5.3: OmniLedger ยังได้คะแนนรวมสูงสุด (24) ตามเกณฑ์ 5 ข้อที่กำหนด ผู้สมัครใหม่ทั้งสามได้ 20 ถึง 21 คะแนนแต่ตรงวิชาเครือข่ายเซนเซอร์มากกว่า นิสิตยืนยันให้คง PRIMARY และ BACKUP 1 และเปลี่ยน BACKUP 2 จาก PESTO เป็น Burglars' IoT Paradise (รายละเอียดใน `09_final_decision.md`) ตาราง 6 เรื่องใน `04_candidate_comparison.md` ปรับเป็น OmniLedger, Red Belly, PESTO, Burglars' IoT Paradise, Back to the Drawing Board และ Crowd-GPS-Sec ส่วน SoK OIDC, IoT DDoS และ IoT Goes Nuclear ย้ายไปหัวข้อผู้สมัครที่ประเมินแล้ว

---

## 6. บันทึกการตรวจทานข้อเท็จจริง (27 กันยายน 2026)

ตรวจข้อความในเอกสารชุดนี้เทียบกับ PDF อีกครั้ง โดยใช้ภาพหน้ากระดาษที่เรนเดอร์จาก PDF สำหรับสมการ และพบจุดที่ต้องแก้ดังนี้

| จุดที่ตรวจ | ผล | การแก้ไข |
|---|---|---|
| ตำแหน่ง Appendix C ของ OmniLedger | อยู่หน้า 597 ไม่ใช่ 598 (หน้า 598 เป็นท้าย Appendix D) | แก้ใน `04` และ `09` แล้ว |
| ตำแหน่ง Table 1 ของ PESTO | อยู่หน้า 600 ไม่ใช่ 599 | แก้ใน `04` แล้ว |
| ช่วงเวลายืนยันชั้นที่สองใน Table I ของ OmniLedger | ค่าที่ [4, 1%] คือ 1.38 s จึงไม่ใช่ช่วง 41.84 ถึง 62.96 s ทั้งหมด | แก้ใน `09` แล้ว |
| รูปแบบ Eq. (3) ที่พิมพ์จริง | ตรวจจากภาพหน้า 597 แล้ว สัมประสิทธิ์พิมพ์เป็น (m − k)/m จริง และตัวเลข 3.7% กับ 1.56 พิมพ์ตามที่อ้าง | ข้อวิจารณ์เดิมยังถูกต้อง |
| สังกัดผู้แต่ง OmniLedger | หน้าแรกของ PDF ระบุ EPFL และ Trinity College, USA (Ewa Syta) | ตรงกับเอกสารชุดนี้ |
