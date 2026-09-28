export { TokenShowcase } from "../components/TokenShowcase";
export { defaultTheme, ThemeProvider } from "../theme";

import "../styles/global.css";

export const VERSION = "0.1.0";

export async function mount(container, Component, props = {}) {
	const React = await import("react");
	const { createRoot } = await import("react-dom/client");
	const { createElement } = React.default ?? React;

	const root = createRoot(container);
	root.render(createElement(ThemeProvider, null, createElement(Component, props)));

	return () => root.unmount();
}
