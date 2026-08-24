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

## Development

```bash
bun install
bun run dev        # storybook dev server, http://localhost:6006
bun run build      # bundle package → build/
bun run build-storybook  # static site → storybook-static/
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
