import path from 'node:path';
import { spawnSync } from 'node:child_process';

const rootDirectory = process.cwd();
const host = process.env.SPEC_UP_DEV_HOST || 'specup.localhost';
const port = process.env.SPEC_UP_DEV_PORT || '5173';
const certDirectory = path.join(rootDirectory, '.local-dev', 'tls');
const certPath = path.join(certDirectory, `${host}.crt`);
const keyPath = path.join(certDirectory, `${host}.key`);

const ensureCert = spawnSync(process.execPath, [
  path.join(rootDirectory, 'scripts', 'dev-cert.mjs'),
  host
], {
  cwd: rootDirectory,
  stdio: 'inherit'
});

if (ensureCert.status !== 0) {
  process.exit(ensureCert.status || 1);
}

console.log(`[spec-up] Starting Vite at https://${host}:${port}`);

const viteProcess = spawnSync(process.execPath, [
  path.join(rootDirectory, 'node_modules', 'vite', 'bin', 'vite.js')
], {
  cwd: rootDirectory,
  env: {
    ...process.env,
    SPEC_UP_DEV_HOST: host,
    SPEC_UP_DEV_PORT: port,
    SPEC_UP_DEV_HTTPS: '1',
    SPEC_UP_DEV_TLS_CERT: certPath,
    SPEC_UP_DEV_TLS_KEY: keyPath
  },
  stdio: 'inherit'
});

process.exit(viteProcess.status || 0);
