#!/usr/bin/env node

'use strict'

const path = require('path')
const cli = require('./cli')
const log = require('peppino')
const server = require('../src/lib/server')
const event = require('../src/lib/event')
const ui = require('../src/lib/ui')

process
  .on('unhandledRejection', (error, promise) => {
    log.error({ message: 'unhandledRejection', error, promise })
  })
  .on('uncaughtException', (error) => {
    log.error({ message: 'uncaughtException', error })
  })

async function main () {
  let settings
  try {
    settings = cli.args()
  } catch (error) {
    // print to console because log settings may be not right
    if (error.message) {
      console.error(error.message)
    }
    console.error(error)
    process.exit(-1)
  }

  try {
    log.init(settings.log)
    log.info({ message: 'server starting' })
    await server(settings).start()
    await ui.setup(settings, path.join(__dirname, '../src/ui/src/lib/server.js'))
    event.emit('server', { status: 'on' })
  } catch (error) {
    log.error({ message: 'error on server starting', error })
    event.emit('server:error', { status: 'off', message: 'error on server starting' })
  }
}

main()
