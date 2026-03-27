export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  const isBrowser = /Mozilla|Chrome|Safari|Edg|Firefox/i.test(userAgent);
  
  if (isBrowser) {
    res.status(403).send('Forbidden');
  } else {

    const fs = require('fs');
    const path = require('path');
    const scriptPath = path.join(process.cwd(), 'sekerip.lua');
    const script = fs.readFileSync(scriptPath, 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(script);
  }
}
