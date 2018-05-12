const functions = require("firebase-functions");
const db = require("../../db").db;

const ref = db.ref("/matches");

const Query = {
    matches() {
        return ref
            .orderBy("date")
            .once("value")
            .then(data => data.val())
            .catch(err => console.error("ERROR", err));
    },

    match(_, params) {
        return ref
            .child(params.id)
            .once("value")
            .then(data => data.val())
            .catch(err => console.error("ERROR", err));
    }
};

module.exports = Query;
