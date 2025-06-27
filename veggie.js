// ลูกเล่น vector + UX สนุกๆ เหมือนเล่นเกม + ปุ่มรีเฟรช + Toast + Dark Mode + Navigation

document.addEventListener('DOMContentLoaded', () => {
  // --- ใบไม้ลอยแบบปลิวตกกระจายทั่วจอ ผ่อนคลาย ---
  for (let i = 0; i < 16; i++) createFallingLeaf(); // เพิ่มจำนวนใบไม้
  function createFallingLeaf() {
    const leaf = document.createElement('div');
    leaf.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32">
        <ellipse cx="16" cy="16" rx="14" ry="8" fill="#4CAF50" opacity="0.7"/>
        <path d="M16 16 Q18 10 24 8" stroke="#388E3C" stroke-width="2" fill="none"/>
      </svg>
    `;
    leaf.style.position = 'fixed';
    // กระจายตำแหน่งเริ่มต้นแบบสุ่มทั่วจอ
    leaf.style.left = Math.random() * window.innerWidth + 'px';
    leaf.style.top = (-40 - Math.random() * window.innerHeight * 0.7) + 'px';
    leaf.style.pointerEvents = 'none';
    leaf.style.zIndex = 1;
    leaf.style.opacity = 0.7;
    leaf.style.transition = 'opacity 1s';
    document.body.appendChild(leaf);

    animateFallingLeaf(leaf);
  }

  function animateFallingLeaf(leaf) {
    let x = parseFloat(leaf.style.left);
    let y = parseFloat(leaf.style.top);
    let angle = Math.random() * 360;
    let sway = Math.random() * 100;
    const swayAmp = 30 + Math.random() * 40;
    const swaySpeed = 0.7 + Math.random() * 0.7;
    const fallSpeed = 0.3 + Math.random() * 0.5;
    const rotateSpeed = 0.7 + Math.random() * 1.2;

    function fall() {
      sway += swaySpeed;
      x += Math.sin(sway / 18) * 0.7;
      y += fallSpeed + Math.abs(Math.cos(sway / 25)) * 0.8;
      angle += rotateSpeed * Math.sin(sway / 35);

      leaf.style.left = x + Math.sin(sway / 12) * swayAmp + 'px';
      leaf.style.top = y + 'px';
      leaf.style.transform = `rotate(${angle}deg)`;

      if (y < window.innerHeight + 40) {
        requestAnimationFrame(fall);
      } else {
        // fade out แล้วปลูกใหม่
        leaf.style.opacity = 0;
        setTimeout(() => {
          leaf.remove();
          createFallingLeaf();
        }, 1000);
      }
    }
    fall();
  }

  // --- ผัก/ไอคอน sensor ขยับ ---
  const sensorIcons = document.querySelectorAll('.sensor-icon');
  sensorIcons.forEach(icon => {
    icon.style.transition = 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)';
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'rotate(-20deg) scale(1.2)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'rotate(0) scale(1)';
    });
  });

  // --- Advice card เด้งเบาๆ ---
  const advice = document.getElementById('advice');
  if (advice) {
    advice.style.transition = 'transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)';
    setInterval(() => {
      advice.style.transform = 'scale(1.04)';
      setTimeout(() => advice.style.transform = 'scale(1)', 200);
    }, 3500);
  }

  // --- ปุ่มรีเฟรชข้อมูล ---
  const refreshButton = document.createElement('button');
  refreshButton.innerText = 'รีเฟรชข้อมูล';
  refreshButton.onclick = () => {
    showToast('กำลังรีเฟรช...');
    setTimeout(() => location.reload(), 600);
  };
  refreshButton.style.cssText = `
    background:#4CAF50;
    color:#fff;
    border:none;
    padding:10px 24px;
    border-radius:8px;
    font-family:Kanit;
    font-size:1em;
    box-shadow:0 2px 8px #8e24aa22;
    cursor:pointer;
    transition:background 0.2s;
    position:fixed;
    bottom:24px;
    right:24px;
    z-index:100;
  `;
  document.body.appendChild(refreshButton);

  // --- Toast แจ้งเตือน ---
  function showToast(msg) {
    let toast = document.createElement('div');
    toast.innerText = msg;
    toast.style.cssText = `
      position:fixed;bottom:80px;right:32px;
      background:#8E24AA;color:#fff;padding:12px 24px;
      border-radius:24px;font-family:Kanit;font-size:1em;
      box-shadow:0 2px 8px #4caf5022;z-index:999;opacity:0.95;
      animation: fadein 0.3s, fadeout 0.5s 1.7s;
    `;
    toast.style.pointerEvents = 'none';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }

  // --- Dark Mode Toggle ---
  const darkBtn = document.createElement('button');
  darkBtn.innerHTML = '<span class="material-icons">dark_mode</span>';
  darkBtn.title = 'สลับโหมดกลางคืน';
  darkBtn.style.cssText = `
    background:#8E24AA;
    color:#fff;
    border:none;
    padding:10px 14px;
    border-radius:50%;
    font-size:1.3em;
    box-shadow:0 2px 8px #4caf5022;
    cursor:pointer;
    position:fixed;
    top:24px;
    right:24px;
    z-index:101;
    transition:background 0.2s;
  `;
  document.body.appendChild(darkBtn);

  darkBtn.onclick = () => {
    document.body.classList.toggle('dark-mode');
    showToast(document.body.classList.contains('dark-mode') ? 'เปิดโหมดกลางคืน' : 'ปิดโหมดกลางคืน');
  };

  // --- Navigation Bar (Demo) ---
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <div id="nav-bar" style="display:flex;justify-content:center;gap:24px;padding:12px 0;background:linear-gradient(90deg,#4CAF50 60%,#8E24AA 100%);color:#fff;position:sticky;top:0;z-index:10;position:relative;">
      <span class="nav-item active" data-menu="dashboard" style="cursor:pointer;font-family:Kanit;position:relative;">Dashboard</span>
      <span class="nav-item" data-menu="history" style="cursor:pointer;font-family:Kanit;position:relative;">History</span>
      <span class="nav-item" data-menu="about" style="cursor:pointer;font-family:Kanit;position:relative;">About</span>
      <svg id="nav-underline" width="80" height="8" style="position:absolute;bottom:0;left:0;transition:all 0.5s cubic-bezier(.68,-0.55,.27,1.55);pointer-events:none;">
        <path d="" fill="url(#navGradient)" />
        <defs>
          <linearGradient id="navGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#4CAF50"/>
            <stop offset="100%" stop-color="#8E24AA"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  `;
  document.body.prepend(nav);

  // --- ลูกเล่นเวกเตอร์ลื่นไหลตอนเลือกเมนู ---
  setTimeout(() => {
    const navBar = document.getElementById('nav-bar');
    const navItems = navBar.querySelectorAll('.nav-item');
    const navUnderline = document.getElementById('nav-underline');
    function moveUnderline(target) {
      const rect = target.getBoundingClientRect();
      const parentRect = navBar.getBoundingClientRect();
      navUnderline.style.width = rect.width + 24 + 'px';
      navUnderline.style.left = (rect.left - parentRect.left - 12) + 'px';
      navUnderline.style.display = 'block';
      navUnderline.querySelector('path').setAttribute('d', `
        M12,4 Q${rect.width/2+12},12 ${rect.width+12},4 Q${rect.width/2+12},0 12,4 Z
      `);
    }
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        moveUnderline(item);
        // เพิ่มลูกเล่นเวกเตอร์ เช่น pulse
        item.animate([
          { transform: 'scale(1)', filter: 'drop-shadow(0 0 0 #8E24AA)' },
          { transform: 'scale(1.12)', filter: 'drop-shadow(0 4px 12px #8E24AA88)' },
          { transform: 'scale(1)', filter: 'drop-shadow(0 0 0 #8E24AA)' }
        ], { duration: 500, easing: 'cubic-bezier(.68,-0.55,.27,1.55)' });
      });
    });
    // เริ่มต้น
    moveUnderline(navBar.querySelector('.nav-item.active'));
  }, 100);

  // --- Dark Mode CSS ---
  const darkStyle = document.createElement('style');
  darkStyle.innerHTML = `
    body.dark-mode {
      background: #181828 !important;
      color: #eee !important;
    }
    body.dark-mode .dashboard, body.dark-mode .chart-container {
      background: #23233a !important;
      color: #eee !important;
      box-shadow: 0 4px 24px #0004 !important;
    }
    body.dark-mode .sensor-card {
      background: #23233a !important;
      box-shadow: 0 2px 8px #0002 !important;
    }
    body.dark-mode .advice {
      background: #4CAF5011 !important;
      color: #4CAF50 !important;
    }
    body.dark-mode .footer {
      color: #aaa !important;
    }
    body.dark-mode nav {
      background: linear-gradient(90deg,#23233a 60%,#4CAF50 100%) !important;
      color: #fff !important;
    }
  `;
  document.head.appendChild(darkStyle);

  // --- ลูกเล่นเวคเตอร์คลื่นขยับได้ในกราฟ (Wave Overlay) ---
  // เพิ่ม wave overlay ให้กับกราฟวงกลม
  function addWaveToChart() {
    const chartBox = document.querySelector('.chart-container');
    if (!chartBox || chartBox.querySelector('.wave-svg')) return;

    const wave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wave.setAttribute('width', '180');
    wave.setAttribute('height', '180');
    wave.setAttribute('viewBox', '0 0 180 180');
    wave.classList.add('wave-svg');
    wave.style.position = 'absolute';
    wave.style.left = '50%';
    wave.style.top = '50%';
    wave.style.transform = 'translate(-50%, -50%)';
    wave.style.zIndex = 2;
    wave.style.pointerEvents = 'none';
    wave.innerHTML = `
      <defs>
        <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#4CAF50"/>
          <stop offset="100%" stop-color="#8E24AA"/>
        </linearGradient>
      </defs>
      <path id="wavePath"
        d="M0,120 Q45,110 90,120 T180,120 V180 H0 Z"
        fill="url(#waveGradient)" opacity="0.55">
        <animate attributeName="d"
          dur="3s"
          repeatCount="indefinite"
          values="
            M0,120 Q45,110 90,120 T180,120 V180 H0 Z;
            M0,120 Q45,130 90,110 T180,120 V180 H0 Z;
            M0,120 Q45,110 90,120 T180,120 V180 H0 Z
          "
        />
      </path>
    `;
    chartBox.appendChild(wave);
  }

  // เรียกใช้ทุกครั้งหลังกราฟถูกสร้าง
  const observer = new MutationObserver(() => {
    addWaveToChart();
  });
  const chartContainer = document.querySelector('.chart-container');
  if (chartContainer) {
    observer.observe(chartContainer, { childList: true });
    addWaveToChart();
  }
});