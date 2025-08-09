import type { IEmaiFieldProperties, IPasswordFieldProperties, ITextAreaFieldProperties, ITextFieldProperties } from "../interface";

import React from "react";

// Basic styling for form components
const formStyles: Record<string, object> = {
	error: {
		color: "#d32f2f",
		fontSize: "12px",
		marginTop: "4px",
	},
	field: {
		marginBottom: "15px",
		width: "100%",
	},
	fieldset: {
		border: "none",
		margin: 0,
		padding: 0,
		width: "100%",
	},
	input: {
		border: "1px solid #e0e0e0",
		borderRadius: "4px",
		fontSize: "14px",
		minHeight: "40px",
		outline: "none",
		padding: "8px 12px",
		transition: "border-color 0.2s ease",
		width: "100%",
	},
	inputFocus: {
		borderColor: "#4285F4",
		boxShadow: "0 0 0 3px rgba(66, 133, 244, 0.1)",
	},
	label: {
		display: "block",
		fontSize: "14px",
		fontWeight: 500,
		marginBottom: "5px",
	},
};

/**
 * Text input field component
 * @param {ITextFieldProperties} properties - Text field properties
 * @returns {React.ReactElement} - Text field component
 */
export const TextField = ({ error, id, isRequired = false, label, placeholder, type = "text" }: ITextFieldProperties): React.ReactElement => {
	return (
		<div style={formStyles.field}>
			<label htmlFor={id} style={formStyles.label}>
				{label} {isRequired && <span style={{ color: "#d32f2f" }}>{"*"}</span>}
			</label>
			<input
				id={id}
				onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
					event.target.style.borderColor = "#e0e0e0";
					event.target.style.boxShadow = "none";
				}}
				// Basic hover/focus effects
				onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
					event.target.style.borderColor = "#4285F4";
					event.target.style.boxShadow = "0 0 0 3px rgba(66, 133, 244, 0.1)";
				}}
				placeholder={placeholder}
				required={isRequired}
				style={formStyles.input}
				type={type}
			/>
			{error && <div style={formStyles.error}>{error}</div>}
		</div>
	);
};

/**
 * Email input field component
 * @param {IEmaiFieldProperties} properties - Email field properties
 * @returns {React.ReactElement} - Email field component
 */
export const EmailField = ({ error, id = "email", isRequired = true, label = "Email" }: IEmaiFieldProperties): React.ReactElement => {
	return <TextField error={error} id={id} isRequired={isRequired} label={label} placeholder={"your@email.com"} type={"email"} />;
};

/**
 * Password input field component
 * @param {IPasswordFieldProperties} properties - Password field properties
 * @returns {React.ReactElement} - Password field component
 */
// eslint-disable-next-line @elsikora/no-secrets/no-pattern-match
export const PasswordField = ({ error, id = "password", isRequired = true, label = "Password" }: IPasswordFieldProperties): React.ReactElement => {
	return <TextField error={error} id={id} isRequired={isRequired} label={label} placeholder={"••••••••"} type={"password"} />;
};

/**
 * Textarea field component
 * @param {ITextAreaFieldProperties} properties - Textarea field properties
 * @returns {React.ReactElement} - Textarea field component
 */
export const TextareaField = ({ error, id, isRequired = false, label, placeholder, rows = 4 }: ITextAreaFieldProperties): React.ReactElement => {
	return (
		<div style={formStyles.field}>
			<label htmlFor={id} style={formStyles.label}>
				{label} {isRequired && <span style={{ color: "#d32f2f" }}>{"*"}</span>}
			</label>
			<textarea
				id={id}
				onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
					event.target.style.borderColor = "#e0e0e0";
					event.target.style.boxShadow = "none";
				}}
				// Basic hover/focus effects
				onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
					event.target.style.borderColor = "#4285F4";
					event.target.style.boxShadow = "0 0 0 3px rgba(66, 133, 244, 0.1)";
				}}
				placeholder={placeholder}
				required={isRequired}
				rows={rows}
				style={{
					...formStyles.input,
					minHeight: "80px",
					resize: "vertical",
				}}
			/>
			{error && <div style={formStyles.error}>{error}</div>}
		</div>
	);
};

/**
 * Login form fields component (email + password)
 * @returns {React.ReactElement} - Login form fields component
 */
export const LoginFormFields = (): React.ReactElement => {
	return (
		<>
			<EmailField />
			<PasswordField />
		</>
	);
};

/**
 * Contact form fields component (name + email + message)
 * @returns {React.ReactElement} - Contact form fields component
 */
export const ContactFormFields = (): React.ReactElement => {
	return (
		<>
			<TextField id={"name"} isRequired={true} label={"Name"} placeholder={"Your name"} />
			<EmailField />
			<TextareaField id={"message"} isRequired={true} label={"Message"} placeholder={"Your message here..."} />
		</>
	);
};

/**
 * Registration form fields component
 * @returns {React.ReactElement} - Registration form fields component
 */
export const RegistrationFormFields = (): React.ReactElement => {
	return (
		<>
			<TextField id={"fullName"} isRequired={true} label={"Full Name"} placeholder={"John Doe"} />
			<EmailField />
			<PasswordField />
			<PasswordField id={"confirmPassword"} label={"Confirm Password"} />
		</>
	);
};
