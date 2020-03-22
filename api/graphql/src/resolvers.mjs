import signup from '../../shared/methods/signup.mjs'

import { filterUser } from '../../shared/filters.mjs'
import errorBasics from '../../shared/errorBasics.mjs'

// Models
import User from '../../shared/models/User.mjs'

export default {
  Query: {
    user: (_, { id }) => {
      return new Promise((resolve, reject) => {
        User
          .findOne({ where: { id } })
          .then(item => {
            const filtered = filterUser(item)
            resolve(filtered)
          })
          .catch(err => reject({ id: 39, data: err }))
      })
    }
  },
  Mutation: {
    signup: (_, { login, password }) => {
      return new Promise(resolve => {
        signup(login, password)
          .then(createdUser => {
            resolve({ code: '', success: true, message: '', user: createdUser })
          })
          .catch(err => {
            const error = errorBasics(err)
            console.log(error)
            resolve({ code: error.id, success: false, message: error.msg })
          })
      })
    }
  }
}
