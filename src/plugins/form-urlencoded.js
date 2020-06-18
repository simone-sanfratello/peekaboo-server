'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const multipart = function (fastify) {
  fastify.register(require('fastify-formbody'))
}

module.exports = multipart
