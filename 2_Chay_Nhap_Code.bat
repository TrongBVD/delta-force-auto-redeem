@echo off
chcp 65001 >nul
title [Bước 2] Chạy Tự Động Nhập Mã Delta Force

echo ================================================================
echo       DELTA FORCE AUTO REDEEM - TỰ ĐỘNG NHẬP MÃ CODE
echo ================================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LỖI] Máy tính của bạn chưa cài đặt Node.js!
    echo.
    echo Vui lòng tải và cài đặt Node.js phiên bản LTS tại:
    echo   https://nodejs.org/
    echo.
    echo Sau khi cài đặt xong Node.js, bạn chỉ cần nhấn đúp vào file này để chạy!
    echo ================================================================
    echo.
    pause
    exit /b
)

echo [OK] Đã phát hiện Node.js, bắt đầu khởi chạy chương trình...
echo.

node "%~dp0index.js"

echo.
echo ================================================================
echo Đã kết thúc tiến trình. Nhấn phím bất kỳ để đóng cửa sổ này.
echo ================================================================
pause >nul
