const { makeExecutableSchema } = require("graphql-tools");
const Query = require("./query.js");

const schema = `
type Match {
  name: String!
  date: String
  finished: Boolean
  home_team: Int
  away_team: Int
}

type Query {
  matchs: [Match],
  match(name: String!): Match
}
`;

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers: { Query: Query }
});
