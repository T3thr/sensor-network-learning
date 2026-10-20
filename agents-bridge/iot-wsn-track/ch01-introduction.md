# IoT and WSN Track: Chapter 1
# บทที่ 1 บทนำเครือข่ายเซนเซอร์ไร้สายและกายวิภาคโหนด

## Document Control

| Field | Value |
|---|---|
| Track | IoT and Wireless Sensor Networks |
| Owner | Agent Bravo (Field Systems Engineer and IoT/WSN Track Specialist) |
| Canonical Sources | `textbook/wireless-sensor-networks.pdf` Chapter 1; `lecture/DataCom_Forouzan/pdf/305141_Chapter01-02.pdf` (IoT overview and architecture) |
| DataCom Bridge | Agent Alpha track: DataCom Ch 3 (signals, Shannon, Nyquist), Ch 7 (transmission media) |
| Status | STRUCTURE READY FOR TEACHING |
| Last Updated | 2026-10-19T16:51:44Z |

Zero-Emoji Policy and Zero-Dollar-Sign Policy are in force. Formulas use Unicode and code blocks only.

---

## 0. Why This Chapter Exists (ที่มาทางประวัติศาสตร์)

แนวคิด Wireless Sensor Network (WSN, ดับ-เบิล-ยู-เอส-เอ็น) ไม่ได้เกิดจากยุค IoT marketing
ตำรา Zheng และ Jamalipour บันทึกไว้ว่า แนวคิดนี้ถูกนำเสนอตั้งแต่ราว 3 ทศวรรษก่อนหน้าการตีพิมพ์หนังสือ (ค.ศ. 2009)
ในยุคนั้นมันเป็น more vision than technology เพราะยังติดเพดาน 3 ด้านพร้อมกัน:

1. เซนเซอร์ยังใหญ่ แพง และกินไฟ
2. หน่วยประมวลผลฝังตัวยังมีพลังคำนวณและหน่วยความจำจำกัด
3. การสื่อสารไร้สายระยะใกล้ยังไม่มีมาตรฐานราคาถูกที่ใช้พลังงานต่ำจริง

จุดเปลี่ยนคือเทคโนโลยี 3 ตัวที่มาบรรจบกัน:
- MEMS (ไมโคร-อิเล็กโทร-เมคานิคัล ซิสเต็มส์) ทำให้เซนเซอร์และเครื่องกลจิ๋วลง ถูกลง ผลิตแบบ batch ได้
- การออกแบบวงจร Low-Power และเทคนิค DPM/DVS ทำให้ MCU และทรานซีฟเวอร์อยู่ได้ด้วยถ่าน
- มาตรฐาน IEEE 802.15.4 และ ZigBee ทำให้ฮาร์ดแวร์จากหลายผู้ผลิตคุยกันรู้เรื่อง

บทเรียนประวัติศาสตร์สำหรับข้อสอบ:
> WSN ไม่ใช่ "Internet ที่ย่อขนาด" แต่คือระบบฝังตัวที่ถูกบังคับด้วยฟิสิกส์และพลังงานก่อน แล้วค่อยเชื่อมขึ้นสู่เครือข่าย

---

## 1. Learning Objectives (เป้าหมายการเรียนรู้)

เมื่อจบบทนี้ นิสิตต้องทำได้:

1. แยกแยะ WSN ออกจาก Cellular, MANET, และ WLAN โดยใช้ลักษณะเฉพาะ 10 ข้อ
2. อธิบายกายวิภาคโหนดเซนเซอร์ 4 บล็อกหลัก และเชื่อมกับโปรไฟล์กินไฟจริง
3. โยง Shannon Capacity และ Path Loss จาก DataCom เข้ากับข้อจำกัดอัตราส่งข้อมูลของโหนด
4. ระบุหน้าที่ของ MEMS, TinyOS, Berkeley Mote และมาตรฐาน 802.15.4 / ZigBee / IEEE 1451
5. ตอบคำถามระดับ concept check เรื่อง design objective trade-off และ energy bottleneck

---

## 2. Network Characteristics (ลักษณะเฉพาะที่ข้อสอบชอบถาม)

WSN ประกอบด้วยโหนดจำนวนมาก ต้นทุนต่ำ พลังงานต่ำ ฟังก์ชันครบ คือ sense + process + communicate
เทียบกับเครือข่ายไร้สายเดิม (cellular, MANET) แล้ว WSN ต่างใน 10 จุดนี้

| ลำดับ | ลักษณะ | คำอ่าน | ความหมายเชิงฮาร์ดแวร์และเครือข่าย | ทำไมข้อสอบถึงเอาไปออก |
|---|---|---|---|---|
| 1 | Dense Node Deployment | เดนส์ โนด ดีพลอยเมนต์ | วางโหนดหนาแน่น จำนวนอาจมากกว่า MANET หลาย order of magnitude | ทำให้ข้อมูลซ้ำซ้อน และต้องมี data aggregation |
| 2 | Battery-Powered Nodes | แบต-ทอรี-พาวเวอร์ด โนดส์ | ถ่านเป็นแหล่งพลังงานหลัก สนามจริงเปลี่ยนยาก | เป็น root cause ของทุก protocol ที่เน้น sleep |
| 3 | Severe Energy, Computation, Storage Constraints | ซีเวียร์ คอนสเตรนท์ส | RAM/ROM/CPU/clock พลังงานมีน้อยมาก | บังคับให้ algorithm เบากว่าฝั่ง Internet ทั่วไป |
| 4 | Self-Configurable | เซลฟ์-คอนฟิก-เกอเรเบิล | ปล่อยแบบสุ่มแล้วต้องจัดตัวเองเป็นเครือข่าย | โยงกับ neighbor discovery และ clustering |
| 5 | Application Specific | แอพ-พลิ-เค-ชัน สเป-ซิ-ฟิก | ออกแบบต่อแอป ไม่มี one-size-fits-all | ออกเป็นข้อ trade-off ระหว่าง objective |
| 6 | Unreliable Sensor Nodes | อัน-รี-ไล-อะ-เบิล | อยู่ในที่โหด ไม่มีคนดูแล พังง่าย | ต้อง fault tolerance |
| 7 | Frequent Topology Change | ฟรี-เควนท์ โท-โพ-โล-จี เชนจ์ | โหนดตาย ไฟหมด ช่องสัญญาณ fading | routing ต้อง adaptive |
| 8 | No Global Identification | โน โกล-บอล ไอ-เดน-ทิ-ฟิ-เค-ชัน | ไม่ค่อยใช้ global address แบบ IP เพราะ overhead สูง | จุดเกิดของ data-centric routing |
| 9 | Many-to-One Traffic Pattern | เมนี-ทู-วัน แทรฟ-ฟิก | ข้อมูลไหลจากหลายเซนเซอร์เข้า sink เดียว | เกิด hotspot ที่โหนดใกล้ sink |
| 10 | Data Redundancy | เดา-ตะ รี-ดัน-แดน-ซี | โหนดหนาแน่น วัดค่าซ้ำกันเยอะ | aggregation ช่วยลดพลังงาน |

### Mental Model A: WSN ไม่ใช่ Internet จิ๋ว

```text
Internet mindset:  node has stable IP, mains power or big battery, high RAM,
                   many-to-many traffic, global addressing is cheap
WSN mindset:       node is disposable, AA coin cell or 2xAA, few KB RAM,
                   many-to-one to sink, address is often location or data attribute
```

ถ้าแกยังคิด protocol แบบ "เปิด TCP socket ไว้ตลอดเวลา" แกกำลังฆ่าถ่านของโหนดด้วย idle listening

---

## 3. Applications (ตัวอย่างที่ใช้ได้จริง)

| กลุ่ม | ตัวอย่างจากตำรา | ข้อจำกัดที่ต้องออกแบบรับมือ |
|---|---|---|
| Environmental Monitoring | Habitat monitoring ที่ Great Duck Island ใช้เซนเซอร์ 190 ตัว วัด humidity, pressure, temperature, radiation | ถ่านหมดเร็ว, เข้าถึงซ่อมยาก |
| Military | Battlefield monitoring, object protection, intelligent guiding, remote sensing NBC | ต้อง self-config, fault-tolerant, ปลอดภัย |
| Health Care | WBAN (Wireless Body Area Network) ติดตาม vital signs, fall detection | ต้อง noninvasive, latency ต่ำเมื่อฉุกเฉิน, เชื่อใจได้ |
| Industrial Process | ท่อในโรงกลั่น, จุดที่มนุษย์เข้าไม่ถึงในเครื่องจักร | โลหะเยอะ เกิด multipath, ต้อง reliability สูง |
| Security and Surveillance | ตรวจจับผู้บุกรุกในอาคาร สนามบิน โครงสร้างพื้นฐาน | บางแอปยอมตั้ง infrastructure ได้ |
| Home Intelligence | Smart home, remote metering | ต้นทุนต่อโหนดต่ำมาก |

ตัวเลขที่ควรจำ:
- งานวิจัย Great Duck Island: 190 โหนด
- WSN ระดับทั่วไป: ตั้งแต่ tens ถึง thousands โหนด
- Traffic หลัก: many-to-one เข้า sink

---

## 4. Design Objectives vs Design Challenges

### 4.1 Objectives (เป้าหมาย 11 ด้าน)

กลุ่มที่ 1 ต้นทุนและขนาด: Small Node Size, Low Node Cost
กลุ่มที่ 2 พลังงาน: Low Power Consumption (สำคัญที่สุด)
กลุ่มที่ 3 จัดการตัวเอง: Self-Configurability, Scalability, Adaptability
กลุ่มที่ 4 ความน่าเชื่อถือ: Reliability, Fault Tolerance, Security
กลุ่มที่ 5 ประสิทธิภาพและบริการ: Channel Utilization, QoS Support

ข้อสอบ trap บ่อย:
> "ออกแบบ WSN ให้ครบทั้ง 11 วัตถุประสงค์พร้อมกัน"
> คำตอบที่ถูก: ทำไม่ได้เชิงปฏิบัติ เพราะเป้าหมายขัดแย้งกัน ต้องเลือกตามแอปพลิเคชัน

ตัวอย่าง trade-off ที่ต้องตอบได้:
- เพิ่ม reliability ด้วย retransmission มาก ขึ้น → ไฟหมดเร็วขึ้น
- เพิ่ม security ด้วย encryption หนัก ขึ้น → CPU wake นานขึ้น ไฟหมดเร็วขึ้น
- เพิ่ม QoS ลด latency ด้วยให้โหนดฟังตลอด → idle listening กินไฟมหาศาล
- ลด cost ด้วยชิปถูก RAM น้อย → routing/aggregation ซับซ้อนมากไม่ได้

### 4.2 Challenges (ความท้าทาย 5 ด้าน)

1. Limited Energy Capacity
2. Limited Hardware Resources
3. Massive and Random Deployment
4. Dynamic and Unreliable Environment
5. Diverse Applications

### Mental Model B: กฎเหล็กด้านพลังงาน

```text
Network lifetime is NOT limited by algorithm cleverness first.
It is limited by joules stored in the battery and milliamps drawn by the radio.

E_battery คือ งบประมาณ
E_TX, E_RX, E_sleep คือ ค่าใช้จ่ายรายวินาที
Protocol ที่ดีคือ protocol ที่ลดเวลาที่ทรานซีฟเวอร์อยู่ในสถานะกินไฟแพง
```

---

## 5. Node Anatomy (กายวิภาคโหนด)

### 5.1 บล็อกหลัก 4 ส่วน

```text
+-------------------+     +-------------------+     +-------------------+
|   Sensor Unit     | --> |  Processing Unit  | <-> |  Transceiver Unit |
| ADC + sensing     |     | MCU + memory      |     | TX / RX / radio   |
+-------------------+     +-------------------+     +-------------------+
                                  ^
                                  |
                         +-------------------+
                         |   Power Unit      |
                         | battery + PMIC    |
                         +-------------------+
```

| บล็อก | หน้าที่ | ตัวอย่างฮาร์ดแวร์จริง | ข้อจำกัดที่ต้องไม่ลืม |
|---|---|---|---|
| Sensor Unit | วัด physical parameter แล้วแปลงเป็นดิจิทัลผ่าน ADC | temperature, humidity, light, accelerometer | analog sensor ต้องมี ADC; digital sensor มี bus ของตัวเอง |
| Processing Unit | คำนวณ กรอง เตรียมแพ็กเก็ต ควบคุมสถานะ | MCU 8/16/32 bit บน mote | RAM/flash น้อย ต้องหลีก allocation ใหญ่ |
| Transceiver Unit | แปลงบิตเป็นคลื่นวิทยุ และรับกลับ | CC2420 (2.4 GHz 802.15.4) | TX/RX/Sleep กินไฟต่างกันมาก |
| Power Unit | จ่ายไฟให้ทั้งบอร์ด | 2 x AA, coin cell, บางงาน energy harvesting | ความจุจำกัด เปลี่ยนยาก |

### 5.2 Hardware Platform Classes (3 กลุ่ม)

| คลาส | ตัวอย่าง | จุดแข็ง | จุดอ่อน |
|---|---|---|---|
| Augmented General-Purpose PC | PC104, PDA, embedded Linux/WinCE | คำนวณแรง รัน protocol ซับซ้อนได้ | กินไฟสูง ต้นทุนสูง |
| Dedicated Sensor Node | Berkeley Mote family, UCLA Medusa, MIT uAMP | เล็ก ถูก ต่ำกำลัง มี sensor interface เรียบง่าย | ทรัพยากรจำกัด |
| System-on-Chip (SoC) | Smart Dust, BWRC PicoNode | เล็กมาก ต่ำกำลังสุดขีด | ออกแบบยาก ผลิตยาก |

Berkeley Mote คือแพลตฟอร์มที่วงการวิจัยใช้กันมากสุด เพราะ:
- form factor เล็ก
- software เปิด (TinyOS / nesC)
- หาซื้อได้จริงในเชิงพาณิชย์

### 5.3 Software Platforms

| แพลตฟอร์ม | ประเภท | จุดเด่นที่ต้องสอบได้ |
|---|---|---|
| TinyOS | OS | event-driven, ใช้หน่วยความจำเพียง 178 bytes, รองรับ multitasking และ code modularity, ไม่มี file system, static memory allocation เท่านั้น |
| nesC | Language | ส่วนขยายของภาษา C สำหรับเขียน component ของ TinyOS |
| TinyGALS | Language/concurrency model | จัดการ concurrency ที่ system level |
| Mote | Virtual machine | abstract คำสั่งยอดนิยมเช่น poll sensor เพื่อย้ายโค้ดข้ามฮาร์ดแวร์ |

ตัวเลข 178 bytes ของ TinyOS คือหลักฐานว่าทำไมเราถึงเอา OS ทั่วไปแบบ Linux desktop มาใช้ตรงๆ ไม่ได้ในโหนดระดับ mote ยุคแรก

### 5.4 Power Profile ที่ใช้สอบและใช้ทำงานจริง

ค่าตัวเลขจริงจากทรานซีฟเวอร์ตระกูล 802.15.4 (เช่น CC2420 บน TelosB/MicaZ) อยู่ในลักษณะนี้:

```text
Typical order of magnitude at V = 3 V
I_TX   ~ 17 mA     (transmit)
I_RX   ~ 19 mA     (receive / idle listen)
I_sleep ~ 0.01-0.03 mA  (deep sleep)
```

สิ่งที่ต้องตีให้แตก:
- RX บางครั้งกินมากกว่า TX เพราะเป็นช่วงเปิด front-end ค้างไว้ฟัง noise
- Sleep กินน้อยกว่า active หลายร้อยถึงหลายพันเท่า
- นี่คือเหตุผลทางฮาร์ดแวร์ที่ทำให้เกิด S-MAC, T-MAC, duty cycling

สูตรพลังงานพื้นฐาน:

```text
E = V * I * t
P = V * I
I_avg = D_tx*I_tx + D_rx*I_rx + D_sleep*I_sleep
โดย D_tx + D_rx + D_sleep = 1
```

อายุถ่านโดยประมาณ:

```text
Battery life (h) = (Capacity_mAh * Usable_fraction) / I_avg_mA
```

---

## 6. Technological Background

### 6.1 MEMS (ไมค-โคร อิเล็ก-โทร-เมค-อะ-นิ-คัล ซิ-สเต็มส์)

- ใช้ micromachining สร้างชิ้นส่วนกลจิกระดับไมครอน ควบคุมด้วยไฟฟ้า
- เทคนิค: planar, bulk, surface micromachining
- แผ่นฐาน (substrate) มักเป็น silicon หนาตามที่ตำราระบุในช่วงไมครอนถึงมิลลิเมตร แล้วผ่าน deposition, photolithography, etching, oxidation, electroplating, wafer bonding
- รวม CMOS เข้ากับ micromachining ได้ → ย่อ sensor + analog front-end + digital ลงชิปเดียว
- ผลลัพธ์: ขนาดเล็กลง ต้นทุนลดผ่าน batch fabrication กำลังงานลด

### 6.2 Wireless Medium Choice

| Medium | ข้อดี | ข้อเสีย | เหมาะกับ WSN ไหม |
|---|---|---|---|
| RF (microwave / mmWave) | ไม่ต้อง line of sight, กระจายรอบทิศ | antenna ยังไม่เล็กที่สุด, efficiency ต่ำ | ใช้เป็นหลักใน WSN ปัจจุบัน |
| Free-space optical | radiator เล็กมาก, antenna gain สูง, ใช้ SDMA ได้ | ต้อง line of sight และเล็งแม่น | เฉพาะบางแอป |

### 6.3 Power Management Techniques

| เทคนิค | ชื่อเต็ม | ทำอะไร |
|---|---|---|
| DPM | Dynamic Power Management | ปิดหรือลดสถานะ component ที่ไม่ได้ใช้ |
| DVS | Dynamic Voltage Scaling | ลดแรงดัน/ความถี่เมื่อ workload ต่ำ |
| Duty Cycling | ไม่มีชื่อย่อมาตรฐาน | สลับ active/sleep ตามตารางหรือ traffic |

ตำราระบุว่า DVS ตามด้วย power management ให้ประสิทธิภาพพลังงานสูงกว่าการ shutdown อย่างเดียวในหลายกรณี

---

## 7. Standards Snapshot (ฐานของบท 13-14)

### 7.1 IEEE 802.15.4 (ไอ-ที-อี อีท-แปด-ร้อย-สิบ-ห้า จุด สี่)

เป้าหมายตาม PAR ของ Task Group 4:
> ultralow complexity, ultralow cost, ultralow power consumption, low-data rate wireless connectivity among inexpensive devices

ฟีเจอร์หลัก:
- อัตราข้อมูล 250 kbps, 40 kbps, 20 kbps
- addressing 2 แบบ: 16-bit short และ 64-bit IEEE
- CSMA-CA
- network establishment โดย coordinator
- handshaking เพื่อความน่าเชื่อถือ
- power management ในตัว

ย่านความถี่:

| Band | Region | Data rate | Channels |
|---|---|---|---|
| 868-868.6 MHz | Europe | 20 kbps | 1 |
| 902-928 MHz | North America | 40 kbps | 10 |
| 2400-2483.5 MHz | Worldwide | 250 kbps | 16 |

PHY ทำหน้าที่ activate/deactivate radio และส่งแพ็กเก็ต
MAC ทำ data service, management service (sync, timeslot, association), และ security พื้นฐาน

### 7.2 ZigBee

- สร้างทับ IEEE 802.15.4
- เติม Network Layer และ Application Layer
- topology ที่นิยม: star, tree, mesh
- ดูแลโดย ZigBee Alliance เปิดตัวปลายปี ค.ศ. 2004

### 7.3 IEEE 1451

- ตระกูล Smart Transducer Interface Standards
- เชื่อม sensor/actuator เข้ากับไมโครโปรเซสเซอร์และเครือข่ายแบบ independent
- จุดเด่นคือ TEDS (Transducer Electronic Data Sheets) เก็บ calibration, ID, range, ผู้ผลิต

---

## 8. Bridge to Agent Alpha DataCom Track

| DataCom concept | ค่าหรือสูตร | ผลกระทบต่อ WSN node |
|---|---|---|
| Shannon Capacity | C = B * log2(1 + SNR) | อัตราข้อมูล 250 kbps ของ 802.15.4 ต่ำกว่าเพดานแชนนอนมาก เพราะเลือก robustness และพลังงานต่ำ |
| Nyquist Bit Rate | R = 2 * B * log2(L) | การเพิ่ม L ทำให้เสี่ยง error มากขึ้น จึงมักใช้ modulation ที่ไม่ซับซ้อน |
| Attenuation / Path Loss | dB = 10 log10(P2/P1) | ระยะทาง สิ่งกีดขวาง และ multipath กำหนดว่า TX power ต้องใช้เท่าไร |
| SNR | SNR = P_signal / P_noise | ต่ำกว่า sensitivity ของ radio แล้วแพ็กเก็ตตาย |
| Bandwidth | B = f_high - f_low | ช่อง 2.4 GHz 802.15.4 มี channel plan 16 ช่อง |

สมการที่ใช้ต่อในด่าน Link Budget:

```text
P_rx_dBm = P_tx_dBm + G_tx_dBi + G_rx_dBi + 20*log10(lambda / (4*pi*d))
lambda = c / f
c = 3 * 10^8 m/s
```

---

## 9. Interactive Checklist (ทำเครื่องหมายเมื่อตอบได้ด้วยตัวเอง)

### Concept Checklist

- [ ] บอกลักษณะเฉพาะของ WSN ได้อย่างน้อย 8 ข้อ และยกตัวอย่างฮาร์ดแวร์รองรับแต่ละข้อ
- [ ] อธิบายว่าทำไม WSN จึงไม่มี global ID แบบ IP และผลต่อ routing
- [ ] วาดกายวิภาคโหนด 4 บล็อก และบอกสเปกการกินไฟ TX/RX/Sleep
- [ ] แยก hardware platform 3 กลุ่ม และบอกว่า Berkeley Mote อยู่กลุ่มไหน
- [ ] บอกได้ว่า TinyOS ใช้หน่วยความจำเท่าไร และทำไมจึงไม่มี dynamic memory แบบ desktop OS
- [ ] ระบุอัตราข้อมูลและย่านความถี่ของ IEEE 802.15.4 ได้ครบทั้ง 3 band
- [ ] อธิบายว่า ZigBee เติม layer ไหนทับ 802.15.4
- [ ] บอกบทบาทของ TEDS ใน IEEE 1451
- [ ] ยกตัวอย่าง trade-off ระหว่าง Low Power, Reliability, QoS, Security ได้อย่างน้อย 2 คู่
- [ ] โยง Shannon/Nyquist/SNR จาก DataCom เข้ากับข้อ 250 kbps ของ WSN ได้

### Calculation Checklist

- [ ] คำนวณ lambda ที่ 868 MHz, 915 MHz, 2.4 GHz
- [ ] คำนวณ I_avg จาก duty cycle
- [ ] ประมาณอายุถ่านจาก I_avg และความจุที่ใช้ได้จริง
- [ ] ทำ Link Budget เบื้องต้นเป็น dBm

---

## 10. Mental Model Summary

### 1) Physical constraint comes first
ถ่าน คลื่นวิทยุ และซิลิคอน เป็นตัวกำหนดเพดาน ส่วน protocol เป็นเพียงวิธีใช้ทรัพยากรใต้เพดานนั้น

### 2) Radio is the energy hog
ใน WSN ทั่วไป ทรานซีฟเวอร์กินไฟเกินกว่า MCU และ sensor รวมกัน ดังนั้น MAC และ duty cycle จึงเป็นเรื่องพลังงานชั้นต้น ไม่ใช่เรื่องต่อท้าย

### 3) Data-centric beats address-centric
เพราะไม่มี global ID ที่ถูก และข้อมูลมี redundancy สูง งานหลักคือส่ง "ความรู้" เข้า sink ไม่ใช่ส่ง "แพ็กเก็ตไปยัง IP ปลายทาง"

### 4) Application specificity is not optional
ไม่มี protocol ตัวเดียวชนะทุกแอป ข้อสอบมักให้โจทย์แอปหนึ่ง แล้วถามว่า objective ไหนสำคัญสุด

### 5) Standards split the stack
802.15.4 คุม PHY และ MAC, ZigBee เติม NET/APP, IEEE 1451 คุมหน้าสัมผัส transducer

---

## 11. Historical Timeline (ไว้ตอบข้ออัตนัย)

| ช่วงเวลา | เหตุการณ์ |
|---|---|
| ประมาณ 3 ทศวรรษก่อน ค.ศ. 2009 | แนวคิด WSN ถูกเสนอเป็น vision |
| ยุคเริ่มต้น | ใช้ในระบบทหารขนาดใหญ่เป็นหลัก |
| ค.ศ. 2003 | IEEE 802.15.4 release แรก |
| ปลายปี ค.ศ. 2004 | ZigBee protocol stack เสนอโดย ZigBee Alliance |
| ค.ศ. 2006 | ปรับปรุง 802.15.4 และ ZigBee |
| ยุค Berkeley Mote | แพลตฟอร์มวิจัยและ TinyOS แพร่หลาย |

---

## 12. Cross-Chapter Map of This Track

| บทถัดไป | หัวข้อ | พื้นฐานที่ต้องมีจากบทนี้ |
|---|---|---|
| Ch 2 | Network Architectures and Protocol Stack | Node anatomy, many-to-one, flat vs hierarchical |
| Ch 3 | MAC (S-MAC, T-MAC, Z-MAC) | TX/RX/Sleep power, dense deployment |
| Ch 4 | Routing and Data Dissemination | No global ID, redundancy, energy model |
| Ch 5-6 | Broadcast, Geocast, Clustering (LEACH/HEED) | Topology change, scalability |
| Ch 7 | Query Processing and Data Aggregation | Data redundancy |
| Ch 8-9 | Localization and Time Sync | Limited hardware, unreliable links |
| Ch 10 | Energy Efficiency and Power Control | Power unit, DPM/DVS |
| Ch 11-12 | Transport/QoS and Security | QoS objective, security objective |
| Ch 13-14 | 802.15.4, ZigBee, 6LoWPAN | Standards section ของบทนี้ |

---

## 13. Open Drill Hooks for Agent Bravo Live Session

ใช้ยิงใน Terminal เป็นชุดต่อจาก Concept Check 1:

1. ถ้า TinyOS ใช้ RAM 178 bytes แต่ buffer แพ็กเก็ต 802.15.4 MTU 127 bytes แล้ว stack ต้องเก็บ RX buffer 2 ชุด ยังเหลือ RAM ให้ routing table กี่ byte และแบบนี้ออกแบบ routing แบบ full IP ได้ไหม
2. duty cycle 0.5% TX + 0.5% RX + 99% sleep ที่ I_TX = 17 mA, I_RX = 19 mA, I_sleep = 0.02 mA, V = 3 V ได้ I_avg เท่าไร และถ่าน 2500 mAh ใช้ได้กี่ปีถ้านับ usable 80%
3. ความถี่ 2.4 GHz ให้ lambda เท่าไร และ antenna quarter-wave มีขนาดประมาณกี่เซนติเมตร

---

## 14. Source Anchors

- Textbook Chapter 1 sections 1.1 to 1.2 (Overview, Characteristics, Applications, Objectives, Challenges, MEMS, Wireless, Platforms, Standards)
- IoT lecture 305141 Chapter 01-02 (IoT meaning, components, architecture)
- DataCom bridge: Forouzan Chapter 3 (Data and Signals) and Chapter 7 (Transmission Media)

หมายเหตุ: `lecture/iot/` ปัจจุบันยังเป็นโฟลเดอร์ว่าง สื่อ IoT ที่มีใช้งานจริงอยู่ในไฟล์สไลด์ `lecture/DataCom_Forouzan/pdf/305141_Chapter01.pdf` ถึง `305141_Chapter06.pdf`
