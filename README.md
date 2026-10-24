# 🎮 Delta Force Auto Redeem Tool

> **Công cụ tự động quét, lọc trùng lặp và nhập mã Giftcode game Delta Force Garena siêu tốc.**  
> *Tối ưu hóa tối đa — Tải về là dùng ngay, KHÔNG bắt buộc cài đặt Node.js thủ công!*

---

## 🎁 Quà Tặng Kèm Có Sẵn
Trong dự án đã nạp sẵn **214 mã Giftcode còn hoạt động** (đã được kiểm tra và nhận thưởng thành công). Bạn chỉ cần chạy là nhận trọn bộ quà vào hòm thư game!

---

## ⚡ 2 CÁCH DÙNG DỄ NHẤT (CHỌN 1 TRONG 2)

---

### 🌟 CÁCH 1: Dùng File Chạy Tự Động (Khuyên dùng trên Windows)

> **Điểm đặc biệt:** File chạy `2_Chay_Nhap_Code.bat` đã được tích hợp cơ chế thông minh:
> - **Nếu máy bạn ĐÃ CÓ Node.js:** Nó sẽ tự nhận diện và chạy ngay lập tức.
> - **Nếu máy bạn CHƯA CÓ Node.js:** Nó sẽ **tự động tải bản Node.js thu gọn (~30MB) về dùng ngay mà bạn KHÔNG CẦN CÀI ĐẶT BẤT CỨ THỨ GÌ VÀO WINDOWS!**

#### Các bước thực hiện:

1. **Tải công cụ về:**  
   Bấm nút màu xanh **`<> Code`** ở góc trên bên phải trang GitHub ➔ Chọn **`Download ZIP`** ➔ Giải nén file vừa tải.
2. **Mở Chrome:**  
   Nhấp đúp chuột vào file **`1_Mo_Chrome.bat`** ➔ Cửa sổ Chrome mở ra trang đổi quà ➔ Bấm **Đăng Nhập** tài khoản game của bạn.
3. **Bắt đầu nhập mã:**  
   Nhấp đúp chuột vào file **`2_Chay_Nhap_Code.bat`**. Chương trình sẽ tự động xử lý tất cả từ A đến Z!
4. **Vào game nhận quà:**  
   Mở game Delta Force lên và kiểm tra hòm thư in-game để nhận thưởng.

---

### 🚀 CÁCH 2: Chạy Trực Tiếp Qua Console F12 (Zero-Download, Không Cần Cài Đặt Gì Hết)

> **Cách này dành cho ai:**
> - Không muốn tải hay cài đặt bất kỳ phần mềm nào vào máy tính.
> - Sử dụng MacOS, Linux, hoặc bất kỳ trình duyệt nào (Chrome, Edge, Brave, Cốc Cốc...).

#### Các bước thực hiện:

1. Dùng trình duyệt bất kỳ, mở trang: 👉 **[https://redeem.df.garena.sg/vi/cdkgarena.html](https://redeem.df.garena.sg/vi/cdkgarena.html)**
2. Đăng nhập vào tài khoản Delta Force của bạn.
3. Nhấn phím **F12** trên bàn phím (hoặc nhấp chuột phải vào bất kỳ đâu trên trang ➔ Chọn **Kiểm tra / Inspect**).
4. Nhìn lên thanh menu của bảng hiện ra, chuyển sang tab **Console**.
5. Mở file **[`console_redeem.js`](console_redeem.js)** trên GitHub này, bấm nút copy toàn bộ mã.
6. Dán vào tab **Console** rồi bấm **Enter**.
7. Một bảng điều khiển nhỏ gọn sẽ xuất hiện ngay góc màn hình web và tự động nhập lần lượt 214 mã cho bạn!

---

## 🔍 Kiểm tra xem máy đã có Node.js chưa (Nếu bạn tò mò)

Để kiểm tra xem máy tính của bạn đã cài Node.js từ trước hay chưa:
1. Nhấn tổ hợp phím **Windows + R**, gõ `cmd` rồi bấm **Enter**.
2. Trong cửa sổ màu đen gõ:
   ```bash
   node -v
   ```
   - **Nếu hiện phiên bản** (ví dụ `v20.x.x` hoặc `v22.x.x`): Máy bạn đã có sẵn Node.js hoàn chỉnh!
   - **Nếu báo lỗi "not recognized"**: Máy chưa có. Nhưng bạn **hoàn toàn yên tâm** vì file `2_Chay_Nhap_Code.bat` sẽ tự động tải bản thu gọn chạy liền mà không cần bạn phải làm gì!

---

## ✍️ Muốn thêm mã Giftcode mới thì làm thế nào?

Nếu bạn sưu tầm được thêm các mã code mới từ livestream, fanpage:
- **Với Cách 1:** Mở file `codes.txt` bằng Notepad, dán các mã mới vào cuối file, bấm `Ctrl + S` lưu lại rồi chạy lại `2_Chay_Nhap_Code.bat`.
- **Với Cách 2:** Mở file `console_redeem.js`, thêm các mã mới của bạn vào danh sách `const codes = [...]` ở đầu file.

---

## 🛠️ Xử Lý Sự Cố Thường Gặp (Troubleshooting)

| Tình trạng | Nguyên nhân | Cách khắc phục |
| :--- | :--- | :--- |
| **Báo lỗi: "Không thể kết nối tới Chrome port 9222"** | Bạn chưa mở Chrome bằng file số 1 hoặc đã lỡ đóng Chrome. | Nhấp đúp vào file `1_Mo_Chrome.bat` trước, sau đó mới chạy file `2_Chay_Nhap_Code.bat`. |
| **Tool dừng lại và báo: "[!] CHƯA PHÁT HIỆN ĐĂNG NHẬP"** | Bạn chưa đăng nhập tài khoản trên trang web đổi quà. | Chuyển sang cửa sổ Chrome, bấm Đăng Nhập tài khoản của bạn. Sau đó quay lại cửa sổ màu đen bấm phím **Enter** để tool chạy tiếp. |
| **Một số mã báo lỗi `400067` hoặc `400070`** | `400067`: Tài khoản của bạn đã đạt giới hạn nhận mã này.<br>`400070`: Mã đã hết thời gian sự kiện. | Đây là phản hồi bình thường từ máy chủ Garena. Tool sẽ tự động loại bỏ các mã này khỏi file cho bạn. |

---

## 🔒 An Toàn & Bảo Mật
- **Không yêu cầu nhập mật khẩu**: Bạn tự đăng nhập trực tiếp trên trang web chính thức của Garena.
- **Không gửi dữ liệu ra ngoài**: Toàn bộ tiến trình chạy 100% nội bộ trên máy tính của bạn (Localhost).
- **Mã nguồn mở hoàn toàn**: Mọi người đều có thể kiểm tra từng dòng code.

---

## 📜 Giấy Phép (License)
Dự án được phát hành mã nguồn mở theo giấy phép [MIT License](LICENSE).
