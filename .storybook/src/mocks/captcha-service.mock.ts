/* eslint-disable @elsikora/typescript/no-magic-numbers */

import type { ChallengeCreateResponse, ChallengeSolveResponse } from "@elsikora/x-captcha-client/api";

import { EChallengeType } from "../../../src/infrastructure/enum/challenge-type.enum";

/**
 * Mock implementation of the CaptchaClient for Storybook
 */
export class MockCaptchaClient {
	private readonly API_URL: string;

	private readonly RESPONSE_DELAY: number;

	private readonly SHOULD_SUCCEED: boolean;

	private readonly SHOULD_TIMEOUT: boolean;

	/**
	 * Create a new MockCaptchaClient
	 * @param {object} options - The client options
	 * @param {string} options.apiUrl - The API URL
	 * @param {number} [options.responseDelay] - The response delay
	 * @param {boolean} [options.shouldSucceed] - Whether the request should succeed
	 * @param {boolean} [options.shouldTimeout] - Whether the request should be timeout
	 */
	constructor(options: { apiUrl: string; responseDelay?: number; shouldSucceed?: boolean; shouldTimeout?: boolean }) {
		this.API_URL = options.apiUrl;
		this.SHOULD_SUCCEED = options.shouldSucceed ?? true;
		this.SHOULD_TIMEOUT = options.shouldTimeout ?? false;
		this.RESPONSE_DELAY = options.responseDelay ?? 500;
	}

	/**
	 * Get a mock challenge
	 * @returns {Promise<ChallengeCreateResponse>} A promise that resolves to a mock challenge
	 */
	public async getChallenge(): Promise<ChallengeCreateResponse> {
		return new Promise((resolve: (value: ChallengeCreateResponse | PromiseLike<ChallengeCreateResponse>) => void, reject: (reason?: any) => void) => {
			if (this.SHOULD_TIMEOUT) {
				// Simulate a timeout
				setTimeout(() => {
					reject(new Error("Request timed out"));
				}, this.RESPONSE_DELAY);
			} else {
				setTimeout(() => {
					resolve({
						createdAt: new Date(),
						data: {
							// eslint-disable-next-line @elsikora/typescript/naming-convention
							challenge: true,
							type: EChallengeType.CLICK,
						},
						// eslint-disable-next-line @elsikora/sonar/pseudo-random
						id: "mock-challenge-id-" + Math.random().toString(36).slice(2, 10),
						type: EChallengeType.CLICK,
						updatedAt: new Date(),
					});
				}, this.RESPONSE_DELAY);
			}
		});
	}

	/**
	 * Validate a mock challenge
	 * @param {object} parameters - The validation parameters
	 * @param {string} parameters.challengeId - The challenge ID
	 * @param {any} parameters.response - The response
	 * @returns {Promise<ChallengeSolveResponse>} A promise that resolves to a mock validation result
	 */
	public async validate(parameters: { challengeId: string; response: any }): Promise<ChallengeSolveResponse> {
		return new Promise((resolve: (value: ChallengeSolveResponse | PromiseLike<ChallengeSolveResponse>) => void, reject: (reason?: any) => void) => {
			if (this.SHOULD_TIMEOUT) {
				// Simulate a timeout
				setTimeout(() => {
					reject(new Error("Request timed out"));
				}, this.RESPONSE_DELAY);
			} else {
				setTimeout(() => {
					if (this.SHOULD_SUCCEED) {
						resolve({
							// eslint-disable-next-line @elsikora/sonar/pseudo-random
							token: "mock-token-" + Math.random().toString(36).slice(2, 10),
						});
					} else {
						reject(new Error("Error"));
					}
				}, this.RESPONSE_DELAY);
			}
		});
	}
}
