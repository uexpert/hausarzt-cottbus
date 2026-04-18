const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8001;
const API_SECRET = 'hac_news_secret_2024_xK9mP';
const NEWS_FILE = path.join(__dirname, '..', 'public', 'data', 'news.json');

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  if (req.url !== '/api/save-news.php' || req.method !== 'POST') {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  if (req.headers['x-api-key'] !== API_SECRET) {
    res.writeHead(401);
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      fs.writeFileSync(NEWS_FILE, JSON.stringify(data, null, 2));
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, saved: data.length + ' notices' }));
    } catch (e) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: e.message }));
    }
  });
});

server.listen(PORT, () => console.log(`Dev API running on http://localhost:${PORT}`));
