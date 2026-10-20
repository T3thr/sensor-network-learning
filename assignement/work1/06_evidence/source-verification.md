# Source Verification for Assignment Paper 1

## Bibliographic record

- Title: IoT-CAD: Context-Aware Adaptive Anomaly Detection in IoT Systems Through Sensor Association
- Authors: Rozhin Yasaei, Felix Hernandez, Mohammad Abdullah Al Faruque
- Publication: 2020 IEEE/ACM International Conference on Computer-Aided Design (ICCAD)
- Document number: 9256703
- DOI: https://doi.org/10.1145/3400302.3415672
- IEEE Xplore: https://ieeexplore.ieee.org/document/9256703/
- Local original: `../01_original/IoT-CAD_9256703_Original.pdf`
- SHA-256: ดูค่าใน `../../../raw/MANIFEST.sha256`

## Evidence map

| Claim used in report and slides | Location in original paper |
|---|---|
| Three stated contributions | Section 1.4, page 2 |
| Binary fingerprint and sensor association | Sections 3.1 and 3.2, pages 2–4 |
| LSTM encoder-decoder and Gaussian estimator | Sections 3.3 and 3.4, pages 4–5 |
| Consensus separates EA and SDA | Section 3.4, page 5 |
| Partial and complete model update | Section 3.5 and Figure 12, pages 5 and 8 |
| 62 sensors and 13 physical parameters | Section 4.2 and Table 1, page 6 |
| 8 days and about 2.3 million measurements | Section 4.6, page 8 |
| Precision 92%, recall 56%, F0.5 81%, F1 70% | Table 2, page 7 |
| Detection time 0.532 s and initial training 2472.20 s | Table 3, page 8 |
| Synthetic anomalies in validation | Section 4.3.2, page 7 |
| Fire incident used as EA case study | Section 4.5, page 8 |

## Interpretation boundaries

- 92% is precision, not accuracy and not anomaly coverage.
- 0.532 s is real time only for the paper's testbed and computing platform.
- The paper evaluates anomalies created for validation; it does not establish broad performance on naturally occurring attacks and failures.
- The authors claim the first context-aware anomaly detection method for IoT systems “to the best of our knowledge.” Present this as the authors' 2020 claim, not as a fact that remains true today.

## Manual download record

The original PDF in `raw/` was downloaded from IEEE Xplore as the primary paper. The submission copy in `01_original/` is byte-for-byte copied from that file; no PDF content was altered.
