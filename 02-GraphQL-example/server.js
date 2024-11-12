var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// The root provides a resolver function for each API endpoint
var rootValue = {
    hello: () => 'Hello world!',
};

graphql({
    schema,
    source: '{ hello }',
    rootValue,
}).then((response) => {
    console.log(response);
});
