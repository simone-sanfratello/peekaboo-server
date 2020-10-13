'use strict'

function clear (timeout) {
  if (!timeout) {
    return
  }
  clearTimeout(timeout)
}

/**
 * fix: wait for content but continue if content-length is set but body size is less that that
 */
function idle ({ settings, timeout, payload }) {
  if (!settings.request.idle) {
    return
  }
  clear(timeout)
  timeout = setTimeout(() => {
    payload.push(null)
  }, settings.request.idle)
  return timeout
}

/**
 * @param {Fastify} - fastify instance
 */
const parser = function (fastify, settings) {
  // forward any content type
  // @todo binary
  // @todo use buffer?
  // @todo idle also for managed content-types
  fastify.addContentTypeParser('*', (request, payload, done) => {
    let data = ''
    let timeout
    payload.on('data', chunk => {
      data += chunk
      timeout = idle({ settings, timeout, payload })
    })
    payload.on('end', () => {
      clear(timeout)
      done(null, data)
    })
    timeout = idle({ settings, timeout, payload })
  })
}

module.exports = parser
