const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  if (query['hub.verify_token'] === 'micitabot123') {
    res.writeHead(200);
    res.end(query['hub.challenge']);
  } else {
    res.writeHead(403);
    res.end('Forbidden');
  }
});

server.listen(process.env.PORT || 3000);
