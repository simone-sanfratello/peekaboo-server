'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const parser = function (fastify) {
  // forward any content type
  // @todo binary
  // @todo use buffer?
  fastify.addContentTypeParser('*', (request, payload, done) => {
    let data = ''
    payload.on('data', chunk => {
      data += chunk
    })
    payload.on('end', () => {
      done(null, data)
    })
  })
}

module.exports = parser
