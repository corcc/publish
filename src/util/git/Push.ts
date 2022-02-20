import {execSyncString} from '../Exec'

export function push({
  force,
  remote
}: {
  force?: boolean
  remote?: string
}): string {
  const cmd = `git push ${remote || ''} ${force ? '--force' : ''}`
  return execSyncString(cmd)
}
