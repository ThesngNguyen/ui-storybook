import React from "react";
import { ConfigProvider } from "antd";

const defaultTheme = {
	token: {
		colorPrimary: "#8B5CF6",
		borderRadius: 8,
		fontFamily:
			"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		fontSize: 14,
		colorBgContainer: "#ffffff",
		colorText: "#1a1a2e",
	},
	components: {
		Button: {
			borderRadius: 8,
			controlHeight: 38,
			primaryShadow: "0 2px 8px rgba(139, 92, 246, 0.3)",
		},
		Table: {
			headerBg: "#F8FAFC",
			borderColor: "#E2E8F0",
			borderRadius: 12,
		},
		Modal: {
			borderRadiusLG: 16,
			titleFontSize: 18,
		},
		Input: {
			borderRadius: 8,
			controlHeight: 38,
		},
	},
};

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
