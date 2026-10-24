/**
 * Delta Force Auto Redeem - Trình chạy trực tiếp trong Console F12 (Zero-Install)
 * Cách dùng: Mở https://redeem.df.garena.sg/vi/cdkgarena.html -> Bấm F12 -> Chọn Console -> Dán toàn bộ mã này vào rồi bấm Enter!
 */
(async function runDeltaForceRedeem() {
  const codes = [
    "PWC260419S65", "DFELEVATE16", "DFAWAKEN56", "PWC260418S84", "PWC260418S11",
    "PWC260418S72", "PWC260419S67", "PWC260419S84", "DFCCOPNOW111", "DFCCOPGIST88",
    "DFCCOPWOR1D", "DFCCOPTOBE03", "DFCCOPPL4Y3R5", "DFOSS260405B69", "DFOSS260405B58",
    "DFOSS260405B36", "DFBrilliant165", "DF1314754", "DFOS2ZK8VA", "DFOSL5Q7MN",
    "DFOSB4N9RD", "PWC260418S79", "DFbeacon030", "DFCL503", "DFanchor945",
    "DFDragon504", "DFCONCORD82", "daichienboba6228", "daichienboba2719", "daichienboba6167",
    "daichienmobile7095", "daichienmobile3325", "daichienmobile7362", "DFOutstanding056", "DFReliable732",
    "DFForever395", "DFExcellent659", "DFRemarkable103", "DFessence982", "DFserene218",
    "DFSpark119", "DFUltra220", "DFMagic057", "DFGalaxy250", "DFHorizon503",
    "TrickOrTreat", "DFNinja874", "DFRainbow356", "DFFlash260", "DFEnergy428",
    "DFoasis407", "DFeternity717", "DFFantasy742", "DFRocket825", "DFclover812",
    "DFHeroic668", "DFWizard309", "DFharbor738", "DFpromise643", "DFceleste516",
    "DFvivid061", "DFRL1017", "DFSH428", "DFvoyage901", "DFjubilee594",
    "DFmomentum423", "DFsymphony104", "DFHORIZON91", "DFINSIGHT48", "DFRESOLVE19",
    "DFEMBARK63", "DFmoment479", "DFASCEND72", "DFPARAGON41", "DFGENESIS05",
    "DFAXIOM33", "DFclarity152", "DFUT2025FINALS1549", "DFUT2025PLAYOFF5910", "DFUT2025PLAYOFF9163",
    "DFUT2025PLAYOFF2509", "DFUT2025PLAYOFF4827", "DFUT2025PLAYOFF8051", "DFUT2025PLAYOFF5732", "DFUT2025PLAYOFF1276",
    "GADFZebra", "DFOSS260404B57", "DFOSS260404B63", "DFOSS260404B47", "DFOSS260403B21",
    "DFOSS260403B33", "DFOSS260403B81", "DFOS7K2M9Q", "DFOSS260401B27", "DFOSS260401B61",
    "DFOSS260401B53", "DFOSS260402B19", "DFOSS260402B47", "DFOSS260402B73", "DFOS4G8H2J",
    "DFOS1P6W9Z", "PWC260419S79", "DFOSS260401B93", "DFOSS260401B85", "DFOSS260401B34",
    "DFOS3R9T6Y", "DFOS8B4C7D", "DFOS2F5G8H", "DFOS5J9K2L", "DFOS7M3N6P",
    "DFOS9Q2R4S", "DFOS1T6V8W", "DFOS4X7Z9A", "DFOS6B2C5D", "DFOS8E4F7G",
    "DFOS3H9J2K", "DFOS5L7M9N", "DFOS7P2Q4R", "DFOS9S6T8U", "DFOS2V4W6X",
    "DFOS4Y8Z1A", "DFOS6C3D5E", "DFOS8F7G9H", "DFOS1J4K6L", "DFOS3M8N2P",
    "DFOS5Q7R9S", "DFOS7T1U3V", "DFOS9W5X7Y", "DFOS2Z6A8B", "DFOS4C9D1E",
    "DFOS6F3G5H", "DFOS8J7K9L", "DFOS1M4N6P", "DFOS3Q8R2S", "DFOS5T7U9V",
    "DFOS7W1X3Y", "DFOS9Z5A7B", "DFOS2C6D8E", "DFOS4F9G1H", "DFOS6J3K5L",
    "DFOS8M7N9P", "DFOS1Q4R6S", "DFOS3T8U2V", "DFOS5W7X9Y", "DFOS7Z1A3B",
    "DFOS9C5D7E", "DFOS2F6G8H", "DFOS4J9K1L", "DFOS6M3N5P", "DFOS8Q7R9S",
    "DFOS1T4U6V", "DFOS3W8X2Y", "DFOS5Z7A9B", "DFOS7C1D3E", "DFOS9F5G7H",
    "DFOS2J6K8L", "DFOS4M9N1P", "DFOS6Q3R5S", "DFOS8T7U9V", "DFOS1W4X6Y",
    "DFOS3Z8A2B", "DFOS5C7D9E", "DFOS7F1G3H", "DFOS9J5K7L", "DFOS2M6N8P",
    "DFOS4Q9R1S", "DFOS6T3U5V", "DFOS8W7X9Y", "DFOS1Z4A6B", "DFOS3C8D2E",
    "DFOS5F7G9H", "DFOS7J1K3L", "DFOS9M5N7P", "DFOS2Q6R8S", "DFOS4T9U1V",
    "DFOS6W3X5Y", "DFOS8Z7A9B", "DFOS1C4D6E", "DFOS3F8G2H", "DFOS5J7K9L",
    "DFOS7M1N3P", "DFOS9Q5R7S", "DFOS2T6U8V", "DFOS4W9X1Y", "DFOS6Z3A5B",
    "DFOS8C7D9E", "DFOS1F4G6H", "DFOS3J8K2L", "DFOS5M7N9P", "DFOS7Q1R3S",
    "DFOS9T5U7V", "DFOS2W6X8Y", "DFOS4Z9A1B", "DFOS6C3D5F", "DFOS8G7H9J",
    "DFOS1K4L6M", "DFOS3P8Q2R", "DFOS5S7T9U", "DFOS7V1W3X", "DFOS9Y5Z7A",
    "DFOS2B6C8D", "DFOS4E9F1G", "DFOS6H3J5K", "DFOS8L7M9N", "DFOS1P4Q6R",
    "DFOS3S8T2U", "DFOS5V7W9X", "DFOS7Y1Z3A", "DFOS9B5C7D", "DFOS2E6F8G",
    "DFOS4H9J1K", "DFOS6L3M5N", "DFOS8P7Q9R", "DFOS1S4T6U", "DFOS3V8W2X",
    "DFOS5Y7Z9A", "DFOS7B1C3D", "PzDArbxYuL2f6RcaWE7T", "DFUT2025FINALS4216", "DFUZIRAT47"
  ];

  function hookNetworkInterception() {
    if (window.__redeemHooked) return;
    window.__redeemHooked = true;
    window.__lastRedeemResult = null;
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url) {
      this.__url = url;
      return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      if (this.__url?.includes('RedeemCDKey')) {
        this.addEventListener('load', () => {
          try {
            window.__lastRedeemResult = JSON.parse(this.responseText);
          } catch {
            /* Phản hồi không phải dạng json */
            window.__lastRedeemResult = { error: this.responseText };
          }
        });
      }
      return origSend.apply(this, arguments);
    };
  }

  function dismissDialogs() {
    try {
      window.dialog?.hide?.();
    } catch {
      /* Bỏ qua nếu dialog không mở */
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
  }

  function createStatusUI(totalCount) {
    const ui = document.createElement('div');
    ui.style.cssText = 'position:fixed;top:20px;right:20px;z-index:999999;background:#1e1e24;color:#fff;padding:16px 20px;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.5);font-family:sans-serif;font-size:14px;width:320px;border:1px solid #444;';
    ui.innerHTML = `
      <div style="font-weight:bold;font-size:16px;margin-bottom:8px;color:#00ff88;display:flex;justify-content:space-between;">
        <span>🎮 Delta Force Auto Redeem</span>
        <span id="df-close" style="cursor:pointer;color:#aaa;">✖</span>
      </div>
      <div style="margin-bottom:6px;">Tiến trình: <span id="df-progress" style="font-weight:bold;">0/${totalCount}</span></div>
      <div style="background:#333;border-radius:6px;height:10px;overflow:hidden;margin-bottom:10px;">
        <div id="df-bar" style="background:#00ff88;width:0%;height:100%;transition:width 0.3s;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
        <span style="color:#00ff88;">Thành công: <b id="df-ok">0</b></span>
        <span style="color:#ff5555;">Thất bại: <b id="df-fail">0</b></span>
      </div>
      <div id="df-status" style="font-size:12px;color:#bbb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#2a2a32;padding:6px 10px;border-radius:6px;">Đang chuẩn bị...</div>
    `;
    document.body.appendChild(ui);
    document.getElementById('df-close').onclick = () => ui.remove();
    return ui;
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function pollRedeemResult(attempts = 0, maxAttempts = 35) {
    if (window.__lastRedeemResult) {
      return window.__lastRedeemResult;
    }
    if (attempts >= maxAttempts) {
      return null;
    }
    await delay(100);
    return pollRedeemResult(attempts + 1, maxAttempts);
  }

  async function executeSingleCode(code) {
    window.__lastRedeemResult = null;
    const input = document.querySelector('.exc-input');
    if (!input) return null;

    input.value = code;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    const btn = document.querySelector('.btn-exchange');
    btn?.click?.();

    return pollRedeemResult();
  }

  hookNetworkInterception();
  const inputEl = document.querySelector('.exc-input');
  if (!inputEl) {
    alert('Không tìm thấy ô nhập code! Hãy đảm bảo bạn đang ở trang: https://redeem.df.garena.sg/vi/cdkgarena.html');
    return;
  }

  createStatusUI(codes.length);
  const stats = { ok: 0, fail: 0 };
  console.log(`[Auto Redeem] Bắt đầu nhập ${codes.length} mã...`);

  async function processCodeRecursively(index) {
    if (index >= codes.length) {
      document.getElementById('df-status').innerText = '🎉 Hoàn tất nhận thưởng!';
      document.getElementById('df-status').style.color = '#00ff88';
      alert(`Đã hoàn tất! Nhận thành công: ${stats.ok} mã. Vui lòng kiểm tra hòm thư in-game!`);
      return;
    }

    const code = codes[index];
    document.getElementById('df-progress').innerText = `${index + 1}/${codes.length}`;
    document.getElementById('df-bar').style.width = `${((index + 1) / codes.length * 100).toFixed(1)}%`;
    document.getElementById('df-status').innerText = `Đang thử: ${code}`;

    const res = await executeSingleCode(code);
    if (res?.code === 0) {
      stats.ok++;
      document.getElementById('df-ok').innerText = String(stats.ok);
      console.log(`[${index + 1}/${codes.length}] ${code} -> THÀNH CÔNG!`);
    } else {
      stats.fail++;
      document.getElementById('df-fail').innerText = String(stats.fail);
      console.log(`[${index + 1}/${codes.length}] ${code} -> ${res?.msg ?? 'Hết giờ'}`);
    }

    dismissDialogs();
    await delay(1200);
    return processCodeRecursively(index + 1);
  }

  await processCodeRecursively(0);
})().catch(err => console.error('[Delta Force Auto Redeem Error]:', err));
