/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { ICaptchaChallenge, ICaptchaValidationResult } from "@elsikora/x-captcha-client";
import type { Dispatch, SetStateAction } from "react";

import type { ICaptchaWidgetProperties } from "../interface";
import type { TTranslateFunction } from "../type/translation-function.type";

import { ECaptchaType } from "@elsikora/x-captcha-client";
import { CaptchaClient } from "@elsikora/x-captcha-client";
import React, { useCallback, useEffect, useState } from "react";

import { createTranslator, detectLanguage } from "../i18n";

import styles from "../styles/captcha-widget.module.css";

/**
 * Captcha widget component with modern styling and animations
 * @param {ICaptchaWidgetProperties} props - The properties
 * @returns {React.ReactElement} The captcha widget
 */
export const CaptchaWidget: React.FC<ICaptchaWidgetProperties> = ({ apiUrl, height = 74, language, onError, onVerify, themeColor = "#4285F4", width = 300 }: ICaptchaWidgetProperties): React.ReactElement => {
	// eslint-disable-next-line @elsikora/react/1/naming-convention/use-state
	const [client]: [CaptchaClient, Dispatch<SetStateAction<CaptchaClient>>] = useState<CaptchaClient>(() => new CaptchaClient({ apiUrl }));
	const [challenge, setChallenge]: [ICaptchaChallenge | null, Dispatch<SetStateAction<ICaptchaChallenge | null>>] = useState<ICaptchaChallenge | null>(null);
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

	// Load a new challenge
	const loadChallenge: () => Promise<void> = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const newChallenge: ICaptchaChallenge = await client.getChallenge();
			setChallenge(newChallenge);
		} catch {
			setError(translate("failedToLoadChallenge"));

			if (onError) onError(translate("failedToLoadChallenge"));
		} finally {
			setIsLoading(false);
		}
	}, [client, onError, translate]);

	// Validate the captcha challenge
	const validateCaptcha = async (challenge: ICaptchaChallenge): Promise<void> => {
		try {
			const result: ICaptchaValidationResult = await client.validate({
				challengeId: challenge.id,
				// eslint-disable-next-line @elsikora/typescript/naming-convention
				response: true,
			});

			if (result.isSuccess && result.token) {
				setAnimation("success");
				setHasFakeDelay(false);
				setIsVerified(true);
				setTimeout(() => {
					if (onVerify && result.token) onVerify(result.token);
				}, 300);
			} else {
				setAnimation("error");
				setTimeout((): void => {
					setAnimation("none");
					setHasFakeDelay(false);
					setError(result.error ?? translate("verificationFailed"));

					if (onError) onError(result.error ?? translate("verificationFailed"));
					void loadChallenge();
				}, 500);
			}
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
				// Запускаем асинхронную функцию без создания еще одного уровня вложенности
				void validateCaptcha(challenge).catch((error: unknown) => {
					console.error("Unexpected error:", error);
				});
			}, 1500);
		} catch {
			// Код для обработки ошибок остается как был
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

	// Load challenge on mount
	useEffect(() => {
		void loadChallenge();
	}, [loadChallenge]);

	// Render the appropriate captcha based on type
	const renderCaptcha = (): React.ReactElement => {
		if (isLoading) {
			return (
				<div className={styles["x-captcha-loading"]}>
					<div
						className={styles["x-captcha-loading-spinner"]}
						style={{
							animation: "x-captcha-spin 1s linear infinite",
							borderColor: `${themeColor} transparent ${themeColor} ${themeColor}`,
						}}
					/>
					<span>{translate("loading")}</span>
				</div>
			);
		}

		if (error) {
			return (
				<div className={styles["x-captcha-error"]}>
					<div>{error}</div>
					<button className={styles["x-captcha-error-button"]} onClick={() => void loadChallenge()} type={"button"}>
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
				<div className={styles["x-captcha-verified"]} style={{ color: themeColor }}>
					<div className={`${styles["x-captcha-checkbox"]} ${styles["x-captcha-checkbox-verified"]}`} style={{ backgroundColor: themeColor, borderColor: themeColor }}>
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
						<div
							className={`${styles["x-captcha-checkbox"]} ${isVerifying ? styles["x-captcha-checkbox-verifying"] : ""} ${animation === "error" ? styles["x-captcha-checkbox-error"] : ""}`}
							style={{
								// eslint-disable-next-line @elsikora/sonar/no-nested-conditional
								backgroundColor: isVerifying || isVerified ? (animation === "error" ? "#F44336" : themeColor) : "transparent",
								borderColor: animation === "error" ? "#F44336" : themeColor,
							}}>
							{isVerified && (
								<svg className={`${styles["x-captcha-checkmark"]} ${isVerified ? styles["x-captcha-checkmark-visible"] : ""}`} fill={"none"} height={"16"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"3"} viewBox={"0 0 24 24"} width={"16"} xmlns={"http://www.w3.org/2000/svg"}>
									<polyline points={"20 6 9 17 4 12"} />
								</svg>
							)}
							<div
								className={`${styles["x-captcha-pulse"]} ${isVerifying ? styles["x-captcha-pulse-active"] : ""}`}
								style={{
									animation: animation === "verifying" ? "x-captcha-pulse 0.8s ease-out" : "none",
									backgroundColor: themeColor,
								}}
							/>
						</div>
						<div className={styles["x-captcha-text"]}>{translate("notRobot")}</div>
						<div className={styles["x-captcha-brand"]}>{"X-Captcha"}</div>

						{/* Verifying overlay with loading animation */}
						<div className={`${styles["x-captcha-verifying-overlay"]} ${hasFakeDelay ? styles["x-captcha-verifying-overlay-visible"] : ""}`}>
							<div className={styles["x-captcha-loading"]} style={{ color: themeColor }}>
								<div
									className={styles["x-captcha-loading-spinner"]}
									style={{
										animation: "x-captcha-spin 1s linear infinite",
										borderColor: `${themeColor} transparent ${themeColor} ${themeColor}`,
									}}
								/>
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

	return (
		<div className={styles["x-captcha-widget"]} style={{ height, width }}>
			{renderCaptcha()}
		</div>
	);
};
