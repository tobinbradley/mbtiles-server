# mbtiles-server

A dirt simple tiles server for [MBTiles](https://github.com/mapbox/mbtiles-spec) files. It can serve image and vector tiles, and multiple MBTiles files can be served.

## Get Started

```sh
npm install
npm start
```

## Routes

### List Available Tile Sets

```text
http://localhost:3000/list
```

### Show Available Meta for Tile Set

```text
http://localhost:3000/[mbtiles file]/meta
```

Ex: http://localhost:3000/tiles.mbtiles/meta

### Fetch a Tile

```text
http://localhost:3000/[mbtiles file]/[z]/[x]/[y]
```

Ex: http://localhost:3000/tiles.mbtiles/12/1128/1620

## Notes

`index.js` contains two variables - `tilesDir` and `port` - the set the directory to find MBTiles files and the server port respectively. The defaults are the server's folder and port 3000.

The [Fastify](https://www.fastify.io/) extensions [fastify-caching](https://github.com/fastify/fastify-caching) and [fastify-cors](https://github.com/fastify/fastify-cors) are used to set tile expiration (in seconds) and CORS. By default, expiration is 48 hours and CORS is set to `access-control-allow-origin: *`. See the Fastify projects to learn how to customize those options further.

If you are on Windows and `npm install` returns a compilation error, try running `npm install -g windows-build-tools` first.

By default, Fastify only listens to requests from `localhost` for security reasons. You can change the `host` constant in `index.js` to `0.0.0.0` to listen to all IPv4 addresses. See the [Fastify listen docs](https://www.fastify.io/docs/latest/Server/#listen) for more details.

This tile server was originally inspired by Christopher Helm's awesome [mbtiles-server](https://github.com/chelm/mbtiles-server).