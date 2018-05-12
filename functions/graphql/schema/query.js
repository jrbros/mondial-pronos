const functions = require("firebase-functions");
const db = require("../../db").db;

const ref = db.ref("/knockout");

const Query = {
    matchs() {
        return ref
            .child("round_16")
            .child("matches")
            .once("value")
            .then(data => data.val())
            .catch(err => console.error("ERROR", err));
    },

    match(_, params) {
        return ref
            .child("round_16")
            .child("matches")
            .orderByChild("name")
            .equalTo(params.name)
            .limitToFirst(1)
            .once("value")
            .then(data => data.val())
            .catch(err => console.error("ERROR", err));
    }
};

module.exports = Query;
