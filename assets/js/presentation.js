/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * 5-Minute Presentation Studio Engine & Teleprompter Controller
 * Supports:
 * 1. Peer-to-Peer Academic Speech Mode (เพื่อนพูดให้เพื่อนฟังหน้าห้อง - สาระล้วน ไม่มีน้ำ อิงเปเปอร์ตรงๆ)
 * 2. Executive Presentation Mode (บทนำเสนอมาตรฐาน)
 * 3. Multi-Paper Support (Paper I IoT-CAD & Paper I Backup MCSOA)
 */

const PRESENTATION_DATA = {
  'iot-cad': {
    peer: [
      {
        id: 0,
        start: 0,
        end: 45,
        title: "1. ปัญหาวิจัย: EA vs SDA",
        timeLabel: "0:00 - 0:45",
        slide: {
          num: "Slide 1 / 5",
          title: "ปัญหาวิจัย: Environmental Anomaly (EA) vs Sensing Device Anomaly (SDA)",
          bullets: [
            "บทความ: IoT-CAD (IEEE/ACM ICCAD 2020) โดยนักวิจัยจาก UC Irvine",
            "โจทย์ตั้งต้น: ทำไม Single-sensor Thresholding ล้มเหลว? อุณหภูมิ 50 °C เดี่ยวๆ ไม่สามารถแยกแยะไฟไหม้จริงออกจากเซนเซอร์พัง",
            "นิยามสำคัญ: EA (สิ่งแวดล้อมผิดปกติจริง) vs SDA (เซนเซอร์รวน/เข็มหัก/ถูกแฮก)",
            "ข้อเสนอของงาน: ใช้ Cross-Sensor Association หรือพยานบริบทข้ามเซนเซอร์ในการตัดสิน"
          ],
          diagram: "[ ข้อจำกัดของเซนเซอร์เดี่ยว ]\nTemp Sensor โดดๆ = 50 °C ──▶ ? (ไม่รู้ว่าไฟไหม้จริง หรือ เซนเซอร์ชำรุด)\n[ ทางแก้ของ IoT-CAD ]\nตรวจความสัมพันธ์ข้ามมิติ: Temp + Light + Smoke พร้อมกัน",
          citation: "Yasaei et al., ICCAD 2020, Section I (Fig. 1)"
        },
        scriptHtml: `
          <p><strong>[0:00 - 0:45 · วัตถุประสงค์และปัญหาวิจัย (Section I, Fig. 1)]</strong></p>
          <p>
            สวัสดีครับอาจารย์และเพื่อนๆ ทุกคน วันนี้กลุ่มเราจะมาสรุปเปเปอร์ <em>IoT-CAD: Context-Aware Adaptive Anomaly Detection in IoT Systems Through Sensor Association</em> จากการประชุมวิชาการระดับสากล IEEE/ACM ICCAD ปี 2020 ครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ประเด็นทางวิศวกรรมของเปเปอร์นี้อยู่ที่การตั้งคำถามว่า <span class="highlight-key">“ในระบบ IoT หรือ Cyber-Physical Systems ขนาดใหญ่ เมื่อเซนเซอร์ตัวหนึ่งส่งค่าสูงผิดปกติ เราจะแยกได้อย่างไรระหว่างไฟไหม้จริง กับเซนเซอร์ชำรุดหรือถูกเจาะระบบ?”</span>
          </p>
          <p>
            ผู้เขียนชี้ให้เห็นใน Figure 1 ว่า การใช้วิธีดั้งเดิมที่ตั้ง Threshold ดูทีละเซนเซอร์โดดๆ ล้มเหลวแน่นอน เพราะค่าอุณหภูมิ 50 องศาเซลเซียส ไม่สามารถยืนยันความจริงได้ด้วยตัวเอง ผู้เขียนจึงนิยามสองสภาวะนี้ว่า <span class="highlight-key">Environmental Anomaly (EA)</span> และ <span class="highlight-key">Sensing Device Anomaly (SDA)</span> โดยเสนอให้ใช้ความสัมพันธ์ของกลุ่มเซนเซอร์ข้างเคียงเป็นพยานในการตัดสินครับ
          </p>
        `
      },
      {
        id: 1,
        start: 45,
        end: 95,
        title: "2. สถาปัตยกรรม 3 ระดับ & Threat Model",
        timeLabel: "0:45 - 1:35",
        slide: {
          num: "Slide 2 / 5",
          title: "สถาปัตยกรรมระบบ 3 ระดับ (Edge-Fog-Cloud) & Threat Model",
          bullets: [
            "Edge Layer: เซนเซอร์ทางกายภาพ รวบรวม raw data ส่งผ่านโปรโตคอลไร้สาย",
            "Fog Layer: เกตเวย์/แล็ปท็อป ประมวลผล Fingerprint, Clustering, LSTM และโหวตฉันทามติแบบ Real-time",
            "Cloud Layer: ฐานข้อมูลส่วนกลางสำหรับ Periodic Model Retraining เมื่อเกิด Concept Drift",
            "Threat Model: รองรับทั้ง Physical Faults (ไฟไหม้/สารเคมีรั่ว) และ Cyber Attacks (Fault Injection/Data Tampering)"
          ],
          diagram: "Edge (Raw Sensing) ──▶ Fog (Real-time Feature + LSTM + Consensus) ──▶ Cloud (Global Retraining)\n                       ▲\nThreats: Physical Anomaly (EA) | Sensor Cyber-Attack & Fault (SDA)",
          citation: "Yasaei et al., ICCAD 2020, Section II (Fig. 2)"
        },
        scriptHtml: `
          <p><strong>[0:45 - 1:35 · สถาปัตยกรรมระบบ 3 ระดับและ Threat Model (Section II, Fig. 2)]</strong></p>
          <p>
            ในส่วนที่สอง ผู้เขียนออกแบบสถาปัตยกรรมระบบเป็น 3 ระดับตาม Figure 2 เพื่อให้ทำงานแบบ Real-time ได้จริง: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ระดับแรกคือ <span class="highlight-key">Edge Layer</span> ทำหน้าที่เก็บข้อมูลดิบจากเซนเซอร์ทางกายภาพ, ระดับที่สองคือ <span class="highlight-key">Fog Layer</span> บนเกตเวย์หรือคอมพิวเตอร์ในพื้นที่ ซึ่งเป็นจุดประมวลผลหลักของ IoT-CAD ในการสกัด Feature, รันโมเดลทำนาย และรัน Consensus Algorithm ตรวจจับ Anomaly แบบ Low-latency และระดับที่สามคือ <span class="highlight-key">Cloud Layer</span> สำหรับ Retrain โมเดลขนาดใหญ่เมื่อโครงข่ายมีการเปลี่ยนแปลง
          </p>
          <p>
            ในแง่ของ Threat Model ระบบถูกออกแบบมาให้รองรับทั้งความผิดปกติทางกายภาพ เช่น ไฟไหม้จริง และการโจมตีทางไซเบอร์ที่ตัวเซนเซอร์ เช่น การฉีดค่าปลอม (Fault Injection) หรือข้อมูลบิดเบือน ซึ่งทั้งหมดจะถูกตรวจจับได้ที่ระดับ Fog ก่อนส่งต่อไปยัง Cloud ครับ
          </p>
        `
      },
      {
        id: 2,
        start: 95,
        end: 175,
        title: "3. กลไกเชิงลึก 4 ขั้นตอน",
        timeLabel: "1:35 - 2:55",
        slide: {
          num: "Slide 3 / 5",
          title: "กลไกการทำงานเชิงลึก 4 ขั้นตอนของ IoT-CAD",
          bullets: [
            "ขั้น 1 Binary Fingerprint: ใช้สมการที่ (1) ตัดปัญหาหน่วยวัดต่างกัน แปลงการเปลี่ยนของค่าเฉลี่ยเป็นบิต 0/1",
            "ขั้น 2 Clustering: วัดความเหมือนด้วย Hamming Distance คลัสเตอร์ต้องมีสมาชิก ≥ 3 โหนดเพื่อทำฉันทามติ",
            "ขั้น 3 Predictive Model: LSTM Encoder-Decoder ประจำคลัสเตอร์ คำนวณ Reconstruction Error ด้วย Multivariate Gaussian",
            "ขั้น 4 Consensus Algorithm: เสียงส่วนใหญ่ชี้ขาด ถ้าผิดร่วมกัน = EA, ถ้าผิดโดดเดี่ยว = SDA พร้อม Adaptive Retrain"
          ],
          diagram: "Raw Data ──▶ Binary Fingerprint [0,1,1,0] ──▶ Hamming Distance Cluster\n               ──▶ LSTM Encoder-Decoder ──▶ Mahalanobis Distance (α Threshold)\n               ──▶ Consensus Algorithm (3 ต่อ 1) ──▶ สรุป EA หรือ SDA",
          citation: "Yasaei et al., ICCAD 2020, Section III & IV (Eq. 1-10)"
        },
        scriptHtml: `
          <p><strong>[1:35 - 2:55 · กลไกวิธีวิจัย 4 ขั้นตอน (Section III & IV)]</strong></p>
          <p>
            มาถึงหัวใจทางเทคนิคของ IoT-CAD ซึ่งแบ่งออกเป็น 4 ขั้นตอนอย่างชัดเจนครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <span class="highlight-key">ขั้นแรก Binary Fingerprint:</span> เพื่อแก้ปัญหาเรื่องหน่วยวัดที่เข้ากันไม่ได้ เช่น องศาเซลเซียสกับค่าลักซ์ ผู้เขียนใช้สมการที่ (1) แปลงทิศทางการเปลี่ยนแปลงของค่าเฉลี่ยในหน้าต่างเวลา เทียบกับค่าคาดหวัง ออกมาเป็นบิต 0 หรือ 1 ว่ามีแนวโน้มเพิ่มขึ้นหรือลดลง
          </p>
          <p>
            <span class="highlight-key">ขั้นที่สอง Clustering ด้วย Hamming Distance:</span> ใช้ระยะห่างแบบ Hamming วัดจำนวนบิตที่ต่างกันเพื่อจัดกลุ่มเซนเซอร์ที่มีการตอบสนองสอดคล้องกัน โดยกำหนดว่าคลัสเตอร์ต้องมีเซนเซอร์อย่างน้อย 3 ตัวขึ้นไปเพื่อใช้โหวตฉันทามติ
          </p>
          <p>
            <span class="highlight-key">ขั้นที่สาม Predictive Model:</span> แต่ละคลัสเตอร์ใช้ LSTM Encoder-Decoder ตัวเดียวกันทำนายค่าปกติ จากนั้นนำ Reconstruction Error Vector เข้าสู่ Multivariate Gaussian Estimator เพื่อหาค่าความผิดปกติเทียบกับขีดเริ่มเปลี่ยนอัลฟ่า (α)
          </p>
          <p>
            <span class="highlight-key">และขั้นที่สี่ Consensus Algorithm:</span> ตัดสินด้วยกฎฉันทามติ ถ้าเซนเซอร์ในคลัสเตอร์เกินครึ่งหนึ่งฟ้องผิดปกติพร้อมกัน สรุปว่าเป็น EA (สิ่งแวดล้อมเกิดเหตุจริง) แต่ถ้ามีเพียงตัวเดียวที่ผิดปกติคนเดียว สรุปว่าเป็น SDA (เซนเซอร์รวน) และตัดเซนเซอร์ตัวนั้นเข้าสู่กระบวนการ Adaptive Update ครับ
          </p>
        `
      },
      {
        id: 3,
        start: 175,
        end: 245,
        title: "4. Testbed จริง & ผลลัพธ์เชิงปริมาณ",
        timeLabel: "2:55 - 4:05",
        slide: {
          num: "Slide 4 / 5",
          title: "การประเมินผลบน Testbed จริง & การวิเคราะห์เชิงปริมาณ",
          bullets: [
            "Hardware Setup: 62 เซนเซอร์, 13 มิติทางกายภาพ, โปรโตคอล IEEE 802.15.4 (TinyOS), Fog Laptop i7",
            "Data Collection: เก็บข้อมูลต่อเนื่อง 8 วัน รวม ~2.3 ล้านการวัดเพื่อทดสอบความเสถียร",
            "Latency: เวลาประมวลผลเฉลี่ย 0.532 วินาทีต่อรอบ ยืนยันทำงาน Real-time ได้บน Fog",
            "Performance: Precision 92.0%, Recall 56.0%, F1-Score 70.0% (Precision เหนือกว่า One-Class SVM 89%)",
            "Critical Insight: Recall 56% เกิดจากการตั้งขีดเริ่มเปลี่ยน α อย่างเข้มงวดเพื่อกด False Alarm ให้ต่ำที่สุด"
          ],
          diagram: "[ ตารางเปรียบเทียบผลการทดลอง (Table 2 & 3) ]\nIoT-CAD:       Precision 92.0% | Recall 56.0% | F1 70.0% | Latency 0.532 s\nOne-Class SVM: Precision 89.0% | Recall 25.0% | F1 39.0% | Latency 1.240 s\nSingle LSTM:   Precision 82.1% | Recall 41.2% | F1 54.8% | Latency 0.810 s",
          citation: "Yasaei et al., ICCAD 2020, Section VI (Table 2 & 3)"
        },
        scriptHtml: `
          <p><strong>[2:55 - 4:05 · การทดลองบนฮาร์ดแวร์จริงและตัวเลขประเมิน (Section VI, Table 2 & 3)]</strong></p>
          <p>
            ในส่วนการทดลอง ผู้เขียนสร้าง Testbed จริงขนาดใหญ่ในอาคาร: ใช้เซนเซอร์ 62 ตัว ครอบคลุม 13 มิติทางกายภาพ เช่น อุณหภูมิ ความชื้น แสง เสียง และการเคลื่อนไหว สื่อสารผ่าน IEEE 802.15.4 รวบรวมผ่าน Raspberry Pi และประมวลผลบน Fog Laptop Core i7 เก็บข้อมูลต่อเนื่อง 8 วัน รวมกว่า 2.3 ล้านจุดวัดครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ผลลัพธ์ในตารางที่ 2 และ 3 สรุปได้ดังนี้ครับ:
          </p>
          <p>
            ประการแรก <span class="highlight-key">ด้านความเร็ว (Latency):</span> ระบบใช้เวลาประมวลผลเพียง <span class="highlight-key">0.532 วินาทีต่อรอบ</span> เร็วกว่ารอบการเก็บข้อมูลของเซนเซอร์ จึงพิสูจน์ว่าทำงาน Real-time ได้จริงบน Fog Computing
          </p>
          <p>
            ประการที่สอง <span class="highlight-key">ด้านความแม่นยำ:</span> IoT-CAD ทำคะแนน <span class="highlight-key">Precision ได้ถึง 92.0%</span> สูงกว่า One-Class SVM ที่ได้ 89% และ LSTM เดี่ยวที่ได้ 82.1% อย่างมีนัยสำคัญ
          </p>
          <p>
            <span class="highlight-warn">แต่จุดวิเคราะห์เชิงลึกที่ต้องพูดคือ Recall:</span> เปเปอร์รายงาน Recall อยู่ที่ <span class="highlight-warn">56.0%</span> สาเหตุเพราะผู้เขียนตั้งค่า Threshold อัลฟ่า ให้เข้มงวดเพื่อลด False Alarm ส่งผลให้ยังมี Anomaly หลุดรอดไปถึง 44% ซึ่งเป็นประเด็นที่อาจารย์มักตั้งคำถามครับ
          </p>
        `
      },
      {
        id: 4,
        start: 245,
        end: 300,
        title: "5. สรุปคุณค่า ข้อจำกัด และบทเรียน",
        timeLabel: "4:05 - 5:00",
        slide: {
          num: "Slide 5 / 5",
          title: "บทวิจารณ์เชิงวิชาการ ข้อจำกัด และบทสรุปสำหรับวิศวกรรมคอมพิวเตอร์",
          bullets: [
            "คุณค่าหลัก: ค้นพบ Context ข้ามเซนเซอร์อัตโนมัติโดยไม่ต้องตั้งกฎทางกายภาพล่วงหน้า",
            "ข้อจำกัดด้านความปลอดภัย: หากถูก Coordinated Attack เกินครึ่งหนึ่งของกลุ่ม อาจหลอกฉันทามติได้",
            "ข้อจำกัดการปรับตัว: การทำ Partial/Complete Update ยังมีค่าใช้จ่ายส่งข้อมูลกลับไป Cloud",
            "การประยุกต์ใช้: นำแนวคิด Cross-Sensor Association ไปปรับใช้ใน Smart Building, เกษตรแม่นยำ, และโรงงานอัจฉริยะ"
          ],
          diagram: "[ ข้อสรุปทางวิศวกรรม ]\nความน่าเชื่อถือของระบบเซนเซอร์ ไม่ได้เกิดจากตัววัดตัวเดียว\nแต่อยู่ที่ “ความสัมพันธ์ของบริบท (Association)” ที่ประมวลผลบน Fog Computing",
          citation: "Yasaei et al., ICCAD 2020, Section VII (Conclusion)"
        },
        scriptHtml: `
          <p><strong>[4:05 - 5:00 · สรุปคุณค่า ข้อจำกัด และคำถามเปิด (Section VII)]</strong></p>
          <p>
            สรุปคุณค่าทางวิชาการและข้อจำกัดของเปเปอร์นี้ใน 3 ประเด็นหลักครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            1. <span class="highlight-key">จุดเด่นสำคัญ:</span> IoT-CAD แสดงให้เห็นว่าเราสามารถแยกแยะเหตุการณ์จริงออกจากเซนเซอร์เสียได้ โดยไม่ต้องกำหนดความสัมพันธ์ทางกายภาพไว้ล่วงหน้า ระบบค้นหา Context ได้เองผ่าน Binary Fingerprint
          </p>
          <p>
            2. <span class="highlight-warn">ข้อจำกัดที่ต้องระวัง:</span> หากเซนเซอร์ถูกโจมตีพร้อมกันเป็นกลุ่ม (Coordinated Attack) เกินครึ่งหนึ่งของคลัสเตอร์ อาจหลอกระบบฉันทามติได้ และการย้ายโมเดล LSTM มารันบน Fog ยังคงกินพลังงานมากกว่าการใช้สถิติแบบดั้งเดิม
          </p>
          <p>
            3. <span class="highlight-key">การประยุกต์ใช้:</span> วิธีคิดนี้สามารถนำไปปรับใช้กับโครงงานวิศวกรรมคอมพิวเตอร์และ IoT ในระบบสายส่งไฟฟ้าหรือการเกษตรอัจฉริยะได้อย่างมีประสิทธิภาพครับ
          </p>
          <p>
            กลุ่มเราขอจบการสรุปบทความวิจัย IoT-CAD เพียงเท่านี้ ขอบคุณอาจารย์และเพื่อนๆ ทุกท่านครับ พร้อมรับข้อเสนอแนะและคำถามครับ
          </p>
        `
      }
    ],

    executive: [
      {
        id: 0,
        start: 0,
        end: 45,
        title: "1. ปัญหา: ไฟไหม้ หรือ sensor เสีย?",
        timeLabel: "0:00 - 0:45",
        slide: {
          num: "Slide 1 / 5",
          title: "ปัญหา: “ไฟไหม้ หรือ Sensor เสีย?”",
          bullets: [
            "บทความ: IoT-CAD (IEEE/ACM ICCAD 2020)",
            "ความแตกต่างระหว่าง Environmental Anomaly (EA) vs Sensing Device Anomaly (SDA)",
            "โจทย์วิจัยหลัก: เมื่อเซนเซอร์รายงานค่าผิดปกติ เราจะเชื่อถือได้อย่างไรโดยไม่เกิด False Alarm?"
          ],
          diagram: "[ ปัญหาภาพจำลอง ]\nTemp Sensor เดี่ยวสูง 45 °C ──▶ ? (ไฟไหม้จริง หรือ เซนเซอร์ช็อต?)",
          citation: "Yasaei et al., ICCAD 2020, doi: 10.1145/3400302.3415672"
        },
        scriptHtml: `
          <p><strong>[0:00 - 0:45 · เกริ่นนำและที่มาของปัญหา]</strong></p>
          <p>
            กราบเรียนอาจารย์และสวัสดีเพื่อนๆ ทุกคนครับ วันนี้ผมขอพาทุกท่านมาเจาะลึกบทความวิจัยเรื่อง <em>IoT-CAD: Context-Aware Adaptive Anomaly Detection in IoT Systems Through Sensor Association</em> จากการประชุมวิชาการ IEEE/ACM ICCAD ปี 2020 ครับ
          </p>
          <p>
            ลองจินตนาการถึงระบบอาคารอัจฉริยะ <span class="breath-mark">[สูดหายใจ]</span> จู่ๆ เซนเซอร์อุณหภูมิในห้องก็รายงานค่าพุ่งสูงขึ้นผิดปกติ คำถามสำคัญคือ <span class="highlight-key">“เกิดเพลิงไหม้จริง หรือตัวเซนเซอร์พังหรือถูกแฮกเกอร์โจมตี?”</span> ถ้าเราตีความผิด ระบบอาจไม่แจ้งเตือนจนเกิดโศกนาฏกรรม หรือส่งสัญญาณเตือนภัยลวงจนคนเลิกเชื่อระบบ นี่คือโจทย์ตั้งต้นของงานนี้ครับ
          </p>
        `
      },
      {
        id: 1,
        start: 45,
        end: 95,
        title: "2. Insight: Sensor ไม่ได้อยู่โดดเดี่ยว",
        timeLabel: "0:45 - 1:35",
        slide: {
          num: "Slide 2 / 5",
          title: "Insight: เซนเซอร์ไม่ได้อยู่โดดเดี่ยวในโลกจริง",
          bullets: [
            "เหตุการณ์สิ่งแวดล้อมจริง (เช่น ไฟไหม้) จะกระทบเซนเซอร์หลายชนิดพร้อมกัน (Temp + Light + Smoke)",
            "เซนเซอร์เสียหรือถูกเจาะระบบ มักขัดแย้งกับแบบแผนของกลุ่มเพื่อนบ้าน",
            "แกนหลักของงาน: ใช้ Context = ความสัมพันธ์ของการเปลี่ยนแปลงระหว่างเซนเซอร์"
          ],
          diagram: "[ ความสัมพันธ์พยานบริบท ]\nไฟไหม้จริง ──▶ Temp ▲, Light ▲, Smoke ▲ (สอดคล้องกัน)\nเซนเซอร์พัง ──▶ Temp 1 ▲ คนเดียวโดดๆ ขัดแย้งกับคนอื่น",
          citation: "Yasaei et al., ICCAD 2020, doi: 10.1145/3400302.3415672"
        },
        scriptHtml: `
          <p><strong>[0:45 - 1:35 · Insight และการแยก EA vs SDA]</strong></p>
          <p>
            วิธีเดิมๆ ในอดีตมักจะดูเซนเซอร์แต่ละตัวแยกจากกัน <span class="breath-mark">[สูดหายใจ]</span> ถ้าค่าต่างจากที่เคยทำนายไว้ ก็ฟันธงว่าเป็น Anomaly ทันที แต่วิธีนั้นบอกไม่ได้เลยครับว่าต้นเหตุมาจากไหน
          </p>
          <p>
            IoT-CAD จึงเสนอแนวคิดว่า <span class="highlight-key">“เซนเซอร์ไม่ได้อยู่โดดเดี่ยวในโลกจริง”</span> ถ้าเกิดไฟไหม้จริง อุณหภูมิ แสง และควัน จะต้องเปลี่ยนสอดคล้องกันเป็นกลุ่ม แต่ถ้าอุณหภูมิกระโดดตัวเดียวโดดๆ ขัดแย้งกับตัวอื่น มีโอกาสสูงมากที่จะเป็นเซนเซอร์เสีย โดยผู้เขียนนิยามสองกรณีนี้ว่า <span class="highlight-key">Environmental Anomaly (EA)</span> และ <span class="highlight-key">Sensing Device Anomaly (SDA)</span> ครับ
          </p>
        `
      },
      {
        id: 2,
        start: 95,
        end: 175,
        title: "3. สถาปัตยกรรม IoT-CAD (Pipeline 4 ขั้น)",
        timeLabel: "1:35 - 2:55",
        slide: {
          num: "Slide 3 / 5",
          title: "สถาปัตยกรรม 4 ขั้นตอนของ IoT-CAD",
          bullets: [
            "1. Binary Fingerprint: แปลงทิศทางการเปลี่ยนเป็นบิต (0/1) โดยไม่ยึดติดกับหน่วยวัดทางกายภาพ",
            "2. Sensor Clustering: ใช้ Hamming Distance จัดกลุ่มเซนเซอร์ที่มี Pattern คล้ายกัน (ขั้นต่ำ 3 ตัว)",
            "3. Predictive Model: LSTM Encoder-Decoder ทำนายค่า และ Multivariate Gaussian คำนวณความน่าจะเป็นของ Error",
            "4. Consensus Algorithm: โหวตเสียงข้างมากในกลุ่มเพื่อชี้ขาด EA หรือ SDA พร้อม Adaptive Retraining"
          ],
          diagram: "ดิบ ──▶ Fingerprint ──▶ Hamming Cluster ──▶ LSTM Prediction ──▶ Gaussian ──▶ Consensus",
          citation: "Yasaei et al., ICCAD 2020, doi: 10.1145/3400302.3415672"
        },
        scriptHtml: `
          <p><strong>[1:35 - 2:55 · สถาปัตยกรรม 4 ขั้นตอน]</strong></p>
          <p>
            ระบบทำงานผ่าน 4 ขั้นตอนหลักครับ <span class="breath-mark">[สูดหายใจ]</span><br>
            ขั้นแรก นำค่าเฉลี่ยในหน้าต่างเวลามาแปลงเป็น <span class="highlight-key">Binary Fingerprint</span> เพื่อดูแค่ทิศทางการเปลี่ยนเป็น 0 หรือ 1 ทำให้เราเปรียบเทียบเซนเซอร์วัดอุณหภูมิกับเซนเซอร์วัดแสงได้แม้หน่วยวัดจะต่างกันสิ้นเชิง
          </p>
          <p>
            ขั้นที่สอง ใช้ <span class="highlight-key">Hamming Distance</span> วัดจำนวนบิตที่ต่างกัน แล้วจัดกลุ่มเซนเซอร์ที่มีรูปแบบการเปลี่ยนแปลงคล้ายกัน โดยบังคับว่าต้องมีสมาชิกอย่างน้อย 3 ตัวขึ้นไปเพื่อใช้ในฉันทามติ
          </p>
          <p>
            ขั้นที่สาม ใช้ <span class="highlight-key">LSTM Encoder-Decoder</span> ประจำคลัสเตอร์ ทำนายค่าปกติถัดไป แล้วนำ Reconstruction Error เข้าสู่ <span class="highlight-key">Multivariate Gaussian Estimator</span> เพื่อคำนวณความน่าจะเป็นว่าค่านี้ผิดปกติหรือไม่
          </p>
          <p>
            และขั้นสุดท้าย ใช้ <span class="highlight-key">Consensus Algorithm</span> โหวตเสียงข้างมากในคลัสเตอร์: ถ้าผิดปกติพร้อมกันสรุปเป็น EA แต่ถ้าผิดคนเดียวสรุปเป็น SDA พร้อมทั้งมีระบบ Retrain ปรับตัวอัตโนมัติเมื่อระบบเปลี่ยนแปลงครับ
          </p>
        `
      },
      {
        id: 3,
        start: 175,
        end: 245,
        title: "4. การทดลองและผลลัพธ์ (Testbed & Metrics)",
        timeLabel: "2:55 - 4:05",
        slide: {
          num: "Slide 4 / 5",
          title: "การทดลองและผลการประเมินบน Testbed จริง",
          bullets: [
            "62 เซนเซอร์, 13 มิติทางกายภาพ, เก็บข้อมูล 8 วัน (~2.3 ล้านการวัด), โปรโตคอล IEEE 802.15.4",
            "ประมวลผลบน Fog Laptop: Inference Time เพียง 0.532 วินาทีต่อรอบ",
            "Precision 92%, Recall 56%, F1-Score 70% (ทำคะแนน Precision และ F-Score สูงกว่า Baseline)",
            "ข้อควรระวัง: Precision 92% แปลว่า เมื่อเตือนแล้วถูกต้อง 92% แต่มิใช่จับ Anomaly ได้ครบ (Recall 56%)"
          ],
          diagram: "[ ผลการเปรียบเทียบ ]\nIoT-CAD: Precision 92% | Recall 56% | F1 70% | Latency 0.532 s\nOne-Class SVM: Precision 89% | Recall 25% | F1 39%",
          citation: "Yasaei et al., ICCAD 2020, Table 2 & Timing Analysis"
        },
        scriptHtml: `
          <p><strong>[2:55 - 4:05 · การทดลองและผลลัพธ์]</strong></p>
          <p>
            ผู้เขียนสร้าง Testbed จริงขนาดใหญ่ มีเซนเซอร์ถึง 62 ตัว วัด 13 มิติทางกายภาพ <span class="breath-mark">[สูดหายใจ]</span> สื่อสารด้วย IEEE 802.15.4 ผ่าน Raspberry Pi ไปประมวลผลบน Fog Laptop โดยเก็บข้อมูล 8 วัน รวม 2.3 ล้านการวัด
          </p>
          <p>
            ผลลัพธ์คือ IoT-CAD ใช้เวลาตรวจจับเพียง <span class="highlight-key">0.532 วินาทีต่อรอบ</span> และทำคะแนน <span class="highlight-key">Precision ได้สูงถึง 92%</span>, F1-Score 70% ซึ่งเหนือกว่า Baseline อื่นๆ ทั้งหมดอย่างชัดเจนครับ
          </p>
          <p>
            <span class="highlight-warn">แต่จุดสำคัญที่ต้องระวังคือ</span> ตัวเลข 92% นี้คือ Precision ไม่ใช่ Accuracy เพราะระบบมีค่า <span class="highlight-warn">Recall อยู่ที่ 56%</span> หมายความว่าในบรรดา Anomaly ทั้งหมด ระบบยังหลุดรอดไปถึง 44% ครับ
          </p>
        `
      },
      {
        id: 4,
        start: 245,
        end: 300,
        title: "5. วิจารณ์เชิงวิชาการ & สรุป",
        timeLabel: "4:05 - 5:00",
        slide: {
          num: "Slide 5 / 5",
          title: "คุณค่า ข้อจำกัด และบทสรุป",
          bullets: [
            "คุณค่าหลัก: ไม่ได้ถามแค่ “ผิดปกติไหม” แต่ถามว่า “ทำไมถึงผิดปกติ” โดยใช้พยานบริบทและ Fog Computing",
            "ข้อจำกัดวิกฤต: Recall 56% ยังหลุดรอด 44%, ข้อมูลทดสอบเป็น Synthetic, และต้องมีเซนเซอร์สัมพันธ์ ≥ 3 ตัว",
            "ความเสี่ยงความปลอดภัย: หากผู้โจมตีเจาะเซนเซอร์พร้อมกันหลายตัวและปลอมค่าอย่างสอดคล้องกัน อาจหลอก Consensus ได้",
            "ข้อคิดสรุป: ความน่าเชื่อถือไม่ได้เกิดจากเซนเซอร์ตัวเดียว แต่เกิดจากบริบทของเครือข่ายทั้งหมด"
          ],
          diagram: "[ หัวใจสำคัญ ]\nReliability = Cross-Sensor Context & Redundancy on Fog Computing",
          citation: "Yasaei et al., ICCAD 2020, doi: 10.1145/3400302.3415672"
        },
        scriptHtml: `
          <p><strong>[4:05 - 5:00 · วิจารณ์และสรุปจบ 5 นาที]</strong></p>
          <p>
            ช่วงสุดท้ายนี้ ขอสรุปคุณค่าและข้อจำกัดในเชิงวิชาการครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <span class="highlight-key">คุณค่าที่แท้จริงของ IoT-CAD</span> คือการเปลี่ยนมุมมองจากการตรวจ Anomaly ตัวเดียวโดดๆ มาเป็นการมอง “บริบทของความสัมพันธ์” และแบ่งหน้าที่ให้ Fog Computing จัดการงาน Real-time ได้อย่างชาญฉลาด
          </p>
          <p>
            <span class="highlight-warn">อย่างไรก็ตาม ข้อจำกัดที่ต้องตระหนัก</span> คือหากผู้โจมตีมีความรู้เกี่ยวกับโครงข่ายและเจาะเซนเซอร์พร้อมกันหลายตัวเพื่อสร้าง Anomaly ที่สอดคล้องกัน ระบบก็อาจถูกหลอกได้ และ Recall 56% ก็ยังเป็นจุดที่ต้องปรับปรุงในงานวิจัยถัดไปครับ
          </p>
          <p>
            บทเรียนสำคัญสำหรับพวกเราคือ <em>“ในระบบกระจายศูนย์ ความน่าเชื่อถือไม่ได้ขึ้นอยู่กับความแม่นยำของเซนเซอร์ตัวใดตัวหนึ่ง แต่อยู่ที่การดึงบริบทของเครือข่ายมาตรวจสอบซึ่งกันและกันครับ”</em> ขอขอบคุณทุกท่าน และยินดีตอบทุกคำถามครับ!
          </p>
        `
      }
    ]
  },

  'mcsoa': {
    peer: [
      {
        id: 0,
        start: 0,
        end: 45,
        title: "1. ที่มา & ปัญหา Energy Hole ใน Power IoT",
        timeLabel: "0:00 - 0:45",
        slide: {
          num: "Slide 1 / 5",
          title: "ที่มาและปัญหา: Energy Hole ในเครือข่ายเซนเซอร์สายส่งไฟฟ้า (PSWSNs)",
          bullets: [
            "บทความ: MCSOA (IEEE CACRE 2024) โดยนักวิจัยจาก Shihezi University",
            "โจทย์วิจัย: การตรวจสอบสายส่งไฟฟ้าแรงสูงและสถานีไฟฟ้าย่อย (Power IoT) ครอบคลุมพื้นที่กว้างและเปลี่ยนแบตเตอรี่ยากมาก",
            "ปัญหาคอขวด: Energy Hole Problem — โหนดที่อยู่ใกล้ Base Station (BS) ต้องแบกรับภาระส่งต่อข้อมูล (Relay) จนแบตหมดและตายก่อนเพื่อน",
            "ข้อจำกัดของวิธีเดิม: Dijkstra, LEACH, GA และ PSO ดั้งเดิมมักติด Local Optima ทำให้ภาระงานไม่สมดุล"
          ],
          diagram: "[ ปัญหา Energy Hole ใน WSNs สำหรับโครงข่ายไฟฟ้า ]\nโหนดรอบนอก ──▶ โหนดกลาง ──▶ [โหนดหน้า BS (แบตเตอรี่หมดเร็วมาก!)] ──▶ Base Station\nส่งผลให้เครือข่ายขาดการเชื่อมต่อ แม้โหนดรอบนอกยังมีพลังงานเหลือ",
          citation: "Wei et al., IEEE CACRE 2024, Section I & II"
        },
        scriptHtml: `
          <p><strong>[0:00 - 0:45 · ที่มาและปัญหาวิจัย (Section I)]</strong></p>
          <p>
            สวัสดีครับอาจารย์และเพื่อนๆ ทุกคน วันนี้กลุ่มเราจะมาสรุปเปเปอร์ <em>MCSOA: A Novel High-Reliable Wireless Sensor Networks Routing Optimization Method for Power Internet of Things</em> จากการประชุมวิชาการ IEEE CACRE ปี 2024 ครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ประเด็นของงานนี้อยู่ที่การหาเส้นทางรับส่งข้อมูล (Routing) ในเครือข่ายเซนเซอร์ไร้สายสำหรับระบบสายส่งไฟฟ้าแรงสูง หรือเรียกว่า <span class="highlight-key">Power System Wireless Sensor Networks (PSWSNs)</span> ซึ่งเซนเซอร์ถูกติดตั้งตามเสาไฟฟ้าแรงสูงในพื้นที่ห่างไกล การส่งคนไปเปลี่ยนแบตเตอรี่ทำได้ยากและมีค่าใช้จ่ายสูงมาก
          </p>
          <p>
            ปัญหาทางเทคนิคสำคัญที่สุดคือ <span class="highlight-key">Energy Hole Problem</span> โหนดที่อยู่ใกล้สถานีฐาน (Base Station) จะต้องแบกรับทราฟฟิกส่งต่อข้อมูลจากโหนดรอบนอกทั้งหมด ทำให้พลังงานหมดและตายไปก่อน ส่งผลให้เครือข่ายตัดขาด อัลกอริทึมทั่วไปอย่าง Dijkstra, GA หรือ PSO เดิมๆ มักติด Local Optima ผู้เขียนจึงพัฒนาอัลกอริทึมใหม่ชื่อ **MCSOA** เข้ามาแก้ปัญหานี้ครับ
          </p>
        `
      },
      {
        id: 1,
        start: 45,
        end: 95,
        title: "2. แบบจำลองคณิตศาสตร์ 3 วัตถุประสงค์",
        timeLabel: "0:45 - 1:35",
        slide: {
          num: "Slide 2 / 5",
          title: "แบบจำลองทางคณิตศาสตร์ 3 วัตถุประสงค์ (Multi-Objective Fitness)",
          bullets: [
            "Energy Dissipation Model: ใช้สมการที่ (1)-(3) คำนวณพลังงานส่ง SeEC และรับ ReEC ทั้งแบบ Free-space (d²) และ Multipath (d⁴)",
            "วัตถุประสงค์ 1 (f₁): ลดการสูญเสียพลังงานในการส่งข้อมูล (Minimizing Transmission Loss: ∑ P_ij × R_ij × L_ij)",
            "วัตถุประสงค์ 2 (f₂): กระจายโหลดให้สมดุล ป้องกันโหนดใดโหนดหนึ่งแบกรับงานเกิน (Balancing Load: ∑ (P_i - P_avg)²)",
            "วัตถุประสงค์ 3 (f₃): เพิ่มความน่าเชื่อถือของลิงก์สายส่ง (Enhancing Reliability: ∑ A_ij)",
            "Combined Fitness: รวมค่าแบบถ่วงน้ำหนัก w₁·f₁ + w₂·f₂ + w₃·f₃ ภายใต้ข้อจำกัดกำลังงานและโทโพโลยี"
          ],
          diagram: "Fitness = w₁ × (Loss f₁) + w₂ × (Load Variance f₂) + w₃ × (Link Availability f₃)\nConstraints: Power Flow Balance (Eq. 7) + Capacity (Eq. 8) + Voltage Limits (Eq. 9)",
          citation: "Wei et al., IEEE CACRE 2024, Section II (Eq. 1-11)"
        },
        scriptHtml: `
          <p><strong>[0:45 - 1:35 · แบบจำลองคณิตศาสตร์ 3 วัตถุประสงค์ (Section II)]</strong></p>
          <p>
            ในส่วนที่สอง ผู้เขียนได้สร้างแบบจำลองทางคณิตศาสตร์แบบ Multi-objective ประกอบด้วย 3 วัตถุประสงค์หลักตามสมการที่ (4) ถึง (11) ครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <span class="highlight-key">วัตถุประสงค์แรก (f₁):</span> ลดการสูญเสียพลังงานส่งสัญญาณ โดยคำนึงถึงระยะทางแบบ d² ในที่โล่ง และ d⁴ เมื่อมีสิ่งกีดขวาง
          </p>
          <p>
            <span class="highlight-key">วัตถุประสงค์ที่สอง (f₂):</span> การกระจายภาระงาน (Load Balancing) โดยวัดจากผลรวมของส่วนต่างกำลังงานกับค่าเฉลี่ยยกกำลังสอง เพื่อไม่ให้มีโหนดใดโหนดหนึ่งถูกใช้งานหนักจนเกิด Energy Hole
          </p>
          <p>
            <span class="highlight-key">และวัตถุประสงค์ที่สาม (f₃):</span> เพิ่มความน่าเชื่อถือของระบบ โดยเลือกเส้นทางที่มีค่า Availability สูงที่สุด
          </p>
          <p>
            จากนั้นรวมทั้งสามฟังก์ชันเข้าด้วยกันเป็น Composite Fitness Function ผ่านค่าน้ำหนัก w₁, w₂, และ w₃ ภายใต้ข้อจำกัดสมดุลกำลังงาน (Power Flow Constraints) และขีดจำกัดความจุของช่องสัญญาณครับ
          </p>
        `
      },
      {
        id: 2,
        start: 95,
        end: 175,
        title: "3. กลไกอัลกอริทึม MCSOA (Tent Map + Seagull)",
        timeLabel: "1:35 - 2:55",
        slide: {
          num: "Slide 3 / 5",
          title: "กลไกอัลกอริทึม MCSOA: Tent Chaotic Map + พฤติกรรมนกนางนวล",
          bullets: [
            "Tent Chaotic Map: ใช้สมการ Chaos (15) กระจายประชากรเส้นทางเริ่มต้นให้ทั่วพื้นที่ค้นหา ป้องกันการกระจุกตัวแบบสุ่มทั่วไป",
            "Migration Phase (Exploration): จำลองการอพยพเป็นฝูง ปรับตำแหน่งตามทิศทางโหนดที่ดีที่สุดโดยไม่ชนกันเอง (A factor)",
            "Attacking Phase (Exploitation): โจมตีเหยื่อด้วยการบินวนเป็นเกลียว 3 มิติ (Spiral Motion) เพื่อค้นหาเส้นทางละเอียด",
            "Dynamic Pareto Archive: เก็บชุดคำตอบเส้นทางที่ดีที่สุด และสุ่มเลือกด้วยวิธี Roulette Wheel Selection เพื่อรักษาความหลากหลาย"
          ],
          diagram: "เริ่มต้น (Tent Chaotic Map) ──▶ อพยพเป็นฝูง (Migration Phase: หลบการชน)\n  ──▶ บินเกลียวล่าเหยื่อ (Attacking Phase: Spiral Local Search)\n  ──▶ Dynamic Pareto Archive + Roulette Wheel Selection ──▶ เส้นทาง Routing ที่ดีที่สุด",
          citation: "Wei et al., IEEE CACRE 2024, Section III (Eq. 12-15)"
        },
        scriptHtml: `
          <p><strong>[1:35 - 2:55 · กลไกอัลกอริทึม MCSOA (Section III)]</strong></p>
          <p>
            มาถึงกลไกของอัลกอริทึม MCSOA หรือ <span class="highlight-key">Multi-objective Chaotic Seagull Optimization Algorithm</span> ซึ่งผู้เขียนนำพฤติกรรมธรรมชาติของนกนางนวลมาผสมผสานกับทฤษฎีความโกลาหล (Chaos Theory): <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <span class="highlight-key">ขั้นแรก การเริ่มต้นประชากรด้วย Tent Chaotic Map:</span> แทนที่จะสุ่มเส้นทางแบบ Uniform Random ธรรมดา ผู้เขียนใช้ฟังก์ชัน Chaos ช่วยกระจายตำแหน่งเส้นทางเริ่มต้นให้ครอบคลุม Solution Space อย่างสม่ำเสมอ ตัดปัญหาการกระจุกตัวตั้งแต่ต้น
          </p>
          <p>
            <span class="highlight-key">ขั้นที่สอง Migration Phase (Global Exploration):</span> จำลองการอพยพของฝูงนกนางนวล โดยปรับตำแหน่งมุ่งหน้าเข้าหาคำตอบที่ดีที่สุด x_best พร้อมคำนวณเวกเตอร์หลีกเลี่ยงการชนกัน เพื่อให้สำรวจเส้นทางใหม่ๆ ได้กว้างไกล
          </p>
          <p>
            <span class="highlight-key">ขั้นที่สาม Attacking Phase (Local Exploitation):</span> เมื่อเข้าใกล้พื้นที่เป้าหมาย นกนางนวลจะบินโฉบเหยื่อเป็นเกลียวคลื่นแบบ Spiral 3 มิติ ช่วยให้อัลกอริทึมค้นหาค่าเฉพาะที่ได้อย่างละเอียด แม่นยำ และรวดเร็ว
          </p>
          <p>
            และสุดท้าย คำตอบที่เป็นไปได้ทั้งหมดจะถูกเก็บใน <span class="highlight-key">Dynamic Pareto Archive</span> และคัดเลือกด้วยวงล้อรูเล็ตต์ (Roulette Wheel Selection) เพื่อรักษาสมดุลระหว่างเส้นทางประหยัดพลังงานกับเส้นทางที่มีความน่าเชื่อถือสูงครับ
          </p>
        `
      },
      {
        id: 3,
        start: 175,
        end: 245,
        title: "4. การทดลองเปรียบเทียบกับ GA และ PSO",
        timeLabel: "2:55 - 4:05",
        slide: {
          num: "Slide 4 / 5",
          title: "ผลการทดลองเปรียบเทียบกับ GA & PSO (โหนด 50, 100, 150, 200)",
          bullets: [
            "Hardware Setup: จำลองบนคอมพิวเตอร์ CPU Intel Core i7-10700K @ 3.80GHz รัน 300 Iterations ต่อการทดลอง",
            "Energy Consumption: MCSOA ลดพลังงานลงอย่างน้อย 16.1% เมื่อเทียบกับ GA และ 8.4% เมื่อเทียบกับ PSO",
            "Node Lifespan: ยืดอายุการใช้งานโหนดได้ยาวนานขึ้นอย่างน้อย 15.6% เทียบกับ GA และ 7.8% เทียบกับ PSO",
            "Packet Delivery Ratio (PDR): ที่ 50 โหนด ส่งแพ็กเก็ตถึง Base Station ได้มากกว่า GA 15.3% และมากกว่า PSO 5.2%",
            "Conclusion on Experiments: Tent map ช่วยให้ไม่ติด Local Optima และการกระจายโหลดทำให้โหนดตายช้าลงชัดเจน"
          ],
          diagram: "[ ผลการเปรียบเทียบการทดลอง (Fig. 1, 2, 3) ]\nพลังงานสิ้นเปลือง:  MCSOA ประหยัดกว่า GA ≥ 16.1% | ประหยัดกว่า PSO ≥ 8.4%\nอายุขัยเครือข่าย:    MCSOA ยืดอายุโหนด ≥ 15.6%   | ยืดอายุโหนด ≥ 7.8%\nแพ็กเก็ตถึงสถานีฐาน: MCSOA ส่งได้มากกว่า GA 15.3% | มากกว่า PSO 5.2%",
          citation: "Wei et al., IEEE CACRE 2024, Section IV (Fig. 1-3)"
        },
        scriptHtml: `
          <p><strong>[2:55 - 4:05 · การทดลองและผลลัพธ์ (Section IV)]</strong></p>
          <p>
            ในส่วนการประเมินผล ผู้เขียนได้จำลองเครือข่ายบนคอมพิวเตอร์สเปก Intel Core i7-10700K 3.8 GHz โดยทดสอบบน 4 สถานการณ์ คือโหนด 50, 100, 150 และ 200 โหนด แต่ละการทดลองรัน 300 รอบ และเปรียบเทียบกับอัลกอริทึมมาตรฐาน 2 ตัวคือ Genetic Algorithm (GA) และ Particle Swarm Optimization (PSO) ครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ผลลัพธ์เชิงตัวเลขมี 3 ประเด็นสำคัญตามกราฟ Figure 1 ถึง Figure 3:
          </p>
          <p>
            1. <span class="highlight-key">ด้านอายุการใช้งานของเครือข่าย (Node Lifespan):</span> MCSOA ยืดอายุการทำงานของโหนดเซนเซอร์ได้ยาวนานขึ้นอย่างน้อย <span class="highlight-key">15.6% เมื่อเทียบกับ GA</span> และ <span class="highlight-key">7.8% เมื่อเทียบกับ PSO</span> ในทุกขนาดเครือข่าย
          </p>
          <p>
            2. <span class="highlight-key">ด้านการใช้พลังงาน (Energy Consumption):</span> อัลกอริทึมสามารถลดการสิ้นเปลืองพลังงานรวมลงได้ไม่น้อยกว่า <span class="highlight-key">16.1%</span> จากการเลือกเส้นทางส่งต่อที่สูญเสียน้อยที่สุด
          </p>
          <p>
            3. <span class="highlight-key">ด้านปริมาณข้อมูลที่ส่งถึงสถานีฐาน (Data Packets Received):</span> ที่ขนาด 50 โหนด MCSOA ส่งแพ็กเก็ตสำเร็จมากกว่า GA ถึง <span class="highlight-key">15.3%</span> และมากกว่า PSO <span class="highlight-key">5.2%</span> ยืนยันว่าเครือข่ายมีความเสถียรและทนทานต่อสภาวะสายส่งไฟฟ้าอย่างแท้จริงครับ
          </p>
        `
      },
      {
        id: 4,
        start: 245,
        end: 300,
        title: "5. วิจารณ์เชิงวิศวกรรม & สรุปบทเรียน",
        timeLabel: "4:05 - 5:00",
        slide: {
          num: "Slide 5 / 5",
          title: "บทวิจารณ์เชิงวิชาการ ข้อจำกัด และบทสรุปสำหรับงาน Power IoT",
          bullets: [
            "จุดเด่น: ผสาน Chaos Theory กับ Metaheuristic ได้อย่างลงตัว แก้ปัญหา Energy Hole บนสายส่งไฟฟ้าได้จริง",
            "ข้อจำกัดด้านการคำนวณ: อัลกอริทึมมีความซับซ้อน (O(N·M)) สูงกว่าฮิวริสติกทั่วไป ต้องรันบน Base Station หรือ Gateway",
            "ข้อจำกัดการทดลอง: ผลการทดลองในเปเปอร์เป็น Simulation-based ยังไม่ได้ติดตั้งบนเสาสายส่งไฟฟ้าแรงสูงจริง",
            "ข้อคิดสำคัญ: ใน WSNs การหาเส้นทางที่สั้นที่สุด (Shortest Path) ไม่ได้แปลว่าดีที่สุด แต่ต้องเป็นเส้นทางที่ทำให้เครือข่ายอยู่รอดได้นานที่สุด"
          ],
          diagram: "[ ข้อคิดสรุป ]\nOptimal Routing in WSNs ≠ Shortest Distance\nOptimal Routing = Energy Balanced + Multi-hop Reliability + Network Longevity",
          citation: "Wei et al., IEEE CACRE 2024, Section V (Conclusion)"
        },
        scriptHtml: `
          <p><strong>[4:05 - 5:00 · สรุปคุณค่า ข้อจำกัด และคำถามเปิด (Section V)]</strong></p>
          <p>
            สรุปคุณค่าทางวิชาการและข้อจำกัดของเปเปอร์ MCSOA ใน 3 ประเด็นเพื่อการนำไปต่อยอดครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            1. <span class="highlight-key">คุณค่าหลัก:</span> งานนี้พิสูจน์ให้เห็นว่าการแก้ปัญหา WSN Routing สำหรับโครงสร้างพื้นฐานวิกฤต เช่น ระบบส่งจ่ายไฟฟ้า จะดูแค่ระยะทางที่สั้นที่สุด (Shortest Path) ไม่ได้ แต่ต้องสร้างสมดุลของพลังงานเพื่อยืดอายุเครือข่ายโดยรวม
          </p>
          <p>
            2. <span class="highlight-warn">ข้อจำกัดที่พึงตระหนัก:</span> ประการแรก อัลกอริทึมมีความซับซ้อนในการคำนวณสูงกว่า Static Routing จึงจำเป็นต้องให้ Base Station หรือ Controller เป็นผู้คำนวณแล้วส่งตารางเส้นทางกลับมา ประการที่สอง ผลการทดสอบยังเป็น Computer Simulation ซึ่งหากนำไปติดตั้งจริงบนเสาไฟฟ้าแรงสูง จะต้องเจอกับสัญญาณรบกวนคลื่นแม่เหล็กไฟฟ้า (EMI) รุนแรงที่ต้องคำนึงถึงเพิ่มเติม
          </p>
          <p>
            3. <span class="highlight-key">บทเรียนสำคัญ:</span> การนำทฤษฎี Chaos มาผสมผสานกับ Swarm Intelligence เป็นแนวทางที่ยอดเยี่ยมในการหลบหนี Local Optima ในโจทย์วิศวกรรมคอมพิวเตอร์และเซนเซอร์เน็ตเวิร์กครับ
          </p>
          <p>
            กลุ่มเราขอจบการนำเสนอเปเปอร์ MCSOA เพียงเท่านี้ ขอบคุณอาจารย์และเพื่อนๆ ทุกคนครับ พร้อมรับฟังคำถามครับ
          </p>
        `
      }
    ]
  },
  'story-validator': {
    peer: [
      {
        id: 0,
        start: 0,
        end: 25,
        title: "1. หน้าปก",
        timeLabel: "0:00 - 0:25",
        slide: {
          num: "Slide 1 / 7",
          title: "Story Validator: Validating the Plot of Interactive Narrative Games",
          bullets: [
            "การตรวจสอบโครงเรื่องของเกมแบบโต้ตอบด้วยแบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น",
            "2021 IEEE Conference on Games (CoG)",
            "คณะผู้วิจัย: Carolina Veloso, Rui Prada (INESC-ID & Univ. of Lisbon)",
            "ผู้นำเสนอ: นายธีรภัทร ภู่ระย้า ลำดับที่ 10 (รหัสนิสิต 66362416)"
],
          diagram: `[ Story Validator ] แปลงเนื้อเรื่องเกมแตกกิ่งเป็นกราฟ G=(V,E) + จำลองผู้เล่น ตรวจจับข้อผิดพลาดตรรกะแบบอัตโนมัติ`,
          citation: "Veloso & Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)"
        },
        slideImage: 'assets/slides/slide-1.png',
        scriptHtml: `
<p><strong>[0:00 - 0:25 · หน้าปกและบทนำ]</strong></p>
          <p>
            สวัสดีครับอาจารย์และเพื่อนๆ ทุกคน ผมธีรภัทร ภู่ระย้า รหัสนิสิต 66362416 วันนี้สรุปบทความวิจัยเรื่อง <strong>Story Validator: Validating the Plot of Interactive Narrative Games</strong> จากการประชุมวิชาการ <strong>IEEE Conference on Games ปี 2021</strong> โดยทีมนักวิจัยจากมหาวิทยาลัยลิสบอนครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            งานนี้แก้ปัญหาเกมที่มีเนื้อเรื่องแตกกิ่ง ซึ่งมักเกิดบั๊กเชิงตรรกะและทางตัน โดยผู้วิจัยนำทฤษฎีกราฟและการจำลองผู้เล่นมาตรวจสอบโครงเรื่องแบบอัตโนมัติครับ
          </p>
        `
      },
      {
        id: 1,
        start: 25,
        end: 65,
        title: "2. ปัญหา & ความท้าทาย",
        timeLabel: "0:25 - 1:05",
        slide: {
          num: "Slide 2 / 7",
          title: "ปัญหาและความท้าทายในการตรวจสอบ Interactive Story",
          bullets: [
            "ความท้าทาย 4 ด้าน: Authorial Intent vs Player Agency, State-Space Explosion, Guarded Variables, High Playtesting Cost",
            "ภาพที่ 1: ผังโครงเรื่องแบบ Node & Link ใน Twine ซับซ้อนเกินกว่าจะตรวจทานด้วยสายตามนุษย์",
            "ปัญหาในทางปฏิบัติ: 76% ของนักเขียนบทเกมยังคงใช้ MS Word หรือ Google Docs ในการร่างบท",
            "เครื่องมือปัจจุบันขาดการตรวจตรรกะอัตโนมัติ ทำให้มักพบ Dead-Ends และ Lost Plot หลุดรอดสู่ผู้เล่น"
],
          diagram: `ปัญหาโครงเรื่องแตกกิ่ง ──▶ 76% ใช้ Word/Docs ไร้ตัวตรวจตรรกะ ──▶ บั๊ก Dead-Ends & Lost Plot`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section I & II"
        },
        slideImage: 'assets/slides/slide-2.png',
        scriptHtml: `
<p><strong>[0:25 - 1:05 · ปัญหาและความท้าทาย]</strong></p>
          <p>
            ปัญหาของการพัฒนาเรื่องราวแบบแตกแขนงมี 4 ข้อสำคัญครับ: <span class="breath-mark">[สูดหายใจ]</span><br>
            ข้อแรกคือการรักษาสมดุลระหว่างเจตจำนงของคนแต่งกับอิสระของผู้เล่น<br>
            สองคือ <span class="highlight-warn">State-Space Explosion</span> เมื่อทางเลือกมากขึ้น กราฟเรื่องจะระเบิดออกทวีคูณจนมนุษย์ตรวจไม่ไหว ดังผังใน Twine ทางขวามือครับ<br>
            สามคือ Guarded Variables หรือการผูกเงื่อนไขกับตัวแปรสะสม ที่ทำให้เกิดบั๊กในเส้นทางที่คาดไม่ถึง<br>
            และสี่คือ การใช้คนทดสอบจริงมีต้นทุนสูงและช้ามากครับ
          </p>
          <p>
            ที่สำคัญคือ ผลสำรวจพบว่า <span class="highlight-warn">76% ของคนเขียนบทยังใช้แค่ Word หรือ Google Docs</span> ขาดระบบตรวจตรรกะ ทำให้บั๊กทางตัน Dead-Ends และฉากที่เข้าไม่ถึงอย่าง Lost Plot หลุดรอดไปถึงผู้เล่นครับ
          </p>
        `
      },
      {
        id: 2,
        start: 65,
        end: 115,
        title: "3. กราฟ & ตัวชี้วัด",
        timeLabel: "1:05 - 1:55",
        slide: {
          num: "Slide 3 / 7",
          title: "แบบจำลองกราฟและตัวชี้วัดโครงเรื่อง (The Proposed Model & Metrics)",
          bullets: [
            "แบบจำลองกราฟระบุทิศทาง G = (V, E): Passage (โหนด V) แทนแต่ละฉาก, Link (เส้นเชื่อม E) แทนทางเลือกมี Guarded Edges",
            "การท่องกราฟด้วย DFS: ท่องตั้งแต่จุดเริ่มต้นจนสุดฉากจบ รวบรวม Playthrough Traces ทุกเส้นทางอัตโนมัติ",
            "ตัวชี้วัดคุณภาพ 5 ด้าน: Npaths (รวมเส้นทาง), Spoints (ฉากสำคัญที่ต้องไหลผ่าน), Pendings (สัดส่วนฉากจบ)",
            "Dead-Ends (ฉากทางตันไปต่อไม่ได้), Lost Plot (ฉากเข้าไม่ถึงเพราะเงื่อนไขขัดแย้ง), Vevol (Dotted Chart ติดตามตัวแปร)"
],
          diagram: `ฝั่งซ้าย: Directed Graph G=(V,E) + DFS ──▶ ฝั่งขวา: 5 ตัวชี้วัด Npaths, Spoints, Pendings, Dends/Lplot, Vevol`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section III & IV"
        },
        slideImage: 'assets/slides/slide-3.png',
        scriptHtml: `
<p><strong>[1:05 - 1:55 · แบบจำลองกราฟและตัวชี้วัดคุณภาพ]</strong></p>
          <p>
            ผู้วิจัยแก้ปัญหานี้ด้วย 2 องค์ประกอบหลักครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <strong>ฝั่งซ้าย</strong> คือการแปลงเรื่องเป็น Directed Graph <span class="highlight-key">G = (V, E)</span> โดยให้แต่ละฉากหรือ Passage เป็นโหนด V และทางเลือกเป็นเส้นเชื่อม E ที่มี Guarded Conditions กำกับ จากนั้นใช้อัลกอริทึม DFS ท่องกราฟเพื่อเก็บร่องรอยการเล่น หรือ Playthrough Traces ทุกเส้นทางออกมาอัตโนมัติ
          </p>
          <p>
            <strong>ฝั่งขวา</strong> คือการวัดคุณภาพ 5 ด้าน:<br>
            1. <span class="highlight-key">N<sub>paths</sub></span> นับจำนวนเส้นทางทั้งหมดตั้งแต่เริ่มจนจบ<br>
            2. <span class="highlight-key">S<sub>points</sub></span> หรือ Stroke Points คือฉากบังคับผ่านที่ทุกเส้นทางต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญ<br>
            3. <span class="highlight-key">P<sub>endings</sub></span> คำนวณความน่าจะเป็นของแต่ละฉากจบ และหาฉากจบที่เข้าไม่ถึง<br>
            4. ดักจับบั๊กทางตัน <span class="highlight-warn">Dead-Ends</span> และ <span class="highlight-warn">Lost Plot</span> ที่เข้าไม่ถึงเพราะเงื่อนไขตัวแปรขัดแย้ง<br>
            และ 5. <span class="highlight-key">V<sub>evol</sub></span> พล็อต Dotted Chart ติดตามค่าตัวแปรตลอดเรื่องครับ
          </p>
        `
      },
      {
        id: 3,
        start: 115,
        end: 165,
        title: "4. กรณีศึกษา & Persona",
        timeLabel: "1:55 - 2:45",
        slide: {
          num: "Slide 4 / 7",
          title: "กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น",
          bullets: [
            "ฉากทดสอบ The Murder Case (TMC): บทสืบสวนสอบปากคำ 14 Passages · 20 Paths · 3 ฉากจบ · 3 ตัวแปรอารมณ์ (โกรธ, สับสน, กลัว)",
            "บั๊กทดสอบ 5 จุด: เส้นทาง #7, #14 (Dead-End ที่ Choice 5), เส้นทาง #8 (Infinite Loop), Ending 1 และ Choice 6 (Lost Plot)",
            "การจำลองพฤติกรรมผู้เล่น (Player Personas): Heuristic Greedy Search คำนวณ Score(L) = Σ(wi × vi)",
            "Aggressive (Anger=0.75) vs Paranoid (Fear=0.70) ช่วยพยากรณ์ว่าผู้เล่นแต่ละกลุ่มจะเจอบั๊กใดตามแนวโน้มการตัดสินใจจริง"
],
          diagram: `The Murder Case (5 Bugs) ──▶ Persona Greedy Search: Score(L) = Σ(wi × vi) ──▶ Aggressive vs Paranoid`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V"
        },
        slideImage: 'assets/slides/slide-4.png',
        scriptHtml: `
<p><strong>[1:55 - 2:45 · กรณีศึกษา The Murder Case และ Persona]</strong></p>
          <p>
            การทดสอบทำผ่านบท The Murder Case ซึ่งเป็นบทสอบปากคำผู้ต้องสงสัย กำกับด้วย 3 ตัวแปรอารมณ์คือ โกรธ สับสน และกลัว มี 14 ฉาก 20 เส้นทาง 3 ฉากจบ โดยจงใจฝังบั๊กไว้ 5 จุด มีทั้งทางตัน ลูปวนซ้ำ และฉากจบที่เข้าไม่ถึงครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            จุดเด่นของงานนี้คือการจำลอง <strong>Player Personas</strong> ด้วยอัลกอริทึม Heuristic Greedy Search คำนวณคะแนนของแต่ละทางเลือกจากสูตร:<br>
            <code>Score(L) = &Sigma;(w<sub>i</sub> &times; v<sub>i</sub>)</code><br>
            โดยถ่วงน้ำหนักอารมณ์จำลองผู้เล่น 2 บุคลิก:<br>
            • <span class="highlight-key">Aggressive Persona</span> เน้นอารมณ์โกรธสูงสุด ให้น้ำหนัก 0.75<br>
            • <span class="highlight-key">Paranoid Persona</span> เน้นอารมณ์กลัวสูงสุด ให้น้ำหนัก 0.70
          </p>
          <p>
            ช่วยให้นักเขียนพยากรณ์ได้ว่า ผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กใดบ้างตามแนวโน้มการตัดสินใจจริง ก่อนเปิดทดสอบกับคนจริงครับ
          </p>
        `
      },
      {
        id: 4,
        start: 165,
        end: 215,
        title: "5. ผลทดสอบ & ข้อค้นพบ",
        timeLabel: "2:45 - 3:35",
        slide: {
          num: "Slide 5 / 7",
          title: "ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด",
          bullets: [
            "ภาพที่ 2: ระบบ Story Validator ชี้ตำแหน่ง Choice 5 เกิด Dead-End บนผังต้นไม้, บั๊ก 1, 3, 4, 5 พบ 100% ผ่าน Lost Plot",
            "3 สถิติสำคัญ: เวลาตรวจพบบั๊ก 52.3s (σ=22.7s) | เวลาแก้ปัญหา 146.2s (σ=31.8s) | คะแนน SUS 92.4 (Truly Superior)",
            "ตรวจตาเปล่าล้มเหลว: ผู้ใช้ 15% (3 คน) ที่ไม่ยอมเปิดตัวกรองอัตโนมัติ หาบั๊กไม่พบเพราะกวาดตาดูเอง",
            "บั๊ก 5 แก้ยากสุด (ผู้ใช้ 25% ติดขัด) และการเพิ่ม Tooltips ดันคะแนน SUS จาก 83.5 ใน Study 1 ขึ้นเป็น 92.4 ใน Study 2"
],
          diagram: `ภาพบน: Choice 5 Dead-End พบครบ 100% | 3 สถิติ: พบบั๊ก 52.3s, แก้ 146.2s, SUS 92.4 | ตรวจมือพลาด 15%`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V"
        },
        slideImage: 'assets/slides/slide-5.png',
        scriptHtml: `
<p><strong>[2:45 - 3:35 · ผลการทดสอบกับผู้ใช้และการตรวจจับบั๊ก]</strong></p>
          <p>
            ผลการทดสอบกับผู้ใช้ 20 คนใน User Study 2 ยืนยันประสิทธิภาพชัดเจนครับ: <span class="breath-mark">[สูดหายใจ]</span><br>
            ภาพด้านบนแสดงหน้าจอ Story Validator ชี้ตำแหน่ง Choice 5 ที่เกิดปัญหา Dead-End บนผังต้นไม้ โดยบั๊กทั้ง 5 จุดถูกตรวจพบครบ 100% ผ่านตัวกรอง Lost Plot ทันที
          </p>
          <p>
            สถิติตรงกลางระบุว่า ผู้ใช้ใช้เวลาตรวจพบบั๊กเฉลี่ย <span class="highlight-key">52.3 วินาที</span> ใช้เวลาคิดวิธีแก้ <span class="highlight-key">146.2 วินาที</span> และให้คะแนนความง่ายในการใช้งาน SUS สูงถึง <span class="highlight-key">92.4 คะแนน</span> จัดอยู่ในระดับ Truly Superior ครับ
          </p>
          <p>
            ข้อค้นพบสำคัญคือ <span class="highlight-warn">ผู้ใช้ 15% ที่ไม่เปิดตัวกรองอัตโนมัติแล้วพยายามกวาดตาตรวจเอง หาบั๊กไม่พบเลย</span> และบั๊กที่ 5 แก้ยากที่สุดเพราะเงื่อนไขซับซ้อนหลายชั้นครับ
          </p>
        `
      },
      {
        id: 5,
        start: 215,
        end: 255,
        title: "6. การประยุกต์ใช้งาน",
        timeLabel: "3:35 - 4:15",
        slide: {
          num: "Slide 6 / 7",
          title: "การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน",
          bullets: [
            "Academic Contributions 3 ข้อ: นิยามตัวชี้วัดด้วยทฤษฎีกราฟ, สถาปัตยกรรมตรวจพิสูจน์ออฟไลน์, จำลองพฤติกรรม Persona",
            "Node & Edge ใน Game Engine: นำโมเดล Directed Graph เชื่อมต่อเอนจินเกม (Unity, Unreal Engine) ได้ทันที",
            "การประเมินเงื่อนไขตัวแปรขณะเล่น: Guarded Edges สอดคล้องกับการตรวจประเมินค่าตัวแปรใน Game Runtime State",
            "ระบบ QA อัตโนมัติใน CI/CD: ผสานอัลกอริทึม DFS Validation สแกนหา Dead-Ends ก่อนส่งมอบเกมสู่ตลาด"
],
          diagram: `วิชาการ: กราฟเมตริก + ออฟไลน์ตรวจพิสูจน์ + Persona ──▶ อุตสาหกรรม: Game Engine + Guarded Edges + CI/CD QA`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V & VI"
        },
        slideImage: 'assets/slides/slide-6.png',
        scriptHtml: `
<p><strong>[3:35 - 4:15 · คุณค่าทางวิชาการและการนำไปใช้จริง]</strong></p>
          <p>
            คุณูปการทางวิชาการฝั่งซ้ายมี 3 ด้าน คือการแปลงงานแต่งเรื่องให้เป็นตัวชี้วัดคณิตศาสตร์, การวางระบบตรวจพิสูจน์กราฟแบบออฟไลน์, และการจำลองพฤติกรรมผู้เล่นด้วย Persona ครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ในทางปฏิบัติฝั่งขวา เราสามารถนำโมเดลกราฟนี้ไปเชื่อมต่อกับ Game Engine อย่าง Unity หรือ Unreal ได้ทันที นำแนวคิด Guarded Edges ไปใช้ตรวจเช็กค่าตัวแปรใน Game Runtime State และผสานอัลกอริทึม DFS เข้ากับไปป์ไลน์ CI/CD เพื่อสแกนหาข้อผิดพลาดของบทเกมโดยอัตโนมัติก่อนส่งมอบเกมครับ
          </p>
        `
      },
      {
        id: 6,
        start: 255,
        end: 285,
        title: "7. ข้อจำกัด & สรุป",
        timeLabel: "4:15 - 4:45",
        slide: {
          num: "Slide 7 / 7",
          title: "ข้อจำกัด และบทสรุป",
          bullets: [
            "ข้อจำกัด 3 ข้อ: ขาดกลุ่มควบคุมเปรียบเทียบ (No Control Baseline), DFS เสี่ยง State Explosion ในกราฟใหญ่, ขอบเขตชุดทดสอบยังเล็ก",
            "การยกระดับสู่ Automated QA: วางรากฐานทฤษฎีกราฟและ Persona ตรวจเกมเล่าเรื่องอัตโนมัติ ลดต้นทุน Playtesting",
            "การเชื่อมต่อ Game Engine เชิงพาณิชย์: พัฒนาปลั๊กอินสำหรับ Unity, Unreal Engine หรือ Visual Novel Engines",
            "การใช้ AI/LLM ช่วยซ่อมแซมเนื้อเรื่อง: ผสาน Large Language Models ร่วมกับกราฟ เพื่อเสนอแนวทางแก้ตัวแปรหรือทางตันอัตโนมัติ"
],
          diagram: `ข้อจำกัด: ขาด Baseline, DFS Explosion ──▶ สรุป: ก้าวสู่ Automated QA, ปลั๊กอินเอนจินเกม, AI/LLM ซ่อมเรื่อง`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section VI"
        },
        slideImage: 'assets/slides/slide-7.png',
        scriptHtml: `
<p><strong>[4:15 - 4:45 · ข้อจำกัดและบทสรุป]</strong></p>
          <p>
            สุดท้ายในด้านข้อจำกัด เปเปอร์นี้ยังขาดกลุ่มควบคุมเปรียบเทียบเชิงสถิติ และการใช้ DFS ยังมีความเสี่ยงต่อ State Explosion หากกราฟมีขนาดใหญ่และมีลูปวนซ้ำครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            โดยสรุป Story Validator ได้วางรากฐานสำคัญของการนำวิทยาการคอมพิวเตอร์มาช่วยทำ Automated QA ให้กับเกมเล่าเรื่อง และก้าวต่อไปคือการนำ Large Language Models หรือ AI เข้ามาทำงานร่วมกับกราฟ เพื่อช่วยแนะนำวิธีแก้ไขเงื่อนไขตัวแปรหรือเส้นทางที่ติดตันโดยอัตโนมัติครับ
          </p>
          <p>
            ผมขอจบการนำเสนอเพียงเท่านี้ ขอบคุณครับ
          </p>
        `
      }
    ],
    executive: [
      {
        id: 0,
        start: 0,
        end: 25,
        title: "1. หน้าปก",
        timeLabel: "0:00 - 0:25",
        slide: {
          num: "Slide 1 / 7",
          title: "Story Validator: Validating the Plot of Interactive Narrative Games",
          bullets: [
            "การตรวจสอบโครงเรื่องของเกมแบบโต้ตอบด้วยแบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น",
            "2021 IEEE Conference on Games (CoG)",
            "คณะผู้วิจัย: Carolina Veloso, Rui Prada (INESC-ID & Univ. of Lisbon)",
            "ผู้นำเสนอ: นายธีรภัทร ภู่ระย้า ลำดับที่ 10 (รหัสนิสิต 66362416)"
],
          diagram: `[ Story Validator ] แปลงเนื้อเรื่องเกมแตกกิ่งเป็นกราฟ G=(V,E) + จำลองผู้เล่น ตรวจจับข้อผิดพลาดตรรกะแบบอัตโนมัติ`,
          citation: "Veloso & Prada, IEEE CoG 2021 (IEEE Xplore: 9618897)"
        },
        slideImage: 'assets/slides/slide-1.png',
        scriptHtml: `
<p><strong>[0:00 - 0:25 · หน้าปกและบทนำ]</strong></p>
          <p>
            สวัสดีครับอาจารย์และเพื่อนๆ ทุกคน ผมธีรภัทร ภู่ระย้า รหัสนิสิต 66362416 วันนี้สรุปบทความวิจัยเรื่อง <strong>Story Validator: Validating the Plot of Interactive Narrative Games</strong> จากการประชุมวิชาการ <strong>IEEE Conference on Games ปี 2021</strong> โดยทีมนักวิจัยจากมหาวิทยาลัยลิสบอนครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            งานนี้แก้ปัญหาเกมที่มีเนื้อเรื่องแตกกิ่ง ซึ่งมักเกิดบั๊กเชิงตรรกะและทางตัน โดยผู้วิจัยนำทฤษฎีกราฟและการจำลองผู้เล่นมาตรวจสอบโครงเรื่องแบบอัตโนมัติครับ
          </p>
        `
      },
      {
        id: 1,
        start: 25,
        end: 65,
        title: "2. ปัญหา & ความท้าทาย",
        timeLabel: "0:25 - 1:05",
        slide: {
          num: "Slide 2 / 7",
          title: "ปัญหาและความท้าทายในการตรวจสอบ Interactive Story",
          bullets: [
            "ความท้าทาย 4 ด้าน: Authorial Intent vs Player Agency, State-Space Explosion, Guarded Variables, High Playtesting Cost",
            "ภาพที่ 1: ผังโครงเรื่องแบบ Node & Link ใน Twine ซับซ้อนเกินกว่าจะตรวจทานด้วยสายตามนุษย์",
            "ปัญหาในทางปฏิบัติ: 76% ของนักเขียนบทเกมยังคงใช้ MS Word หรือ Google Docs ในการร่างบท",
            "เครื่องมือปัจจุบันขาดการตรวจตรรกะอัตโนมัติ ทำให้มักพบ Dead-Ends และ Lost Plot หลุดรอดสู่ผู้เล่น"
],
          diagram: `ปัญหาโครงเรื่องแตกกิ่ง ──▶ 76% ใช้ Word/Docs ไร้ตัวตรวจตรรกะ ──▶ บั๊ก Dead-Ends & Lost Plot`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section I & II"
        },
        slideImage: 'assets/slides/slide-2.png',
        scriptHtml: `
<p><strong>[0:25 - 1:05 · ปัญหาและความท้าทาย]</strong></p>
          <p>
            ปัญหาของการพัฒนาเรื่องราวแบบแตกแขนงมี 4 ข้อสำคัญครับ: <span class="breath-mark">[สูดหายใจ]</span><br>
            ข้อแรกคือการรักษาสมดุลระหว่างเจตจำนงของคนแต่งกับอิสระของผู้เล่น<br>
            สองคือ <span class="highlight-warn">State-Space Explosion</span> เมื่อทางเลือกมากขึ้น กราฟเรื่องจะระเบิดออกทวีคูณจนมนุษย์ตรวจไม่ไหว ดังผังใน Twine ทางขวามือครับ<br>
            สามคือ Guarded Variables หรือการผูกเงื่อนไขกับตัวแปรสะสม ที่ทำให้เกิดบั๊กในเส้นทางที่คาดไม่ถึง<br>
            และสี่คือ การใช้คนทดสอบจริงมีต้นทุนสูงและช้ามากครับ
          </p>
          <p>
            ที่สำคัญคือ ผลสำรวจพบว่า <span class="highlight-warn">76% ของคนเขียนบทยังใช้แค่ Word หรือ Google Docs</span> ขาดระบบตรวจตรรกะ ทำให้บั๊กทางตัน Dead-Ends และฉากที่เข้าไม่ถึงอย่าง Lost Plot หลุดรอดไปถึงผู้เล่นครับ
          </p>
        `
      },
      {
        id: 2,
        start: 65,
        end: 115,
        title: "3. กราฟ & ตัวชี้วัด",
        timeLabel: "1:05 - 1:55",
        slide: {
          num: "Slide 3 / 7",
          title: "แบบจำลองกราฟและตัวชี้วัดโครงเรื่อง (The Proposed Model & Metrics)",
          bullets: [
            "แบบจำลองกราฟระบุทิศทาง G = (V, E): Passage (โหนด V) แทนแต่ละฉาก, Link (เส้นเชื่อม E) แทนทางเลือกมี Guarded Edges",
            "การท่องกราฟด้วย DFS: ท่องตั้งแต่จุดเริ่มต้นจนสุดฉากจบ รวบรวม Playthrough Traces ทุกเส้นทางอัตโนมัติ",
            "ตัวชี้วัดคุณภาพ 5 ด้าน: Npaths (รวมเส้นทาง), Spoints (ฉากสำคัญที่ต้องไหลผ่าน), Pendings (สัดส่วนฉากจบ)",
            "Dead-Ends (ฉากทางตันไปต่อไม่ได้), Lost Plot (ฉากเข้าไม่ถึงเพราะเงื่อนไขขัดแย้ง), Vevol (Dotted Chart ติดตามตัวแปร)"
],
          diagram: `ฝั่งซ้าย: Directed Graph G=(V,E) + DFS ──▶ ฝั่งขวา: 5 ตัวชี้วัด Npaths, Spoints, Pendings, Dends/Lplot, Vevol`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section III & IV"
        },
        slideImage: 'assets/slides/slide-3.png',
        scriptHtml: `
<p><strong>[1:05 - 1:55 · แบบจำลองกราฟและตัวชี้วัดคุณภาพ]</strong></p>
          <p>
            ผู้วิจัยแก้ปัญหานี้ด้วย 2 องค์ประกอบหลักครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <strong>ฝั่งซ้าย</strong> คือการแปลงเรื่องเป็น Directed Graph <span class="highlight-key">G = (V, E)</span> โดยให้แต่ละฉากหรือ Passage เป็นโหนด V และทางเลือกเป็นเส้นเชื่อม E ที่มี Guarded Conditions กำกับ จากนั้นใช้อัลกอริทึม DFS ท่องกราฟเพื่อเก็บร่องรอยการเล่น หรือ Playthrough Traces ทุกเส้นทางออกมาอัตโนมัติ
          </p>
          <p>
            <strong>ฝั่งขวา</strong> คือการวัดคุณภาพ 5 ด้าน:<br>
            1. <span class="highlight-key">N<sub>paths</sub></span> นับจำนวนเส้นทางทั้งหมดตั้งแต่เริ่มจนจบ<br>
            2. <span class="highlight-key">S<sub>points</sub></span> หรือ Stroke Points คือฉากบังคับผ่านที่ทุกเส้นทางต้องไหลผ่าน เพื่อยืนยันว่าผู้เล่นได้รับสารสำคัญ<br>
            3. <span class="highlight-key">P<sub>endings</sub></span> คำนวณความน่าจะเป็นของแต่ละฉากจบ และหาฉากจบที่เข้าไม่ถึง<br>
            4. ดักจับบั๊กทางตัน <span class="highlight-warn">Dead-Ends</span> และ <span class="highlight-warn">Lost Plot</span> ที่เข้าไม่ถึงเพราะเงื่อนไขตัวแปรขัดแย้ง<br>
            และ 5. <span class="highlight-key">V<sub>evol</sub></span> พล็อต Dotted Chart ติดตามค่าตัวแปรตลอดเรื่องครับ
          </p>
        `
      },
      {
        id: 3,
        start: 115,
        end: 165,
        title: "4. กรณีศึกษา & Persona",
        timeLabel: "1:55 - 2:45",
        slide: {
          num: "Slide 4 / 7",
          title: "กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น",
          bullets: [
            "ฉากทดสอบ The Murder Case (TMC): บทสืบสวนสอบปากคำ 14 Passages · 20 Paths · 3 ฉากจบ · 3 ตัวแปรอารมณ์ (โกรธ, สับสน, กลัว)",
            "บั๊กทดสอบ 5 จุด: เส้นทาง #7, #14 (Dead-End ที่ Choice 5), เส้นทาง #8 (Infinite Loop), Ending 1 และ Choice 6 (Lost Plot)",
            "การจำลองพฤติกรรมผู้เล่น (Player Personas): Heuristic Greedy Search คำนวณ Score(L) = Σ(wi × vi)",
            "Aggressive (Anger=0.75) vs Paranoid (Fear=0.70) ช่วยพยากรณ์ว่าผู้เล่นแต่ละกลุ่มจะเจอบั๊กใดตามแนวโน้มการตัดสินใจจริง"
],
          diagram: `The Murder Case (5 Bugs) ──▶ Persona Greedy Search: Score(L) = Σ(wi × vi) ──▶ Aggressive vs Paranoid`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V"
        },
        slideImage: 'assets/slides/slide-4.png',
        scriptHtml: `
<p><strong>[1:55 - 2:45 · กรณีศึกษา The Murder Case และ Persona]</strong></p>
          <p>
            การทดสอบทำผ่านบท The Murder Case ซึ่งเป็นบทสอบปากคำผู้ต้องสงสัย กำกับด้วย 3 ตัวแปรอารมณ์คือ โกรธ สับสน และกลัว มี 14 ฉาก 20 เส้นทาง 3 ฉากจบ โดยจงใจฝังบั๊กไว้ 5 จุด มีทั้งทางตัน ลูปวนซ้ำ และฉากจบที่เข้าไม่ถึงครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            จุดเด่นของงานนี้คือการจำลอง <strong>Player Personas</strong> ด้วยอัลกอริทึม Heuristic Greedy Search คำนวณคะแนนของแต่ละทางเลือกจากสูตร:<br>
            <code>Score(L) = &Sigma;(w<sub>i</sub> &times; v<sub>i</sub>)</code><br>
            โดยถ่วงน้ำหนักอารมณ์จำลองผู้เล่น 2 บุคลิก:<br>
            • <span class="highlight-key">Aggressive Persona</span> เน้นอารมณ์โกรธสูงสุด ให้น้ำหนัก 0.75<br>
            • <span class="highlight-key">Paranoid Persona</span> เน้นอารมณ์กลัวสูงสุด ให้น้ำหนัก 0.70
          </p>
          <p>
            ช่วยให้นักเขียนพยากรณ์ได้ว่า ผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กใดบ้างตามแนวโน้มการตัดสินใจจริง ก่อนเปิดทดสอบกับคนจริงครับ
          </p>
        `
      },
      {
        id: 4,
        start: 165,
        end: 215,
        title: "5. ผลทดสอบ & ข้อค้นพบ",
        timeLabel: "2:45 - 3:35",
        slide: {
          num: "Slide 5 / 7",
          title: "ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด",
          bullets: [
            "ภาพที่ 2: ระบบ Story Validator ชี้ตำแหน่ง Choice 5 เกิด Dead-End บนผังต้นไม้, บั๊ก 1, 3, 4, 5 พบ 100% ผ่าน Lost Plot",
            "3 สถิติสำคัญ: เวลาตรวจพบบั๊ก 52.3s (σ=22.7s) | เวลาแก้ปัญหา 146.2s (σ=31.8s) | คะแนน SUS 92.4 (Truly Superior)",
            "ตรวจตาเปล่าล้มเหลว: ผู้ใช้ 15% (3 คน) ที่ไม่ยอมเปิดตัวกรองอัตโนมัติ หาบั๊กไม่พบเพราะกวาดตาดูเอง",
            "บั๊ก 5 แก้ยากสุด (ผู้ใช้ 25% ติดขัด) และการเพิ่ม Tooltips ดันคะแนน SUS จาก 83.5 ใน Study 1 ขึ้นเป็น 92.4 ใน Study 2"
],
          diagram: `ภาพบน: Choice 5 Dead-End พบครบ 100% | 3 สถิติ: พบบั๊ก 52.3s, แก้ 146.2s, SUS 92.4 | ตรวจมือพลาด 15%`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V"
        },
        slideImage: 'assets/slides/slide-5.png',
        scriptHtml: `
<p><strong>[2:45 - 3:35 · ผลการทดสอบกับผู้ใช้และการตรวจจับบั๊ก]</strong></p>
          <p>
            ผลการทดสอบกับผู้ใช้ 20 คนใน User Study 2 ยืนยันประสิทธิภาพชัดเจนครับ: <span class="breath-mark">[สูดหายใจ]</span><br>
            ภาพด้านบนแสดงหน้าจอ Story Validator ชี้ตำแหน่ง Choice 5 ที่เกิดปัญหา Dead-End บนผังต้นไม้ โดยบั๊กทั้ง 5 จุดถูกตรวจพบครบ 100% ผ่านตัวกรอง Lost Plot ทันที
          </p>
          <p>
            สถิติตรงกลางระบุว่า ผู้ใช้ใช้เวลาตรวจพบบั๊กเฉลี่ย <span class="highlight-key">52.3 วินาที</span> ใช้เวลาคิดวิธีแก้ <span class="highlight-key">146.2 วินาที</span> และให้คะแนนความง่ายในการใช้งาน SUS สูงถึง <span class="highlight-key">92.4 คะแนน</span> จัดอยู่ในระดับ Truly Superior ครับ
          </p>
          <p>
            ข้อค้นพบสำคัญคือ <span class="highlight-warn">ผู้ใช้ 15% ที่ไม่เปิดตัวกรองอัตโนมัติแล้วพยายามกวาดตาตรวจเอง หาบั๊กไม่พบเลย</span> และบั๊กที่ 5 แก้ยากที่สุดเพราะเงื่อนไขซับซ้อนหลายชั้นครับ
          </p>
        `
      },
      {
        id: 5,
        start: 215,
        end: 255,
        title: "6. การประยุกต์ใช้งาน",
        timeLabel: "3:35 - 4:15",
        slide: {
          num: "Slide 6 / 7",
          title: "การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน",
          bullets: [
            "Academic Contributions 3 ข้อ: นิยามตัวชี้วัดด้วยทฤษฎีกราฟ, สถาปัตยกรรมตรวจพิสูจน์ออฟไลน์, จำลองพฤติกรรม Persona",
            "Node & Edge ใน Game Engine: นำโมเดล Directed Graph เชื่อมต่อเอนจินเกม (Unity, Unreal Engine) ได้ทันที",
            "การประเมินเงื่อนไขตัวแปรขณะเล่น: Guarded Edges สอดคล้องกับการตรวจประเมินค่าตัวแปรใน Game Runtime State",
            "ระบบ QA อัตโนมัติใน CI/CD: ผสานอัลกอริทึม DFS Validation สแกนหา Dead-Ends ก่อนส่งมอบเกมสู่ตลาด"
],
          diagram: `วิชาการ: กราฟเมตริก + ออฟไลน์ตรวจพิสูจน์ + Persona ──▶ อุตสาหกรรม: Game Engine + Guarded Edges + CI/CD QA`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V & VI"
        },
        slideImage: 'assets/slides/slide-6.png',
        scriptHtml: `
<p><strong>[3:35 - 4:15 · คุณค่าทางวิชาการและการนำไปใช้จริง]</strong></p>
          <p>
            คุณูปการทางวิชาการฝั่งซ้ายมี 3 ด้าน คือการแปลงงานแต่งเรื่องให้เป็นตัวชี้วัดคณิตศาสตร์, การวางระบบตรวจพิสูจน์กราฟแบบออฟไลน์, และการจำลองพฤติกรรมผู้เล่นด้วย Persona ครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ในทางปฏิบัติฝั่งขวา เราสามารถนำโมเดลกราฟนี้ไปเชื่อมต่อกับ Game Engine อย่าง Unity หรือ Unreal ได้ทันที นำแนวคิด Guarded Edges ไปใช้ตรวจเช็กค่าตัวแปรใน Game Runtime State และผสานอัลกอริทึม DFS เข้ากับไปป์ไลน์ CI/CD เพื่อสแกนหาข้อผิดพลาดของบทเกมโดยอัตโนมัติก่อนส่งมอบเกมครับ
          </p>
        `
      },
      {
        id: 6,
        start: 255,
        end: 285,
        title: "7. ข้อจำกัด & สรุป",
        timeLabel: "4:15 - 4:45",
        slide: {
          num: "Slide 7 / 7",
          title: "ข้อจำกัด และบทสรุป",
          bullets: [
            "ข้อจำกัด 3 ข้อ: ขาดกลุ่มควบคุมเปรียบเทียบ (No Control Baseline), DFS เสี่ยง State Explosion ในกราฟใหญ่, ขอบเขตชุดทดสอบยังเล็ก",
            "การยกระดับสู่ Automated QA: วางรากฐานทฤษฎีกราฟและ Persona ตรวจเกมเล่าเรื่องอัตโนมัติ ลดต้นทุน Playtesting",
            "การเชื่อมต่อ Game Engine เชิงพาณิชย์: พัฒนาปลั๊กอินสำหรับ Unity, Unreal Engine หรือ Visual Novel Engines",
            "การใช้ AI/LLM ช่วยซ่อมแซมเนื้อเรื่อง: ผสาน Large Language Models ร่วมกับกราฟ เพื่อเสนอแนวทางแก้ตัวแปรหรือทางตันอัตโนมัติ"
],
          diagram: `ข้อจำกัด: ขาด Baseline, DFS Explosion ──▶ สรุป: ก้าวสู่ Automated QA, ปลั๊กอินเอนจินเกม, AI/LLM ซ่อมเรื่อง`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section VI"
        },
        slideImage: 'assets/slides/slide-7.png',
        scriptHtml: `
<p><strong>[4:15 - 4:45 · ข้อจำกัดและบทสรุป]</strong></p>
          <p>
            สุดท้ายในด้านข้อจำกัด เปเปอร์นี้ยังขาดกลุ่มควบคุมเปรียบเทียบเชิงสถิติ และการใช้ DFS ยังมีความเสี่ยงต่อ State Explosion หากกราฟมีขนาดใหญ่และมีลูปวนซ้ำครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            โดยสรุป Story Validator ได้วางรากฐานสำคัญของการนำวิทยาการคอมพิวเตอร์มาช่วยทำ Automated QA ให้กับเกมเล่าเรื่อง และก้าวต่อไปคือการนำ Large Language Models หรือ AI เข้ามาทำงานร่วมกับกราฟ เพื่อช่วยแนะนำวิธีแก้ไขเงื่อนไขตัวแปรหรือเส้นทางที่ติดตันโดยอัตโนมัติครับ
          </p>
          <p>
            ผมขอจบการนำเสนอเพียงเท่านี้ ขอบคุณครับ
          </p>
        `
      }
    ]
  }
};

class PresentationStudio {
  constructor() {
    this.currentTime = 0;
    this.timerInterval = null;
    this.isRunning = false;
    this.currentSlideIndex = 0;

    const paperDropdown = document.getElementById('paper-select-dropdown');
    if (paperDropdown) {
      this.activePaper = paperDropdown.value;
    } else if (document.body.dataset.paper) {
      this.activePaper = document.body.dataset.paper;
    } else if (window.location.pathname.includes('paper-2')) {
      this.activePaper = 'story-validator';
    } else {
      this.activePaper = 'iot-cad';
    }

    this.speechMode = 'peer';     // 'peer' | 'executive'
    this.totalDuration = this.stages[this.stages.length - 1]?.end || 300;

    this.initDOM();
  }

  get stages() {
    const paperData = PRESENTATION_DATA[this.activePaper] || PRESENTATION_DATA['story-validator'] || PRESENTATION_DATA['iot-cad'];
    return paperData[this.speechMode] || paperData['peer'] || paperData['executive'];
  }

  initDOM() {
    this.timerEl = document.getElementById('studio-timer');
    this.timerDot = document.getElementById('studio-timer-dot');
    this.playBtn = document.getElementById('studio-play-btn');
    this.resetBtn = document.getElementById('studio-reset-btn');
    this.prevSlideBtn = document.getElementById('slide-prev-btn');
    this.nextSlideBtn = document.getElementById('slide-next-btn');

    this.slideBadgeEl = document.getElementById('slide-num-badge');
    this.slideVenueEl = document.getElementById('slide-venue-badge');
    this.slideTitleEl = document.getElementById('slide-title');
    this.slideBulletsEl = document.getElementById('slide-bullets');
    this.slideDiagramEl = document.getElementById('slide-diagram');
    this.slideCitationEl = document.getElementById('slide-citation');

    this.teleprompterContainer = document.getElementById('teleprompter-content');
    this.timelineSegments = document.querySelectorAll('.timeline-segment');

    if (this.playBtn && !this.playBtn.dataset.bound) {
      this.playBtn.dataset.bound = 'true';
      this.playBtn.addEventListener('click', () => this.toggleTimer());
    }

    if (this.resetBtn && !this.resetBtn.dataset.bound) {
      this.resetBtn.dataset.bound = 'true';
      this.resetBtn.addEventListener('click', () => this.resetTimer());
    }

    if (this.prevSlideBtn && !this.prevSlideBtn.dataset.bound) {
      this.prevSlideBtn.dataset.bound = 'true';
      this.prevSlideBtn.addEventListener('click', () => this.prevSlide());
    }

    if (this.nextSlideBtn && !this.nextSlideBtn.dataset.bound) {
      this.nextSlideBtn.dataset.bound = 'true';
      this.nextSlideBtn.addEventListener('click', () => this.nextSlide());
    }

    this.timelineSegments.forEach((seg, idx) => {
      seg.addEventListener('click', () => {
        this.jumpToStage(idx);
      });
    });

    // Speech Mode Buttons
    const modeButtons = document.querySelectorAll('.btn-speech-mode');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        this.setSpeechMode(mode);
      });
    });

    // Keyboard Shortcuts (Space = Play/Pause, ArrowLeft = Prev Slide, ArrowRight = Next Slide)
    if (!window._psKeyBound) {
      window._psKeyBound = true;
      document.addEventListener('keydown', (e) => {
        if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        if (e.code === 'Space') {
          const studio = document.querySelector('.rehearsal-studio');
          if (studio && this.isElementInViewport(studio)) {
            e.preventDefault();
            this.toggleTimer();
          }
        } else if (e.code === 'ArrowRight') {
          this.nextSlide();
        } else if (e.code === 'ArrowLeft') {
          this.prevSlide();
        }
      });
    }

    this.renderTeleprompterFull();
    this.renderSlide(0);
    this.updateTimerDisplay();
  }

  setSpeechMode(mode) {
    if (!['peer', 'executive'].includes(mode)) return;
    this.speechMode = mode;

    document.querySelectorAll('.btn-speech-mode').forEach(btn => {
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.renderTeleprompterFull();
    this.renderSlide(this.currentSlideIndex);
  }

  setPaper(paperId) {
    if (!PRESENTATION_DATA[paperId]) return;
    this.activePaper = paperId;
    this.resetTimer();
    this.renderTeleprompterFull();
    this.renderSlide(0);
  }

  renderTeleprompterFull() {
    if (!this.teleprompterContainer) return;
    const stages = this.stages;

    let html = '';
    stages.forEach((st, idx) => {
      html += `
        <div class="script-section ${idx === this.currentSlideIndex ? 'highlight-current-script' : ''}" id="script-stage-${idx}">
          ${st.scriptHtml}
        </div>
      `;
    });
    this.teleprompterContainer.innerHTML = html;

    // Update timeline segment titles & times
    this.timelineSegments = document.querySelectorAll('.timeline-segment');
    this.timelineSegments.forEach((seg, idx) => {
      if (stages[idx]) {
        const timeSpan = seg.querySelector('.seg-time');
        const titleSpan = seg.querySelector('.seg-title');
        if (timeSpan) timeSpan.innerText = stages[idx].timeLabel;
        if (titleSpan) titleSpan.innerText = stages[idx].title;
      }
      if (!seg.dataset.bound) {
        seg.dataset.bound = 'true';
        seg.addEventListener('click', () => {
          this.jumpToStage(idx);
        });
      }
    });
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= -200 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200
    );
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.timerDot) this.timerDot.classList.add('running');
    if (this.playBtn) {
      this.playBtn.innerHTML = '❚❚ พักเวลา';
      this.playBtn.classList.add('btn-secondary');
      this.playBtn.classList.remove('btn-primary');
    }

    this.timerInterval = setInterval(() => {
      this.currentTime++;
      this.updateTimerDisplay();
      this.syncStageWithTime();

      if (this.currentTime >= this.totalDuration) {
        this.pauseTimer();
        alert('ครบเวลา 5:00 นาทีแล้วครับ! สรุปและเปิดรับคำถาม');
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    if (this.timerDot) this.timerDot.classList.remove('running');
    if (this.playBtn) {
      this.playBtn.innerHTML = '▶ เริ่มซ้อม';
      this.playBtn.classList.add('btn-primary');
      this.playBtn.classList.remove('btn-secondary');
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.currentTime = 0;
    this.updateTimerDisplay();
    this.jumpToStage(0);
  }

  updateTimerDisplay() {
    if (!this.timerEl) return;
    const remaining = Math.max(0, this.totalDuration - this.currentTime);
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    this.timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const capsule = this.timerEl.closest('.timer-display-capsule');
    if (capsule) {
      capsule.classList.remove('time-warning', 'time-danger');
      if (remaining <= 20) {
        capsule.classList.add('time-danger');
      } else if (remaining <= 60) {
        capsule.classList.add('time-warning');
      }
    }
  }

  syncStageWithTime() {
    const stages = this.stages;
    const currentStageIndex = stages.findIndex(
      s => this.currentTime >= s.start && this.currentTime < s.end
    );

    if (currentStageIndex !== -1 && currentStageIndex !== this.currentSlideIndex) {
      this.renderSlide(currentStageIndex);
    }
  }

  jumpToStage(stageIndex) {
    const stages = this.stages;
    if (stageIndex < 0 || stageIndex >= stages.length) return;
    this.currentTime = stages[stageIndex].start;
    this.updateTimerDisplay();
    this.renderSlide(stageIndex);
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.jumpToStage(this.currentSlideIndex - 1);
    }
  }

  nextSlide() {
    const stages = this.stages;
    if (this.currentSlideIndex < stages.length - 1) {
      this.jumpToStage(this.currentSlideIndex + 1);
    }
  }

  renderSlide(index) {
    const stages = this.stages;
    if (!stages[index]) return;
    this.currentSlideIndex = index;
    const stage = stages[index];

    // Update timeline active class
    this.timelineSegments.forEach((seg, idx) => {
      if (idx === index) {
        seg.classList.add('active');
      } else {
        seg.classList.remove('active');
      }
    });

    // Update Slide DOM
    if (this.slideBadgeEl) this.slideBadgeEl.innerText = stage.slide.num;

    // If real slide image available, show it instead of mock
    const slideImg = document.getElementById('slide-real-img');
    if (slideImg && stage.slideImage) {
      slideImg.src = stage.slideImage;
      slideImg.alt = `สไลด์นำเสนอหน้า ${index + 1}`;
      // Hide mock elements if they exist
      if (this.slideVenueEl) this.slideVenueEl.style.display = 'none';
      if (this.slideTitleEl) this.slideTitleEl.style.display = 'none';
      if (this.slideBulletsEl) this.slideBulletsEl.style.display = 'none';
      if (this.slideDiagramEl) this.slideDiagramEl.style.display = 'none';
      if (this.slideCitationEl) this.slideCitationEl.style.display = 'none';
    } else {
      // Fallback to mock rendering
      if (this.slideVenueEl) {
        this.slideVenueEl.style.display = '';
        if (this.activePaper === 'mcsoa') this.slideVenueEl.innerText = 'IEEE CACRE 2024';
        else if (this.activePaper === 'story-validator') this.slideVenueEl.innerText = 'IEEE CoG 2021';
        else this.slideVenueEl.innerText = 'IEEE/ACM ICCAD 2020';
      }
      if (this.slideTitleEl) { this.slideTitleEl.style.display = ''; this.slideTitleEl.innerText = stage.slide.title; }
      if (this.slideDiagramEl) { this.slideDiagramEl.style.display = ''; this.slideDiagramEl.innerText = stage.slide.diagram; }
      if (this.slideCitationEl) { this.slideCitationEl.style.display = ''; this.slideCitationEl.innerText = stage.slide.citation; }
      if (this.slideBulletsEl) {
        this.slideBulletsEl.style.display = '';
        this.slideBulletsEl.innerHTML = '';
        stage.slide.bullets.forEach(b => {
          const li = document.createElement('li');
          li.innerText = b;
          this.slideBulletsEl.appendChild(li);
        });
      }
    }

    // Scroll Teleprompter section into view
    const targetScript = document.getElementById(`script-stage-${index}`);
    if (targetScript && this.teleprompterContainer) {
      document.querySelectorAll('.script-section').forEach(s => s.classList.remove('highlight-current-script'));
      targetScript.classList.add('highlight-current-script');

      const topOffset = targetScript.offsetTop - this.teleprompterContainer.offsetTop;
      this.teleprompterContainer.scrollTo({
        top: Math.max(0, topOffset - 20),
        behavior: 'smooth'
      });
    }

    // Update Concept Explainer (Teaching UI)
    this.renderConceptExplainer(index);
  }

  renderConceptExplainer(index) {
    const conceptEl = document.getElementById('concept-content');
    if (!conceptEl) return;

    const CONCEPTS = [
      // Slide 1
      `<div class="concept-card" style="padding: 18px; background: var(--paper); border-radius: 8px; border-left: 4px solid var(--purple);">
        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">📌 1. ทฤษฎีกราฟ (Graph Theory) คืออะไร? มีอ้างอิงจริงในโลกไหม?</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          <strong>ทฤษฎีกราฟ (Graph Theory)</strong> คือสาขาหนึ่งของคณิตศาสตร์และวิทยาการคอมพิวเตอร์ที่ศึกษาความสัมพันธ์ระหว่าง <em>"จุดยอดหรือโหนด (Vertices/Nodes)"</em> กับ <em>"เส้นเชื่อม (Edges)"</em> โดยมีจุดเริ่มต้นตั้งแต่ปี 1736 จากนักคณิตศาสตร์ระดับตำนาน <strong>Leonhard Euler</strong> ที่แก้ปัญหาสะพานทั้งเจ็ดแห่งเมืองโคนิกส์เบิร์ก (Seven Bridges of Königsberg)
        </p>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          🌍 <strong>การใช้งานจริงในโลกปัจจุบัน (Real-world Applications):</strong><br>
          • <strong>Google Maps / GPS:</strong> มองทางแยกเป็น Node และถนนเป็น Edge จากนั้นใช้อัลกอริทึมกราฟ (เช่น Dijkstra หรือ A*) หาเส้นทางที่สั้นที่สุด<br>
          • <strong>Social Networks (Facebook, Instagram):</strong> บัญชีผู้ใช้แต่ละคนคือ Node และความเป็นเพื่อน/การติดตามคือ Edge เรียกว่า <em>Social Graph</em><br>
          • <strong>วงการเกม (Game Industry):</strong> ระบบเควสต์ (Quest Tree), ผังพฤติกรรมศัตรู (Behavior Tree), และผังบทสนทนา (Dialogue Graph) ในเอนจินระดับโลกอย่าง Unreal Engine หรือ Unity ล้วนสร้างอยู่บนทฤษฎีกราฟทั้งสิ้น
        </p>
        <p style="margin: 0 0 14px; line-height: 1.75;">
          ⚙️ <strong>ทำงานอย่างไรใน Story Validator:</strong><br>
          โปรแกรมจะแปลงนิยายที่มีทางเลือกให้เป็น <strong>Directed Graph (กราฟระบุทิศทาง)</strong> โดยมองว่าแต่ละฉาก (Passage) คือโหนด และแต่ละทางเลือก (Choice) คือเส้นเชื่อมที่มีทิศทาง เมื่อแปลงเป็นกราฟแล้ว คอมพิวเตอร์จึงสามารถใช้อัลกอริทึมตรวจสอบทางคณิตศาสตร์ได้ 100% ว่ามีเส้นทางไหนที่ตัน หรือมีฉากไหนที่เข้าไม่ถึง โดยที่มนุษย์ไม่ต้องเสียเวลามานั่งคลิกเล่นเอง
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">📌 2. การจำลองผู้เล่น (Player Simulation / Persona) คืออะไร? ทำงานยังไง?</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          คือการสร้าง <strong>บอทหรือตัวแทนอัจฉริยะ (Intelligent Agent)</strong> ที่ถูกตั้งโปรแกรมให้มี "พฤติกรรม บุคลิก หรืออุปนิสัย" เหมือนผู้เล่นมนุษย์จริงๆ เพื่อให้มันเข้าไปเดินสำรวจและทดสอบระบบเกมแทนคนจริง
        </p>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          🌍 <strong>การอ้างอิงจริงในโลกและงานวิจัย:</strong><br>
          • ในเปเปอร์นี้ ผู้วิจัยได้อ้างอิงถึงกรอบงานวิจัยระดับโลกชื่อ <strong>PathOS</strong> ของ Stahlke et al. (ตีพิมพ์ในงาน ACM CHI Play 2019) ซึ่งเป็นระบบ AI จำลองผู้เล่นมนุษย์ตามบุคลิกต่างๆ เช่น สายอยากรู้อยากเห็น (Curiosity), สายก้าวร้าว (Aggression), และสายชอบเก็บครบทุกอย่าง (Completion)<br>
          • ค่ายเกมระดับโลกอย่าง <strong>Electronic Arts (EA)</strong> และ <strong>King (ผู้สร้าง Candy Crush)</strong> ใช้ AI Bot จำลองการเล่นวันละหลายล้านรอบ เพื่อวิเคราะห์ความยากง่าย (Game Balancing) และหาบั๊กก่อนปล่อยเกมสู่ตลาด
        </p>
        <p style="margin: 0; line-height: 1.75;">
          ⚙️ <strong>ทำงานอย่างไรในเปเปอร์นี้:</strong> คนแต่งบทสามารถกำหนดค่าน้ำหนักอารมณ์ให้ตัวจำลอง (เช่น ชอบตัวเลือกที่แสดงความโกรธ 75%) แล้วสั่งให้บอทเริ่มเล่นตั้งแต่ฉากแรก บอทจะเลือกคำตอบตามนิสัยนั้นไปเรื่อยๆ จนจบเรื่อง ทำให้นักเขียนเห็นล่วงหน้าทันทีว่า "ถ้าคนเล่นสายหัวร้อนมาเล่น จะหลุดไปเจอบั๊กตรงไหนบ้าง"
        </p>
      </div>`,

      // Slide 2
      `<div class="concept-card" style="padding: 18px; background: var(--paper); border-radius: 8px; border-left: 4px solid var(--purple);">
        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">📌 1. Twine คืออะไร? มันทำงานอย่างไร?</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          <strong>Twine (ทไวน์)</strong> คือโปรแกรมสร้างเกมแบบ Open-Source ฟรีที่ได้รับความนิยมอันดับ 1 ของโลกสำหรับสร้างนิยายภาพเชิงโต้ตอบ (Interactive Fiction) และเกมประเภทข้อความ (Text-based Games) สร้างโดย Chris Klimas ในปี 2009 เว็บไซต์หลักคือ <em>twinery.org</em>
        </p>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          📝 <strong>วิธีการทำงานของ Twine:</strong><br>
          1. คนแต่งเรื่องจะสร้างกล่องสี่เหลี่ยมเรียกว่า <strong>Passage (ฉาก)</strong> แล้วพิมพ์เนื้อหาบทสนทนาลงไป<br>
          2. หากต้องการให้ผู้เล่นมีทางเลือกเพื่อไปฉากถัดไป คนแต่งจะพิมพ์เครื่องหมายวงเล็บก้ามปูสองชั้น เช่น <code>[[สำรวจโต๊ะทำงาน->ฉากโต๊ะทำงาน]]</code><br>
          3. ตัวโปรแกรม Twine จะลากเส้นลูกศรเชื่อมระหว่างกล่องให้อัตโนมัติ กลายเป็นแผนผังใยแมงมุมที่เห็นใน <strong>"ภาพที่ 1 บนสไลด์"</strong> เรียกว่า <em>Node & Link Storyboard</em>
        </p>

        <h4 style="margin: 0 0 10px; color: var(--red); font-size: 1.05rem;">📌 2. ปัญหาและจุดบอดของผังใน Twine (ทำไมสายตามนุษย์ถึงตรวจไม่ไหว?)</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          ผังใน Twine เป็นเพียง <strong>"กระดานวาดรูปทางกายภาพ (Visual Canvas)"</strong> มันมีหน้าที่แค่วาดเส้นเชื่อมให้ดูสวยงาม แต่ <strong>"ไม่มีสมองในการตรวจตรรกะเบื้องหลัง (No Logic Verification)"</strong> เลยแม้แต่น้อย!
        </p>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          ⚠️ <strong>ตัวอย่างความผิดพลาดที่ Twine ตรวจไม่พบ:</strong><br>
          • <strong>พิมพ์เงื่อนไขตัวแปรผิด:</strong> เช่น คนแต่งตั้งเงื่อนไขว่า <code>[ต้องมีค่าความกลัว >= 10 ถึงจะเปิดประตูนี้ได้]</code> แต่ตลอดทั้งเกม ผู้เล่นทำค่าความกลัวได้สูงสุดแค่ 5 แต้ม! ส่งผลให้ในเกมจริง ประตูนี้จะไม่มีวันเปิดได้ (กลายเป็นฉากที่เข้าไม่ถึง หรือ <em>Lost Plot</em>) แต่ในผัง Twine เส้นลูกศรก็ยังโยงไปหาฉากนั้นตามปกติ คนแต่งมองด้วยสายตาเปล่าจะคิดว่าทุกอย่างสมบูรณ์ดี<br>
          • <strong>ลืมใส่ทางไปต่อ (Dead-End):</strong> คนแต่งเขียนฉากหนึ่งเสร็จ แต่ลืมพิมพ์ทางเลือกให้ไปต่อ ผู้เล่นที่เดินมาถึงฉากนี้จะติดค้าง จอเกมมืด ดำเนินเรื่องต่อไม่ได้
        </p>
        <p style="margin: 0; line-height: 1.75;">
          📊 <strong>ที่มาของตัวเลข 76%:</strong> จากการเก็บแบบสอบถามของเปเปอร์ พบว่านักเขียนบทเกมถึง 76% ยังคงร่างบทใน Microsoft Word หรือ Google Docs แล้วค่อยก็อปปี้มาลง Twine ส่งผลให้ไม่มีเครื่องมืออัตโนมัติตัวใดคอยตรวจจับข้อผิดพลาดเชิงตรรกะ บั๊กจึงหลุดรอดไปถึงมือผู้เล่นจริงในที่สุด
        </p>
      </div>`,

      // Slide 3
      `<div class="concept-card" style="padding: 18px; background: var(--paper); border-radius: 8px; border-left: 4px solid var(--purple);">
        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">📌 1. Directed Graph G = (V, E) และ Guarded Edges</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          • <strong>Directed Graph (กราฟระบุทิศทาง):</strong> ลูกศรมีทิศทางชัดเจน เช่น จากฉาก A เดินไปฉาก B ผู้เล่นจะเดินย้อนศรจาก B กลับมา A ไม่ได้ เว้นแต่คนแต่งจะสร้างทางเลือกให้เดินกลับ<br>
          • <strong>Passage (โหนด V):</strong> แต่ละฉากหรือบล็อกเนื้อเรื่อง บรรจุข้อความและคำสั่งเปลี่ยนแปลงตัวแปร (เช่น <code>Anger = Anger + 2</code>)<br>
          • <strong>Guarded Edges (เส้นเชื่อมแบบมีเงื่อนไขล็อกไว้):</strong> ทางเลือกที่มีเงื่อนไขตัวแปรกำกับ เช่น "ต้องมีค่าความโกรธ &ge; 3 ทางเลือกนี้จึงจะปรากฏให้คลิกได้"
        </p>
        <p style="margin: 0 0 12px; line-height: 1.75;">
          🔄 <strong>DFS (Depth-First Search) ท่องกราฟอย่างไร:</strong><br>
          เริ่มจากฉากแรกสุด แล้วเลือกเดินลึกไปเรื่อยๆ จนกระทั่งถึง "ฉากจบ" พอถึงฉากจบ 1 เส้นทางแล้ว ระบบจะใช้การ <strong>Backtrack (ถอยหลังกลับมาทีละก้าว)</strong> เพื่อลองเลี้ยวไปทางแยกอื่น ทำแบบนี้ซ้ำๆ จนกระทั่งเก็บข้อมูลได้ครบทุกเส้นทางที่เป็นไปได้ (เรียกว่า <em>Playthrough Traces</em>)
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">📌 2. เจาะลึกความหมายของ 5 ตัวชี้วัดคุณภาพโครงเรื่อง</h4>
        <div style="overflow-x: auto;">
          <table style="width:100%; font-size:0.88rem; border-collapse:collapse; margin-bottom:8px;">
            <tr style="background:var(--purple);color:white;"><th style="padding:8px;text-align:left;">ตัวชี้วัด</th><th style="padding:8px;text-align:left;">ความหมายและการนำไปใช้จริง</th></tr>
            <tr style="border-bottom:1px solid var(--rule);"><td style="padding:8px;"><strong>1. N<sub>paths</sub> (Number of Paths)</strong></td><td style="padding:8px;">นับผลรวมของเส้นทางการเล่นทั้งหมดตั้งแต่จุดเริ่มต้นจนถึงฉากจบ เช่น ใน TMC มีทั้งหมด 20 เส้นทาง</td></tr>
            <tr style="border-bottom:1px solid var(--rule);"><td style="padding:8px;"><strong>2. S<sub>points</sub> (Stroke Points)</strong></td><td style="padding:8px;"><strong>ฉากคอขวดที่ทุกเส้นทาง 100% ต้องไหลผ่าน</strong> เช่น ฉากเปิดตัวคนร้าย เพื่อยืนยันว่าผู้เล่นทุกคนได้รับรู้ข้อมูลสำคัญตามเจตจำนงของคนแต่งแน่นอน ไม่ว่าจะเลือกช้อยส์ไหนก็ตาม</td></tr>
            <tr style="border-bottom:1px solid var(--rule);"><td style="padding:8px;"><strong>3. P<sub>endings</sub> (Endings Hit %)</strong></td><td style="padding:8px;">สัดส่วนความน่าจะเป็นในการเกิดฉากจบแต่ละแบบ เช่น จบแบบนักสืบยอดเยี่ยม 50%, จบแบบคนร้ายหนีไปได้ 50% และตรวจหาฉากจบที่มีโอกาสเกิด 0% (ฉากจบที่เข้าไม่ถึง)</td></tr>
            <tr style="border-bottom:1px solid var(--rule);"><td style="padding:8px;"><strong>4. Dead-Ends &amp; Lost Plot</strong></td><td style="padding:8px;">• <strong>Dead-End (ทางตัน):</strong> ฉากที่เล่นไปแล้วไม่มีทางเลือกให้ไปต่อ และไม่ใช่ฉากจบ ทำให้เกมค้าง<br>• <strong>Lost Plot (ฉากผีหลอก):</strong> ฉากที่มีอยู่จริงในระบบ แต่ไม่มีผู้เล่นคนไหนเดินเข้าไปถึงได้เลย เพราะเงื่อนไขตัวแปรขัดแย้งกันเอง</td></tr>
            <tr><td style="padding:8px;"><strong>5. V<sub>evol</sub> (Evolution of Variables)</strong></td><td style="padding:8px;">กราฟจุด (Dotted Chart) แสดงเส้นเวลาว่าในแต่ละเส้นทาง ตัวแปรอารมณ์แกว่งตัวอย่างไร ช่วยตรวจจับค่าที่หลุดช่วง (Out-of-range) เช่น ค่าเลือดติดลบ หรือค่าความโกรธทะลุเพดาน</td></tr>
          </table>
        </div>
      </div>`,

      // Slide 4
      `<div class="concept-card" style="padding: 18px; background: var(--paper); border-radius: 8px; border-left: 4px solid var(--purple);">
        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🤖 1. ทบทวนวิชา AI: การค้นหาและ Heuristic Search</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          ในวิชาปัญญาประดิษฐ์ (AI) การแก้ปัญหาการตัดสินใจเดินในกราฟ แบ่งออกเป็น 2 รูปแบบใหญ่ๆ:<br>
          1. <strong>Uninformed Search (การค้นหาแบบตาบอด):</strong> เช่น BFS หรือ DFS พวกนี้ไม่มีเป้าหมายความชอบในใจ เดินดุ่มๆ ไปตามโครงสร้างกราฟเฉยๆ<br>
          2. <strong>Informed / Heuristic Search (การค้นหาแบบมีตัวชี้นำ):</strong> เอเจนต์จะมี <em>ฟังก์ชันประเมินค่า (Heuristic Function)</em> คอยให้คะแนนว่า "ทางเลือกไหนสอดคล้องกับความต้องการของฉันมากที่สุด"
        </p>
        <p style="margin: 0 0 12px; line-height: 1.75;">
          💡 <strong>ทำไมงานวิจัยนี้ถึงเลือกใช้ "Greedy (ตะกละ)"?</strong><br>
          คำว่า <em>Greedy</em> ในทาง AI หมายถึง <strong>"การมองแค่ก้าวถัดไปเพียง 1 ก้าว แล้วเลือกช้อยส์ที่ดีที่สุด ณ วินาทีนั้นทันที"</strong> โดยไม่สนว่าอนาคตระยะยาวจะเป็นอย่างไร<br>
          👉 <em>เหตุผลทางจิตวิทยาตามเปเปอร์:</em> มนุษย์เวลาเล่นเกมไม่ได้มองเห็นแผนที่ทั้งเกมล่วงหน้า (ไม่มี Global Knowledge) แต่มนุษย์จะตัดสินใจแบบ <strong>"ก้าวต่อก้าว" (Locally Optimal)</strong> ตามอารมณ์และความชอบของตนเอง ณ วินาทีนั้น ดังนั้น อัลกอริทึม Greedy จึงสะท้อนพฤติกรรมการเล่นของมนุษย์ได้สมจริงที่สุด!
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">📐 2. ถอดรหัสสูตร Heuristic Greedy Search</h4>
        <div style="background: rgba(0,0,0,0.06); padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 0.96rem; margin-bottom: 10px;">
          Score(L) = &Sigma;<sub>i=1..n</sub> (w<sub>i</sub> &times; v<sub>i</sub>)<br>
          L* = arg max<sub>L &isin; Links</sub> Score(L)
        </div>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          🗣️ <strong>คำอ่านออกเสียงภาษาไทย:</strong><br>
          • <code>Score(L) = &Sigma;(w<sub>i</sub> &times; v<sub>i</sub>)</code> อ่านว่า: <em>"สกอร์ของแอล เท่ากับ ซัมเมชันของ ดับเบิลยู-ไอ คูณ วี-ไอ เมื่อ ไอ เท่ากับ 1 ถึง เอ็น"</em><br>
          • <code>L* = arg max Score(L)</code> อ่านว่า: <em>"แอล-สตาร์ เท่ากับ อาร์ก-แมกซ์ของ สกอร์-แอล เมื่อ แอล เป็นสมาชิกใน ลิงก์ส"</em>
        </p>
        <p style="margin: 0 0 12px; line-height: 1.75;">
          📖 <strong>ความหมายของสัญลักษณ์แต่ละตัว:</strong><br>
          • <strong>L (Link):</strong> ทางเลือกที่กดได้ในฉากนั้นๆ (เช่น ช้อยส์ A, ช้อยส์ B)<br>
          • <strong>w<sub>i</sub> (Weight):</strong> ค่าน้ำหนักความสำคัญของอารมณ์นั้นตามบุคลิกผู้เล่น (Persona) รวมกันทุกตัวมักเท่ากับ 1.0<br>
          • <strong>v<sub>i</sub> (Value):</strong> การเปลี่ยนแปลงค่าของตัวแปรอารมณ์ที่ทางเลือก L มอบให้แก่ NPC<br>
          • <strong>L*:</strong> ช้อยส์ที่ดีที่สุดที่ระบบ Greedy เลือกในก้าวนี้ (ช้อยส์ที่ได้ผลรวมคะแนนสูงสุด)
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🎭 3. Player Personas: Aggressive vs Paranoid คืออะไร?</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          คำว่า <strong>Persona (เพอร์โซนา)</strong> หมายถึง "ตัวแทนบุคลิกของกลุ่มผู้ใช้งาน"<br>
          • <strong>Aggressive Persona (แอ็ก-เกรส-ซีฟ เพอร์-โซ-นา):</strong> ผู้เล่นสายก้าวร้าว/สายลุยแหลก ชอบการปะทะ ในเปเปอร์ตั้งค่าน้ำหนัก: <code>Anger = 0.75 (โกรธ 75%), Confusion = 0.15 (สับสน 15%), Fear = 0.10 (กลัว 10%)</code> บอทนี้จะเลือกคำตอบที่ทำให้คนร้ายโมโหมากที่สุดเสมอ<br>
          • <strong>Paranoid Persona (พา-รา-นอยด์ เพอร์-โซ-นา):</strong> ผู้เล่นสายหวาดระแวง/ขี้กลัว ปลอดภัยไว้ก่อน ตั้งค่าน้ำหนัก: <code>Fear = 0.70 (กลัว 70%), Confusion = 0.20 (สับสน 20%), Anger = 0.10 (โกรธ 10%)</code> บอทนี้จะเลือกคำตอบที่หลีกเลี่ยงการปะทะและระแวดระวังที่สุดเสมอ
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🔢 4. ตัวอย่างการคำนวณจริงตามเปเปอร์ (The Murder Case)</h4>
        <p style="margin: 0; line-height: 1.75;">
          สมมตินักสืบอยู่ในห้องสอบสวน มี 2 ตัวเลือกให้กด:<br>
          • <strong>ทางเลือก A (กระชากคอเสื้อขู่):</strong> ส่งผลให้ค่าตัวแปร [Anger=+4, Confusion=0, Fear=+1]<br>
          • <strong>ทางเลือก B (พูดจาไกล่เกลี่ยสุภาพ):</strong> ส่งผลให้ค่าตัวแปร [Anger=0, Confusion=+2, Fear=+2]<br>
          👉 <strong>ถ้าคำนวณด้วย Aggressive Persona (w = [0.75, 0.15, 0.10]):</strong><br>
          Score(A) = (0.75 &times; 4) + (0.15 &times; 0) + (0.10 &times; 1) = 3.00 + 0 + 0.10 = <strong>3.10</strong><br>
          Score(B) = (0.75 &times; 0) + (0.15 &times; 2) + (0.10 &times; 2) = 0 + 0.30 + 0.20 = <strong>0.50</strong><br>
          <strong>ผลลัพธ์:</strong> <code>L* = arg max(3.10, 0.50) = A</code> ระบบ Greedy จะเลือกทางเลือก A ทันที! ทำให้คนแต่งรู้ล่วงหน้าว่า ผู้เล่นสายดุดันจะเดินไปทางไหนและจะหลุดไปเจอบั๊กตัวไหนบ้าง
        </p>
      </div>`,

      // Slide 5
      `<div class="concept-card" style="padding: 18px; background: var(--paper); border-radius: 8px; border-left: 4px solid var(--purple);">
        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🌳 1. สอนดู "ผังต้นไม้ (Narrative Tree)" จากของจริงในเปเปอร์ (Figure 7 & 8)</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          ในหน้า 7 ของเปเปอร์ ภาพ Figure 7 และ Figure 8 แสดงหน้าจอโปรแกรม Story Validator จริงๆ:<br>
          • <strong>โครงสร้างต้นไม้:</strong> โหนดบนสุดคือ <em>Root (จุดเริ่มต้นของเรื่อง)</em> จากนั้นจะแตกกิ่งก้านสาขาลงมาด้านล่างตามทางเลือกที่ผู้เล่นกด แต่ละกล่องคือ 1 Passage<br>
          • <strong>ปัญหา Choice 5 Dead-End:</strong> ในบททดสอบ TMC ผู้วิจัยจงใจสร้างบั๊กขึ้นมา โดยในเส้นทางที่ 7 และ 14 เดินเรื่องมาถึงกล่องชื่อ <strong>"Choice 5"</strong> แต่ปรากฏว่า <em>คนเขียนบทลืมพิมพ์ทางเลือกใส่เข้าไปในกล่อง Choice 5</em> ทำให้มันไม่มีเส้นลูกศรแตกออกไปต่อ และตัวมันก็ไม่ใช่ฉากจบ! ผู้เล่นที่เล่นมาถึงตรงนี้จะติดค้างทันที<br>
          • <strong>การตรวจจับของ Story Validator:</strong> โปรแกรมจะวิเคราะห์โครงสร้างกราฟ และ <strong>ชี้เป้าไฮไลต์สีแดงที่กล่อง Choice 5</strong> บนผังต้นไม้ทันที พร้อมแจ้งเตือนว่านี่คือบั๊ก Dead-End
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🔍 2. การทำงานของตัวกรอง Lost Plot (Analysis Condition)</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          ที่แถบเมนูด้านซ้ายของโปรแกรม Story Validator จะมี Checkbox ให้เลือกตรวจเงื่อนไขต่างๆ เมื่อผู้ใช้คลิกเลือก <strong>"Lost Plot"</strong> ระบบจะประมวลผลอัลกอริทึมเบื้องหลัง แล้ว <strong>หรี่แสงกิ่งก้านปกติให้เป็นสีเทาจางๆ และไฮไลต์เฉพาะกิ่งที่มีปัญหาขึ้นมาอย่างเด่นชัด</strong> ทำให้ผู้ใช้มองเห็นจุดผิดพลาดได้ทันทีภายในเวลาเฉลี่ยเพียง <strong>52.3 วินาที</strong>
        </p>

        <h4 style="margin: 0 0 10px; color: var(--red); font-size: 1.05rem;">⚠️ 3. ทำไมผู้ใช้ 15% (3 คน) ถึงตรวจพลาดล้มเหลว?</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          ในเปเปอร์ Section VI.C หน้า 7 ระบุข้อค้นพบที่น่าสนใจมากว่า: มีผู้ร่วมทดสอบ 3 คน (คิดเป็น 15%) ที่ <em>ไม่ยอมคลิกเปิดตัวกรอง Lost Plot</em> แต่พยายามใช้สายตาตนเองกวาดไล่ดูผังต้นไม้ทีละกิ่ง ผลลัพธ์คือ <strong>ทั้ง 3 คนนี้ไม่สามารถตรวจพบบั๊ก Problem 2 (Infinite Loop / ลูปวนซ้ำ) ได้เลย!</strong>
        </p>
        <p style="margin: 0; line-height: 1.75;">
          👉 <em>บทเรียนสำคัญ:</em> สายตามนุษย์ไม่มีทางมองเห็น "วงวนที่แอบซ่อนอยู่" หรือเงื่อนไขตัวแปรที่ซับซ้อนในผังขนาดใหญ่ได้เลย เครื่องมือตรวจพิสูจน์แบบอัตโนมัติจึงเป็นสิ่งจำเป็นอย่างยิ่งในอุตสาหกรรม
        </p>
      </div>`,

      // Slide 6
      `<div class="concept-card" style="padding: 18px; background: var(--paper); border-radius: 8px; border-left: 4px solid var(--purple);">
        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🎓 1. คุณูปการทางวิชาการ (Academic Contributions)</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          1. <strong>แปลงศิลปะเป็นคณิตศาสตร์:</strong> เปลี่ยนการเขียนบทเกมซึ่งเดิมเป็นศาสตร์เชิงวรรณกรรม ให้กลายเป็นโจทย์วิศวกรรมที่มีตัวชี้วัดทางคณิตศาสตร์ชัดเจน เช่น Stroke Points, Dead-Ends, Lost Plot<br>
          2. <strong>สถาปัตยกรรม Offline Verification:</strong> นำเสนอพิมพ์เขียวของการตรวจสอบโครงเรื่องก่อนเข้าสู่กระบวนการทดสอบเล่นจริงด้วยมนุษย์ (Human Playtesting) ช่วยประหยัดงบประมาณและเวลาได้มหาศาล<br>
          3. <strong>Persona Simulation:</strong> บุกเบิกการนำ Heuristic Greedy Search มาจำลองพฤติกรรมมนุษย์ในการทดสอบเนื้อเรื่องเกม
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🎮 2. การนำไปใช้จริงในเอนจินเกมและ CI/CD</h4>
        <p style="margin: 0 0 10px; line-height: 1.75;">
          • <strong>การเชื่อมโยงกับ Game Engine (Unity / Unreal Engine):</strong><br>
          - โหนด Passage แปลงเป็น <em>Scene Block หรือ Dialogue Node</em><br>
          - เส้นเชื่อม Link แปลงเป็น <em>Choice Pin หรือ Transition Wire</em> ใน Blueprint<br>
          - Guarded Edges คือโค้ดเงื่อนไข เช่น <code>if (GameState.Anger >= 5) ShowChoice()</code><br>
          • <strong>CI/CD Automated QA Pipeline:</strong><br>
          ในกระบวนการพัฒนาซอฟต์แวร์สมัยใหม่ (CI/CD) ทุกครั้งที่โปรแกรมเมอร์หรือนักเขียนบทแก้บทแล้วกด Commit เข้า GitHub ระบบจะรันสคริปต์ Story Validator ตรวจสอบกราฟให้อัตโนมัติทันที หากพบบั๊กทางตัน ระบบจะปฏิเสธการ Build และแจ้งเตือนทีมงานทันทีก่อนที่เกมจะถูกส่งมอบให้ผู้เล่น
        </p>
      </div>`,

      // Slide 7
      `<div class="concept-card" style="padding: 18px; background: var(--paper); border-radius: 8px; border-left: 4px solid var(--purple);">
        <h4 style="margin: 0 0 10px; color: var(--red); font-size: 1.05rem;">🗣️ แปลภาษามนุษย์เข้าใจง่าย 100%: 3 ข้อจำกัดของเปเปอร์</h4>
        
        <p style="margin: 0 0 10px; line-height: 1.75;">
          ❌ <strong>ประโยคที่ 1: "ขาดกลุ่มควบคุมเปรียบเทียบเชิงสถิติ (No Control Baseline)"</strong><br>
          • <em>แปลเป็นภาษามนุษย์:</em> เหมือนเราคิดค้น "ยาวิเศษรักษาหวัด" แล้วเอาไปให้คน 20 คนกิน ปรากฏว่าทุกคนหายใน 3 วัน เราเลยรีบเคลมว่ายานี้ดีเลิศ! ... แต่ความจริงคือ <strong>เราไม่ได้เอาคนอีกกลุ่มหนึ่งที่ไม่กินยามาเทียบ</strong> ว่าจริงๆ แล้วคนปกติก็หายใน 3 วันเหมือนกันหรือไม่!<br>
          • <em>ในเปเปอร์นี้:</em> ผู้วิจัยวัดแค่ว่าคนใช้ Story Validator หาบั๊กได้ใน 52.3 วินาที แต่ <strong>ไม่ได้ทดลองจับเวลาเทียบกับกลุ่มคนที่ใช้ Twine ตรวจด้วยมือเปล่า</strong> เราจึงตอบไม่ได้เป็นตัวเลขทางสถิติว่ามันเร็วกว่าเดิมกี่เท่า (Speedup)
        </p>

        <p style="margin: 0 0 10px; line-height: 1.75;">
          ❌ <strong>ประโยคที่ 2: "การใช้ DFS เสี่ยงต่อ State-Space Explosion"</strong><br>
          • <em>DFS คืออะไรในภาษามนุษย์:</em> คือวิธีเดินแบบ <strong>"มุ่งหน้าไปทางเดียวจนสุดทางตัน แล้วค่อยถอยหลังกลับมา 1 ก้าวเพื่อลองเลี้ยวทางอื่น"</strong><br>
          • <em>State Explosion คืออะไรในภาษามนุษย์:</em> คือ <strong>"ทางเลือกเยอะเกินจนคอมพิวเตอร์สมองพัง"</strong><br>
          - ถ้าเรื่องสั้นๆ มี 10 ฉาก ทางเลือกมีแค่หลักพัน คอมพิวเตอร์เช็กแป๊บเดียวเสร็จ<br>
          - แต่ถ้าเป็นเกม RPG ใหญ่ๆ มี 300 ฉาก แต่ละฉากมี 3 ทางเลือก จำนวนเส้นทางจะกลายเป็น <strong>3<sup>300</sup></strong> เส้นทาง! ตัวเลขนี้มีเลขศูนย์ต่อท้ายหลายร้อยตัว มากกว่าเม็ดทรายในโลกใบนี้รวมกันเสียอีก คอมพิวเตอร์ที่ใช้วิธี DFS จะต้องเดินตรวจไปอีกหลายล้านปี แรมจะเต็ม และเครื่องจะแฮงก์ทันที
        </p>

        <p style="margin: 0 0 12px; line-height: 1.75;">
          ❌ <strong>ประโยคที่ 3: "ลูปวนซ้ำ (Infinite Loops)"</strong><br>
          • <em>แปลเป็นภาษามนุษย์:</em> คืออาการ <strong>"พายเรือในอ่าง"</strong> เช่น คุยกับ NPC แล้วมีช้อยส์ให้เลือกกดว่า "ขอฟังอีกรอบได้ไหม" แล้วเกมก็ส่งเรากลับมาหน้าเดิม ถ้าโปรแกรม DFS โง่ๆ เดินเข้าไป มันจะกดฟังอีกรอบวนไปเรื่อยๆ เป็นวงกลมไม่มีวันสิ้นสุด ทำให้โปรแกรมค้างไปตลอดกาล
        </p>

        <h4 style="margin: 0 0 10px; color: var(--purple); font-size: 1.05rem;">🚀 ทิศทางในอนาคต: การนำ AI / LLM มาช่วยซ่อมเรื่อง</h4>
        <p style="margin: 0; line-height: 1.75;">
          Story Validator ในปัจจุบันทำได้แค่ "ชี้เป้าว่าบั๊กอยู่ตรงไหน" แต่คนเขียนบทต้องมานั่งแก้เอง ก้าวต่อไปของงานวิจัยคือการผสาน <strong>Large Language Models (เช่น GPT-4 หรือ Gemini)</strong> เข้ากับกราฟ เมื่อระบบเจอบั๊ก Choice 5 ที่เป็นทางตัน AI จะช่วยแต่งเนื้อเรื่องสร้างทางเลือกใหม่ หรือปรับแก้เงื่อนไขตัวแปรให้ผู้เล่นเดินเรื่องต่อไปได้อย่างราบรื่นแบบอัตโนมัติ
        </p>
      </div>`
    ];

    if (this.activePaper === 'story-validator' && CONCEPTS[index]) {
      conceptEl.innerHTML = CONCEPTS[index];
    } else {
      conceptEl.innerHTML = '<p style="color: var(--ink-muted); font-size: 0.88rem;">เลือกสไลด์ด้านบนเพื่อดูเนื้อหาอธิบายประจำสไลด์</p>';
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.presentationStudio = new PresentationStudio();
});
