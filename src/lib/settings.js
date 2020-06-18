const validate = require('../validate/settings')

const settings = {
  load: function (src) {
    const _settings = require('../../settings/_root')
    require(src)(_settings)
    settings.applyEnv(_settings)
    validate(_settings)
    return _settings
  },
  applyEnv: function (settings) {
    if (process.env.APP_PORT) {
      settings.server.port = parseInt(process.env.APP_PORT)
    }
    if (process.env.LOG_LEVEL) {
      settings.log.level = process.env.LOG_LEVEL
    }
    if (process.env.LOG_PRETTY) {
      settings.log.pretty = process.env.LOG_PRETTY === 'true'
    }
    if (process.env.RELAY_TIMEOUT) {
      settings.relay.timeout = parseInt(process.env.RELAY_TIMEOUT)
    }
  }
}

module.exports = settings
