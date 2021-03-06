// Dependencies
import bcrypt from 'bcrypt'
import Sequelize from 'sequelize'

import config from '../config.mjs'

// Models
import User from '../models/User.mjs'
import UserToken from '../models/UserToken.mjs'
import Session from '../models/Session.mjs'

const Op = Sequelize.Op

export default function setNewPassword(token, password) {
  return new Promise((resolve, reject) => {
    // Check token on validility
    UserToken
      .findOne({ where: { token, [Op.or]: [ {type: 'passwordReset'}, {type: 'setPassword'} ] }, include: [{ model: User }] })
      .then(result => {
        if (result === null) return reject({ id: 11 })

        if (result.type === 'passwordReset') {
          // Check token on expiration
          const difference = Date.now() - new Date(result.createdAt).getTime()
          if (difference > config.resetPasswordTokenExpiration) return reject({ id: 14 })
        }

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
                  .destroy({ where: { userId: result.user.id, [Op.or]: [ {type: 'passwordReset'}, {type: 'setPassword'} ] } })
                  .then(() => {
                    // Kill all sessions
                    Session
                      .destroy({ where: { userId: result.user.id }})
                      .then(resolve)
                      .catch(err => reject({ id: 26, data: err }))
                  })
                  .catch(err => reject({ id: 15, data: err }))
              })
              .catch(err => reject({ id: 13, data: err }))
          })
      })
      .catch(err => reject({ id: 12, data: err }))
  })
}
