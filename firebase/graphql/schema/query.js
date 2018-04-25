const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.database();
const ref = db.ref("/knockout");

const Query = {
    matchs() {
        console.log("BANZAIE");
        return ref
            .child("round_16")
            .child("matches")
            .once("value")
            .then(data => {
                console.log("Data", data);
                return data.val();
            })
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
            .then(data => {
                console.log("Data", data);
                return data.val();
            })
            .catch(err => console.error("ERROR", err));
    }
};

module.exports = Query;
