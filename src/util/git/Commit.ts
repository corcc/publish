import * as core from '@actions/core';
import { execSync } from 'child_process';

export function commit ({
	message
}: {
	message: string
}) {
	const cmd = ['git', 'commit'];
	cmd.push(...['-m', JSON.stringify(message)]);
	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
}
