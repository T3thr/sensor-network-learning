# scratch/gen_p13_16.py
# Pages 13 to 16 of OmniLedger (IEEE S&P 2018) translation

def get_page_13():
    return """
      <!-- ────────────────── หน้า 13 ────────────────── -->
      <article class="thai-page-article" data-page="13" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 13 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section IX: Related Systems, Table IV, Section X: Limitations</span>
        </div>
        <h2 class="thai-section-heading">หน้า 13: ตารางเปรียบเทียบ 7 ระบบ Table IV และข้อจำกัดที่ยอมรับจริง (Section IX &amp; X)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 13 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ตารางเปรียบเทียบเชิงวิชาการ Table IV (Comparison of DL Systems):</strong> รวบรวมและเปรียบเทียบคุณสมบัติ 9 ด้านของ 7 ระบบบัญชีแบบกระจายศูนย์ชั้นนำ: Bitcoin, Elastico, RSCoin, Solidus, ByzCoin, Algorand และ OmniLedger ชี้ให้เห็นว่า OmniLedger เป็นระบบเดียวที่ตอบโจทย์ทั้ง Scale-Out, Cross-Shard Atomicity, State Blocks, Trust-but-Verify และความหน่วงต่ำ</li>
            <li><strong>จุดบกพร่องที่ตรวจพบจริงใน Table IV (Discrepancy in Table IV):</strong> ในช่อง Measured Scalability ของตาราง Table IV บทความระบุว่า OmniLedger ทดสอบการขยายขนาดได้ถึง <strong>2,400 ผู้ตรวจสอบ (Validators)</strong> ทั้งที่ในเนื้อหาการทดลองจริงของเปเปอร์ (Section VIII-A หน้า 10) ระบุอย่างชัดเจนว่าการทดลองบน DeterLab มีเครื่องกายภาพ 60 เครื่องและจำลองสูงสุดเพียง <strong>1,800 โหนด</strong> เท่านั้น!</li>
            <li><strong>4 ข้อจำกัดสำคัญที่ผู้วิจัยเปิดเผยอย่างตรงไปตรงมา (Section X):</strong>
              <ol style="margin: 4px 0 0 18px; padding: 0;">
                <li><em>1. ต้นทุนการเปลี่ยนรอบ Epoch สูง:</em> กระบวนการ RandHound อาจใช้เวลาถึง 3 ชั่วโมงในสภาวะที่มีการขัดขวาง ทำให้ต้องกำหนดรอบเวลาของ Epoch ไว้ยาวนานระดับ 1 วัน</li>
                <li><em>2. ความคงอยู่ของระบบพึ่งพาไคลเอนต์:</em> Atomix พึ่งพาให้ไคลเอนต์เป็นผู้ขับเคลื่อนโปรโตคอลปลดล็อก แม้ผู้อื่นจะทำแทนได้แต่ต้องอาศัยกลไกจูงใจ</li>
                <li><em>3. ธุรกรรมข้าม Shard เป็นคอขวด:</em> หากธุรกรรมส่วนใหญ่ต้องข้าม Shard อัตราเร่งของระบบจะลดลงอย่างมีนัยสำคัญ</li>
                <li><em>4. ขาดการวิเคราะห์ทฤษฎีเกม:</em> งานวิจัยเน้นความปลอดภัยเชิงระบบ แต่ยังไม่ได้สร้างแบบจำลองแรงจูงใจทางเศรษฐศาสตร์ (Incentive Compatibility)</li>
              </ol>
            </li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 13)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>ตารางสรุปมงกุฎแห่งชัยชนะ:</strong> ใช้ Table IV ในการสรุปผลการเปรียบเทียบ แสดงให้เห็นว่าระบบอื่นมีข้อจำกัดอย่างไร เช่น RSCoin เป็นระบบของธนาคารกลาง, Elastico พังภายในชั่วโมงเดียว, ByzCoin สเกลแนวนอนไม่ได้</li>
            <li><strong>การจับข้อขัดแย้ง 2,400 vs 1,800 โหนด:</strong> อธิบายให้นิ่งและสุขุมว่า ตาราง Table IV สรุปตัวเลขคาดการณ์ 2,400 โหนด แต่ผลการทดลองจริงในหัวข้อ VIII มีหลักฐานสูงสุดที่ 1,800 โหนด ถือเป็นจุดวิจารณ์เชิงวิชาการชั้นยอด</li>
            <li><strong>การนำเสนอข้อจำกัดอย่างมืออาชีพ:</strong> อย่านำเสนอเฉพาะข้อดี การพูดถึงข้อจำกัด 4 ข้อใน Section X จะทำให้อาจารย์เห็นว่าเราเข้าใจสัจธรรมของงานวิศวกรรมที่ทุกอย่างคือ Trade-off</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Table IV Comparative Matrix -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การวิเคราะห์ตารางเปรียบเทียบระบบบัญชีกระจายศูนย์ (Table IV: Comparison Matrix)</span>
              <span class="unit-en-ref">Section IX &amp; Table IV · Page 595</span>
            </div>
            <div class="original-en-quote">
              &ldquo;TABLE IV: Comparison of Distributed Ledger Systems. Systems compared: RSCoin, Elastico, Solidus, ByzCoin, Algorand, Bitcoin, OmniLedger across Scale-Out, Cross-Shard Atomicity, State Blocks, Trust-but-Verify, Measured Scalability, and Latency.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลและวิเคราะห์ตารางเปรียบเทียบ Table IV:</strong><br>
              ตาราง Table IV สรุปคุณสมบัติเปรียบเทียบระหว่างสถาปัตยกรรมบล็อกเชนชั้นนำของโลก:
              <div style="overflow-x: auto; margin: 12px 0;">
                <table class="academic-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
                  <thead>
                    <tr style="background: var(--paper2); border-bottom: 2px solid var(--rule);">
                      <th style="padding: 6px 8px; text-align: left;">ระบบ (System)</th>
                      <th style="padding: 6px 8px; text-align: center;">ไร้การอนุญาต (Permissionless)</th>
                      <th style="padding: 6px 8px; text-align: center;">ขยายขนาดแนวนอน (Scale-Out)</th>
                      <th style="padding: 6px 8px; text-align: center;">ธุรกรรมข้าม Shard (Cross-Shard)</th>
                      <th style="padding: 6px 8px; text-align: center;">บล็อกสถานะ (State Blocks)</th>
                      <th style="padding: 6px 8px; text-align: center;">ความหน่วง (Latency)</th>
                      <th style="padding: 6px 8px; text-align: center;">สเกลที่วัดได้จริง (# Validators)</th>
                      <th style="padding: 6px 8px; text-align: center;">เวลาเฉลี่ยก่อนพัง (Time to Fail)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 6px 8px;"><strong>Bitcoin [42]</strong></td>
                      <td style="padding: 6px 8px; text-align: center;">ใช่ (PoW)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่รองรับ</td>
                      <td style="padding: 6px 8px; text-align: center;">ไม่เกี่ยวข้อง</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่มี</td>
                      <td style="padding: 6px 8px; text-align: center;">10-60 นาที</td>
                      <td style="padding: 6px 8px; text-align: center;">หลายหมื่น</td>
                      <td style="padding: 6px 8px; text-align: center;">ไม่ล้มเหลว (ถ้า &lt; 50%)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule); background: var(--paper);">
                      <td style="padding: 6px 8px;"><strong>Elastico [34]</strong></td>
                      <td style="padding: 6px 8px; text-align: center;">ใช่ (PoW)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--green);">รองรับ</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่มี Atomicity</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่มี</td>
                      <td style="padding: 6px 8px; text-align: center;">~10 นาที</td>
                      <td style="padding: 6px 8px; text-align: center;">1,600</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red); font-weight: 700;">1 ชั่วโมง (พังเร็วมาก!)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 6px 8px;"><strong>RSCoin [16]</strong></td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่ใช่ (ธนาคารกลาง)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--green);">รองรับ</td>
                      <td style="padding: 6px 8px; text-align: center;">บางส่วน</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่มี</td>
                      <td style="padding: 6px 8px; text-align: center;">~1 วินาที</td>
                      <td style="padding: 6px 8px; text-align: center;">30</td>
                      <td style="padding: 6px 8px; text-align: center;">ไม่เกี่ยวข้อง</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule); background: var(--paper);">
                      <td style="padding: 6px 8px;"><strong>ByzCoin [32]</strong></td>
                      <td style="padding: 6px 8px; text-align: center;">ใช่ (PoW)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่รองรับ</td>
                      <td style="padding: 6px 8px; text-align: center;">ไม่เกี่ยวข้อง</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่มี</td>
                      <td style="padding: 6px 8px; text-align: center;">~15 วินาที</td>
                      <td style="padding: 6px 8px; text-align: center;">1,000</td>
                      <td style="padding: 6px 8px; text-align: center;">ไม่ล้มเหลว (ถ้า &lt; 33%)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--rule);">
                      <td style="padding: 6px 8px;"><strong>Algorand [25]</strong></td>
                      <td style="padding: 6px 8px; text-align: center;">ใช่ (PoS)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่รองรับ</td>
                      <td style="padding: 6px 8px; text-align: center;">ไม่เกี่ยวข้อง</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--red);">ไม่มี</td>
                      <td style="padding: 6px 8px; text-align: center;">~20 วินาที</td>
                      <td style="padding: 6px 8px; text-align: center;">500,000 (จำลอง)</td>
                      <td style="padding: 6px 8px; text-align: center;">ไม่ล้มเหลว (ถ้า &lt; 33%)</td>
                    </tr>
                    <tr style="border-bottom: 2px solid var(--accent); background: var(--accent2-bg);">
                      <td style="padding: 6px 8px; font-weight: 800; color: var(--accent2);"><strong>OmniLedger (งานนี้)</strong></td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--green); font-weight: 700;">ใช่ (PoW/PoS/PoP)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--green); font-weight: 700;">รองรับเชิงเส้น</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--green); font-weight: 700;">Atomix (สมบูรณ์)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--green); font-weight: 700;">มี (State Blocks)</td>
                      <td style="padding: 6px 8px; text-align: center; color: var(--green); font-weight: 700;">1.38s - 14s</td>
                      <td style="padding: 6px 8px; text-align: center; font-weight: 800; color: var(--ink);">2,400 (ขัดแย้ง!)</td>
                      <td style="padding: 6px 8px; text-align: center;">หลายร้อยปี (&gt;10^6 บล็อก)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="engineering-annotation">
              <strong>ข้อสังเกตจุดบกพร่องตัวเลข 2,400 โหนด:</strong> ในคอลัมน์ Measured Scalability ของ Table IV ระบุตัวเลขของ OmniLedger ว่า &ldquo;2400&rdquo; โหนด แต่ในเนื้อหาการทดลองจริงใน Section VIII-A ระบุไว้อย่างชัดแจ้งว่าระบบรันบนโหนดจำลอง DeterLab สูงสุดเพียง 1,800 โหนดเท่านั้น ตัวเลข 2,400 โหนดจึงเป็นเพียงการประมาณการ (Extrapolation) ไม่ใช่ตัวเลขที่วัดได้จริงในการทดลอง
            </div>
          </div>

          <!-- Unit 2: Section X Limitations -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">ข้อจำกัดและทิศทางการวิจัยในอนาคต (Section X: Limitations &amp; Future Work)</span>
              <span class="unit-en-ref">Section X · Page 595 (Col. 2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;X. LIMITATIONS AND FUTURE WORK&hellip; First, RandHound takes significant time to execute&hellip; Second, our atomic commit protocol Atomix relies on the client to ensure progress&hellip; Third, while OmniLedger achieves high throughput for transactions within shards, cross-shard transactions reduce throughput&hellip; Finally, we did not provide an economic analysis of validator incentives.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              แม้ OmniLedger จะประสบความสำเร็จในการแก้ปัญหาคอขวดของการขยายขนาด แต่ผู้วิจัยได้ระบุข้อจำกัดสำคัญ 4 ประการที่ต้องพัฒนาต่อยอดในอนาคต:
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85;">
                <li><strong>ต้นทุนของ RandHound ในการเปลี่ยนรอบ Epoch:</strong> การสุ่มค่าสาธารณะใช้เวลาค่อนข้างนาน และหากเผชิญกับโหนดไม่ดีที่จงใจขัดขวางอาจกินเวลานานถึง 3 ชั่วโมง ทำให้ระบบต้องตั้งค่าความยาว Epoch ไว้นาน และไม่สามารถปรับตัวรับมือกับผู้โจมตีที่เปลี่ยนยุทธวิธีอย่างรวดเร็วได้</li>
                <li><strong>การพึ่งพาไคลเอนต์ในโปรโตคอล Atomix:</strong> ความคงอยู่ (Liveness) ของธุรกรรมขึ้นอยู่กับว่าไคลเอนต์จะส่งธุรกรรมปลดล็อกหรือไม่ แม้จะมีกลไกให้ผู้อื่นทำแทนได้ แต่ในทางปฏิบัติจะต้องมีการออกแบบระบบค่าธรรมเนียมจูงใจที่รัดกุม</li>
                <li><strong>การสูญเสีย Throughput จากธุรกรรมข้าม Shard:</strong> เมื่อสัดส่วนของธุรกรรมข้าม Shard เพิ่มสูงขึ้น Throughput รวมของระบบจะลดลงอย่างหลีกเลี่ยงไม่ได้ เนื่องจากต้องรอการยืนยันหลายขั้นตอน (ซึ่งบทความได้วิเคราะห์คณิตศาสตร์เชิงลึกไว้ใน Appendix C)</li>
                <li><strong>การขาดการวิเคราะห์แรงจูงใจทางเศรษฐศาสตร์:</strong> บทความนี้เน้นหนักที่ความถูกต้องของระบบและความทนทานต่อความผิดพร่องตามทฤษฎีระบบกระจายตัว (Distributed Systems) แต่ยังไม่ได้สร้างแบบจำลองทางทฤษฎีเกม (Game Theory) เพื่อวิเคราะห์ว่า ผู้ตรวจสอบจะได้รับผลตอบแทนคุ้มค่าต่อการปฏิบัติตามกฎหรือไม่</li>
              </ol>
            </div>
          </div>

        </div>
      </article>
    """

def get_page_14():
    return """
      <!-- ────────────────── หน้า 14 ────────────────── -->
      <article class="thai-page-article" data-page="14" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 14 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">References [1] - [67]</span>
        </div>
        <h2 class="thai-section-heading">หน้า 14: คลังเอกสารอ้างอิงทางวิชาการระดับสากล 67 รายการ (References [1] - [67])</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 14 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>คลังเอกสารอ้างอิงระดับโลก 67 รายการ:</strong> รวบรวมเอกสารทางวิชาการระดับสากลที่ครอบคลุมรากฐานของวิทยาการเข้ารหัสลับ ระบบกระจายตัว และเทคโนโลยีบล็อกเชน จากเวทีการประชุมวิชาการระดับท็อปเทียร์ เช่น IEEE S&amp;P, ACM CCS, USENIX Security, OSDI, NSDI, SOSP, PODC</li>
            <li><strong>ผลงานอ้างอิงระดับรากฐานสำคัญ:</strong>
              <ul style="margin: 4px 0 0 18px; padding: 0;">
                <li><em>PBFT ต้นฉบับ [13]:</em> Castro &amp; Liskov (OSDI 1999) จุดกำเนิดฉันทามติไบแซนไทน์เชิงปฏิบัติต้นแบบของโลก</li>
                <li><em>Bitcoin [42]:</em> Satoshi Nakamoto (2008) บล็อกเชนไร้ศูนย์และฉันทามติ Proof-of-Work</li>
                <li><em>ByzCoin [32]:</em> Kokoris-Kogias et al. (USENIX Security 2016) การขยาย PBFT ด้วย Collective Signing (CoSi) [57]</li>
                <li><em>Elastico [34]:</em> Lu et al. (ACM CCS 2016) สถาปัตยกรรม Sharding บนบล็อกเชนไร้การอนุญาตระบบแรก</li>
                <li><em>Algorand [25]:</em> Gilad et al. (SOSP 2017) การนำ Verifiable Random Function (VRF) มาใช้จับสลากผู้ตรวจสอบ</li>
                <li><em>RandHound [56]:</em> Syta et al. (IEEE S&amp;P 2017) ระบบสร้างค่าสุ่มสาธารณะที่ต้านทานการบิดเบือนด้วย PVSS</li>
                <li><em>Google Spanner [15]:</em> Corbett et al. (OSDI 2012) ฐานข้อมูลกระจายตัวระดับโลกที่ใช้หลักการ Atomic Commit ข้ามชาร์ด</li>
              </ul>
            </li>
            <li><strong>สถิติผลกระทบทางวิชาการ:</strong> บทความ OmniLedger ได้รับการอ้างอิงทางวิชาการต่อใน IEEE Xplore และ Google Scholar มากกว่า 1,078 ครั้ง ถือเป็นเอกสารแม่บทที่บล็อกเชนยุคต่อมานำไปใช้อ้างอิง</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 14)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>แสดงความเป็นนักวิชาการ:</strong> การอ้างอิงเอกสาร [13] PBFT, [32] ByzCoin, [34] Elastico, [25] Algorand และ [42] Bitcoin จะช่วยสร้างความน่าเชื่อถือว่าเราเข้าใจสายธารประวัติศาสตร์การพัฒนาของบล็อกเชน</li>
            <li><strong>ความเชื่อมโยงของทีมผู้เขียน:</strong> คณะผู้วิจัยของ Bryan Ford ที่ EPFL เป็นผู้เขียนเปเปอร์หลักถึง 3 เรื่องในรายการอ้างอิงนี้: ByzCoin [32], RandHound [56] และ CoSi [57] OmniLedger จึงเป็นการนำผลงานวิจัยของห้องแล็บตนเองมารวมร่างกันอย่างสมบูรณ์แบบ</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Key References Directory -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">เอกสารอ้างอิงสำคัญระดับหมุดหมาย (Milestone Academic References)</span>
              <span class="unit-en-ref">References [1] - [67] · Pages 595-596</span>
            </div>
            <div class="thai-full-translation">
              <strong>รายการเอกสารอ้างอิงสำคัญที่กำหนดทิศทางของสถาปัตยกรรม OmniLedger:</strong>
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85; font-size: 0.88rem;">
                <li><strong>[13] M. Castro and B. Liskov, &ldquo;Practical Byzantine Fault Tolerance,&rdquo; in OSDI, 1999:</strong> ตำราและบทความมาตรฐานโลกที่เป็นจุดกำเนิดของอัลกอริทึม PBFT ทนทานต่อโหนดโกงได้สูงสุด $f &lt; n/3$</li>
                <li><strong>[15] J. C. Corbett et al., &ldquo;Spanner: Google&rsquo;s Globally Distributed Database,&rdquo; in OSDI, 2012:</strong> สถาปัตยกรรมฐานข้อมูลระดับโลกของ Google ที่เป็นต้นแบบแนวคิดเรื่อง 2-Phase Commit ข้ามชาร์ดและ TrueTime</li>
                <li><strong>[21] I. Eyal et al., &ldquo;Bitcoin-NG: A Scalable Blockchain Protocol,&rdquo; in NSDI, 2016:</strong> บล็อกเชนที่แยกการเลือกผู้นำ (Key Block) ออกจากการบรรจุธุรกรรม (Micro Block) ช่วยเพิ่มสปีดการประมวลผล</li>
                <li><strong>[25] Y. Gilad et al., &ldquo;Algorand: Scaling Byzantine Agreements for Cryptocurrencies,&rdquo; in SOSP, 2017:</strong> บล็อกเชน PoS ยุคใหม่ที่ใช้ Verifiable Random Function (VRF) ในการสุ่มเลือกคณะกรรมการตรวจสอบ</li>
                <li><strong>[32] E. Kokoris-Kogias et al., &ldquo;Enhancing Bitcoin Security and Performance with Strong Consistency via Collective Signing,&rdquo; in USENIX Security, 2016:</strong> ต้นกำเนิด ByzCoin ที่ใช้ Collective Signing บน PBFT</li>
                <li><strong>[34] L. Lu et al., &ldquo;A Secure Sharding Protocol For Open Blockchains,&rdquo; in ACM CCS, 2016:</strong> สถาปัตยกรรม Elastico ระบบ Sharding ยุคบุกเบิกที่ OmniLedger นำมาศึกษาข้อบกพร่องและแก้ไข</li>
                <li><strong>[42] S. Nakamoto, &ldquo;Bitcoin: A peer-to-peer electronic cash system,&rdquo; 2008:</strong> เอกสารไวท์เปเปอร์ตลิ้งประวัติศาสตร์ที่ให้กำเนิดบล็อกเชนและโมเดล UTXO</li>
                <li><strong>[45] J. Poon and T. Dryja, &ldquo;The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments,&rdquo; 2016:</strong> สถาปัตยกรรม Payment Channel นอกสาย (Layer 2)</li>
                <li><strong>[56] E. Syta et al., &ldquo;Scalable Bias-Resistant Distributed Randomness,&rdquo; in IEEE S&amp;P, 2017:</strong> สถาปัตยกรรม RandHound โปรโตคอลสุ่มค่าสาธารณะที่ใช้ใน OmniLedger</li>
                <li><strong>[57] E. Syta et al., &ldquo;Keeping Authorities &lsquo;Honest or Bust&rsquo; with Decentralized Witness Cosigning,&rdquo; in IEEE S&amp;P, 2016:</strong> สถาปัตยกรรม CoSi ลายเซ็นรวมแบบต้นไม้ 4 ระดับ</li>
              </ol>
            </div>
            <div class="engineering-annotation">
              <strong>การวิเคราะห์สายธารทางปัญญา:</strong> รายการอ้างอิงแสดงให้เห็นชัดเจนว่า OmniLedger เกิดจากการผสานงานวิจัยด้านระบบกระจายตัว (OSDI/SOSP) เข้ากับวิทยาการรหัสลับระดับสูง (IEEE S&amp;P/Crypto) โดยต่อยอดจาก ByzCoin [32] และ RandHound [56] ของทีมผู้ประพันธ์เอง
            </div>
          </div>

        </div>
      </article>
    """

def get_page_15():
    return """
      <!-- ────────────────── หน้า 15 ────────────────── -->
      <article class="thai-page-article" data-page="15" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 15 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Appendix A-B: Proofs &amp; RandHound, Appendix C: 1.56x Acceleration</span>
        </div>
        <h2 class="thai-section-heading">หน้า 15: ภาคผนวก A-C บทพิสูจน์ความปลอดภัย และการลดลงของอัตราเร่งเหลือ 1.56 เท่า</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 15 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ภาคผนวก Appendix A: บทพิสูจน์ความปลอดภัยและความคงอยู่ (Safety &amp; Liveness):</strong> พิสูจน์ว่าตราบใดที่สัดส่วนผู้โจมตีในเครือข่ายรวมไม่เกินเกณฑ์ โอกาสที่ Shard ใดจะมีโหนดไม่ดีเกิน $1/3$ จะถูกจำกัดไว้ต่ำกว่า $\epsilon$ และเครือข่ายจะสามารถทำฉันทามติต่อไปได้โดยไม่ติดขัด</li>
            <li><strong>กลไกต้านทานการเซ็นเซอร์ธุรกรรม (Fig. 12 Anti-Censorship):</strong> บังคับให้ผู้ตรวจสอบทุกคนเสนอธุรกรรมแบบปิดบังเนื้อหา (Blinded Transactions) ในรอบฉันทามติ ทำให้ผู้นำ Shard ไม่สามารถเลือกปฏิบัติหรือจงใจเซ็นเซอร์ธุรกรรมของผู้ใช้ได้</li>
            <li><strong>ภาคผนวก Appendix B: กลไก RandHound และวาล์วนิรภัย (Safety Valve):</strong> หากกระบวนการ RandHound ล้มเหลวติดต่อกัน 5 รอบ (ซึ่งมีโอกาสเกิดขึ้นต่ำกว่า 1%) ระบบจะตัดการทำงานเข้าสู่วาล์วนิรภัยโดยเปลี่ยนไปใช้โปรโตคอล Asynchronous Coin-Tossing แบบ $O(n^3)$ ทันทีเพื่อรักษาความปลอดภัยขั้นสูงสุด</li>
            <li><strong>ภาคผนวก Appendix C: การวิเคราะห์ธุรกรรมข้าม Shard ในโลกความจริง:</strong> การกระจาย UTXO สุ่มตามแฮชทำให้สมมติฐานที่ว่าธุรกรรมส่วนใหญ่เป็นธุรกรรมภายใน Shard เดียวกันพังทลายลง เพราะธุรกรรมทั่วไปส่วนใหญ่จะต้องข้าม Shard!</li>
            <li><strong>จุดบกพร่องที่ตรวจพบจริงในสมการที่ (3) และอัตราเร่ง 1.56 เท่า:</strong>
              <ul style="margin: 4px 0 0 18px; padding: 0;">
                <li><em>ข้อผิดพลาดในสมการที่ (3):</em> ผู้เขียนพิมพ์สัมประสิทธิ์ผิดเป็น $(m-k)/m$ ทั้งที่ค่าที่ถูกต้องตามหลักความน่าจะเป็นคือ <strong>$(m-k+1)/m$</strong> ทำให้ผลรวมความน่าจะเป็นไม่เท่ากับ 1</li>
                <li><em>ความขัดแย้งตัวเลข 3.7%:</em> ค่าความน่าจะเป็น $P(3, 1, 3)$ ที่พิมพ์ว่า 3.7% แท้จริงแล้วควรเป็น <strong>11.1%</strong> (3.7% ตรงกับกรณีมี 4 UTXOs)</li>
                <li><em>การทรุดตัวของอัตราเร่งเหลือ 1.56 เท่า:</em> เมื่อกระจาย UTXO ตามจริง อัตราเร่งของระบบจาก 1 Shard ไป 4 Shards จะลดลงฮวบจาก <strong>3.81 เท่า</strong> (ใน Table II) เหลือเพียง <strong>1.56 เท่า</strong> (หรือหากคำนวณแบบนับภาระงานรวม $m/E[k]$ จะเหลือเพียง <strong>1.46 ถึง 1.73 เท่า</strong> ตามอสมการของ Jensen!)</li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 15)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>หมัดน็อกปิดการนำเสนอ:</strong> ชี้ให้เห็นว่าในบทนำ ผู้เขียนอ้าง Throughput อัตราเร่ง 3.81x ใน Table II แต่ใน Appendix C หน้า 15 ผู้เขียนกลับยอมรับเองว่าในโลกความเป็นจริง อัตราเร่งจะเหลือเพียง 1.56x เท่านั้น เพราะธุรกรรมส่วนใหญ่ต้องข้าม Shard!</li>
            <li><strong>การเฉลยบั๊กสมการที่ (3):</strong> อธิบายสั้นๆ ว่าสัมประสิทธิ์ต้องเป็น $(m-k+1)/m$ เพราะเมื่อเลือกได้ Shard เดิมมาแล้ว $k-1$ กลุ่ม โอกาสที่จะสุ่มได้ Shard ใหม่คือ $(m - (k-1))/m = (m - k + 1)/m$</li>
            <li><strong>บทเรียนทางวิศวกรรม:</strong> Sharding มีต้นทุนแฝงมหาศาลในการประสานงานข้าม Shard (Cross-shard Coordination Overhead)</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Appendix C & Cross-Shard Latency -->
          <div class="trans-section-unit" style="border: 2px solid var(--accent); background: var(--paper);">
            <div class="trans-unit-header">
              <span class="unit-title" style="color: var(--accent); font-weight: 800;">ภาคผนวก Appendix C: การวิเคราะห์ความน่าจะเป็นของธุรกรรมข้าม Shard และการลดลงของอัตราเร่ง</span>
              <span class="unit-en-ref">Appendix C · Page 597 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;APPENDIX C: PROBABILITY OF CROSS-SHARD TRANSACTIONS&hellip; When splitting the state into disjoint parts, the common practice is to assign UTXOs to shards, based on the first bits of their hash&hellip; For a typical transaction with two inputs and one output and a three-shard setup, the probability of a transaction being intra-shard is P(3, 1, 3) = 3.7%&hellip; As a result if all transactions had this format the expected speed-up from an 1-shard to a 4-shard configuration would be 4 * (0.015 + 0.328/2 + 0.56/3 + 0.09/4) = 1.56&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลและวิเคราะห์เจาะลึกภาคผนวก C:</strong><br>
              ในภาคผนวก C ผู้วิจัยได้ทำการวิเคราะห์ทางคณิตศาสตร์อย่างซื่อสัตย์ถึงข้อจำกัดที่ธุรกรรมข้าม Shard ส่งผลกระทบต่อสมรรถนะของระบบ เมื่อเราแบ่งสถานะของระบบออกเป็นส่วนๆ แนวทางปฏิบัติทั่วไปคือการจัดสรร UTXO เข้าสู่ Shards ตามบิตแรกของค่าแฮช<br><br>
              สำหรับธุรกรรมภายใน Shard เดียวกัน เราจำเป็นต้องให้ทั้ง Inputs และ Outputs ทั้งหมดตกอยู่ใน Shard เดียวกัน แต่ความน่าจะเป็นที่ UTXO จะถูกสุ่มลง Shard ใด Shard หนึ่งมีลักษณะเป็นการสุ่มแบบเอกรูป (Uniformly Random) ตามคุณสมบัติของฟังก์ชันแฮชทางวิทยาการรหัสลับ กำหนดให้ $m$ คือจำนวน Shards ทั้งหมด, $n$ คือผลรวมของ Inputs และ Outputs ในธุรกรรม และ $k$ คือจำนวน Shards ที่ต้องเข้ามาเกี่ยวข้องในการตรวจสอบธุรกรรมข้าม Shard ดังกล่าว
            </div>
          </div>

          <!-- Unit 2: Critical Audit of Equation (3) & 1.56x Collapse -->
          <div class="trans-section-unit" style="border: 2px solid var(--red); background: var(--red-bg);">
            <div class="trans-unit-header">
              <span class="unit-title" style="color: var(--red); font-weight: 800;">จุดบกพร่องที่ตรวจพบจริง: ข้อผิดพลาดในสมการเวียนเกิดที่ (3) และการทรุดตัวของอัตราเร่งสู่ 1.56 เท่า</span>
              <span class="unit-en-ref" style="color: var(--red);">Equation (3) Audit · Page 597</span>
            </div>
            <div class="original-en-quote">
              &ldquo;P(n, k, m) = \frac{m-k}{m} P(n-1, k-1, m) + \frac{k}{m} P(n-1, k, m) &nbsp;&nbsp;&nbsp;&nbsp; (3)&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทวิเคราะห์ข้อผิดพลาดทางคณิตศาสตร์ในสมการที่ (3):</strong><br>
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85;">
                <li><strong>สัมประสิทธิ์ในสมการเวียนเกิดผิดพลาด:</strong> ในเปเปอร์ต้นฉบับ พจน์แรกของสมการที่ (3) พิมพ์เป็น $\frac{m-k}{m}$ ซึ่งผิดพลาดอย่างชัดเจน เพราะในการเลือก UTXO ตัวที่ $n$ หากในขั้นตอนก่อนหน้าเลือก Shard ไปแล้ว $k-1$ กลุ่ม จำนวน Shard ใหม่ที่ยังไม่เคยถูกเลือกจะเหลืออยู่ $m - (k - 1) = m - k + 1$ กลุ่ม ดังนั้น สัมประสิทธิ์ที่ถูกต้องตามหลักทฤษฎีความน่าจะเป็นต้องเป็น:
                  <div class="formula-display-box" style="background: var(--paper); border: 1.5px solid var(--green);">
                    P(n, k, m) = \frac{m - k + 1}{m} P(n - 1, k - 1, m) + \frac{k}{m} P(n - 1, k, m)
                  </div>
                  หากใช้สูตรเดิมของผู้เขียน ผลรวมความน่าจะเป็น $\sum_{k=1}^m P(n, k, m)$ จะมีค่า <strong>ไม่เท่ากับ 1</strong>!
                </li>
                <li><strong>ความคลาดเคลื่อนของค่า 3.7%:</strong> ผู้เขียนระบุว่าสำหรับธุรกรรมที่มี 2 Inputs และ 1 Output ($n=3$) บนระบบ 3 Shards ($m=3$) ความน่าจะเป็นที่จะเป็น Intra-shard คือ $P(3, 1, 3) = 3.7\%$ แต่ตามหลักความน่าจะเป็นที่ถูกต้อง:
                  $$P(3, 1, 3) = 1 \times \frac{1}{3} \times \frac{1}{3} = \frac{1}{9} \approx 11.1\%$$
                  ตัวเลข 3.7% แท้จริงแล้วตรงกับกรณีที่มี 4 UTXOs ($n=4$) คือ $(1/3)^3 = 1/27 \approx 3.7\%$ ซึ่งเป็นข้อผิดพลาดในการคำนวณของผู้เขียนบทความ
                </li>
                <li><strong>การทรุดตัวของอัตราเร่งสู่ 1.56 เท่า (Speed-up Collapse):</strong> ใน Table II ผู้เขียนอ้างว่าเมื่อขยายเป็น 4 Shards Throughput จะเพิ่มขึ้น <strong>3.81 เท่า</strong> แต่เมื่อนำสัดส่วนธุรกรรมข้าม Shard ตามจริงมาคำนวณ อัตราเร่งที่แท้จริงจะเหลือเพียง <strong>1.56 เท่า</strong> เท่านั้น:
                  $$\text{Speed-Up} = 4 \times \left(0.015 + \frac{0.328}{2} + \frac{0.56}{3} + \frac{0.09}{4}\right) \approx 1.56\text{ เท่า}$$
                  และหากคำนวณซ้ำแบบนับภาระงานรวมต่อธุรกรรมจริง ($m / E[k]$) จะได้เพียง <strong>1.46 ถึง 1.73 เท่า</strong> เท่านั้น เนื่องจากสูตรของผู้เขียนเฉลี่ยค่า $1/k$ ซึ่งให้ค่าสูงกว่าค่าจริงเสมอตาม <strong>อสมการของเจนเซน (Jensen&rsquo;s Inequality)</strong>!
                </li>
              </ol>
            </div>
            <div class="engineering-annotation" style="background: var(--paper); border-color: var(--red);">
              <strong>ข้อสรุปเชิงวิจารณ์:</strong> นี่คือหลักฐานเชิงประจักษ์ว่า OmniLedger ในเปเปอร์นำเสนอตัวเลข Throughput ในสภาวะในอุดมคติ (Ideal Case) แต่เมื่อเผชิญกับรูปแบบธุรกรรมในโลกความจริง สมรรถนะการขยายขนาดจะลดลงมากกว่าครึ่งหนึ่งเนื่องจากภาระของ Atomix
            </div>
          </div>

        </div>
      </article>
    """

def get_page_16():
    return """
      <!-- ────────────────── หน้า 16 ────────────────── -->
      <article class="thai-page-article" data-page="16" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 16 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Appendix C (Cont.), Appendix D: Stateful Objects &amp; Synthesis</span>
        </div>
        <h2 class="thai-section-heading">หน้า 16: การล็อกสถานะใน Smart Contracts และบทสังเคราะห์ทางวิศวกรรม (Appendix D)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 16 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ภาคผนวก Appendix D: การประยุกต์ Atomix กับ Smart Contracts (State-Full Objects):</strong> การขยายผลโปรโตคอล Atomix จากระบบบัญชี UTXO ธรรมดาไปสู่ระบบสัญญาอัจฉริยะ (Smart Contracts) ที่มีสถานะเปลี่ยนแปลงได้ (Mutable State) และสามารถถูกเข้าถึงพร้อมกันจากหลายฝ่าย</li>
            <li><strong>การล็อกแบบเข้มงวด (Pessimistic Locking Mechanism: Fig. 14):</strong> วัตถุสถานะใน Smart Contract จะต้องถูกล็อก (Lock) สำหรับธุรกรรม $T$ โดยเฉพาะ และจะปฏิเสธธุรกรรม $T'$ อื่นๆ ที่พยายามเข้าถึงวัตถุเดียวกันในเวลาเดียวกัน จนกว่าธุรกรรม $T$ จะทำ Commit บันทึกสถานะใหม่ $S'$ หรือทำ Abort ปลดล็อกคืนสถานะเดิม $S$</li>
            <li><strong>การปรับปรุงอัลกอริทึม Atomix 2 จุด:</strong>
              <ol style="margin: 4px 0 0 18px; padding: 0;">
                <li>ต้องส่งธุรกรรม Unlock ไปยังทั้ง Input Shards และ Output Shards พร้อมกัน</li>
                <li>เครื่องสถานะต้องเพิ่มสถานะรอการยืนยัน (Confirmation State) ก่อนทำการปลดล็อก เพื่อป้องกันการละเมิดลำดับการพึ่งพาของข้อมูล (Input-after-Output Dependency)</li>
              </ol>
            </li>
            <li><strong>การเปรียบเทียบเชิงลึก: ทำไม UTXO ถึงเหนือกว่า Account-Based ในระบบ Sharding:</strong> ยืนยันว่าการตัดสินใจเลือกใช้โมเดล UTXO ของ OmniLedger เป็นการตัดสินใจเชิงวิศวกรรมที่ถูกต้องที่สุด เพราะหลีกเลี่ยงปัญหา Contention และการล็อกสถานะแบบเรียงลำดับที่เป็นคอขวดของ Ethereum 2.0</li>
            <li><strong>บทสรุปและการต่อยอดในวิชาเครือข่ายเซนเซอร์ (305432):</strong> การนำสถาปัตยกรรม Sharding ของ OmniLedger ไปประยุกต์ใช้ในการกระจายภาระงานของโหนดเกตเวย์เซนเซอร์ (Sensor Gateways) ตามพื้นที่ทางภูมิศาสตร์ (Spatial Sharding) เพื่อรองรับข้อมูลสตรีมมิ่งมหาศาลในระบบ IoT ยุคใหม่</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 16)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>การสรุปจบอย่างทรงพลัง (Closing Statement):</strong> &ldquo;OmniLedger ไม่ได้เป็นเพียงบทความวิจัยบล็อกเชน แต่เป็นพิมพ์เขียวทางวิศวกรรมระบบกระจายตัวที่พิสูจน์ให้โลกเห็นว่า การขยายขนาดแนวนอน (Scale-Out) ควบคู่กับความมั่นคงปลอดภัยสูงสุด (Security) สามารถเกิดขึ้นพร้อมกันได้จริง&rdquo;</li>
            <li><strong>เชื่อมโยงสู่วิชาเซนเซอร์:</strong> แสดงให้อาจารย์เห็นว่าหลักการ Sharding และ Byzantine Fault Tolerance ใน OmniLedger สามารถนำมาใช้แก้ปัญหาคอขวดในการรวมข้อมูลของเครือข่ายเซนเซอร์ขนาดใหญ่ได้อย่างสมบูรณ์แบบ</li>
            <li><strong>การขอบคุณและเปิดรับคำถาม:</strong> นำเสนออย่างมั่นใจ ยิ้มรับคำถามจากคณะกรรมการ</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Appendix D Stateful Objects -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">ภาคผนวก Appendix D: การจัดการวัตถุที่มีสถานะและสัญญาอัจฉริยะ (Stateful Objects)</span>
              <span class="unit-en-ref">Appendix D · Page 598</span>
            </div>
            <div class="original-en-quote">
              &ldquo;APPENDIX D: ATOMIX FOR STATE-FULL OBJECTS&hellip; As a result we need to modify the algorithm in two ways: a) the Unlock transactions should be sent to both Input and Output shards and b) the state machine should have one more state as the shards need to wait for confirmation before unlocking&hellip; Fig. 14: State-Machine for state-full objects. Pessimistic locking is necessary.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              เมื่อนำโปรโตคอล Atomix มาประยุกต์ใช้กับระบบที่มีสัญญาอัจฉริยะ (Smart Contracts) เราต้องคำนึงถึงความจริงที่ว่า วัตถุในสัญญาอัจฉริยะเป็นข้อมูลที่สามารถเปลี่ยนแปลงค่าได้ (Mutable State) และสามารถถูกเข้าถึงพร้อมกันเพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมาย ส่งผลให้เราต้องปรับปรุงอัลกอริทึมใน 2 จุดสำคัญ:<br><br>
              1. ธุรกรรมปลดล็อก (Unlock Transactions) จะต้องถูกส่งไปยังทั้ง Shard ขาเข้า (Input Shards) และ Shard ขาออก (Output Shards) พร้อมกัน<br>
              2. เครื่องสถานะ (State Machine) จะต้องเพิ่มสถานะขึ้นมาอีกหนึ่งสถานะ เนื่องจาก Shards จำเป็นต้องรอการยืนยันก่อนทำการปลดล็อก เพื่อป้องกันโอกาสที่วัตถุสัญญาอัจฉริยะจะถูกเข้าถึงซ้ำ ซึ่งอาจละเมิดลำดับการพึ่งพาข้อมูลขาเข้าและขาออก (Input-after-Output Dependency) หาก Atomix ตัดสินใจยกเลิกธุรกรรม<br><br>
              ดังแสดงในแผนภาพ <strong>Fig. 14</strong> วัตถุจะทำการล็อก (Lock) สำหรับธุรกรรมหนึ่งโดยเฉพาะ ($T$) และจะปฏิเสธธุรกรรมคู่ขนานอื่นๆ ทั้งหมด ($T'$) จนกว่าธุรกรรม $T$ จะทำ Commit และบันทึกสถานะใหม่ $S'$ สำเร็จ หรือทำ Abort และเปิดให้สถานะเดิม $S$ สามารถเปลี่ยนแปลงได้ใหม่อีกครั้ง
            </div>
            <div class="engineering-annotation">
              <strong>การวิเคราะห์เชิงเปรียบเทียบ UTXO vs Stateful Smart Contracts:</strong><br>
              <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
                <li><strong>โมเดล UTXO:</strong> ข้อมูลแต่ละก้อนเป็นอิสระต่อกัน (Independent &amp; Immutable) ทำให้ Sharding สามารถทำได้แบบขนานอย่างแท้จริงโดยไม่มีปัญหาการล็อกสถานะขัดแย้ง</li>
                <li><strong>โมเดล Smart Contract:</strong> จำเป็นต้องใช้การล็อกแบบเข้มงวด (Pessimistic Locking) ส่งผลให้ธุรกรรมที่เรียกใช้สัญญาอัจฉริยะตัวเดียวกันต้องเข้าคิวประมวลผลทีละรายการ ทำให้อัตราเร่งแบบขนานสูญเสียไปอย่างมาก</li>
              </ul>
            </div>
          </div>

          <!-- Unit 2: Course Integration & Synthesis -->
          <div class="trans-section-unit" style="border: 2px solid var(--accent); background: var(--accent2-bg);">
            <div class="trans-unit-header">
              <span class="unit-title" style="color: var(--accent2); font-weight: 800;">บทสังเคราะห์ทางวิศวกรรม: การประยุกต์ใช้ OmniLedger ในรายวิชาเครือข่ายเซนเซอร์ (305432)</span>
              <span class="unit-en-ref">Course Synthesis · Sensor Networks Integration</span>
            </div>
            <div class="thai-full-translation">
              <strong>การนำองค์ความรู้จาก OmniLedger ไปประยุกต์ใช้ในระบบเครือข่ายเซนเซอร์ (WSN):</strong><br>
              ในระบบเครือข่ายเซนเซอร์ไร้สายและโครงสร้างพื้นฐาน IoT ขนาดใหญ่ (เช่น Smart City หรือระบบตรวจวัดสิ่งแวดล้อมระดับประเทศ) มีโหนดเซนเซอร์ส่งข้อมูลเข้ามาหลายล้านข้อความต่อวินาที หากนำข้อมูลทั้งหมดไปบันทึกบนบล็อกเชนแบบดั้งเดิม ระบบจะเกิดคอขวดและหยุดทำงานทันที<br><br>
              หลักการของ OmniLedger สามารถนำมาประยุกต์ใช้ได้อย่างมีประสิทธิภาพใน 3 มิติ:
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85;">
                <li><strong>การทำ Sharding เชิงพื้นที่สำหรับ Sensor Gateways (Spatial Sharding):</strong> แบ่งกลุ่มโหนดเกตเวย์ (Gateway Nodes) ออกเป็น Shards ย่อยตามพื้นที่ทางภูมิศาสตร์ แต่ละกลุ่มทำหน้าที่ตรวจสอบและบันทึกข้อมูลเซนเซอร์ในเขตความรับผิดชอบของตนเองแบบขนาน ทำให้ระบบขยายตัวรองรับเซนเซอร์นับล้านตัวได้อย่างไร้ขีดจำกัด</li>
                <li><strong>การประยุกต์ใช้ State Blocks บนโหนดขอบข่าย (Edge Pruning):</strong> อุปกรณ์เกตเวย์หรือโหนด Fog มักมีหน่วยความจำ Flash จำกัด การใช้หลักการ State Blocks ช่วยให้เกตเวย์สามารถทิ้งประวัติข้อมูลเซนเซอร์ดิบในอดีต และจัดเก็บเพียง Merkle Root Hash สรุปสถานะล่าสุด ช่วยลดการใช้หน่วยความจำลงได้มากกว่า 80%</li>
                <li><strong>การตรวจสอบความผิดปกติข้ามพื้นที่ด้วย Atomix (Cross-Area Validation):</strong> เมื่อมีเหตุการณ์วิกฤตที่ส่งผลกระทบข้ามเขตพื้นที่ (เช่น การแพร่กระจายของมลพิษหรือไฟป่า) เกตเวย์ในแต่ละเขตสามารถแลกเปลี่ยนข้อมูลและทำฉันทามติรับรองเหตุการณ์ร่วมกันอย่างปลอดภัยผ่านโปรโตคอล Atomix โดยไม่ต้องพึ่งพาเซิร์ฟเวอร์คลาวด์ส่วนกลาง</li>
              </ol>
            </div>
          </div>

        </div>
      </article>
    """
