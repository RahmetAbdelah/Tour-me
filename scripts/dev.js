#!/usr/bin/env node
'use strict';

const path = require('path');
const { spawn } = require('child_process');

const { RESTART_EXIT_CODE } = require('next/dist/server/lib/utils');

const workerPath = path.join(__dirname, 'dev-worker.js');

function spawnWorker() {
  const child = spawn(process.execPath, [workerPath, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Mimic Next's dev CLI expectation for start-time measurement and dev-only behavior.
      NEXT_PRIVATE_START_TIME: Date.now().toString(),
      __NEXT_DEV_SERVER: '1',
    },
  });

  return child;
}

let child = null;
let stopping = false;

function stop(signal) {
  if (stopping) return;
  stopping = true;

  if (child && child.pid) {
    try {
      child.kill(signal || 'SIGINT');
    } catch {
      // ignore
    }
  }
}

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

function startLoop() {
  child = spawnWorker();

  child.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  child.on('exit', (code, signal) => {
    child = null;

    if (stopping || signal) {
      process.exit(code ?? 0);
      return;
    }

    if (code === RESTART_EXIT_CODE) {
      // Same semantics as `next dev`: config changes / memory threshold trigger a restart.
      setTimeout(startLoop, 150);
      return;
    }

    process.exit(code ?? 0);
  });
}

startLoop();

