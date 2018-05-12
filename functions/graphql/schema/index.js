const { makeExecutableSchema } = require("graphql-tools");
const Query = require("./query.js");

const schema = `
    type Team {
        id: String!
        flag_url: String
        info_url: String
        name: String
    }

    type Match {
        id: String!
        date: String
        is_finished: Boolean
        is_known: Boolean
        home: Team
        away: Team
        home_score: Int
        away_score: Int
        phase: String
    }

    type Query {
        matches: [Match],
        match(id: String!): Match
    }
`;

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers: { Query: Query }
});
