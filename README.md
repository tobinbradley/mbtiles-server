mbtiles-server
==============

This is a fork of Christopher Helm's awesome [mbtiles-server](https://github.com/chelm/mbtiles-server) with a few modifications:

* It uses `path` to make the directory to the tiles, so the slash direction will be correct on Windows or Linux/Mac.
* It sets a variable for the location of the .mbtiles, in case you want to stick them somewhere else.
* You pass the name of the .mbtiles without the extension as the first route parameter (`http://localhost:3000/<mbtiles name>/{z}/{x}/{y}.png`), so the server can be used to serve more than 1 tileset.
* Added some scripts to create/remove a Windows service for the server.

1. `npm install`
2. `node server.js`

Visit http://localhost:3000/<mbtiles-name>/3/1/2.png.

If you're on Windows and want to install it as a service, first you'll need to install the node-windows plugin.

`npm install node-windows`

Then to install the server as a service:

`node windows-install-service.js`

To remove the service:

`node windows-remove-service.js`

