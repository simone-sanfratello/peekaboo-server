'use strict'

const log = require('peppino')
const event = require('../lib/event')

/**
 * @param {Fastify} - fastify instance
 */
const relay = function (fastify) {
  fastify.get('/realtime', { websocket: true }, (connection, request) => {
    listen(connection.socket)
  })
}

const listen = function (socket) {
  log.trace({ m: 'append listening event to socket' })

  for (const eventName of ['relay:request', 'relay:response']) {
    event.on(eventName, (data) => {
      log.info({ ns: 'service:realtime', event: eventName, content: data })
      socket.send(JSON.stringify({ event: eventName, content: data }))
    })
  }
}

module.exports = relay
