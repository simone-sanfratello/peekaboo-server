'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const main = function (fastify) {
  fastify.get('/dataset', async (request, response) => {
    response.send(await fastify.peekaboo.dataset.get())
  })
  fastify.post('/dataset', async (request, response) => {
    try {
      response.send({ id: await fastify.peekaboo.dataset.create(request.body.name) })
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_NAME')
    }
  })
  fastify.patch('/dataset/:id', async (request, response) => {
    try {
      await fastify.peekaboo.dataset.update(request.params.id, request.body.name)
      response.send({})
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_ID')
    }
  })
  fastify.delete('/dataset/:id', async (request, response) => {
    try {
      await fastify.peekaboo.dataset.remove(request.params.id)
      response.send({})
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_ID')
    }
  })
  fastify.put('/dataset/set', async (request, response) => {
    try {
      await fastify.peekaboo.dataset.set(request.body.id)
      response.send({})
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_ID')
    }
  })
}

module.exports = main
