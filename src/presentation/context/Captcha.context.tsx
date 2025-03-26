/* eslint-disable @elsikora/react/1/no-use-context */
import type { ICaptchaContext, ICaptchaProviderProperties } from "../interface";

import { CaptchaClient } from "@elsikora/x-captcha-client";
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
	const isMissingPublicKey = !publicKey;
	
	// Initialize translation function
	const translate = useMemo(() => {
		const detectedLanguage = language ?? detectLanguage();
		return createTranslator(detectedLanguage);
	}, [language]);
	
	// Create a memoized client instance to avoid unnecessary re-renders
	const client: CaptchaClient | null = useMemo(() => {
		if (!publicKey) {
			return null;
		}
		return new CaptchaClient({ apiUrl, publicKey });
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
			client: client as CaptchaClient,
		}),
		[client],
	);

	return <CaptchaContext.Provider value={value}>{children}</CaptchaContext.Provider>;
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
