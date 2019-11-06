// Dependencies
import uuidv4 from 'uuid/v4.js'
import bcrypt from 'bcrypt'
import config from '../../config.mjs'
import User from '../../models/User.mjs'
import VerifyEmailToken from '../../models/VerifyEmailToken.mjs'
import Email from '../../shared/email.mjs'

export default function registerRoute(req, res) {
  register(req.body.login, req.body.password)
    .then(() => res.end())
    .catch(err => {
      if (err.type === 1) { // Login credentials are missing
        res
          .status(400)
          .json({ error: { id: 3, msg: 'E-mail address or password missing.' } })
      } else if (err.type === 2) { // Error in creating the user
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if ([3, 100, 101].indexOf(err.type) > -1) { // Error in triggering the email verification
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 5) { // Login already exists
        res
          .status(400)
          .json({ error: { id: 4, msg: 'Login already in use.' } }) // TODO: This message is a security issue (information disclosure)
      }
    })
}

function register(login, password) {
  return new Promise((resolve, reject) => {
    if (
      !login
      || !password
      || login.trim().length <= 0
      || password.length <= 0
    ) {
      return reject({ type: 1 })
    }

    bcrypt
      .hash(password, config.saltRounds)
      .then(hash => {
        User
          .create({
            email: login.trim(),
            password: hash,
          })
          .then(createdUser => {
            triggerVerifyEmail(createdUser)
              .then(resolve)
              .catch(err => reject(err))
          })
          .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
              reject({ type: 5, data: err })
            } else {
              reject({ type: 2, data: err })
            }
          })
      })
  })
}

function triggerVerifyEmail(user) {
  return new Promise((resolve, reject) => {
    const token = uuidv4()

    VerifyEmailToken
      .create({ token, userId: user.id })
      .then(() => {
        const email = new Email(
          user.email,
          'Verify your email address',
          `<a href="${config.verifyEmailRoute}?token=${token}">Click here to verify your email address</a>`, // TODO: Change this to client when there has been added one
        )

        email
          .send()
          .then(resolve)
          .catch(failure => reject(failure))
      })
      .catch(err => reject({ type: 3, data: err }))
  })
}
