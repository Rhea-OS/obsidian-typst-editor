import fs from 'node:fs/promises';
import pkg from './package.json' with {type: 'json'};

console.error(process.env['VAULT_DIR']);

await fs.cp('./build', `${process.env['VAULT_DIR']}/.obsidian/plugins/${pkg.name}`, {recursive: true});