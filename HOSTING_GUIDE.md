# คู่มือการเปิด-ปิด Web Hosting (Nginx + Cloudflare Cloud Tunnel) ฟรี 100%

> **วิชา:** 305432 เครือข่ายเซนเซอร์ (Sensor Networks)  
> **โปรเจกต์:** Story Validator & Sensor Network Web Apps  
> **เทคโนโลยี:** Nginx Web Server (Local Port 8080) + Cloudflare Quick Tunnel (Free Global HTTPS)

---

## 🔗 ลิงก์ออนไลน์ปัจจุบัน (Live Cloud URLs)

* 📄 **แอปนำเสนอ Paper 4 (หน้าหลัก):** [https://top-happened-situated-ref.trycloudflare.com/paper-4/](https://top-happened-situated-ref.trycloudflare.com/paper-4/)
* 📖 **บทความแปลไทย Paper 4:** [https://top-happened-situated-ref.trycloudflare.com/paper-4/translation.html](https://top-happened-situated-ref.trycloudflare.com/paper-4/translation.html)
* 📄 **แอปนำเสนอ Paper 3 (หน้าหลัก):** [https://top-happened-situated-ref.trycloudflare.com/paper-3/](https://top-happened-situated-ref.trycloudflare.com/paper-3/)
* 📖 **บทความแปลไทย Paper 3:** [https://top-happened-situated-ref.trycloudflare.com/paper-3/translation.html](https://top-happened-situated-ref.trycloudflare.com/paper-3/translation.html)
* 📄 **Paper 3 (Version 2 - Raft-FL):** [https://top-happened-situated-ref.trycloudflare.com/paper-3/v2/](https://top-happened-situated-ref.trycloudflare.com/paper-3/v2/)
* 📄 **แอปนำเสนอ Paper 2 (Story Validator):** [https://top-happened-situated-ref.trycloudflare.com/paper-2/](https://top-happened-situated-ref.trycloudflare.com/paper-2/)
* 🏠 **หน้าหลัก (Hub Portal):** [https://top-happened-situated-ref.trycloudflare.com/](https://top-happened-situated-ref.trycloudflare.com/)

*(สามารถเปิดจากมือถือ แท็บเล็ต หรือส่งให้อาจารย์และเพื่อนดูได้ทันทีจากทุกที่ผ่านอินเทอร์เน็ตโดยไม่ต้องต่อ Wi-Fi เดียวกัน)*

---

## 🛠️ วิธีเปิด-ปิด และ Re-deploy

สคริปต์ควบคุมทั้งหมดอยู่ในโฟลเดอร์โปรเจกต์ สามารถเปิด Terminal แล้วรันคำสั่งได้ทันที:

### 1. วิธี Re-deploy หรือเริ่มระบบใหม่ (Restart / Re-deploy)
```bash
./host-restart.sh
```
* ทำการหยุดเซอร์วิสเดิมแล้วเริ่มใหม่อัตโนมัติ พร้อมดึงการอัปเดตไฟล์ HTML/CSS ล่าสุดและออก URL ใหม่อย่างรวดเร็ว

---

### 2. วิธีเปิดโฮสต์ (Start Hosting)
```bash
./host-start.sh
```
* **สิ่งที่ระบบทำ:**
  1. เปิด Nginx ทำงานบนพอร์ต `8080` ในเครื่อง
  2. เชื่อมต่อ Cloudflare Tunnel ส่งทราฟฟิกขึ้น Cloud Edge ผ่าน HTTP/2
  3. แสดงลิงก์ Public HTTPS ให้คลิกคัดลอกได้ทันที

---

### 3. วิธีตรวจสอบสถานะและดูลิงก์ปัจจุบัน (Check Status)
```bash
./host-status.sh
```
* แสดงสถานะการทำงานของ Nginx และ Cloudflare Tunnel พร้อมลิงก์ที่กำลังใช้งานอยู่

---

### 4. วิธีปิดโฮสต์เมื่อใช้งานเสร็จ (Stop Hosting)
```bash
./host-stop.sh
```
* ปิดทั้ง Cloudflare Tunnel และ Nginx อย่างปลอดภัย ไม่เปลืองแรมหรือแบตเตอรี่เครื่อง Mac

---

## ⚙️ โครงสร้างไฟล์การตั้งค่า

* [nginx.conf](./nginx.conf): ไฟล์ตั้งค่า Nginx ให้บริการไฟล์เว็บแอป จัดการเส้นทาง URL, Gzip, และ Caching
* [host-start.sh](./host-start.sh): สคริปต์เปิด Nginx + Cloudflare Tunnel อัตโนมัติ
* [host-stop.sh](./host-stop.sh): สคริปต์ปิดเซอร์วิสทั้งหมด
* [host-status.sh](./host-status.sh): สคริปต์ตรวจสอบสถานะและพิมพ์ลิงก์
* `logs/`: เก็บ log การเข้าชมเว็บ (`access.log`), error (`error.log`), และ URL การเชื่อมต่อ tunnel (`tunnel.log`)
