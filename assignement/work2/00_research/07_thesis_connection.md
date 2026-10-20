# การเชื่อมบทความกับเล่ม DivWy
อิงเล่ม `thesis/ปริญญานิพนธ์โครงงานแพลตฟอร์มนิยายออนไลน์ภาพขยับ 2026-final.doc`
[ข้อความที่สกัดเพื่อค้น](evidence/thesis-final-extracted.txt); เลขบรรทัดใน txt ไม่ใช่เลขหน้าใน Word และ extraction ไม่เก็บภาพ/ผังครบ จึงยังไม่ตรวจคุณภาพรูปหรือเลย์เอาต์เล่ม

## บทที่ 1
- 1.1 ที่มาและความสำคัญ: ใช้ PRIMARY สนับสนุนว่าการสร้างเรื่องเชิงโต้ตอบเพิ่มภาระการทดสอบหลายเส้นทาง ไม่ใช่ใช้ยืนยันว่าผู้อ่านไทยทุกคนต้องการภาพเคลื่อนไหว
- 1.2.1 วัตถุประสงค์ด้านโครงสร้างข้อมูล/ตรรกะ: เชื่อมแบบจำลองกราฟและเงื่อนไขของ DivWy กับปัญหาที่ Story Validator ศึกษา
- 1.2.2 ค่าสกิล: ตั้งโจทย์ความถูกต้องของการเปลี่ยนตัวแปรและการปลดล็อก ห้ามบอกว่า paper รองรับระบบสกิลของ DivWy จนเทียบ formal model แล้ว
- 1.3 ขอบเขต: แยก editor/player ที่มีจริงจากข้อเสนอ validator หรือ AI รุ่นถัดไป

## บทที่ 2
| หัวข้อเล่ม | Paper/แนวคิด | การเชื่อมโค้ด | ขอบเขตที่ต้องระวัง |
|---|---|---|---|
| 2.1.1 Branching Narrative | PRIMARY: testing; GENEVA: branching/reconvergence | Tuesday blocks, choices, variables | กราฟแสดงเส้นทางไม่ได้รับรองทุกเงื่อนไขเป็นไปได้ |
| 2.5.3 Interactive Flowchart | Story Validator และ GENEVA เป็น related tools | Tuesday creation_block/creaton_line | ไม่เรียก editor นี้ว่า xyflow เพียงเพราะมี dependency |
| 2.6 State Management & Validation | PRIMARY เชื่อม testing model กับ runtime state | reading-progress, userNovelStates; publish validator | ปัจจุบัน validation ตรวจความมีอยู่ของเนื้อหาเป็นหลัก ไม่อ้างว่ามี automated exhaustive testing |
| Related work ของ authoring/rendering | BYOS: text → scene/choice → Unity/LLM | DivWy: ผู้เขียนสร้าง → Tuesday JSON → web player | Unity ไม่ใช่เว็บ architecture benchmark และ DivWy ไม่ได้มี GPT-4o จากหลักฐานที่อ่าน |
| 2.2/2.3 สถาปัตยกรรม/ฐานข้อมูล | ใช้เอกสารเทคนิคเฉพาะเรื่องเพิ่มเติมภายหลัง | Next.js, Drizzle/Neon, Redis | 3 papers นี้ไม่ใช่หลักฐานวัดประสิทธิภาพ Next.js หรือ PostgreSQL |

## ย่อหน้าร่างสำหรับกรอบ related work (ยังไม่ใช่ข้อความพร้อมส่ง)
Veloso และ Prada (2021) เสนอเครื่องมือช่วยตรวจสอบเรื่องเชิงโต้ตอบโดยใช้แบบจำลองตัวชี้วัดและการแสดงผลทางภาพ แนวทางดังกล่าวเกี่ยวข้องกับ DivWy ซึ่งให้ผู้เขียนกำหนดตัวเลือกและเงื่อนไขของเรื่อง อย่างไรก็ตาม การตรวจความพร้อมเผยแพร่ในโค้ดที่สำรวจเน้นการมีอยู่ของตอนและเนื้อหา จึงยังควรศึกษาว่าการตรวจเส้นทางร่วมกับสถานะสามารถช่วยค้นความผิดพลาดก่อนเผยแพร่ได้อย่างไร
อ้างอิง: [IEEE 9618897](https://ieeexplore.ieee.org/document/9618897/) — ใช้ได้เพียงระดับแนวคิดจาก Abstract; ต้องเติมรายละเอียดวิธีและผลหลังอ่านครบ

## สิ่งที่ควรแก้เมื่อทำเล่มรอบต่อไป
1. บทคัดย่อ/ขั้นดำเนินงานยังมี MongoDB แต่ src/db/index.ts ใช้ PostgreSQL/Neon/Drizzle
2. แยกคำกล่าว “รวดเร็ว/ราบรื่น/ดึงดูด” ออกจากผลทดลองจริง ต้องมี test environment, sample, metrics และผลที่ตรวจได้
3. แยก real-time transport ของ database ออกจาก collaboration ระหว่างผู้เขียน
4. อธิบายขอบเขตของ R2 S3-compatible provider แยกจาก AWS S3 provider ที่ยังไม่ implement
5. ไม่อ้าง AI generation, Inngest jobs, xyflow renderer หรือ Web Workers ว่ามีจริงจากชื่อ dependency/แผนอย่างเดียว

ไม่มีการแก้เล่มหรือซอร์สโค้ดในรอบนี้

