/* Build guard: members-only data must never be committed in plain text. */
import { execSync } from 'node:child_process';
let tracked = '';
try { tracked = execSync('git ls-files src/data', { encoding: 'utf8' }).trim(); } catch (e) { /* not a git checkout */ }
if (tracked) {
  console.error('Plain members-only data is tracked in git under src/data. Remove it (git rm -r --cached src/data) and run npm run vault:seal.');
  process.exit(1);
}
