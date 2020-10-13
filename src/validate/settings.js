'use strict'

const superstruct = require('superstruct')

const s = superstruct.struct

const settings = s({
  version: 'string',
  load: ['string'],
  log: s({
    level: s.enum(['debug', 'trace', 'info', 'warn', 'error', 'fatal']),
    pretty: 'boolean',
    version: 'string'
  }),
  hostname: 'string',
  server: 'object',
  request: s({
    idle: 'number'
  }),
  cors: 'object',
  ws: 'object',
  history: s({ path: 'string' }),
  relay: s({
    timeout: 'number',
    response: s.optional(s({ rewrite: 'function?' })),
    request: s.optional(s({ rewrite: 'function?' }))
  }),
  cache: 'object'
})

module.exports = settings
