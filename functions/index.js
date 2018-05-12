const functions = require("firebase-functions");
const initGraphQLServer = require("./graphql/index.js");
const getMatches = require("./scraper/index.js");

const gqlServer = initGraphQLServer();

exports.api = functions.https.onRequest((req, res) => {
    console.log("File: " + req.originalUrl);
    console.log("YOOO");
    getMatches();
    gqlServer(req, res);
});
