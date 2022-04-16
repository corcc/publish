import * as core from '@actions/core';
import { execSync } from 'child_process';

const oe = Object.entries;

export function config (
	c: {
		[x: string]: string
	}) {
	oe(c).forEach(([k, v]: string[]) => {
		const cmd = ['git', 'config'];
		cmd.push(JSON.stringify(k));
		cmd.push(JSON.stringify(v));
		const result = [...execSync(
			cmd.join(' ')
		)?.toString()
			?.split('\n')
			?.filter((p) => (p))];
		core.info(cmd.join(' '));
		core.info(result.join('\n'));
	});
}
