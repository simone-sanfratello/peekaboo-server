'use strict'

const trimResponseHeaders = [
  'connection',
  'transfer-encoding', // @todo remove using streams
  'content-encoding',
  'content-length'
]

const trimRequestHeaders = [
  'host',
  'connection',
  'transfer-encoding', // @todo remove using streams
  'origin'
]

const http = {
  adjustRequestHeaders: function (headers) {
    const _headers = { ...headers }
    for (const trim of trimRequestHeaders) {
      delete _headers[trim]
    }
    return _headers
  },

  adjustResponseHeaders: function (headers, request, response) {
    const _headers = { ...headers }
    for (const trim of trimResponseHeaders) {
      delete _headers[trim]
    }
    if (_headers['set-cookie']) {
      if (Array.isArray(_headers['set-cookie'])) {
        for (let i = 0; i < _headers['set-cookie'].length; i++) {
          _headers['set-cookie'][i] = http.adjustCookie(_headers['set-cookie'][i], request)
        }
      } else {
        _headers['set-cookie'] = http.adjustCookie(_headers['set-cookie'], request)
      }
    }
    if (!headers.status) {
      headers.status = response.statusCode
    }

    return _headers
  },

  adjustCookie: function (cookie, request) {
    const _cookie = cookie
      .replace(/Domain=[a-z.]*;/i, '')
      .replace(/\u0001/g, ' ')
    if (!request.https) {
      // .replace(/Domain=[a-z.]*;/i, `Domain=.${request.hostname};`)
      return _cookie.replace(/secure/i, '')
    }
    return _cookie
  },

  /**
   * @todo settings fix body = function({request: forward, response: target})
   */
  adjustResponseBody: function (target, request) {
    if (target.headers['content-type'] && target.headers['content-type'].includes('application/json') && typeof target.body === 'string') {
      if (!target.body) {
        return {}
      } else if (typeof target.body === 'string') {
        return JSON.parse(target.body)
      }
    }
    return target.body
  }

}

module.exports = http
