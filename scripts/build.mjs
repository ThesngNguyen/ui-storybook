// Build script: bundle package with bun CLI.
// - ESM:  build/index.mjs,  build/plugin/index.mjs
// - CJS:  build/index.js,   build/plugin/index.js
// - Types: build/index.d.ts, build/plugin/index.d.ts
// - CSS:  build/styles/global.css (+ variables.css)

import { mkdirSync, cpSync, rmSync, renameSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const outDir = new URL("build/", root);
const rootPath = fileURLToPath(root);
const bin = "bun";

const EXTERNAL = [
	"react",
	"react-dom",
	"react/jsx-runtime",
	"react/jsx-dev-runtime",
	"antd",
	"@ant-design/icons",
	"antd/es/*",
	"antd/lib/*",
	"@storybook/*",
];

const common = [
	"--outdir",
	"build/esm",
	"--format",
	"esm",
	"--splitting",
	"--target",
	"browser",
	"--sourcemap",
	...EXTERNAL.flatMap((e) => ["--external", e]),
	"src/index.ts",
	"src/plugin/index.js",
];

function run(args) {
	const p = Bun.spawnSync([bin, "build", ...args], { cwd: rootPath });
	if (p.exitCode !== 0) {
		console.error(String(p.stderr) || String(p.stdout));
		process.exit(p.exitCode ?? 1);
	}
	return String(p.stdout);
}

console.log("— Cleaning build/ …");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

console.log("— Bundling ESM …");
run([...common, "--outdir", "build"]);

// ESM: build/index.js → index.mjs, build/plugin/index.js → plugin/index.mjs
renameSync(new URL("build/index.js", root), new URL("build/index.mjs", root));
renameSync(
	new URL("build/plugin/index.js", root),
	new URL("build/plugin/index.mjs", root),
);

console.log("— Bundling CJS …");
run([
	"--outdir",
	"build-cjs",
	"--format",
	"cjs",
	"--target",
	"browser",
	"--sourcemap",
	...EXTERNAL.flatMap((e) => ["--external", e]),
	"src/index.ts",
	"src/plugin/index.js",
]);

renameSync(
	new URL("build-cjs/index.js", root),
	new URL("build/index.cjs", root),
);
renameSync(
	new URL("build-cjs/plugin/index.js", root),
	new URL("build/plugin/index.cjs", root),
);
// copy CJS chunks sang build/
const { readdirSync } = await import("node:fs");
for (const f of readdirSync(fileURLToPath(new URL("build-cjs", root)))) {
	if (f.startsWith("index-") && f.endsWith(".js") && !f.includes(".map")) {
		renameSync(new URL(`build-cjs/${f}`, root), new URL(`build/${f}`, root));
	}
}
rmSync(new URL("build-cjs", root), { recursive: true, force: true });

// ── Types ──────────────────────────────────────────────
console.log("— Generating types …");
const tsc = fileURLToPath(new URL("node_modules/typescript/bin/tsc", root));
const proc = Bun.spawnSync(
	[
		tsc,
		"--declaration",
		"--emitDeclarationOnly",
		"--outDir",
		"build",
		"--allowJs",
		"--allowSyntheticDefaultImports",
		"--skipLibCheck",
		"--jsx",
		"react-jsx",
		"--moduleResolution",
		"node",
		"--module",
		"esnext",
		"--types",
		"react",
		"--target",
		"es2020",
		"--lib",
		"es2020,dom",
		"src/index.ts",
		"src/plugin/index.js",
	],
	{ cwd: rootPath },
);

if (proc.exitCode !== 0) {
	console.error(String(proc.stderr) || String(proc.stdout));
	process.exit(proc.exitCode ?? 1);
}

// ── CSS ────────────────────────────────────────────────
console.log("— Copying CSS …");
mkdirSync(new URL("build/styles", root), { recursive: true });
cpSync(
	new URL("src/styles/global.css", root),
	new URL("build/styles/global.css", root),
);
cpSync(
	new URL("src/styles/variables.css", root),
	new URL("build/styles/variables.css", root),
);

console.log("✓ Build complete → build/");
