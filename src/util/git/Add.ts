import {execSyncString} from '../Exec'

export function addAll(): string {
  const cmd = 'git add -A'
  return execSyncString(cmd)
}
