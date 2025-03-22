import type { FormEvent } from "react";

/**
 * Handle form submission
 * @param token - CAPTCHA token
 * @param event - Form event
 */
export type TFormSubmitHandler = (token: string, event: FormEvent) => void;
