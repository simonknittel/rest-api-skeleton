import apollo from "apollo-server-express"
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
    code: Int!
    success: Boolean!
    message: String
  }

  type SignupMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    user: User
  }

  type SetNewPasswordMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
  }

  type RequestPasswordResetMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
  }

  type VerifyEmailMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
  }

  type LoginMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    user: User
    session: String
  }

  type LogoutMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
  }

  type Mutation {
    signup(email: String!, password: String!): SignupMutationResponse
    setNewPassword(
      token: String!
      password: String!
    ): SetNewPasswordMutationResponse
    requestPasswordReset(email: String!): RequestPasswordResetMutationResponse
    verifyEmail(token: String!): VerifyEmailMutationResponse
    login(email: String!, password: String!): LoginMutationResponse
    logout: LogoutMutationResponse
  }
`
