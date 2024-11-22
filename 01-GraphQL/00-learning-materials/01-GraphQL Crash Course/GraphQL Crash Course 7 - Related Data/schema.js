export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Query {
        games: [Game]
        game(id: ID!): Game
        reviews: [Review]
    }
`
