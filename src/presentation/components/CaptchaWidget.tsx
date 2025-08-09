import type { ChallengeCreateResponse, ChallengeSolveResponse } from "@elsikora/x-captcha-client/api";
import type { CSSProperties, Dispatch, SetStateAction } from "react";

import type { IPowSolverSolution } from "../../infrastructure/interface/pow-solver/solution.interface";
import type { ICaptchaWidgetProperties } from "../interface";
import type { TTranslateFunction } from "../type";

import { XCaptchaApiClient } from "@elsikora/x-captcha-client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { EChallengeType } from "../../infrastructure/enum/challenge-type.enum";
import { PowSolver } from "../../infrastructure/utility/pow-solver.utility";
import CAPTCHA_WIDGET_CONSTANT from "../constant/captcha-widget.constant";
import { createTranslator, detectLanguage } from "../i18n";
import { GenerateThemeVariables } from "../utility";

import styles from "../styles/captcha-widget.module.css";

/**
 * Captcha widget component with modern styling and animations
 * @param {ICaptchaWidgetProperties} props - The properties
 * @returns {React.ReactElement} The captcha widget
 */
export const CaptchaWidget: React.FC<ICaptchaWidgetProperties> = ({ apiUrl, backgroundColor, brandNameColor, challengeType, checkmarkColor, errorTextColor, height = CAPTCHA_WIDGET_CONSTANT.BOX_HEIGHT, language, onError, onLoad, onVerify, powSolver, publicKey, shouldShowBrandName = true, themeColor = "#4285F4", tryAgainButtonBackgroundColor, tryAgainButtonTextColor, width = CAPTCHA_WIDGET_CONSTANT.BOX_WIDTH }: ICaptchaWidgetProperties): React.ReactElement => {
	// Check if publicKey is provided
	const isMissingPublicKey: boolean = !publicKey;

	// eslint-disable-next-line @elsikora/react/1/naming-convention/use-state
	const [client]: [XCaptchaApiClient, Dispatch<SetStateAction<XCaptchaApiClient>>] = useState<XCaptchaApiClient>(() => {
		return new XCaptchaApiClient({ apiKey: publicKey, baseUrl: apiUrl, secretKey: "" });
	});
	const [challenge, setChallenge]: [ChallengeCreateResponse | null, Dispatch<SetStateAction<ChallengeCreateResponse | null>>] = useState<ChallengeCreateResponse | null>(null);
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

	const loadChallenge: () => Promise<void> = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);

			const startTime: number = Date.now();

			const newChallenge: ChallengeCreateResponse | undefined = await client.challenge.create({ type: challengeType });

			const elapsedTime: number = Date.now() - startTime;
			const remainingTime: number = Math.max(0, CAPTCHA_WIDGET_CONSTANT.LOADING_FAKE_DELAY - elapsedTime);

			if (remainingTime > 0) {
				await new Promise((resolve: (value: ChallengeCreateResponse | PromiseLike<ChallengeCreateResponse>) => void) => setTimeout(resolve, remainingTime));
			}

			setChallenge(newChallenge);

			if (newChallenge && onLoad) onLoad(newChallenge);
		} catch {
			setError(translate("failedToLoadChallenge"));

			if (onError) onError(translate("failedToLoadChallenge"));
		} finally {
			setIsLoading(false);
		}
	}, [client, onError, onLoad, translate, challengeType]);

	const validateCaptcha = async (challenge: ChallengeCreateResponse): Promise<void> => {
		try {
			if (challenge.data.type === EChallengeType.POW) {
				const solution: IPowSolverSolution = await PowSolver.solve(
					{
						difficulty: challenge.data.difficulty,
						prefix: challenge.data.challenge,
					},
					powSolver,
				);

				const result: ChallengeSolveResponse = await client.challenge.solve(challenge.id, {
					solution: {
						hash: solution.hash,
						nonce: solution.nonce,
						type: EChallengeType.POW,
					},
				});

				setAnimation("success");
				setHasFakeDelay(false);
				setIsVerified(true);
				setTimeout(() => {
					if (onVerify) onVerify(result.token);
				}, CAPTCHA_WIDGET_CONSTANT.ON_VERIFY_DELAY);
				// eslint-disable-next-line @elsikora/typescript/no-unsafe-enum-comparison
			} else if (challenge.data.type === EChallengeType.CLICK) {
				const result: ChallengeSolveResponse = await client.challenge.solve(challenge.id, {
					solution: {
						data: true,
						type: EChallengeType.CLICK,
					},
				});

				setAnimation("success");
				setHasFakeDelay(false);
				setIsVerified(true);
				setTimeout(() => {
					if (onVerify) onVerify(result.token);
				}, CAPTCHA_WIDGET_CONSTANT.ON_VERIFY_DELAY);
			} else {
				throw new Error("Invalid challenge type or missing data");
			}
		} catch (error) {
			console.error("Verification error:", error);
			setAnimation("error");
			setTimeout((): void => {
				setAnimation("none");
				setHasFakeDelay(false);
				setError(translate("errorDuringVerification"));

				if (onError) onError(translate("errorDuringVerification"));
				void loadChallenge();
			}, CAPTCHA_WIDGET_CONSTANT.RETRY_DELAY);
		} finally {
			setTimeout(() => {
				setIsVerifying(false);
			}, CAPTCHA_WIDGET_CONSTANT.RETRY_DELAY);
		}
	};

	// Handle click for the click captcha
	const handleClick: () => void = useCallback((): void => {
		if (!challenge || isVerified || isVerifying) return;

		try {
			setIsVerifying(true);
			setAnimation("verifying");
			setHasFakeDelay(true);

			setTimeout((): void => {
				void validateCaptcha(challenge).catch((error: unknown) => {
					console.error("Unexpected error:", error);
				});
			}, CAPTCHA_WIDGET_CONSTANT.VERIFY_FAKE_DELAY);
		} catch {
			setAnimation("error");
			setHasFakeDelay(false);
			setTimeout((): void => {
				setAnimation("none");
				setError(translate("errorDuringVerification"));

				if (onError) onError(translate("errorDuringVerification"));
				void loadChallenge();
			}, CAPTCHA_WIDGET_CONSTANT.RETRY_DELAY);
			setTimeout(() => {
				setIsVerifying(false);
			}, CAPTCHA_WIDGET_CONSTANT.RETRY_DELAY);
		}
	}, [challenge, client, loadChallenge, onError, onVerify, isVerified, isVerifying, translate]);

	useEffect(() => {
		if (client) {
			void loadChallenge();
		}
	}, [loadChallenge, client]);

	const renderCaptcha = (): React.ReactElement => {
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
							setIsLoading(true);
							setError(null);
							setTimeout(() => {
								void loadChallenge();
							}, CAPTCHA_WIDGET_CONSTANT.RETRY_DELAY);
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

		switch (challenge.type as EChallengeType) {
			case EChallengeType.CLICK: {
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

			// eslint-disable-next-line @elsikora/sonar/no-duplicated-branches
			case EChallengeType.POW: {
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
