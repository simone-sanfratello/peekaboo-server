'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const ws = function (fastify, settings) {
  fastify.register(require('fastify-websocket'), settings.ws)
}

module.exports = ws
