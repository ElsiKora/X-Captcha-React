import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	addons: ["@storybook/addon-essentials", "@storybook/addon-onboarding", "@chromatic-com/storybook", "@storybook/addon-interactions", "@storybook/addon-a11y", "@storybook/addon-controls"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	staticDirs: ["../public"],
	stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	typescript: {
		// eslint-disable-next-line @elsikora/typescript/naming-convention
		check: true,
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			compilerOptions: {
				// eslint-disable-next-line @elsikora/typescript/naming-convention
				allowSyntheticDefaultImports: true,
				// eslint-disable-next-line @elsikora/typescript/naming-convention
				esModuleInterop: true,
			},
			// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access,@elsikora/typescript/no-unsafe-call
			propFilter: (property: any) => (property.parent ? !property.parent.fileName.includes("node_modules") : true),
			shouldExtractLiteralValuesFromEnum: true,
		},
	},
};
export default config;
