import * as core from '@actions/core';
import { execSync } from 'child_process';

export function addAll ():void {
	const cmd = ['git', 'add'];
	cmd.push('-A');
	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
}
