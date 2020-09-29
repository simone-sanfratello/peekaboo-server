'use strict'

const path = require('path')
const fs = require('fs').promises
const log = require('peppino')
const lib = require('../lib/history')

/**
 * @param {Fastify} - fastify instance
 */
const history = function (fastify, settings) {
  fs.mkdir(settings.history.path, { recursive: true })

  fastify.get('/history', async (request, response) => {
    let _current
    try {
      const _entries = []
      const _files = await fs.readdir(settings.history.path)
      _files.sort((a, b) => a > b ? -1 : 1)
      for (let i = 0; i < _files.length; i++) {
        const id = _files[i]
        _current = id
        const _file = path.join(settings.history.path, id)
        const stat = await fs.stat(_file)
        if (stat.isDirectory()) {
          continue
        }
        try {
          const content = await lib.read(_file)
          _entries.push(content.summary)
        } catch (error) {
          log.error({ error, file: _current })
        }
      }
      response.code(200).send(_entries)
    } catch (error) {
      response.code(500).send({
        file: _current,
        error: error.toString()
      })
    }
  })

  fastify.get('/history/:id', async (request, response) => {
    try {
      const content = await lib.read(path.join(settings.history.path, request.params.id))
      response.send(content)
    } catch (error) {
      response.code(500).send({
        error: error.toString()
      })
    }
  })

  fastify.delete('/history/:id', async (request, response) => {
    try {
      await fs.unlink(path.join(settings.history.path, request.params.id))
      response.send({})
    } catch (error) {
      log.error({ error })
      response.code(500).send({})
    }
  })

  fastify.delete('/history', async (request, response) => {
    try {
      const _files = await fs.readdir(settings.history.path)
      for (let i = 0; i < _files.length; i++) {
        const _file = path.join(settings.history.path, _files[i])
        const stat = await fs.stat(_file)
        if (stat.isDirectory()) {
          continue
        }
        fs.unlink(_file)
      }
      response.send({})
    } catch (error) {
      log.error({ error })
      response.code(500).send({})
    }
  })
}

module.exports = history
