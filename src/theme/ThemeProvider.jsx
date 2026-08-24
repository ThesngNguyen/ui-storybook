import { ConfigProvider } from "antd";
import { defaultTheme } from "./themeConfig";

/**
 * ThemeProvider — wrap toàn bộ app bằng ConfigProvider với custom tokens.
 *
 * Ví dụ consumer:
 *   import { ThemeProvider, Button } from '@your-org/ui-storybook';
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 */
export function ThemeProvider({ children, theme: themeOverride }) {
	const mergedTheme = deepMerge(defaultTheme, themeOverride);

	return <ConfigProvider theme={mergedTheme}>{children}</ConfigProvider>;
}

// ── Helpers ────────────────────────────────────────────

function deepMerge(base, overrides) {
	if (!overrides) return base;
	const result = { ...base };
	for (const key of Object.keys(overrides)) {
		if (
			typeof overrides[key] === "object" &&
			overrides[key] !== null &&
			!Array.isArray(overrides[key])
		) {
			result[key] = deepMerge(result[key] || {}, overrides[key]);
		} else {
			result[key] = overrides[key];
		}
	}
	return result;
}
