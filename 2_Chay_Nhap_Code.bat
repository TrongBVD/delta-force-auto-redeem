@echo off
chcp 65001 >nul
title [Bước 2] Chạy Tự Động Nhập Mã Delta Force

echo ================================================================
echo       DELTA FORCE AUTO REDEEM - TỰ ĐỘNG NHẬP MÃ CODE
echo ================================================================
echo.

set "NODE_CMD=node"

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Đã phát hiện Node.js có sẵn trên hệ thống.
    goto :RUN
)

if exist "%~dp0bin\node.exe" (
    echo [OK] Đã phát hiện bản Node.js Portable trong thư mục bin.
    set "NODE_CMD=%~dp0bin\node.exe"
    goto :RUN
)

echo [!] Chưa tìm thấy Node.js trên máy tính của bạn.
echo [!] Bạn KHÔNG CẦN phải cài đặt thủ công!
echo [*] Đang tự động tải bản Node.js Portable thu gọn (~30MB) để dùng ngay...
echo.

if not exist "%~dp0bin" mkdir "%~dp0bin"
curl.exe -# -fLo "%~dp0bin\node.exe" "https://nodejs.org/dist/v20.18.0/win-x64/node.exe"

if not exist "%~dp0bin\node.exe" (
    echo.
    echo [LỖI] Không thể tải tự động Node.js.
    echo Bạn có thể tải và cài đặt Node.js thủ công từ: https://nodejs.org/
    echo Hoặc sử dụng cách chạy bằng Console F12 được hướng dẫn trong README.md!
    echo.
    pause
    exit /b
)

echo.
echo [OK] Đã tải xong Node.js Portable!
set "NODE_CMD=%~dp0bin\node.exe"

:RUN
echo [OK] Bắt đầu khởi chạy chương trình...
echo.

"%NODE_CMD%" "%~dp0index.js"

echo.
echo ================================================================
echo Đã kết thúc tiến trình. Nhấn phím bất kỳ để đóng cửa sổ này.
echo ================================================================
pause >nul
