const bodyParser = require("body-parser");
const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { printSchema } = require("graphql/utilities/schemaPrinter");
const schema = require("./schema/index.js");

function initGraphQLServer() {
    const graphQLServer = express();

    graphQLServer.use(
        "/graphql",
        bodyParser.json(),
        graphqlExpress({ schema, context: {} })
    );

    graphQLServer.use(
        "/graphiql",
        graphiqlExpress({
            endpointURL: "/api/graphql" // add /mondial-pronos/us-central1/api in dev
        })
    );

    graphQLServer.use("/schema", (req, res) => {
        res.set("Content-Type", "text/plain");
        res.send(printSchema(schema));
    });

    return graphQLServer;
}

module.exports = initGraphQLServer;
