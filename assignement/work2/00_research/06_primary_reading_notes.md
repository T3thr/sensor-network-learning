# บันทึกเตรียมอ่าน PRIMARY
**Validating the plot of Interactive Narrative games**
Carolina Veloso; Rui Prada. 2021 IEEE Conference on Games (CoG).
DOI: [10.1109/CoG52621.2021.9618897](https://doi.org/10.1109/CoG52621.2021.9618897)
[IEEE Xplore 9618897](https://ieeexplore.ieee.org/document/9618897/)

## สถานะ
รอ Full Text ที่ดาวน์โหลดด้วยตนเองจาก IEEE ลง raw/DivWy_Paper2_PRIMARY_9618897.pdf
**ประเมินจาก Abstract เท่านั้น**; อ่าน Abstract และตัวอย่าง Introduction ที่หน้า IEEE ให้ ยังไม่ได้อ่าน methodology/results เต็ม ห้ามส่งรายงานหรือสไลด์จากบันทึกนี้

## สิ่งที่ทราบจาก Abstract
ปัญหาคือการตรวจเรื่องเชิงโต้ตอบที่ต้องรักษาทั้งความตั้งใจผู้เขียนและทางเลือกผู้เล่น งานเสนอโมเดลตัวชี้วัดและ prototype Story Validator เพื่อสำรวจสมบัติเส้นเรื่องและแสดงผลทางภาพ ผู้แต่งระบุว่าทดสอบกับผู้ใช้ แต่ยังไม่ทราบจำนวนคน รายละเอียดงานทดลอง หรือขนาดผล
ข้อความว่าช่วยทดสอบได้ง่ายเป็นข้อสรุปที่ผู้แต่งรายงานใน Abstract ยังไม่ใช่การประเมินอิสระของเรา

## Evidence map ที่ต้องเติมหลังอ่าน
| ประเด็น | หน้า / section / figure | ข้อความหรือข้อมูลที่ต้องบันทึก | สถานะ |
|---|---|---|---|
| Problem และ research gap | รอตรวจ | authoring burden, เครื่องมือเดิม, ขอบเขตคำว่า inconsistency | รอ |
| Contributions ที่ผู้แต่งระบุ | รอตรวจ | แยก model / tool / evaluation โดยไม่เพิ่มเอง | รอ |
| Formal model | รอตรวจ | node/edge/state/condition และ assumptions | รอ |
| Algorithm | รอตรวจ | วิธีสำรวจทางเลือก stopping criteria/loops และ complexity | รอ |
| Metrics | รอตรวจ | ชื่อ สูตร หน่วย และความหมายของทุก metric | รอ |
| Dataset/Testbed | รอตรวจ | เรื่องที่ใช้ จำนวน/ขนาดกราฟ เครื่องมือ/เครื่องที่รัน | รอ |
| User study | รอตรวจ | n, recruitment, experience, tasks, baseline, design | รอ |
| Results | รอตรวจ | ค่าเฉลี่ย/การกระจาย significance/effect size ถ้ามี; อย่าแปลงหน่วยเองโดยไม่ระบุ | รอ |
| Limitations | รอตรวจ | แยกผู้แต่งยอมรับ กับข้อวิจารณ์ของนิสิต | รอ |
| Applicability | รอตรวจ | สมมติฐานใดใช้กับ Tuesday JSON และตัวแปรเรื่องได้ | รอ |

## คำถามขณะอ่าน
- ตรวจได้เพียงเส้นทางกราฟ หรือรวมเงื่อนไขและค่าตัวแปร? ฉากที่ reachable ทางกราฟอาจ unreachable ทาง state หรือไม่?
- รับมือวงวน state explosion และ probabilistic choices อย่างไร?
- คำว่า coverage หมายถึง node, edge, path หรือ state? ใช้ขอบเขตจำกัดอย่างไร?
- ผู้ใช้ค้นพบบั๊กได้มากขึ้นหรือเร็วขึ้นเมื่อเทียบอะไร? ผลมาจาก tool หรือการฝึกซ้อม?
- มี baseline เล่นเอง/เครื่องมือเดิมและการสลับลำดับ task หรือไม่?
- ต้องสร้างแบบจำลองเรื่องเองมากเพียงใด และมีต้นทุนแปลงจาก format จริงเท่าใด?
- การแสดงเส้นทางช่วยตรวจ logic แต่พิสูจน์คุณภาพวรรณกรรมหรือความสนุกได้หรือไม่?
- มีซอร์สโค้ด/ชุดข้อมูลเผยแพร่หรือไม่? ห้ามเดาว่า reproducible เพียงเพราะมีชื่อ prototype

## สมมติฐานประยุกต์กับ DivWy — ข้อเสนอของนิสิต
นำ blocks/dialog choices เป็นกราฟกำกับ และผูกตัวแปรเรื่องกับ transitions; เริ่มด้วย dangling targets/unreachable blocks แล้วค่อยตรวจ state ภายใต้ขอบเขตความลึก/ค่าตัวแปรที่กำหนด
ทดสอบกับ fixtures ขนาดเล็กที่ทราบผลและบั๊กที่ใส่ไว้; วัด recall/precision ของการตรวจบั๊ก เวลา และ false positives
นี่คือแนวทดลองที่เสนอใหม่ ไม่ใช่อัลกอริทึมหรือผลของบทความ และยังไม่ได้ implement ในรอบนี้

## เงื่อนไขพร้อมเขียนงานส่ง
อ่านครบทุกหน้าและรูป/ตาราง, เติม method/result evidence map, ตรวจ bibliographic record กับ PDF, แยกข้อเท็จจริง/การตีความ/ข้อเสนอ แล้วจึงยืนยัน PRIMARY

