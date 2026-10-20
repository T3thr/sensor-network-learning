# ตารางคำกล่าวอ้างและหลักฐาน

ใช้ตรวจเนื้อหาก่อนนำไปทำรายงาน สไลด์ บทพูด และเว็บ ไม่ใช้ความทรงจำหรือชื่อไฟล์แทนหลักฐานในเนื้อหา

**แหล่งเนื้อหา:** [PDF ที่ได้รับ](../01_original/Paper_IV_1_PRIMARY_PublishTimeOpt_11298742.pdf), 5 หน้า  
**เลขหน้าในตาราง:** หน้า PDF 1–5 ไม่ใช่เลขหน้า proceedings 226–230  
**การจัดประเภท:** “ต้นฉบับ” = ผู้วิจัยกล่าวหรือรายงานไว้, “วิเคราะห์” = ผู้จัดทำอนุมานหรือวิจารณ์, การคำนวณเพิ่มเติมระบุเป็นการวิเคราะห์ของผู้ศึกษา

## 1. ปัญหา กลยุทธ์ และสถาปัตยกรรม

| คำกล่าวอ้างที่ใช้ได้ | ประเภท | ตำแหน่ง | ขอบเขตที่ต้องรักษา |
| :--- | :--- | :--- | :--- |
| ย้ายงานจาก runtime ไป publish time เพื่อลดการรอช่วงเริ่มต้น | ต้นฉบับ | Abstract, Section 1, Figure 1; หน้า 1 | ไม่ใช่ลดการคำนวณทั้งหมดเป็นศูนย์ |
| กลยุทธ์หลักมี data preparation, pre-computation และ pre-rendering | ต้นฉบับ | Section 3; หน้า 2–3 | รวมกันได้แต่มีต้นทุนพื้นที่และข้อมูลเก่า |
| TTR นับจนเห็น visualization ครบ ต่างจาก FCP | ต้นฉบับ | Section 3.1; หน้า 2 | ไม่ใช้การปรากฏของ header แทน |
| TTA นับจนพร้อมตอบ user input | ต้นฉบับ | Section 3.1; หน้า 2 | ไม่ใช่ค่าเฉลี่ย latency ของคลิกทุกครั้ง |
| SC เป็นขนาดทรัพยากรเผยแพร่ โดยอภิปรายผลต่อ transfer และ memory | ต้นฉบับ | Section 1; หน้า 1, Section 3.1; หน้า 2 | ไม่มีตัวเลข peak RAM / bandwidth / ค่า CDN ที่วัดแยกใน Table 1 |
| เตรียมคอลัมน์ แปลงข้อมูล และจัด layout ก่อนเผยแพร่ได้ | ต้นฉบับ | Section 3.2; หน้า 2 | ประสิทธิผลขึ้นกับข้อมูลและงานแปลงจริง |
| Query cache และ pre-aggregated materialized views เตรียมได้ล่วงหน้า | ต้นฉบับ | Sections 3.3, 4.3; หน้า 2–3 | ไม่ใช่ภาพทุกสถานะของ interaction |
| Initial, Total และ Mixed เป็นระดับ pre-rendering ที่อภิปราย | ต้นฉบับ | Section 3.4; หน้า 3 | ใน evaluation ใช้ initial pre-rendering ไม่ได้เปรียบเทียบทุกระดับ |
| YAML ถูก parse เป็น AST เพื่อวิเคราะห์และ rewrite | ต้นฉบับ | Section 4.1; หน้า 3 | ไม่ระบุว่า AST parser เป็นผลิตภัณฑ์ใด |
| Coordinator จัดการคิวรีจากหลาย clients และรองรับ DuckDB หลายที่รัน | ต้นฉบับ | Sections 4–4.1; หน้า 3 | evaluation ใช้ DuckDB-WASM ไม่ได้ benchmark server / browser เทียบกัน |
| Publisher จำลอง input บน virtual DOM เพื่อกระตุ้นคิวรี | ต้นฉบับ | Sections 4.2–4.3; หน้า 3 | ไม่ยืนยัน React หรือการพิสูจน์ coverage ทุกอินพุตของทุกระบบ |
| Materialize ผลคิวรี, rewrite ส่วน data และสร้าง hydration JavaScript | ต้นฉบับ | Section 4.2; หน้า 3 | แผนผังของผู้จัดทำเป็น flow เชิงตรรกะ ไม่ใช่ call graph ที่ตรวจจากซอร์ส |
| เติม cache / database ได้อย่าง transparent แต่ data preparation บางส่วนต้อง rewrite | ต้นฉบับ | Section 4.3; หน้า 3 | ไม่อ้างว่า optimization ทุกแบบไม่เปลี่ยน specification |
| View ที่ไม่โต้ตอบส่งเพียง pre-rendered web content ได้ | ต้นฉบับ | Section 4.3; หน้า 3 | อย่านำไปอ้างว่า interactive view ไม่ต้องใช้ JavaScript |
| Hydration ปัจจุบันสร้างคอมโพเนนต์ผ่าน client-side rendering ตามปกติ | ต้นฉบับ | Section 4.3; หน้า 3 | ยังไม่ใช่ progressive / incremental hydration ที่ทดลองแล้ว |

## 2. ผลทดลองและสถิติ

| คำกล่าวอ้างที่ใช้ได้ | ประเภท | ตำแหน่ง | ขอบเขตที่ต้องรักษา |
| :--- | :--- | :--- | :--- |
| ใช้ 5 specifications: airlines, property, flights, gaia, taxis | ต้นฉบับ | Figure 2; หน้า 3, Section 5; หน้า 4 | ไม่ใช่ 5 ผู้ใช้หรือ 5 อุปกรณ์ |
| ขนาดข้อมูล 10k, 100k, 1M, 10M แถว | ต้นฉบับ | แกน Figure 3; หน้า 4 | เป็นจำนวนแถว ไม่ใช่ขนาดไฟล์สื่อ |
| Node 22.9.0, M1 Pro, RAM 16 GB, macOS 15.2, local server, DuckDB-WASM | ต้นฉบับ | Section 5; หน้า 4 | ไม่ใช่การทดลองอินเทอร์เน็ตหรือมือถือหลายรุ่น |
| `none` → `+prep` → `+cache` → `+prerender` เพิ่มกลยุทธ์สะสม | ต้นฉบับ | Section 5; หน้า 4 | อย่าถือว่าแต่ละแถวเปิดเฉพาะเทคนิคเดียว |
| ชุดรวม TTR −83.7 ± 2.1%, TTA −33.3 ± 9.6%, SC +21.2 ± 29.9% | ต้นฉบับ | Table 1 แถว `+most`; หน้า 4 | ค่าเฉลี่ยข้าม visualizations และ dataset sizes เทียบ `none`, ±σ ไม่ใช่ CI |
| Table 1 ใช้ชื่อ `+most` ส่วนกราฟและ evaluation ใช้ `+prerender` | ต้นฉบับ | Table 1, Figure 3–4, Section 5; หน้า 4 | คง label เดิมในตาราง อย่าแก้ต้นฉบับหรืออ้างว่าไม่มีความต่างของชื่อ |
| `+cache` ลด TTA 32.3 ± 8.9% และ TTR 16.6 ± 1.3% | ต้นฉบับ | Table 1; หน้า 4 | รวม data preparation อยู่แล้ว |
| เพิ่ม pre-render แล้วผลลด TTA เฉลี่ยมากขึ้น 1.0 จุดเปอร์เซ็นต์จาก baseline เดียวกัน | วิเคราะห์ / คำนวณ | 33.3 − 32.3 จาก Table 1; หน้า 4 | ไม่ใช่ลดจากเวลา `+cache` อีก 1%, ไม่ยืนยันนัยสำคัญทางสถิติ |
| `+prep` ช่วยน้อยเพราะไม่มี transform หนักหรือคอลัมน์ส่วนเกิน | ต้นฉบับ | Section 5; หน้า 4 | ไม่ใช่ข้อสรุปทั่วไปว่า data preparation ไม่มีประโยชน์ |
| Cache ช่วย TTA ชัดโดยเฉพาะข้อมูล ≥1M แถว | ต้นฉบับ | Section 5, Figure 3; หน้า 4 | ชุดเล็กอาจคำนวณ on-the-fly ได้เร็วพอ |
| เส้น Figure 3 เป็น median, แรเงาเป็น IQR | ต้นฉบับ | Figure 3 caption; หน้า 4 | ไม่เรียกแรเงาว่า SD หรือ confidence interval |
| Figure 4 เฉลี่ย latency components ที่ข้อมูล 10M แถว | ต้นฉบับ | Figure 4 caption; หน้า 4 | ไม่ใช้แทนค่าเฉลี่ยทุกขนาดแบบ Table 1 |
| Hydration ยังมีต้นทุนเกือบเท่า full client-side render | ต้นฉบับ | Section 5; หน้า 4 | ไม่อ้างว่า pre-render ทำให้ TTA ลดตาม TTR โดยอัตโนมัติ |
| Publishing time ยาวกว่า unoptimized TTA ที่สอดคล้องกัน 1,455.3 ± 1,779.0 ms โดยเฉลี่ย | ต้นฉบับ | Section 5; หน้า 4 | เป็นผลต่างของเวลา ไม่ใช่ publishing time รวม 1,455.3 ms |
| ไม่มีจำนวนรอบซ้ำหรือ raw measurements แจกแจงใน PDF | วิเคราะห์จากการตรวจครบ | Sections 5–6; หน้า 4 และเอกสารอ้างอิงหน้า 5 | จำนวน 80 เงื่อนไขที่นับเองไม่ใช่จำนวนรอบรัน |

## 3. ข้อจำกัดของบทความ

| คำกล่าวอ้างที่ใช้ได้ | ประเภท | ตำแหน่ง | ขอบเขตที่ต้องรักษา |
| :--- | :--- | :--- | :--- |
| ข้อมูลเปลี่ยนแล้วต้องเตรียม assets ใหม่ | ต้นฉบับ | Section 3.2; หน้า 2 | บทความไม่ได้วัดเวลา invalidation ของระบบที่ข้อมูลเปลี่ยนตลอด |
| จำนวนมิติ / สถานะโต้ตอบทำให้ assets โตมากได้ | ต้นฉบับ | Sections 3.3–3.4; หน้า 2–3 | จำนวนทรัพยากรขึ้นกับข้อมูลและปฏิสัมพันธ์ที่เตรียมไว้ |
| เหมาะกับข้อมูลค่อนข้างคงที่และ interaction ที่คาดหมายได้ | ต้นฉบับ | Section 6; หน้า 4 | ไม่ถือว่าข้อมูลสดหรือเนื้อหาจาก LLM ทุกแบบใช้ได้ทันที |
| Progressive hydration อยู่ใน Related Work ส่วน finer-grained hydration เป็น future work | ต้นฉบับ | Section 2.3; หน้า 2, Sections 4.3, 5; หน้า 3–4 | ห้ามอ้างว่าเป็นวิธี Mosaic Publisher ที่พิสูจน์ประสิทธิภาพแล้ว |

## 4. ข้อความที่ต้องแก้หากพบในชิ้นงานขั้นถัดไป

| ข้อความที่อ้างเกิน | ข้อความที่ตรงหลักฐาน |
| :--- | :--- |
| “Mosaic ใช้ Progressive Hydration จึงลด TTA 33.3%” | “ชุดปรับปรุงรวมลด TTA เฉลี่ย 33.3% โดยยังมีต้นทุน hydration; วิธีที่ละเอียดขึ้นเป็นแนวทางอนาคต” |
| “Pre-render เพียงอย่างเดียวลด TTR 83.7%” | “ชุดกลยุทธ์รวมที่เพิ่ม initial pre-render ลด TTR เฉลี่ย 83.7% เทียบ `none`” |
| “เพิ่ม storage แค่ 21.2% จึงไม่มีต้นทุนเครือข่าย” | “SC เพิ่มเฉลี่ย 21.2% ± 29.9; ผลเครือข่ายใน local test เล็กเมื่อเทียบผลด้าน latency แต่ยังไม่ประเมินเน็ตช้า” |
| “ทดสอบซ้ำ 80 ครั้ง” | “มี 5 specifications และ 4 ขนาดข้อมูล แบ่ง 4 ระดับ; ไม่แจกแจงจำนวนรอบทำซ้ำ” |

## 5. ระเบียนและสถานะไฟล์

ระเบียน [IEEE publisher metadata](../00_research/evidence/publishtime-ieee-publisher-metadata.json) ระบุ `publisher = IEEE`, `type = proceedings-article`, ปี 2025, งานประชุม VIS และหน้า 226–230 ส่วนไฟล์ใน `01_original/` ตรงกับ [author copy](../00_research/evidence/authorcopy_publishtime_11298742.pdf) ด้วย SHA-256 `c8b6a79fc42049b38009ff4d818a69c4cc3236ff22b87bf6a18fd8b86cdb3593`

ไฟล์ที่อ่านยังมี `anonymized URL` ใน Section 4 ต่อหน้า PDF 4 และไม่มีเลขหน้ารวมของ proceedings จึงยังยืนยันจากการตรวจไฟล์นี้เพียงอย่างเดียวไม่ได้ว่าเป็นฉบับจัดพิมพ์สุดท้ายของ IEEE ไม่แก้ชื่อไฟล์หรือต้นฉบับที่ผู้จัดทำเตรียมไว้ ใช้ [manifest](./evidence/source-manifest.json) ให้ตรวจย้อนกลับได้ และอ้างหน้า PDF อย่างสม่ำเสมอ
