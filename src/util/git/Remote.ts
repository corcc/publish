import * as core from '@actions/core';
import { execSync } from 'child_process';

export function addRemote ({
	name,
	url
}: {
	name: string
	url: string
}) {
	const cmd = ['git', 'remote', 'add'];
	cmd.push(...[name, url]);
	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
}
