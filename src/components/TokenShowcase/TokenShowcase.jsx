import { Button, Tag } from "antd";

// ── Token constants ──────────────────────────────────
const T = {
	colors: {
		primary: "#8B5CF6",
		primaryHover: "#7C3AED",
		primaryActive: "#6D28D9",
		bg: "#FFFFFF",
		bgSecondary: "#F8FAFC",
		text: "#1A1A2E",
		textSecondary: "#64748B",
		border: "#E2E8F0",
		success: "#22C55E",
		warning: "#F59E0B",
		error: "#EF4444",
		info: "#3B82F6",
	},
	radii: [4, 8, 12, 16],
	space: [4, 8, 12, 16, 24, 32, 48],
	fontSizes: [12, 13, 14, 15, 16, 18, 20, 24, 32],
	shadows: [
		{ name: "sm", value: "0 1px 3px rgba(0,0,0,0.08)" },
		{ name: "md", value: "0 4px 12px rgba(0,0,0,0.10)" },
		{ name: "primary", value: "0 2px 8px rgba(139,92,246,0.30)" },
	],
};

// Tailwind-ish inline style shorthand
const css = {
	page: {
		minHeight: "100vh",
		background: "#fff",
		fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		color: T.colors.text,
	},
	header: { padding: "40px 48px 0" },
	title: { fontSize: 28, fontWeight: 700, marginBottom: 4 },
	subtitle: { fontSize: 14, color: T.colors.textSecondary, marginBottom: 40 },

	section: { padding: "0 48px 48px" },
	sectionH: {
		fontSize: 15,
		fontWeight: 600,
		marginBottom: 20,
		paddingBottom: 10,
		borderBottom: `2px solid ${T.colors.border}`,
	},

	// Colors
	palette: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
		gap: 10,
	},
	swatch: (hex) => ({
		borderRadius: 8,
		padding: "16px 14px 12px",
		minHeight: 76,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		background: hex,
		border: hex === "#FFFFFF" ? `1px solid ${T.colors.border}` : "none",
		boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
	}),
	swatchName: (hex) => ({
		fontSize: 11,
		fontWeight: 600,
		textTransform: "uppercase",
		letterSpacing: ".04em",
		marginBottom: 2,
		color: ["#FFFFFF", "#1A1A2E"].includes(hex)
			? "rgba(255,255,255,.7)"
			: "#475569",
	}),
	swatchHex: (hex) => ({
		fontSize: 12,
		fontWeight: 500,
		color: ["#FFFFFF", "#1A1A2E"].includes(hex)
			? "rgba(255,255,255,.9)"
			: T.colors.text,
	}),

	// Typography
	typoRow: {
		display: "flex",
		alignItems: "baseline",
		gap: 14,
		padding: "6px 0",
		borderBottom: `1px solid ${T.colors.border}`,
	},
	typoGlyph: (s) => ({
		fontSize: s,
		fontWeight: 400,
		minWidth: 48,
		color: T.colors.text,
	}),
	typoMeta: { fontSize: 11, color: T.colors.textSecondary, minWidth: 44 },
	typoVar: {
		fontSize: 11,
		color: T.colors.textSecondary,
		fontFamily: "monospace",
	},

	// Border Radius
	radiiRow: { display: "flex", gap: 24, alignItems: "flex-end", marginTop: 8 },
	radiusBox: (r) => ({
		width: 60,
		height: 60,
		borderRadius: r,
		background: T.colors.primary,
		color: "#fff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 10,
		fontWeight: 600,
	}),
	radiusLabel: {
		textAlign: "center",
		fontSize: 11,
		color: T.colors.textSecondary,
		marginTop: 6,
	},

	// Spacing
	spaceRow: { display: "flex", flexDirection: "column", gap: 4, marginTop: 8 },
	spaceItem: { display: "flex", alignItems: "center", gap: 14 },
	spaceBar: (px) => ({
		width: px,
		height: 18,
		background: T.colors.primary,
		borderRadius: 3,
		opacity: 0.2 + (px / 48) * 0.8,
		transition: "width .3s",
	}),
	spaceLabel: { fontSize: 11, color: T.colors.textSecondary, minWidth: 32 },

	// Shadows
	shadowCard: (s) => ({
		padding: 18,
		borderRadius: 8,
		background: "#fff",
		boxShadow: s,
		marginBottom: 12,
	}),
	shadowName: { fontSize: 13, fontWeight: 600, marginBottom: 2 },
	shadowVal: {
		fontSize: 11,
		color: T.colors.textSecondary,
		fontFamily: "monospace",
	},

	// Components
	compGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
		gap: 12,
	},
	compCard: {
		background: T.colors.bgSecondary,
		borderRadius: 8,
		padding: 14,
		border: `1px solid ${T.colors.border}`,
	},
	compName: {
		fontSize: 12,
		fontWeight: 600,
		marginBottom: 8,
		color: T.colors.text,
	},
	compToken: {
		fontSize: 11,
		marginBottom: 3,
		display: "flex",
		justifyContent: "space-between",
	},
	compKey: { color: T.colors.textSecondary },
	compVal: { fontFamily: "monospace", color: T.colors.text },

	// Live
	liveRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 },
};

// ── Section Components ──

function Colors() {
	return (
		<div style={css.section}>
			<h3 style={css.sectionH}>Color Palette</h3>
			<div style={css.palette}>
				{Object.entries(T.colors).map(([name, hex]) => (
					<div key={name} style={css.swatch(hex)}>
						<span style={css.swatchName(hex)}>{name}</span>
						<span style={css.swatchHex(hex)}>{hex}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function Typography() {
	return (
		<div style={css.section}>
			<h3 style={css.sectionH}>Typography</h3>
			<div style={{ marginBottom: 20 }}>
				<span
					style={{
						fontSize: 11,
						fontWeight: 600,
						color: T.colors.textSecondary,
						textTransform: "uppercase",
						display: "block",
						marginBottom: 8,
					}}
				>
					Font Family
				</span>
				<code
					style={{
						background: T.colors.bgSecondary,
						padding: "6px 12px",
						borderRadius: 6,
						fontSize: 13,
						border: `1px solid ${T.colors.border}`,
					}}
				>
					Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
				</code>
			</div>
			<span
				style={{
					fontSize: 11,
					fontWeight: 600,
					color: T.colors.textSecondary,
					textTransform: "uppercase",
					display: "block",
					marginBottom: 10,
				}}
			>
				Type Scale + Weight
			</span>
			{T.fontSizes.map((s) => (
				<div key={s} style={css.typoRow}>
					<span style={css.typoGlyph(s)}>Aa</span>
					<span style={css.typoMeta}>{s}px</span>
					<span style={{ ...css.typoGlyph(s), fontWeight: 700, minWidth: 0 }}>
						Aa
					</span>
					<span style={{ fontSize: 11, color: T.colors.textSecondary }}>
						{s}px / bold
					</span>
					<span style={css.typoVar}>--font-size-{s}</span>
				</div>
			))}
		</div>
	);
}

function Spacing() {
	return (
		<div style={css.section}>
			<h3 style={css.sectionH}>Spacing Scale</h3>
			<div style={css.spaceRow}>
				{T.space.map((px) => (
					<div key={px} style={css.spaceItem}>
						<span style={css.spaceLabel}>{px}px</span>
						<div style={css.spaceBar(px)} />
					</div>
				))}
			</div>
		</div>
	);
}

function Radii() {
	return (
		<div style={css.section}>
			<h3 style={css.sectionH}>Border Radius</h3>
			<div style={css.radiiRow}>
				{T.radii.map((r) => (
					<div key={r}>
						<div style={css.radiusBox(r)}>{r}px</div>
						<div style={css.radiusLabel}>{r}px</div>
					</div>
				))}
			</div>
		</div>
	);
}

function Shadows() {
	return (
		<div style={css.section}>
			<h3 style={css.sectionH}>Shadows</h3>
			{T.shadows.map((s) => (
				<div key={s.name} style={css.shadowCard(s.value)}>
					<div style={css.shadowName}>{s.name}</div>
					<div style={css.shadowVal}>{s.value}</div>
				</div>
			))}
		</div>
	);
}

function ComponentTokens() {
	const items = [
		{
			name: "Button",
			tokens: {
				controlHeight: "38px",
				borderRadius: "8px",
				primaryShadow: "0 2px 8px rgba(139,92,246,0.3)",
			},
		},
		{
			name: "Table",
			tokens: {
				headerBg: "#F8FAFC",
				borderRadius: "12px",
				borderColor: "#E2E8F0",
			},
		},
		{
			name: "Modal",
			tokens: { borderRadiusLG: "16px", titleFontSize: "18px" },
		},
		{ name: "Input", tokens: { controlHeight: "38px", borderRadius: "8px" } },
	];

	return (
		<div style={css.section}>
			<h3 style={css.sectionH}>Component Token Overrides</h3>
			<div style={css.compGrid}>
				{items.map((item) => (
					<div key={item.name} style={css.compCard}>
						<div style={css.compName}>{item.name}</div>
						{Object.entries(item.tokens).map(([k, v]) => (
							<div key={k} style={css.compToken}>
								<span style={css.compKey}>{k}</span>
								<span style={css.compVal}>{v}</span>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function LivePreview() {
	return (
		<div style={css.section}>
			<h3 style={css.sectionH}>Live Preview</h3>
			<p
				style={{
					fontSize: 13,
					color: T.colors.textSecondary,
					marginBottom: 16,
				}}
			>
				Components rendered inside <code>ThemeProvider</code>. Tokens above
				dictate their look.
			</p>
			<div style={css.liveRow}>
				<Button type="primary">Primary</Button>
				<Button>Default</Button>
				<Button type="dashed">Dashed</Button>
				<Button type="text">Text</Button>
				<Button type="link">Link</Button>
				<Button danger>Danger</Button>
			</div>
			<div style={css.liveRow}>
				<Button type="primary" size="small">
					Small
				</Button>
				<Button type="primary">Medium</Button>
				<Button type="primary" size="large">
					Large
				</Button>
			</div>
			<div style={css.liveRow}>
				<Tag color={T.colors.primary}>Primary</Tag>
				<Tag color={T.colors.success}>Success</Tag>
				<Tag color={T.colors.warning}>Warning</Tag>
				<Tag color={T.colors.error}>Error</Tag>
				<Tag color={T.colors.info}>Info</Tag>
			</div>
		</div>
	);
}

// ── Main exported component ──
export default function TokenShowcase() {
	return (
		<div style={css.page}>
			<div style={css.header}>
				<h1 style={css.title}>Design Tokens</h1>
				<p style={css.subtitle}>Source of truth for the entire library.</p>
			</div>
			<Colors />
			<Typography />
			<Spacing />
			<Radii />
			<Shadows />
			<ComponentTokens />
			<LivePreview />
		</div>
	);
}
