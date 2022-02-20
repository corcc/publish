import {execSyncString} from '../Exec'
export function diffHEAD() {
  const cmd = `git diff HEAD`
  return execSyncString(cmd)
}
