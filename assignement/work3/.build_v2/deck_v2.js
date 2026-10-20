// Single source of truth for the Paper III Version 2 spoken script (7 slides, 4:45 total).
//
// Consumed by:
//   build_pptx_v2.js          -> speaker notes in the PPTX
//   build_docs_v2.js          -> 04_presentation_v2/*.md and paper-3/assets/v2/js/raftfl-data.js
//
// Markup inside paragraphs:
//   **text**   = key term / number to stress
//   {b}        = planned breath pause
//   [[text]]   = optional sentence: cut it when running late (the slide still makes sense)
// Every number is traced to the PDF (SEAMS 2024, IEEE Doc ID: 10556381) in
// 06_evidence_v2/source-verification.md.

module.exports = {
  meta: {
    presenter: 'นายธีรภัทร์ ภู่ระยา',
    order: 10,
    studentId: '66362416',
    course: '305432 เครือข่ายเซนเซอร์ (Sensor Networks)',
    paperTitle: 'Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning',
    paperTitleTh: 'การใช้โปรโตคอล Raft เพื่อความทนทานต่อความผิดพลาดและการกู้คืนตนเองในการเรียนรู้แบบสหพันธ์',
    authors: 'Rustem Dautov, Erik Johannes Husom',
    affiliation: 'SINTEF Digital, Oslo, Norway',
    venue: '2024 IEEE/ACM 19th Symposium on Software Engineering for Adaptive and Self-Managing Systems (SEAMS)',
    venueShort: 'SEAMS 2024',
    doi: '10.1145/3643915.3644093',
    ieee: '10556381',
    pages: '110-121',
    totalSeconds: 285,
  },
  stages: [
    {
      start: 0, end: 25,
      title: '1. หน้าปก',
      slideTitle: 'หน้าปกบทความวิจัย (Cover Slide)',
      keywords: ['แนะนำตัว', 'Raft + Federated Learning, SEAMS 2024, IEEE Doc ID: 10556381', 'คำถามหลัก: aggregator ดับแล้วฝึกต่อเองได้อย่างไร'],
      paragraphs: [
        'สวัสดีครับอาจารย์และเพื่อนทุกคน ผมธีรภัทร์ ภู่ระยา รหัสนิสิต 66362416 ขอสรุปบทความ **Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning** ของ Rustem Dautov และ Erik Johannes Husom จาก SINTEF ประเทศนอร์เวย์ ตีพิมพ์ในงาน **SEAMS 2024** หมายเลขเอกสาร IEEE **10556381** ครับ {b}',
        'คำถามหลักคือ ถ้าเครื่องกลางของ Federated Learning ดับกลางคัน ระบบจะฝึกต่อเองได้อย่างไรครับ',
      ],
    },
    {
      start: 25, end: 65,
      title: '2. ปัญหา Single Point of Failure',
      slideTitle: 'ที่มาและปัญหาความท้าทาย (Research Challenges & Problem Statement)',
      keywords: ['FL: ฝึกที่ปลายทาง ส่งเฉพาะพารามิเตอร์', 'aggregator เครื่องเดียว = Single Point of Failure', 'gossip / blockchain หนักเกินสำหรับ IoT'],
      paragraphs: [
        'เริ่มจากปัญหาครับ **Federated Learning** ให้อุปกรณ์ปลายทาง เช่น โหนดเซนเซอร์หรือเกตเวย์ ฝึกโมเดลด้วยข้อมูลของตัวเอง แล้วส่งเฉพาะพารามิเตอร์ไปให้เครื่องกลางที่เรียกว่า **aggregator** รวมเป็นโมเดลเดียว {b}',
        'จุดอ่อนคือ aggregator มีเพียงเครื่องเดียว จึงเป็น **Single Point of Failure** ถ้าเครื่องนี้ดับ การฝึกหยุดทั้งระบบ และความคืบหน้าที่ยังไม่บันทึกก็หายไป {b}',
        '[[ทางเลือกเดิมอย่าง gossip learning หรือการเก็บสถานะบน blockchain ผู้เขียนมองว่าหนักเกินไปสำหรับอุปกรณ์ที่มีทรัพยากรจำกัด]] โจทย์จึงเป็นกลไกกู้คืนตนเองแบบเบา ที่ใส่ลงในเฟรมเวิร์กเดิมได้เลยครับ',
      ],
    },
    {
      start: 65, end: 110,
      title: '3. Raft และ Leader Election',
      slideTitle: 'สถาปัตยกรรม Raft-FL และกลไก Leader Election',
      keywords: ['Raft: follower, candidate, leader', 'election timeout สุ่ม + term + เสียงข้างมาก', 'heartbeat, log replication', 'leader = aggregator'],
      paragraphs: [
        'ผู้วิจัยเลือก **Raft** ซึ่งเป็นอัลกอริทึมฉันทามติที่ออกแบบให้เข้าใจง่าย มีสามกลไกครับ {b}',
        'หนึ่ง **Leader Election** ทุกโหนดเริ่มเป็น follower ถ้าไม่ได้รับ heartbeat จากผู้นำจนครบ **election timeout** ที่สุ่มไว้ โหนดนั้นจะเป็น candidate เพิ่มเลข term แล้วขอคะแนนเสียง ใครได้ **เสียงข้างมาก** ก็เป็นผู้นำ [[การสุ่ม timeout ช่วยลดโอกาสที่คะแนนเสียงแตก]] {b}',
        'สอง **Heartbeat** ผู้นำส่งสัญญาณเป็นระยะเพื่อบอกว่ายังทำงานอยู่ สาม **Log Replication** ผู้นำส่งรายการบันทึกไปให้ follower และถือว่า commit เมื่อเสียงข้างมากตอบรับ {b}',
        'ในงานนี้ ผู้นำของ Raft ก็คือ aggregator ของ Federated Learning ส่วน follower คือ worker ครับ',
      ],
    },
    {
      start: 110, end: 155,
      title: '4. Checkpoint และ Self-Recovery',
      slideTitle: 'กลไก Checkpoint Logging และ Self-Recovery Workflow',
      keywords: ['Level 0 ถึง 4, เลือก Level 3', 'โค้ดชุดเดียวกันทุกโหนด', 'checkpoint 3 จุด -> replicated key-value (PySyncObj)', 'worker ตรวจ aggregator ทุกรอบ -> เลือกใหม่ -> ฝึกต่อ'],
      paragraphs: [
        'ผู้เขียนแบ่งการกู้คืนเป็น **ห้าระดับ** ตั้งแต่ Level 0 ที่ไม่มีการกู้คืน จนถึง Level 4 ที่สำเนาสถานะของทุกโหนด และเลือก **Level 3** คือสำเนาเฉพาะพารามิเตอร์ที่ aggregator รวมแล้ว {b}',
        'ทุกโหนดรันโค้ดชุดเดียวกัน โหนดที่ชนะการเลือกตั้งทำหน้าที่ aggregator และมี **checkpoint สามจุด** คือ หลังตั้งค่าพารามิเตอร์เริ่มต้น หลังรวมผลการฝึก และหลังรวมผลการประเมิน ทุก checkpoint เขียนพารามิเตอร์ลง replicated key-value ของ PySyncObj ซึ่งกระจายไปทุกโหนดใน thread แยก {b}',
        'เมื่อจบแต่ละรอบ worker ตรวจว่า aggregator ยังอยู่หรือไม่ ถ้าไม่อยู่ก็กลับไปเลือกตั้งใหม่ แล้ว aggregator คนใหม่ฝึกต่อจาก checkpoint ล่าสุด ไม่ต้องเริ่มจากศูนย์ครับ',
      ],
    },
    {
      start: 155, end: 205,
      title: '5. ผลการทดลอง',
      slideTitle: 'ผลการทดลองเชิงประจักษ์บน Raspberry Pi 11 บอร์ด',
      keywords: ['11 Raspberry Pi 3, Wi-Fi, CIFAR-10', 'เลือกใหม่ 1.27 ถึง 3.76 วินาที', 'ทราฟฟิก 0.98-9.8 MB vs 1.77-49.1 MB', '1.8 เท่า -> 5.0 เท่า (คำนวณเอง)'],
      paragraphs: [
        'การทดลองใช้ **Raspberry Pi 3 จำนวน 11 บอร์ด** เชื่อมผ่าน Wi-Fi ฝึก CNN บน CIFAR-10 และเทียบกับ Flower แบบเดิมที่ 1 ถึง 10 worker {b}',
        'ผลแรกคือเวลาเลือก aggregator ใหม่หลังจงใจปิดเครื่องเดิม ใช้ **1.27 วินาที** ที่ 1 worker และ **3.76 วินาที** ที่ 10 worker และทุกครั้งฝึกต่อจนจบ {b}',
        'ผลที่สองคือทราฟฟิกหนึ่งรอบการฝึก Flower เดิมใช้ **0.98 ถึง 9.8 เมกะไบต์** โตเป็นเส้นตรง แต่แบบมี Raft ใช้ **1.77 ถึง 49.1 เมกะไบต์** {b}',
        'เมื่อผมหารเทียบกัน ทราฟฟิกสูงกว่าเดิม **1.8 เท่า** ที่ 1 worker และ **5.0 เท่า** ที่ 10 worker ข้อค้นพบคือ ค่าประมาณห้าเท่าที่บทความเขียน ใช้ได้เฉพาะปลายกราฟ และเวลาเลือกตั้งใหม่โตเกือบ **สามเท่า** ไม่ได้โตเพียงเล็กน้อยครับ',
      ],
    },
    {
      start: 205, end: 250,
      title: '6. คุณูปการและการเชื่อมโยงกับงานจริง',
      slideTitle: 'คุณูปการและการเชื่อมโยงกับเครือข่ายเซนเซอร์และ Distributed Event Streaming',
      keywords: ['คุณูปการ 3 ข้อ: ระดับการกู้คืน, ต้นแบบเปิดโค้ด, วัดบนฮาร์ดแวร์จริง', 'เกตเวย์เซนเซอร์ก็เป็น SPOF', 'etcd, Kafka KRaft ใช้ตระกูล Raft', 'ความทนทาน = สำเนา + quorum'],
      paragraphs: [
        'คุณูปการของบทความมีสามข้อครับ คือ กรอบการกู้คืนห้าระดับด้วย Raft ต้นแบบบน Flower ที่เปิดซอร์สโค้ด และการวัดผลบนฮาร์ดแวร์จริง {b}',
        'ในเครือข่ายเซนเซอร์ เกตเวย์ที่รวมข้อมูลก็เป็นจุดเดียวที่ดับได้เหมือนกัน แนวคิดนี้ให้ทุกเกตเวย์รันโค้ดเดียวกัน แล้วให้ Raft ตัดสินว่าใครเป็นผู้รวม {b}',
        'กลไกเดียวกันนี้อยู่ในระบบที่ใช้จริง **etcd** ของ Kubernetes ใช้ Raft เก็บสถานะคลัสเตอร์ และ **Kafka โหมด KRaft** ใช้ฉันทามติตระกูล Raft จัดการ metadata แทน ZooKeeper {b}',
        'จากงาน Go และ Kafka ที่ผมทำ ข้อแลกเปลี่ยนตรงกัน คือความทนทานต้องจ่ายด้วยการสำเนาข้อมูล และต้องมีโหนดเหลือมากกว่าครึ่ง [[ถ้าโมเดลใหญ่ ควรสำเนา checkpoint ไปเพียงบางโหนด ตามที่ผู้เขียนเสนอเป็นงานในอนาคต]]',
      ],
    },
    {
      start: 250, end: 285,
      title: '7. ข้อจำกัดและบทสรุป',
      slideTitle: 'ข้อจำกัดทางวิศวกรรมและบทสรุป (Engineering Limitations & Conclusion)',
      keywords: ['quorum: 11 โหนดทนได้ 5, จุด 1 worker', 'วัดทราฟฟิก 1 รอบ clean run, ไม่มี accuracy', 'CIFAR-10 ไม่ใช่ข้อมูลเซนเซอร์', 'สรุป: < 4 วินาที แลกทราฟฟิกสูงสุด 5 เท่า'],
      paragraphs: [
        'สุดท้ายคือข้อจำกัดครับ {b} หนึ่ง บทความไม่อภิปราย **quorum** คลัสเตอร์ 11 โหนดทนการดับพร้อมกันได้ไม่เกิน **5 โหนด** และจุด 1 worker ในกราฟ ซึ่งเหลือ 1 ใน 2 โหนด ตาม Raft มาตรฐานจะเลือกผู้นำไม่ได้ สอง วัดทราฟฟิกเพียงหนึ่งรอบแบบไม่มีเครื่องดับ และไม่ได้วัดความแม่นยำหลังกู้คืน สาม ข้อมูลเป็นภาพ CIFAR-10 ไม่ใช่ข้อมูลเซนเซอร์ {b}',
        'สรุปคือ Raft ทำให้ Federated Learning กู้คืนตนเองได้ภายใน **4 วินาที** แลกกับทราฟฟิกสูงสุด **5 เท่า** ขอบคุณครับ',
      ],
    },
  ],
};
