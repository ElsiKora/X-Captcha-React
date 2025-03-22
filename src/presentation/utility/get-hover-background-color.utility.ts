/* eslint-disable @elsikora/typescript/no-magic-numbers */

/**
 * Calculate hover background color for a button
 * @param {string} baseColor - Base color to darken
 * @returns {string} The hover background color
 */
export const GetHoverBackgroundColor = (baseColor: string): string => {
	// For simplicity, just slightly darken whatever the base color is
	if (baseColor === "#f8f8f8") return "#f0f0f0";

	if (baseColor.startsWith("#") && baseColor.length === 7) {
		// Basic darkening for hex colors - reduce each RGB component by about 8%
		try {
			const r: number = Number.parseInt(baseColor.slice(1, 3), 16);
			const g: number = Number.parseInt(baseColor.slice(3, 5), 16);
			const b: number = Number.parseInt(baseColor.slice(5, 7), 16);

			const darkenValue: number = 20; // Darken by this amount
			const newR: number = Math.max(0, r - darkenValue);
			const newG: number = Math.max(0, g - darkenValue);
			const newB: number = Math.max(0, b - darkenValue);

			return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
		} catch {
			// Fallback if parsing fails
			return "#f0f0f0";
		}
	}

	return "#f0f0f0"; // Default fallback if not a hex color
};
