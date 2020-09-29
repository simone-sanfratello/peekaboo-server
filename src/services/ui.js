'use strict'

const fs = require('fs')
const mime = require('mime')
const path = require('path')

/**
 * @param {Fastify} - fastify instance
 */
const main = function (fastify) {
  fastify.get('/ui*', (request, response) => {
    const file = path.join(__dirname, '../../bin/ui', request.params['*'] || 'index.html')
    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) {
        response
          .code(404)
          .header('Content-Type', 'text/plain')
          .send('NOT_FOUND')
        return
      }
      const stream = fs.createReadStream(file)

      response
        .code(200)
        .header('Content-Type', mime.getType(path.extname(file)) || 'application/octet')
        .header('Content-Length', stat.size)
      response.send(stream)
    })
  })
}

module.exports = main
