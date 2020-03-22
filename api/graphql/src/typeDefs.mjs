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

interface MutationResponse {
  code: String!
  success: Boolean!
  message: String
}

type SignupMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String
  user: User
}

type Mutation {
  signup(login: String!, password: String!): SignupMutationResponse
}
`
