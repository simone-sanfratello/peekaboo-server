'use strict'

/**
 * @fileoverview forward settings to ui
 */

const fs = require('fs').promises

const ui = {
  setup: async function (settings, file) {
    const hostname = settings.hostname
    const ssl = settings.server.https ? 's' : ''
    let port = ''
    if (!((ssl && settings.server.port === 443) || (!ssl && settings.server.port === 80))) {
      port = ':' + settings.server.port
    }
    const content =
      'const server = {\n' +
      `  host: 'http${ssl}://${hostname}${port}',\n` +
      `  realtime: 'ws${ssl}://${hostname}${port}/realtime'\n` +
      '}\n' +
      'module.exports = server\n'
    return fs.writeFile(file, content, 'utf8')
  }
}
module.exports = ui
