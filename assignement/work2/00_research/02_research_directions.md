# แนวทางวิจัยที่เชื่อมกับ DivWy
คำค้นต่อไปนี้เป็นคำค้นสำหรับนำไปใช้ IEEE Xplore Advanced Search; รายการที่รันจริงดูไฟล์ 03 แยกต่างหาก
เลือก Content Type = Conferences; ตรวจระดับบทความอีกครั้ง เพราะบทความ journal ที่นำเสนอในงานประชุมยังอาจไม่ผ่านเงื่อนไข

| แนวทาง | ปัญหาในแอป / คำถามวิจัย | Boolean query | ประโยชน์และการประเมินที่เสนอ |
|---|---|---|---|
| 1. Narrative graph validation (แนะนำ) | มีเงื่อนไข/choices แต่ publish validation ตรวจความมีอยู่ของเนื้อหาเป็นหลัก; เครื่องมือแสดงเส้นทางและสถานะช่วยหาบั๊กได้ดีกว่าเล่นเองหรือไม่ | ("interactive narrative" OR "branching narrative") AND (validation OR verification OR "automated playtesting" OR authoring) | ใช้ออกแบบ validator และ test fixtures; วัด detection rate ของบั๊กที่ใส่ไว้ เวลาแก้ปัญหา และ path/state coverage โดยนิยามขอบเขตให้ชัด |
| 2. Branch-aware asset prefetch | ปัจจุบัน prefetch scene+1 อาจไม่ตรง jump; จะลดเวลาเปลี่ยนฉากโดยไม่โหลดสื่อที่ไม่ใช้มากเกินไปอย่างไร | ("interactive storytelling" OR "visual novel" OR "web game") AND (prefetching OR preloading OR caching OR streaming) | เปรียบเทียบ no prefetch, sequential, branch-aware; วัด p50/p95 scene latency, transferred bytes และ memory ภายใต้เครือข่ายคงที่ |
| 3. Authoring state / collaboration | มี iframe messages และ save generation guard แต่ยังไม่พบ coauthoring; หากมีผู้เขียนสองคนแก้ scene เดียวกันควรรักษาความสอดคล้องอย่างไร | ("collaborative authoring" OR "collaborative editing") AND (story OR narrative OR graph) AND (consistency OR "conflict resolution" OR CRDT OR "operational transformation") | เป็นงานต่อยอด ไม่ใช่ฟีเจอร์ปัจจุบัน; วัด lost updates, convergence และ latency พร้อมกำหนด conflict policy |
| 4. Multimedia asset protection | มี LSB watermark และ media proxy; การแปลงไฟล์ทำให้ตรวจเจ้าของไม่ได้มากเพียงใด | ("image watermarking" OR "digital rights management") AND (robustness OR compression OR "web application") | ใช้บทที่ 2 อธิบาย access control เทียบ provenance; วัด detection, false positives และคุณภาพภาพบนชุดรูปที่มีสิทธิ์ |
| 5. AI-assisted branching authoring | ผู้เขียนต้องแต่งหลายทางเลือก; LLM ช่วยเสนอกราฟโดยยังรักษา constraints ได้หรือไม่ | ("branching narrative" OR "visual novel") AND ("large language model" OR "generative AI" OR "procedural generation") | GENEVA/BYOS เป็น related work; ถ้าพัฒนาภายหลังให้ตรวจ valid JSON, reachable endings, constraint violations, เวลาแก้ไข และต้นทุน ไม่อ้างว่า DivWy มี AI แล้ว |

หัวข้อ 1 ตรงโค้ดและใช้เชื่อมเล่มได้โดยไม่เปลี่ยนเป้าหมายโครงงาน ส่วนหัวข้อ 2/4 มี engineering problem ชัดแต่ไม่ใช่แกนของ 3 papers ที่คัดในรอบนี้; หัวข้อ 3/5 ต้องระบุเป็นส่วนต่อยอด

