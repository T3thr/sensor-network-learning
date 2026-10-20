# scratch/gen_p5_8.py
# Pages 5 to 8 of OmniLedger (IEEE S&P 2018) translation

def get_page_5():
    return """
      <!-- ────────────────── หน้า 5 ────────────────── -->
      <article class="thai-page-article" data-page="5" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 5 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section IV.A: Randomness, Section IV.B: Epoch Transitions</span>
        </div>
        <h2 class="thai-section-heading">หน้า 5: ค่าสุ่ม RandHound, การคัดเลือกด้วย VRF และหน้าต่างเลื่อน (Section IV.A - IV.B)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 5 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>RandHound ผนวกกับ VRF:</strong> เพื่อกำจัดจุดอ่อนเรื่องผู้นำโปรโตคอล RandHound OmniLedger ได้นำฟังก์ชันสุ่มที่พิสูจน์ยืนยันได้ (Verifiable Random Function: VRF) มาใช้ในการเลือกผู้นำ โดยแต่ละโหนดจะคำนวณ Ticket ตั๋วสุ่มส่วนตัว $ticket_{i,e,v} = \text{VRF}_{sk_i}(\text{"leader"} \parallel config_e \parallel v)$ และโหนดที่มีค่า Ticket ต่ำสุดที่ถูกต้องจะได้รับสิทธิ์เป็นผู้นำของรอบนั้น</li>
            <li><strong>การกู้คืนผู้นำล้มเหลว (Fallback on Inactive Leader):</strong> หากผู้นำที่ได้รับเลือกไม่เริ่มรัน RandHound ภายในกรอบเวลา $\Delta$ โหนดอื่นๆ จะถือว่าผู้นำนั้นล้มเหลว ทำการปรับเลข View Counter ขึ้นเป็น $v+1$ และตัดสิทธิ์โหนดนั้นตลอดช่วงที่เหลือของ Epoch</li>
            <li><strong>การจัดสรรโหนดเข้าสู่ Shards:</strong> เมื่อ RandHound ทำงานสำเร็จและผู้นำกระจายค่าสุ่ม $rnd_e$ พร้อมหลักฐานความถูกต้อง โหนดผู้ตรวจสอบทั้ง $n$ โหนดจะนำ $rnd_e$ ไปสร้างการสลับลำดับ (Permutation) $\pi_e$ และแบ่งออกเป็น $m$ กลุ่มย่อยที่มีขนาดเท่าๆ กัน</li>
            <li><strong>การสลับโหนดแบบหน้าต่างเลื่อน (Sliding-Window Epoch Transition):</strong> แทนที่จะปลดโหนดออกและใส่ใหม่ 100% ทุกรอบ ซึ่งทำให้ระบบหยุดชะงัก OmniLedger เปลี่ยนโหนดเพียงสัดส่วนน้อย (เช่น $k$ โหนด หรือประมาณ 10% ถึง 20%) ทำให้โหนดเดิมส่วนใหญ่ยังคงทำหน้าที่ประมวลผลธุรกรรมได้อย่างต่อเนื่องโดยไม่ต้องหยุดระบบ</li>
            <li><strong>การกระจายธุรกรรมข้าม Shard (Cross-Shard Introduction):</strong> เกริ่นนำความจำเป็นของโปรโตคอล Atomix เนื่องจากธุรกรรมในโลกความจริงจะมี Inputs และ Outputs ที่กระจัดกระจายอยู่ต่าง Shard กันอย่างหลีกเลี่ยงไม่ได้</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 5)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>จุดเด่นของ VRF Ticket:</strong> อธิบายว่า VRF เป็นการสุ่มที่ &ldquo;ไม่มีใครโกงได้ และไม่มีใครแอบสุ่มล่วงหน้าได้&rdquo; เพราะต้องใช้ Private Key ของตนเองในการคำนวณ แต่เมื่อเปิดเผยออกมา ทุกคนสามารถตรวจสอบความถูกต้องได้ทันทีด้วย Public Key</li>
            <li><strong>ทำไมต้องใช้ Sliding Window:</strong> เปรียบเทียบกับการสับเปลี่ยนกำลังทหารหรือเวรยามที่ไม่เปลี่ยนคนพร้อมกันทั้งหน่วย เพื่อรักษาความต่อเนื่องในการเฝ้าระวังและการทำงาน</li>
            <li><strong>ข้อคิดเชิงสถิติ:</strong> การสลับโหนดเพียงบางส่วนยังคงรักษาความปลอดภัยไว้ได้ ตราบใดที่สัดส่วนผู้โจมตีในเครือข่ายรวมยังไม่เกินเกณฑ์ที่กำหนด</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: VRF-Based Leader Election -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การคัดเลือกผู้นำด้วยฟังก์ชันสุ่มที่พิสูจน์ยืนยันได้ (VRF-Based Leader Election)</span>
              <span class="unit-en-ref">Section IV.A · Page 587 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;At the beginning of an epoch e, each validator i computes a ticket ticket_{i,e,v} = VRF_{sk_i}(&ldquo;leader&rdquo; || config_e || v) where config_e is the configuration containing all properly registered validators of epoch e&hellip; Validators then gossip these tickets with each other for a time &Delta;, after which they lock in the lowest-value valid ticket they have seen thus far and accept the corresponding node as the leader&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              เมื่อเริ่มต้นรอบ Epoch $e$ ผู้ตรวจสอบแต่ละโหนด $i$ จะคำนวณตั๋วสุ่ม (Ticket) ของตนเองตามสมการ:<br>
              <div class="formula-display-box">
                ticket_{i,e,v} = VRF_{sk_i}(\text{&ldquo;leader&rdquo;} \parallel config_e \parallel v)
              </div>
              โดยที่ $config_e$ คือโครงสร้างการกำหนดค่าที่รวบรวมรายชื่อผู้ตรวจสอบทั้งหมดที่ลงทะเบียนอย่างถูกต้องใน Epoch $e$ (ตามที่บันทึกอยู่ใน Identity Blockchain) และ $v$ คือตัวนับรอบมุมมอง (View Counter) เริ่มต้นที่ 0<br><br>
              จากนั้นผู้ตรวจสอบจะกระจายตั๋วสุ่มเหล่านี้ผ่านเครือข่าย Gossip เป็นระยะเวลา $\Delta$ เมื่อครบกำหนดเวลา แต่ละโหนดจะเลือกล็อกตั๋วที่มีค่าน้อยที่สุดที่ถูกต้องเท่าที่ได้รับ และยอมรับโหนดเจ้าของตั๋วนั้นเป็นผู้นำ (Leader) สำหรับการรันโปรโตคอล RandHound หากโหนดผู้นำดังกล่าวไม่เริ่มรัน RandHound ภายในกรอบเวลา $\Delta$ ถัดไป ผู้ตรวจสอบทั้งหมดจะถือว่ารอบการทำงานปัจจุบันล้มเหลว และจะเพิกเฉยต่อโหนดผู้นำนี้ตลอดช่วงเวลาที่เหลือของ Epoch แม้ว่าจะกลับมาออนไลน์ในภายหลังก็ตาม ในกรณีนี้ ผู้ตรวจสอบจะเพิ่มเลขรอบมุมมองเป็น $v+1$ และทำการจับสลากเลือกผู้นำใหม่อีกครั้ง
            </div>
            <div class="engineering-annotation">
              <strong>ข้อพิสูจน์ความปลอดภัยของ VRF:</strong> ผู้เข้าร่วมแต่ละรายสามารถสร้างตั๋วที่ถูกต้องได้เพียงใบเดียวต่อหนึ่งรอบ $v$ เพราะคุณสมบัติ Deterministic Uniqueness ของ VRF ผู้โจมตีไม่สามารถคำนวณตั๋วหลายใบเพื่อเลือกใบที่ดีที่สุดได้ และไม่สามารถคาดเดาตั๋วของโหนดอื่นได้ล่วงหน้า
            </div>
          </div>

          <!-- Unit 2: Section IV.B Sliding Window -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การรักษาความต่อเนื่องในการทำงานด้วยการสลับโหนดแบบหน้าต่างเลื่อน (Section IV.B)</span>
              <span class="unit-en-ref">Section IV.B · Page 587 (Col. 2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;B. Maintaining Operability During Epoch Transitions&hellip; To eliminate this operational gap, we adapt a sliding-window mechanism from BFT consensus protocols [20] to OmniLedger. Instead of swapping all validators at the end of each epoch, we keep a fraction 1 - &rho; of the old validators and replace only a small fraction &rho; with new validators&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>การรักษาความต่อเนื่องในการทำงานระหว่างการเปลี่ยนผ่านรอบ Epoch:</strong><br>
              ในระบบ Sharding แบบดั้งเดิม การสลับผู้ตรวจสอบทั้งหมด 100% เมื่อสิ้นสุดรอบ Epoch ก่อให้เกิดภาวะ &ldquo;ช่องว่างในการปฏิบัติงาน&rdquo; (Operational Gap) กล่าวคือ ระบบต้องหยุดประมวลผลธุรกรรมชั่วคราวเพื่อรอให้โหนดใหม่ทั้งหมดเข้ามาแทนที่และดาวน์โหลดข้อมูลสถานะจนครบ<br><br>
              เพื่อกำจัดปัญหานี้ OmniLedger ได้นำกลไก <strong>หน้าต่างเลื่อน (Sliding-Window Reconfiguration)</strong> มาประยุกต์ใช้ โดยแทนที่จะสลับเปลี่ยนผู้ตรวจสอบทั้งหมดในคราวเดียว ระบบจะเก็บรักษาผู้ตรวจสอบเดิมไว้ในสัดส่วน $1 - \rho$ และทำการสลับเปลี่ยนเพียงสัดส่วนน้อย $\rho$ (เช่น 10% ถึง 20%) ด้วยผู้ตรวจสอบใหม่เท่านั้น<br><br>
              กลยุทธ์นี้ส่งผลดีทางวิศวกรรม 3 ประการ:
              <ol style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.8;">
                <li><strong>ระบบไม่เคยหยุดทำงาน (Zero Downtime):</strong> ผู้ตรวจสอบเดิมที่ยังคงอยู่ใน Shard สามารถดำเนินฉันทามติและประมวลผลธุรกรรมต่อไปได้ทันทีโดยไม่มีการหยุดชะงัก</li>
                <li><strong>ลดภาระแบนด์วิดท์เครือข่าย:</strong> มีเพียงโหนดใหม่ส่วนน้อยเท่านั้นที่ต้องดาวน์โหลดข้อมูลสถานะ ทำให้ไม่เกิดภาวะคอขวดของทราฟฟิกในเครือข่าย</li>
                <li><strong>ความคงทนต่อการปรับตัวของผู้โจมตี:</strong> ผู้โจมตีไม่สามารถคาดเดาได้ว่าโหนดใดจะถูกสลับออกในรอบถัดไป ทำให้ยากต่อการวางแผนเข้ายึด Shard</li>
              </ol>
            </div>
          </div>

        </div>
      </article>
    """

def get_page_6():
    return """
      <!-- ────────────────── หน้า 6 ────────────────── -->
      <article class="thai-page-article" data-page="6" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 6 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section IV.C: Cross-Shard Transactions &amp; Atomix Protocol</span>
        </div>
        <h2 class="thai-section-heading">หน้า 6: โปรโตคอลธุรกรรมข้าม Shard ปลอดภัย Atomix (Section IV.C &amp; Fig. 3)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 6 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ปัญหาการผูกมัดธุรกรรมข้าม Shard (Atomic Commit):</strong> เมื่อธุรกรรมมีการใช้เงินจาก Shard หนึ่งไปยังอีก Shard หนึ่ง ระบบต้องรับประกันว่าธุรกรรมจะ &ldquo;สำเร็จทั้งหมด&rdquo; หรือ &ldquo;ล้มเหลวทั้งหมด&rdquo; เท่านั้น ห้ามเกิดกรณีเงินถูกใช้ไปแล้วแต่ปลายทางไม่ได้รับ หรือเงินถูกล็อกค้างเติ่งในระบบตลอดกาล</li>
            <li><strong>จุดเด่นเชิงปรัชญาของ Atomix:</strong> แทนที่จะให้ Shards ต่างๆ ต้องส่งข้อความคุยกันข้ามเครือข่ายโดยตรง ซึ่งเพิ่มความซับซ้อนและเสี่ยงต่อปัญหาเครือข่าย Atomix ผลักภาระการขับเคลื่อนโปรโตคอลให้เป็นหน้าที่ของฝั่งไคลเอนต์ (Client-Driven Coordination) โดยใช้กลไกการล็อกและปลดล็อก (Lock-then-Unlock)</li>
            <li><strong>3 ขั้นตอนการทำงานของโปรโตคอล Atomix (Fig. 3):</strong>
              <ol style="margin: 4px 0 0 18px; padding: 0;">
                <li><em>1. Initialize:</em> ไคลเอนต์สร้างธุรกรรมข้าม Shard และส่งไปยัง Shard ต้นทาง (Input Shards: IS) ทั้งหมด</li>
                <li><em>2. Lock:</em> แต่ละ IS ตรวจสอบความถูกต้อง หากผ่านจะล็อก UTXO ไว้ในบล็อกและออกหลักฐาน Proof-of-Acceptance (PoA) พร้อมลายเซ็นรวม หากไม่ผ่านจะออก Proof-of-Rejection (PoR)</li>
                <li><em>3. Final Commit / Unlock:</em> หากได้รับ PoA จากทุก IS ไคลเอนต์จะส่ง PoA ไปยัง Shard ปลายทาง (Output Shards: OS) เพื่อสร้างเงินใหม่ และส่งกลับไป IS เพื่อยืนยันการตัดยอดเงินเดิม แต่หากมีแม้แต่ IS เดียวที่ออก PoR ไคลเอนต์จะนำ PoR ไปขอยกเลิกและปลดล็อกเงินคืนที่ IS ทั้งหมด</li>
              </ol>
            </li>
            <li><strong>การป้องกันการจ่ายเงินซ้ำ (Double-Spending Prevention):</strong> เมื่อ UTXO ถูกล็อกในขั้นตอน Lock แล้ว จะไม่สามารถถูกนำไปใช้ในธุรกรรมอื่นใดได้อีกจนกว่าจะได้รับ PoR ที่ผ่านการรับรองจากฉันทามติ</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 6)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>แผนภาพพระเอกของหน้า:</strong> ชี้ให้เห็นรูป Fig. 3 ไล่ลำดับตามลูกศร: Client &rarr; Input Shards (ขอ Lock) &rarr; Client ได้ PoA/PoR &rarr; Client &rarr; Output Shard (ขอสร้างเงิน) &amp; Input Shards (ขอ Unlock)</li>
            <li><strong>ทำไมต้องผลักภาระให้ Client:</strong> อธิบายว่าการให้ Client ทำหน้าที่ประสานงาน ช่วยรักษาความเรียบง่ายของ Shard ทำให้ Shard ไม่ต้องเปิด Connection ข้ามไปยัง Shard อื่นนับร้อยแห่ง</li>
            <li><strong>คำศัพท์ทางเทคนิคที่ต้องพูดให้ชัด:</strong> Proof-of-Acceptance (PoA), Proof-of-Rejection (PoR), Atomic Commit, UTXO Locking</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Section IV.C Atomix Protocol -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">โปรโตคอลธุรกรรมข้ามกลุ่มย่อยอย่างเป็นหน่วยเดียว (Section IV.C: Atomix)</span>
              <span class="unit-en-ref">Section IV.C · Page 588 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;C. Cross-Shard Transactions&hellip; The purpose is to ensure consistency of transactions between shards, to prevent double spending and to prevent unspent funds from being locked forever. In distributed computing, this problem is known as atomic commit [47]&hellip; Atomix improves the strawman approach with a lock-then-unlock process. We intentionally keep the shards&rsquo; logic simple and make any direct shard-to-shard communication unnecessary by tasking the client with the responsibility of driving the unlock process&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              วัตถุประสงค์หลักของโปรโตคอลธุรกรรมข้ามกลุ่มย่อยคือ การรับประกันความสอดคล้องของธุรกรรมระหว่าง Shards ต่างๆ ป้องกันการจ่ายเงินซ้ำซ้อน และป้องกันไม่ให้เงินที่ยังไม่ได้ใช้ต้องถูกล็อกค้างไว้ตลอดกาล ในทางวิทยาการคอมพิวเตอร์แบบกระจายตัว ปัญหานี้เรียกว่า &ldquo;การผูกมัดอย่างเป็นหน่วยเดียว&rdquo; (Atomic Commit)<br><br>
              การนำโปรโตคอล 2-Phase Commit ดั้งเดิมมาใช้งานในบล็อกเชนสร้างความซับซ้อนเกินจำเป็น OmniLedger จึงนำเสนอ <strong>Atomix</strong> ซึ่งใช้กระบวนการ &ldquo;ล็อกแล้วจึงปลดล็อก&rdquo; (Lock-then-Unlock) เราจงใจรักษาตรรกะการทำงานของ Shards แต่ละกลุ่มให้เรียบง่ายที่สุด และตัดความจำเป็นในการสื่อสารระหว่าง Shard โดยตรงทิ้งไป โดยมอบหมายให้ฝั่งไคลเอนต์เป็นผู้รับผิดชอบในการขับเคลื่อนกระบวนการปลดล็อก ในขณะเดียวกันก็อนุญาตให้ฝ่ายอื่นใดในระบบ (เช่น ผู้ตรวจสอบ หรือไคลเอนต์รายอื่น) สามารถเข้ามาทำหน้าที่แทนไคลเอนต์ได้ หากธุรกรรมนั้นเกิดการชะงักงัน
            </div>
          </div>

          <!-- Unit 2: Fig. 3 Sequence Diagram Deep Dive -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การวิเคราะห์แผนภาพลำดับ Fig. 3: ขั้นตอนการทำงานของโปรโตคอล Atomix (Sequence Flow)</span>
              <span class="unit-en-ref">Fig. 3 Analysis · Page 588</span>
            </div>
            <div class="thai-full-translation">
              <strong>การวิเคราะห์ 3 ขั้นตอนอย่างละเอียดตามแผนภาพ Fig. 3:</strong><br>
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85;">
                <li><strong>ขั้นตอนที่ 1: การเริ่มต้น (Initialize):</strong> ไคลเอนต์สร้างธุรกรรมข้าม Shard (Cross-TX) ซึ่งระบุว่าต้องการใช้เงินจาก Input Shards ($IS_1, IS_2$) เพื่อสร้างเงินใหม่ใน Output Shards ($OS_3$) ไคลเอนต์กระจายธุรกรรมนี้ผ่านเครือข่าย Gossip ไปยังกลุ่ม $IS$ ทั้งหมด</li>
                <li><strong>ขั้นตอนที่ 2: การล็อกเงินและสร้างหลักฐาน (Lock &amp; Proof Generation):</strong>
                  <ul style="margin: 4px 0 4px 18px; padding: 0;">
                    <li>แต่ละ Input Shard ตรวจสอบว่า UTXO ขาเข้ายังไม่ถูกใช้ และลายเซ็นของเจ้าของเงินถูกต้อง</li>
                    <li>หากถูกต้อง Shard จะบันทึกสถานะของ UTXO ว่า &ldquo;Locked&rdquo; ลงในบล็อก และออกหลักฐานการยอมรับ <strong>Proof-of-Acceptance (PoA)</strong> ซึ่งลงนามรับรองด้วยลายเซ็นรวมของ Shard</li>
                    <li>หากไม่ถูกต้อง (เช่น เงินถูกใช้ไปแล้ว) Shard จะออกหลักฐานการปฏิเสธ <strong>Proof-of-Rejection (PoR)</strong></li>
                  </ul>
                </li>
                <li><strong>ขั้นตอนที่ 3: การผูกมัดหรือยกเลิกขั้นสุดท้าย (Final Commit or Abort / Unlock):</strong>
                  <ul style="margin: 4px 0 4px 18px; padding: 0;">
                    <li><em>กรณีสำเร็จ (Commit):</em> หากไคลเอนต์ได้รับ PoA จากทุก Input Shard ครบถ้วน ไคลเอนต์จะส่ง PoA ทั้งหมดไปยัง Output Shard เพื่อสร้าง UTXO ก้อนใหม่ และส่งกลับไปยัง Input Shards เพื่อเปลี่ยนสถานะเงินเดิมจาก Locked เป็น &ldquo;Spent&rdquo; อย่างถาวร</li>
                    <li><em>กรณีล้มเหลว (Abort):</em> หากมีแม้แต่ Input Shard เดียวที่ออก PoR ไคลเอนต์จะนำ PoR นั้นไปส่งให้ Input Shards ทั้งหมด เพื่อเปลี่ยนสถานะเงินที่ถูกล็อกไว้กลับคืนสู่สถานะเดิม (&ldquo;Unspent&rdquo;) ทำให้เจ้าของเงินสามารถนำเงินไปใช้จ่ายใหม่ได้</li>
                  </ul>
                </li>
              </ol>
            </div>
            <div class="engineering-annotation">
              <strong>กฎความปลอดภัยที่ไม่มีวันถูกทำลาย (Safety Invariant):</strong> เนื่องจากแต่ละ Input Shard มีฉันทามติ BFT คุ้มครอง การออก PoA หรือ PoR จึงมีความถูกต้องแน่นอน 100% ตราบใดที่ Shard ซื่อสัตย์เกิน 2/3 จะไม่มีกรณีที่เงินถูกสร้างขึ้นที่ปลายทางโดยไม่ถูกหักออกจากต้นทางอย่างเด็ดขาด
            </div>
          </div>

        </div>
      </article>
    """

def get_page_7():
    return """
      <!-- ────────────────── หน้า 7 ────────────────── -->
      <article class="thai-page-article" data-page="7" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 7 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section IV.C: Fault Recovery, Section V.A-B: ByzCoinX &amp; Pipelining</span>
        </div>
        <h2 class="thai-section-heading">หน้า 7: การกู้คืนความล้มเหลวใน Atomix และฉันทามติ ByzCoinX (Section IV.C &amp; V.A-B)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 7 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>การฟื้นฟูเมื่อไคลเอนต์ขัดข้อง (Client Crash Recovery):</strong> หากไคลเอนต์ตัดการเชื่อมต่อหรือล้มเหลวหลังจากที่เงินถูกล็อกไว้แล้ว เงินจะไม่สูญหาย เนื่องจากหลักฐาน PoA และ PoR ถูกเผยแพร่ในเครือข่าย Gossip อยู่แล้ว ฝ่ายอื่นใดในระบบ เช่น ผู้รับเงิน (Recipient) หรือผู้ตรวจสอบ (Validator) สามารถเข้ามาสร้างธุรกรรม Unlock แทนไคลเอนต์ได้เพื่อรับค่าธรรมเนียมรางวัล</li>
            <li><strong>บทบาทของผู้ประสานงานสำรอง (Shard Coordinator):</strong> สามารถกำหนดให้ Shard ที่เก็บ UTXO มูลค่าต่ำสุดทำหน้าที่เป็นผู้ประสานงานสำรองในการสร้างธุรกรรม Unlock โดยต้องมี Validator จำนวน $f+1$ โหนดร่วมกันลงนามเพื่อป้องกันกรณีผู้นำ Shard มีพฤติกรรมทรยศ</li>
            <li><strong>ขนาดของธุรกรรม Unlock ที่กะทัดรัด:</strong> การใช้ลายเซ็นรวม CoSi ของ ByzCoinX ทำให้หลักฐาน PoA มีขนาดคงที่ ไม่บวมโตตามจำนวนโหนดใน Shard ช่วยประหยัดแบนด์วิดท์มหาศาล</li>
            <li><strong>ฉันทามติ ByzCoinX ที่ทนทานต่อ DoS (Section V.A):</strong> ปรับปรุงจาก ByzCoin เดิม โดยลดระดับต้นไม้ลงเหลือ 3 ระดับ มีระบบตรวจจับและข้ามโหนดผู้นำกลุ่มย่อยที่ไม่ส่งต่อข้อความ (Subtree Leader Fault Monitoring) และมีกลไกสลับสู่ Star Topology ทันทีเมื่อเกิดปัญหา</li>
            <li><strong>การทำ Pipelining บล็อกธุรกรรม (Section V.B):</strong> อนุญาตให้ Shard เสนอและประมวลผลบล็อกธุรกรรมใหม่คู่ขนานกันไปได้ทันที โดยไม่ต้องรอให้บล็อกก่อนหน้าเสร็จสมบูรณ์ 100%</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 7)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>คำถามชวนคิด:</strong> &ldquo;ถ้าไคลเอนต์ล็อกเงินไว้ แล้วแกล้งปิดเครื่องหนี เพื่อให้เงินในระบบติดล็อก เกิด Denial-of-Service ระบบจะแก้ปัญหานี้อย่างไร?&rdquo; (ตอบ: คนอื่นสามารถนำ PoA/PoR มาปลดล็อกแทนได้ทันที เพราะข้อมูลเปิดเผยบน Gossip)</li>
            <li><strong>จุดเด่น ByzCoinX:</strong> เน้นย้ำว่า ByzCoin เดิมพังง่ายถ้า Leader ในต้นไม้ CoSi โกง แต่ ByzCoinX แก้ด้วยการตรวจจับระดับสายงานย่อยและสลับโครงสร้างแบบอัตโนมัติ</li>
            <li><strong>ขนาดหลักฐาน:</strong> อธิบายว่า Collective Signature ทำให้ขนาด Proof สั้นลงจนบรรจุลงในธุรกรรมทั่วไปได้สบาย</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Section IV.C Handling Failures -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การจัดการกรณีความล้มเหลวและการโจมตีใน Atomix (Fault Tolerance)</span>
              <span class="unit-en-ref">Section IV.C · Page 589 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;A client who crashes indefinitely is equivalent to a client who loses his private key, which prevents him from spending the corresponding UTXOs. Furthermore, any entity in the system, for example a validator in exchange for a fee, can fill in for the client to create an unlock transaction, as all necessary information is gossiped. To ensure better robustness, we can also assign the shard of the smallest-valued input UTXO to be a coordinator&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              ในกรณีที่ไคลเอนต์เกิดความล้มเหลวและตัดการเชื่อมต่ออย่างถาวรในระหว่างกระบวนการ Atomix สภาพการณ์จะเทียบเท่ากับกรณีที่ไคลเอนต์ทำกุญแจส่วนตัวสูญหาย ซึ่งทำให้ไม่สามารถนำ UTXO ดังกล่าวไปใช้จ่ายได้ อย่างไรก็ตาม เนื่องจากข้อมูลธุรกรรมและหลักฐานทั้งหมดถูกกระจายผ่านระบบ Gossip อยู่แล้ว เอนทิตีอื่นใดในระบบ (เช่น ผู้ตรวจสอบที่ต้องการค่าธรรมเนียม หรือตัวผู้รับเงินเอง) จึงสามารถเข้ามาทำหน้าที่แทนไคลเอนต์ในการสร้างธุรกรรมปลดล็อก (Unlock Transaction) ได้อย่างสมบูรณ์<br><br>
              นอกจากนี้ เพื่อเพิ่มความแข็งแกร่งของระบบ เราสามารถมอบหมายให้ Shard ที่ถือครอง UTXO ขาเข้าที่มีมูลค่าน้อยที่สุดทำหน้าที่เป็น &ldquo;ผู้ประสานงาน&rdquo; (Coordinator) รับผิดชอบในการขับเคลื่อนการสร้างธุรกรรมปลดล็อก และเนื่องจากผู้นำของ Shard อาจเป็นผู้ประสงค์ร้าย ระบบจึงกำหนดให้ต้องมีผู้ตรวจสอบจำนวนอย่างน้อย $f+1$ โหนดร่วมกันส่งธุรกรรมปลดล็อก เพื่อรับประกันว่าธุรกรรมทั้งหมดจะได้รับการปลดล็อกในที่สุดอย่างแน่นอน
            </div>
          </div>

          <!-- Unit 2: Section V.A ByzCoinX -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">ฉันทามติ ByzCoinX ที่มีความคงทนสูงภายใต้สภาวะไบแซนไทน์ (Section V.A)</span>
              <span class="unit-en-ref">Section V.A · Page 589 (Col. 2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;V. DESIGN REFINEMENTS FOR PERFORMANCE&hellip; A. Fault Tolerance under Byzantine Faults: ByzCoinX. PBFT guarantees safety and liveness provided that at most f out of 3f+1 validators are malicious. ByzCoin [32] uses a four-level tree communication pattern to scale PBFT. However, if a node in the tree fails or misbehaves, the consensus stalls&hellip; ByzCoinX resolves this by limiting the tree height to three levels and monitoring leader performance&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>การปรับแต่งการออกแบบเพื่อประสิทธิภาพ (Section V):</strong><br>
              <strong>A. ความทนทานต่อความผิดพร่องภายใต้ผู้โจมตีไบแซนไทน์: ByzCoinX</strong><br>
              โปรโตคอล ByzCoin ดั้งเดิมใช้โครงสร้างต้นไม้ 4 ระดับเพื่อกระจายและรวบรวมลายเซ็น แต่หากโหนดผู้นำกลุ่มย่อยในโครงสร้างต้นไม้ล้มเหลวหรือจงใจทิ้งข้อความ ฉันทามติจะหยุดชะงักและต้องรอจนหมดเวลา (Timeout) ซ้ำแล้วซ้ำเล่า<br><br>
              ByzCoinX ได้รับการออกแบบใหม่เพื่อแก้ไขจุดอ่อนดังกล่าวโดย:<br>
              1. จำกัดความสูงของโครงสร้างต้นไม้ไว้ไม่เกิน 3 ระดับ<br>
              2. มีระบบติดตามประสิทธิภาพของผู้นำกลุ่มย่อย หากผู้นำกลุ่มย่อยไม่ตอบสนอง โหนดแม่จะส่งข้อความตรงไปยังโหนดลูกข่ายทันที (Fallback to Star Topology)<br>
              3. กำหนดอัตราส่วนหมดเวลา $T_1 = 0.1 T_2$ โดย $T_1$ เป็นเวลาที่ผู้นำ Shard พยายามส่งซ้ำไปยังโหนดที่ไม่ตอบสนอง และ $T_2$ เป็นเวลาที่สมาชิกใช้ตรวจจับความล้มเหลวของผู้นำเพื่อเปลี่ยนรอบมุมมอง (View-Change)
            </div>
          </div>

        </div>
      </article>
    """

def get_page_8():
    return """
      <!-- ────────────────── หน้า 8 ────────────────── -->
      <article class="thai-page-article" data-page="8" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 8 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section V.C: State Blocks, Section V.D: Trust-but-Verify</span>
        </div>
        <h2 class="thai-section-heading">หน้า 8: การตัดแต่งบัญชี State Blocks และระบบ Trust-but-Verify (Section V.C - V.D)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 8 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>การแก้ปัญหาพื้นที่จัดเก็บบวมโต (Ledger Pruning via State Blocks):</strong> เมื่อสิ้นสุดแต่ละ Epoch ผู้ตรวจสอบใน Shard จะรวบรวมรายการ UTXO ที่ยังใช้งานได้ทั้งหมดมาสร้างเป็น Merkle Tree แบบเรียงลำดับ แล้วนำ Root Hash ไปใส่ในส่วนหัวของ State Block ($sb_{j,e}$) และทำฉันทามติรับรองด้วยลายเซ็นรวม CoSi</li>
            <li><strong>การทิ้งประวัติเก่าอย่างปลอดภัย:</strong> เมื่อ State Block ของ Epoch $e$ ได้รับการรับรองแล้ว โหนดสามารถลบประวัติบล็อกธุรกรรมของ Epoch $e-1$ ทิ้งได้อย่างปลอดภัย โหนดผู้ตรวจสอบใหม่ที่เพิ่งย้ายเข้ามาใน Shard จึงดาวน์โหลดเพียง State Block ล่าสุดและพิสูจน์ยืนยันผ่าน Merkle Root ได้ทันที</li>
            <li><strong>การย้ายภาระการเก็บหลักฐาน (Proof-of-Existence):</strong> ความรับผิดชอบในการจัดเก็บหลักฐานการมีอยู่ของธุรกรรมเก่าถูกถ่ายโอนไปยังฝั่งไคลเอนต์ ไคลเอนต์ที่ต้องการพิสูจน์การจ่ายเงินในอดีตจะต้องเก็บรักษา Merkle Proof ของตนเอง</li>
            <li><strong>ระบบยืนยันเร็วแบบเชื่อมั่นแต่ตรวจทาน (Trust-but-Verify Validation):</strong> เพื่อรองรับธุรกรรมมูลค่าต่ำที่ต้องการความเร็วระดับเสี้ยววินาที OmniLedger ออกแบบระบบ 2 ระดับ:
              <ul style="margin: 4px 0 0 18px; padding: 0;">
                <li><em>ระดับที่ 1 (Optimistic Tier):</em> กลุ่มย่อยขนาดเล็กมากตรวจสอบธุรกรรมแบบมองโลกในแง่ดี ยืนยันผลให้ผู้ใช้ได้ใน <strong>1.38 วินาที</strong></li>
                <li><em>ระดับที่ 2 (Full BFT Tier):</em> เครือข่าย Shard หลักขนาดใหญ่ทำการตรวจสอบซ้ำในพื้นหลัง หากพบการทุจริต จะริบเงินประกันของกลุ่มแรกและชดเชยค่าเสียหาย</li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 8)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>แนวคิด Checkpoint:</strong> อธิบาย State Block ว่าทำหน้าที่เหมือนการกดเซฟเกม (Checkpoint) ทำให้ไม่ต้องเล่นใหม่ตั้งแต่ด่านแรก โหนดใหม่ไม่ต้องโหลดบล็อก 10 ปีที่แล้ว</li>
            <li><strong>การเปรียบเทียบในชีวิตจริงของ Trust-but-Verify:</strong> เหมือนการซื้อกาแฟที่ร้านยอมให้แตะบัตรผ่านไปก่อนได้ทันที แล้วค่อยเคลียร์ยอดบัญชีกับธนาคารทีหลัง เพราะความเสียหายหากเกิดเบี้ยวหนี้ต่ำกว่าค่าเสียโอกาสที่ลูกค้าต้องยืนรอ 10 นาที</li>
            <li><strong>ตัวเลขเด่น:</strong> 1.38 วินาที คือความเร็วระดับเดียวกับบัตรเครดิต Visa ในชีวิตประจำวัน</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Section V.C State Blocks -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การตัดแต่งขนาดบัญชีด้วยบล็อกสถานะที่ร่วมลงนาม (Section V.C: State Blocks)</span>
              <span class="unit-en-ref">Section V.C · Page 590 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;To reduce the storage and bootstrapping costs for validators (whose shard assignments might change periodically), we introduce state blocks that are similar to stable checkpoints in PBFT [13] and that summarize the entire state of a shard&rsquo;s ledger. To create a state block sb_{j,e} for shard j in epoch e, the shard&rsquo;s validators execute the following steps: At the end of e, the shard&rsquo;s leader stores the UTXOs in an ordered Merkle tree and puts the Merkle tree&rsquo;s root hash in the header of sb_{j,e}&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              เพื่อลดต้นทุนด้านพื้นที่จัดเก็บข้อมูลและลดเวลาในการเริ่มต้นระบบ (Bootstrapping) สำหรับผู้ตรวจสอบ (ซึ่งอาจต้องเปลี่ยนการสังกัด Shard เป็นระยะ) เราจึงได้นำเสนอ <strong>บล็อกสถานะ (State Blocks)</strong> ซึ่งมีลักษณะคล้ายกับ Checkpoint ที่เสถียรใน PBFT โดยทำหน้าที่สรุปสถานะทั้งหมดของบัญชีใน Shard นั้นๆ<br><br>
              ขั้นตอนการสร้าง State Block $sb_{j,e}$ สำหรับ Shard $j$ ใน Epoch $e$ มีดังนี้:
              <ol style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.8;">
                <li>เมื่อสิ้นสุด Epoch $e$ ผู้นำของ Shard จะนำรายการ UTXO ที่ยังไม่ถูกใช้ทั้งหมดมาจัดเก็บลงในโครงสร้างต้นไม้ Merkle Tree แบบเรียงลำดับ</li>
                <li>นำค่าแฮชราก (Root Hash) ของ Merkle Tree ไปใส่ไว้ในส่วนหัว (Header) ของ State Block $sb_{j,e}$</li>
                <li>ผู้ตรวจสอบใน Shard รันฉันทามติเพื่อตรวจสอบและร่วมลงนามรับรองส่วนหัวดังกล่าว</li>
                <li>เมื่อผ่านฉันทามติ ส่วนหัวนี้จะถูกบันทึกเป็น Genesis Block สำหรับ Epoch $e+1$ และทำให้สามารถลบเนื้อหาบล็อกธุรกรรมของ Epoch ก่อนหน้าทิ้งได้อย่างปลอดภัย</li>
              </ol>
            </div>
            <div class="engineering-annotation">
              <strong>ประโยชน์เชิงสถาปัตยกรรม:</strong> เปลี่ยนภาระการจัดเก็บข้อมูลจาก $O(T)$ (เติบโตตามจำนวนธุรกรรมทั้งหมดในประวัติศาสตร์) ให้เหลือเพียง $O(U)$ (เติบโตตามจำนวน UTXO ที่ยังใช้งานได้จริงในปัจจุบันเท่านั้น)
            </div>
          </div>

          <!-- Unit 2: Section V.D Trust-but-Verify Validation -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">สถาปัตยกรรมการตรวจสอบแบบเชื่อมั่นแต่ตรวจทาน (Section V.D: Trust-but-Verify)</span>
              <span class="unit-en-ref">Section V.D · Page 590 (Col. 2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;D. Optional Trust-but-Verify Validation&hellip; For applications such as point-of-sale payments, typical BFT consensus latencies of 10-15 seconds are too slow. We therefore propose an optimistic validation mechanism: a first small tier of validators processes transactions quickly (e.g., in 1-2 seconds) and then hands them over to a second, larger tier of validators that re-verifies transactions in the background&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              สำหรับแอปพลิเคชันอย่างการชำระเงิน ณ จุดขาย (Point-of-Sale) ความหน่วงของฉันทามติ BFT ทั่วไปที่ 10 ถึง 15 วินาทีนั้นช้าเกินไปสำหรับการใช้งานจริง เราจึงนำเสนอกลไกการตรวจสอบแบบมองโลกในแง่ดี (Optimistic Validation) ที่เรียกว่า <strong>เชื่อมั่นแต่ตรวจทาน (Trust-but-Verify)</strong><br><br>
              สถาปัตยกรรมประกอบด้วย 2 ระดับ:
              <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
                <li><strong>ระดับที่ 1 (Optimistic Tier):</strong> กลุ่มผู้ตรวจสอบขนาดเล็กที่ถูกสุ่มเลือก ทำหน้าที่ตรวจสอบและให้การรับรองเบื้องต้นอย่างรวดเร็วเป็นพิเศษ (ใช้เวลาเพียง 1.38 วินาที) เหมาะสำหรับธุรกรรมมูลค่าต่ำที่ต้องการความสะดวกรวดเร็ว</li>
                <li><strong>ระดับที่ 2 (Core BFT Tier):</strong> Shard หลักขนาดใหญ่จะนำธุรกรรมเหล่านั้นไปตรวจสอบความถูกต้องอย่างละเอียดอีกครั้งในเบื้องหลัง เพื่อสร้างการผูกมัดขั้นสุดท้ายที่สมบูรณ์แบบ (Finality)</li>
              </ul>
              หากกลุ่มระดับที่ 1 มีพฤติกรรมฉ้อฉลหรือปล่อยให้เกิดการจ่ายเงินซ้ำ เครือข่ายในระดับที่ 2 จะตรวจพบความผิดปกติได้ภายในไม่กี่นาที และจะดำเนินการลงโทษขั้นรุนแรงโดยการริบเงินมัดจำ (Security Deposit Slashing) ของผู้ตรวจสอบระดับที่ 1 และนำเงินดังกล่าวไปชดเชยความเสียหายให้แก่ผู้เสียหาย
            </div>
          </div>

        </div>
      </article>
    """
