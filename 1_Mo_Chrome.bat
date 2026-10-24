@echo off
chcp 65001 >nul
title [Bước 1] Mở Chrome Port 9222 - Delta Force Auto Redeem

echo ================================================================
echo       HỆ THỐNG TỰ ĐỘNG KHỞI CHẠY CHROME PORT 9222
echo ================================================================
echo.

set CHROME_PATH=""

if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)

if %CHROME_PATH%=="" (
    echo [LỖI] Không tìm thấy Google Chrome tại các thư mục mặc định!
    echo Vui lòng cài đặt Google Chrome hoặc mở file bat này để chỉnh sửa đường dẫn.
    echo.
    pause
    exit /b
)

set PROFILE_DIR=%~dp0chrome_profile
if not exist "%PROFILE_DIR%" mkdir "%PROFILE_DIR%"

echo [1/2] Đang mở Google Chrome với Remote Debugging Port 9222...
echo [2/2] Dữ liệu đăng nhập lưu tại: "%PROFILE_DIR%"
echo.

start "" %CHROME_PATH% --remote-debugging-port=9222 --user-data-dir="%PROFILE_DIR%" "https://redeem.df.garena.sg/vi/cdkgarena.html"

echo ================================================================
echo   [OK] CHROME ĐÃ ĐƯỢC KHỞI CHẠY THÀNH CÔNG!
echo.
echo   BƯỚC TIẾP THEO:
echo   1. Trên cửa sổ Chrome vừa hiện ra, hãy bấm ĐĂNG NHẬP tài khoản Garena
echo   2. Dán các mã giftcode vào file "codes.txt" (mỗi mã 1 dòng)
echo   3. Chạy file "2_Chay_Nhap_Code.bat" để tự động nhập mã
echo ================================================================
echo.
pause
