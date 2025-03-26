/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { IChallenge, IChallengeSolveResponse } from "@elsikora/x-captcha-client";
import type { CSSProperties, Dispatch, SetStateAction } from "react";

import type { ICaptchaWidgetProperties } from "../interface";
import type { TTranslateFunction } from "../type";

import { CaptchaClient, ECaptchaType } from "@elsikora/x-captcha-client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { createTranslator, detectLanguage } from "../i18n";
import { GenerateThemeVariables } from "../utility";

import styles from "../styles/captcha-widget.module.css";

/**
 * Captcha widget component with modern styling and animations
 * @param {ICaptchaWidgetProperties} props - The properties
 * @returns {React.ReactElement} The captcha widget
 */
export const CaptchaWidget: React.FC<ICaptchaWidgetProperties> = ({ apiUrl, backgroundColor, brandNameColor, checkmarkColor, errorTextColor, height = 74, language, onError, onVerify, publicKey, shouldShowBrandName = true, themeColor = "#4285F4", tryAgainButtonBackgroundColor, tryAgainButtonTextColor, width = 300 }: ICaptchaWidgetProperties): React.ReactElement => {
	// Check if publicKey is provided
	const isMissingPublicKey: boolean = !publicKey;

	// eslint-disable-next-line @elsikora/react/1/naming-convention/use-state
	const [client]: [CaptchaClient | null, Dispatch<SetStateAction<CaptchaClient | null>>] = useState<CaptchaClient | null>(() => {
		if (!publicKey) {
			return null;
		}

		return new CaptchaClient({ apiUrl, publicKey });
	});
	const [challenge, setChallenge]: [IChallenge | null, Dispatch<SetStateAction<IChallenge | null>>] = useState<IChallenge | null>(null);
	const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
	const [isVerifying, setIsVerifying]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
	const [isVerified, setIsVerified]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
	const [error, setError]: [null | string, Dispatch<SetStateAction<null | string>>] = useState<null | string>(null);
	const [animation, setAnimation]: [string, Dispatch<SetStateAction<string>>] = useState<string>("none");
	const [hasFakeDelay, setHasFakeDelay]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

	// Determine which language to use - either from props or auto-detect
	// eslint-disable-next-line @elsikora/react/1/naming-convention/use-state
	const [translate]: [TTranslateFunction, Dispatch<SetStateAction<TTranslateFunction>>] = useState<TTranslateFunction>(() => {
		const detectedLanguage: string = language ?? detectLanguage();

		return createTranslator(detectedLanguage);
	});

	// Generate CSS variables from theme props
	const themeVariables: CSSProperties = useMemo<CSSProperties>(
		() =>
			GenerateThemeVariables({
				backgroundColor,
				brandNameColor,
				checkmarkColor,
				errorTextColor,
				themeColor,
				tryAgainButtonBackgroundColor,
				tryAgainButtonTextColor,
			}),
		[backgroundColor, brandNameColor, checkmarkColor, errorTextColor, themeColor, tryAgainButtonBackgroundColor, tryAgainButtonTextColor],
	);

	// Load a new challenge with smooth transition
	const loadChallenge: () => Promise<void> = useCallback(async () => {
		try {
			// Start with loading state and clear error
			setIsLoading(true);
			setError(null);

			// Add a minimum load time for smooth transitions
			const minLoadTime: number = 800; // milliseconds
			const startTime: number = Date.now();

			// Load the actual challenge
			const newChallenge: IChallenge = await client.createChallenge(ECaptchaType.CLICK);

			// Calculate remaining time to meet minimum load time
			const elapsedTime: number = Date.now() - startTime;
			const remainingTime: number = Math.max(0, minLoadTime - elapsedTime);

			// Add artificial delay if needed for smoother UX
			if (remainingTime > 0) {
				await new Promise((resolve: (value: IChallenge | PromiseLike<IChallenge>) => void) => setTimeout(resolve, remainingTime));
			}

			setChallenge(newChallenge);
		} catch {
			setError(translate("failedToLoadChallenge"));

			if (onError) onError(translate("failedToLoadChallenge"));
		} finally {
			setIsLoading(false);
		}
	}, [client, onError, translate]);

	// Validate the captcha challenge
	const validateCaptcha = async (challenge: IChallenge): Promise<void> => {
		try {
			const result: IChallengeSolveResponse = await client.solveChallenge(challenge.id, "click");

			setAnimation("success");
			setHasFakeDelay(false);
			setIsVerified(true);
			setTimeout(() => {
				if (onVerify && result.token) onVerify(result.token);
			}, 300);
		} catch {
			setAnimation("error");
			setTimeout((): void => {
				setAnimation("none");
				setHasFakeDelay(false);
				setError(translate("errorDuringVerification"));

				if (onError) onError(translate("errorDuringVerification"));
				void loadChallenge();
			}, 500);
		} finally {
			setTimeout(() => {
				setIsVerifying(false);
			}, 500);
		}
	};

	// Handle click for the click captcha
	const handleClick: () => void = useCallback((): void => {
		if (!challenge || isVerified || isVerifying) return;

		try {
			// Start loading state and delay verification for perceived security
			setIsVerifying(true);
			setAnimation("verifying");
			setHasFakeDelay(true);

			// Add artificial delay for better UX
			setTimeout((): void => {
				// Run the async function without creating another level of nesting
				void validateCaptcha(challenge).catch((error: unknown) => {
					console.error("Unexpected error:", error);
				});
			}, 1500);
		} catch {
			// Error handling code remains as before
			setAnimation("error");
			setHasFakeDelay(false);
			setTimeout((): void => {
				setAnimation("none");
				setError(translate("errorDuringVerification"));

				if (onError) onError(translate("errorDuringVerification"));
				void loadChallenge();
			}, 500);
			setTimeout(() => {
				setIsVerifying(false);
			}, 500);
		}
	}, [challenge, client, loadChallenge, onError, onVerify, isVerified, isVerifying, translate]);

	// Load challenge on mount if publicKey is provided
	useEffect(() => {
		if (client) {
			void loadChallenge();
		}
	}, [loadChallenge, client]);

	// Render the appropriate captcha based on type
	const renderCaptcha = (): React.ReactElement => {
		// Check for missing publicKey first
		if (isMissingPublicKey) {
			return (
				<div className={styles["x-captcha-error"]}>
					<div>{translate("missingPublicKey")}</div>
				</div>
			);
		}

		if (isLoading) {
			return (
				<div className={styles["x-captcha-loading"]}>
					<div className={styles["x-captcha-loading-spinner"]} />
					<span>{translate("loading")}</span>
				</div>
			);
		}

		if (error) {
			return (
				<div className={styles["x-captcha-error"]}>
					<div>{error}</div>
					<button
						className={styles["x-captcha-error-button"]}
						onClick={() => {
							// Set loading state immediately
							setIsLoading(true);
							// Clear error message for a clean transition
							setError(null);
							// Add a delay before actually loading to ensure visual transition is noticeable
							setTimeout(() => {
								void loadChallenge();
							}, 300);
						}}
						type={"button"}>
						<span className={styles["x-captcha-error-button-icon"]}>
							<svg fill={"none"} height={"14"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"} viewBox={"0 0 24 24"} width={"14"} xmlns={"http://www.w3.org/2000/svg"}>
								<path d={"M21 12a9 9 0 0 1-9 9c-4.95 0-9-4.05-9-9s4.05-9 9-9c2.4 0 4.65.9 6.3 2.55"} />
								<polyline points={"21 3 21 9 15 9"} />
							</svg>
						</span>
						{translate("tryAgain")}
					</button>
				</div>
			);
		}

		if (isVerified) {
			return (
				<div className={styles["x-captcha-verified"]}>
					<div className={`${styles["x-captcha-checkbox"]} ${styles["x-captcha-checkbox-verified"]}`}>
						<svg className={`${styles["x-captcha-checkmark"]} ${styles["x-captcha-checkmark-visible"]}`} fill={"none"} height={"16"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"3"} viewBox={"0 0 24 24"} width={"16"} xmlns={"http://www.w3.org/2000/svg"}>
							<polyline points={"20 6 9 17 4 12"} />
						</svg>
					</div>
					<span>{translate("verified")}</span>
				</div>
			);
		}

		if (!challenge) {
			return <div className={styles["x-captcha-error"]}>{translate("noChallenge")}</div>;
		}

		// Render based on challenge type
		// eslint-disable-next-line @elsikora/sonar/no-small-switch
		switch (challenge.type) {
			case ECaptchaType.CLICK: {
				return (
					// eslint-disable-next-line @elsikora/jsx/click-events-have-key-events,@elsikora/jsx/no-static-element-interactions
					<div className={styles["x-captcha-container"]} onClick={handleClick}>
						<div className={`${styles["x-captcha-checkbox"]} ${isVerifying ? styles["x-captcha-checkbox-verifying"] : ""} ${animation === "error" ? styles["x-captcha-checkbox-error"] : ""}`}>
							{isVerified && (
								<svg className={`${styles["x-captcha-checkmark"]} ${isVerified ? styles["x-captcha-checkmark-visible"] : ""}`} fill={"none"} height={"16"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"3"} viewBox={"0 0 24 24"} width={"16"} xmlns={"http://www.w3.org/2000/svg"}>
									<polyline points={"20 6 9 17 4 12"} />
								</svg>
							)}
							<div
								className={`${styles["x-captcha-pulse"]} ${isVerifying ? styles["x-captcha-pulse-active"] : ""}`}
								style={{
									animation: animation === "verifying" ? "x-captcha-pulse 0.8s ease-out" : "none",
								}}
							/>
						</div>
						<div className={styles["x-captcha-text"]}>{translate("notRobot")}</div>
						{shouldShowBrandName && <div className={styles["x-captcha-brand"]}>{translate("brandName")}</div>}

						{/* Verifying overlay with loading animation */}
						<div className={`${styles["x-captcha-verifying-overlay"]} ${hasFakeDelay ? styles["x-captcha-verifying-overlay-visible"] : ""}`}>
							<div className={styles["x-captcha-loading"]}>
								<div className={styles["x-captcha-loading-spinner"]} />
								<span>{translate("verifying")}</span>
							</div>
						</div>
					</div>
				);
			}

			default: {
				return <div className={styles["x-captcha-error"]}>{translate("unsupportedCaptchaType")}</div>;
			}
		}
	};

	// Set dimensions as inline styles as they're specific to the instance, not part of theming
	const widgetStyle: CSSProperties = {
		...themeVariables,
		height,
		width,
	};

	return (
		<div className={styles["x-captcha-widget"]} style={widgetStyle}>
			{renderCaptcha()}
		</div>
	);
};
