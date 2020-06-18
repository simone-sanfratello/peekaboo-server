'use strict'

const path = require('path')
const log = require('peppino')
const lib = require('../src/lib')

async function main () {
  const settings = lib.settings.load(path.join(__dirname, 'settings.js'))
  try {
    log.init(settings.log)
    log.info({ message: 'server starting' })
    await lib.server(settings).start()
    await lib.ui.setup(settings, path.join(__dirname, '../src/ui/src/lib/server.js'))
    lib.event.emit('server', { status: 'on' })
  } catch (error) {
    log.error({ message: 'error on server starting', error })
    lib.event.emit('server:error', { status: 'off', message: 'error on server starting' })
  }
}

main()
