const { execFileSync, spawnSync } = require('child_process');

const port = process.argv[2];

if (!port) {
  console.error('Usage: node scripts/kill-port.js <port>');
  process.exit(1);
}

function findListeningPids(targetPort) {
  const result = spawnSync('netstat', ['-ano'], { encoding: 'utf8', shell: true });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0 && !result.stdout) {
    return [];
  }

  const lines = (result.stdout || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const pids = new Set();
  for (const line of lines) {
    if (!line.includes(`:${targetPort}`) || !line.includes('LISTENING')) {
      continue;
    }

    const parts = line.split(/\s+/);
    const pid = parts[parts.length - 1];
    if (/^\d+$/.test(pid)) {
      pids.add(pid);
    }
  }

  return [...pids];
}

const pids = findListeningPids(port);

if (pids.length === 0) {
  console.log(`No process is listening on port ${port}.`);
  process.exit(0);
}

for (const pid of pids) {
  try {
    execFileSync('taskkill', ['/PID', pid, '/F'], { stdio: 'inherit', shell: true });
    console.log(`Killed process ${pid} on port ${port}.`);
  } catch (error) {
    console.error(`Failed to kill process ${pid} on port ${port}.`);
    process.exitCode = 1;
  }
}
