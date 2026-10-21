/* Decrypts the members-only data bundle before the app loads. The key comes
   from the WILD content key service via public/wild-vault.js, for members only. */
export async function loadVault() {
  if (!__WILD_VAULT_STUBS__) return; // dev with src/data opened locally
  const base = import.meta.env.BASE_URL;
  const cfg = await fetch(base + 'vault/vault.json', { cache: 'no-cache' }).then(r => r.json());
  const vault = await window.WildVault.open(cfg);
  const code = await vault.text(base + 'vault/sge-data.js.wv');
  const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
  try {
    const mod = await import(/* @vite-ignore */ url);
    globalThis.__SGE_DATA = mod.MODULES;
  } finally {
    URL.revokeObjectURL(url);
  }
}
