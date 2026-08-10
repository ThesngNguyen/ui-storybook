import { Button } from "antd";

export default {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["default", "primary", "dashed", "link", "text"],
		},
		size: {
			control: "select",
			options: ["small", "middle", "large"],
		},
		disabled: { control: "boolean" },
		loading: { control: "boolean" },
		children: { control: "text" },
	},
};

export const Primary = {
	args: {
		type: "primary",
		children: "Primary Button",
	},
};

export const Default = {
	args: {
		type: "default",
		children: "Default Button",
	},
};

export const Dashed = {
	args: {
		type: "dashed",
		children: "Dashed Button",
	},
};

export const Text = {
	args: {
		type: "text",
		children: "Text Button",
	},
};

export const Link = {
	args: {
		type: "link",
		children: "Link Button",
	},
};

export const Disabled = {
	args: {
		type: "primary",
		disabled: true,
		children: "Disabled",
	},
};

export const Loading = {
	args: {
		type: "primary",
		loading: true,
		children: "Loading",
	},
};

export const Sizes = {
	render: () => (
		<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
			<Button type="primary" size="small">
				Small
			</Button>
			<Button type="primary" size="middle">
				Middle
			</Button>
			<Button type="primary" size="large">
				Large
			</Button>
		</div>
	),
};
