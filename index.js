const fastify = require('fastify')({ logger: false })
const sqlite3 = require('sqlite3')
const tiletype = require('@mapbox/tiletype')
const path = require('path')
const glob = require('glob')
const tilesDir = __dirname // directory to read mbtiles files
const port = 3000 // port the server runs on

// fastify extensions
fastify.register(require('fastify-caching'), {
  privacy: 'private',
  expiresIn: 60 * 60 * 24 // 48 hours
})
fastify.register(require('fastify-cors'))

// Tile
fastify.get('/:database/:z/:x/:y', async (request, reply) => {
  // make it compatible with the old API
  const database =
    path.extname(request.params.database) === '.mbtiles'
      ? request.params.database
      : request.params.database + '.mbtiles'
  const y = path.parse(request.params.y).name

  const db = new sqlite3.cached.Database(
    path.join(tilesDir, database),
    sqlite3.OPEN_READONLY,
    err => {
      if (err) {
        reply.code(404).send('Error opening database: ' + err + '\n')
      }
    }
  )
  db.get(
    'SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?',
    [
      request.params.z,
      request.params.x,
      (1 << request.params.z) - 1 - y
    ],
    function(err, row) {
      if (err) {
        reply.code(500).send('Tile rendering error: ' + err + '\n')
      }
      else if (!row) {
        reply.code(204).send()
      }
      else {
        Object.entries(tiletype.headers(row.tile_data)).forEach(h =>
          reply.header(h[0], h[1])
        )
        reply.send(row.tile_data)
      }
    }
  )
})

// MBtiles meta route
fastify.get('/:database/meta', async (request, reply) => {
  const db = new sqlite3.cached.Database(
    path.join(tilesDir, request.params.database),
    sqlite3.OPEN_READONLY,
    err => {
      if (err) {
        reply.code(404).send('Error opening database: ' + err + '\n')
      }
    }
  )
  db.all('SELECT name, value FROM metadata', function(err, rows) {
    if (err) {
      reply.code(500).send('Error fetching metadata: ' + err + '\n')
    }
    else if (!rows) {
      reply.code(204).send('No metadata present')
    }
    else {
      reply.send(rows)
    }
  })
})

// MBtiles list
fastify.get('/list', async (request, reply) => {
  glob(tilesDir + '/*.mbtiles', {}, (err, files) => {
    reply.send(files.map(file => path.basename(file)))
  })
})

// Run the server!
fastify.listen(port)
console.log(`tile server listening on port ${port}`)
