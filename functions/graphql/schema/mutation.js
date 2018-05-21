const functions = require("firebase-functions");
const db = require("../../db").db;

const matchesRef = db.ref("matches");
const teamsRef = db.ref("teams");

const Mutation = {
    createBet(_, params) {
        return usersRef
            .child(params.userId)
            .update({ [params.matchId]: params })
            .orderByChild("date")
            .once("value")
            .then(fetchMatches)
            .catch(console.error);
    },

    createUser(_, params) {
        return matchesRef
            .set(params.id)
            .once("value")
            .then(fetchMatch)
            .catch(console.error);
    }
};

module.exports = Mutation;
