'use strict'

const fastify = require('fastify')
const log = require('peppino')

/**
 * The web server
 * @typedef {Object} Server
 * @property {function()} start - start the web server
 * @property {function()} stop - stop the web server
 */

/**
 * instantiate the server
 * @param {Settings} settings - server settings
 * @return {Server} server instance
 * @throws errors if settings are not valid
 */
const server = function (settings) {
  let _fastify
  let _ready = false

  /**
   * start the web server
   * @async
   * @throws errors if operation fails for some reasons
   * - port not available
   * - error loading plugins
   * - error loading services
   */
  const start = async function () {
    if (!log.trace) {
      log.init()
    }
    log.trace({ message: 'server.start' })
    try {
      _fastify = fastify({
        ...settings.server,
        logger: log.pino(),
        genReqId: () => Date.now().toString()
      })
      _load(settings)
      await _fastify.ready()
      await _fastify.listen(settings.server)
      _ready = true
      // _fastify.printRoutes()
    } catch (error) {
      log.error({ message: 'error on server.start', error })
      throw error
    }
  }

  /**
   * load services and plugins
   * note: order is important
   * @async
   * @throws errors if operation fails for some reasons, i.e. path not accessible
   */
  const _load = async function (settings) {
    if (!settings.load) {
      return
    }
    for (const addon of settings.load) {
      require(addon)(_fastify, settings)
    }
  }

  /**
   * stop the web server
   * @async
   */
  const stop = async function () {
    log.trace({ message: 'stopping server' })
    try {
      await _fastify.close()
    } catch (error) {
      log.error({ message: 'error on server.stop', error })
    }
  }

  return {
    start,
    stop,
    ready: () => _ready
  }
}

module.exports = server
