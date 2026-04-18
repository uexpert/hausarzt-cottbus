const { spawn } = require('child_process');
const path = require('path');

const docRoot = path.join(__dirname);
const php = spawn('php', ['-S', 'localhost:8001', '-t', docRoot], { stdio: 'inherit' });

php.on('error', (err) => {
  console.error('Failed to start PHP server:', err.message);
  process.exit(1);
});

process.on('SIGINT', () => { php.kill(); process.exit(); });
process.on('SIGTERM', () => { php.kill(); process.exit(); });
