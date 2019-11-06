// Dependencies
import bcrypt from 'bcrypt'

// Models
import PasswordResetToken from '../../models/PasswordResetToken.mjs'
import User from '../../models/User.mjs'
import config from '../../config.mjs'

export default function setNewPasswordRoute(req, res) {
  setNewPassword(req.body.token, req.body.password)
    .then(() => res.end())
    .catch((err) => {
      if (err.type === 1) {
        res
          .status(403)
          .end()
      } else if (err.type === 4) {
        res
          .status(403)
          .end()
      } else if (err.type === 2) {
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 3) {
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 5) {
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}

function setNewPassword(token, password) {
  return new Promise((resolve, reject) => {
    // Check token on validility
    PasswordResetToken
      .findOne({ where: { token }, include: [{ model: User }] })
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
                PasswordResetToken
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
