const http = require('http');
const url = require('url');
const https = require('https');

const MAKE_URL = 'https://hook.eu1.make.com/kn3w63o1wqcanjgbtzx8gf3asx1rv213';
const VERIFY_TOKEN = 'micitabot123';

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const query = url.parse(req.url, true).query;
    if (query['hub.verify_token'] === VERIFY_TOKEN) {
      res.writeHead(200);
      res.end(query['hub.challenge']);
    } else {
      res.writeHead(403);
      res.end('Forbidden');
    }
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const makeReq = https.request(MAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      makeReq.write(body);
      makeReq.end();
      res.writeHead(200);
      res.end('OK');
    });
  }
});

server.listen(process.env.PORT || 3000);
