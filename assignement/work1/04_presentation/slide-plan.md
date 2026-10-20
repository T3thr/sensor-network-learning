# แผนสไลด์ IoT-CAD — 7 หน้า / 5–8 นาที

แผนนี้ตรงกับไฟล์ `03_slides/Assignment_Paper_1_IoT-CAD_5-to-8-min.pptx` ใช้เวลาพูดเป้าหมายประมาณ 6 นาที 10 วินาที

| หน้า | เวลา | หน้าที่ของสไลด์ | หลักฐานสำคัญ |
|---|---:|---|---|
| 1. Title / Hook | 0:35 | เปิดด้วยคำถาม “เหตุจริง หรือ sensor ผิด?” | ชื่อ paper, venue, ผู้แต่ง |
| 2. EA vs SDA | 0:45 | อธิบายปัญหาและ insight เรื่อง context | Figure 2 จาก paper |
| 3. Pipeline | 1:20 | อธิบาย 4 ขั้นของ IoT-CAD | diagram ที่แก้ไขได้ใน PowerPoint |
| 4. Testbed | 0:50 | แสดงว่าทดลองกับระบบจริง | Figure 8, 62 sensors, 13 modalities, 8 วัน, 2.3M readings |
| 5. Results | 0:55 | เปรียบเทียบอย่างไม่ cherry-pick | native chart: precision และ recall จาก Table 2 |
| 6. Contribution / AI impact | 0:55 | ตอบตรง rubric และเชื่อมยุค AI | 3 contributions + trustworthy edge AI |
| 7. Limits / Takeaway | 0:50 | แสดงการคิดเชิงวิพากษ์และสรุป | recall 56%, synthetic anomalies, threat-model gap |

## หลักการออกแบบที่ใช้จริง

- อัตราส่วน 16:9, พื้นหลังเข้ม, ใช้ Tahoma เพื่อรองรับภาษาไทย
- สีฟ้า = context/ระบบ, สีส้ม = EA, สีแดง = SDA/ข้อจำกัด
- ใช้ข้อความสั้นบนสไลด์ แล้วเก็บคำอธิบายใน speaker notes
- กราฟหน้าที่ 5 เป็น chart ที่แก้ไขค่าได้ ไม่ใช่ภาพ screenshot
- Figure 2 และ Figure 8 ครอปจากบทความต้นฉบับ พร้อมเครดิตและ DOI บนหน้า
- ทุกหน้ามีแหล่งอ้างอิงย่อ `Yasaei et al., ICCAD 2020, doi:10.1145/3400302.3415672`

## จุดที่ห้ามพูดผิด

- 92% คือ **precision** ไม่ใช่ accuracy
- IoT-CAD ไม่ได้ชนะทุก metric: ConvLSTM มี recall 95% สูงกว่า
- เวลา 0.532 วินาทีเป็นผลใน testbed ของ paper ไม่ใช่การรับประกันทุกระบบ
- การจำแนก EA/SDA อาศัย cluster ที่มี sensor อย่างน้อย 3 ตัวตามการตั้งค่าทดลอง
- “งานแรก” ต้องพูดว่าเป็นคำกล่าวของผู้เขียน ณ ปี 2020 ไม่ใช่ข้อเท็จจริงสากลในปัจจุบัน
