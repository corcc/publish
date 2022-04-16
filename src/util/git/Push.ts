import * as core from '@actions/core';
import { execSync } from 'child_process';

export function push ({
	force,
	remote,
	branch
}: {
	force?: boolean
	remote?: string
	branch?: string
}) {
	const cmd = ['git', 'push'];
	cmd.push(remote || '');
	cmd.push(branch || '');
	if (force) {
		cmd.push('--force');
	}
	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
}
