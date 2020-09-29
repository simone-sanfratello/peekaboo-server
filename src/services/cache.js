'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const cache = function (fastify) {
  fastify.get('/cache', async (request, response) => {
    // @todo paginate
    response.send(await request.peekaboo.storage.list())
  })
  fastify.get('/cache/summary', async (request, response) => {
    // @todo paginate
    // @todo use a different storage strategy, split meta and content data
    // @todo storage should provide an api for get meta data only
    const keys = await request.peekaboo.storage.list()
    const entries = []
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      try {
        const content = await request.peekaboo.storage.get(key)
        entries.push({
          hash: key,
          summary: {
            request: content.request,
            info: content.info
          }
        })
      } catch (error) {

      }
    }
    response.send(entries)
  })
  fastify.get('/cache/:hash', async (request, response) => {
    response.send(await request.peekaboo.storage.get(request.params.hash))
  })
  fastify.put('/cache/:hash/response', async (request, response) => {
    // @todo if item by hash > 404
    // @todo validate content > 400
    //   request.body.expire must be set as Date.now() + expire
    const current = await request.peekaboo.storage.get(request.params.hash)
    await request.peekaboo.storage.set(request.params.hash, { ...current, response: request.body })
    response.send({})
  })
  fastify.delete('/cache/:hash', async (request, response) => {
    await request.peekaboo.storage.rm(request.params.hash)
    response.send({})
  })
  fastify.delete('/cache', async (request, response) => {
    await request.peekaboo.storage.clear()
    response.send({})
  })
}

module.exports = cache
