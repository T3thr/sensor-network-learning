# ทิศทางการค้นคว้าบทความวิจัย Assignment Paper 3 (Version 2 / ปี 2024+)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร

เอกสารฉบับนี้กำหนด 3 แนวทางการค้นคว้าบทความวิจัยประเภท Conference Paper จากฐานข้อมูล IEEE Xplore ที่ตีพิมพ์ในปี **2024 หรือใหม่กว่า (2024-2026)** ที่มีคุณสมบัติ:
1. เข้าใจง่ายและนำเสนอจบได้อย่างน่าประทับใจในเวลาไม่เกิน 5 นาที (300 วินาที)
2. มีแผนภาพสถาปัตยกรรมที่ชัดเจน ไม่ซับซ้อนเกินไป
3. มีผลการทดสอบเชิงประจักษ์ (Empirical Evaluation) เช่น Latency, Throughput, Precision, FLOPs หรือ Energy

---

## ตารางเปรียบเทียบ 3 แนวทางการค้นคว้า

| แนวทางวิจัย (Research Track) | นิยามปัญหาที่เข้าใจง่ายใน 30 วินาที | ความเชื่อมโยงกับทักษะนิสิต | คำค้นหาเป้าหมายบน IEEE Xplore (2024-2026) | ตัวอย่างงานประชุม IEEE เป้าหมาย |
| :--- | :--- | :--- | :--- | :--- |
| **Track A: Edge AI & TinyML in Sensor Networks** | อุปกรณ์เซนเซอร์มีข้อจำกัดด้านพลังงานและหน่วยความจำอย่างมาก จะนำโมเดล AI ขนาดเล็กไปตรวจจับความผิดปกติหรือจำแนกข้อมูลแบบเรียลไทม์ที่โหนดโดยไม่ต้องส่งขึ้นคลาวด์ตลอดเวลาได้อย่างไร | สอดคล้องกับวิชาเครือข่ายเซนเซอร์ และต่อยอดจาก Paper 1 (IoT-CAD) ในบริบทโมเดล AI ยุคใหม่ | `("edge AI" OR "TinyML" OR "lightweight deep learning") AND ("wireless sensor network" OR "sensor network" OR "IoT") AND ("anomaly detection" OR "resource-constrained")` | IEEE WF-IoT, IEEE INFOCOM, IEEE GLOBECOM, IEEE Sensors |
| **Track B: Distributed Stream Processing & Event-Driven Edge Systems** | ข้อมูลเซนเซอร์มหาศาลหลั่งไหลเข้ามาอย่างต่อเนื่อง จะออกแบบสถาปัตยกรรมกระจายตัวที่มี Throughput สูง ความหน่วงต่ำระดับมิลลิวินาที และทนทานต่อโหนดดับได้อย่างไร | ตรงกับความเชี่ยวชาญภาษา Go, Kafka, Microservices, และ High-Performance Concurrency ของนิสิตที่ Codefin | `("distributed stream processing" OR "event-driven architecture" OR "low-latency streaming") AND ("sensor data" OR "IoT stream" OR "edge cluster")` | IEEE ICDCS, IEEE SECON, IEEE BigData, IEEE Cloud |
| **Track C: LLM-Assisted & Multi-Agent Sensor Intelligence** | การใช้โมเดลภาษาขนาดใหญ่ (LLMs) หรือระบบมัลติเอเจนต์ (Multi-Agent Systems) ร่วมกับข้อมูลเซนเซอร์ เพื่อการตัดสินใจและควบคุมระบบอัตโนมัติในสภาพแวดล้อมจริง | ทันสมัยที่สุดในยุค Generative AI ตอบโจทย์ผู้ฟังรุ่นใหม่ และเชื่อมโยงทั้งระบบเครือข่ายและซอฟต์แวร์ระดับบน | `("large language model" OR "LLM" OR "generative AI" OR "multi-agent") AND ("sensor network" OR "IoT" OR "smart environment" OR "context-aware")` | IEEE AIoT, IEEE IROS, IEEE MASS, IEEE ICC |

---

## กฎเกณฑ์การประเมินเพื่อเลือกบทความ PRIMARY

บทความที่จะได้รับเลือกเป็นตัวจริง (PRIMARY) ต้องผ่านการคัดกรอง 4 ด่าน:
1. **ผ่านเกณฑ์ปีตีพิมพ์:** เผยแพร่ในงานประชุมวิชาการ IEEE ระหว่างปี 2024 ถึง 2026 เท่านั้น
2. **มีแผนภาพสถาปัตยกรรมระบบชัดเจน (Architecture Grounding):** มีแผนภาพบล็อกการทำงาน (System Flow / Pipeline) ไม่เกิน 1-2 ภาพที่สามารถนำขึ้นสไลด์หน้า 3 หรือหน้า 4 แล้วอธิบายจบได้ใน 45 วินาที
3. **มีผลการทดลองเปรียบเทียบชัดเจน (Quantifiable Baseline):** มีตัวเลขสถิติเปรียบเทียบกับวิธีดั้งเดิมอย่างน้อย 2 มิติ (เช่น ลด Latency ได้กี่เปอร์เซ็นต์, ลดการใช้พลังงานได้กี่เปอร์เซ็นต์, หรือค่าความแม่นยำ F1-Score)
4. **มีข้อจำกัดที่ระบุอย่างจริงใจ (Engineering Limitations):** มีประเด็นจุดด้อยที่นิสิตสามารถนำไปวิพากษ์ในสไลด์หน้า 7 ได้อย่างมั่นใจ
