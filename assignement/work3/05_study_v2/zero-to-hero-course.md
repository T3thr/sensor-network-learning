# หลักสูตร Zero-to-Hero: Raft, Federated Learning และ Flower (Version 2)
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks): เตรียมนำเสนอบทความ Raft-FL (SEAMS 2024, IEEE Doc ID: 10556381)

หลักสูตรนี้พาจากศูนย์ไปถึงระดับที่ตอบคำถามกรรมการได้ ใช้เวลาอ่านประมาณ 60 ถึง 90 นาที ตัวเลขจากบทความอ้างเลขหน้าที่พิมพ์บนบทความ (110 ถึง 121) ส่วนที่มาจากความรู้ทั่วไปของ Raft หรือเป็นความเห็นของผู้จัดทำระบุไว้ทุกครั้ง

- บทความ: R. Dautov and E. J. Husom, "Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning," SEAMS 2024, pp. 110-121, **IEEE Doc ID: 10556381**, DOI: 10.1145/3643915.3644093
- ไฟล์: `../01_original_v2/Paper_III_2_PRIMARY_RaftFL_10556381.pdf`
- โค้ดประกอบ: `code/raftsim/` (Go, รันด้วย `go run .`)

---

## บทที่ 1: Federated Learning ใน 5 นาที

**แนวคิดหลัก:** Federated Learning (FL) ฝึกโมเดลร่วมกันโดยไม่ย้ายข้อมูลดิบออกจากอุปกรณ์ (Section 2 หน้า 111) วงจรหนึ่งรอบมี 5 ขั้น

1. **Model initialisation:** เครื่องกลางสร้างโมเดลตั้งต้น
2. **Local training:** แต่ละโหนดฝึกด้วยข้อมูลของตนเอง
3. **Model update:** ส่งเฉพาะพารามิเตอร์ที่เปลี่ยนไปให้เครื่องกลาง
4. **Aggregation:** เครื่องกลาง (aggregator) รวมพารามิเตอร์ เช่น หาค่าเฉลี่ย (FedAvg)
5. **Iteration:** ทำขั้น 2 ถึง 4 ซ้ำหลายรอบ

**Flower** เป็นเฟรมเวิร์ก FL ภาษา Python ที่แยกบทบาท server (aggregator) และ client (worker) และให้ผู้พัฒนากำหนด **strategy** ว่าจะตั้งค่า รวม และประเมินผลอย่างไร บทความขยาย strategy นี้เพื่อเรียก checkpoint (Section 5.1 และ 5.3)

**เชื่อมกับเครือข่ายเซนเซอร์:** โหนดเซนเซอร์หรือเกตเวย์คือ worker ข้อมูลดิบ เช่น ค่าอุณหภูมิหรือภาพจากกล้อง อยู่ที่ปลายทาง ส่วนที่วิ่งในเครือข่ายคือพารามิเตอร์ของโมเดล

---

## บทที่ 2: Single Point of Failure และระดับการกู้คืน

**ปัญหา:** คำว่า federation มีจุดประสานกลางอยู่ในตัว ถ้า aggregator ดับ ทั้งระบบหยุด (Section 2.1 หน้า 111)

**ทางเลือกที่บทความพิจารณา (Section 3 หน้า 112 ถึง 113):**

| ทางเลือก | ข้อดี | เหตุผลที่ผู้เขียนไม่เลือก |
| :--- | :--- | :--- |
| Gossip learning | ไม่มีจุดกลาง โหนดแลกโมเดลกับเพื่อนบ้านแบบสุ่ม | ยังใหม่และทำให้ใช้ซ้ำได้ทั่วไปยาก |
| Swarm learning | ทนต่อโหนดเสีย มักใช้ blockchain ช่วย | ซับซ้อน |
| DLT (blockchain) | โปร่งใส กันการแก้ไข | กินพลังประมวลผล พื้นที่ และพลังงาน มีความหน่วงจากฉันทามติ |
| Behera et al. (Raft) | ใช้ Raft เลือก aggregator ใหม่ | ไม่สำเนาสถานะ เอกสาร 5 หน้าที่ยังไม่ผ่าน peer review |

**ระดับการกู้คืน (Table 1 หน้า 114):** Level 0 ไม่กู้คืน, Level 1 เริ่มใหม่จากดิสก์ของเครื่องเดิม, Level 2 เลือกใหม่แต่เริ่มจากศูนย์, **Level 3 เลือกใหม่และฝึกต่อจากพารามิเตอร์ที่สำเนาไว้**, Level 4 สำเนาสถานะของ worker ทุกตัวด้วย บทความเลือก Level 3

**ลองตอบเอง:** ถ้าข้อมูลของ worker แต่ละตัวมีค่าเฉพาะ เช่น โรงพยาบาลแต่ละแห่ง ควรเลือก Level ไหน (เฉลย: Level 4 ตามที่ Table 1 ระบุว่าเหมาะกับกรณีที่ worker มีข้อมูลเฉพาะ)

---

## บทที่ 3: Raft ตั้งแต่ศูนย์

บทความสรุป Raft ไว้ใน Section 4.1 (หน้า 113) และบอกในเชิงอรรถ 6 ว่ารายละเอียดภายในอยู่นอกขอบเขต บทนี้จึงอธิบายเพิ่มจากบทความต้นฉบับของ Raft (Ongaro and Ousterhout, USENIX ATC 2014)

**สามบทบาท:**
- **follower:** รอรับคำสั่งและ heartbeat จาก leader
- **candidate:** follower ที่รอจนหมด election timeout แล้วขอคะแนนเสียง
- **leader:** ผู้ชนะการเลือกตั้ง รับการเขียนทั้งหมดและส่งต่อให้ follower

**สี่กลไก:**
1. **Term:** เวลาถูกแบ่งเป็นช่วงที่มีหมายเลขเพิ่มขึ้นเรื่อย ๆ แต่ละ term มี leader ได้ไม่เกินหนึ่งคน
2. **Randomised election timeout:** แต่ละโหนดสุ่มเวลารอของตัวเอง (บทความ Raft ต้นฉบับยกตัวอย่าง 150 ถึง 300 มิลลิวินาที บทความ SEAMS ไม่ระบุค่า) เพื่อให้มักมีโหนดเดียวหมดเวลาก่อน ลดโอกาส split vote
3. **Heartbeat:** leader ส่งสัญญาณเป็นระยะ ถ้าเงียบนานเกิน timeout จะเกิดการเลือกตั้ง
4. **Log replication:** leader เพิ่มรายการลง log ส่งให้ follower และถือว่า commit เมื่อ **เสียงข้างมาก** ตอบรับ

**ความจริงที่ต้องจำ:** Raft ทนเฉพาะ **crash fault** (โหนดหยุดทำงาน) ไม่ทน **Byzantine fault** (โหนดโกง) ถ้าต้องการกันโหนดโกงต้องใช้ PBFT ซึ่งบทความกล่าวถึงใน Section 4.1

---

## บทที่ 4: คณิตศาสตร์ของ Quorum

ให้ N คือจำนวนสมาชิกคลัสเตอร์ Raft

- จำนวนเสียงที่ต้องได้: **Q = floor(N/2) + 1**
- จำนวนโหนดที่ดับพร้อมกันได้: **f_max = floor((N-1)/2)**

| N | Q | f_max | ความหมาย |
| :---: | :---: | :---: | :--- |
| 2 | 2 | 0 | ดับเครื่องเดียวก็เลือกผู้นำไม่ได้ |
| 3 | 2 | 1 | ขนาดเล็กสุดที่ทนการดับได้ |
| 5 | 3 | 2 | ขนาดที่ etcd และ Kafka controller quorum นิยมใช้ |
| 11 | 6 | 5 | ขนาดคลัสเตอร์ในการทดลองของบทความ |

**ทำไมเป็นเลขคี่:** N = 4 ได้ Q = 3 และ f_max = 1 เท่ากับ N = 3 จึงเพิ่มต้นทุนโดยไม่เพิ่มความทนทาน

**ประเด็นวิพากษ์ที่มาจากบทนี้:** Fig. 3 (หน้า 118) มีจุดที่ 1 worker คือคลัสเตอร์ 2 โหนด ตามตารางนี้ N = 2 ทนการดับได้ 0 โหนด แต่บทความรายงานเวลาเลือกใหม่ 1.27 วินาที และ Section 6.2.1 เขียนว่าทดลอง 2 ถึง 10 worker บทความไม่อธิบายความต่างนี้

---

## บทที่ 5: สถาปัตยกรรม Raft-FL

**หลักการ:** ทุกโหนดรันโค้ดชุดเดียวกัน ผู้ชนะการเลือกตั้งของ Raft ทำหน้าที่ aggregator (Section 5.3 หน้า 115)

**โฟลว์ตาม Fig. 1 (หน้า 116):**

```text
Leader election -> Is Aggregator?
  Yes: Check state -> Initialise parameters -> [Checkpoint 1]
       loop n rounds: Configure training -> Aggregate training results -> [Checkpoint 2]
                      Configure evaluation -> Aggregate eval. results -> [Checkpoint 3]
  No:  State replication -> Training -> Aggregator alive? (No -> Leader election)
       -> State replication -> Evaluation -> Aggregator alive? -> State replication
-> Converged model
```

**checkpoint เก็บอะไร:** จำนวนรอบที่ฝึกแล้ว จำนวนรอบที่เหลือ และพารามิเตอร์ที่รวมล่าสุด เขียนลง replicated key-value dictionary ของ **PySyncObj** แล้วคัดลอกแบบ asynchronous ใน thread แยก (หน้า 115)

**ข้อควรรู้เรื่องแผนภาพ:** เชิงอรรถใต้ Fig. 2 (หน้า 117) บอกว่าภาพตัดข้อความเลือกตั้งหลายรอบ การตอบรับ และ heartbeat ออก ปริมาณข้อความจริงจึงมากกว่าที่เห็นในภาพ

---

## บทที่ 6: อ่านผลการทดลองให้เป็น

**Testbed (Section 6.1 หน้า 116):** Raspberry Pi 3 จำนวน 11 บอร์ด, wireless LAN, CNN บน CIFAR-10, update ประมาณ 250 kB, baseline คือ Flower PyTorch tutorial

| worker | เวลาเลือกใหม่ (s) | Flower เดิม (MB) | มี Raft (MB) | Raft / เดิม |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 1.27 | 0.98 | 1.77 | 1.81 |
| 5 | 1.97 | 5.02 | 16.0 | 3.19 |
| 10 | 3.76 | 9.80 | 49.1 | 5.01 |

(ค่าครบ 10 แถวอยู่ใน `02_report_v2` ตารางที่ 3 ค่าจากป้ายบนกราฟหน้า 118 อัตราส่วนคำนวณโดยผู้จัดทำ)

**สามคำถามที่ต้องถามทุกกราฟ:**
1. **baseline คืออะไร:** Flower เดิมที่ไม่มีการกู้คืน จึงเทียบได้เฉพาะต้นทุน ไม่ใช่เทียบกับวิธีกู้คืนอื่น
2. **ทำซ้ำกี่ครั้ง:** บทความไม่ระบุ และไม่มีค่า SD
3. **คำบรรยายตรงกับตัวเลขไหม:** "grows slightly" แต่จริงโต 2.96 เท่า, "approx. 5 times" แต่จริง 1.8 ถึง 5.0 เท่า

---

## บทที่ 7: Code Lab ภาษา Go

โปรแกรมใน `code/raftsim/main.go` เป็นแบบจำลองเพื่อการเรียนรู้ ไม่ใช่ Raft เต็มรูปแบบ (ไม่มีเครือข่ายและ log index) แต่คงกฎสามข้อที่บทความใช้ คือ randomised timeout, เสียงข้างมาก และ checkpoint ที่สำเนาไปทุกโหนด ตรวจแล้วผ่าน `go vet` และรันได้กับ Go 1.22 ขึ้นไป

```go
// Quorum is the number of votes needed in an N-node Raft cluster.
func Quorum(n int) int { return n/2 + 1 }

// MaxFailures is how many nodes may fail at the same time while the cluster still works.
func MaxFailures(n int) int { return (n - 1) / 2 }

// Elect draws a fresh 150-300 ms timeout for every live node; the first to time out
// becomes candidate and wins only if the live nodes form a majority of the whole cluster.
func (c *Cluster) Elect() error {
	live := c.alive()
	for _, n := range live {
		n.Timeout = 150 + c.rng.Intn(151)
	}
	sort.Slice(live, func(i, j int) bool { return live[i].Timeout < live[j].Timeout })
	c.Term++
	if len(live) < Quorum(len(c.Nodes)) {
		c.Leader = nil
		return fmt.Errorf("term %d: only %d of %d nodes alive, need %d votes", c.Term, len(live), len(c.Nodes), Quorum(len(c.Nodes)))
	}
	c.Leader = live[0]
	return nil
}

// Checkpoint writes the aggregated state on the leader and copies it to every live follower.
func (c *Cluster) Checkpoint(cp Checkpoint) {
	for _, n := range c.alive() {
		n.State = Checkpoint{Round: cp.Round, Params: append([]float64(nil), cp.Params...)}
	}
}
```

**ผลลัพธ์เมื่อรัน `cd code/raftsim && go run .`:**

```text
N  quorum  max failures
2  2       0
3  2       1
5  3       2
11 6       5

term 1: node 8 is aggregator
checkpoint after round 3 replicated to 11 nodes
term 2: node 11 takes over and resumes from round 4
term 3: only 5 of 11 nodes alive, need 6 votes
```

ตามด้วยตารางอัตราส่วนทราฟฟิก 1.81 ถึง 5.01 ของ Fig. 4

**แบบฝึกหัด:**
1. เปลี่ยน `NewCluster(11, 7)` เป็น `NewCluster(2, 7)` แล้วปิด aggregator ระบบเลือกผู้นำใหม่ได้หรือไม่ เทียบกับจุด 1 worker ใน Fig. 3
2. เพิ่มฟิลด์ `Persisted bool` ให้ checkpoint บันทึกลงดิสก์ (Level 1 + Level 3) แล้วจำลองกรณีทุกโหนดดับพร้อมกัน
3. แก้ `Checkpoint` ให้สำเนาเฉพาะ 3 โหนดแรก (selective replication ใน Section 7.1) แล้วนับจำนวนสำเนาที่ลดลง

**ถ้าจะทำจริงใน production:** ใช้ไลบรารี Raft ภาษา Go ที่ผ่านการใช้งานจริง เช่น `go.etcd.io/raft/v3` หรือ `github.com/hashicorp/raft` ซึ่งมี log index, snapshot และบันทึกลงดิสก์ ต้นแบบของผู้เขียนอยู่ที่ github.com/SINTEF-9012/raft_flower (Python + PySyncObj)

---

## บทที่ 8: คิดเชิงวิพากษ์

| ประเด็น | สิ่งที่บทความทำ | ช่องว่าง |
| :--- | :--- | :--- |
| Quorum | ไม่อภิปราย | 11 โหนดทนได้ 5 และจุด 1 worker ใน Fig. 3 ยังไม่มีคำอธิบาย |
| ทราฟฟิก | วัด 1 รอบ clean run | ไม่มีกรณีดับระหว่างวัด ไม่แยกองค์ประกอบของทราฟฟิก |
| ความแม่นยำ | อ้างว่าเท่า baseline (เชิงอรรถ 11) | ไม่วัดในกรณีที่มีการกู้คืน |
| Dataset | CIFAR-10, 250 kB | ไม่ใช่ข้อมูลเซนเซอร์ โมเดลจริงใหญ่กว่า |
| ความผิดพลาด | crash fault | ไม่กัน aggregator ที่โกง |
| ความคงทน | เก็บในหน่วยความจำ | ดับพร้อมกันทั้งหมดแล้วสถานะหาย |

**จุดเล็กที่สังเกตได้ในไฟล์:** หน้า 110 พิมพ์ "Internet of Tings" และท้ายหน้า 121 มีบรรทัด "Received 20 February 2007; revised 12 March 2009; accepted 5 June 2009" ซึ่งเป็นข้อความตัวอย่างจากแม่แบบ ACM ที่หลงเหลือ ไม่ใช่วันที่จริงของบทความ (ใช้ตอบได้ถ้าถูกถามเรื่องความละเอียดในการอ่าน ไม่จำเป็นต้องพูดในการนำเสนอ)

---

## บทที่ 9: เชื่อมกับระบบที่ใช้จริง

- **etcd:** ที่เก็บสถานะของ Kubernetes ใช้ Raft โดยตรง ทุกการเขียนผ่าน leader และบันทึก write-ahead log ลงดิสก์
- **Apache Kafka โหมด KRaft:** KIP-500 แทน ZooKeeper ด้วย controller quorum ที่ใช้ฉันทามติตระกูล Raft จัดการ metadata ของคลัสเตอร์
- **บทเรียนที่นำมาใช้กับ Raft-FL:** แยก quorum ขนาดเล็ก (3 หรือ 5 เครื่อง) ออกจาก client จำนวนมาก และเขียนลงดิสก์ก่อนตอบรับ ช่วยทั้งเรื่องทราฟฟิกและเรื่องดับพร้อมกัน (ความเห็นของผู้จัดทำ บทความไม่ได้กล่าวถึง etcd หรือ Kafka)

---

## บทที่ 10: แบบทดสอบตนเอง

1. aggregator ของ FL เป็นปัญหาเพราะอะไร
2. Level 3 ต่างจาก Level 2 อย่างไร
3. ทำไมต้องสุ่ม election timeout
4. คลัสเตอร์ 7 โหนดทนการดับพร้อมกันได้กี่โหนด
5. ที่ 5 worker ทราฟฟิกแบบมี Raft สูงกว่าเดิมกี่เท่า

**เฉลย:** (1) เป็น Single Point of Failure ดับแล้วการฝึกหยุดทั้งระบบ (2) Level 3 ฝึกต่อจาก checkpoint ที่สำเนาไว้ ส่วน Level 2 เริ่มจากศูนย์ (3) เพื่อลดโอกาสหลายโหนดเป็น candidate พร้อมกันจนคะแนนแตก (4) 3 โหนด (5) 16.0 / 5.02 = 3.19 เท่า

---

## อภิธานศัพท์

| ศัพท์ | คำอ่าน | ความหมาย |
| :--- | :--- | :--- |
| Federated Learning | เฟด-เดอ-เรต-เท็ด เลิร์น-นิง | การเรียนรู้แบบสหพันธ์ ฝึกโมเดลร่วมกันโดยข้อมูลอยู่ที่ปลายทาง |
| Aggregator | แอก-กรี-เก-เตอร์ | เครื่องที่รวมพารามิเตอร์จาก worker |
| Consensus | คอน-เซน-ซัส | ฉันทามติ การทำให้หลายโหนดตกลงค่าเดียวกัน |
| Quorum | โคว-รัม | จำนวนสมาชิกขั้นต่ำที่ต้องเห็นด้วย |
| Term | เทิร์ม | ช่วงเวลาที่มีหมายเลขใน Raft มี leader ได้ไม่เกินหนึ่งคน |
| Heartbeat | ฮาร์ต-บีต | ข้อความยืนยันว่า leader ยังทำงาน |
| Checkpoint | เช็ก-พอยต์ | จุดบันทึกสถานะเพื่อกู้คืนภายหลัง |
| Crash fault / Byzantine fault | แครช ฟอลต์ / บิ-แซน-ไทน์ ฟอลต์ | โหนดหยุดทำงาน / โหนดทำงานผิดหรือโกง |
