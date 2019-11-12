// Dependencies
import uuidv4 from 'uuid/v4.js'

// Models
import User from '../models/User.mjs'
import UserToken from '../models/UserToken.mjs'

import { isAllowedByUser } from './isAllowed.mjs'

export default function requestPasswordReset(login) {
  return new Promise((resolve, reject) => {
    // Search user to corresponding email address
    User
      .findOne({ where: { email: login } })
      .then(result => {
        if (result === null) return reject({ id: 22 })

        if (!isAllowedByUser(result, 'passwordReset')) return reject({ id: 25 })

        const token = uuidv4()

        UserToken
          .create({ token, userId: user.id, type: 'passwordReset' })
          .then(() => {
            const email = new Email(
              user.email,
              'Someone requested to reset your password',
              `<a href="${config.setNewPasswordRoute}?token=${token}">Click here to reset your password</a>`, // TODO: Change this to client when there has been added one
            )

            email
              .send()
              .then(resolve)
              .catch(failure => reject(failure))
          })
          .catch(err => reject({ id: 24, data: err }))
      })
      .catch(err => reject({ id: 23, data: err }))
  })
}
