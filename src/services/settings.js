'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const main = function (fastify) {
  fastify.get('/settings/mode', async (request, response) => {
    response.send({ mode: fastify.peekaboo.get.mode() })
  })
  fastify.put('/settings/mode', async (request, response) => {
    fastify.peekaboo.set.mode(request.body.mode)
    response.send({ mode: fastify.peekaboo.get.mode() })
  })
  // @todo see and edit settings
}

module.exports = main
