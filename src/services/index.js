'use strict'
const path = require('path')

/**
 * serve ui
 * @param {Fastify} - fastify instance
 */
const main = function (fastify) {
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../ui/dist'),
    prefix: '/'
  })
}

module.exports = main
