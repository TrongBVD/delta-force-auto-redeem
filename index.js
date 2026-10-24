/**
 * Delta Force Auto Redeem Tool
 * Tự động quét, lọc trùng và nhập mã Giftcode game Delta Force qua Chrome CDP
 * https://github.com/TrongBVD/delta-force-auto-redeem
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Đọc cấu hình từ config.json
function loadConfig() {
  const configPath = path.join(__dirname, 'config.json');
  const defaults = {
    chromeDebugPort: 9222,
    codesFile: 'codes.txt',
    delayBetweenCodesMs: 2000,
    autoBackup: true,
    logFile: 'redeem_log.txt',
    removeInvalidCodes: true,
    removeDuplicates: true,
    targetUrl: 'https://redeem.df.garena.sg/vi/cdkgarena.html'
  };

  if (fs.existsSync(configPath)) {
    try {
      const custom = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return { ...defaults, ...custom };
    } catch (e) {
      console.warn('[Cảnh báo] File config.json bị lỗi cú pháp, sử dụng cấu hình mặc định.');
    }
  }
  return defaults;
}

const config = loadConfig();
const CODES_FILE = path.resolve(__dirname, config.codesFile);
const LOG_FILE = path.resolve(__dirname, config.logFile);

function log(msg) {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const formatted = `[${timestamp}] ${msg}`;
  console.log(formatted);
  try {
    fs.appendFileSync(LOG_FILE, formatted + '\n', 'utf8');
  } catch (_) {}
}

function askUser(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.idCounter = 1;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          this.pending.get(msg.id)(msg.result);
          this.pending.delete(msg.id);
        }
      } catch (e) {
        console.error('CDP parse error:', e);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        return reject(new Error('WebSocket chưa kết nối hoặc đã bị đóng'));
      }
      const id = this.idCounter++;
      this.pending.set(id, resolve);
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true
    });
    return res?.result?.value;
  }

  close() {
    if (this.ws) {
      try { this.ws.close(); } catch (_) {}
    }
  }
}

async function findOrCreateTargetTab() {
  const baseUrl = `http://localhost:${config.chromeDebugPort}`;
  let targets;
  try {
    const res = await fetch(`${baseUrl}/json`);
    targets = await res.json();
  } catch (e) {
    throw new Error(
      `Không thể kết nối tới Chrome port ${config.chromeDebugPort}!\n` +
      `-> Vui lòng chạy file '1_Mo_Chrome.bat' để mở Chrome trước khi chạy chương trình.`
    );
  }

  let target = targets.find(t => t.url && t.url.includes('redeem.df.garena.sg'));
  if (!target) {
    console.log('[Thông tin] Chưa mở trang đổi quà Delta Force, đang tự động mở tab mới...');
    const createRes = await fetch(`${baseUrl}/json/new?${encodeURIComponent(config.targetUrl)}`, { method: 'PUT' });
    target = await createRes.json();
    // Đợi 3 giây để trang tải xong
    await new Promise(r => setTimeout(r, 3000));
  }

  return target.webSocketDebuggerUrl;
}

async function injectHook(cdp) {
  await cdp.eval(`(() => {
    window.__redeemHooked = true;
    window.__lastRedeemResult = null;

    if (!window.__origXhrOpen) {
      window.__origXhrOpen = XMLHttpRequest.prototype.open;
      window.__origXhrSend = XMLHttpRequest.prototype.send;

      XMLHttpRequest.prototype.open = function(method, url) {
        this.__url = url;
        return window.__origXhrOpen.apply(this, arguments);
      };

      XMLHttpRequest.prototype.send = function() {
        if (this.__url && this.__url.includes('RedeemCDKey')) {
          this.addEventListener('load', () => {
            try {
              window.__lastRedeemResult = JSON.parse(this.responseText);
            } catch (e) {
              window.__lastRedeemResult = { rawError: this.responseText };
            }
          });
        }
        return window.__origXhrSend.apply(this, arguments);
      };
    }
  })()`);
}

async function dismissDialogs(cdp) {
  await cdp.eval(`(() => {
    try {
      if (window.dialog && typeof window.dialog.hide === 'function') {
        window.dialog.hide();
      }
    } catch (_) {}
    const overlay = document.getElementById('_overlay_');
    if (overlay) overlay.style.display = 'none';
    const diaTips = document.getElementById('diaTips');
    if (diaTips) diaTips.style.display = 'none';
    const superTips = document.getElementById('superTips');
    if (superTips) {
      superTips.classList.remove('show');
      superTips.innerText = '';
    }
    window.superTipsTime = null;
  })()`);
}

async function checkLoginState(cdp) {
  const loginInfo = await cdp.eval(`(() => {
    const unlogin = document.getElementById('unlogin');
    const logined = document.getElementById('logined');
    const username = document.querySelector('.username')?.innerText?.trim();
    const isVisible = (el) => el && window.getComputedStyle(el).display !== 'none';
    return {
      isLoggedIn: isVisible(logined) || (username && username.length > 0),
      username: username || ''
    };
  })()`);
  return loginInfo;
}

async function main() {
  console.clear();
  log('================================================================');
  log('  DELTA FORCE AUTO REDEEM - TỰ ĐỘNG LỌC & NHẬP CODE GAME');
  log('================================================================');

  // Kiểm tra file danh sách mã code
  if (!fs.existsSync(CODES_FILE)) {
    fs.writeFileSync(CODES_FILE, '# Dán các mã giftcode của bạn vào đây (mỗi mã 1 dòng)\n', 'utf8');
    log(`[Thông báo] Đã tạo file '${config.codesFile}'. Hãy dán mã vào file rồi chạy lại chương trình!`);
    return;
  }

  // Tự động sao lưu nếu được bật
  if (config.autoBackup) {
    const backupName = `${path.basename(config.codesFile, path.extname(config.codesFile))}_backup.txt`;
    const backupPath = path.join(path.dirname(CODES_FILE), backupName);
    fs.copyFileSync(CODES_FILE, backupPath);
    log(`[Sao lưu] Đã tạo bản sao lưu an toàn tại: ${backupName}`);
  }

  // Đọc danh sách mã
  const fileContent = fs.readFileSync(CODES_FILE, 'utf8');
  const rawLines = fileContent
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  if (rawLines.length === 0) {
    log(`[Thông báo] File '${config.codesFile}' chưa có mã giftcode nào! Vui lòng thêm mã vào file.`);
    return;
  }

  // Lọc trùng lặp
  const uniqueCodes = [];
  const seen = new Set();
  for (const line of rawLines) {
    const norm = line.toUpperCase();
    if (!seen.has(norm)) {
      seen.add(norm);
      uniqueCodes.push(line);
    }
  }

  const duplicatesCount = rawLines.length - uniqueCodes.length;
  log(`- Tổng số dòng mã đọc được: ${rawLines.length}`);
  log(`- Mã trùng lặp đã loại bỏ: ${duplicatesCount}`);
  log(`- Số mã duy nhất hợp lệ cần xử lý: ${uniqueCodes.length}`);
  log('----------------------------------------------------------------');

  // Kết nối Chrome CDP
  log(`Đang kết nối tới Chrome port ${config.chromeDebugPort}...`);
  let wsUrl = await findOrCreateTargetTab();
  let cdp = new CDPClient(wsUrl);
  await cdp.connect();
  log('[OK] Đã kết nối thành công tới trang đổi quà Delta Force!');

  await injectHook(cdp);
  await dismissDialogs(cdp);

  // Kiểm tra trạng thái đăng nhập
  let login = await checkLoginState(cdp);
  if (!login?.isLoggedIn) {
    console.log('\n[!] CHƯA PHÁT HIỆN ĐĂNG NHẬP TRÊN TRANG WEB!');
    console.log('-> Hãy chuyển sang cửa sổ Chrome và bấm "Đăng nhập" tài khoản của bạn.');
    await askUser('-> Sau khi đăng nhập thành công, nhấn phím ENTER tại đây để bắt đầu: ');
    login = await checkLoginState(cdp);
  }

  if (login?.username) {
    log(`[Tài khoản] Đang đăng nhập: "${login.username}"`);
  }
  log('Bắt đầu quá trình nhập mã...\n');

  const successfulCodes = [];
  const failedCodes = [];
  let remainingCodes = [...uniqueCodes];

  for (let i = 0; i < uniqueCodes.length; i++) {
    const code = uniqueCodes[i];
    const progress = `[${i + 1}/${uniqueCodes.length}]`;

    let attempt = 0;
    let res = null;

    while (attempt < 2 && !res) {
      attempt++;
      try {
        await cdp.eval(`(() => {
          window.__lastRedeemResult = null;
          const input = document.querySelector('.exc-input');
          if (input) {
            input.value = '${code}';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
          const btn = document.querySelector('.btn-exchange');
          if (btn) btn.click();
        })()`);

        for (let wait = 0; wait < 35; wait++) {
          await new Promise(r => setTimeout(r, 100));
          const result = await cdp.eval(`window.__lastRedeemResult`);
          if (result) {
            res = result;
            break;
          }
        }

        if (!res && attempt === 1) {
          await dismissDialogs(cdp);
          await new Promise(r => setTimeout(r, 1500));
        }
      } catch (err) {
        log(`${progress} Cảnh báo kết nối: ${err.message}. Đang thử kết nối lại...`);
        try {
          cdp.close();
          wsUrl = await findOrCreateTargetTab();
          cdp = new CDPClient(wsUrl);
          await cdp.connect();
          await injectHook(cdp);
        } catch (_) {}
      }
    }

    if (!res) {
      log(`${progress} ${code.padEnd(20)} -> [THẤT BẠI] Quá thời gian phản hồi (Timeout)`);
      failedCodes.push({ code, reason: 'Timeout' });
      if (config.removeInvalidCodes) {
        remainingCodes = remainingCodes.filter(c => c !== code);
      }
    } else if (res.code === 0) {
      log(`${progress} ${code.padEnd(20)} -> [THÀNH CÔNG] Đã nhận quà vào hòm thư!`);
      successfulCodes.push({ code, data: res.data });
      // Giữ lại code thành công
    } else {
      const msg = res.msg || 'Không hợp lệ';
      log(`${progress} ${code.padEnd(20)} -> [LOẠI BỎ] Lỗi ${res.code}: ${msg}`);
      failedCodes.push({ code, errorCode: res.code, reason: msg });
      if (config.removeInvalidCodes) {
        remainingCodes = remainingCodes.filter(c => c !== code);
      }
    }

    // Cập nhật file codes.txt ngay tức thời
    fs.writeFileSync(CODES_FILE, remainingCodes.join('\r\n'), 'utf8');

    // Đóng các thông báo popup trên trang web
    await dismissDialogs(cdp);

    // Chờ giữa các lần nhập
    await new Promise(r => setTimeout(r, config.delayBetweenCodesMs));
  }

  cdp.close();

  log('\n================================================================');
  log('                   KẾT QUẢ ĐÃ HOÀN TẤT!');
  log('================================================================');
  log(`- Tổng mã duy nhất đã quét: ${uniqueCodes.length}`);
  log(`- Số mã NHẬP THÀNH CÔNG  : ${successfulCodes.length}`);
  log(`- Số mã THẤT BẠI / LOẠI BỎ: ${failedCodes.length}`);
  log(`- File '${config.codesFile}' hiện còn lưu: ${remainingCodes.length} mã thành công`);
  log(`- Nhật ký chi tiết lưu tại : '${config.logFile}'`);
  log('================================================================\n');
}

main().catch(err => {
  log(`[Lỗi nghiêm trọng] ${err.stack || err.message}`);
  process.exit(1);
});
