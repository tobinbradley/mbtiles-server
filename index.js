var express = require("express"),
  app = express(),
  MBTiles = require("@mapbox/mbtiles"),
  p = require("path"),
  fs = require("fs");

// path to the mbtiles; default is the server.js directory
var tilesDir = __dirname;

// Set return header
function getContentType(t) {
  var header = {};

  // CORS
  header["Access-Control-Allow-Origin"] = "*";
  header["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";

  // Cache
  header["Cache-Control"] = "public, max-age=604800";

  // request specific headers
  if (t === "png") {
    header["Content-Type"] = "image/png";
  }
  if (t === "jpg" || t === "jpeg") {
    header["Content-Type"] = "image/jpeg";
  }
  if (t === "pbf") {
    header["Content-Type"] = "application/x-protobuf";
    header["Content-Encoding"] = "gzip";
  }

  return header;
}

// header for error responses
function errorHeader() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "text/plain"
  };
}

// tile cannon
app.get("/:s/:z/:x/:y.:t", function (req, res) {
  if (fs.existsSync(req.params.s + ".mbtiles")) {
    new MBTiles(p.join(tilesDir, req.params.s + ".mbtiles"), function (
      err,
      mbtiles
    ) {
      if (err) {
        // Database read error
        res.set(errorHeader());
        res.status(404).send("Error opening database: " + err + "\n");
      } else {
        mbtiles.getTile(req.params.z, req.params.x, req.params.y, function (
          err,
          tile,
          headers
        ) {
          if (err) {
            // Tile read error
            res.set(errorHeader());
            res.status(404).send("Tile rendering error: " + err + "\n");
          } else {
            res.set(getContentType(req.params.t));
            res.send(tile);
          }
        });
      }
    });
  } else {
    // Database not found error
    res.set(errorHeader());
    res.status(404).send("MBTILES database not found.");
  }
});

// start up the server
console.log("Listening on port: " + 3000);
app.listen(3000);