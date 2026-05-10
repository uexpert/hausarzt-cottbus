const { spawn } = require('child_process');
const path = require('path');

const node = process.execPath;
const phpScript = path.join(__dirname, 'start-php.js');
const ngScript = path.join(__dirname, '..', 'node_modules', '@angular', 'cli', 'bin', 'ng.js');

const colors = { php: '\x1b[35m', ng: '\x1b[36m', reset: '\x1b[0m' };
const procs = [];
let shuttingDown = false;

function pipe(stream, name) {
  let buf = '';
  stream.on('data', (chunk) => {
    buf += chunk.toString();
    let nl;
    while ((nl = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      process.stdout.write(`${colors[name]}[${name}]${colors.reset} ${line}\n`);
    }
  });
  stream.on('end', () => {
    if (buf.length) process.stdout.write(`${colors[name]}[${name}]${colors.reset} ${buf}\n`);
  });
}

function launch(name, args) {
  const p = spawn(node, args, { stdio: ['ignore', 'pipe', 'pipe'], shell: false });
  procs.push(p);
  pipe(p.stdout, name);
  pipe(p.stderr, name);
  p.on('exit', (code, signal) => {
    process.stdout.write(`${colors[name]}[${name}]${colors.reset} exited (code=${code}, signal=${signal})\n`);
    if (!shuttingDown) {
      shuttingDown = true;
      shutdown(code ?? 1);
    }
  });
  p.on('error', (err) => {
    process.stderr.write(`${colors[name]}[${name}]${colors.reset} spawn error: ${err.message}\n`);
  });
  return p;
}

function shutdown(code) {
  for (const p of procs) {
    if (p.exitCode === null && !p.killed) {
      try { p.kill(); } catch {}
    }
  }
  setTimeout(() => process.exit(code), 250).unref();
}

process.on('SIGINT', () => { shuttingDown = true; shutdown(0); });
process.on('SIGTERM', () => { shuttingDown = true; shutdown(0); });

launch('php', [phpScript]);
launch('ng', [ngScript, 'serve', '--proxy-config', 'proxy.conf.json']);
