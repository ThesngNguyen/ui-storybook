import { ThemeProvider } from "../theme";
import { defaultTheme } from "../theme/themeConfig";

/**
 * Plugin entry — dùng chung cho mọi consumer (Vite, Next.js, CRA, ...).
 *
 * Cách dùng:
 *   import { uiPlugin, ThemeProvider } from "@your-org/ui-storybook/plugin";
 *
 *   // Vite
 *   plugins: [react(), uiPlugin.vite()]
 *
 *   // Next.js (next.config.mjs)
 *   export default uiPlugin.next()
 *
 *   // Bao bọc app
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 */
export const uiPlugin = {
	vite() {
		return {
			name: "ui-storybook-plugin",
			config() {
				return {
					css: {
						preprocessorOptions: {
							scss: {},
						},
					},
				};
			},
		};
	},

	next() {
		return {
			reactStrictMode: true,
			experimental: {},
		};
	},

	/**
	 * Cung cấp cấu hình antd theme tokens cho app host.
	 * Dùng chung với `<ThemeProvider>` hoặc truyền thẳng vào `ConfigProvider`.
	 */
	theme: defaultTheme,
};

export { defaultTheme, ThemeProvider };
