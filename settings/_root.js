'use strict'

const path = require('path')
const package_ = require('../package.json')

const settings = {
  server: { timeout: 250 }
}

settings.load = [
  path.join(__dirname, '../src/plugins/form-urlencoded'),
  path.join(__dirname, '../src/plugins/all-content-type'),
  path.join(__dirname, '../src/plugins/cors'),
  path.join(__dirname, '../src/plugins/ws'),

  path.join(__dirname, '../src/services/relay'),
  path.join(__dirname, '../src/services/realtime'),
  path.join(__dirname, '../src/services/cache'),
  path.join(__dirname, '../src/services/history'),
  path.join(__dirname, '../src/services/dataset'),
  path.join(__dirname, '../src/services/settings'),

  path.join(__dirname, '../src/services/ui'),

  path.join(__dirname, '../src/plugins/cache')
]

settings.version = package_.version

module.exports = settings
