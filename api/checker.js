
export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = /Mozilla|Chrome|Safari|Edg|Firefox|Opera|MSIE|Trident/i.test(userAgent);
  const query = req.query;
  
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  

  if (!isBrowser) {
    try {
      const fs = require('fs');
      const path = require('path');
      const scriptPath = path.join(process.cwd(), 'api', 'sekerip.lua');
      
      if (!fs.existsSync(scriptPath)) {
        return res.status(404).send('Script not found');
      }
      
      const script = fs.readFileSync(scriptPath, 'utf8');
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(script);
    } catch (error) {
      console.error('Error reading script:', error);
      res.status(500).send('Internal Server Error');
    }
    return;
  }
  

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const hasConsent = query.consent === 'true' || req.headers.cookie?.includes('consent=true');
  
  if (hasConsent) {
    res.setHeader('Set-Cookie', 'consent=true; Max-Age=86400; HttpOnly; SameSite=Lax');
    res.status(403).send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mpan HUB | Access Denied</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 100%);
      font-family: 'Montserrat', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 40%, rgba(157,78,221,0.15) 0%, transparent 50%);
      pointer-events: none;
    }
    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #9D4EDD, #FF6BFF, #9D4EDD, transparent);
      animation: scan 8s linear infinite;
      pointer-events: none;
    }
    @keyframes scan {
      0% { top: -10px; }
      100% { top: 110vh; }
    }
    .particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #9D4EDD;
      border-radius: 50%;
      opacity: 0;
      animation: floatParticle linear infinite;
    }
    @keyframes floatParticle {
      0% { transform: translateY(0); opacity: 0; }
      10% { opacity: 0.5; }
      90% { opacity: 0.5; }
      100% { transform: translateY(-1000px); opacity: 0; }
    }
    .container {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 500px;
      padding: 20px;
      animation: fadeInUp 0.8s ease-out;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .denied-card {
      background: rgba(20, 15, 35, 0.85);
      backdrop-filter: blur(12px);
      border-radius: 32px;
      padding: 50px 30px;
      text-align: center;
      border: 2px solid rgba(255, 68, 68, 0.5);
      box-shadow: 0 0 50px rgba(255, 68, 68, 0.2);
      position: relative;
      overflow: hidden;
    }
    .denied-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,68,68,0.1) 0%, transparent 70%);
      animation: rotate 20s linear infinite;
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .denied-icon {
      font-size: 80px;
      color: #ff4444;
      margin-bottom: 20px;
      animation: glitch 0.3s infinite;
    }
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(2px, -2px); }
      60% { transform: translate(-2px, -2px); }
      80% { transform: translate(2px, 2px); }
      100% { transform: translate(0); }
    }
    .denied-title {
      font-size: 3rem;
      color: #ff4444;
      margin-bottom: 10px;
      font-family: 'Orbitron', monospace;
    }
    .denied-text {
      color: #888;
      margin-bottom: 20px;
    }
    .denied-ip {
      font-size: 12px;
      color: #555;
      margin-top: 30px;
      padding: 10px;
      background: rgba(0,0,0,0.3);
      border-radius: 20px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="particles" id="particles"></div>
  <div class="container">
    <div class="denied-card">
      <div class="denied-icon">
        <i class="fas fa-ban"></i>
      </div>
      <h1 class="denied-title">ACCESS DENIED</h1>
      <p class="denied-text">Your access has been logged and verified.</p>
      <div class="denied-ip">
        <i class="fas fa-laptop-code"></i> IP: ${ip}
      </div>
    </div>
  </div>
  <script>
    function createParticles() {
      const container = document.querySelector('.particles');
      for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = \`
          left: \${Math.random() * 100}%;
          top: \${Math.random() * 100}%;
          width: \${Math.random() * 3 + 1}px;
          height: \${Math.random() * 3 + 1}px;
          background: \${Math.random() > 0.5 ? '#9D4EDD' : '#FF6BFF'};
          animation-duration: \${Math.random() * 15 + 8}s;
          animation-delay: \${Math.random() * 5}s;
        \`;
        container.appendChild(p);
      }
    }
    createParticles();
  </script>
</body>
</html>`);
    return;
  }
  
  // ==================== CONSENT PAGE (BELUM CONSENT) ====================
  res.status(200).setHeader('Content-Type', 'text/html').send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Mpan HUB | FREE PREMIUM SCRIPT</title>
  <link rel="icon" type="image/png" href="https://img.icons8.com/fluency/96/000000/roblox.png">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 100%);
      font-family: 'Montserrat', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 40%, rgba(157,78,221,0.2) 0%, transparent 55%),
                  radial-gradient(circle at 70% 60%, rgba(255,107,255,0.15) 0%, transparent 60%);
      pointer-events: none;
      z-index: 0;
    }
    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #9D4EDD, #FF6BFF, #9D4EDD, transparent);
      animation: scan 8s linear infinite;
      pointer-events: none;
      z-index: 999;
    }
    @keyframes scan {
      0% { top: -10px; }
      100% { top: 110vh; }
    }
    .particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .particle {
      position: absolute;
      background: radial-gradient(circle, #9D4EDD, #FF6BFF);
      border-radius: 50%;
      opacity: 0;
      animation: floatParticle linear infinite;
    }
    @keyframes floatParticle {
      0% { transform: translateY(0); opacity: 0; }
      15% { opacity: 0.7; }
      85% { opacity: 0.6; }
      100% { transform: translateY(-1000px) translateX(40px); opacity: 0; }
    }
    .container {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 520px;
      padding: 20px;
      animation: fadeInUp 0.9s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(60px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .glitch-card {
      background: rgba(20, 15, 35, 0.82);
      backdrop-filter: blur(14px);
      border-radius: 40px;
      padding: 48px 32px;
      text-align: center;
      border: 2px solid rgba(157, 78, 221, 0.6);
      box-shadow: 0 0 45px rgba(157, 78, 221, 0.3);
      position: relative;
      overflow: hidden;
    }
    .glitch-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(157,78,221,0.2) 0%, transparent 70%);
      animation: rotate 22s linear infinite;
    }
    .glitch-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
      animation: shine 5s infinite;
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes shine {
      0% { left: -100%; }
      20% { left: 100%; }
      100% { left: 200%; }
    }
    .glitch-card > * { position: relative; z-index: 2; }
    .logo { margin-bottom: 28px; animation: pulseLogo 3s ease-in-out infinite; }
    @keyframes pulseLogo {
      0%,100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(157,78,221,0.6)); }
      50% { transform: scale(1.03); filter: drop-shadow(0 0 22px rgba(157,78,221,0.9)); }
    }
    .logo-icon { font-size: 88px; background: linear-gradient(135deg, #9D4EDD, #FF6BFF); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 0 20px rgba(157,78,221,0.7)); }
    .logo-text { font-size: 2.7rem; font-weight: 800; background: linear-gradient(135deg, #FFFFFF, #9D4EDD, #FF6BFF); -webkit-background-clip: text; background-clip: text; color: transparent; letter-spacing: 3px; margin-top: 8px; font-family: 'Orbitron', monospace; }
    .logo-sub { color: rgba(210, 190, 255, 0.8); font-size: 0.8rem; letter-spacing: 3px; margin-top: 6px; }
    .form-title { font-size: 2rem; font-weight: 800; margin-bottom: 12px; font-family: 'Orbitron', monospace; background: linear-gradient(120deg, #fff, #e0aaff); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .form-desc { color: rgba(210, 190, 255, 0.75); margin-bottom: 32px; font-size: 0.95rem; }
    .input-group { margin-bottom: 28px; text-align: left; }
    .input-label { display: block; margin-bottom: 8px; color: #cdc9e6; font-size: 0.85rem; letter-spacing: 1.2px; font-weight: 600; }
    .input-label i { color: #9D4EDD; margin-right: 8px; }
    .input-field { width: 100%; padding: 15px 22px; background: rgba(25, 18, 40, 0.85); border: 2px solid rgba(157, 78, 221, 0.4); border-radius: 60px; color: #f0eefc; font-size: 1rem; transition: all 0.25s; font-family: 'Montserrat', sans-serif; }
    .input-field:focus { outline: none; border-color: #9D4EDD; box-shadow: 0 0 18px rgba(157, 78, 221, 0.5); background: rgba(30, 20, 50, 0.95); }
    .input-field::placeholder { color: rgba(210, 190, 255, 0.4); }
    .discord-btn { width: 100%; padding: 15px 20px; background: linear-gradient(135deg, #5865F2, #404EED); border: none; border-radius: 60px; color: white; font-size: 1.15rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 14px; transition: all 0.35s; margin-bottom: 22px; position: relative; overflow: hidden; box-shadow: 0 6px 18px rgba(88, 101, 242, 0.3); }
    .discord-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent); transition: 0.6s; }
    .discord-btn:hover::before { left: 100%; }
    .discord-btn:hover { transform: translateY(-4px); box-shadow: 0 15px 35px rgba(88, 101, 242, 0.5); }
    .discord-btn i { font-size: 1.4rem; }
    .loading-spinner { display: none; width: 38px; height: 38px; border: 3px solid rgba(157,78,221,0.2); border-top: 3px solid #5865F2; border-right: 3px solid #9D4EDD; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 20px auto; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .info-text { color: rgba(210, 190, 255, 0.55); font-size: 0.75rem; margin-top: 20px; line-height: 1.5; }
    .info-text a { color: #9D4EDD; text-decoration: none; font-weight: 600; border-bottom: 1px dashed rgba(157,78,221,0.5); }
    .info-text a:hover { color: #FF6BFF; text-shadow: 0 0 6px #FF6BFF; }
    @media (max-width: 550px) {
      .glitch-card { padding: 36px 20px; }
      .logo-text { font-size: 2rem; }
      .form-title { font-size: 1.7rem; }
      .logo-icon { font-size: 68px; }
    }
  </style>
</head>
<body>
  <div class="particles" id="particles"></div>
  <div class="container">
    <div class="glitch-card">
      <div class="logo">
        <div class="logo-icon"><i class="fas fa-crown"></i></div>
        <div class="logo-text">Mpan HUB</div>
        <div class="logo-sub">FREE PREMIUM SCRIPT</div>
      </div>
      <div class="form-title">Enter The Hub</div>
      <div class="form-desc">Verify your identity to enter the matrix</div>
      <div class="input-group">
        <label class="input-label"><i class="fas fa-user-astronaut"></i> ROBLOX USERNAME</label>
        <input type="text" class="input-field" id="robloxUsername" placeholder="e.g., MpanGod, Nexuz_Dev" autocomplete="off">
      </div>
      <button class="discord-btn" id="verifyBtn"><i class="fab fa-discord"></i> CONTINUE WITH DISCORD</button>
      <div id="loading" class="loading-spinner"></div>
      <div class="info-text">
        <i class="fas fa-shield-alt"></i> Verification ensures secure access & prevents bots.<br>
        Join our community: <a href="https://discord.gg/A8M32E7RgU" target="_blank">Mpan HUB Private Server</a>
      </div>
    </div>
  </div>
  <script>
    function createParticles() {
      const container = document.getElementById('particles');
      for (let i = 0; i < 70; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 1.5;
        p.style.cssText = \`left: \${Math.random() * 100}%; top: \${Math.random() * 100}%; width: \${size}px; height: \${size}px; background: radial-gradient(circle, \${Math.random() > 0.6 ? '#9D4EDD' : '#FF6BFF'}, \${Math.random() > 0.5 ? '#C77DFF' : '#FFB3FF'}); animation-duration: \${Math.random() * 18 + 12}s; animation-delay: \${Math.random() * 8}s;\`;
        container.appendChild(p);
      }
    }
    function verify() {
      const username = document.getElementById('robloxUsername').value.trim();
      const btn = document.getElementById('verifyBtn');
      const loading = document.getElementById('loading');
      if (!username) { alert('Please enter your Roblox username!'); return; }
      if (!/^[a-zA-Z0-9_]{3,25}$/.test(username)) { alert('Username must be 3-25 characters (letters, numbers, underscore)'); return; }
      btn.disabled = true;
      btn.style.opacity = '0.7';
      loading.style.display = 'block';
      localStorage.setItem('mpan_hub_username', username);
      setTimeout(() => {
        window.open('https://discord.gg/A8M32E7RgU', '_blank');
        setTimeout(() => {
          window.location.href = window.location.pathname + '?consent=true';
        }, 800);
      }, 1200);
    }
    function loadSavedUsername() {
      const saved = localStorage.getItem('mpan_hub_username');
      if (saved) document.getElementById('robloxUsername').value = saved;
    }
    document.getElementById('verifyBtn').addEventListener('click', verify);
    createParticles();
    loadSavedUsername();
  </script>
</body>
</html>`);
}
    `);
  }
}
