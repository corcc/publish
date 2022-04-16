import * as core from '@actions/core';
import { execSync } from 'child_process';

export function revParse ({
	ref
}: {
	ref?: string
}) {
	const cmd = ['git', 'rev-parse'];
	cmd.push(...['--abbrev-ref', ref || 'HEAD']);
	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
	return result.join('\n');
}

export function branch ({
	upstream,
	force,
	name
}:{
	upstream?:string
	force?:boolean
	name: string
}) {
	const cmd = ['git', 'branch'];
	if (upstream) { cmd.push(...['--set-upstream-to', upstream]); }
	if (force) { cmd.push('-f'); }
	cmd.push(name);
	const result = [...execSync(
		cmd.join(' ')
	)?.toString()
		?.split('\n')
		?.filter((p) => (p))];
	core.info(cmd.join(' '));
	core.info(result.join('\n'));
}
