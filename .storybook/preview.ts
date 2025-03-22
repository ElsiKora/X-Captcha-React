import type { Preview } from "@storybook/react";

import { withContainer, withLanguage, withMockCaptchaClient, withThemeColor } from "../src/stories/decorators";

// Импортируем основной файл стилей, который содержит все необходимые CSS переменные и стили
import "../src/presentation/styles/index.css";

const preview: Preview = {
	decorators: [withContainer(), withLanguage("en"), withMockCaptchaClient(), withThemeColor()],
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		backgrounds: {
			default: "light",
			values: [
				{
					name: "light",
					value: "#ffffff",
				},
				{
					name: "dark",
					value: "#333333",
				},
			],
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "centered",
	},
};

export default preview;
