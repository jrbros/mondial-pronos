const functions = require("firebase-functions");
const admin = require("firebase-admin");
const scraper = require("./scraper");

admin.initializeApp();

const db = admin.database();

function hydrateDB() {
    scraper.getMatches().then(matches => db.ref("/matches").set(matches));
    scraper.getTeams().then(teams => db.ref("/teams").set(teams));
}

module.exports = {
    db: db,
    hydrateDB: hydrateDB
};
