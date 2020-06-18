'use strict'

const got = require('got')
const path = require('path')
const fs = require('fs').promises
const curl = require('request-as-curl')
const log = require('peppino')
const http = require('../lib/http')
const event = require('../lib/event')

/**
 * @param {Fastify} - fastify instance
 * @todo use stream > drop got, use http/s bare
 * @todo multipart/form-data
 */
const relay = function (fastify, settings) {
  const options = {
    throwHttpErrors: false,
    timeout: settings.relay.timeout
  }

  fastify.decorateRequest('relay')

  fastify.all('/url/*', async (request, response) => {
    const url = request.params['*']

    try {
      const forward = {
        ...options,
        url,
        query: request.query,
        method: request.req.method,
        headers: http.adjustRequestHeaders(request.headers)
      }

      if (settings.relay.request.rewrite) {
        settings.relay.request.rewrite(request, forward)
      }

      event.emit('relay:request', {
        id: request.id,
        url,
        query: forward.query,
        method: forward.method
      })

      if (request.body && request.headers['content-type']) {
        if (request.headers['content-type'].includes('application/json')) {
          forward.json = request.body
        } else if (request.headers['content-type'].includes('application/x-www-form-urlencoded')) {
          forward.form = request.body
        }
      }

      const target = await got(forward)
      target.headers = http.adjustResponseHeaders(target.headers, request, target)
      try {
        target.body = http.adjustResponseBody(target, request)
      } catch (error) {
        log.error({ message: 'unable to parse to json body target' })
        target.body = {}
      }

      if (settings.relay.response.rewrite) {
        settings.relay.response.rewrite(request, target)
      }

      response
        .code(target.statusCode)
        .headers(target.headers)
        .send(target.body)
    } catch (error) {
      log.error({ message: 'relay', error })
      if (error.code === 'ETIMEDOUT') {
        response.code(504).send('ENDPOINT_ERROR_TIMEOUT')
      } else {
        response.code(503).send('ENDPOINT_ERROR_GENERIC')
      }
    }
  })

  fastify.addHook('onRequest', async (request, response) => {
    if (request.raw.originalUrl.indexOf('/url/') !== 0) {
      return
    }
    request.relay = {
      timeStart: Date.now()
    }
    // save history
    // @todo refactor
    try {
      const content = JSON.stringify({
        summary: {
          id: request.id,
          url: request.params['*'],
          method: request.req.method,
          query: request.query
        },
        request: {
          url: request.params['*'],
          method: request.req.method,
          query: request.query,
          headers: http.adjustRequestHeaders(request.headers),
          body: JSON.stringify(request.body),
          curl: curl(request.req)
        }
      })
      await fs.writeFile(path.join(settings.history.path, request.id), content, 'utf8')
    } catch (error) {
      log.error({ message: 'relay.onRequest', error })
    }
  })

  fastify.addHook('onSend', (request, response, payload, next) => {
    next(null, payload)
    if (request.relay) {
      request.relay.payload = payload
    }
  })

  fastify.addHook('onResponse', async (request, response) => {
    if (!request.relay) {
      return
    }
    const time = Date.now() - request.relay.timeStart

    // @todo move to lib/http
    const _responseHeaders = {}
    response.res._header.split('\r\n')
      .sort()
      .forEach(header => {
        if (!header) {
          return
        }
        const [key, ...value] = header.split(':')
        if (!key) {
          return
        }
        _responseHeaders[key.toLowerCase()] = value ? value.join(':').trim() : ''
      })

    // save history
    // @todo refactor
    try {
      const content = JSON.stringify({
        summary: {
          id: request.id,
          url: request.params['*'],
          method: request.req.method,
          query: request.query,
          size: request.relay.payload.length,
          time,
          status: response.statusCode,
          cached: response.getHeader('x-peekaboo-hash')
        },
        request: {
          url: request.params['*'],
          method: request.req.method,
          query: request.query,
          headers: http.adjustRequestHeaders(request.headers),
          body: JSON.stringify(request.body), // @todo different payload types (binary, stream ...)
          curl: curl(request.req)
        },
        response: {
          status: response.statusCode,
          headers: _responseHeaders,
          body: JSON.stringify(request.relay.payload) // @todo different payload types (binary, stream ...)
        }
      })
      await fs.writeFile(path.join(settings.history.path, request.id), content, 'utf8')
    } catch (error) {
      log.error({ message: 'relay.onResponse', error })
    }

    // @todo refactor ~ history items
    event.emit('relay:response', {
      id: request.id,
      url: request.params['*'],
      method: request.req.method,
      query: request.query,
      size: request.relay.payload.length,
      time,
      status: response.statusCode,
      cached: response.getHeader('x-peekaboo-hash')
    })
  })
}

module.exports = relay
