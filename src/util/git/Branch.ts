import {execSyncString} from '../Exec'

export function currentBranch(): string {
  const cmd = 'git rev-parse --abbrev-ref HEAD'
  return execSyncString(cmd)
}
