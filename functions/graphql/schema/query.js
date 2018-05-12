const functions = require("firebase-functions");
const db = require("../../db").db;

const ref = db.ref("matches");

const Query = {
    matches() {
        return ref
            .orderByChild("date")
            .once("value")
            .then(data =>
                Object.entries(data.val()).map(item => {
                    const match = item[0];
                    match.id = item[1];
                    return match;
                })
            )
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
