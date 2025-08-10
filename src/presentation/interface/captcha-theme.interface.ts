/**
 * Complete theme configuration for X-Captcha components
 * Groups all visual customization options
 */
export interface ICaptchaTheme {
	/**
	 * Border radius configuration
	 */
	borderRadius?: {
		/**
		 * Large border radius (default: 8px)
		 */
		lg?: string;

		/**
		 * Normal border radius (default: 6px)
		 */
		normal?: string;

		/**
		 * Small border radius (default: 4px)
		 */
		sm?: string;
	};

	/**
	 * Checkbox element configuration
	 */
	checkbox?: {
		/**
		 * Background color for the checkbox
		 */
		backgroundColor?: string;

		/**
		 * Border color for the checkbox (defaults to primary color)
		 */
		borderColor?: string;

		/**
		 * Border radius for the checkbox (default: 4px)
		 */
		borderRadius?: string;

		/**
		 * Border width for the checkbox (default: 2px)
		 */
		borderWidth?: string;

		/**
		 * Checkmark color when verified (default: #fff)
		 */
		checkmarkColor?: string;

		/**
		 * Size of the checkbox (default: 24px)
		 */
		size?: string;
	};

	/**
	 * Primary colors configuration
	 */
	colors?: {
		/**
		 * Background color for the widget (default: #fff)
		 */
		background?: string;

		/**
		 * Color for borders (default: #e0e0e0)
		 */
		border?: string;

		/**
		 * Disabled state text color (default: #9e9e9e)
		 */
		disabled?: string;

		/**
		 * Disabled state background color (default: #e0e0e0)
		 */
		disabledBackground?: string;

		/**
		 * Error color for error messages and states (default: #d32f2f)
		 */
		error?: string;

		/**
		 * Primary theme color (default: #4285F4)
		 * Used for checkbox border, loading spinner, verified state
		 */
		primary?: string;

		/**
		 * Main text color (default: #555)
		 */
		text?: string;

		/**
		 * Light text color for brand name and secondary text (default: #aaa)
		 */
		textLight?: string;
	};

	/**
	 * Effects configuration
	 */
	effects?: {
		/**
		 * Box shadow for normal elements (default: 0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1))
		 */
		shadow?: string;

		/**
		 * Box shadow for large elements (default: 0 6px 12px rgba(0,0,0,0.18), 0 4px 6px rgba(0,0,0,0.1))
		 */
		shadowLg?: string;

		/**
		 * Box shadow for small elements (default: 0 1px 3px rgba(0,0,0,0.08))
		 */
		shadowSm?: string;

		/**
		 * Transition duration for fast animations (default: 0.2s)
		 */
		transitionFast?: string;

		/**
		 * Transition duration for normal animations (default: 0.3s)
		 */
		transitionNormal?: string;
	};

	/**
	 * Verifying overlay configuration
	 */
	overlay?: {
		/**
		 * Background color for the overlay (defaults to widget background)
		 */
		backgroundColor?: string;

		/**
		 * Opacity of the overlay (default: 1)
		 */
		opacity?: number;

		/**
		 * Text color in the overlay
		 */
		textColor?: string;
	};

	/**
	 * Retry button configuration
	 */
	retryButton?: {
		/**
		 * Background color for the retry button (default: #f8f8f8)
		 */
		backgroundColor?: string;

		/**
		 * Border color for the retry button
		 */
		borderColor?: string;

		/**
		 * Border radius for the retry button
		 */
		borderRadius?: string;

		/**
		 * Border width for the retry button
		 */
		borderWidth?: string;

		/**
		 * Hover background color for the retry button
		 * If not provided, will be auto-generated from backgroundColor
		 */
		hoverBackgroundColor?: string;

		/**
		 * Icon color for the retry button (defaults to textColor)
		 */
		iconColor?: string;

		/**
		 * Text color for the retry button (default: #555)
		 */
		textColor?: string;
	};

	/**
	 * Spacing configuration
	 */
	spacing?: {
		/**
		 * Large spacing (default: 24px)
		 */
		lg?: string;

		/**
		 * Medium spacing (default: 16px)
		 */
		md?: string;

		/**
		 * Normal spacing (default: 10px)
		 */
		normal?: string;

		/**
		 * Small spacing (default: 8px)
		 */
		sm?: string;

		/**
		 * Extra small spacing (default: 4px)
		 */
		xs?: string;
	};

	/**
	 * Loading spinner configuration
	 */
	spinner?: {
		/**
		 * Border width of the spinner (default: 2px)
		 */
		borderWidth?: string;

		/**
		 * Color for the spinner (defaults to primary color)
		 */
		color?: string;

		/**
		 * Size of the spinner (default: 20px)
		 */
		size?: string;
	};

	/**
	 * Submit button configuration (for CaptchaForm)
	 */
	submitButton?: {
		/**
		 * Background color for the submit button (defaults to primary color)
		 */
		backgroundColor?: string;

		/**
		 * Border radius for the submit button
		 */
		borderRadius?: string;

		/**
		 * Disabled background color (default: #e0e0e0)
		 */
		disabledBackgroundColor?: string;

		/**
		 * Disabled text color (default: #9e9e9e)
		 */
		disabledTextColor?: string;

		/**
		 * Focus outline color (defaults to primary with opacity)
		 */
		focusOutlineColor?: string;

		/**
		 * Hover background color for the submit button
		 */
		hoverBackgroundColor?: string;

		/**
		 * Text color for the submit button (default: #fff)
		 */
		textColor?: string;
	};

	/**
	 * Typography configuration
	 */
	typography?: {
		/**
		 * Font family for all text (default: Inter, system fonts)
		 */
		fontFamily?: string;

		/**
		 * Font size for medium text (default: 15px)
		 */
		fontSizeMd?: string;

		/**
		 * Font size for small text (default: 14px)
		 */
		fontSizeSm?: string;

		/**
		 * Font size for extra small text (default: 10px)
		 */
		fontSizeXs?: string;

		/**
		 * Font weight for medium text (default: 500)
		 */
		fontWeightMedium?: number;

		/**
		 * Font weight for normal text (default: 400)
		 */
		fontWeightNormal?: number;
	};
}
