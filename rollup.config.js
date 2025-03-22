import path from "node:path";

import typescript from "@rollup/plugin-typescript";
import generatePackageJson from "rollup-plugin-generate-package-json";
import postcss from "rollup-plugin-postcss";

// Mark React and React DOM as external dependencies
const external = ["react", "react-dom", "@elsikora/x-captcha-client", "react/jsx-runtime"];

export default [
	{
		external,
		input: "src/index.ts",
		output: {
			dir: "dist/esm",
			format: "esm",
			preserveModules: true,
			preserveModulesRoot: "src",
			sourcemap: true,
		},
		plugins: [
			typescript({
				declaration: true,
				declarationDir: "dist/esm",
				outDir: "dist/esm",
				outputToFilesystem: true,
				rootDir: "./src",
				sourceMap: true,
				tsconfig: "./tsconfig.build.json",
			}),
			postcss({
				autoModules: true,
				extensions: [".css", ".module.css"],
				extract: path.resolve("dist/esm/styles.css"),
				inject: false,
				minimize: true,
				modules: {
					generateScopedName: "[local]_[hash:base64:5]",
				},
				sourceMap: true,
			}),
			generatePackageJson({
				baseContents: { type: "module" },
				outputFolder: "dist/esm",
			}),
		],
	},
	{
		external,
		input: "src/index.ts",
		output: {
			dir: "dist/cjs",
			exports: "named",
			format: "cjs",
			preserveModules: true,
			preserveModulesRoot: "src",
			sourcemap: true,
		},
		plugins: [
			typescript({
				declaration: true,
				declarationDir: "dist/cjs",
				outDir: "dist/cjs",
				outputToFilesystem: true,
				rootDir: "./src",
				sourceMap: true,
				tsconfig: "./tsconfig.build.json",
			}),
			postcss({
				autoModules: true,
				extensions: [".css", ".module.css"],
				extract: path.resolve("dist/cjs/styles.css"),
				inject: false,
				minimize: true,
				modules: {
					generateScopedName: "[local]_[hash:base64:5]",
				},
				sourceMap: true,
			}),
			generatePackageJson({
				baseContents: { type: "commonjs" },
				outputFolder: "dist/cjs",
			}),
		],
	},
];
