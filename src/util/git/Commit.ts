import {execSyncString} from '../Exec'

export function commit({message}: {message: string}): string {
  const cmd = `git commit -m ${JSON.stringify(message)}`
  return execSyncString(cmd)
}
