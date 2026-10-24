/**
 * Delta Force Auto Redeem Tool
 * Tự động quét, lọc trùng và nhập mã Giftcode game Delta Force qua Chrome CDP
 * https://github.com/TrongBVD/delta-force-auto-redeem
 */

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

// Đọc cấu hình từ config.json
function loadConfig() {
  const configPath = path.join(__dirname, 'config.json');
  const defaults = {
    chromeDebugPort: 9222,
    codesFile: 'codes.txt',
    delayBetweenCodesMs: 1200,
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
    } catch {
      /* Bỏ qua nếu config bị lỗi cú pháp, dùng mặc định */
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
  } catch {
    /* Bỏ qua lỗi ghi log nếu file đang bị khóa */
  }
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

function sanitizeWsUrl(rawUrl, defaultPort = 9222) {
  const parsed = new URL(rawUrl);
  if (parsed.protocol !== 'ws:' && parsed.protocol !== 'wss:') {
    throw new Error('Chỉ chấp nhận giao thức ws:// hoặc wss://');
  }
  const allowedHosts = ['localhost', '127.0.0.1'];
  if (!allowedHosts.includes(parsed.hostname)) {
    throw new Error(`Địa chỉ host WebSocket không an toàn: ${parsed.hostname}`);
  }
  const port = parsed.port ? Number(parsed.port) : defaultPort;
  return `ws://127.0.0.1:${port}${parsed.pathname}`;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = sanitizeWsUrl(wsUrl, config.chromeDebugPort);
    this.ws = null;
    this.idCounter = 1;
    this.pending = new Map();
  }

  async connect() {
    const verifiedUrl = sanitizeWsUrl(this.wsUrl, config.chromeDebugPort);
    this.ws = new WebSocket(verifiedUrl);
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
      if (this.ws?.readyState !== WebSocket.OPEN) {
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
      try {
        this.ws.close();
      } catch {
        /* Bỏ qua lỗi đóng kết nối */
      }
    }
  }
}

async function findOrCreateTargetTab() {
  const baseUrl = `http://localhost:${config.chromeDebugPort}`;
  let targets;
  try {
    const res = await fetch(`${baseUrl}/json`);
    targets = await res.json();
  } catch {
    throw new Error(
      `Không thể kết nối tới Chrome port ${config.chromeDebugPort}!\n` +
      `-> Vui lòng chạy file '1_Mo_Chrome.bat' để mở Chrome trước khi chạy chương trình.`
    );
  }

  let target = targets.find(t => t.url?.includes('redeem.df.garena.sg'));
  if (!target) {
    console.log('[Thông tin] Chưa mở trang đổi quà Delta Force, đang tự động mở tab mới...');
    const createRes = await fetch(`${baseUrl}/json/new?${encodeURIComponent(config.targetUrl)}`, { method: 'PUT' });
    target = await createRes.json();
    await sleep(3000);
  }

  return sanitizeWsUrl(target.webSocketDebuggerUrl, config.chromeDebugPort);
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
        if (this.__url?.includes('RedeemCDKey')) {
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
      window.dialog?.hide?.();
    } catch {
      /* Bỏ qua nếu dialog chưa nạp */
    }
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
  return cdp.eval(`(() => {
    const logined = document.getElementById('logined');
    const username = document.querySelector('.username')?.innerText?.trim();
    const isVisible = (el) => el && window.getComputedStyle(el).display !== 'none';
    return {
      isLoggedIn: isVisible(logined) || (username && username.length > 0),
      username: username || ''
    };
  })()`);
}

function prepareCodes(filePath, autoBackup) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '# Dán các mã giftcode của bạn vào đây (mỗi mã 1 dòng)\n', 'utf8');
    log(`[Thông báo] Đã tạo file '${path.basename(filePath)}'. Hãy dán mã vào file rồi chạy lại!`);
    return [];
  }

  if (autoBackup) {
    const backupName = `${path.basename(filePath, path.extname(filePath))}_backup.txt`;
    const backupPath = path.join(path.dirname(filePath), backupName);
    fs.copyFileSync(filePath, backupPath);
    log(`[Sao lưu] Đã tạo bản sao lưu an toàn tại: ${backupName}`);
  }

  const rawLines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  const uniqueCodes = [];
  const seen = new Set();
  for (const line of rawLines) {
    const norm = line.toUpperCase();
    if (!seen.has(norm)) {
      seen.add(norm);
      uniqueCodes.push(line);
    }
  }

  log(`- Tổng số dòng mã đọc được: ${rawLines.length}`);
  log(`- Mã trùng lặp đã loại bỏ: ${rawLines.length - uniqueCodes.length}`);
  log(`- Số mã duy nhất hợp lệ cần xử lý: ${uniqueCodes.length}`);
  log('----------------------------------------------------------------');
  return uniqueCodes;
}

async function ensureUserLoggedIn(cdp) {
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
}

async function pollResult(cdp, attempts = 0, maxAttempts = 35) {
  const result = await cdp.eval(`window.__lastRedeemResult`);
  if (result) return result;
  if (attempts >= maxAttempts) return null;
  await sleep(100);
  return pollResult(cdp, attempts + 1, maxAttempts);
}

async function submitSingleCode(cdp, code) {
  await cdp.eval(`(() => {
    window.__lastRedeemResult = null;
    const input = document.querySelector('.exc-input');
    if (input) {
      input.value = '${code}';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const btn = document.querySelector('.btn-exchange');
    btn?.click?.();
  })()`);

  return pollResult(cdp);
}

async function executeRedeemWorkflow(cdp, uniqueCodes, appConfig) {
  const successfulCodes = [];
  const failedCodes = [];
  let remainingCodes = [...uniqueCodes];

  async function processCodeStep(i) {
    if (i >= uniqueCodes.length) return;
    const code = uniqueCodes[i];
    const progress = `[${i + 1}/${uniqueCodes.length}]`;
    const res = await submitSingleCode(cdp, code);

    if (!res) {
      log(`${progress} ${code.padEnd(20)} -> [THẤT BẠI] Quá thời gian phản hồi (Timeout)`);
      failedCodes.push({ code, reason: 'Timeout' });
      if (appConfig.removeInvalidCodes) {
        remainingCodes = remainingCodes.filter(c => c !== code);
      }
    } else if (res.code === 0) {
      log(`${progress} ${code.padEnd(20)} -> [THÀNH CÔNG] Đã nhận quà vào hòm thư!`);
      successfulCodes.push({ code, data: res.data });
    } else {
      const msg = res.msg || 'Không hợp lệ';
      log(`${progress} ${code.padEnd(20)} -> [LOẠI BỎ] Lỗi ${res.code}: ${msg}`);
      failedCodes.push({ code, errorCode: res.code, reason: msg });
      if (appConfig.removeInvalidCodes) {
        remainingCodes = remainingCodes.filter(c => c !== code);
      }
    }

    fs.writeFileSync(CODES_FILE, remainingCodes.join('\r\n'), 'utf8');
    await dismissDialogs(cdp);
    await sleep(appConfig.delayBetweenCodesMs);
    return processCodeStep(i + 1);
  }

  await processCodeStep(0);
  return { successfulCodes, failedCodes, remainingCodes };
}

async function main() {
  console.clear();
  log('================================================================');
  log('  DELTA FORCE AUTO REDEEM - TỰ ĐỘNG LỌC & NHẬP CODE GAME');
  log('================================================================');

  const uniqueCodes = prepareCodes(CODES_FILE, config.autoBackup);
  if (uniqueCodes.length === 0) return;

  log(`Đang kết nối tới Chrome port ${config.chromeDebugPort}...`);
  const wsUrl = await findOrCreateTargetTab();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  log('[OK] Đã kết nối thành công tới trang đổi quà Delta Force!');

  await injectHook(cdp);
  await dismissDialogs(cdp);
  await ensureUserLoggedIn(cdp);

  log('Bắt đầu quá trình nhập mã...\n');
  const results = await executeRedeemWorkflow(cdp, uniqueCodes, config);
  cdp.close();

  log('\n================================================================');
  log('                   KẾT QUẢ ĐÃ HOÀN TẤT!');
  log('================================================================');
  log(`- Tổng mã duy nhất đã quét: ${uniqueCodes.length}`);
  log(`- Số mã NHẬP THÀNH CÔNG  : ${results.successfulCodes.length}`);
  log(`- Số mã THẤT BẠI / LOẠI BỎ: ${results.failedCodes.length}`);
  log(`- File '${config.codesFile}' hiện còn lưu: ${results.remainingCodes.length} mã thành công`);
  log(`- Nhật ký chi tiết lưu tại : '${config.logFile}'`);
  log('================================================================\n');
}

main().catch(err => {
  log(`[Lỗi nghiêm trọng] ${err.stack || err.message}`);
  process.exit(1);
});
