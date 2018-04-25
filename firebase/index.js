const functions = require("firebase-functions");
const initGraphQLServer = require("./graphql/index.js");

const gqlServer = initGraphQLServer();

exports.api = functions.https.onRequest((req, res) => {
    console.log("File: " + req.originalUrl);
    gqlServer(req, res);
});
