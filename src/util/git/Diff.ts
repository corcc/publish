import * as core from '@actions/core';
import { execSync } from 'child_process';

export function diff (args:any[]) {
	const cmd = ['git', 'diff', ...args];

	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
	return result;
}
