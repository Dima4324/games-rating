const path = require("path");
const staticFile = require("../appModules/http-utils/static-file");
const mimeTypes = require("../appModules/http-utils/mime-types");
const { getData, endpoints } = require("../appModules/api");
const { config, makeRatingFile } = require("../appModules/rating");

async function mainRouteController(res, publicUrl, extname) {
    const data = await getData(endpoints.games);
    console.log(data);

    await makeRatingFile(config.PATH_TO_RATING_FILE, data);
    const ext = String(path.extname(publicUrl)).toLowerCase();

    if (ext in mimeTypes) {
        staticFile(res, publicUrl, extname);
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
}

module.exports = mainRouteController; 