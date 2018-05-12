const functions = require("firebase-functions");
const db = require("../../db").db;

const matchesRef = db.ref("matches");
const teamsRef = db.ref("teams");

const Query = {
    matches() {
        return matchesRef
            .orderByChild("date")
            .once("value")
            .then(data => {
                const matches = data.val();
                return Promise.all(
                    Object.keys(matches).map(id => {
                        const match = matches[id];
                        match.id = id;
                        if (match.is_known) {
                            return Promise.all([
                                teamsRef
                                    .child(match.home)
                                    .once("value")
                                    .then(home => home.val()),
                                teamsRef
                                    .child(match.away)
                                    .once("value")
                                    .then(away => away.val())
                            ]).then(values => {
                                match.home = values[0];
                                match.away = values[1];
                            });
                        }
                        return match;
                    })
                );
            })
            .catch(err => console.error("ERROR", err));
    },

    match(_, params) {
        return matchesRef
            .child(params.id)
            .once("value")
            .then(data => data.val())
            .catch(err => console.error("ERROR", err));
    }
};

module.exports = Query;
