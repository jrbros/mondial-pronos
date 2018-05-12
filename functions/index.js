const functions = require("firebase-functions");
const initGraphQLServer = require("./graphql");
const hydrateDB = require("./db").hydrateDB;

const gqlServer = initGraphQLServer();

exports.api = functions.https.onRequest((req, res) => {
    hydrateDB();
    gqlServer(req, res);
});
