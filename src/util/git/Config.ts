import {execSyncString} from '../Exec'

const oe = Object.entries
const fe = Object.fromEntries

export function setConfig(conf: {[x: string]: string}) {
  return fe(
    oe(conf).map(([k, v]: string[]) => {
      const cmd = `git config ${JSON.stringify(k)} ${JSON.stringify(v)}`
      return [cmd, execSyncString(cmd)]
    })
  )
}
