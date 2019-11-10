// Dependencies
import bcrypt from 'bcrypt'

import config from '../config.mjs'

// Models
import UserToken from '../models/UserToken.mjs'
import User from '../models/User.mjs'

export default function setNewPassword(token, password) {
  return new Promise((resolve, reject) => {
    // Check token on validility
    UserToken
      .findOne({ where: { token, type: 'passwordReset' }, include: [{ model: User }] })
      .then(result => {
        if (result === null) return reject({ type: 1 })

        // Check token on expiration
        const difference = Date.now() - new Date(result.createdAt).getTime()
        if (difference > config.resetPasswordTokenExpiration) return reject({ type: 4 })

        // Hash new password
        bcrypt
          .hash(password, config.saltRounds)
          .then(hash => {
            // Set new password of the token's corresponding user
            User
              .update({ password: hash }, { where: { id: result.user.id } })
              .then(() => {
                // Delete token
                UserToken
                  .destroy({ where: { token } })
                  .then(resolve)
                  .catch(err => reject({ type: 5, data: err }))
              })
              .catch(err => reject({ type: 3, data: err }))
          })
      })
      .catch(err => reject({ type: 2, data: err }))
  })
}
