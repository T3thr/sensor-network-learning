# Assignment 4: ชุดคัดเลือกบทความระบบเว็บ

ตรวจสอบวันที่ 5 ตุลาคม 2026 (Asia/Bangkok)

## ข้อสรุป

เลือก **Publish-Time Optimizations for Web-Based Visualizations** เป็น Primary เพราะมีสถาปัตยกรรมระบบจริง baseline และผล latency ที่สัมพันธ์กับกลไกของระบบ โดยไม่เน้นสมการขั้นสูง

อ่าน [my-personality](../../../../../../my-personality/README.md), profile, technical-stack และ decision-frameworks ก่อนค้น paper และใช้ [เกณฑ์ Work 3 v3](../../work3/00_research_v3/04_candidate_comparison.md) ประกอบการประเมิน: IEEE conference, เล่าเข้าใจง่าย, architecture, benchmark, ตรงทักษะ และวิเคราะห์ข้อจำกัดได้ เปลี่ยนปีขั้นต่ำตามคำขอครั้งนี้เป็น 2025

## Candidate Matrix

| สถานะ | Title | Authors | Conference & Year | DOI | IEEE Xplore | ประเด็นที่ศึกษา | เหตุผลที่เลือก |
|---|---|---|---|---|---|---|---|
| Primary | Publish-Time Optimizations for Web-Based Visualizations | Ron Pechuk; Jeffrey Heer | 2025 IEEE Visualization and Visual Analytics (VIS), pp. 226–230 | [10.1109/VIS60296.2025.00051](https://doi.org/10.1109/VIS60296.2025.00051) | [11298742](https://ieeexplore.ieee.org/document/11298742/) | Frontend performance: การเตรียมข้อมูล ผลคิวรี และภาพเริ่มต้นก่อนเผยแพร่ รวมถึงต้นทุน hydration | 5 หน้า; Mosaic Publisher มี pipeline จริง; เทียบ none, prep, cache, prerender; Figure 3–4 และ Table 1 ชัดเจน; ยากระดับง่ายถึงปานกลาง |
| Backup 1 | Collaborative 360-Degree Video Streaming: A Multi-User Synchronization Solution with Socket.IO | Anderson Augusto Simiscuka; Gianluca Fadda; Maurizio Murroni; Gabriel-Miro Muntean | 2025 IEEE International Symposium on Broadband Multimedia Systems and Broadcasting (BMSB), pp. 1–5 | [10.1109/BMSB65076.2025.11165535](https://doi.org/10.1109/BMSB65076.2025.11165535) | [11165535](https://ieeexplore.ieee.org/document/11165535/) | Web multimedia และ state synchronization: การส่ง play/pause/seek events แยกจากตัวสื่อ | 5 หน้า; Node.js/Express/Socket.IO; architecture Figure 1; กราฟ throughput/CPU เทียบ 2, 8, 16 clients; อ่านง่าย แต่ไม่มี protocol baseline และไม่วัด sync error โดยตรง |
| Backup 2 | Data-Driven Compute Overlays for Interactive Geographic Simulation and Visualization | Patrick Komon; Gerald Kimmersdorfer; Adam Celarek; Manuela Waldner | 2025 IEEE Visualization and Visual Analytics (VIS), pp. 186–190 | [10.1109/VIS60296.2025.00043](https://doi.org/10.1109/VIS60296.2025.00043) | [11298780](https://ieeexplore.ieee.org/document/11298780/) | Interactive rendering architecture: compute workflow และ GPU texture overlays | 5 หน้า; weBIGeo รองรับ native/web; มี workflow diagram และ Table 1 เทียบ FlowPy; ไม่มีบทพิสูจน์คณิตศาสตร์หนัก แต่ WebGPU/shader/particle simulation ยากกว่าอีกสองเรื่อง จึงสำรองลำดับ 2 |



## Executive Summary: Primary

บทความของ Pechuk และ Heer ศึกษาการลดความหน่วงของเว็บแสดงภาพข้อมูลด้วย Mosaic Publisher ซึ่งเตรียมข้อมูล แคช และภาพเริ่มต้นก่อนเผยแพร่ ผู้วิจัยทดลองกับ visualization 5 แบบ โดยวัด Time-to-Render (TTR), Time-to-Activation (TTA) และ Storage Cost (SC) ชุดปรับปรุงรวมลด TTR เฉลี่ย 83.7% และ TTA 33.3% แลกกับ SC เพิ่ม 21.2% เทียบกับ none ผลแสดงว่าเวลาเห็นภาพกับเวลาพร้อมโต้ตอบดีขึ้นไม่เท่ากัน โดย Hydration ยังมีต้นทุนสูง และผลอยู่ในขอบเขตเครื่องกับสภาพเครือข่ายที่ใช้ทดลอง

## หลักฐานที่ใช้เล่าในสไลด์

| เรื่อง | หลักฐานฉบับเต็ม | จุดที่ต้องระบุอย่างตรงไปตรงมา |
|---|---|---|
| Primary | Section 4: Mosaic Publisher; Figure 1: แนวคิด; Figure 3: TTR/TTA; Figure 4: latency breakdown; Table 1: latency และ storage | ทดสอบ local server บน MacBook Pro M1 Pro และ DuckDB-WASM; ยังไม่ครอบคลุม mobile/เครือข่ายจริง; hydration ยังมีต้นทุน |
| Backup 1 | Figure 1: client/server; Figures 4–9: throughput/CPU; Section IV: 2, 8, 16 clients | เป็น load-scenario comparison ไม่ใช่ Socket.IO vs SSE/WebRTC; ไม่รายงาน end-to-end sync error, user study หรือขนาดระบบเกิน 16 clients; ไม่ควรเปลี่ยนหน่วย throughput จากกราฟเป็น Mbps โดยไม่มีการตรวจนิยาม |
| Backup 2 | Workflow และ rendering pipeline; Table 1: model runtime บนอุปกรณ์สองชนิด/ข้อมูลสองชุด | เวลาไม่รวม file I/O; weBIGeo ปรับพารามิเตอร์เพื่อให้ภาพใกล้เคียง FlowPy จึงไม่ใช่ implementation ของแบบจำลองเดียวกันทุกประการ; ผล speedup เป็น model runtime ไม่ใช่ FPS หรือการเทียบ WebGPU vs WebGL |

โครงนำเสนอ Primary: ปัญหา → สถาปัตยกรรม → วิธีทดลองและตัวชี้วัด → ผลและ storage trade-off → ข้อจำกัด → ข้อสรุปจากการอ่าน

## การตรวจแหล่งและปี

รายการอ้างอิงที่เลือกทั้งสามเป็นบทความใน **IEEE Xplore** มี publisher IEEE และ type `proceedings-article` ปี 2025 ใน metadata ที่ IEEE ฝากกับ Crossref ลิงก์ `resource.primary.URL` ยืนยัน document ID ตรงกับรายการข้างบน ดู JSON ใน [evidence](evidence/)

IEEE Xplore ปิดกั้นการอ่านอัตโนมัติในรอบนี้ และการเปิด Chrome ผ่านเครื่องมือหมดเวลา จึงไม่ได้อ้างว่าอ่าน final PDF ผ่านบัญชีมหาวิทยาลัยสำเร็จ ใช้สำเนาสาธารณะที่ผู้แต่งเผยแพร่เพื่ออ่านเนื้อหาและตรวจภาพจริงครบทั้งสามเรื่อง ทุกสำเนามี 5 หน้า; เก็บไว้ด้วย prefix `authorcopy_` เพื่อไม่สับสนกับ PDF ต้นฉบับสำหรับส่งงาน

สำเนา WebGPU ที่อ่านเป็น author version v2 ลงวันที่มกราคม 2026 และมีหัว copyright 2026 แต่รายการ proceedings ที่ IEEE ฝากไว้ระบุ IEEE VIS 2025; ใช้ปีและ DOI ของ proceedings ใน citation ไม่ใช้วันที่อัปโหลดสำเนาแทนปีพิมพ์

- Primary: [หน้าผู้วิจัย UW](https://idl.uw.edu/papers/publish-time-optimizations), [author PDF](https://idl.cs.washington.edu/files/2025-PublishTimeOpt-VIS.pdf)
- Backup 1: [คลัง DCU](https://doras.dcu.ie/31030/), [accepted manuscript](https://doras.dcu.ie/31030/1/multiuser_360_sync_player___ACCEPTED_BMSB.pdf)
- Backup 2: [หน้าผู้วิจัย TU Wien](https://www.cg.tuwien.ac.at/research/publications/2025/komon-2025-dco/), [author version](https://arxiv.org/abs/2506.23364), [PDF v2](https://arxiv.org/pdf/2506.23364v2)

ตรวจ document IDs ไม่ซ้ำกับรายการ Paper I–III ใน raw และเอกสาร research ของ work1–work3 ที่มีอยู่ใน workspace ค่า SHA-256 ของสำเนาที่อ่านอยู่ใน [MANIFEST.sha256](evidence/MANIFEST.sha256)

## ผู้สมัครที่ไม่นำเข้าชุดสุดท้าย

- P2SQL (11029790): ใช้เป็น Primary ของ Work 3 v3 ไปแล้ว
- BYOS (11274671): เคยเป็น Backup ของ Work 2 และไม่มี empirical evaluation ตามบันทึกเดิม
- Micro Frontend Architecture (11029321): abstract ของ IEEE น่าสนใจ แต่ยังอ่าน conference PDF เต็มไม่ได้; วิทยานิพนธ์ของผู้แต่งไม่ใช่หลักฐานแทน conference PDF จึงไม่นำตัวเลขจากเล่มมาอ้างเป็นผลของ paper
- Performance-Based Selection Methodology (11268212): ยืนยัน metadata ได้ แต่ยังไม่มีฉบับเต็มที่ตรวจผลได้ จึงไม่เลือกจากบทสรุปแหล่งรองอย่างเดียว
- Optimizing CDN Architectures (10993768): สำเนา preprint ระบุการเติม Poisson noise ลง RTT/CPU ทำให้ต้องตรวจแยก measured กับ simulated metrics เพิ่ม ไม่เหมาะเป็นตัวเลือกแรกสำหรับนำเสนอภายใน 5 นาที

## ดาวน์โหลดต้นฉบับสำหรับส่ง

ดู [DOWNLOAD_PDFS.md](DOWNLOAD_PDFS.md) สำหรับลิงก์ IEEE และชื่อไฟล์ทั้งสามที่ต้องบันทึก
