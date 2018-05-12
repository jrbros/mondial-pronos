const functions = require("firebase-functions");
const initGraphQLServer = require("./graphql/index.js");
const scrapeFIFAWebsite = require("./scraper/index.js");

const gqlServer = initGraphQLServer();

exports.api = functions.https.onRequest((req, res) => {
    scrapeFIFAWebsite();
    gqlServer(req, res);
});
