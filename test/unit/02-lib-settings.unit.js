'use strict'

const settings = require('../../src/lib/settings')

describe('lib.settings', () => {
  test('settings.applyEnv', () => {
    process.env.APP_PORT = 9999
    process.env.LOG_LEVEL = 'info'
    process.env.LOG_PRETTY = true
    process.env.RELAY_TIMEOUT = 30000

    const _settings = {
      server: {},
      log: {},
      relay: {}
    }

    settings.applyEnv(_settings)
    expect(_settings).toEqual({
      log: {
        level: 'info',
        pretty: true
      },
      relay: {
        timeout: 30000
      },
      server: {
        port: 9999
      }
    })
  })
})
