# scratch/gen_p9_12.py
# Pages 9 to 12 of OmniLedger (IEEE S&P 2018) translation

def get_page_9():
    return """
      <!-- ────────────────── หน้า 9 ────────────────── -->
      <article class="thai-page-article" data-page="9" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 9 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section VI.A-B: Security Analysis &amp; Shard Failure Probability</span>
        </div>
        <h2 class="thai-section-heading">หน้า 9: การวิเคราะห์ความปลอดภัยทางคณิตศาสตร์ และข้อบกพร่องในสมการที่ (1)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 9 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>การคำนวณความปลอดภัยของ Shard ด้วย Hypergeometric Distribution:</strong> เพื่อป้องกันไม่ให้ Shard ใดถูกยึดอำนาจ (มีโหนดชั่วร้ายเกิน $1/3$) OmniLedger ใช้ทฤษฎีการสุ่มตัวอย่างแบบไม่ใส่คืนจากประชากรผู้ตรวจสอบทั้งหมด โดยคำนวณขนาด Shard ที่จำเป็นเพื่อให้โอกาสล้มเหลวต่ำกว่าเกณฑ์ความปลอดภัยระดับ $10^{-6}$ (หนึ่งในล้าน)</li>
            <li><strong>แผนภูมิ Fig. 5:</strong> แสดงขนาด Shard ที่ต้องการภายใต้สัดส่วนผู้โจมตีที่แตกต่างกัน หากผู้โจมตีมี 1% ใช้ Shard เพียง 4 โหนด, หากผู้โจมตีมี 12.5% ใช้ Shard ขนาด 70 โหนด, และหากผู้โจมตีมี 25% ต้องใช้ Shard ขนาดใหญ่ถึง 600 โหนด</li>
            <li><strong>จุดบกพร่องที่ตรวจพบจริงในสมการที่ (1) (Critical Equation Flaw):</strong> ในหน้า 9 ของเปเปอร์ต้นฉบับ สมการที่ (1) ซึ่งใช้คำนวณความน่าจะเป็นที่ Shard จะล้มเหลว มีข้อผิดพลาดร้ายแรงจากการพิมพ์ โดยระบุขอบบนของผลรวมเป็น $n$ และเริ่มจาก $k=0$ ส่งผลให้ตามทฤษฎีบททวินาม (Binomial Theorem) ผลรวมของความน่าจะเป็นนี้จะมีค่าเท่ากับ $(m + (1-m))^n = 1^n = 1$ เสมอตลอดกาล!</li>
            <li><strong>การแก้ไขสมการที่ถูกต้อง:</strong> ผลรวมของความล้มเหลวจะต้องเริ่มนับเฉพาะกรณีที่โหนดไม่ดีเกินเกณฑ์ไบแซนไทน์ คือเริ่มจาก $k = \lceil n/3 \rceil$ ไปจนถึง $n$</li>
            <li><strong>ความสับสนด้านสัญลักษณ์:</strong> สัญลักษณ์ $m$ ในสมการนี้ถูกนำมาใช้แทนสัดส่วนของฝ่ายตรงข้าม ($f/n$) ทั้งที่ในเนื้อหาหลักของเปเปอร์ $m$ ถูกใช้แทนจำนวน Shards ทั้งหมด อีกทั้งข้อความในหัวข้อ VI-B ยังเรียกรูปซ้ายและขวาของ Fig. 5 สลับกันกับคำบรรยายใต้รูป</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 9)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>หมัดเด็ดระดับเกียรตินิยม:</strong> ชี้ให้เห็นข้อผิดพลาดในสมการที่ (1) หน้า 9 ของเปเปอร์ IEEE S&amp;P 2018 แสดงให้เห็นว่าเราไม่ได้อ่านเพียงบทคัดย่อ แต่แกะสูตรคณิตศาสตร์อย่างถี่ถ้วนจนตรวจพบบั๊กของบทความระดับโลก</li>
            <li><strong>การพิสูจน์ข้อผิดพลาด:</strong> แสดงให้ดูว่า $\sum_{k=0}^n \binom{n}{k} m^k (1-m)^{n-k} = 1$ ตลอดเวลา ซึ่งเป็นสูตรผลรวมความน่าจะเป็นทั้งหมด ไม่ใช่ความน่าจะเป็นของความล้มเหลว</li>
            <li><strong>ข้อสรุปขนาด Shard:</strong> สรุปให้เห็นว่า หากต้องการความปลอดภัยระดับสากลที่ผู้โจมตี 25% ขนาด Shard ต้องไม่ต่ำกว่า 600 โหนด ซึ่งเป็นเหตุผลที่ทำให้ระบบต้องใช้โหนดรวมถึง 1,800 โหนดในการทดลอง</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Section VI.A & VI.B Shard-Size Security -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การวิเคราะห์ความมั่นคงปลอดภัยและการกำหนดขนาดกลุ่มย่อย (Section VI.A - VI.B)</span>
              <span class="unit-en-ref">Section VI.B · Page 591 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;VI. SECURITY ANALYSIS&hellip; B. Shard-Size Security&hellip; To calculate the failure rate of one shard, i.e., the probability that a shard is controlled by an adversary, we use the cumulative distributions over the shard size n, where X is the random variable that represents the number of times we pick a malicious node&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>การวิเคราะห์ความมั่นคงปลอดภัยและขนาดของ Shard:</strong><br>
              เพื่อคำนวณอัตราความล้มเหลวของ Shard หนึ่งกลุ่ม ซึ่งหมายถึงความน่าจะเป็นที่ Shard ดังกล่าวจะถูกควบคุมโดยฝ่ายตรงข้าม (มีโหนดประสงค์ร้ายมากกว่าหรือเท่ากับ $1/3$ ของสมาชิกในกลุ่ม) เราใช้การแจกแจงสะสมทางสถิติบนขนาดของ Shard $n$ โดยให้ $X$ เป็นตัวแปรสุ่มที่แทนจำนวนครั้งที่เราสุ่มเลือกได้โหนดประสงค์ร้าย<br><br>
              ในการคำนวณที่แม่นยำอย่างยิ่ง เมื่อประชากรผู้ตรวจสอบทั้งหมดมีขนาดจำกัด การสุ่มโหนดเข้าสู่ Shard โดยไม่ใส่คืนจะต้องเป็นไปตาม <strong>การแจกแจงแบบไฮเพอร์จีโอเมตริก (Hypergeometric Distribution)</strong> แต่เพื่อความสะดวกในการประมาณการ ผู้วิจัยได้ใช้การแจกแจงทวินาม (Binomial Distribution) เป็นขอบบนในการประเมิน
            </div>
          </div>

          <!-- Unit 2: Critical Flaw in Equation (1) -->
          <div class="trans-section-unit" style="border: 2px solid var(--red); background: var(--red-bg);">
            <div class="trans-unit-header">
              <span class="unit-title" style="color: var(--red); font-weight: 800;">จุดบกพร่องที่ตรวจพบจริง: ความผิดพลาดร้ายแรงของสมการที่ (1) ในหน้า 9</span>
              <span class="unit-en-ref" style="color: var(--red);">Equation (1) Audit · Page 591</span>
            </div>
            <div class="original-en-quote">
              &ldquo;P(X &ge; &lceil;n/3&rceil;) = &sum;_{k=0}^n \binom{n}{k} m^k (1 - m)^{n-k} &nbsp;&nbsp;&nbsp;&nbsp; (1)&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทวิเคราะห์ข้อผิดพลาดทางคณิตศาสตร์อย่างละเอียด:</strong><br>
              ในหน้า 591 ของบทความ สมการที่ (1) ถูกตีพิมพ์ไว้ตามรูปด้านบน ซึ่งมีข้อผิดพลาดร้ายแรงถึง 3 จุดที่ขัดต่อหลักการทางคณิตศาสตร์พื้นฐาน:
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85;">
                <li><strong>ขอบเขตของผลรวมผิดพลาด (Incorrect Summation Bounds):</strong> ฝั่งซ้ายของสมการระบุว่าต้องการหาความน่าจะเป็นที่ $X \ge \lceil n/3 \rceil$ แต่ฝั่งขวากลับระบุผลรวมเริ่มตั้งแต่ $k = 0$ ไปจนถึง $n$ ซึ่งตาม <strong>ทฤษฎีบททวินาม (Binomial Theorem)</strong>:
                  <div class="formula-display-box" style="background: var(--paper); border: 1.5px solid var(--red);">
                    \sum_{k=0}^{n} \binom{n}{k} m^k (1 - m)^{n - k} = (m + (1 - m))^n = 1^n = 1 &nbsp;&nbsp; \text{(เสมอ!)}
                  </div>
                  การเขียนเช่นนี้ทำให้ค่าความน่าจะเป็นที่คำนวณได้มีค่าเท่ากับ 1 เสมอตลอดกาล ไม่ว่าค่า $n$ หรือ $m$ จะเป็นเท่าใดก็ตาม!
                </li>
                <li><strong>สูตรที่ถูกต้องทางวิชาการ:</strong> หากต้องการคำนวณความน่าจะเป็นของความล้มเหลว (Failure Probability) ผลรวมจะต้องเริ่มจากเกณฑ์ที่ระบบล้มเหลว คือตั้งแต่ $k = \lceil n/3 \rceil$ ขึ้นไปจนถึง $n$:
                  <div class="formula-display-box" style="background: var(--paper); border: 1.5px solid var(--green);">
                    P_{\text{fail}} = P(X \ge \lceil n/3 \rceil) = \sum_{k = \lceil n/3 \rceil}^{n} \binom{n}{k} m^k (1 - m)^{n - k}
                  </div>
                  หรือหากต้องการคำนวณความน่าจะเป็นที่ปลอดภัย (โหนดชั่วร้ายไม่เกินเกณฑ์) ขอบบนจะต้องเป็น $\lfloor n/3 \rfloor$:
                  <div class="formula-display-box" style="background: var(--paper); border: 1.5px solid var(--green);">
                    P_{\text{safe}} = P(X \le \lfloor n/3 \rfloor) = \sum_{k = 0}^{\lfloor n/3 \rfloor} \binom{n}{k} m^k (1 - m)^{n - k}
                  </div>
                </li>
                <li><strong>ความสับสนเรื่องสัญลักษณ์และการอ้างอิงรูป:</strong> ผู้เขียนใช้ตัวแปร $m$ แทนสัดส่วนผู้โจมตี ทั้งที่ทั้งบทความใช้ $m$ แทนจำนวน Shards และในเนื้อความของหัวข้อ VI-B ย่อหน้าแรก ผู้เขียนกล่าวถึง &ldquo;Figure 5 (right) illustrates the proposed shard size&hellip;&rdquo; แต่ในความเป็นจริง รูปที่แสดงขนาด Shard คือรูปด้านซ้ายของ Fig. 5 ส่วนรูปด้านขวาคือความปลอดภัยของกลุ่ม Optimistic Validation ซึ่งเป็นการเรียกสลับด้านกันอย่างชัดเจน</li>
              </ol>
            </div>
            <div class="engineering-annotation" style="background: var(--paper); border-color: var(--red);">
              <strong>ข้อสรุปสำหรับการนำเสนอ:</strong> การตรวจพบบั๊กทางคณิตศาสตร์นี้ได้รับการยืนยันอย่างเป็นทางการในรายงานฉบับย่อและคอร์สวิชาการของนิสิต ชี้ชัดว่าเกิดจากความสะเพร่าในการตรวจทาน (Typographical Error) ของคณะผู้วิจัยก่อนส่งตีพิมพ์ใน IEEE S&amp;P 2018
            </div>
          </div>

        </div>
      </article>
    """

def get_page_10():
    return """
      <!-- ────────────────── หน้า 10 ────────────────── -->
      <article class="thai-page-article" data-page="10" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 10 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section VI.C-D, Section VII: Implementation, Section VIII.A: Table I</span>
        </div>
        <h2 class="thai-section-heading">หน้า 10: การทดลองบน DeterLab 1,800 โหนด และข้อจำกัดในตาราง Table I</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 10 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>สภาพแวดล้อมการทดสอบ DeterLab (Section VIII.A):</strong> ทดสอบบนเครื่องแม่ข่ายจริงจำนวน 60 เครื่อง แต่ละเครื่องติดตั้งซีพียู Intel Xeon E5-2420 v2, แรม 24 GB และการเชื่อมต่อเครือข่าย 10 Gbps โดยจำลองเป็นโหนดเสมือนจริง 1,800 โหนดทั่วโลก โดยจำกัดแบนด์วิดท์แต่ละโหนดไว้ที่ 20 Mbps และกำหนดความหน่วงของเครือข่ายทั่วโลกไว้ที่ 100 ms RTT ทุกลิงก์</li>
            <li><strong>ชุดข้อมูลธุรกรรมจริงจาก Bitcoin:</strong> นำข้อมูลธุรกรรมจริงจาก 10,000 บล็อกแรกของประวัติศาสตร์บล็อกเชน Bitcoin มาใช้ในการทดสอบสมรรถนะของระบบ</li>
            <li><strong>ผลการทดสอบความหน่วงตาราง Table I:</strong> เปรียบเทียบเวลาในการยืนยันธุรกรรมใน 4 กรณี $[s, f/n]$:
              <ul style="margin: 4px 0 0 18px; padding: 0;">
                <li>$[4, 1\%]$: Regular 1.38s | 1st Level 1.38s | 2nd Level 1.38s</li>
                <li>$[25, 5\%]$: Regular 5.99s | 1st Level 1.38s | 2nd Level 55.89s</li>
                <li>$[70, 12.5\%]$: Regular 8.04s | 1st Level 1.38s | 2nd Level 41.84s</li>
                <li>$[600, 25\%]$: Regular 14.52s | 1st Level 4.48s | <strong>2nd Level 62.96s</strong></li>
              </ul>
            </li>
            <li><strong>จุดบกพร่องที่ตรวจพบจริงใน Table I:</strong> ความหน่วง <strong>62.96 วินาที</strong> ในการยืนยันระดับที่สองที่ผู้โจมตี 25% ขัดแย้งกับข้อความในบทความหน้าที่ 11 ที่อ้างว่า &ldquo;การยืนยันขั้นสุดท้ายใช้เวลาต่ำกว่าหนึ่งนาที&rdquo; อย่างชัดเจน</li>
            <li><strong>ความไม่เสมอภาคด้านความปลอดภัย:</strong> การตั้งค่า $[4, 1\%]$ มีโอกาสที่ Shard จะล้มเหลวสูงถึง $5.9 \times 10^{-4}$ ซึ่งด้อยกว่าอีก 3 กรณีที่มีโอกาสล้มเหลวเพียง $2 \times 10^{-6}$ ถึงเกือบ 300 เท่า</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 10)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>ประเด็นจับโป๊ะ Table I:</strong> ชี้ให้เห็นตัวเลข 62.96 วินาที ในตาราง Table I และเทียบกับข้อความในหน้า 11 ที่บอกว่า &ldquo;less than one minute&rdquo; เป็นจุดที่คณะกรรมการจะชื่นชมในความช่างสังเกต</li>
            <li><strong>จุดแข็งของการทดลอง:</strong> เน้นย้ำว่าผู้เขียนไม่ได้แค่เขียนสมการ แต่สร้างระบบจริงด้วยภาษา Go และทดสอบบนโหนดเสมือน 1,800 โหนดด้วยข้อมูลธุรกรรมจริงจาก Bitcoin</li>
            <li><strong>ข้อจำกัดเครือข่ายจำลอง:</strong> สภาพแวดล้อม DeterLab กำหนดความหน่วงคงที่ 100 ms เท่ากันหมด ซึ่งไม่สะท้อนความผันผวนของอินเทอร์เน็ตจริงที่มี Packet Loss และ Jitter</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Section VII Implementation -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">รายละเอียดการพัฒนาต้นแบบจริงในภาษา Go (Section VII: Implementation)</span>
              <span class="unit-en-ref">Section VII · Page 592 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;VII. IMPLEMENTATION&hellip; We implemented a prototype of OmniLedger in Go. We based our cryptographic operations on the Kyber cryptographic library, which provides concrete implementations of the advanced cryptographic protocols we use, such as Ed25519, Schnorr multi-signatures, and the collective signing library Dissent&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              เราได้พัฒนาต้นแบบของระบบ OmniLedger ขึ้นจริงด้วยภาษา Go โดยโครงสร้างทางวิทยาการรหัสลับสร้างขึ้นบนไลบรารี Kyber ซึ่งมีกลไกทางคณิตศาสตร์ขั้นสูงรองรับเส้นโค้งรูปไข่ Ed25519, ระบบมัลติซิกเนเจอร์ของ Schnorr และไลบรารีการลงนามแบบกลุ่ม CoSi นอกจากนี้ยังพัฒนาโปรโตคอล RandHound สำหรับการสุ่มแบบแบ่งปันความลับ (PVSS) และโปรโตคอล ByzCoinX สำหรับการทำฉันทามติภายใน Shard
            </div>
          </div>

          <!-- Unit 2: Section VIII.A Experimental Testbed & Table I -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การทดลองบน DeterLab และการวิเคราะห์เจาะลึกตาราง Table I (Section VIII.A)</span>
              <span class="unit-en-ref">Section VIII.A &amp; Table I · Page 592 (Col. 2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;TABLE I: OmniLedger transaction confirmation latency in seconds for different configurations with respect to the shard size s, adversarial power f/n, and validation types.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลและวิเคราะห์ตารางผลการทดสอบ Table I:</strong><br>
              ตาราง Table I แสดงผลการวัดความหน่วงในการยืนยันธุรกรรม (Latency หน่วยเป็นวินาที) เปรียบเทียบระหว่างโหมดปกติ (Regular Validation) กับโหมดเชื่อมั่นแต่ตรวจทาน ซึ่งแบ่งเป็นระดับที่ 1 (1st Level) และระดับที่ 2 (2nd Level):
              <div style="overflow-x: auto; margin: 12px 0;">
                <table class="academic-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                  <thead>
                    <tr style="background: var(--paper2); border-bottom: 2px solid var(--rule);">
                      <th style="padding: 8px 12px; text-align: left;">การตั้งค่า [s, f/n]</th>
                      <th style="padding: 8px 12px; text-align: center;">[4, 1%]</th>
                      <th style="padding: 8px 12px; text-align: center;">[25, 5%]</th>
                      <th style="padding: 8px 12px; text-align: center;">[70, 12.5%]</th>
                      <th style="padding: 8px 12px; text-align: center; color: var(--red);">[600, 25%]</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 8px 12px;"><strong>การยืนยันแบบปกติ (Regular val.)</strong></td>
                      <td style="padding: 8px 12px; text-align: center;">1.38 s</td>
                      <td style="padding: 8px 12px; text-align: center;">5.99 s</td>
                      <td style="padding: 8px 12px; text-align: center;">8.04 s</td>
                      <td style="padding: 8px 12px; text-align: center;">14.52 s</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule); background: var(--paper);">
                      <td style="padding: 8px 12px;"><strong>การยืนยันระดับที่ 1 (1st lvl. val.)</strong></td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--green); font-weight: 700;">1.38 s</td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--green); font-weight: 700;">1.38 s</td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--green); font-weight: 700;">1.38 s</td>
                      <td style="padding: 8px 12px; text-align: center;">4.48 s</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 8px 12px;"><strong>การยืนยันระดับที่ 2 (2nd lvl. val.)</strong></td>
                      <td style="padding: 8px 12px; text-align: center;">1.38 s</td>
                      <td style="padding: 8px 12px; text-align: center;">55.89 s</td>
                      <td style="padding: 8px 12px; text-align: center;">41.84 s</td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--red); font-weight: 800;">62.96 s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="engineering-annotation">
              <strong>บทวิเคราะห์จุดบกพร่องและความขัดแย้งใน Table I:</strong>
              <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
                <li><strong>ข้อขัดแย้ง 62.96 วินาที:</strong> ในกรณีผู้โจมตี 25% ขนาด Shard ต้องขยายเป็น 600 โหนด ทำให้ความหน่วงของการตรวจสอบระดับที่สองพุ่งขึ้นไปถึง 62.96 วินาที ซึ่งเกินกว่าหนึ่งนาที แต่ในหน้า 593 ผู้เขียนกลับอ้างว่า &ldquo;the latency to guarantee finality is still less than one minute&rdquo; ซึ่งเป็นข้อความที่ขัดแย้งกับตัวเลขในตารางของตนเอง</li>
                <li><strong>ช่องโหว่ความปลอดภัยของการตั้งค่าแรก:</strong> การตั้งค่า $[4, 1\%]$ มีโอกาสที่ Shard จะพัง $P_{\text{fail}} \approx 5.9 \times 10^{-4}$ (เกือบหนึ่งในสองพัน) ขณะที่อีก 3 กรณีมีโอกาสพังเพียง $2 \times 10^{-6}$ (หนึ่งในห้าแสน) ดังนั้นแท่งทดสอบ $[4, 1\%]$ จึงไม่ได้อยู่บนมาตรฐานความปลอดภัยเดียวกันกับกรณีอื่น</li>
              </ul>
            </div>
          </div>

        </div>
      </article>
    """

def get_page_11():
    return """
      <!-- ────────────────── หน้า 11 ────────────────── -->
      <article class="thai-page-article" data-page="11" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 11 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section VIII.B: Table II Scale-Out, Section VIII.C-E</span>
        </div>
        <h2 class="thai-section-heading">หน้า 11: การขยายขนาดอัตราประมวลผล ตาราง Table II และต้นทุน Epoch (Section VIII)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 11 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ผลทดสอบการขยายขนาดในตาราง Table II:</strong> เมื่อกำหนดผู้โจมตี 12.5% และขนาด Shard 70 โหนด Throughput รวมของระบบจะเพิ่มขึ้นเกือบเป็นสัดส่วนเชิงเส้นตามจำนวน Shard:
              <ul style="margin: 4px 0 0 18px; padding: 0;">
                <li>1 Shard: 439 ถึง 463 TPS (เกณฑ์ตั้งต้น)</li>
                <li>2 Shards: 869 ถึง 911 TPS (อัตราเร่ง 1.97 เท่า)</li>
                <li>4 Shards: 1,674 ถึง 1,765 TPS (อัตราเร่ง 3.81 เท่า)</li>
                <li>8 Shards: 3,240 ถึง 3,467 TPS (อัตราเร่ง 7.49 เท่า)</li>
                <li>16 Shards: 5,850 ถึง 5,858 TPS (อัตราเร่ง 12.65 เท่า)</li>
              </ul>
            </li>
            <li><strong>สมรรถนะสูงสุดที่ 1,800 โหนด (Fig. 6):</strong> ในการทดลองเต็มรูปแบบ Throughput รวมของเครือข่ายพุ่งแตะระดับเกือบ 10,000 TPS ในสภาวะทั่วไป และสามารถดันขึ้นไปได้ถึง 13,000 TPS จนถึง 19,900 TPS เมื่อเพิ่มขนาดบล็อก</li>
            <li><strong>ต้นทุนมหาศาลของการเปลี่ยนรอบ Epoch (Fig. 7):</strong> โปรโตคอล RandHound กินเวลาคิดเป็นสัดส่วนสูงกว่า 70% ของเวลาการสลับรอบ Epoch ทั้งหมด ในสภาวะปกติกินเวลาประมาณ 10 ถึง 15 นาที แต่ในกรณีเลวร้ายที่สุดที่มีการขัดขวางอาจกินเวลานานถึง <strong>3 ชั่วโมง</strong>!</li>
            <li><strong>ข้อจำกัดด้านความยาวของ Epoch:</strong> ส่งผลให้ OmniLedger ไม่สามารถเปลี่ยน Epoch ถี่ๆ ได้ และต้องกำหนดให้แต่ละ Epoch มีความยาวระดับ 1 วัน ซึ่งเปิดช่องโหว่หากผู้โจมตีสามารถแทรกซึมและเปลี่ยนฝั่งได้อย่างรวดเร็ว (Fast Adaptive Adversaries)</li>
            <li><strong>ความหน่วงของธุรกรรมข้าม Shard ใน Atomix (Fig. 8):</strong> ธุรกรรมข้าม Shard มีความหน่วงสูงกว่าธุรกรรมภายใน Shard เดียวกันประมาณ 2 ถึง 3 เท่าเนื่องจากต้องผ่านขั้นตอนการล็อกและการปลดล็อกตามลำดับ</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 11)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>ตัวเลขชูโรง Table II:</strong> การขยายจาก 463 TPS สู่ระดับเฉียดหมื่น TPS เมื่อมี 28 Shards คือหลักฐานเชิงประจักษ์ว่า Sharding สามารถแก้ปัญหาคอขวดของบล็อกเชนได้จริง</li>
            <li><strong>ข้อสังเกตเชิงลึกสำหรับผู้เชี่ยวชาญ:</strong> ชี้ให้เห็นว่าการทดลองใน Table II เป็นกรณีที่ไม่มีธุรกรรมข้าม Shard หรือธุรกรรมอยู่ใน Shard เดียวกันเกือบหมด ซึ่งไม่สะท้อนโลกความเป็นจริงที่จะมีธุรกรรมข้าม Shard จำนวนมาก (เชื่อมโยงไปยัง Appendix C)</li>
            <li><strong>คอขวด RandHound:</strong> เวลา 3 ชั่วโมงในกรณีแย่สุดของ RandHound คือข้อจำกัดสำคัญที่สุดที่ผู้เขียนยอมรับ</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Table II Scale-Out Throughput -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การวิเคราะห์ผลการทดลองขยายขนาดเชิงเส้นในตาราง Table II</span>
              <span class="unit-en-ref">Section VIII.B &amp; Table II · Page 593 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;TABLE II: OmniLedger scale-out throughput in transactions per second (tps) for a adversarial power of f/n = 12.5% shard size of s = 70, and a varying number of shards m&hellip; As we can see, the throughput increases almost linearly in the number of shards.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลและวิเคราะห์ผลการทดสอบ Table II:</strong><br>
              ตาราง Table II แสดงผลการวัด Throughput (ธุรกรรมต่อวินาที: TPS) เมื่อเพิ่มจำนวน Shard $m$ ตั้งแต่ 1 ถึง 16 Shards โดยกำหนดให้สัดส่วนผู้โจมตีอยู่ที่ 12.5% และขนาดของ Shard อยู่ที่ 70 โหนด:
              <div style="overflow-x: auto; margin: 12px 0;">
                <table class="academic-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                  <thead>
                    <tr style="background: var(--paper2); border-bottom: 2px solid var(--rule);">
                      <th style="padding: 8px 12px; text-align: left;">จำนวน Shards (m)</th>
                      <th style="padding: 8px 12px; text-align: center;">1</th>
                      <th style="padding: 8px 12px; text-align: center;">2</th>
                      <th style="padding: 8px 12px; text-align: center;">4</th>
                      <th style="padding: 8px 12px; text-align: center;">8</th>
                      <th style="padding: 8px 12px; text-align: center;">16</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 8px 12px;"><strong>Throughput (tps)</strong></td>
                      <td style="padding: 8px 12px; text-align: center;">439 tps</td>
                      <td style="padding: 8px 12px; text-align: center;">869 tps</td>
                      <td style="padding: 8px 12px; text-align: center;">1,674 tps</td>
                      <td style="padding: 8px 12px; text-align: center;">3,240 tps</td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--accent); font-weight: 800;">5,850 tps</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule); background: var(--paper);">
                      <td style="padding: 8px 12px;"><strong>อัตราเร่งเทียบกับฐาน (Speed-Up)</strong></td>
                      <td style="padding: 8px 12px; text-align: center;">1.00x</td>
                      <td style="padding: 8px 12px; text-align: center;">1.98x</td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--accent); font-weight: 700;">3.81x</td>
                      <td style="padding: 8px 12px; text-align: center;">7.38x</td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--accent); font-weight: 800;">13.32x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="engineering-annotation">
              <strong>ข้อสังเกตสำคัญเชิงวิศวกรรม:</strong> อัตราเร่ง 3.81 เท่าที่ 4 Shards เกิดขึ้นจากการที่ธุรกรรมเกือบทั้งหมดเกิดขึ้นภายใน Shard เดียวกัน แต่ในความเป็นจริง เมื่อมีการกระจาย UTXO สุ่มตามแฮช อัตราเร่งที่แท้จริงจะลดลงฮวบเหลือเพียง 1.56 เท่า ตามที่ผู้วิจัยได้พิสูจน์ไว้ใน Appendix C
            </div>
          </div>

          <!-- Unit 2: Section VIII.C Epoch Transition Costs -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">ต้นทุนการเปลี่ยนผ่านรอบ Epoch และข้อจำกัดของ RandHound (Section VIII.C &amp; Fig. 7)</span>
              <span class="unit-en-ref">Section VIII.C · Page 593 (Col. 2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;C. Epoch-Transition Costs&hellip; We observe that RandHound takes more than 70% of the epoch transition time&hellip; In the worst-case scenario where an adversary delays the protocol by failing consecutive views, the epoch transition could take up to three hours.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              จากการวัดเวลาที่ใช้ในการเปลี่ยนผ่านรอบ Epoch (ดังแสดงใน Fig. 7) เราพบว่ากระบวนการ RandHound ใช้เวลาคิดเป็นสัดส่วนสูงกว่า 70% ของเวลาทั้งหมด โดยในสภาวะการทำงานปกติที่มีเครือข่ายเสถียร การรัน RandHound จนเสร็จสิ้นจะใช้เวลาราว 10 ถึง 15 นาที<br><br>
              อย่างไรก็ดี ในกรณีเลวร้ายที่สุดที่ฝ่ายตรงข้ามพยายามขัดขวางโปรโตคอลโดยจงใจไม่ส่งข้อความและทำให้การจับสลากเลือกผู้นำต้องล้มเหลวติดต่อกันหลายรอบ (Failed Views) การเปลี่ยนรอบ Epoch อาจต้องใช้เวลายาวนานถึง <strong>3 ชั่วโมง</strong> ด้วยเหตุนี้ ระบบ OmniLedger จึงต้องตั้งค่าความยาวของรอบ Epoch ให้ยาวนานพอ (เช่น 24 ชั่วโมงต่อหนึ่ง Epoch) เพื่อไม่ให้ต้นทุนของ RandHound กลายเป็นภาระที่มากเกินไปต่อ Throughput รวมของระบบ
            </div>
          </div>

        </div>
      </article>
    """

def get_page_12():
    return """
      <!-- ────────────────── หน้า 12 ────────────────── -->
      <article class="thai-page-article" data-page="12" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 12 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section VIII.E: ByzCoinX Benchmarks, Section VIII.F: State Blocks</span>
        </div>
        <h2 class="thai-section-heading">หน้า 12: สมรรถนะ ByzCoinX ตาราง Table III และการประหยัดพื้นที่ (Section VIII.E-F)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 12 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ผลการประเมิน ByzCoinX ตาราง Table III:</strong> วัดความหน่วงของฉันทามติภายใน Shard เมื่อปรับเปลี่ยนขนาดบล็อกข้อมูล (1 MB, 8 MB, 32 MB) และระดับการทำงานพร้อมกัน (Concurrency Level 1 ถึง 8 ขนาน):
              <ul style="margin: 4px 0 0 18px; padding: 0;">
                <li>บล็อกขนาด 1 MB: ความหน่วงลดลงจาก 15.4 วินาที (Concurrency 1) เหลือเพียง <strong>11.4 วินาที</strong> (Concurrency 8)</li>
                <li>บล็อกขนาด 8 MB: ความหน่วงลดลงจาก 32.2 วินาที เหลือ 23.2 วินาที</li>
                <li>บล็อกขนาด 32 MB: ความหน่วงลดลงจาก 61.6 วินาที เหลือ 50.9 วินาที</li>
              </ul>
            </li>
            <li><strong>การเปรียบเทียบรูปแบบการสื่อสาร (Fig. 10):</strong> เปรียบเทียบระหว่าง Tree Topology กับ Star Topology พบว่าโครงสร้างต้นไม้ 3 ระดับของ ByzCoinX สามารถรักษาความหน่วงให้อยู่ในระดับต่ำและคงที่ได้ดีกว่าอย่างมหาศาลเมื่อจำนวนโหนดใน Shard เพิ่มสูงขึ้นจนถึง 600 โหนด</li>
            <li><strong>การประหยัดแบนด์วิดท์ด้วย State Blocks (Fig. 11):</strong> ในระบบบล็อกเชนแบบเดิม โหนดใหม่ต้องใช้แบนด์วิดท์ดาวน์โหลดประวัติในอดีตทั้งหมดซึ่งเติบโตเป็นฟังก์ชันเชิงเส้น $O(T)$ ทะลุเกิน 10 GB แต่เมื่อใช้ State Blocks โหนดใหม่ดาวน์โหลดเพียงชุด UTXO ปัจจุบันและ Merkle Proofs เท่านั้น ลดการใช้แบนด์วิดท์ลงได้มากกว่า 80%</li>
            <li><strong>ประโยชน์สำหรับการ Bootstrapping:</strong> ช่วยให้โหนดผู้ตรวจสอบสามารถย้ายข้าม Shard ตามกลไกหน้าต่างเลื่อนได้อย่างรวดเร็วโดยไม่ต้องใช้เวลาโหลดข้อมูลหลายชั่วโมง</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 12)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>การอธิบาย Table III:</strong> ชี้ให้เห็นว่าการประมวลผลบล็อกแบบ Concurrency ขนานกัน ช่วยลดความหน่วงลงได้อย่างชัดเจนในทุกขนาดบล็อก</li>
            <li><strong>เปรียบเทียบ Tree vs Star (Fig. 10):</strong> อธิบายว่าถ้าใช้ Star โหนดผู้นำต้องคุยกับ 600 โหนดพร้อมกันจนเกิดคอขวดแบนด์วิดท์ แต่ Tree กระจายภาระงานออกเป็นทอดๆ ทำให้ระบบสเกลได้อย่างราบรื่น</li>
            <li><strong>การเชื่อมโยงกับ Sensor Networks:</strong> การตัดแต่งประวัติด้วย State Block มีความสำคัญอย่างยิ่งต่ออุปกรณ์ Sensor Gateway หรือ Fog Node ที่มีหน่วยความจำ Flash จำกัด</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Table III ByzCoinX Benchmarks -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การทดสอบสมรรถนะ ByzCoinX และการวิเคราะห์ตาราง Table III</span>
              <span class="unit-en-ref">Section VIII.E &amp; Table III · Page 594 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;TABLE III: ByzCoinX latency in seconds for different concurrency levels and data sizes&hellip; Fig. 9 shows ByzCoinX throughput in transactions per second for different levels of concurrency.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลและวิเคราะห์ตาราง Table III:</strong><br>
              ตาราง Table III บันทึกค่าความหน่วงของฉันทามติ ByzCoinX ในหน่วยวินาที ภายใต้ขนาดข้อมูลบล็อกและระดับการทำงานคู่ขนานที่แตกต่างกัน:
              <div style="overflow-x: auto; margin: 12px 0;">
                <table class="academic-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                  <thead>
                    <tr style="background: var(--paper2); border-bottom: 2px solid var(--rule);">
                      <th style="padding: 8px 12px; text-align: left;">ระดับ Concurrency / ขนาดบล็อก</th>
                      <th style="padding: 8px 12px; text-align: center;">1 (เรียงลำดับ)</th>
                      <th style="padding: 8px 12px; text-align: center;">2 ขนาน</th>
                      <th style="padding: 8px 12px; text-align: center;">4 ขนาน</th>
                      <th style="padding: 8px 12px; text-align: center; color: var(--accent); font-weight: 700;">8 ขนาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 8px 12px;"><strong>บล็อกขนาด 1 MB</strong></td>
                      <td style="padding: 8px 12px; text-align: center;">15.4 s</td>
                      <td style="padding: 8px 12px; text-align: center;">13.5 s</td>
                      <td style="padding: 8px 12px; text-align: center;">12.6 s</td>
                      <td style="padding: 8px 12px; text-align: center; color: var(--green); font-weight: 800;">11.4 s</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule); background: var(--paper);">
                      <td style="padding: 8px 12px;"><strong>บล็อกขนาด 8 MB</strong></td>
                      <td style="padding: 8px 12px; text-align: center;">32.2 s</td>
                      <td style="padding: 8px 12px; text-align: center;">27.7 s</td>
                      <td style="padding: 8px 12px; text-align: center;">26.0 s</td>
                      <td style="padding: 8px 12px; text-align: center;">23.2 s</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 8px 12px;"><strong>บล็อกขนาด 32 MB</strong></td>
                      <td style="padding: 8px 12px; text-align: center;">61.6 s</td>
                      <td style="padding: 8px 12px; text-align: center;">58.0 s</td>
                      <td style="padding: 8px 12px; text-align: center;">50.1 s</td>
                      <td style="padding: 8px 12px; text-align: center;">50.9 s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="engineering-annotation">
              <strong>การวิเคราะห์ผลลัพธ์:</strong> การเพิ่มระดับ Concurrency ช่วยให้ระบบใช้ประโยชน์จากแบนด์วิดท์เครือข่ายและพลังประมวลผลได้อย่างเต็มที่ โดยเฉพาะที่บล็อกขนาด 1 MB ความหน่วงลดลงถึง 26% (จาก 15.4 s เหลือ 11.4 s)
            </div>
          </div>

          <!-- Unit 2: Section VIII.F Bandwidth & State Blocks -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การประหยัดแบนด์วิดท์และพื้นที่จัดเก็บด้วย State Blocks (Section VIII.F &amp; Fig. 11)</span>
              <span class="unit-en-ref">Section VIII.F · Page 594 (Col. 2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;F. Bandwidth Costs for State Block Bootstrapping&hellip; Fig. 11 illustrates the bootstrap bandwidth consumption with state blocks compared to traditional blockchains. By storing only the latest state block, new validators reduce bandwidth overhead by more than 80%, keeping the ledger footprint bounded&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>ต้นทุนแบนด์วิดท์สำหรับการเริ่มระบบด้วย State Blocks:</strong><br>
              แผนภาพ Fig. 11 แสดงการเปรียบเทียบปริมาณการใช้แบนด์วิดท์ในการเริ่มต้นระบบ (Bootstrapping) ระหว่างบล็อกเชนแบบดั้งเดิมกับ OmniLedger ที่ใช้ State Blocks เมื่อประวัติบล็อกเชนสะสมธุรกรรมมากขึ้นเรื่อยๆ ในระบบทั่วไปโหนดใหม่จะต้องดาวน์โหลดประวัติทั้งหมด ส่งผลให้ปริมาณข้อมูลที่ต้องรับส่งเติบโตแบบเชิงเส้น $O(T)$ ทะลุเกินหลายสิบกิกะไบต์<br><br>
              ในทางกลับกัน OmniLedger กำหนดให้โหนดดาวน์โหลดเฉพาะ State Block ล่าสุดที่มีเพียงชุดของ UTXO ที่ยังใช้งานได้ ($O(U)$) ส่งผลให้การใช้แบนด์วิดท์ลดลงมากกว่า 80% และรักษาขนาดของข้อมูลที่ต้องดาวน์โหลดให้อยู่ในขอบเขตที่แน่นอน แม้ระบบจะเปิดดำเนินการมาเป็นเวลานานหลายปีก็ตาม
            </div>
          </div>

        </div>
      </article>
    """
