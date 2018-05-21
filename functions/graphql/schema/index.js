const { makeExecutableSchema } = require("graphql-tools");
const Query = require("./query.js");
const Mutation = require("./mutation.js");

const schema = `
    type Team {
        id: String!
        flagUrl: String
        infoUrl: String
        name: String
    }

    type Match {
        id: String!
        date: String
        isFinished: Boolean
        isKnown: Boolean
        home: Team
        away: Team
        homeScore: Int
        awayScore: Int
        phase: String
    }

    type Bet {
        matchId: String!
        homeScore: Int
        awayScore: Int
        score: Int
    }

    input BetInput {
        home_score: Int
        away_score: Int
    }

    type User {
        id: String!
        name: String
        avatarUrl: String
        score: Int
        bets: [Bet]
    }

    input UserInput {
        name: String
        avatarUrl: String
    }

    type Mutation {
        createBet(userId: String!, matchId: String!, input: BetInput)
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
