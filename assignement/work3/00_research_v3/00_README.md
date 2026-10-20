# งานวิจัยและเอกสารเตรียมการ Version 3 (Paper 3-v3 / ปี 2024+)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร
### โครงงานวิศวกรรมคอมพิวเตอร์ (CPE Senior Project) & Modern AI/Distributed Era

---

## 1. บริบทและเหตุผลการเปลี่ยนผ่านสู่ Version 3 (Version 3 Rationale)

1. **การก้าวข้ามข้อจำกัดของ Version 1 และ Version 2:**
   - **Version 1 (OmniLedger 2018):** เก่าเกินไป (2018), ทฤษฎีคริปโตและ Sharding ซับซ้อนเกินกว่าจะอธิบายให้ผู้ฟังเข้าใจได้ใน 5 นาที
   - **Version 2 (Raft-FL 2024):** แม้ปีใหม่ขึ้น แต่หัวข้อ Federated Learning บน Raspberry Pi ยังไม่ใช่จุดแข็งตามธรรมชาติของนิสิต และเอกสารรอบแรกขาดมาตรฐานสากล
   - **Version 3 (Paper 3-v3):** มุ่งเน้นหัวข้อที่ **"ตรงกับตัวตน ความเชี่ยวชาญจริง และโครงงานวิศวกรรมคอมพิวเตอร์ของนิสิต"** อย่างแท้จริง โดยอิงจากแฟ้มประวัติ [my-personality](../../../../my-personality)
2. **ความสอดคล้องกับคำสั่งอาจารย์ผู้สอน (Assignment Rubric Alignment):**
   - คำสั่งใน `assignment-paper3.png` ระบุชัดเจน: *"ให้นิสิตทำการค้นหาและเลือกบทความ conference paper จาก IEEE Xplore เป็นเรื่องหรือหัวข้อ ด้านอะไรก็ได้ที่นิสิตสนใจ แนะนำว่าเป็นด้านที่นิสิตทำโปรเจ็คจบ จะได้นำไปใส่ในเล่มวิทยานิพนธ์ในบทที่ 1 หรือ 2 ได้ คนละ 1 บทความ"*
   - ดังนั้น Version 3 จึงเปิดกว้างสู่งานวิจัยระดับโลกด้าน Software Engineering, Distributed Systems, Event-Driven Streaming, หรือ AI Agents ที่นิสิตมีความเชี่ยวชาญสูงสุด

---

## 2. ข้อมูลอัตลักษณ์และความเชี่ยวชาญของนิสิต (Student Profile)

- **นิสิต:** นายธีรภัทร์ ภู่ระยา (Center / เซนเตอร์) | **รหัสนิสิต:** 66362416
- **สาขาวิชา:** วิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยนเรศวร (CPE Senior 2026)
- **ทักษะวิศวกรรมหลัก (Core Technical Mastery):**
  - **Go (Golang):** Concurrency, Gin, gqlgen, GORM, Microservices, Clean Architecture
  - **Distributed & Streaming:** Kafka Event-Driven, Server-Sent Events (SSE), Distributed State & Caching
  - **API Architecture:** GraphQL (Apollo Federation, Federated Subgraphs), REST SPI Extensions
  - **Identity & Security:** Keycloak OIDC, Custom REST SPI, JWT Claims, RBAC
  - **Database & Storage:** PostgreSQL Indexing, Schema Optimization, S3 Resilient File Subsystem
  - **Startup & Cloud:** Tech Lead (ทุน TED Youth Startup 100k THB), Next.js, Node.js, Docker, Kubernetes

---

## 3. ทิศทางการค้นคว้าบทความ Version 3 (3 Modern Research Tracks)

1. **Track 1: AI-Assisted Software Engineering & Intelligent Microservices Architecture (2024-2026)**
   - การใช้ AI/LLM ในการวิเคราะห์ ออกแบบ หรือตรวจสอบ Microservices API Contracts (เช่น GraphQL/REST)
   - Autonomous Agents สำหรับการตรวจจับความผิดปกติ (Anomaly Detection) และ Root Cause Analysis ในระบบกระจายตัว
2. **Track 2: High-Performance Distributed Systems & Event-Driven Stream Processing (2024-2026)**
   - การประมวลผล Event Stream ขนาดใหญ่ (Kafka/KRaft, Event Mesh) ที่มีความหน่วงต่ำและ Throughput สูง
   - กลไก Concurrency, Backpressure, หรือ Distributed Consensus ที่ทันสมัย
3. **Track 3: Modern Zero-Trust Security & Identity Federation in Cloud-Native Systems (2024-2026)**
   - สถาปัตยกรรม Zero-Trust, Token Propagation, และ Dynamic Access Control ในระบบ Microservices / Service Mesh
   - Keycloak / OIDC Custom Extension Patterns สำหรับ Enterprise Security

---

## 4. โครงสร้างโฟลเดอร์ปฏิบัติงาน Version 3 (Directory Architecture)

```text
assignement/work3/
├── 00_research_v3/               # แฟ้มการสืบค้นและคัดเลือกบทความ 6 เรื่อง (1 PRIMARY + 2 BACKUPs)
│   ├── 00_README.md
│   ├── 01_personal_profile_and_competencies.md
│   ├── 02_research_directions.md
│   ├── 03_search_log.md
│   ├── 04_candidate_comparison.md
│   ├── 05_selected_papers.md
│   ├── 08_search_agent_prompt.md
│   ├── 09_final_decision.md
│   ├── evidence/                 # บันทึก SHA-256 และ Metadata ที่ตรวจสอบแล้ว
│   └── raw/                      # ไฟล์ PDF ของบทความสำรอง (Backup 1 & 2)
├── 01_original_v3/               # ไฟล์ PDF ต้นฉบับบทความตัวจริง (Paper_III_3_PRIMARY_*.pdf)
├── 02_report_v3/                 # เล่มรายงานฉบับย่อภาษาไทย 7 หัวข้อ (MD, PDF, DOCX)
├── 03_slides_v3/                 # สไลด์นำเสนอ 7 หน้า ธีมสว่างวิชาการ (MD, PPTX, PDF)
├── 04_presentation_v3/           # สคริปต์พูด 4:30 - 4:55 นาที และคลัง Q&A 15 ข้อ
├── 05_study_v3/                  # คอร์สสรุปเนื้อหาเชิงลึก (Zero-to-Hero Course)
└── 06_evidence_v3/               # Checklist ตรวจเกณฑ์ 10 คะแนน และตาราง Claim-to-Evidence
```

---

## 5. กฎเหล็กคุณภาพงานและต่อต้าน AI Slop (Strict Anti-AI-Slop Rules)

- **สไลด์:** ต้องใช้ **พื้นหลังสว่างแบบวิชาการ (Slate `#F8FAFC` + การ์ดขาว `#FFFFFF`)** แถบหัวสีกรมท่าเข้ม (`#0F2D4A`) ตาม `SLIDES_DESIGN_SYSTEM.md` ห้ามใช้ธีมมืด และต้องมีเลขหน้า `Slide X / 7` เสมอ
- **รายงาน:** อิงโครงสร้างและสำนวนภาษาไทยที่เป็นธรรมชาติแบบ `work2/02_report/...` ไม่ใช้สำนวนหุ่นยนต์แปล
- **ปราศจาก Emoji:** ห้ามใส่อีโมจิในเอกสารวิชาการ รายงาน สไลด์ หรือสคริปต์
- **ไม่มี Em Dash ในภาษาไทย:** ใช้เครื่องหมาย `:` หรือวงเล็บแทน
