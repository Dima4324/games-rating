const path = require("path");
const staticFile = require("../appModules/http-utils/static-file");
const mimeTypes = require("../appModules/http-utils/mime-types");

async function defaultRouteController(res, url) {
  const ext = String(path.extname(url)).toLowerCase();
  if (ext in mimeTypes) {
    staticFile(res, url, ext);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}

module.exports = defaultRouteController;