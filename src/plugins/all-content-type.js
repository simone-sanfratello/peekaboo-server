'use strict'

/**
 * @param {Fastify} - fastify instance
 */
const parser = function (fastify, settings) {
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
    // fix: wait for content but continue if content-length is set but body size is less that that
    if (settings.timeout.request) {
      setTimeout(() => {
        payload.push(null)
      }, settings.timeout.request)
    }
  })
}

module.exports = parser
