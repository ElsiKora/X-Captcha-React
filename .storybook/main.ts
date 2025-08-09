import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	addons: ["@storybook/addon-onboarding", "@storybook/addon-a11y"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	stories: ["./src/**/*.mdx", "./src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	typescript: {
		check: true,
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			compilerOptions: {
				allowSyntheticDefaultImports: true,

				esModuleInterop: true,
			},
			propFilter: (property: { parent?: { fileName: string } }) => (property.parent ? !property.parent.fileName.includes("node_modules") : true),
			shouldExtractLiteralValuesFromEnum: true,
		},
	},
};
export default config;
