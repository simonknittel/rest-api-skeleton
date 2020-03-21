// For some reason `import { ApolloServer, gql } from 'apollo-server'` doesn't work
import apollo from 'apollo-server'
const ApolloServer = apollo.ApolloServer

// Models
import '../../shared/models/index.mjs'

import sequelize from '../../shared/db.mjs'

import typeDefs from './typeDefs.mjs'
import resolvers from './resolvers.mjs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

// Start server
sequelize.sync().then(() => {
  server.listen().then(() => {
    console.log('GraphQL is running.')
  })
})
