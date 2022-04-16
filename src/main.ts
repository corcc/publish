import * as util from './util';
import * as config from './config';
import * as core from '@actions/core';
import { email, name } from './config/git';
import { getEnvRequired } from './util';

try {
	const remote = {
		name: 'publisher',
		url: config.git.remote
	};

	const TZ = util.getEnv('TZ');
	const force = `${util.getEnv('FORCE')}` == 'true';
	const ref = util.git.revParse({ ref: util.getEnv('REF') || 'HEAD' });
	const branch = util.getEnv('BRANCH') || ref;
	const pull = !(`${util.getEnv('PULL')}` == 'false');
	const push = !(`${util.getEnv('PUSH')}` == 'false');
	const rebase = !(`${util.getEnv('REBASE')}` == 'false');
	process.env.TZ = TZ;

	core.info(`Branch on ${ref}`);
	if (TZ) {
		core.info(`TZ on ${process.env.TZ}`);
	} else {
		core.info('TZ was not set.');
		core.info('TZ will be UTC');
	}

	util.git.addRemote(remote);

	util.git.config({
		'user.name': name,
		'user.email': email,
		'http.sslVerify': 'false'
	});

	util.git.addAll();

	const timestamp = Date.now();

	const message = [
		getEnvRequired('TASK_NAME'),
		getEnvRequired('GITHUB_SHA'),
		new Date(timestamp),
		timestamp
	]
		.join(' ');

	const diff = util.git.diff(['HEAD']);
	if (diff.length) { util.git.commit({ message }); } else { core.info('Nothing to commit'); }

	if (branch != ref) {
		util.git.branch({ name: branch, force });
		util.git.branch({ upstream: ref, name: branch, force });
	}
	if (pull) { util.git.pull({ rebase }); }

	if (push) { util.git.push({ remote: remote.name, branch, force }); }
} catch (err: any) {
	core.setFailed(`Action failed with error ${err}`);
}
