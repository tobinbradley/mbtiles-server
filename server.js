var express = require("express"),
    app = express(),
    MBTiles = require('mbtiles'),
    p = require("path");

// path to the mbtiles; default is the server.js directory
var tilesDir = __dirname;

// Set mime type from user input
function getContentType(t) {
    if (t === "jpg") {
        return "image/jpeg";
    }
    if (t === "png") {
        return "image/png";
    }
}

app.get('/:s/:z/:x/:y.:t', function(req, res) {
    new MBTiles(p.join(tilesDir, req.params.s + '.mbtiles'), function(err, mbtiles) {
        mbtiles.getTile(req.params.z, req.params.x, req.params.y, function(err, tile, headers) {
            if (err) {
                res.set({
                    "Content-Type": "text/plain"
                });
                res.status(404).send('Tile rendering error: ' + err + '\n');
            } else {
                res.set({
                    "Content-Type": getContentType(req.params.t),
                    "Cache-Control": "public, max-age=2592000"  // leave this out for no caching - default is 1 month
                });
                res.send(tile);
            }
        });
        if (err) console.log("error opening database");
    });
});

console.log('Listening on port: ' + 3000);
app.listen(3000);
