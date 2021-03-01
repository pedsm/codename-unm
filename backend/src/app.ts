import "reflect-metadata";
import * as express from "express"
import { readFileSync } from 'fs'
import { PORT } from './config'
import { ApolloServer, gql } from 'apollo-server-express'
import Mutation from './resolvers/mutation'
import Query from './resolvers/query'

const app = express()

const typeDefs = readFileSync('./schema.gql').toString()
const resolvers = {
  Query, 
  Mutation,
}


const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log('🚀 Codename UNM running')
})


// createConnection().then(async connection => {

//   console.log("Inserting a new user into the database...");
//   const user = new User();
//   user.firstName = "Timber";
//   user.lastName = "Saw";
//   user.age = 25;
//   await connection.manager.save(user);
//   console.log("Saved a new user with id: " + user.id);

//   console.log("Loading users from the database...");
//   const users = await connection.manager.find(User);
//   console.log("Loaded users: ", users);

//   console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
