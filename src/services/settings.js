'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const main = function (fastify) {
  fastify.get('/settings/mode', async (request, response) => {
    response.send({ mode: fastify.peekaboo.mode.get() })
  })
  fastify.put('/settings/mode', async (request, response) => {
    fastify.peekaboo.mode.set(request.body.mode)
    response.send({ mode: fastify.peekaboo.mode.get() })
  })
  // @todo see and edit settings
}

module.exports = main
