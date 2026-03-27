
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
  const acceptLanguage = req.headers['accept-language'] || 'unknown';
  const hasConsent = query.consent === 'true' || req.headers.cookie?.includes('consent=true');
  
  
  if (hasConsent) {
    res.setHeader('Set-Cookie', 'consent=true; Max-Age=86400; HttpOnly; SameSite=Lax');
    res.status(403).send(`
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Mpan HUB | FREE PREMIUM SCRIPT</title>
  <link rel="icon" type="image/png" href="https://img.icons8.com/fluency/96/000000/roblox.png">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <!-- Font Awesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 100%);
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
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
      background: 
        radial-gradient(circle at 30% 40%, rgba(157,78,221,0.2) 0%, transparent 55%),
        radial-gradient(circle at 70% 60%, rgba(255,107,255,0.15) 0%, transparent 60%),
        repeating-linear-gradient(45deg, rgba(157,78,221,0.03) 0px, rgba(157,78,221,0.03) 2px, transparent 2px, transparent 8px);
      pointer-events: none;
      z-index: 0;
      animation: bgGlitchShift 10s infinite;
    }

    @keyframes bgGlitchShift {
      0% { transform: translate(0); opacity: 0.9; }
      20% { transform: translate(-3px, 2px); }
      40% { transform: translate(4px, -1px); }
      60% { transform: translate(-2px, -2px); }
      80% { transform: translate(2px, 3px); }
      100% { transform: translate(0); }
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
      box-shadow: 0 0 10px #9D4EDD;
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
      filter: blur(0.5px);
      animation: floatParticle linear infinite;
    }

    @keyframes floatParticle {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      15% {
        opacity: 0.7;
      }
      85% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-1000px) translateX(40px) rotate(720deg);
        opacity: 0;
      }
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
      from {
        opacity: 0;
        transform: translateY(60px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .glitch-card {
      background: rgba(20, 15, 35, 0.82);
      backdrop-filter: blur(14px);
      border-radius: 40px;
      padding: 48px 32px;
      text-align: center;
      border: 2px solid rgba(157, 78, 221, 0.6);
      box-shadow: 0 0 45px rgba(157, 78, 221, 0.3), 0 25px 45px -12px rgba(0, 0, 0, 0.6);
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.3s ease;
    }

    .glitch-card:hover {
      box-shadow: 0 0 60px rgba(157, 78, 221, 0.5);
    }

    .glitch-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(157, 78, 221, 0.2) 0%, rgba(255, 107, 255, 0.05) 40%, transparent 70%);
      animation: rotate 22s linear infinite;
      pointer-events: none;
    }

    .glitch-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
      animation: shine 5s infinite;
      pointer-events: none;
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes shine {
      0% {
        left: -100%;
      }
      20% {
        left: 100%;
      }
      100% {
        left: 200%;
      }
    }

    .glitch-card > * {
      position: relative;
      z-index: 2;
    }

    .logo {
      margin-bottom: 28px;
      animation: pulseLogo 3s ease-in-out infinite;
    }

    @keyframes pulseLogo {
      0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 0 8px rgba(157, 78, 221, 0.6));
      }
      50% {
        transform: scale(1.03);
        filter: drop-shadow(0 0 22px rgba(157, 78, 221, 0.9));
      }
    }

    .logo-icon {
      font-size: 88px;
      background: linear-gradient(135deg, #9D4EDD, #FF6BFF, #C77DFF);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      filter: drop-shadow(0 0 20px rgba(157, 78, 221, 0.7));
      transition: transform 0.2s;
    }

    .logo-text {
      font-size: 2.7rem;
      font-weight: 800;
      background: linear-gradient(135deg, #FFFFFF, #9D4EDD, #FF6BFF);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: 3px;
      margin-top: 8px;
      font-family: 'Orbitron', monospace;
      text-shadow: 0 0 12px rgba(157,78,221,0.5);
    }

    .logo-sub {
      color: rgba(210, 190, 255, 0.8);
      font-size: 0.8rem;
      letter-spacing: 3px;
      margin-top: 6px;
      font-weight: 500;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 800;
      color: white;
      margin-bottom: 12px;
      font-family: 'Orbitron', monospace;
      letter-spacing: -0.5px;
      background: linear-gradient(120deg, #fff, #e0aaff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .form-desc {
      color: rgba(210, 190, 255, 0.75);
      margin-bottom: 32px;
      font-size: 0.95rem;
      font-weight: 500;
    }

    /* INPUT GROUP */
    .input-group {
      margin-bottom: 28px;
      text-align: left;
    }

    .input-label {
      display: block;
      margin-bottom: 8px;
      color: #cdc9e6;
      font-size: 0.85rem;
      letter-spacing: 1.2px;
      font-weight: 600;
    }

    .input-label i {
      color: #9D4EDD;
      margin-right: 8px;
      font-size: 0.9rem;
    }

    .input-field {
      width: 100%;
      padding: 15px 22px;
      background: rgba(25, 18, 40, 0.85);
      border: 2px solid rgba(157, 78, 221, 0.4);
      border-radius: 60px;
      color: #f0eefc;
      font-size: 1rem;
      transition: all 0.25s ease;
      font-family: 'Montserrat', sans-serif;
      backdrop-filter: blur(4px);
    }

    .input-field:focus {
      outline: none;
      border-color: #9D4EDD;
      box-shadow: 0 0 18px rgba(157, 78, 221, 0.5);
      background: rgba(30, 20, 50, 0.95);
    }

    .input-field::placeholder {
      color: rgba(210, 190, 255, 0.4);
      font-weight: 400;
    }

    .discord-btn {
      width: 100%;
      padding: 15px 20px;
      background: linear-gradient(135deg, #5865F2, #404EED);
      border: none;
      border-radius: 60px;
      color: white;
      font-size: 1.15rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      transition: all 0.35s ease;
      font-family: 'Montserrat', sans-serif;
      margin-bottom: 22px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(88, 101, 242, 0.3);
      letter-spacing: 1px;
    }

    .discord-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
      transition: 0.6s;
    }

    .discord-btn:hover::before {
      left: 100%;
    }

    .discord-btn:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 15px 35px rgba(88, 101, 242, 0.5);
      background: linear-gradient(135deg, #4752C4, #5865F2);
    }

    .discord-btn:active {
      transform: translateY(2px);
    }

    .discord-btn i {
      font-size: 1.4rem;
      filter: drop-shadow(0 0 3px white);
    }

    .loading-spinner {
      display: none;
      width: 38px;
      height: 38px;
      border: 3px solid rgba(157, 78, 221, 0.2);
      border-top: 3px solid #5865F2;
      border-right: 3px solid #9D4EDD;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin: 20px auto;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .info-text {
      color: rgba(210, 190, 255, 0.55);
      font-size: 0.75rem;
      margin-top: 20px;
      line-height: 1.5;
    }

    .info-text a {
      color: #9D4EDD;
      text-decoration: none;
      font-weight: 600;
      transition: 0.2s;
      border-bottom: 1px dashed rgba(157,78,221,0.5);
    }

    .info-text a:hover {
      color: #FF6BFF;
      text-shadow: 0 0 6px #FF6BFF;
      border-bottom-color: #FF6BFF;
    }

  
    @keyframes glitchTextAnim {
      0% {
        text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9;
      }
      20% {
        text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9;
      }
      40% {
        text-shadow: -1px 0 #ff00c1, 1px 0 #00fff9;
      }
      60% {
        text-shadow: 1px 0 #ff00c1, -1px 0 #00fff9;
      }
      100% {
        text-shadow: 0 0 #ff00c1, 0 0 #00fff9;
      }
    }

    .form-title:hover {
      animation: glitchTextAnim 0.25s infinite;
      cursor: default;
    }

    @media (max-width: 550px) {
      .glitch-card {
        padding: 36px 20px;
      }
      .logo-text {
        font-size: 2rem;
      }
      .form-title {
        font-size: 1.7rem;
      }
      .discord-btn {
        font-size: 1rem;
        padding: 13px 16px;
      }
      .logo-icon {
        font-size: 68px;
      }
    }

    .glitch-card .logo-text {
      position: relative;
    }
  </style>
</head>
<body>

  <div class="particles" id="particles"></div>
  <div class="container">
    <div class="glitch-card">
      <div class="logo">
        <div class="logo-icon">
          <i class="fas fa-crown"></i>
        </div>
        <div class="logo-text">Mpan HUB</div>
        <div class="logo-sub">FREE PREMIUM SCRIPT</div>
      </div>

  
      <div class="form-title">Enter The Hub</div>
      <div class="form-desc">Verify your identity to enter the matrix</div>

      <div class="input-group">
        <label class="input-label">
          <i class="fas fa-user-astronaut"></i> ROBLOX USERNAME
        </label>
        <input type="text" class="input-field" id="robloxUsername" placeholder="e.g., MpanGod, Nexuz_Dev" autocomplete="off">
      </div>

 
      <button class="discord-btn" id="verifyBtn">
        <i class="fab fa-discord"></i> CONTINUE WITH DISCORD
      </button>

      <div id="loading" class="loading-spinner"></div>

      <div class="info-text">
        <i class="fas fa-shield-alt"></i> Verification ensures secure access & prevents bots.<br>
        Join our community: <a href="https://discord.gg/A8M32E7RgU" target="_blank" rel="noopener noreferrer">Mpan HUB Private Server</a>
      </div>
    </div>
  </div>

  <script>

    function createParticles() {
      const container = document.getElementById('particles');
      if (!container) return;
    
      container.innerHTML = '';
      const particleCount = 70; 
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 1.5; 
        const isPurple = Math.random() > 0.6;
        const color1 = isPurple ? '#9D4EDD' : '#FF6BFF';
        const color2 = isPurple ? '#C77DFF' : '#FFB3FF';
        p.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, ${color1}, ${color2});
          animation-duration: ${Math.random() * 18 + 12}s;
          animation-delay: ${Math.random() * 8}s;
          opacity: 0;
          filter: blur(0.3px);
        `;
        container.appendChild(p);
      }
    }
    function handleVerification() {
      const usernameInput = document.getElementById('robloxUsername');
      const username = usernameInput.value.trim();
      const btn = document.getElementById('verifyBtn');
      const loadingSpinner = document.getElementById('loading');

    
      if (!username) {
        // modern alert replacement with custom? but alert fits simplicity
        alert('Please enter your Roblox username!');
        usernameInput.focus();
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_]{3,25}$/;
      if (!usernameRegex.test(username)) {
        alert('Username must be 3-25 characters (letters, numbers, underscore only).');
        usernameInput.focus();
        return;
      }


      btn.disabled = true;
      btn.style.opacity = '0.7';
      btn.style.cursor = 'not-allowed';
      loadingSpinner.style.display = 'block';
      localStorage.setItem('mpan_hub_username', username);
   
      
      setTimeout(() => {
        const successMsg = document.createElement('div');
        successMsg.textContent = `Welcome ${username}, access granted! Redirecting to Discord...`;
        successMsg.style.cssText = `
          background: rgba(88,101,242,0.2);
          border-left: 4px solid #5865F2;
          color: #b9fbc0;
          padding: 10px;
          border-radius: 30px;
          margin-top: 15px;
          font-size: 0.85rem;
          backdrop-filter: blur(8px);
          animation: fadeInUp 0.4s;
        `;
        const parentCard = document.querySelector('.glitch-card');
        const existingMsg = document.getElementById('tempSuccessMsg');
        if (existingMsg) existingMsg.remove();
        successMsg.id = 'tempSuccessMsg';
        parentCard.appendChild(successMsg);
        
     
        setTimeout(() => {
    
          window.open('https://discord.gg/A8M32E7RgU', '_blank');
         
          loadingSpinner.style.display = 'none';
          btn.disabled = false;
          btn.style.opacity = '1';
          btn.style.cursor = 'pointer';
     
          const finalNote = document.createElement('div');
          finalNote.innerHTML = '<i class="fas fa-check-circle"></i> Verified! Discord community opened.';
          finalNote.style.cssText = 'color:#9D4EDD; margin-top:12px; font-size:12px;';
          setTimeout(() => finalNote.remove(), 2500);
          parentCard.appendChild(finalNote);
          if (successMsg) successMsg.remove();
        }, 1800);
      }, 1300);
    }
    function loadSavedUsername() {
      const saved = localStorage.getItem('mpan_hub_username');
      const inputField = document.getElementById('robloxUsername');
      if (saved && inputField) {
        inputField.value = saved;
      
        inputField.style.borderColor = '#9D4EDD';
        setTimeout(() => {
          if (inputField) inputField.style.borderColor = 'rgba(157, 78, 221, 0.4)';
        }, 1000);
      }
    }

    function addGlitchSoundlessEffects() {
      const btn = document.getElementById('verifyBtn');
      if (btn) {
        btn.addEventListener('mouseenter', () => {
          btn.style.transform = 'translateY(-2px) scale(1.01)';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translateY(0) scale(1)';
        });
      }
      const input = document.getElementById('robloxUsername');
      if (input) {
        input.addEventListener('focus', () => {
          input.parentElement.style.transform = 'translateX(2px)';
          setTimeout(() => {
            if (input.parentElement) input.parentElement.style.transform = '';
          }, 150);
        });
      }
    }

    function bindEvents() {
      const btn = document.getElementById('verifyBtn');
      if (btn) {

        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        const freshBtn = document.getElementById('verifyBtn');
        freshBtn.addEventListener('click', handleVerification);
      } else {
        console.warn('button not found');
      }
    }

    window.addEventListener('resize', () => {
      const container = document.getElementById('particles');
      if (container && container.children.length < 40) {
        createParticles();
      }
    });
    
    function init() {
      createParticles();
      loadSavedUsername();
      bindEvents();
      addGlitchSoundlessEffects();

      const logoDiv = document.querySelector('.logo-icon');
      if (logoDiv) {
        setInterval(() => {
          logoDiv.style.filter = 'drop-shadow(0 0 18px rgba(157,78,221,0.9))';
          setTimeout(() => {
            if (logoDiv) logoDiv.style.filter = 'drop-shadow(0 0 20px rgba(157,78,221,0.6))';
          }, 300);
        }, 3000);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  </script>
</body>
</html>
  `);
}
