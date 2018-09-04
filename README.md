# mbtiles-server

This is a fork of Christopher Helm's awesome [mbtiles-server](https://github.com/chelm/mbtiles-server). All credit should be flung at him. The changes in this fork are:

- The first path argument is the mbtiles file, so multiple mbtiles tile sets can be served with the same service.
- Vector tiles are supported.
- Some niceties on the return header (CORS, expiration, etc.).

To get it cranking, drop a mbtiles file in the server folder and:

```bash
npm install
node index.js
```

If you are on Windows and `npm install` comes back with a compilation error, try running `npm install -g windows-build-tools` first.

Requests look like this:

```text
http://localhost:3000/<mbtiles-name>/3/1/2.png
```

Note the extension on the end. As `mbtiles-server` supports raster and vector MBTILES files, it needs the extension to determine the type of file you're requesting. _Make sure you use the correct extension for your tile set._
