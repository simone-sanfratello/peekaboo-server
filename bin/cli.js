const path = require('path')
const yargs = require('yargs')
const settings = require('../src/lib/settings')

yargs
  .option('settings', {
    alias: 's',
    type: 'string',
    description: 'Settings file',
    default: path.join(__dirname, 'settings/default.js')
  })

const argv = yargs.argv

const cli = {
  args: function () {
    return settings.load(path.join(process.cwd(), argv.settings))
  }
}

module.exports = cli
