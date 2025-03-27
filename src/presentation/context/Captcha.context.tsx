/* eslint-disable @elsikora/react/1/no-use-context */
import type { ICaptchaContext, ICaptchaProviderProperties, ILanguage } from "../interface";

import { XCaptchaApiClient } from "@elsikora/x-captcha-client";
import React, { createContext, useContext, useMemo } from "react";

import { createTranslator, detectLanguage } from "../i18n";

import styles from "../styles/captcha-widget.module.css";

// Create the context
const CaptchaContext: React.Context<ICaptchaContext | null> = createContext<ICaptchaContext | null>(null);

/**
 * Provider component for captcha functionality
 * @param {ICaptchaProviderProperties} properties The properties for the provider
 * @returns {React.ReactElement} The provider component
 */
export const CaptchaProvider: React.FC<ICaptchaProviderProperties> = ({ apiUrl, children, language, publicKey }: ICaptchaProviderProperties): React.ReactElement => {
	// Check if publicKey is provided
	const isMissingPublicKey: boolean = !publicKey;

	// Initialize translation function
	const translate: (key: keyof ILanguage) => string = useMemo(() => {
		const detectedLanguage: string = language ?? detectLanguage();

		return createTranslator(detectedLanguage);
	}, [language]);

	// Create a memoized client instance to avoid unnecessary re-renders
	const client: null | XCaptchaApiClient = useMemo(() => {
		if (!publicKey) {
			return null;
		}

		return new XCaptchaApiClient({ apiKey: publicKey, baseUrl: apiUrl, secretKey: "" });
	}, [apiUrl, publicKey]);

	// If publicKey is missing, render an error message in captcha error style
	if (isMissingPublicKey) {
		return (
			<div className={styles["x-captcha-widget"]} style={{ height: "74px", width: "100%" }}>
				<div className={styles["x-captcha-error"]}>
					<div>{translate("missingProviderKey")}</div>
				</div>
			</div>
		);
	}

	const value: ICaptchaContext = useMemo(
		() => ({
			// eslint-disable-next-line @elsikora/typescript/no-non-null-assertion
			client: client!,
		}),
		[client],
	);

	return <CaptchaContext value={value}>{children}</CaptchaContext>;
};

/**
 * Hook to use captcha functionality
 * @returns {ICaptchaContext} The captcha context
 */
export const useCaptcha = (): ICaptchaContext => {
	const context: ICaptchaContext | null = useContext(CaptchaContext);

	if (!context) {
		throw new Error("useCaptcha must be used within a CaptchaProvider");
	}

	return context;
};
