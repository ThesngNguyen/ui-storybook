# ui-storybook

Ant Design v6 component library — customized with vibe. Documented in Storybook 10.

## Usage

### Install

```bash
npm install ui-storybook
# hoặc
bun add ui-storybook
```

Requires peer deps: `react >= 19`, `react-dom >= 19`, `antd >= 6`.

### Import styles (optional)

```js
import "ui-storybook/styles";
```

### Theme

```jsx
import { ThemeProvider, Button } from "ui-storybook";

export default function App() {
	return (
		<ThemeProvider>
			<Button type="primary">Hello</Button>
		</ThemeProvider>
	);
}
```

Override tokens:

```jsx
<ThemeProvider
	theme={{
		token: { colorPrimary: "#22c55e" },
		components: { Button: { controlHeight: 44 } },
	}}
>
	<App />
</ThemeProvider>
```

### Plugin

```js
import { uiPlugin } from "ui-storybook/plugin";
```

- **Vite**: `plugins: [react(), uiPlugin.vite()]`
- **Next.js** (`next.config.mjs`):

```js
export default uiPlugin.next();
```

`uiPlugin.theme` exposes the default antd theme config if you use `ConfigProvider` directly.

## Module Federation

Expose repo as a remote container so other projects load it over a URL — no
npm publish, no host rebuild on every UI change.

```bash
bun run build:mf    # → mf/remoteEntry.js + lazy chunks
```

Deployed layout:

```
https://cdn.example.com/ui-components/0.0.10/mf/remoteEntry.js   # pinned version
https://cdn.example.com/ui-components/mf/remoteEntry.js          # latest
```

Host side:

```js
new ModuleFederationPlugin({
	name: "my_app",                       // must differ from "ui_components"
	remotes: {
		ui_components:
			"ui_components@https://cdn.example.com/ui-components/0.0.10/mf/remoteEntry.js",
	},
	shared: {
		react: { singleton: true, requiredVersion: false },
		"react-dom": { singleton: true, requiredVersion: false },
		"react/jsx-runtime": { singleton: true, requiredVersion: false },
		"react-dom/client": { singleton: true, requiredVersion: false },
		antd: { singleton: true, requiredVersion: false },
	},
});
```

Exposed modules: `./ui` (barrel), `./ThemeProvider`, `./themeConfig`, `./TokenShowcase`.

Reference host: [`examples/mf-host/`](./examples/mf-host) — static import +
runtime loader, both verified. Full walkthrough incl. CORS, `publicPath`, async
boundary and troubleshooting: [`docs/INTEGRATION.md`](./docs/INTEGRATION.md).

## Development

```bash
bun install
bun run dev        # storybook dev server, http://localhost:6006
bun run build      # npm package → build/
bun run build:mf   # Module Federation container → mf/
bun run build:all  # both
bun run build-storybook  # static site → storybook-static/ (+ mf/ copied in)
bun run build:deploy     # build:mf + build-storybook, what CI runs
```

## Deploy

### Vercel (Storybook docs site)

`vercel.json` already configured:

```json
{
	"buildCommand": "npm run build-storybook",
	"outputDirectory": "storybook-static"
}
```

Push to GitHub, import repo in Vercel — done. Preview URL points at the live Storybook.

### npm package

```bash
bun run build
npm publish
```

`prepublishOnly` rebuilds automatically.

## License

MIT
