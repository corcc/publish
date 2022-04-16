import * as core from '@actions/core';
export function getEnv (n: string): string | undefined {
	const e: any = (
		core.getInput(n) ||
			core.getInput(n.toUpperCase()) ||
			core.getInput(n.toLowerCase()) ||
			process.env[n] ||
			process.env[n.toUpperCase()] ||
			process.env[n.toLowerCase()]
	);
	return e;
}
export function getEnvRequired (n: string): string {
	const e: any = getEnv(n);
	if (!e) {
		throw Error(`${n} is required but not set`);
	}
	return `${e}`;
}
