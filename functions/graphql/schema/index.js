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

    type Bet {
        match_id: String!
        home_score: Int
        away_score: Int
        score: Int
    }

    input BetInput {
        match_id: String!
        home_score: Int
        away_score: Int
    }

    type User {
        id: String!
        name: String
        avatar_url: String
        score: Int
        bets: [Bet]
    }

    input UserInput {
        name: String
        avatar_url: String
    }

    type Mutation {
        createBet(user_id: String!, input: BetInput)
        createUser(input: UserInput)
    }

    type Query {
        getMatches: [Match],
        getMatch(id: String!): Match
        getUsers: [User]
        getUser(id: String!): User
    }
`;

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers: { Query: Query }
});
