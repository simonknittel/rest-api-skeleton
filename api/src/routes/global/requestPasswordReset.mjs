// Dependencies
import uuidv4 from 'uuid/v4.js'

// Models
import User from '../../models/User.mjs'
import PasswordResetToken from '../../models/PasswordResetToken.mjs'

export default function requestPasswordResetRoute(req, res) {
  requestPasswordReset(req.body.login)
    .then(() => res.end())
    .catch((err) => {
      if (err.type === 1) {
        res
          .status(404) // TODO: This response is a security issue (information disclosure)
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
      } else if ([100, 101].indexOf(err.type) > -1) { // Error in triggering the email
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}

function requestPasswordReset(login) {
  return new Promise((resolve, reject) => {
    // Search user to corresponding email address
    User
      .findOne({ where: { email: login } })
      .then(result => {
        if (result === null) return reject({ type: 1 })

        const token = uuidv4()

        PasswordResetToken
          .create({ token, userId: user.id })
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
          .catch(err => reject({ type: 3, data: err }))
      })
      .catch(err => reject({ type: 2, data: err }))
  })
}
