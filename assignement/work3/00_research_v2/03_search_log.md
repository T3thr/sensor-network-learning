# บันทึกการสืบค้นบทความวิจัย IEEE Xplore (Version 2 / ปี 2024+)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร

เอกสารฉบับนี้บันทึกคำค้น ตัวกรอง จำนวนผลลัพธ์ และเหตุผลการคัดกรองทุกขั้น ตั้งแต่การสแกนฐานข้อมูลจนได้ผู้สมัคร 6 บทความสำหรับ Assignment Paper 3 Version 2 (Paper 3-2)

---

## 1. ข้อมูลการสืบค้น (Search Metadata)

- **วันที่ดำเนินการ:** 27 กันยายน 2026 (Asia/Bangkok)
- **ฐานข้อมูล:** IEEE Xplore Digital Library เท่านั้น
- **สิทธิ์การเข้าถึง:** เปิด IEEE Xplore ผ่านเบราว์เซอร์ **โดยไม่ล็อกอินและไม่ผ่านเครือข่าย UniNet** (ทุกผลลัพธ์ที่ไม่ใช่เอกสารฟรีแสดงสถานะ `locked`) จึงคัดเฉพาะบทความที่ดาวน์โหลดฉบับเต็มได้จริงโดยไม่ต้องพึ่งสิทธิ์มหาวิทยาลัย เหมือนวิธีของ Version 1
- **ตัวกรองที่บังคับใช้ทุกคำค้น:**
  - Content Type: `Conferences`
  - Year Range: `2024 - 2026` (พารามิเตอร์ `ranges: 2024_2026_Year`)
  - Sort: `Most Cited By Papers`
- **ทางเข้าข้อมูล:** เรียกบริการค้นหาชุดเดียวกับที่หน้า Search Results ของ IEEE Xplore ใช้ (`/rest/search`) ครั้งละ 100 รายการ และบันทึกสถานะการเข้าถึง (`accessType`) ของทุกรายการ ขั้นตอนนี้ไม่มีการดาวน์โหลดไฟล์

---

## 2. วิธีการสืบค้น 4 รอบ

1. **รอบที่ 1 (Broad scan):** ค้นด้วยคำกว้างตาม 3 Research Tracks อ่านผล 500 รายการแรกที่มีการอ้างอิงสูงสุดต่อคำค้น แล้วนับรายการที่ไม่ใช่ `locked`
2. **รอบที่ 2 (Open Access filter):** เปิดตัวกรอง Open Access Only แล้วอ่านผลทั้งหมด
3. **รอบที่ 3 (Free venue scan):** สแกนงานประชุมที่ IEEE ระบุว่าเป็นเอกสารฟรี (`isFreeDocument = true`, accessType `promotional`) คือ IEEE Symposium on Security and Privacy (SP) และ IEEE Security and Privacy Workshops (SPW) ด้วยคำค้น `("Publication Title":"Security and Privacy") AND (<terms>)`
4. **รอบที่ 4 (Full-text screening):** อ่านเนื้อหาฉบับเต็มผ่านมุมมอง HTML ของ IEEE สำหรับรายการที่ผ่านการคัดกรองจากบทคัดย่อ 9 รายการ ตรวจสิทธิ์ PDF ของผู้สมัคร 6 รายการ (HTTP 200, `application/pdf`, ขึ้นต้นด้วย `%PDF`) และดาวน์โหลดจริงเฉพาะ 3 รายการที่เลือก หลังนิสิตอนุญาตในแชต

---

## 3. ประวัติการค้นหาและผลลัพธ์ (Search History Table)

### รอบที่ 1: Conferences 2024-2026 เรียงตามการอ้างอิง อ่าน 500 รายการแรกต่อคำค้น

| ลำดับ | Track | คำค้นหา (Query String) | Conferences ทั้งหมด | รายการที่ไม่ locked ใน 500 อันดับแรก |
| :---: | :--- | :--- | :---: | :--- |
| 1 | Track 1 | `"sensor network" AND "anomaly detection"` | 177 | 0 |
| 2 | Track 1 | `"sensor network" OR "sensor networks"` | 14,406 | 0 |
| 3 | Track 1 | `"TinyML" OR "tiny machine learning"` | 855 | 0 |
| 4 | Track 1 | `"edge AI" AND ("sensor" OR "IoT")` | 970 | 0 |
| 5 | Track 3 | `"federated learning" AND ("sensor" OR "IoT" OR "edge")` | 6,510 | 2: 10554775 (ICSE 2024 companion track, green architectural tactics), **10556381** (SEAMS 2024, Raft + FL) |
| 6 | Track 2 | `"stream processing" OR "streaming"` | 9,476 | 3: 10646789 (SP 2024, DPI), 10646740 (SP 2024), 10646802 (SP 2024) |
| 7 | Track 2 | `"Kafka" OR "MQTT" OR "publish/subscribe"` | 2,029 | 1: 10646678 (SP 2024, MQTTactic) |

ข้อสรุปรอบที่ 1: บทความ Conference ปี 2024-2026 ในสาย Sensor Network, TinyML และ Edge AI ที่มีการอ้างอิงสูงเกือบทั้งหมดต้องใช้สิทธิ์สมาชิก (0 จาก 2,000 รายการแรกของ 4 คำค้น Track 1)

### รอบที่ 2: ตัวกรอง Open Access Only + Conferences 2024-2026

| ลำดับ | Track | คำค้นหา | จำนวนผลลัพธ์ | รายการที่เกี่ยวข้องกับโจทย์ |
| :---: | :--- | :--- | :---: | :--- |
| 8 | Track 1 | `"sensor network" OR "sensor networks"` | 12 | ส่วนใหญ่เป็น PSO/Grey Wolf routing (ICACR 2024) และงาน EMBC ด้านการแพทย์ มี 10635077 (MCSOA) ซึ่งเป็น BACKUP ของ Paper I แล้ว |
| 9 | Track 1 | `"TinyML" OR "microcontroller" OR "quantization"` | 9 | 11645209 (COMPSAC 2026, SINETStream บน MicroPython) |
| 10 | Track 1 | `"anomaly detection"` | 21 | ส่วนใหญ่เป็น log anomaly detection ใน ICSE 2024, มี 10554862 (ICSE-Companion 2024, DronLomaly) |
| 11 | Track 1/3 | `"edge computing" OR "edge intelligence" OR "edge AI"` | 7 | 11662461 (EDGE 2026, Lang2Graph), 11645209 |
| 12 | Track 2 | `"stream processing" OR "event-driven" OR "message broker" OR "Kafka" OR "MQTT"` | 3 | 11645209, 11520501 (ISC 2026, HPC metadata indexing), 11126131 (review) |
| 13 | Track 2 | `"consensus" OR "Raft" OR "fault tolerance"` | 13 | **10556381** (SEAMS 2024) |
| 14 | Track 3 | `"federated learning"` | 8 | 10556381, 11121099 (CHASE 2025, MedLeak), 11252903 (EMBC 2025) และ review |
| 15 | ทุก Track | `"Internet of Things" OR "IoT"` | 20 | 10556381, 11645209, 11126665 (COMPSAC 2025, compute continuum), 11645170 (ZT-IoT project report) |
| 16 | ทุก Track | `"wireless sensor" OR "sensor data" OR "LoRa"` | 21 | 10556305 (SEAMS 2024, GreenhouseDT exemplar) และรายการซ้ำกับลำดับ 8 |

### รอบที่ 3: งานประชุมที่ IEEE เปิดให้อ่านฟรี (SP และ SPW) ปี 2024-2026

| ลำดับ | คำค้นหา (ภายใต้ `"Publication Title":"Security and Privacy"`) | ผลลัพธ์ทั้งหมด | รายการฟรีที่เกี่ยวข้อง (IEEE ID, งานประชุม, Cited by) |
| :---: | :--- | :---: | :--- |
| 17 | `"sensor" OR "sensors" OR "sensing"` | 106 | **10579527** (SPW 2024, PrivacyOracle, 8), **10579519** (SPW 2024, SideGuard, 3), 10646878 (SP 2024, MIMOCrypt, 27), 10646778 (SP 2024, physical sensor attack hardness, 21) |
| 18 | `"IoT" OR "Internet of Things" OR "smart home"` | 187 | 10646659 (SP 2024, LLMIF, 64), 10646678 (SP 2024, MQTTactic, 21), 10646830 (SP 2024, SHERPA, 18), 10579519 |
| 19 | `"federated learning"` | 118 | 10646724 (SP 2024, Loki, 50), 10646613 (SP 2024, FLShield, 32), 10646830 (SHERPA, 18), **10579526** (SPW 2024, Confidential FL, 1) |
| 20 | `"edge" OR "embedded" OR "microcontroller"` | 212 | 10646720 (SP 2024, GNN control-flow attestation, 8), 10579519 |
| 21 | `"stream" OR "streaming" OR "MQTT" OR "Kafka"` | 61 | 10646673 (SP 2024, Kairos, 128), 10646678, 10646789 (DPI, 9), 10579529 (SPW 2024, data stream security, 1) |

ข้อสังเกต: รายการฟรีจาก SP/SPW ที่พบในรอบนี้เป็นปี 2024 ทั้งหมด

### รอบที่ 4: คัดกรองจากบทคัดย่อและอ่านฉบับเต็ม

อ่านบทคัดย่อของรายการฟรีทั้งหมดที่เกี่ยวข้องจากรอบที่ 1 ถึง 3 แล้วตัดออกด้วยเหตุผลต่อไปนี้ก่อนอ่านฉบับเต็ม

| IEEE ID | ชื่อย่อ (งานประชุม) | เหตุผลที่ตัดออกก่อนอ่านฉบับเต็ม |
| :--- | :--- | :--- |
| 10646678 | MQTTactic (SP 2024, 19 หน้า) | ตรงกับ MQTT แต่แกนหลักเป็น formal verification ของ logic flaws ใน broker ต้องอธิบาย model checking เกิน 45 วินาที |
| 10646789 | DPI (SP 2024, 19 หน้า) | Differential Privacy สำหรับ infinite streams มีการพิสูจน์ทางคณิตศาสตร์หนาแน่น ขัดกับเหตุผลที่ยุติ Version 1 |
| 10646613, 10646724, 10646830 | FLShield, Loki, SHERPA (SP 2024, 19 หน้า) | เป็นงาน attack/defense ของ FL ระดับทฤษฎี ความยาวและจำนวนการทดลองเกินกรอบ 5 นาที และซ้อนกับหัวข้อ FL Poisoning ของ Version 1 |
| 10646878, 10646778 | MIMOCrypt, Sensor attack hardness (SP 2024) | เป็นงาน physical layer และ signal processing เชิงลึก ห่างจากความถนัดของนิสิต |
| 11662461 | Lang2Graph (EDGE 2026) | LLM สร้าง indoor topology graph จากคำสั่งภาษาธรรมชาติ ไม่ได้ประมวลผลข้อมูลเซนเซอร์โดยตรง |
| 11126665 | Compute continuum scheduling (COMPSAC 2025) | MILP scheduling ของ workflow บน HPC ไม่มีโหนดเซนเซอร์ในการทดลอง |
| 10556305 | GreenhouseDT (SEAMS 2024) | เป็น exemplar artifact สำหรับ digital twin ไม่มีการทดลองเปรียบเทียบ |

รายการที่อ่านฉบับเต็มผ่านมุมมอง HTML ของ IEEE (9 รายการ): 10556381, 11645209, 10579527, 10579526, 10579519, 10554862, 11662461, 11126665 และ 10556305 (บทคัดย่อและโครงสร้างบท) จากนั้นเลือก 6 รายการเข้า Candidate Pool

---

## 4. รายการบทความที่ผ่านการคัดกรองเบื้องต้นเข้าสู่ Candidate Pool (6 บทความ)

| รหัส | IEEE ID | ชื่อบทความ | งานประชุม (ปี) | Track | การเข้าถึง PDF (ตรวจ 27 ก.ย. 2026) |
| :---: | :--- | :--- | :--- | :--- | :--- |
| C1 | 10556381 | Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning | SEAMS 2024 | Track 2 + Track 3 | Open Access (CC BY 4.0), HTTP 200 `%PDF` |
| C2 | 10579526 | A Performance Analysis for Confidential Federated Learning | SPW 2024 | Track 3 | Free document, HTTP 200 `%PDF` |
| C3 | 10579519 | SideGuard: Non-Invasive On-Chip Malware Detection in Heterogeneous IoT Systems by Leveraging Side-Channels | SPW 2024 | Track 1 | Free document, HTTP 200 `%PDF` |
| C4 | 10579527 | PrivacyOracle: Configuring Sensor Privacy Firewalls with Large Language Models in Smart Built Environments | SPW 2024 | Track 3 | Free document, HTTP 200 `%PDF` |
| C5 | 11645209 | A Prototype Implementation of SINETStream for Resource-Constrained MicroPython Environments | COMPSAC 2026 | Track 2 | Open Access, HTTP 200 `%PDF` |
| C6 | 10554862 | DronLomaly: Runtime Log-Based Anomaly Detector for DJI Drones | ICSE-Companion 2024 | Track 1 | Open Access, HTTP 200 `%PDF` |

รายละเอียดการเปรียบเทียบอยู่ใน [04_candidate_comparison.md](04_candidate_comparison.md)

---

## 5. การดาวน์โหลดไฟล์ (หลังได้รับอนุญาตในแชต 27 ก.ย. 2026)

ดาวน์โหลดจาก `https://ieeexplore.ieee.org/stampPDF/getPDF.jsp?tp=&arnumber=<ID>&ref=` ได้ HTTP 200 ทั้ง 3 ไฟล์

| ไฟล์ | ขนาด (ไบต์) | จำนวนหน้า | SHA-256 |
| :--- | ---: | :---: | :--- |
| `01_original_v2/Paper_III_2_PRIMARY_RaftFL_10556381.pdf` | 956,188 | 12 | `3d3cc138c066edb8d641b93318ae56206fccd5624146f08f3e68c8c8c278093d` |
| `00_research_v2/raw/Paper_III_v2_BACKUP1_10579526.pdf` | 411,043 | 8 | `b3c1cde1ca70d2af1444ef09e3785bc72c6a53236ff51546c68cf6fc25182097` |
| `00_research_v2/raw/Paper_III_v2_BACKUP2_10579519.pdf` | 320,726 | 7 | `b946f8360541fef7b3c96efa4dc7017b9e3849be157c17162680384f4f73fae4` |

ไฟล์ PRIMARY เป็นฉบับ Open Access ภายใต้ Creative Commons Attribution International ส่วนไฟล์ BACKUP ทั้งสองมีแถบ "Authorized licensed use limited to: IEEE Xplore" (สิทธิ์เอกสารฟรีของ IEEE ไม่ใช่สิทธิ์มหาวิทยาลัย)

---

## 6. ข้อจำกัดของวิธีสืบค้น (ต้องเปิดเผย)

1. **อคติจากสิทธิ์การเข้าถึง (Access Bias):** Candidate Pool ถูกจำกัดเฉพาะบทความที่ดาวน์โหลดได้ฟรี บทความปี 2024-2026 จากงานประชุมหลักด้านเครือข่ายเซนเซอร์ เช่น IPSN, INFOCOM, PerCom, SECON และ ICDCS ซึ่งต้องใช้สิทธิ์สมาชิก จึงไม่ได้เข้ารอบ แม้บางเรื่องอาจตรงโจทย์มากกว่า
2. **ความครอบคลุม:** รอบที่ 1 ตรวจเฉพาะ 500 รายการแรกที่มีการอ้างอิงสูงสุดต่อคำค้น จึงไม่ใช่ Systematic Literature Review
3. **ค่าที่เปลี่ยนตามเวลา:** จำนวนผลลัพธ์ ยอด Cited by และสถานะฟรีเป็นค่า ณ วันที่สืบค้น
4. **ข้อมูลเมตาของ IEEE มีข้อผิดพลาด:** บทคัดย่อของ 10579519 บนหน้า IEEE แสดง "> 5 % accuracy" แต่ไฟล์ PDF เขียนว่า ">95% accuracy" ให้อ้างอิงจาก PDF เสมอ

---

## 7. ลิงก์หน้าผลค้นหาสำหรับตรวจซ้ำ (ผลลัพธ์อาจเปลี่ยนตามวันที่เปิด)

- [Open Access, Conferences 2024-2026: "consensus" OR "Raft" OR "fault tolerance"](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=%22consensus%22%20OR%20%22Raft%22%20OR%20%22fault%20tolerance%22&highlight=true&returnType=SEARCH&matchPubs=true&openAccess=true&returnFacets=ALL&refinements=ContentType:Conferences&ranges=2024_2026_Year&sortType=paper-citations)
- [Conferences 2024-2026: SP/SPW + "sensor"](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=(%22Publication%20Title%22:%22Security%20and%20Privacy%22)%20AND%20(%22sensor%22%20OR%20%22sensors%22%20OR%20%22sensing%22)&highlight=true&returnType=SEARCH&matchPubs=true&returnFacets=ALL&refinements=ContentType:Conferences&ranges=2024_2026_Year&sortType=paper-citations)
- [Conferences 2024-2026: SP/SPW + "federated learning"](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=(%22Publication%20Title%22:%22Security%20and%20Privacy%22)%20AND%20(%22federated%20learning%22)&highlight=true&returnType=SEARCH&matchPubs=true&returnFacets=ALL&refinements=ContentType:Conferences&ranges=2024_2026_Year&sortType=paper-citations)
- [Conferences 2024-2026: "TinyML" OR "tiny machine learning"](https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=%22TinyML%22%20OR%20%22tiny%20machine%20learning%22&highlight=true&returnType=SEARCH&matchPubs=true&returnFacets=ALL&refinements=ContentType:Conferences&ranges=2024_2026_Year&sortType=paper-citations)
