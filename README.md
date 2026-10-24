# 🎮 Delta Force Auto Redeem Tool

> **Công cụ tự động quét, lọc trùng lặp và nhập mã Giftcode game Delta Force Garena siêu tốc qua Chrome Remote Debugging.**  
> *Tối ưu hóa tối đa — Tải về là dùng ngay, KHÔNG cần gõ lệnh phức tạp, dành cho cả người chưa từng lập trình!*

---

## 🎁 Quà Tặng Kèm Có Sẵn
Trong file `codes.txt` của dự án đã được tích hợp sẵn **214 mã Giftcode còn hoạt động** (đã được kiểm tra và nhận quà thành công). Bạn chỉ cần tải về và chạy là có thể nhận trọn bộ quà vào hòm thư game!

---

## 📖 HƯỚNG DẪN TỪ A ĐẾN Z (DÀNH CHO NGƯỜI MỚI BẮT ĐẦU)

Bạn không cần biết lập trình, không cần mở màn hình đen gõ lệnh. Hãy làm theo đúng 5 bước siêu đơn giản dưới đây:

### 📥 Bước 1: Tải công cụ về máy tính
1. Ở đầu trang GitHub này, hãy nhìn sang góc trên bên phải tìm nút màu xanh lá cây có chữ **`<> Code`**.
2. Nhấn vào nút đó, một menu nhỏ thả xuống ➔ Chọn dòng cuối cùng: **`Download ZIP`**.
3. File nén `delta-force-auto-redeem-main.zip` sẽ được tải về thư mục `Downloads` trên máy của bạn.

> *(Nếu bạn là lập trình viên đã cài Git, chỉ cần gõ: `git clone https://github.com/TrongBVD/delta-force-auto-redeem.git`)*

---

### 📂 Bước 2: Giải nén thư mục
1. Mở thư mục chứa file vừa tải về (thường là `Downloads`).
2. Nhấp chuột phải vào file **`delta-force-auto-redeem-main.zip`** ➔ Chọn **Extract All...** (hoặc *Giải nén tập tin* / *Extract here*).
3. Nhấn **Extract** để giải nén. Bạn sẽ thấy một thư mục mới mở ra chứa các file của công cụ.

---

### ⚙️ Bước 3: Cài đặt Node.js (Chỉ cần làm 1 lần duy nhất)
Công cụ cần môi trường Node.js để chạy tự động:
1. Truy cập vào trang chủ chính thức: 👉 **[https://nodejs.org/](https://nodejs.org/)**
2. Nhấn vào ô màu xanh lá cây có chữ **LTS** (Ví dụ: *20.x.x LTS* hoặc *22.x.x LTS - Recommended for most users*).
3. Sau khi tải về file cài đặt (dạng `.msi`), bạn hãy nhấp đúp vào file đó để cài đặt.
4. Chỉ cần bấm **Next** ➔ chọn đồng ý điều khoản ➔ bấm **Next** liên tục ➔ bấm **Install** ➔ bấm **Finish**.  
*(Xong! Bạn không cần phải mở hay cấu hình gì thêm sau khi cài đặt).*

---

### 🌐 Bước 4: Mở Chrome và Đăng nhập game
1. Quay lại thư mục công cụ đã giải nén ở Bước 2.
2. Tìm file có tên: **`1_Mo_Chrome.bat`** và **nhấp đúp chuột** vào file đó.
3. Một cửa sổ Google Chrome riêng biệt sẽ tự động mở lên và dẫn thẳng tới trang Đổi Quà Delta Force của Garena.
4. Trên trang web vừa mở, bạn hãy bấm vào nút **"Đăng Nhập"** (góc trên bên phải hoặc ở giữa màn hình) để đăng nhập vào đúng tài khoản game của bạn (Garena / Google / Facebook...).
5. Sau khi đăng nhập thấy hiện tên nhân vật của bạn là xong! Cứ để nguyên cửa sổ Chrome đó mở.

---

### 🚀 Bước 5: Bắt đầu nhập mã tự động
1. Trong thư mục công cụ, bạn hãy **nhấp đúp chuột** vào file: **`2_Chay_Nhap_Code.bat`**.
2. Một bảng điều khiển sẽ hiện lên và tự động thực hiện tất cả:
   - Tự động nhận diện tài khoản bạn đang đăng nhập trên Chrome.
   - Tự động kiểm tra danh sách 214 mã có sẵn trong `codes.txt`.
   - Tự động điền từng mã vào ô và bấm nút "Đổi".
   - Tự động đóng các bảng thông báo trên trang web.
3. Bạn chỉ cần ngồi xem thanh tiến trình chạy (khoảng 5 - 8 phút cho hơn 200 mã).
4. Khi bảng hiện thông báo: **`KẾT QUẢ ĐÃ HOÀN TẤT!`**, bạn hãy mở game Delta Force trên máy tính hoặc điện thoại lên và vào mục **Hòm Thư (Mailbox)** trong game để nhận toàn bộ quà tặng!

---

## ✍️ Muốn thêm mã Giftcode mới thì làm thế nào?
Nếu sau này bạn sưu tầm được thêm các mã code mới từ livestream, fanpage:
1. Mở file **`codes.txt`** bằng **Notepad** (Nhấp đúp chuột vào file).
2. Dán các mã mới của bạn vào (mỗi mã nằm trên 1 dòng riêng biệt).
3. Nhấn **Ctrl + S** để lưu file lại.
4. Nhấp đúp chuột vào file **`2_Chay_Nhap_Code.bat`** để tool tự động nhập các mã mới!  
*(Mã nào lỗi hoặc hết hạn sẽ tự động bị xóa khỏi file, chỉ giữ lại mã nhận thành công).*

---

## 🛠️ Xử Lý Sự Cố Thường Gặp (Troubleshooting)

| Tình trạng | Nguyên nhân | Cách khắc phục |
| :--- | :--- | :--- |
| **Bấm `2_Chay_Nhap_Code.bat` hiện bảng đen rồi tắt ngay hoặc báo lỗi Node.js** | Máy tính của bạn chưa cài đặt Node.js. | Vào [https://nodejs.org/](https://nodejs.org/) tải bản LTS về cài đặt theo Bước 3. |
| **Báo lỗi: "Không thể kết nối tới Chrome port 9222"** | Bạn chưa mở Chrome bằng file số 1 hoặc đã lỡ đóng Chrome. | Nhấp đúp vào file `1_Mo_Chrome.bat` trước, sau đó mới chạy file `2_Chay_Nhap_Code.bat`. |
| **Tool dừng lại và báo: "[!] CHƯA PHÁT HIỆN ĐĂNG NHẬP"** | Bạn chưa đăng nhập tài khoản trên trang web đổi quà. | Chuyển sang cửa sổ Chrome, bấm Đăng Nhập tài khoản của bạn. Sau đó quay lại cửa sổ màu đen bấm phím **Enter** để tool chạy tiếp. |
| **Một số mã báo lỗi `400067` hoặc `400070`** | `400067`: Tài khoản của bạn đã đạt giới hạn nhận mã này.<br>`400070`: Mã đã hết thời gian sự kiện. | Đây là phản hồi bình thường từ máy chủ Garena. Tool sẽ tự động loại bỏ các mã này khỏi file cho bạn. |

---

## ⚙️ Cấu Hình Nâng Cao (`config.json`)

Dành cho người dùng muốn tùy chỉnh sâu:
```json
{
  "chromeDebugPort": 9222,
  "codesFile": "codes.txt",
  "delayBetweenCodesMs": 2000,
  "autoBackup": true,
  "logFile": "redeem_log.txt",
  "removeInvalidCodes": true,
  "removeDuplicates": true,
  "targetUrl": "https://redeem.df.garena.sg/vi/cdkgarena.html"
}
```
- `delayBetweenCodesMs`: Thời gian chờ giữa 2 lần nhập (mặc định: `2000` = 2 giây) để tránh bị chặn IP.
- `autoBackup`: Tự động tạo bản sao lưu file `codes_backup.txt` trước khi chạy.
- `removeInvalidCodes`: Tự động xóa mã lỗi / không nhập được khỏi file (`true`/`false`).

---

## 🔒 An Toàn & Bảo Mật
- **Không yêu cầu nhập mật khẩu**: Bạn tự đăng nhập trực tiếp trên trang web chính thức của Garena. Công cụ không bao giờ hỏi hay lưu trữ mật khẩu tài khoản của bạn.
- **Không lưu dữ liệu đám mây**: Toàn bộ tiến trình chạy 100% nội bộ trên máy tính của bạn (Localhost).
- **Mã nguồn mở hoàn toàn**: Mọi người đều có thể xem từng dòng mã trong file `index.js`.

---

## 📜 Giấy Phép (License)
Dự án được phát hành mã nguồn mở theo giấy phép [MIT License](LICENSE). Thoải mái sử dụng và chia sẻ cho bạn bè cùng chơi game!
