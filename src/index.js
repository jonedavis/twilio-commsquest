const cfg = require('./config');
const server = require('./server');

server.listen(cfg.port, function() {
  const msg = cfg.domain.startsWith('https://xxxxxxx.')
    ? `NOTE: Are you running this locally? Make sure ngrok is running and you've set your domain in .env or config.js. You can delete this message in /src/index.js`
    : cfg.domain;
  console.log(`Starting CommsQuest.\n${msg}`);
});
