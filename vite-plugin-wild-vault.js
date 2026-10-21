/* Keeps members-only data out of every build. Any import that points into
   src/data becomes a small stub that reads the module from the decrypted data
   bundle (src/vault/load.js puts it on globalThis.__SGE_DATA before the app
   loads). In dev, if src/data has been opened locally, the real files are used. */
import fs from 'node:fs';
import path from 'node:path';

const PREFIX = '\0wild-data:';

export default function wildVault() {
  let root, dataDir, stub;
  return {
    name: 'wild-vault',
    enforce: 'pre',
    config(_, { command }) {
      root = process.cwd();
      dataDir = path.join(root, 'src', 'data');
      stub = command === 'build' || !fs.existsSync(dataDir);
      return { define: { __WILD_VAULT_STUBS__: JSON.stringify(stub) } };
    },
    resolveId(source, importer) {
      if (!stub || !importer || !source.startsWith('.') || importer.startsWith(PREFIX)) return null;
      const abs = path.resolve(path.dirname(importer.split('?')[0]), source);
      if (!abs.startsWith(dataDir + path.sep)) return null;
      // Suffix keeps Vite's JSON plugin away from stubs of .json files.
      return PREFIX + path.relative(dataDir, abs).split(path.sep).join('/') + '.stub.js';
    },
    load(id) {
      if (!id.startsWith(PREFIX)) return null;
      const mod = id.slice(PREFIX.length, -'.stub.js'.length);
      const all = JSON.parse(fs.readFileSync(path.join(root, 'src/vault/exports.json'), 'utf8'));
      const names = all[mod];
      if (!names) this.error(`src/data/${mod} is not in the sealed data. Run npm run vault:seal.`);
      const ref = `globalThis.__SGE_DATA[${JSON.stringify(mod)}]`;
      return `const m = ${ref};\n` + names.map(n => n === 'default' ? 'export default m.default;' : `export const ${n} = m.${n};`).join('\n') + '\n';
    },
  };
}
