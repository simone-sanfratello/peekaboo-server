'use strict'

const path = require('path')
const server = require('../../src/lib/server')
const settings = require('../../src/lib/settings')

describe('lib.server', () => {
  test('server.start success', async () => {
    const settings = {
      hostname: 'localhost',
      server: {
        port: 9999
      }
    }
    const _server = server(settings)
    await _server.start()
    await _server.stop()
    expect(_server.ready()).toBe(true)
  })

  test('server.start fail', async () => {
    const settings = {
      hostname: 'localhost',
      server: {
        port: 80
      }
    }
    const _server = server(settings)
    try {
      await _server.start()
    } catch (error) {
      expect(error.message).toBe('listen EACCES: permission denied 0.0.0.0:80')
    }
  })

  test('server.start test settings', async () => {
    const _settings = settings.load(path.join(__dirname, '../helper/settings.js'))
    _settings.server.port = 9999
    const _server = server(_settings)
    await _server.start()
    await _server.stop()
    expect(_server.ready()).toBe(true)
  })

  test('server.start default settings', async () => {
    const _settings = settings.load(path.join(__dirname, '../../bin/settings/default.js'))
    _settings.server.port = 9999
    const _server = server(_settings)
    await _server.start()
    await _server.stop()
    expect(_server.ready()).toBe(true)
  })
})
