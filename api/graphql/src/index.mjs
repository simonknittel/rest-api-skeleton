// For some reason `import { ApolloServer, gql} from 'apollo-server'` doesn't work
import apollo from 'apollo-server'
const ApolloServer = apollo.ApolloServer
const gql = apollo.gql

// Models
import '../../shared/models/index.mjs'

import config from '../../shared/config.mjs'
import sequelize from '../../shared/db.mjs'

const typeDefs = gql`
type Book {
  title: String
  author: String
}

type Query {
  books: [Book]
}
`

const books = [
  {
    title: '1 Lorem ipsum',
    autho: 'Me'
  },
  {
    title: '2 Lorem ipsum',
    autho: 'You'
  }
]

const resolvers = {
  Query: {
    books: () => books,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

// Start server
sequelize.sync().then(() => {
  server.listen().then(({ url }) => {
    console.log('GraphQL is running.')
  })
})
