import type { CSSProperties, Dispatch, FormEvent, SetStateAction } from "react";

import type { ICaptchaFormProperties } from "../interface";
import type { TTranslateFunction } from "../type";

import React, { useCallback, useMemo, useState } from "react";

import { createTranslator, detectLanguage } from "../i18n";
import { GenerateThemeVariables } from "../utility";

import { CaptchaWidget } from "./CaptchaWidget";

import styles from "../styles/captcha-form.module.css";

/**
 * Form component with integrated captcha and modern styling
 * @param {ICaptchaFormProperties} props - The properties
 * @returns {React.ReactElement} The captcha form
 */
export const CaptchaForm: React.FC<ICaptchaFormProperties> = ({ apiUrl, buttonColor, children, className = "", language, onSubmit, submitButtonText, themeColor = "#4285F4", ...captchaProperties }: ICaptchaFormProperties): React.ReactElement => {
	const [token, setToken]: [null | string, Dispatch<SetStateAction<null | string>>] = useState<null | string>(null);
	const [error, setError]: [null | string, Dispatch<SetStateAction<null | string>>] = useState<null | string>(null);
	const [isHovering, setIsHovering]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
	const [isFocused, setIsFocused]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

	// eslint-disable-next-line @elsikora/react/1/naming-convention/use-state
	const [translate]: [TTranslateFunction, Dispatch<SetStateAction<TTranslateFunction>>] = useState<TTranslateFunction>(() => {
		const detectedLanguage: string = language ?? detectLanguage();

		return createTranslator(detectedLanguage);
	});

	// Generate CSS variables from theme props
	const themeVariables: CSSProperties = useMemo<CSSProperties>(
		() =>
			GenerateThemeVariables({
				buttonColor,
				themeColor,
			}),
		[buttonColor, themeColor],
	);

	const defaultSubmitText: string = submitButtonText ?? "Submit";

	const handleVerify: (newToken: string) => void = useCallback((newToken: string) => {
		setToken(newToken);
		setError(null);
	}, []);

	const handleError: (errorMessage: string) => void = useCallback((errorMessage: string) => {
		setToken(null);
		setError(errorMessage);
	}, []);

	const handleSubmit: (event: React.FormEvent) => void = useCallback(
		(event: FormEvent) => {
			event.preventDefault();

			if (!token) {
				setError(translate("pleaseCompleteCaptcha"));

				return;
			}

			onSubmit(token, event);
		},
		[token, onSubmit, translate],
	);

	const buttonClasses: string = [styles["x-captcha-submit-button"], token ? styles["x-captcha-submit-button-active"] : styles["x-captcha-submit-button-disabled"], token && isHovering ? styles["x-captcha-submit-button-hover"] : "", token && isFocused ? styles["x-captcha-submit-button-focus"] : ""].filter(Boolean).join(" ");

	return (
		<form className={`${styles["x-captcha-form"]} ${className}`} onSubmit={handleSubmit} style={themeVariables}>
			{/* Children elements (form fields) */}
			{/* eslint-disable-next-line @elsikora/react/1/no-useless-fragment */}
			{children ? <div className={styles["x-captcha-children-container"]}>{children}</div> : <></>}

			{/* Captcha widget */}
			<div className={styles["x-captcha-captcha-container"]}>
				<CaptchaWidget apiUrl={apiUrl} language={language} onError={handleError} onVerify={handleVerify} themeColor={themeColor} {...captchaProperties} />
			</div>

			{/* Error message */}
			{error && (
				<div className={styles["x-captcha-error"]}>
					<span className={styles["x-captcha-error-icon"]}>
						<svg fill={"none"} height={"16"} stroke={"currentColor"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"} viewBox={"0 0 24 24"} width={"16"} xmlns={"http://www.w3.org/2000/svg"}>
							<circle cx={"12"} cy={"12"} r={"10"} />
							<line x1={"12"} x2={"12"} y1={"8"} y2={"12"} />
							<line x1={"12"} x2={"12.01"} y1={"16"} y2={"16"} />
						</svg>
					</span>
					{error}
				</div>
			)}

			{/* Submit button */}
			<button
				className={buttonClasses}
				disabled={!token}
				onBlur={() => {
					if (token) setIsFocused(false);
				}}
				onFocus={() => {
					if (token) setIsFocused(true);
				}}
				onMouseEnter={() => {
					if (token) setIsHovering(true);
				}}
				onMouseLeave={() => {
					if (token) setIsHovering(false);
				}}
				type={"submit"}>
				{defaultSubmitText}
			</button>
		</form>
	);
};
