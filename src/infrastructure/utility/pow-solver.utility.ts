import type { IPowSolverChallenge } from "../interface/pow-solver/challenge.interface";
import type { IPowSolverConfig } from "../interface/pow-solver/config.interface";
import type { IPowSolverSolution } from "../interface/pow-solver/solution.interface";

import POW_SOLVER_CONSTANT from "../constant/powe-solver.constant";
import { EPowSolverWorkerStatus } from "../enum/pow-solver-worker-status.enum";

/**
 * Class for solving Proof of Work challenges using Web Workers
 */
export const PowSolver: { solve(challengeData: IPowSolverChallenge, config?: IPowSolverConfig): Promise<IPowSolverSolution> } = {
	/**
	 * Solve a PoW challenge by finding a nonce that produces a hash with the required number of leading zeros
	 * @param {IPowSolverChallenge} challengeData - The challenge data containing prefix and difficulty
	 * @param {IPowSolverConfig} [config] - Configuration options for the solver
	 * @returns {Promise<IPowSolverSolution>} The solution (nonce and hash) that satisfies the challenge
	 */
	async solve(challengeData: IPowSolverChallenge, config?: IPowSolverConfig): Promise<IPowSolverSolution> {
		// Create a web worker from blob URL for better compatibility
		const workerCode: string = `
			// SHA-256 implementation for the worker
			async function sha256(message) {
				// Encode as UTF-8
				const messageBuffer = new TextEncoder().encode(message);
			
				// Hash the message using Web Crypto API
				const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);
			
				// Convert ArrayBuffer to Array
				const hashArray = Array.from(new Uint8Array(hashBuffer));
			
				// Convert bytes to hex string
				return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
			}

			// Listen for messages from the main thread
			self.addEventListener("message", async (e) => {
				const { difficulty, prefix, maxAttempts, batchSize } = e.data;
				const target = "0".repeat(difficulty);
				
				let nonce = 0;
				let hash = "";
				let found = false;

				// Process in batches to allow progress reporting
				for (let attempt = 0; attempt < maxAttempts; attempt++) {
					const input = \`\${prefix}\${nonce}\`;
					hash = await sha256(input);
					
					if (hash.startsWith(target)) {
						found = true;
						self.postMessage({ 
							status: "success", 
							solution: { 
								nonce: nonce.toString(), 
								hash 
							},
							attempt
						});
						break;
					}
					
					nonce++;
					
					// Report progress periodically
					if (attempt % batchSize === 0) {
						self.postMessage({ 
							status: "progress", 
							progress: (attempt / maxAttempts) * 100,
							attempt
						});
					}
				}
				
				if (!found) {
					self.postMessage({ 
						status: "failed", 
						error: \`Failed to solve PoW challenge after \${maxAttempts} attempts\` 
					});
				}
			});
		`;

		// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
		const blob: Blob = new Blob([workerCode], { type: "application/javascript" });
		// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
		const workerUrl: string = URL.createObjectURL(blob);

		const worker: Worker = new Worker(workerUrl);

		return new Promise((resolve: (value: IPowSolverSolution | PromiseLike<IPowSolverSolution>) => void, reject: (reason?: any) => void) => {
			const timeout: any = setTimeout(() => {
				worker.terminate();
				// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
				URL.revokeObjectURL(workerUrl);
				reject(new Error("PoW solver timed out"));
			}, config?.workerTimeout ?? POW_SOLVER_CONSTANT.WORKER_TIMEOUT);

			worker.addEventListener("message", (event: MessageEvent<{ error: string; solution: IPowSolverSolution; status: EPowSolverWorkerStatus }>) => {
				const { error, solution, status }: { error: string; solution: IPowSolverSolution; status: EPowSolverWorkerStatus } = event.data;

				if (status === EPowSolverWorkerStatus.SUCCESS) {
					// eslint-disable-next-line @elsikora/typescript/no-unsafe-argument
					clearTimeout(timeout);
					worker.terminate();
					// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
					URL.revokeObjectURL(workerUrl);

					resolve(solution);
				} else if (status === EPowSolverWorkerStatus.FAILED) {
					// eslint-disable-next-line @elsikora/typescript/no-unsafe-argument
					clearTimeout(timeout);
					worker.terminate();
					// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
					URL.revokeObjectURL(workerUrl);
					reject(new Error(error));
				}
			});

			worker.postMessage({
				...challengeData,
				batchSize: config?.batchSize ?? POW_SOLVER_CONSTANT.BATCH_SIZE,
				maxAttempts: config?.maxAttempts ?? POW_SOLVER_CONSTANT.MAX_ATTEMPTS,
			});
		});
	},
};
