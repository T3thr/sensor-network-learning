# บันทึกประวัติการสืบค้นบทความวิจัย Version 3 (Search Log)
## แหล่งข้อมูล: IEEE Xplore Digital Library (Conferences, 2024–2026)

เอกสารนี้บันทึกคำค้น ตัวกรอง จำนวนผลลัพธ์ และเหตุผลการคัดกรองทุกขั้น ตั้งแต่การสแกนฐานข้อมูลจนได้ผู้สมัคร 6 บทความ สำหรับ Assignment Paper 3 Version 3

---

## 1. ข้อมูลการสืบค้น (Search Metadata)

- **วันที่ดำเนินการ:** 28 กันยายน 2026 (Asia/Bangkok)
- **ฐานข้อมูล:** IEEE Xplore Digital Library เท่านั้น
- **เครือข่ายที่ใช้:** เครือข่ายมหาวิทยาลัยนเรศวรผ่าน UniNet (IEEE ระบุ `institutionName = Naresuan University provided by UniNet`, `products = IEL`) ทำให้บทความส่วนใหญ่แสดงสถานะ `subscribed` (อ่านได้เฉพาะในเครือข่ายมหาวิทยาลัย)
- **หลักการคัดสิทธิ์การเข้าถึง:** ให้น้ำหนักสูงสุดกับบทความ **Open Access** (`isOpenAccess = true`, `isFreeDocument = true`) เพราะอาจารย์และทุกคนดาวน์โหลดได้โดยไม่ต้องใช้สิทธิ์มหาวิทยาลัย บทความที่เป็น `subscribed` บันทึกไว้เป็นข้อมูลอ้างอิงแต่ไม่ถูกเลือก
- **ตัวกรองที่บังคับใช้ทุกคำค้น:**
  - Content Type: `Conferences` (ตัด Journals, Early Access, Magazines, Books ออก)
  - Year Range: `2024 - 2026` (พารามิเตอร์ `ranges: 2024_2026_Year`)
  - Sort: `Most Cited By Papers`
  - Open Access Only (พารามิเตอร์ `openAccess: true`) ในรอบที่ 2
- **ทางเข้าข้อมูล:** บริการค้นหาชุดเดียวกับหน้า Search Results ของ IEEE Xplore (`/rest/search`) และอ่านเนื้อหาฉบับเต็มผ่านมุมมอง HTML ของ IEEE Xplore (`/document/<id>/`) ในเบราว์เซอร์ ขั้นคัดกรองไม่มีการดาวน์โหลดไฟล์

---

## 2. วิธีการสืบค้น 4 รอบ

1. **รอบที่ 1 (Broad scan):** ค้นด้วยคำกว้างตาม 3 Research Tracks นับจำนวน Conference papers ปี 2024-2026 ทั้งหมด
2. **รอบที่ 2 (Open Access filter):** คำค้นเดิมพร้อมตัวกรอง Open Access Only แล้วอ่านชื่อเรื่องทุกรายการ
3. **รอบที่ 3 (Free venue scan):** สแกนงานประชุมกลุ่ม IEEE Security and Privacy (SP, EuroS&P, SPW) ด้วยคำค้น `("Publication Title":"Security and Privacy") AND (<terms>)` สำหรับ Track 3 เพราะบทความบางส่วนของ SP/SPW เป็นเอกสารฟรี (accessType `promotional`)
4. **รอบที่ 4 (Full-text screening):** อ่านเนื้อหาฉบับเต็มผ่าน HTML ของ IEEE Xplore สำหรับผู้สมัคร 6 รายการ (ยกเว้น 10554731 ที่ไม่มีมุมมอง HTML จึงอ่านจาก PDF หลังได้รับอนุญาต) แล้วดาวน์โหลดจริงเฉพาะ 3 รายการที่เลือก หลังนิสิตอนุญาตในแชต

---

## 3. ประวัติการค้นหาและผลลัพธ์ (Search History Table)

### รอบที่ 1 และ 2: Conferences 2024-2026 (ทั้งหมด เทียบกับ Open Access Only)

| ลำดับ | Track | คำค้นหา (Query String) | Conferences ทั้งหมด | Open Access | รายการที่เกี่ยวข้องกับโจทย์ (IEEE Doc ID) |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | 1 | `microservice*` | 3,893 | 19 | 10556141 (RAMSES), 10554865 (SLIM), 10554880, 10556461 (CAR-PT), 11670062 (MIST) |
| 2 | 1 | `"root cause analysis"` | 611 | 2 | 10554865 (SLIM, 3 หน้า) |
| 3 | 1 | `"large language model" AND (microservice OR "incident" OR "AIOps")` | 224 | 0 | ไม่มี |
| 4 | 1 | `"self-healing" OR "self-adaptive"` | 1,740 | 7 | 10556141 (RAMSES) |
| 5 | 1 | `AIOps OR incident OR "site reliability" OR alert` | 18,923 | 13 | **10554731** (Alert Suppression), **10554688** (Autonomous Monitors), **10555939** (AIOps drift) |
| 6 | 1 | `"anomaly detection" AND (log OR trace OR cloud OR service)` | 9,339 | 10 | 10548351 (MetaLog), 10554894 (Logs2Graphs, 2 หน้า) |
| 7 | 1 | `"distributed tracing" OR observability OR "log anomaly"` | 1,937 | 3 | 10554731, 10554894 |
| 8 | 1 | `"LLM" OR "large language model"` | 18,882 | 66 | **11029790** (P2SQL), 10727123 (LLM REST API testing), 10548193 |
| 9 | 2 | `Kafka OR "event streaming" OR "publish/subscribe"` | 636 | 1 | ไม่ตรง (11520501 เป็นงาน HPC file system) |
| 10 | 2 | `"stream processing" OR "event-driven"` | 2,000 | 2 | ไม่ตรง |
| 11 | 2 | `Go OR Golang OR goroutine` | 7,305 | 13 | ไม่ตรง (คำว่า Go จับคำทั่วไป) |
| 12 | 2 | `concurrency OR "data race" OR deadlock OR "message queue"` | 1,557 | 12 | 10549700 (concurrency bug prediction, เชิงทฤษฎีสูง) |
| 13 | 2 | `"distributed system*" OR consensus OR replication OR cache` | 19,943 | 37 | 10556381 (Raft-FL, ใช้แล้วใน Version 2) |
| 14 | 2 | `latency OR throughput OR "tail latency"` | 49,418 | 56 | ส่วนใหญ่เป็นงาน HPC/LLM serving ไม่ตรงกับ backend microservices |
| 15 | 3 | `GraphQL OR "API gateway" OR "REST API"` | 696 | 7 | 10727123, 10549615, 10554880 |
| 16 | 3 | `API AND (evolution OR breaking OR contract OR schema)` | 555 | 2 | 10554880 (3 หน้า) |
| 17 | 3 | `"zero trust"` | 1,111 | 1 | 11645170 (ZT-IoT project overview) |
| 18 | 3 | `OAuth OR OpenID OR "access token" OR JWT` | 272 | 0 | ไม่มี |
| 19 | 3 | `"service mesh" OR Kubernetes OR "cloud-native"` | 2,310 | 10 | 11126149 (LLM + IaC policy), 11126136 |
| 20 | 1 | `resilience OR "chaos engineering" OR "fault injection" OR "fault tolerance"` | 24,423 | 21 | 10556381 (ใช้แล้ว), 10556356 |
| 21 | 3 | `"prompt injection" OR "SQL injection"` | 664 | 3 | **11029790** (P2SQL) ยืนยันซ้ำ |

**ข้อสรุปรอบที่ 1-2:**
- บทความ Open Access มีเพียง 0.1 ถึง 1 เปอร์เซ็นต์ของผลลัพธ์ทั้งหมด
- Track 2 (Kafka, Event Streaming) ไม่มีบทความ Open Access ที่ตรงโจทย์เลย จึงไม่มีผู้สมัครจาก Track 2
- Track 1 และงาน LLM ด้าน Software Engineering มีบทความ Open Access จาก ICSE 2024/2025, CAIN 2024 และ SEAMS 2024 มากที่สุด

### รอบที่ 3: งานประชุมกลุ่ม IEEE Security and Privacy (Conferences 2024-2026)

| ลำดับ | คำค้นหา `("Publication Title":"Security and Privacy") AND (...)` | ผลลัพธ์ | รายการที่เกี่ยวข้อง |
| :---: | :--- | :---: | :--- |
| 22 | `OAuth OR OpenID OR "single sign-on" OR SSO OR token` | 69 | 10628996 (SoK SSO-MONITOR), 11023371 (Brokered SSO), 11573408 (OAuth account linking) ทั้งหมดไม่ใช่ Open Access |
| 23 | `authorization OR "access control"` | 146 | 11023379 (EPScan RBAC Kubernetes), 11023451 (Broken Access Control) ไม่ใช่ Open Access |
| 24 | `microservice* OR "cloud-native" OR kubernetes OR container` | 51 | 10646601 (SP 2024, ฟรี) แต่เป็น program analysis ระดับ system call ซับซ้อนเกิน 5 นาที, 10646668 (SoK Docker, ฟรี) เป็นงานสำรวจ |
| 25 | `"Go" OR Golang OR "Rust" OR concurrency` | 35 | ไม่ตรงกับงาน backend |
| 26 | `"zero trust" OR identity OR authentication` | 305 | 11129578 (SoK Zero Trust DevSecOps) ไม่ใช่ Open Access |
| 27 | `API OR "web application" OR GraphQL` | 104 | 11573425 (Privilege escalation in polyglot microservices, SP 2026) ไม่ใช่ Open Access |

**ข้อสรุปรอบที่ 3:** บทความ Track 3 ที่ตรงกับ Keycloak/OAuth มากที่สุดล้วนต้องใช้สิทธิ์สมาชิก ส่วนเอกสารฟรีของ SP 2024 ที่เกี่ยวข้องมีความซับซ้อนเชิงทฤษฎีสูง ไม่เหมาะกับการนำเสนอ 5 นาที

---

## 4. รายชื่อบทความที่ผ่านการคัดกรองเบื้องต้น (Shortlisted Candidates)

คัดจากผลรอบที่ 1-3 โดยเกณฑ์: เป็น Full paper (ไม่ใช่ poster 2-3 หน้า), มีการทดลองเทียบ Baseline, ตรงกับทักษะนิสิต

| # | IEEE Doc ID | ชื่อบทความ | งานประชุม | หน้า | การเข้าถึง | สถานะหลังอ่านฉบับเต็ม |
| :---: | :---: | :--- | :--- | :---: | :---: | :--- |
| 1 | 11029790 | Prompt-to-SQL Injections in LLM-Integrated Web Applications: Risks and Defenses | ICSE 2025 | 13 | Open Access | ผ่าน (PRIMARY) |
| 2 | 10554688 | Autonomous Monitors for Detecting Failures Early and Reporting Interpretable Alerts in Cloud Operations | ICSE-SEIP 2024 | 11 | Open Access | ผ่าน (BACKUP 1) |
| 3 | 10554731 | Dynamic Alert Suppression Policy for Noise Reduction in AIOps | ICSE-SEIP 2024 | 11 | Open Access | ผ่าน (BACKUP 2) |
| 4 | 10555939 | Is Your Anomaly Detector Ready for Change? Adapting AIOps Solutions to the Real World | CAIN 2024 | 12 | Open Access | ผ่านเกณฑ์ แต่เน้น ML time series มากกว่างานระบบ |
| 5 | 10727123 | Leveraging Large Language Models to Improve REST API Testing | ICSE-NIER 2024 | 5 | Open Access | ผลลัพธ์เป็นเพียง Preliminary Results 2 ตาราง |
| 6 | 10556141 | RAMSES: an Artifact Exemplar for Engineering Self-Adaptive Microservice Applications | SEAMS 2024 | 7 | Open Access | เป็น Artifact paper ไม่มี Baseline เปรียบเทียบ |

**รายการที่ตัดออกหลังอ่านบทคัดย่อ:** 10554865 SLIM (3 หน้า), 10554880 (3 หน้า, doctoral paper), 10554894 (2 หน้า poster), 10556461 CAR-PT (5 หน้า), 11126149 (LLM + IaC, ขาดรายละเอียด Baseline), 10556381 (ใช้แล้วใน Version 2)

---

## 5. การตรวจสอบไฟล์ PDF (Download Verification)

ดาวน์โหลดผ่าน `https://ieeexplore.ieee.org/stampPDF/getPDF.jsp?tp=&arnumber=<ID>&ref=` หลังนิสิตอนุญาตในแชตเมื่อ 28 กันยายน 2026

| บทบาท | IEEE Doc ID | HTTP | Content-Type | ขนาด (ไบต์) | หน้า | SHA-256 |
| :--- | :---: | :---: | :--- | ---: | :---: | :--- |
| PRIMARY | 11029790 | 200 | application/pdf | 283,585 | 13 | `c5a0b74878e5454dd3dc4178cd7ef20af733a6d8503d445f9de5e1d64214f428` |
| BACKUP 1 | 10554688 | 200 | application/pdf | 451,026 | 11 | `8c3d1b60bf94ba41b2813fe96a38d3c1e5cb9a08d93e2b54c6027644646ab6a1` |
| BACKUP 2 | 10554731 | 200 (ครั้งแรกได้ 502 จึงลองใหม่) | application/pdf | 2,351,626 | 11 | `bec72ad76d3b3c6f5cab33285f99535361fb1a61c56454e6d8c29589adc8d3ab` |

ทุกไฟล์ขึ้นต้นด้วย `%PDF-` และ `pdfinfo` อ่านชื่อเรื่องตรงกับ metadata ของ IEEE Xplore
