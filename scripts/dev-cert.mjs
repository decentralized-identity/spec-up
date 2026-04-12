import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const rootDirectory = process.cwd();
const host = process.env.SPEC_UP_DEV_HOST || process.argv[2] || 'specup.localhost';
const tlsDirectory = path.join(rootDirectory, '.local-dev', 'tls');
const keyPath = path.join(tlsDirectory, `${host}.key`);
const certPath = path.join(tlsDirectory, `${host}.crt`);

async function main() {
  await fs.mkdir(tlsDirectory, { recursive: true });

  try {
    await fs.access(keyPath);
    await fs.access(certPath);
    console.log(`[spec-up] Reusing local TLS certificate for https://${host}: ${certPath}`);
    return;
  }
  catch {
    // Generate the certificate below when either file is missing.
  }

  const opensslConfigPath = path.join(
    os.tmpdir(),
    `spec-up-${host.replace(/[^a-z0-9.-]/gi, '_')}-openssl.cnf`
  );
  const opensslConfig = `
[req]
default_bits = 2048
prompt = no
default_md = sha256
x509_extensions = v3_req
distinguished_name = dn

[dn]
CN = ${host}

[v3_req]
subjectAltName = @alt_names
basicConstraints = CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[alt_names]
DNS.1 = ${host}
DNS.2 = localhost
IP.1 = 127.0.0.1
IP.2 = ::1
`.trim();

  await fs.writeFile(opensslConfigPath, `${opensslConfig}\n`);

  try {
    execFileSync('openssl', [
      'req',
      '-x509',
      '-nodes',
      '-newkey',
      'rsa:2048',
      '-keyout',
      keyPath,
      '-out',
      certPath,
      '-days',
      '825',
      '-config',
      opensslConfigPath,
      '-extensions',
      'v3_req'
    ], {
      stdio: 'inherit'
    });
  }
  finally {
    await fs.rm(opensslConfigPath, { force: true });
  }

  console.log(`[spec-up] Created local TLS certificate for https://${host}`);
  console.log(`[spec-up] Key: ${keyPath}`);
  console.log(`[spec-up] Cert: ${certPath}`);
  console.log('[spec-up] The certificate is self-signed. Trust it in your OS/browser if you want to remove HTTPS warnings.');
}

main().catch(error => {
  console.error(`[spec-up] Could not create a local TLS certificate: ${error?.message || error}`);
  process.exitCode = 1;
});
