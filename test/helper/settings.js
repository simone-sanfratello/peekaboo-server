'use strict'

const path = require('path')
const default_ = require('../../bin/settings/default')

module.exports = function (settings) {
  default_(settings)
  settings.server.port = 8079
  settings.log.level = 'info'
  settings.log.pretty = true

  // settings.cache.expire = 100

  /*
  settings.server.https: {
    key: fs.readFileSync(path.join(__dirname, '../../cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../cert/cert.pem'))
  }
  */

  settings.relay.response.rewrite = (request, response) => {
    response.headers['access-control-allow-origin'] = request.headers.origin
  }

  settings.history = {
    path: path.join(__dirname, '../cache/history')
  }
}
