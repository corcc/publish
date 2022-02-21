import * as util from './util'
import * as config from './config'
import * as core from '@actions/core'
import {email, name} from './config/git'
import {getEnvRequired} from './util'
import {exit} from 'process'
const remoteName = 'publisher'

export function Publish() {
  try {
    let result: any
    core.info(`Branch on ${util.git.currentBranch()}`)
    const TZ = util.getEnv('TZ')
    if (TZ) {
      core.info(`TimeZone on ${TZ}`)
    } else {
      core.info('TimeZone is not set.')
      core.info('TimeZone will be UTC')
    }
    result = util.git.setConfig({
      'user.name': name,
      'user.email': email,
      'http.sslVerify': 'false'
    })
    core.info(JSON.stringify(result, null, 2))

    result = util.git.addAll()
    core.info(result)

    result = util.git.addRemote({
      name: remoteName,
      url: config.git.remote
    })
    core.info(result)

    result = util.git.diffHEAD()
    if (result == '' || result.startsWith('\n')) {
      core.info('Nothing to commit')
      exit(0)
    }
    const timestamp = Date.now()
    let message = `${getEnvRequired('TASK_NAME')} `
    message += `${new Date(timestamp)}(${timestamp}) `
    message += `${getEnvRequired('GITHUB_SHA')}`
    result = util.git.commit({
      message
    })
    core.info(result)

    result = util.git.pullWithRebase({})
    core.info(result)

    result = util.git.push({
      remote: remoteName,
      force: `${util.getEnv('FORCE')}` == 'true'
    })
    core.info(result)
  } catch (err: any) {
    core.setFailed(`Action failed with error ${err}`)
  }
}
Publish()
