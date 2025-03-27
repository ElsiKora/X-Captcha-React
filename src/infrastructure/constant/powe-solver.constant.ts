const BATCH_SIZE: number = 1000;
const MAX_ATTEMPTS: number = 1_000_000;
const WORKER_TIMEOUT: number = 30_000;

const POW_SOLVER_CONSTANT: {
	BATCH_SIZE: number;
	MAX_ATTEMPTS: number;
	WORKER_TIMEOUT: number;
} = {
	BATCH_SIZE,
	MAX_ATTEMPTS,
	WORKER_TIMEOUT,
};

export default POW_SOLVER_CONSTANT;
