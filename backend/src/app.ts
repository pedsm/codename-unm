import "reflect-metadata";
import * as express from "express"
import { readFileSync } from 'fs'
import { ApolloServer, gql } from 'apollo-server-express'
import { PORT } from './config'
import Mutation from './resolvers/mutation'
import Query from './resolvers/query'

const app = express()

const typeDefs = readFileSync('./schema.gql').toString()
const resolvers = {
  Query, 
  Mutation,
}


const server = new ApolloServer({
  typeDefs, resolvers, debug: true
})
server.applyMiddleware({ app })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.listen(PORT, () => {
  console.log(`🚀 Codename UNM running ${PORT}`)
})
