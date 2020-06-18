'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const cors = function (fastify, settings) {
  fastify.register(require('fastify-cors'), settings.cors)
}

module.exports = cors
