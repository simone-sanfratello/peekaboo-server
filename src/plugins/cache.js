'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const cache = function (fastify, settings) {
  fastify.register(require('fastify-peekaboo'), settings.cache)
}

module.exports = cache
