#!/usr/bin/env node
/* SGE content vault. The interpretation data (src/data) is members-only, so the
   public repo holds it only encrypted:
     vault/data/**.wv           the source files, for editing (encrypted)
     public/vault/sge-data.js.wv  the bundled data the app decrypts at runtime
     src/vault/exports.json     names each data module exports (not secret)
   src/data itself is git-ignored. Builds never bundle it (vite-plugin-wild-vault).

   Needs the SGE key for the quarter in vault.json, in WILD_VAULT_KEY (get it
   from the n8n workflow "WILD - content key", "Admin: get keys"). Never commit
   or paste the key.

     npm run vault:open   decrypt vault/data into src/data to edit or run tests
     npm run vault:seal   re-encrypt src/data into vault/ and public/vault/ */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { webcrypto as crypto } from 'node:crypto';
import { build } from 'esbuild';
import { encryptBuf, decryptBuf } from '../tools/wild-vault.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DATA = path.join(ROOT, 'src/data');
const VAULT_SRC = path.join(ROOT, 'vault/data');
const BUNDLE = path.join(ROOT, 'public/vault/sge-data.js.wv');
const EXPORTS = path.join(ROOT, 'src/vault/exports.json');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/vault/vault.json'), 'utf8'));

async function key() {
  const h = (process.env.WILD_VAULT_KEY || '').trim();
  if (!/^[0-9a-f]{64}$/i.test(h)) throw new Error('WILD_VAULT_KEY must be set (64 hex characters).');
  return crypto.subtle.importKey('raw', Buffer.from(h, 'hex'), 'AES-GCM', false, ['encrypt', 'decrypt']);
}
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const isIdent = n => /^[A-Za-z_$][\w$]*$/.test(n);

async function open() {
  const k = await key();
  const files = walk(VAULT_SRC).filter(f => f.endsWith('.wv'));
  for (const f of files) {
    const out = path.join(DATA, path.relative(VAULT_SRC, f).replace(/\.wv$/, ''));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, await decryptBuf(k, CFG.app, CFG.epoch, fs.readFileSync(f)));
  }
  console.log(`opened ${files.length} files into src/data (git-ignored; never commit them)`);
}

async function seal() {
  const k = await key();
  if (!fs.existsSync(DATA)) throw new Error('src/data is missing; run npm run vault:open first.');
  const mods = walk(DATA).filter(f => /\.(js|json)$/.test(f)).sort();
  // 1. One ES module exposing every data module by its path under src/data.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sge-vault-'));
  const entry = path.join(tmp, 'entry.js');
  fs.writeFileSync(entry, mods.map((f, i) => `import * as m${i} from ${JSON.stringify(f)};`).join('\n') +
    '\nexport const MODULES = {' + mods.map((f, i) => `${JSON.stringify(path.relative(DATA, f).split(path.sep).join('/'))}: m${i}`).join(',') + '};\n');
  const out = await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'browser', minify: true, write: false, legalComments: 'none', logLevel: 'warning' });
  const code = out.outputFiles[0].contents;
  // 2. Export names per module, read by loading the bundle once in Node.
  const probe = path.join(tmp, 'probe.mjs');
  fs.writeFileSync(probe, code);
  const { MODULES } = await import(pathToFileURL(probe).href);
  const exportsMap = {};
  for (const [id, ns] of Object.entries(MODULES)) exportsMap[id] = Object.keys(ns).filter(n => n === 'default' || isIdent(n)).sort();
  fs.rmSync(tmp, { recursive: true, force: true });
  // 3. Encrypt the bundle and every source file.
  fs.mkdirSync(path.dirname(BUNDLE), { recursive: true });
  fs.writeFileSync(BUNDLE, await encryptBuf(k, CFG.app, CFG.epoch, Buffer.from(code)));
  fs.mkdirSync(path.dirname(EXPORTS), { recursive: true });
  fs.writeFileSync(EXPORTS, JSON.stringify(exportsMap, null, 1) + '\n');
  fs.rmSync(VAULT_SRC, { recursive: true, force: true });
  for (const f of walk(DATA)) {
    const dest = path.join(VAULT_SRC, path.relative(DATA, f) + '.wv');
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, await encryptBuf(k, CFG.app, CFG.epoch, fs.readFileSync(f)));
  }
  console.log(`sealed ${mods.length} modules (${(code.length / 1024).toFixed(0)} KB bundle) for ${CFG.app} ${CFG.epoch}`);
}

const cmd = process.argv[2];
(cmd === 'open' ? open() : cmd === 'seal' ? seal() : Promise.reject(new Error('usage: vault.mjs open|seal')))
  .catch(e => { console.error(e.message); process.exit(1); });
