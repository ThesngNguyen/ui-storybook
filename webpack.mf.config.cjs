const path = require("node:path");

const MF_NAME = "ui_components";
const PUBLIC_PATH = process.env.MF_PUBLIC_PATH || "auto";

const SHARED = {
	react: { singleton: true, requiredVersion: false },
	"react-dom": { singleton: true, requiredVersion: false },
	"react/jsx-runtime": { singleton: true, requiredVersion: false },
	"react-dom/client": { singleton: true, requiredVersion: false },
	antd: { singleton: true, requiredVersion: false },
	"@ant-design/icons": { singleton: true, requiredVersion: false },
};

module.exports = {
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	entry: {},
	devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",

	output: {
		path: path.resolve(__dirname, "mf"),
		publicPath: PUBLIC_PATH,
		uniqueName: MF_NAME,
		filename: "[name].[contenthash:8].js",
		chunkFilename: "[name].[contenthash:8].js",
		clean: true,
		crossOriginLoading: "anonymous",
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
	},

	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				resolve: { fullySpecified: false },
				use: {
					loader: "babel-loader",
					options: {
						babelrc: false,
						configFile: false,
						cacheDirectory: true,
						presets: [
							["@babel/preset-env", { targets: "defaults", modules: false }],
							["@babel/preset-react", { runtime: "automatic" }],
							"@babel/preset-typescript",
						],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	optimization: {
		runtimeChunk: false,
		splitChunks: false,
		minimize: process.env.NODE_ENV === "production",
	},

	plugins: [
		new (require("webpack").container.ModuleFederationPlugin)({
			name: MF_NAME,
			filename: "remoteEntry.js",
			library: { type: "var", name: MF_NAME },

			exposes: {
				"./ui": "./src/mf/entry.tsx",
				"./ThemeProvider": "./src/theme/ThemeProvider.jsx",
				"./themeConfig": "./src/theme/themeConfig.js",
				"./TokenShowcase": "./src/components/TokenShowcase/TokenShowcase.jsx",
			},

			shared: SHARED,
		}),
	],
};
