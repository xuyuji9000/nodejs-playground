import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// data
import db from './_db.js'

// types
import { typeDefs } from './schema.js'


const resolvers = {
  Query: {
    games() {
      return db.games
    },
    game(_, args) {
      return db.games.find( (game) => game.id === args.id)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);