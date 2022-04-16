import * as core from '@actions/core';
import { execSync } from 'child_process';

export function pull ({
	remote,
	rebase
}: {
	remote?: string
	rebase?: boolean
}) {
	const cmd = ['git', 'pull'];
	cmd.push(remote || '');
	if (rebase) {
		cmd.push('--rebase');
	}
	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
}
