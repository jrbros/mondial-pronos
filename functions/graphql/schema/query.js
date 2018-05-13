const functions = require("firebase-functions");
const db = require("../../db").db;

const matchesRef = db.ref("matches");
const teamsRef = db.ref("teams");

function fetchMatchTeams(match) {
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
            return match;
        });
    }
    return match;
}

function fetchMatch(snapshot) {
    const match = childSnapshot.val();
    match.id = childSnapshot.key;
    return fetchMatchTeams(match);
}

function fetchMatches(snapshot) {
    const matches = [];
    snapshot.forEach(childSnapshot => {
        matches.push(fetchMatch(childSnapshot));
    });
    return Promise.all(matches);
}

const Query = {
    matches() {
        return matchesRef
            .orderByChild("date")
            .once("value")
            .then(fetchMatches)
            .catch(console.error);
    },

    match(_, params) {
        return matchesRef
            .child(params.id)
            .once("value")
            .then(fetchMatch)
            .catch(console.error);
    }
};

module.exports = Query;
