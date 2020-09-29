'use strict'

const path = require('path')
const yargs = require('yargs')
const settings = require('../src/lib/settings')

const defaultSettings = path.join(__dirname, 'settings/default.js')

yargs
  .option('settings', {
    alias: 's',
    type: 'string',
    description: 'Settings file',
    default: defaultSettings
  })

const argv = yargs.argv

const cli = {
  args: function () {
    const _settings = argv.settings && argv.settings !== defaultSettings
      ? path.join(process.cwd(), argv.settings)
      : defaultSettings
    return settings.load(_settings)
  }
}

module.exports = cli
