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

  adjustResponseHeaders: function (request, response) {
    const _headers = { ...response.headers }
    for (const trim of trimResponseHeaders) {
      delete _headers[trim]
    }
    if (!_headers.status) {
      _headers.status = response.statusCode
    }
    return _headers
  },

  /**
   * @param {*} options.stripDomain
   * @param {*} options.fixChars
   * @param {*} options.fixHttps
   */
  adjustResponseCookies: function (request, response, options) {
    const _headers = { ...response.headers }
    if (_headers['set-cookie']) {
      if (Array.isArray(_headers['set-cookie'])) {
        for (let i = 0; i < _headers['set-cookie'].length; i++) {
          _headers['set-cookie'][i] = http.normalizeCookie(_headers['set-cookie'][i], request, options)
        }
      } else {
        _headers['set-cookie'] = http.normalizeCookie(_headers['set-cookie'], request, options)
      }
    }
    return _headers
  },

  /**
   * 
   * @param {*} cookie 
   * @param {*} request 
   * @param {*} options.replaceDomain
   * @param {*} options.fixChars
   * @param {*} options.fixSameSite
   * @param {*} options.fixSameSite
   */
  normalizeCookie: function (cookie, request, options = {}) {
    let _cookie = cookie
    if (options.fixChars) {
      _cookie = _cookie.replace(/\u0001/g, ' ')
    }
    if (options.replaceDomain) {
      _cookie = _cookie.replace(/domain=[a-z0-9\-.]*;/i, `Domain=${options.replaceDomain};`)
    }
    if (options.fixSameSite) {
      if (_cookie.match(/samesite/i)) {
        _cookie = _cookie.replace(/samesite=[a-z0-9\-.]*;/i, `SameSite=${options.fixSameSite};`)
      } else {
        _cookie += `; SameSite=${options.fixSameSite}`
      }
    }
    if (options.fixSecure && !_cookie.match(/secure/i)) {
      _cookie += `; Secure`
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
