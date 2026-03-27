
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
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mpan HUB</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
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
          
          /* GLITCH BACKGROUND */
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 40%, rgba(157,78,221,0.15) 0%, transparent 50%),
                        radial-gradient(circle at 70% 60%, rgba(255,107,255,0.1) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
          }
          
          /* SCANLINE */
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
          
          /* GLITCH CARD */
          .glitch-card {
            background: rgba(20, 15, 35, 0.85);
            backdrop-filter: blur(12px);
            border-radius: 32px;
            padding: 50px 30px;
            text-align: center;
            border: 2px solid rgba(157, 78, 221, 0.4);
            box-shadow: 0 0 50px rgba(157, 78, 221, 0.2), 0 25px 50px -12px rgba(0,0,0,0.5);
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
            background: radial-gradient(circle, rgba(157,78,221,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
          }
          
          .glitch-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
            animation: shine 4s infinite;
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
          
          .glitch-card > * {
            position: relative;
            z-index: 2;
          }
          
          /* LOGO */
          .logo {
            margin-bottom: 30px;
            animation: pulse 3s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); text-shadow: 0 0 10px rgba(157,78,221,0.5); }
            50% { transform: scale(1.05); text-shadow: 0 0 30px rgba(157,78,221,0.8); }
          }
          
          .logo-icon {
            font-size: 80px;
            background: linear-gradient(135deg, #9D4EDD, #FF6BFF);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            filter: drop-shadow(0 0 20px rgba(157,78,221,0.6));
          }
          
          .logo-text {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #FFFFFF, #9D4EDD, #FF6BFF);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: 2px;
            margin-top: 10px;
            font-family: 'Orbitron', monospace;
          }
          
          .logo-sub {
            color: rgba(210, 190, 255, 0.7);
            font-size: 0.8rem;
            letter-spacing: 2px;
            margin-top: 5px;
          }
          
          /* FORM */
          .form-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
            margin-bottom: 10px;
          }
          
          .form-desc {
            color: rgba(210, 190, 255, 0.7);
            margin-bottom: 30px;
            font-size: 0.9rem;
          }
          
          .input-group {
            margin-bottom: 25px;
          }
          
          .input-label {
            display: block;
            text-align: left;
            margin-bottom: 8px;
            color: #B8B8D1;
            font-size: 0.85rem;
            letter-spacing: 1px;
          }
          
          .input-label i {
            color: #9D4EDD;
            margin-right: 8px;
          }
          
          .input-field {
            width: 100%;
            padding: 14px 20px;
            background: rgba(30, 20, 45, 0.8);
            border: 2px solid rgba(157, 78, 221, 0.3);
            border-radius: 60px;
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
          }
          
          .input-field:focus {
            outline: none;
            border-color: #9D4EDD;
            box-shadow: 0 0 20px rgba(157, 78, 221, 0.4);
            background: rgba(30, 20, 45, 1);
          }
          
          .input-field::placeholder {
            color: rgba(255,255,255,0.3);
          }
          
          /* DISCORD BUTTON */
          .discord-btn {
            width: 100%;
            padding: 14px 25px;
            background: linear-gradient(135deg, #5865F2, #4752c4);
            border: none;
            border-radius: 60px;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .discord-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: 0.6s;
          }
          
          .discord-btn:hover::before {
            left: 100%;
          }
          
          .discord-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
          }
          
          .discord-btn i {
            font-size: 1.3rem;
          }
          
          /* INFO TEXT */
          .info-text {
            color: rgba(210, 190, 255, 0.5);
            font-size: 0.75rem;
            margin-top: 20px;
          }
          
          .info-text a {
            color: #9D4EDD;
            text-decoration: none;
          }
          
          .info-text a:hover {
            text-decoration: underline;
          }
          
          /* LOADING */
          .loading-spinner {
            display: none;
            width: 30px;
            height: 30px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top-color: #5865F2;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 20px auto;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          /* ACCESS DENIED PAGE */
          .denied-container {
            text-align: center;
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
          }
          
          .denied-text {
            color: #888;
            margin-bottom: 20px;
          }
          
          .denied-ip {
            font-size: 12px;
            color: #555;
            margin-top: 30px;
          }
          
          /* PARTICLES */
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
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-1000px) rotate(720deg); opacity: 0; }
          }
          
          /* RESPONSIVE */
          @media (max-width: 500px) {
            .glitch-card { padding: 35px 20px; }
            .logo-text { font-size: 1.8rem; }
            .form-title { font-size: 1.5rem; }
            .discord-btn { font-size: 1rem; }
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      </head>
      <body>
        <div class="particles" id="particles"></div>
        <div class="container denied-container">
          <div class="glitch-card">
            <div class="denied-icon">
              <i class="fas fa-ban"></i>
            </div>
            <h1 class="denied-title">ACCESS DENIED</h1>
            <p class="denied-text">Your access has been verified.</p>
            <div class="denied-ip">
              <i class="fas fa-laptop-code"></i> IP: ${ip}
            </div>
          </div>
        </div>
        <script>
          // PARTICLES EFFECT
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
      </html>
    `);
    return;
  }
  
  // ==================== CONSENT PAGE (BELUM CONSENT) ====================
  res.status(200).setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mpan HUB</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
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
        
        /* GLITCH BACKGROUND */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 40%, rgba(157,78,221,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 60%, rgba(255,107,255,0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        
        /* SCANLINE */
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
        
        /* GLITCH CARD */
        .glitch-card {
          background: rgba(20, 15, 35, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 32px;
          padding: 50px 30px;
          text-align: center;
          border: 2px solid rgba(157, 78, 221, 0.4);
          box-shadow: 0 0 50px rgba(157, 78, 221, 0.2), 0 25px 50px -12px rgba(0,0,0,0.5);
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
          background: radial-gradient(circle, rgba(157,78,221,0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        
        .glitch-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          animation: shine 4s infinite;
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
        
        .glitch-card > * {
          position: relative;
          z-index: 2;
        }
        
        /* LOGO */
        .logo {
          margin-bottom: 30px;
          animation: pulseLogo 3s ease-in-out infinite;
        }
        
        @keyframes pulseLogo {
          0%, 100% { transform: scale(1); text-shadow: 0 0 10px rgba(157,78,221,0.5); }
          50% { transform: scale(1.05); text-shadow: 0 0 30px rgba(157,78,221,0.8); }
        }
        
        .logo-icon {
          font-size: 80px;
          background: linear-gradient(135deg, #9D4EDD, #FF6BFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 20px rgba(157,78,221,0.6));
        }
        
        .logo-text {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #FFFFFF, #9D4EDD, #FF6BFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: 2px;
          margin-top: 10px;
          font-family: 'Orbitron', monospace;
        }
        
        .logo-sub {
          color: rgba(210, 190, 255, 0.7);
          font-size: 0.8rem;
          letter-spacing: 2px;
          margin-top: 5px;
        }
        
        /* FORM */
        .form-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
        }
        
        .form-desc {
          color: rgba(210, 190, 255, 0.7);
          margin-bottom: 30px;
          font-size: 0.9rem;
        }
        
        .input-group {
          margin-bottom: 25px;
        }
        
        .input-label {
          display: block;
          text-align: left;
          margin-bottom: 8px;
          color: #B8B8D1;
          font-size: 0.85rem;
          letter-spacing: 1px;
        }
        
        .input-label i {
          color: #9D4EDD;
          margin-right: 8px;
        }
        
        .input-field {
          width: 100%;
          padding: 14px 20px;
          background: rgba(30, 20, 45, 0.8);
          border: 2px solid rgba(157, 78, 221, 0.3);
          border-radius: 60px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #9D4EDD;
          box-shadow: 0 0 20px rgba(157, 78, 221, 0.4);
          background: rgba(30, 20, 45, 1);
        }
        
        .input-field::placeholder {
          color: rgba(255,255,255,0.3);
        }
        
        /* DISCORD BUTTON */
        .discord-btn {
          width: 100%;
          padding: 14px 25px;
          background: linear-gradient(135deg, #5865F2, #4752c4);
          border: none;
          border-radius: 60px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .discord-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: 0.6s;
        }
        
        .discord-btn:hover::before {
          left: 100%;
        }
        
        .discord-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
        }
        
        .discord-btn i {
          font-size: 1.3rem;
        }
        
        /* INFO TEXT */
        .info-text {
          color: rgba(210, 190, 255, 0.5);
          font-size: 0.75rem;
          margin-top: 20px;
        }
        
        .info-text a {
          color: #9D4EDD;
          text-decoration: none;
        }
        
        .info-text a:hover {
          text-decoration: underline;
        }
        
        /* LOADING */
        .loading-spinner {
          display: none;
          width: 30px;
          height: 30px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #5865F2;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 20px auto;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* PARTICLES */
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
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-1000px) rotate(720deg); opacity: 0; }
        }
        
        /* RESPONSIVE */
        @media (max-width: 500px) {
          .glitch-card { padding: 35px 20px; }
          .logo-text { font-size: 1.8rem; }
          .form-title { font-size: 1.5rem; }
          .discord-btn { font-size: 1rem; }
        }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    </head>
    <body>
      <div class="particles" id="particles"></div>
      <div class="container">
        <div class="glitch-card">
          <div class="logo">
            <div class="logo-icon">
              <i class="fas fa-crown"></i>
            </div>
            <div class="logo-text">MpanHUB</div>
            <div class="logo-sub">PREMIUM FREE SCRIPT ACCESS</div>
          </div>
          
          <div class="form-title">Verification Required</div>
          <div class="form-desc">Verify your identity to access the script</div>
          
          <div class="input-group">
            <label class="input-label">
              <i class="fas fa-user"></i> ROBLOX USERNAME
            </label>
            <input type="text" class="input-field" id="robloxUsername" placeholder="Enter your Roblox username" autocomplete="off">
          </div>
          
          <button class="discord-btn" id="verifyBtn" onclick="verify()">
            <i class="fab fa-discord"></i> CONTINUE WITH DISCORD
          </button>
          
          <div id="loading" class="loading-spinner"></div>
          
          <div class="info-text">
            <i class="fas fa-shield-alt"></i> This verification helps prevent automated access.<br>
            Join our Discord: <a href="https://discord.gg/A8M32E7RgU" target="_blank">Mpan HUB PRIVATE SERVER</a>
          </div>
        </div>
      </div>
      
      <script>
        // PARTICLES EFFECT
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
        
        // VERIFY FUNCTION
        function verify() {
          const username = document.getElementById('robloxUsername').value.trim();
          const btn = document.getElementById('verifyBtn');
          const loading = document.getElementById('loading');
          
          if (!username) {
            alert('Please enter your Roblox username!');
            return;
          }
          
          // Validasi username
          if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
            alert('Username must be 3-20 characters (letters, numbers, underscore)');
            return;
          }
          
          // Disable button & show loading
          btn.disabled = true;
          btn.style.opacity = '0.5';
          loading.style.display = 'block';
          
          // Simpan username ke localStorage
          localStorage.setItem('mpan_username', username);
          
          // Redirect dengan consent=true
          setTimeout(() => {
            window.location.href = window.location.pathname + '?consent=true';
          }, 1500);
        }
        
        // Auto-fill username if exists
        const savedUsername = localStorage.getItem('mpan_username');
        if (savedUsername) {
          document.getElementById('robloxUsername').value = savedUsername;
        }
      </script>
    </body>
    </html>
  `);
}
