# 🎮 Delta Force Auto Redeem Tool

> **Công cụ tự động quét, lọc trùng lặp và nhập mã Giftcode game Delta Force Garena siêu tốc qua Chrome Remote Debugging.**  
> *Tối ưu hóa tối đa — Tải về là dùng ngay, KHÔNG cần setup phức tạp!*

---

## ✨ Tính Năng Nổi Bật

- 🎁 **Có sẵn 214 mã Giftcode hoạt động**: File `codes.txt` đã được kiểm duyệt và nạp sẵn 214 mã nhận thưởng thành công. Người dùng khác chỉ cần tải về và chạy là nhận quà ngay!
- 🚀 **Zero Dependency (Không cần cài thư viện)**: Chạy hoàn toàn bằng thư viện native có sẵn của Node.js, không cần chạy `npm install` hay tải các thư viện puppeteer/selenium nặng nề.
- 🖱️ **1-Click Chạy Ngay**: Cung cấp sẵn các file `.bat` tiện lợi, người dùng chỉ cần nhấn đúp chuột là có thể chạy ngay lập tức.
- 🧹 **Tự động lọc trùng lặp**: Quét và loại bỏ tất cả các mã trùng nhau trước khi gửi yêu cầu.
- 🗑️ **Tự động làm sạch file**: Mã nào nhập không được (hết hạn, sai mã, đã đạt giới hạn tài khoản) sẽ tự động bị xóa khỏi file; chỉ giữ lại các mã nhập thành công.
- 💾 **Cập nhật thời gian thực & Tự động sao lưu**: File mã được cập nhật liên tục ngay khi có kết quả. Nếu bị gián đoạn giữa chừng, tiến trình vẫn được bảo toàn. Tự động sao lưu file gốc để phòng rủi ro.
- 🔒 **An toàn 100%**: Sử dụng chính trình duyệt Google Chrome chính thức trên máy bạn qua cổng gỡ lỗi cục bộ (Port 9222). Không lưu trữ hay gửi thông tin đăng nhập đi bất kỳ đâu.

---

## 📋 Yêu Cầu Hệ Thống

1. **Google Chrome** đã cài đặt trên máy.
2. **Node.js** (Khuyên dùng bản LTS từ [nodejs.org](https://nodejs.org/)).

---

## 🚀 Hướng Dẫn Sử Dụng (Chỉ với 3 Bước)

### Bước 1: Chuẩn bị mã code
Trong file `codes.txt` **đã có sẵn 214 mã hoạt động**. Bạn có thể dùng luôn danh sách này hoặc dán thêm các mã giftcode mới của bạn vào (mỗi mã 1 dòng).

### Bước 2: Mở Chrome
Nhấn đúp chuột vào file **`1_Mo_Chrome.bat`**.  
- Trình duyệt Chrome sẽ tự động mở trang đổi quà của Delta Force.
- Bạn hãy bấm **Đăng nhập** tài khoản Garena của mình trên cửa sổ Chrome vừa mở.

### Bước 3: Bắt đầu nhập mã tự động
Nhấn đúp chuột vào file **`2_Chay_Nhap_Code.bat`**.  
- Chương trình sẽ tự động nhận diện tài khoản của bạn, quét danh sách mã, lọc trùng và nhập tự động vào hệ thống.
- Sau khi chạy xong, phần quà sẽ được chuyển trực tiếp vào hộp thư trong game!

---

## ⚙️ Tùy Chỉnh Nâng Cao (`config.json`)

Bạn có thể chỉnh sửa file `config.json` để thay đổi các thiết lập theo ý muốn:

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

- `delayBetweenCodesMs`: Thời gian chờ giữa 2 lần nhập mã (mặc định: `2000` ms = 2 giây) để tránh bị hệ thống chặn do thao tác quá nhanh.
- `codesFile`: Tên file chứa danh sách mã giftcode.
- `autoBackup`: Tự động tạo bản sao lưu file mã trước khi chạy (`true` / `false`).
- `removeInvalidCodes`: Tự động xóa mã lỗi/không nhập được khỏi file (`true` / `false`).

---

## 📄 Cấu Trúc Thư Mục

```plaintext
delta-force-auto-redeem/
├── 1_Mo_Chrome.bat        # File chạy nhanh mở Chrome Port 9222
├── 2_Chay_Nhap_Code.bat   # File chạy nhanh bắt đầu nhập code
├── index.js               # Mã nguồn chính xử lý tự động hóa qua Chrome CDP
├── config.json            # File cấu hình tùy chỉnh
├── codes.txt              # Nơi bạn dán danh sách mã code
├── package.json           # Thông tin dự án
├── .gitignore             # Danh sách file loại trừ không đẩy lên git
└── README.md              # Tài liệu hướng dẫn sử dụng
```

---

## ❓ Câu Hỏi Thường Gặp (FAQ)

**Q: Khi chạy file `2_Chay_Nhap_Code.bat` báo lỗi không tìm thấy Chrome?**  
*A: Hãy đảm bảo bạn đã chạy file `1_Mo_Chrome.bat` trước để mở Chrome ở chế độ cổng gỡ lỗi 9222.*

**Q: Tại sao một số mã hiển thị lỗi `400067` hoặc `400070`?**  
*A:*  
- `400067`: Tài khoản của bạn đã đạt giới hạn nhận cho nhóm code này hoặc đã đổi rồi.  
- `400070`: Mã giftcode này đã hết hạn sự kiện.  
- `400054`: Mã giftcode không tồn tại hoặc sai ký tự.  
Tất cả các mã trên đều thuộc diện "nhập không được" và sẽ được chương trình tự động xóa khỏi danh sách.

---

## 📜 Giấy Phép (License)

Dự án được phát hành dưới giấy phép [MIT License](LICENSE).
