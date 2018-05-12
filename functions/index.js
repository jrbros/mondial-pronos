import { setInterval } from "timers";

const functions = require("firebase-functions");
const initGraphQLServer = require("./graphql");
const hydrateDB = require("./db").hydrateDB;

const gqlServer = initGraphQLServer();

setInterval(hydrateDB, 3.6e6);

exports.api = functions.https.onRequest((req, res) => {
    gqlServer(req, res);
});
