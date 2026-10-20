# ทะเบียนหัวข้อข้อสอบและการแบ่งงานข้าม Agent (Master Exam Drill Matrix)
## วิชา 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
## การบูรณาการ: Data Communications (Forouzan 14 บท) และ Wireless Sensor Networks (ตำราหลัก 14 บท)

เอกสารฉบับนี้เป็นแผนที่ข้อสอบกลางและทะเบียนการทดสอบ (Single Source of Truth: SSOT) สำหรับประสานงานระหว่าง:
- **Agent Bravo (MiMo-V2.6-Pro):** ดำเนินการยิงโจทย์คำนวณ ตรวจสอบคำตอบ และจับกับดักข้อสอบสดใน Terminal
- **Agent Alpha (Gemini Lead Architect):** เฉลยโครงสร้างเชิงลึก เชื่อมโยงระดับซิลิคอน/ฟิสิกส์ และพัฒนาแบบจำลองโต้ตอบ (Interactive Simulator) บนเว็บ

---

## ด่านที่ 1: Physical Layer, Signals, Hardware and Channel Impairments
**ขอบเขตเนื้อหา:** DataCom บทที่ 1-5, 7 ร่วมกับ WSN Textbook บทที่ 1, 10

| รหัสหัวข้อ | ชื่อหัวข้อและแกนความรู้ | สมการและสูตรวิศวกรรมหลัก | รูปแบบโจทย์ข้อสอบที่พบบ่อย | ผู้รับผิดชอบหลัก | สถานะ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **D1-01** | สัญญาณ คลื่นไซน์ และแบนด์วิดท์ (Sine Wave, Fourier, Bandwidth) | `s(t) = A × sin(2πft + φ)`, `λ = c / f`, `B = f_high - f_low` | คำนวณความยาวคลื่นสายอากาศ, คำนวณแบนด์วิดท์ของสัญญาณคอมโพสิตและฮาร์มอนิก | MiMo (คำนวณ) / Alpha (สถาปัตยกรรม) | COMPLETED |
| **D1-02** | ความสูญเสียในช่องสัญญาณ (Attenuation, Distortion, Noise) | `dB = 10 × log₁₀(P₂ / P₁)`, `SNR = P_signal / P_noise`, `SNRdB = 10 × log₁₀(SNR)` | การคำนวณระดับสัญญาณตกทอด, แปลงหน่วยระหว่าง W, mW, dB, dBm | MiMo (คำนวณ) / Alpha (วิเคราะห์) | COMPLETED |
| **D1-03** | ขีดจำกัดอัตราส่งข้อมูล (Nyquist Bit Rate vs Shannon Capacity) | `BitRate = 2 × B × log₂(L)`, `C = B × log₂(1 + SNR)` | คำนวณความจุแชนนอนแล้วย้อนหาจำนวนระดับสัญญาณ L ของไนควิสต์ | MiMo (Terminal Drill 1.1) | IN_PROGRESS |
| **D1-04** | การแพร่กระจายคลื่นวิทยุและสมการฟริส (Friis Transmission & Path Loss) | `P_rx = P_tx × G_tx × G_rx × (λ / (4πd))²`, `P_rx ∝ 1 / dⁿ` (n = 2 ถึง 4) | วิเคราะห์ระยะสื่อสารเมื่อเปลี่ยนกำลังส่ง TX หรือความถี่พาหะ | MiMo (Terminal Drill 1.2) | IN_PROGRESS |
| **D1-05** | สเปกฮาร์ดแวร์เซนเซอร์และการใช้พลังงาน (Mote Architecture & CC2420) | `E = V × I × t`, `P = V × I`, แบตเตอรี่ 2×AA (3V, 2500 mAh) | คำนวณอายุการใช้งานของโหนดตาม Duty Cycle (TX vs RX vs Sleep) | MiMo (Terminal Drill 1.3) / Alpha (Web Sim) | IN_PROGRESS |
| **D1-06** | การเข้ารหัสสัญญาณและการแปลงสัญญาณ (Line Coding, PCM, Modulation) | NRZ-L, NRZ-I, Manchester, Differential Manchester, ASK, FSK, PSK, QAM | แปลงลำดับบิตเป็นรูปคลื่นสัญญาณ, วาด Constellation Diagram | MiMo (คำนวณ) / Alpha (เฉลยรูปคลื่น) | PENDING |

---

## ด่านที่ 2: Data Link Control, Error Handling and MAC Protocols
**ขอบเขตเนื้อหา:** DataCom บทที่ 10-12 ร่วมกับ WSN Textbook บทที่ 3

| รหัสหัวข้อ | ชื่อหัวข้อและแกนความรู้ | สมการและสูตรวิศวกรรมหลัก | รูปแบบโจทย์ข้อสอบที่พบบ่อย | ผู้รับผิดชอบหลัก | สถานะ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **D2-01** | การตรวจจับและแก้ไขข้อผิดพลาด (Hamming Code, Parity) | `d_min = s + 1` (ตรวจจับ s บิต), `d_min = 2t + 1` (แก้ไข t บิต), `2ʳ ≥ m + r + 1` | คำนวณบิตตรวจสอบ Parity, หาบิตผิดพลาดจาก Hamming Syndrome | MiMo (คำนวณ) / Alpha (ทฤษฎี) | PENDING |
| **D2-02** | รหัสตรวจจับวงรอบแบบโพลิโนเมียล (Cyclic Redundancy Check: CRC) | การหารพหุนามใน GF(2) (โมดูโล 2 ด้วย XOR), การสร้างวงจร Shift Register | ตั้งหารหาค่า CRC Checksum, ออกแบบวงจรรีจิสเตอร์เลื่อนข้อมูล | MiMo (คำนวณ) / Alpha (วงจรฮาร์ดแวร์) | PENDING |
| **D2-03** | การควบคุมการไหลและการส่งซ้ำ (Framing, Flow & Error Control ARQ) | ขนาดหน้าต่าง: Stop-and-Wait (W=1), Go-Back-N (W ≤ 2ᵐ - 1), Selective Repeat (W ≤ 2ᵐ⁻¹) | คำนวณหาขนาดหน้าต่างและลำดับ Sequence Number, การหา Bandwidth-Delay Product | MiMo (คำนวณ) / Alpha (State Diagram) | PENDING |
| **D2-04** | การเข้าถึงตัวกลางแบบดั้งเดิม (Pure/Slotted ALOHA, CSMA/CD, CSMA/CA) | ประสิทธิภาพ ALOHA: `S = G × e⁻²ᴳ` (Pure), `S = G × e⁻ᴳ` (Slotted), Backoff Timer | การคำนวณ Throughput สูงสุด, กลไก IFS, RTS/CTS แกัปัญหาสถานีซ่อนเร้น | MiMo (คำนวณ) / Alpha (วิเคราะห์) | PENDING |
| **D2-05** | โปรโตคอล MAC สำหรับเครือข่ายเซนเซอร์ (S-MAC, T-MAC, WiseMAC) | แหล่งสูญเสียพลังงาน 4 ประการ: Collision, Overhearing, Overhead, Idle Listening | เปรียบเทียบ Periodic Listen/Sleep (S-MAC) กับ Adaptive Timeout (T-MAC) | MiMo (คำนวณ Duty Cycle) / Alpha (Simulator) | PENDING |
| **D2-06** | โปรโตคอล MAC แบบจัดตารางเวลาและไฮบริด (TDMA, TRAMA, Z-MAC) | Frame time slots, Guard time, Collision-free scheduling | การจัดสรร Time Slot ภายใต้ข้อจำกัดความหนาแน่นและพลังงาน | MiMo (คำนวณ) / Alpha (สถาปัตยกรรม) | PENDING |

---

## ด่านที่ 3: Routing, Clustering, Topology and Dissemination
**ขอบเขตเนื้อหา:** DataCom บทที่ 8 ร่วมกับ WSN Textbook บทที่ 4, 5, 6

| รหัสหัวข้อ | ชื่อหัวข้อและแกนความรู้ | สมการและสูตรวิศวกรรมหลัก | รูปแบบโจทย์ข้อสอบที่พบบ่อย | ผู้รับผิดชอบหลัก | สถานะ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **D3-01** | ปัญหาการส่งข้อมูลแบบ Flooding และ Gossiping | ปัญหา 3 ประการ: Implosion, Overlap, Resource Blindness | วิเคราะห์ข้อเสียของ Flooding และการแก้ด้วยความน่าจะเป็นใน Gossiping | MiMo (วิเคราะห์) / Alpha (เชื่อมโยง) | PENDING |
| **D3-02** | โปรโตคอลเส้นทางแบบเน้นข้อมูล (SPIN, Directed Diffusion, Rumor Routing) | ขั้นตอน 3 จังหวะของ SPIN: ADV → REQ → DATA, ขั้นตอน Directed Diffusion: Interest, Gradient, Reinforcement | ลำดับการส่งแพ็กเก็ตควบคุม, การสร้างเส้นทางแบบไม่พึ่งพา IP Address | MiMo (ลำดับขั้นตอน) / Alpha (Data-Centric Flow) | PENDING |
| **D3-03** | การส่งข้อมูลเชิงพิกัดภูมิศาสตร์ (Geocasting, GEAR, GPSR) | Greedy Forwarding, Perimeter Forwarding (Right-Hand Rule) | การแก้ปัญหาทางตัน (Void/Hole Problem) เมื่อไม่มีเพื่อนบ้านใกล้ปลายทาง | MiMo (อัลกอริทึม) / Alpha (Visual Diagram) | PENDING |
| **D3-04** | การจัดกลุ่มโหนดแบบ LEACH (Low-Energy Adaptive Clustering Hierarchy) | ความน่าจะเป็นการเป็นหัวหน้ากลุ่ม: `T(n) = P / (1 - P × (r mod (1/P)))` ถ้า `n ∈ G` | คำนวณค่าเกณฑ์ T(n), อธิบายข้อดีของการหมุนเวียนบทบาท Cluster Head | MiMo (คำนวณรอบ) / Alpha (Energy Model) | PENDING |
| **D3-05** | การจัดกลุ่มโหนดแบบ HEED (Hybrid Energy-Efficient Distributed Clustering) | พารามิเตอร์หลัก: พลังงานคงเหลือ (Residual Energy), พารามิเตอร์รอง: ต้นทุนในคลัสเตอร์ (AMRP) | วิเคราะห์การเลือกหัวหน้ากลุ่มแบบกระจายศูนย์โดยไม่มีการผูกขาด | MiMo (วิเคราะห์) / Alpha (สถาปัตยกรรม) | PENDING |

---

## ด่านที่ 4: Network Services, Standards, Security and Optimization
**ขอบเขตเนื้อหา:** DataCom บทที่ 13, 14 ร่วมกับ WSN Textbook บทที่ 7-9, 11-14

| รหัสหัวข้อ | ชื่อหัวข้อและแกนความรู้ | สมการและสูตรวิศวกรรมหลัก | รูปแบบโจทย์ข้อสอบที่พบบ่อย | ผู้รับผิดชอบหลัก | สถานะ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **D4-01** | การรวมข้อมูลในเครือข่ายและการสอบถาม (In-Network Data Aggregation & TAG) | ฟังก์ชันแบบ Duplicate-sensitive (SUM, AVG) vs Insensitive (MIN, MAX) | คำนวณการประหยัดพลังงานจากการลดจำนวนแพ็กเก็ตที่ส่งผ่าน Routing Tree | MiMo (คำนวณไบต์) / Alpha (โครงสร้างต้นไม้) | PENDING |
| **D4-02** | การระบุตำแหน่งโหนดเซนเซอร์ (Node Localization: Range-based vs Range-free) | Trilateration (แก้สมการวงกลม 3 วง), Multilateration, RSSI, TOA, TDOA, AOA, Centroid, DV-Hop | คำนวณพิกัด (x, y) จากระยะทาง 3 จุด, ผลของสิ่งกีดขวางต่อค่า RSSI | MiMo (คำนวณพิกัด) / Alpha (Trilateration Sim) | PENDING |
| **D4-03** | การประสานเวลาในเครือข่าย (Time Synchronization: RBS, TPSN, FTSP) | การชดเชย Clock Drift และ Offset, แหล่งความล่าช้า 6 ระดับ (Send, Access, TX, Prop, RX, Receive) | เปรียบเทียบ Receiver-to-Receiver (RBS) กับ Sender-to-Receiver (TPSN, FTSP) | MiMo (คำนวณเวลา) / Alpha (Sync Timeline) | PENDING |
| **D4-04** | โปรโตคอลทรานสปอร์ตและการควบคุมความคับคั่ง (Transport, CODA, ESRT, PSFQ) | การตรวจจับความคับคั่ง (Buffer occupancy, Channel load), การส่งซ้ำแบบ Hop-by-Hop (PSFQ) | ความแตกต่างระหว่าง TCP ดั้งเดิมกับ WSN Transport ที่คำนึงถึงพลังงาน | MiMo (วิเคราะห์) / Alpha (สถาปัตยกรรม) | PENDING |
| **D4-05** | ภัยคุกคามและความปลอดภัยเครือข่าย (WSN Security, Attacks & SPINS) | การโจมตี: Sybil, Wormhole, Sinkhole, Selective Forwarding, HELLO Flood; ระบบ SPINS: SNEP, μTESLA | วิเคราะห์พฤติกรรมการโจมตีแต่ละประเภทและวิธีป้องกันด้วยกุญแจแบบหน่วงเวลา | MiMo (ระบุรูปแบบ) / Alpha (Attack Vectors) | PENDING |
| **D4-06** | มาตรฐาน IEEE 802.15.4 LR-WPAN (PHY and MAC Layers) | ย่านความถี่ 2.4 GHz (16 ช่อง, 250 kbps, O-QPSK), โครงสร้าง Superframe, Beacon, CAP, CFP, GTS | วิเคราะห์โครงสร้างเฟรม, สเปกของ FFD vs RFD, การทำงานแบบ Beacon-enabled | MiMo (สเปกและเวลา) / Alpha (Superframe Diagram) | PENDING |
| **D4-07** | มาตรฐาน ZigBee และ 6LoWPAN (Network Layer & IPv6 Adaptation) | ZigBee Topologies (Star, Tree, Mesh), 6LoWPAN Header Compression (RFC 6282), Fragmentation | คำนวณจำนวนไบต์ที่ประหยัดได้จากการบีบอัด IPv6 Header จาก 40 ไบต์เหลือขนาดเล็ก | MiMo (คำนวณไบต์) / Alpha (Stack Architecture) | PENDING |

---

## สรุปสถานะการติดตาม (Matrix Tracking Summary)
- จำนวนหัวข้อทั้งหมด: 24 หัวข้อย่อย ครอบคลุม 4 ด่านหลัก
- หัวข้อที่เสร็จสิ้นแล้ว: 2 หัวข้อ (D1-01, D1-02)
- หัวข้อที่กำลังดำเนินการ (Active Live Drill): 3 หัวข้อ (D1-03, D1-04, D1-05 ในชุด Drill Set 1)
- หัวข้อคงค้าง (Pending Queue): 19 หัวข้อ
