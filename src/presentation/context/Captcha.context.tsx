import type { ICaptchaContext, ICaptchaProviderProperties } from "../interface";

import { CaptchaClient } from "@elsikora/x-captcha-client";
import React, { createContext, use, useMemo } from "react";

// Create the context
const CaptchaContext: React.Context<ICaptchaContext | null> = createContext<ICaptchaContext | null>(null);

/**
 * Provider component for captcha functionality
 * @param {ICaptchaProviderProperties} properties The properties for the provider
 * @returns {React.ReactElement} The provider component
 */
export const CaptchaProvider: React.FC<ICaptchaProviderProperties> = ({ apiUrl, children }: ICaptchaProviderProperties): React.ReactElement => {
	// Create a memoized client instance to avoid unnecessary re-renders
	const client: CaptchaClient = useMemo(() => new CaptchaClient({ apiUrl }), [apiUrl]);

	const value: ICaptchaContext = useMemo(
		() => ({
			client,
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
	const context: ICaptchaContext | null = use(CaptchaContext);

	if (!context) {
		throw new Error("useCaptcha must be used within a CaptchaProvider");
	}

	return context;
};
