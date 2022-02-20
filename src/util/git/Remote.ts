import {execSyncString} from '../Exec'

export function addRemote({name, url}: {name: string; url: string}): string {
  const cmd = `git remote add ${name} ${url}`
  return execSyncString(cmd)
}
