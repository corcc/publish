import * as core from '@actions/core'
export function getEnv(n: string): string | undefined {
  const e: any = core.getInput(n) || process.env[n]
  return e
}
export function getEnvRequired(n: string): string {
  const e: any = getEnv(n)
  if (!e) {
    throw Error(`${n} is required but not set`)
  }
  return `${e}`
}
