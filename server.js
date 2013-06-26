var express = require("express"),
    app = express(),
    MBTiles = require('mbtiles'),
    p = require("path");

// path to the mbtiles; default is the server.js directory
// var tilesDir = '/home/tobin/workspace/tiles/';
var tilesDir = __dirname;


app.get('/:s/:y/:x/:z.*', function(req, res) {
    new MBTiles(p.join(tilesDir, req.param('s') + '.mbtiles'), function(err, mbtiles) {
        mbtiles.getTile(req.param('z'), req.param('x'), req.param('y'), function(err, tile, headers) {
            if (err) {
                res.send('Tile rendering error: ' + err + '\n');
            } else {
                res.header("Content-Type", "image/png");
                res.send(tile);
            }
        });
        if (err) console.log("error opening database");
    });
});

console.log('Listening on port: ' + 3000);
app.listen(3000);
