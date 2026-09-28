import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const version =
  process.argv[2] ??
  JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8")).version;

const src = fileURLToPath(new URL("../mf", import.meta.url));
const staticDir = fileURLToPath(new URL("../storybook-static", import.meta.url));

if (!existsSync(src)) {
  console.error("✗ mf/ not found. Run `npm run build:mf` first.");
  process.exit(1);
}
if (!existsSync(staticDir)) {
  console.error("✗ storybook-static/ not found. Run `npm run build-storybook` first.");
  process.exit(1);
}

const versioned = `${staticDir}/${version}/mf`;
const latest = `${staticDir}/mf`;

for (const target of [versioned, latest]) {
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  cpSync(src, target, { recursive: true });
}

writeFileSync(
  `${staticDir}/mf-manifest.json`,
  JSON.stringify(
    {
      name: "ui_components",
      version,
      remoteEntry: `/${version}/mf/remoteEntry.js`,
      latest: "/mf/remoteEntry.js",
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
);

console.log(`✓ Copied mf/ → storybook-static/${version}/mf/ and storybook-static/mf/`);
console.log(`✓ Wrote storybook-static/mf-manifest.json (v${version})`);
