'use strict'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test'
}

const path = require('path')
const got = require('got')
const getPort = require('get-port')
const rimraf = require('rimraf')
const uuid = require('uuid').v1
const lib = require('../../src/lib')
let settings = lib.settings.load(path.join(__dirname, 'settings.js'))
let cacheDir = path.join(__dirname, '../cache')

const options = { retry: 0, throwHttpErrors: false, responseType: 'json' }
let _server

const helper = {
  fs: {
    rmdir: function (dir) {
      return new Promise((resolve, reject) => {
        rimraf(dir, err => {
          err ? reject(err) : resolve()
        })
      })
    }
  },
  server: {
    settings: () => settings,
    setup: async function (overrideSettings) {
      if (_server && !overrideSettings) {
        return
      }

      if (_server) {
        await _server.stop()
      }

      if (overrideSettings) {
        settings = overrideSettings
      }

      settings.server.port = await getPort()
      cacheDir = path.join(__dirname, '../cache', uuid())
      settings.history.path = path.join(cacheDir, 'history')
      settings.cache.storage.config.path = path.join(cacheDir, 'peekaboo')

      _server = lib.server(settings)
      await helper.fs.rmdir(cacheDir)
      await _server.start()
    },
    teardown: async function () {
      await _server.stop()
      _server = null
    }
  },
  cache: {
    setup: async function (requests) {
      await helper.request({ method: 'delete', path: '/cache' })
      for (const request of requests) {
        await helper.request({
          path: '/url/' + request.url,
          ...options,
          ...request.options
        })
      }
    }
  },
  request: async function (request) {
    const url = `http://127.0.0.1:${settings.server.port}` + request.path
    delete request.path
    return got({ url, ...options, ...request })
  }
}

module.exports = helper
