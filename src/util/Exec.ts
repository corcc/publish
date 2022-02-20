import * as core from '@actions/core'
import {execSync} from 'child_process'
export function execSyncString(c: string): string {
  core.info(c)
  const r = execSync(c).toString()
  return r.endsWith('\n') ? r.slice(0, r.length - 1) : r
}
