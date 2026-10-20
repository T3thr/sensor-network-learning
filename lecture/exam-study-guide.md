# ติวสอบ Sensor Network — สรุปจากโฟลเดอร์ `lecture`

> อ้างอิงจากไฟล์: `DatacomChapter1_Remake.pdf` (สไลด์ไทย), `ch01–ch03.pdf` (Forouzan), `iot/305141_Chapter01–06.pdf` (IoT)
> หมายเหตุ: ใน `lecture` ไม่มีเนื้อหา WSN เฉพาะทาง (MAC/routing/energy) — ถ้าข้อสอบรวมส่วนนั้น ให้ดู `textbook/wireless-sensor-networks.pdf` เพิ่ม

## ลำดับความสำคัญ (ดูก่อน–หลัง)
1. **บท 3 Data & Signals** → ออกข้อสอบคำนวณได้มากที่สุด (สูตรด้านล่าง)
2. **บท 2 OSI / TCP-IP / Addressing** → ออกข้อสอบทฤษฎี เทียบชั้น
3. **บท 1 พื้นฐานเครือข่าย** → นิยาม, topology, ประเภทเครือข่าย
4. **IoT บท 1–2** → นิยาม, สถาปัตยกรรม, โปรโตคอล (MQTT, Zigbee, LoRa ฯลฯ)
5. **IoT บท 3–6** → วงจร/ลอจิกเกต/embedded/back-end API (ดูพอเข้าใจ)

---

## 1) บท 1 — พื้นฐานเครือข่าย
**นิยามที่ต้องท่องได้**
| คำ | ความหมาย |
|---|---|
| Computer network | การเชื่อมต่อคอมพิวเตอร์เข้าด้วยกัน (สายหรือไร้สาย) |
| Data communication | การส่งข้อมูล digital/analog ด้วยสัญญาณ digital/analog |
| Telecommunication | การสื่อสารระยะไกล (ศึกษาโทรศัพท์และระบบ) |
| PAN / LAN / MAN / WAN | หลายเมตร / ห้อง-อาคาร-campus / ระดับเมือง (~30 ไมล์) / หลายประเทศ-ทั่วโลก |
| Subnet | กลุ่มของ node + สายส่ง |
| Modem | แปลง digital → analog (modulate) |
| Codec | แปลง analog → digital |
| Multiplexing | ส่งหลายสัญญาณบนสื่อเดียว |

**อุปกรณ์**: Workstation (ที่ผู้ใช้อยู่) · Server (เก็บซอฟต์แวร์/ไฟล์) · Hub (เชื่อม workstation) · Bridge (เชื่อม LAN, กรอง frame) · Switch (ฉลาดกว่า hub/bridge) · **Router (LAN↔WAN, WAN↔WAN)**

**5 องค์ประกอบ data communication**: sender, receiver, message, medium, protocol
**Data flow**: simplex (ทางเดียว) · half-duplex (สองทางสลับกัน) · full-duplex (สองทางพร้อมกัน)
**Topology**: mesh (เชื่อมครบ, n(n−1)/2 links) · star (ผ่าน hub) · bus · ring · hybrid
**Basic configuration (ข้อสอบชอบถามตัวอย่าง)**: terminal→mainframe · microcomputer→LAN (client/server, ต้องมี NIC) · microcomputer→Internet (modem/DSL/cable) · LAN↔LAN (bridge/switch) · PAN→workstation · LAN→MAN · LAN→WAN (router) · **Sensor→LAN (สายพานโรงงาน, หุ่นยนต์, lab)** · satellite/microwave · cellular · telephone (POTS / VoIP)

---

## 2) บท 2 — Network Models

### OSI 7 ชั้น (บนลงล่าง) และหน้าที่ (จำประโยค "responsible for")
| ชั้น | หน้าที่ | หน่วยข้อมูล |
|---|---|---|
| 7 Application | บริการแก่ผู้ใช้ (e-mail, file transfer, remote login) | message |
| 6 Presentation | **แปล, บีบอัด, เข้ารหัส** | message |
| 5 Session | **dialog control + synchronization** (checkpoint) | message |
| 4 Transport | ส่ง message **process-to-process** ครบ ไม่ซ้ำ ลำดับถูก (flow/error control) | segment |
| 3 Network | ส่ง packet **source host → destination host** (logical address, routing) | packet |
| 2 Data link | ส่ง frame **hop-to-hop** (physical address, error/flow control) | frame |
| 1 Physical | เคลื่อนย้าย **bit** hop-to-hop (แรงดัน, connector, encoding, modulation) | bit |

- **ISO = องค์กร, OSI = โมเดล**
- Peer-to-peer process: แต่ละชั้นคุยกับชั้นเดียวกันของอีกฝั่ง (logical connection); มี **physical connection เฉพาะชั้นล่างสุด**
- **Encapsulation**: แต่ละชั้นเติม header (data link เติม trailer ด้วย) ขณะส่งลงไป; ฝั่งรับเอาออกทีละชั้น

### TCP/IP เทียบ OSI
| TCP/IP (5 ชั้น) | OSI |
|---|---|
| Application (FTP, Telnet, HTTP) | Application + Presentation + Session |
| Transport (**TCP, UDP**) | Transport |
| Network/Internet (**IP**) | Network |
| Data link + Physical (network access) | Data link + Physical |
(TCP/IP ดั้งเดิม 4 ชั้น: host-to-network, internet, transport, application)

### Addressing 4 ระดับ
| ระดับ | ขนาด/ตัวอย่าง | เปลี่ยนไหม |
|---|---|---|
| Physical (MAC) | 48 บิต = 12 hex เช่น `07:01:02:01:2C:4B` | **เปลี่ยนทุก hop** |
| Logical (IP) | ระบุ host ข้ามเครือข่าย | **คงเดิม** ต้นทาง→ปลายทาง |
| Port | 16 บิต (เช่น 753) ระบุ process | **คงเดิม** |
| Specific | ระดับ application (e-mail, URL) | คงเดิม |
- Router มี address 1 คู่ (logical+physical) **ต่อ 1 connection/interface**

---

## 3) บท 3 — Data & Signals (หัวใจข้อคำนวณ)

### แนวคิด
- Data ต้องแปลงเป็นสัญญาณแม่เหล็กไฟฟ้าจึงส่งได้
- Analog = ต่อเนื่อง, Digital = ค่าไม่ต่อเนื่อง (discrete)
- ในงานสื่อสาร: ใช้ **periodic analog** และ **nonperiodic digital**
- Sine wave 3 คุณสมบัติ: **amplitude, frequency, phase**
- f = 1/T และ T = 1/f · ความถี่สูง = เปลี่ยนเร็ว; สัญญาณคงที่ f = 0; เปลี่ยนทันที f = ∞
- Phase: 1 cycle = 360° = 2π rad · Wavelength λ = propagation speed × period
- Fourier: composite = ผลรวม sine หลายความถี่; periodic → ความถี่ไม่ต่อเนื่อง (spike), nonperiodic → ต่อเนื่อง
- **Bandwidth (Hz) = f_high − f_low**
- Digital signal = composite analog ที่ bandwidth **อนันต์**
- **Baseband** ต้องใช้ low-pass channel; **Broadband (bandpass channel)** ต้อง **modulate** (เช่น modem ผ่านสายโทรศัพท์, มือถือ)
- Baseband: bandwidth ที่ต้องการ ∝ bit rate (ส่งเร็วขึ้น ต้อง bandwidth มากขึ้น)

### สูตรที่ต้องจำ
| เรื่อง | สูตร |
|---|---|
| ความถี่/คาบ | f = 1/T |
| บิตต่อ level | bits = log₂ L (L = จำนวน level) |
| Bit rate | bits ต่อ level × จำนวน level/วินาที |
| Baseband (harmonic แรก) | B_min = bit rate / 2 (ใช้ harmonic 1,3,5 → ×3, ×5) |
| Attenuation / gain | dB = 10 log₁₀(P₂/P₁) — ครึ่งกำลัง = **−3 dB**, ×10 = **+10 dB** |
| dBm | dBm = 10 log₁₀(P mW) |
| SNR | SNR = P_signal / P_noise ; SNR_dB = 10 log₁₀ SNR |
| **Nyquist** (ไม่มี noise) | **BitRate = 2 × B × log₂ L** |
| **Shannon** (มี noise) | **C = B × log₂(1 + SNR)** (SNR สูงมาก: C ≈ B × SNR_dB / 3) |
| Throughput | bits จริงที่ผ่านต่อวินาที (น้อยกว่า bandwidth) |
| Propagation time | distance / propagation speed |
| Transmission time | message size (bits) / bandwidth (bps) |
| Latency | propagation + transmission + queuing + processing |
| **Bandwidth-delay product** | bandwidth × delay (= จำนวนบิตที่ "เต็มท่อ") |

**Shannon บอก "ขีดสูงสุด" → Nyquist บอก "ต้องใช้กี่ level"**
**สัญญาณรบกวน 3 แบบ (Impairment)**: attenuation (กำลังลด) · distortion (รูปร่างเพี้ยน) · noise
**ข้อควรจำ**: เพิ่ม level ให้ bit rate สูงขึ้นได้ แต่ **ลดความน่าเชื่อถือ**; ข้อความสั้น+bandwidth สูง → propagation เป็นตัวกำหนด; ข้อความยาว+bandwidth ต่ำ → transmission เป็นตัวกำหนด
**Bandwidth มี 2 ความหมาย**: Hz (ช่วงความถี่) และ bps (ความเร็วบิต)

---

## 4) IoT (ไฟล์ `iot/`)

### บท 1 — Introduction
- IoT มีรากจาก **pervasive information systems, sensor networks, embedded computing**
- 2 ลักษณะ: (1) ออกแบบเพื่อแอปพลิเคชันเฉพาะ (2) คำนึงถึง dynamics ของระบบกายภาพ → ประมวลผล **signal / time-series**
- **MEMS sensors** (accelerometer, gyroscope, chemical) ราคา/พลังงานต่ำ ผลักดัน IoT
- ข้อกำหนดหลัก: **ใช้พลังงานต่ำ**, **security + safety** (แยกกันไม่ได้แล้ว)
- ต่างจาก sensor network ดั้งเดิม: ดั้งเดิม = เก็บข้อมูลอัตราต่ำส่ง server ไม่เน้น in-network processing; IoT = ประมวลผลในเครือข่าย
- แอปพลิเคชัน: Smart industrial / building / cities / vehicles / healthcare (+ home, farming)
- **Functional requirements 5 แบบ**: Sensor network (เก็บข้อมูล) · Alert system (แจ้งเตือนเมื่อตรงเงื่อนไข) · Analysis system (วิเคราะห์ต่อเนื่อง/รายงาน) · Reactive system (สั่ง actuator โดยไม่ใช้ control law ทั่วไป) · Control system (ส่งเข้า control algorithm → actuator)
- **Event-driven vs periodic sampling**: periodic เปลืองพลังงาน/bandwidth; event-driven ส่งเมื่อค่าเกินเกณฑ์ (ไม่ใช่ทุกแอปใช้ได้)
- **Edge/Fog/Cloud**: ประมวลผลใกล้ node ลด bandwidth และพลังงาน (วิทยุกินไฟมาก) แล้วค่อยส่ง cloud
- Wireless: ติดตั้งง่ายแต่กินพลังงานมากกว่าสาย และหลายมาตรฐานไม่ได้ออกแบบมาสำหรับ event-driven
- Security: default password, ซอฟต์แวร์มีช่องโหว่, อายุ node หลายปี → ปัญหาค้างนาน; Privacy: ข้อมูลไม่ลับไม่ควรอนุมานข้อมูลลับได้
- Event = time-value set; "stuttering" = ค่า event ซ้ำ

### บท 2 — Architecture & Protocols
- **องค์ประกอบ**: Plant/Environment → **Node** (sensor/actuator+processor+memory+network interface, อาจไม่รัน IP) → **Hub** (รัน IP, เชื่อม node กับเครือข่าย) → **Fog processor** (ลด latency แต่แรงน้อยกว่า cloud, เพิ่มงานจัดการ) → **Cloud** (compute + database)
- **Request/response (HTTP)** vs **Publish/Subscribe**: pub/sub coupling ต่ำ; **broker** รู้ตัวตน subscriber แต่ **publisher ไม่รู้**; จัดตาม **topic**; broker ต่อกันด้วย bridge
- **DDS** (pub/sub, global data space, QoS) · **RTPS** (wire protocol ของ DDS)

| โปรโตคอล | จุดจำ |
|---|---|
| **Zigbee** | mesh พลังงานต่ำ บน **IEEE 802.15.4**; band 868/915 MHz, 2.4 GHz; **20–250 kbps**; ชั้น NWK + APL |
| **BLE** | Bluetooth พลังงานต่ำ (coin cell); advertising/scan; stateful |
| **LoRa** | wide-area, base station ครอบคลุมหลายร้อย ตร.กม.; star-of-gateways; **0.3–50 kbps** |
| **MQTT** | pub/sub overhead ต่ำ; **QoS 0 at most once / QoS 1 at least once (อาจซ้ำ) / QoS 2 exactly once**; retained message |
| **REST** | GET / PUT / POST / DELETE; ข้อมูล XML/JSON |
| **CoAP** | REST-based สำหรับอุปกรณ์ IoT |
| **XMPP** | streaming XML |
| AWS IoT | thing, **thing shadow**, rule engine, broker แบบ MQTT, Thing Registry |
- **noSQL**: ไม่มี schema, key-value → deploy เร็วแต่ข้อมูลไม่สม่ำเสมอ
- **Time sync**: Lamport, NTP (RFC1305)
- **Security**: lightweight cipher SIMON (hardware) / SPECK (software); BLE secure pairing + address randomization; Zigbee centralized/distributed; LoRa network key + application key

### บท 3–4 — Electronics & Digital logic (สไลด์ไทย)
- Analog = ต่อเนื่อง ไวต่อ noise; Digital = 2 ระดับ (0/1) ทนต่อ noise กว่า (TTL: low ≈ 0 V, high ≈ 5 V)
- สวิตช์ + **pull-down** (ปกติ 0 V, กดเป็น 1) / **pull-up** (ปกติ 1, กดเป็น 0)
- Logic gates: NOT, AND, OR, NAND, XOR · Combinational เช่น MUX 2:1
- Smart Home / City / Industry / Health / Farming

### บท 5–6 — Back-end & Application
- Back-end จัดการข้อมูล/เนื้อหาที่แสดงบนแอป; แอปเรียกข้อมูลผ่าน **RESTful API** (JSON/XML)
- API = ตัวกลางเชื่อมระบบ ลดความซับซ้อนและข้อผิดพลาด

---

## 5) โจทย์ฝึก (พร้อมเฉลย) — ลองทำก่อนดูเฉลย
1. สัญญาณ periodic ประกอบด้วย 100, 300, 500, 700, 900 Hz — bandwidth เท่าไร?
2. Bandwidth 20 Hz, ความถี่สูงสุด 60 Hz — ความถี่ต่ำสุด?
3. คาบ 100 ms — ความถี่กี่ kHz?
4. Sine wave เลื่อน 1/6 cycle — phase กี่องศา/เรเดียน?
5. สัญญาณมี 8 level ใช้กี่บิตต่อ level? ถ้า 9 level ต้องใช้กี่บิตจริง?
6. ดาวน์โหลดข้อความ 100 หน้า/นาที (24 บรรทัด × 80 ตัวอักษร, 8 บิต/ตัว) — bit rate?
7. เสียง 4 kHz sample 2 เท่า, 8 บิต/sample — bit rate?
8. ส่ง 1 Mbps แบบ baseband — bandwidth ขั้นต่ำ? ถ้าใช้ harmonic 1,3,5?
9. กำลังสัญญาณลดเหลือครึ่ง → กี่ dB? ขยายกำลัง 10 เท่า → กี่ dB?
10. −30 dBm = กี่ mW?
11. สายมี loss −0.3 dB/km, กำลังเริ่มต้น 2 mW, ยาว 5 km — กำลังปลายทาง?
12. signal 10 mW, noise 1 µW — SNR และ SNR_dB?
13. Nyquist: channel ไร้ noise 3000 Hz, 2 level → bit rate? ถ้า 4 level?
14. ต้องส่ง 265 kbps บน channel ไร้ noise 20 kHz — ต้องกี่ level? (ปัดให้เป็นกำลัง 2)
15. Shannon: สายโทรศัพท์ B = 3000 Hz, SNR = 3162 — capacity?
16. B = 2 MHz, SNR_dB = 36 — capacity (ประมาณ)?
17. B = 1 MHz, SNR = 63 — capacity? ถ้าเลือกส่ง 4 Mbps ต้องกี่ level?
18. เครือข่าย 10 Mbps ผ่านได้ 12,000 frames/นาที, frame ละ 10,000 บิต — throughput?
19. propagation time ระยะ 12,000 km, ความเร็ว 2.4×10⁸ m/s?
20. ส่งอีเมล 2.5 kB บน 1 Gbps ระยะ 12,000 km — propagation vs transmission อะไรสำคัญกว่า? แล้วรูป 5 MB บน 1 Mbps?
21. (ทฤษฎี) เหตุใด physical address เปลี่ยนทุก hop แต่ IP และ port ไม่เปลี่ยน?
22. (ทฤษฎี) ต่างกันอย่างไรระหว่าง polling-style periodic sampling กับ event-driven ใน IoT และข้อดีของ edge processing?
23. (ทฤษฎี) MQTT QoS ทั้ง 3 ระดับต่างกันอย่างไร? Publisher/Broker/Subscriber ใครรู้จักใคร?
24. (ทฤษฎี) เทียบ 5 ชั้น TCP/IP กับ 7 ชั้น OSI และยกตัวอย่างโปรโตคอลแต่ละชั้น

### เฉลย
1. 900 − 100 = **800 Hz**
2. 60 − 20 = **40 Hz**
3. f = 1/0.1 s = 10 Hz = **0.01 kHz**
4. (1/6)×360 = **60°** = **π/3 rad**
5. log₂8 = **3 บิต**; 9 level → log₂9 = 3.17 → ปัดเป็น **4 บิต** (ต้องเป็นจำนวนเต็ม/กำลัง 2)
6. 100×24×80×8 / 60 = **25,600 bps**
7. 4000×2 = 8000 sample/s × 8 = **64 kbps**
8. **500 kHz** (= 1 Mbps/2); harmonic 1,3,5 → **2.5 MHz** (harmonic 1,3 → 1.5 MHz)
9. **−3 dB**; ×10 → 10 log₁₀10 = **+10 dB**
10. 10^(−30/10) = 10⁻³ mW = **0.001 mW (1 µW)**
11. loss = 5×(−0.3) = −1.5 dB → P₂ = 2×10^(−0.15) ≈ **1.41 mW**
12. SNR = 10 mW / 0.001 mW = **10,000**; SNR_dB = **40 dB**
13. 2×3000×log₂2 = **6000 bps**; 4 level → 2×3000×2 = **12,000 bps**
14. 265000 = 2×20000×log₂L → log₂L = 6.625 → L ≈ 98.7 → ใช้ **128 level** (280 kbps) หรือลดเป็น 64 level (240 kbps)
15. 3000×log₂(1+3162) = 3000×11.62 ≈ **34.86 kbps**
16. SNR = 10^3.6 ≈ 3981 → C = 2×10⁶ × log₂(3982) ≈ **23.9 Mbps** (ประมาณ: 2×36/3×... ≈ 24 Mbps)
17. C = 10⁶ × log₂64 = **6 Mbps**; เลือก 4 Mbps → 4×10⁶ = 2×10⁶×log₂L → log₂L = 2 → **L = 4 level**
18. (12,000 × 10,000) / 60 = **2 Mbps** (≈ 1/5 ของ bandwidth)
19. 12×10⁶ m / 2.4×10⁸ = **0.05 s = 50 ms**
20. อีเมล: transmission = 20,000 bits / 10⁹ = **20 µs**, propagation = **50 ms** → **propagation สำคัญกว่า**. รูป: transmission = 40×10⁶ / 10⁶ = **40 s**, propagation 50 ms → **transmission สำคัญกว่า**
21. Physical address ระบุ node แค่ในลิงก์เดียวกัน (hop นั้น) จึงถูกแทนทุกครั้งที่ router ส่งต่อ; IP ระบุปลายทางทั้งเส้นทาง และ port ระบุ process ปลายทาง จึงต้องคงเดิมตั้งแต่ต้นทางถึงปลายทาง
22. Periodic: อ่าน/ส่งค่าทุกรอบ → เปลืองพลังงานและ bandwidth; Event-driven: ส่งเฉพาะเมื่อค่าเกินเกณฑ์/เปลี่ยน → ประหยัด (แต่ไม่ใช่ทุกแอปใช้ได้). Edge: คัดกรอง/ตรวจจับ event ใกล้ node ก่อน → ลดข้อมูลที่ส่งออก ลดพลังงาน (วิทยุกินไฟมาก) และลด latency
23. QoS0 ส่งอย่างมากหนึ่งครั้ง (best effort, อาจหาย); QoS1 ส่งอย่างน้อยหนึ่งครั้ง (ถึงแน่แต่อาจซ้ำ); QoS2 ส่งครั้งเดียวพอดี. Broker รู้จัก subscriber; publisher ไม่รู้จัก subscriber; ทุกฝ่ายสื่อสารผ่าน topic ที่ broker
24. Application (HTTP, FTP, Telnet) ≈ OSI 5–7; Transport (TCP, UDP) = OSI 4; Network (IP) = OSI 3; Data link + Physical = OSI 2 + 1

---

## 6) เคล็ดลับวันสอบ
- ข้อคำนวณ: **เขียนสูตร → แทนหน่วยให้ตรง (Hz/kHz, s/ms, byte/bit) → คำตอบพร้อมหน่วย**
- ระวัง **byte vs bit** (×8) และ **dB vs ratio** (SNR ต้อง 10^(dB/10) ก่อนใส่ Shannon)
- จำคีย์เวิร์ดประจำชั้น OSI: bit / frame / packet / process-to-process / dialog / translation-compression-encryption / user service
- ทุกชั้น "คุยกับชั้นเดียวกัน" แต่ทางกายภาพเชื่อมเฉพาะชั้นล่างสุด
- สายตรง: Nyquist = ไม่มี noise, Shannon = มี noise
