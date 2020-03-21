import apollo from 'apollo-server'
const gql = apollo.gql

export default gql`
type User {
  id: ID
  createdAt: String
  updatedAt: String
  email: String
  permissionRole: Int
  whitelistedPermissions: String
  blacklistedPermissions: String
  emailVerified: Boolean
}

type Query {
  user(id: ID!): User
}

type Mutation {
  signup(login: String!, password: String!): User
}
`
