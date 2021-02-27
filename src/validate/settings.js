'use strict'

const { assert, object, array, string, enums, boolean, number, optional, func } = require('superstruct')

const settings = object({
  version: string(),
  load: array(string()),
  log: object({
    level: enums(['debug', 'trace', 'info', 'warn', 'error', 'fatal']),
    pretty: boolean(),
    version: string()
  }),
  hostname: string(),
  server: object(),
  request: object({
    idle: number()
  }),
  cors: object(),
  ws: object(),
  history: object({ path: string() }),
  relay: object({
    timeout: number(),
    response: optional(object({ rewrite: optional(func()) })),
    request: optional(object({ rewrite: optional(func()) }))
  }),
  cache: object()
})

module.exports = (data) => assert(data, settings)
