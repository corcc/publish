import { getEnvRequired } from '../../util/Env';

export const actor = getEnvRequired('GITHUB_ACTOR');
