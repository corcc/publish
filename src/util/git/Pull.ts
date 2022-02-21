import {execSyncString} from '../Exec'

export function pullWithRebase({remote}: {remote?: string}): string {
  const cmd = `git pull ${remote ?? ''} --rebase`
  return execSyncString(cmd)
}
