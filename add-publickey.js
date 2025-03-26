const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, ".storybook/src/CaptchaForm.stories.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Add publicKey to argTypes
const publicKeyArgumentType = `
			publicKey: {
				control: "text",
				description: "The public key for the captcha API (required)",
				table: {
					type: { summary: "string" },
				},
			},`;

content = content.replace(/onSubmit: \{[\s\S]+?\},/, (match) => `${match}${publicKeyArgumentType}`);

// Update all story args to include publicKey
content = content.replaceAll('args: {\n\t\t\tapiUrl: "http://127.0.0.1:3000/api/captcha"', 'args: {\n\t\t\tapiUrl: "http://127.0.0.1:4000",\n\t\t\tpublicKey: "43f7f0f7-0eb9-4d5b-ade4-1414e30477b9"');

fs.writeFileSync(filePath, content, "utf8");
console.log("Updated CaptchaForm.stories.tsx");
