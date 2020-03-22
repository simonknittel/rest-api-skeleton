// For some reason `import { ApolloServer, gql } from 'apollo-server'` doesn't work
import express from "express"
import helmet from "helmet"
import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"

import apollo from "apollo-server-express"
const ApolloServer = apollo.ApolloServer

// Models
import "../../shared/models/index.mjs"

import config from "../../shared/config.mjs"
import sequelize from "../../shared/db.mjs"

import typeDefs from "./typeDefs.mjs"
import resolvers from "./resolvers.mjs"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(config.session.secret))

// TODO: Maybe replace with individual dependencies
app.use(
  helmet({
    // contentSecurityPolicy: {
    //   directives: {
    //     defaultSrc: ["'self'"]
    //   }
    // },
    referrerPolicy: {
      policy: "same-origin",
    },
    noCache: {},
  })
)

app.use(
  cors({
    origin: config.client.cors.origin.split(),
    credentials: true,
  })
)

app.use(compression())

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res }
  },
  playground: true,
  introspection: true,
})

server.applyMiddleware({ app })

// Start server
sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () => {
    console.log(
      `GraphQL is running at http://localhost:4000${server.graphqlPath}.`
    )
  })
})
