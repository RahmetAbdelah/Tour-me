#!/usr/bin/env node
'use strict';

const path = require('path');

function parseArgs(argv) {
  let dir;
  let port;
  let hostname;
  let serverFastRefresh; // undefined (default) | false
  let bundler; // 'turbopack' | 'webpack' | undefined

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      // Keep this lightweight; the real `next dev --help` is still available.
      console.log(`Usage: node scripts/dev.js [directory] [options]

Options:
  -p, --port <port>          Port to listen on (default: 3000 / env PORT)
  -H, --hostname <hostname>  Hostname to bind to (default: 0.0.0.0)
  --turbo, --turbopack       Use Turbopack (sets TURBOPACK=1)
  --webpack                  Use Webpack (unsets TURBOPACK)
  --no-server-fast-refresh   Disable server-side Fast Refresh
`);
      process.exit(0);
    }

    if (!arg.startsWith('-') && !dir) {
      dir = arg;
      continue;
    }

    if (arg === '-p' || arg === '--port') {
      port = Number(argv[++i]);
      continue;
    }

    if (arg === '-H' || arg === '--hostname') {
      hostname = argv[++i];
      continue;
    }

    if (arg === '--no-server-fast-refresh') {
      serverFastRefresh = false;
      continue;
    }

    if (arg === '--turbo' || arg === '--turbopack') {
      bundler = 'turbopack';
      continue;
    }

    if (arg === '--webpack') {
      bundler = 'webpack';
      continue;
    }
  }

  return { dir, port, hostname, serverFastRefresh, bundler };
}

async function main() {
  process.env.NODE_ENV ??= 'development';
  process.env.__NEXT_DEV_SERVER = '1';

  const { dir, port, hostname, serverFastRefresh, bundler } = parseArgs(
    process.argv.slice(2)
  );

  if (bundler === 'turbopack') process.env.TURBOPACK = '1';
  if (bundler === 'webpack') delete process.env.TURBOPACK;

  const projectDir = path.resolve(process.cwd(), dir || '.');
  const resolvedPort =
    Number.isFinite(port) && port > 0 ? port : Number(process.env.PORT) || 3000;
  const resolvedHostname = hostname || process.env.HOSTNAME || '0.0.0.0';

  // Import after env setup.
  const { startServer } = require('next/dist/server/lib/start-server');

  await startServer({
    dir: projectDir,
    port: resolvedPort,
    hostname: resolvedHostname,
    allowRetry: true,
    isDev: true,
    minimalMode: false,
    keepAliveTimeout: undefined,
    selfSignedCertificate: undefined,
    serverFastRefresh,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

