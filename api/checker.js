
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = /Mozilla|Chrome|Safari|Edg|Firefox|Opera|MSIE|Trident/i.test(userAgent);
  const query = req.query;
  
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  

  if (!isBrowser) {
    try {
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
    <html>
    <head><meta charset="UTF-8"><title>Access Denied</title>
    <style>
      body{background:#0a0a0f;color:#ff4444;font-family:monospace;text-align:center;padding-top:100px;}
      h1{font-size:48px;}
    </style>
    </head>
    <body><h1>⛔ ACCESS DENIED</h1><p>IP: ${ip}</p></body>
    </html>`);
    return;
  }
  

  try {
    const htmlPath = path.join(process.cwd(), 'consent.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    
  
    html = html.replace('{{IP_ADDRESS}}', ip);
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {

    res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head><title>Mpan HUB</title></head>
    <body style="background:#0a0a0f;color:white;text-align:center;padding:50px;">
      <h1>MpanHUB</h1>
      <input type="text" id="username" placeholder="Roblox Username">
      <button onclick="verify()">Continue</button>
      <script>
        function verify(){
          let user = document.getElementById('username').value;
          if(user) localStorage.setItem('mpan_user',user);
          window.location.href = window.location.pathname + '?consent=true';
        }
      </script>
    </body>
    </html>
    `);
  }
}
