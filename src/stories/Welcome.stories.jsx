import TokenShowcase from "../components/TokenShowcase/TokenShowcase";

export default {
	title: "Welcome",
	component: TokenShowcase,
	parameters: {
		layout: "fullscreen",
	},
};

export const DesignTokens = {
	render: () => <TokenShowcase />,
};
