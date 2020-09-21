'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const main = function (fastify) {
  fastify.get('/settings/dataset', async (request, response) => {
    const dataset = await fastify.peekaboo.storage.dataset.get()
    response.send({
      values: dataset.entries,
      current: dataset.current
    })
  })
  fastify.post('/settings/dataset', async (request, response) => {
    try {
      response.send({ id: await fastify.peekaboo.storage.dataset.create(request.body.name) })
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_NAME')
    }
  })
  fastify.patch('/settings/dataset/:id', async (request, response) => {
    try {
      await fastify.peekaboo.storage.dataset.update(request.params.id, request.body.name)
      response.send({})
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_ID')
    }
  })
  fastify.delete('/settings/dataset/:id', async (request, response) => {
    try {
      await fastify.peekaboo.storage.dataset.remove(request.params.id)
      response.send({})
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_ID')
    }
  })
  fastify.post('/settings/dataset/current', async (request, response) => {
    try {
      await fastify.peekaboo.storage.dataset.set(request.body.current)
      response.send({})
    } catch {
      response.code(400).send('INVALID_DATASET_ENTRY_ID')
    }
  })
}

module.exports = main
