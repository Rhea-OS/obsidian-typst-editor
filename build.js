#!/bin/env node

import * as esbuild from 'esbuild';
import * as fs from 'node:fs/promises';

await esbuild.build({
	entryPoints: ['src/main.tsx'],
	bundle: true,
	outdir: 'build',
	sourcemap: true,
	minify: false,
	plugins: [
		{name: 'scoped-css', setup(build) {
			build.onResolve({ filter: /\.css\?raw$/ }, async args => ({
				path: await build.resolve(args.path.slice(0, -4), {
					resolveDir: args.resolveDir,
					kind: 'import-statement'
				}).then(result => result.path),
				namespace: 'scoped-css',
			}));

			build.onLoad({ filter: /.*/, namespace: 'scoped-css' }, async args => ({
				contents: await fs.readFile(args.path, 'utf8'),
				loader: 'text',
			}))
		}}
	]
});

await Promise.all([
	fs.copyFile('index.html', 'build/index.html'),
	fs.copyFile('logo/logo.svg', 'build/logo.svg'),
	fs.copyFile('manifest.json', 'build/manifest.json'),
]);