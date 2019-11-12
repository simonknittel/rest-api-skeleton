// Dependencies
import uuidv4 from 'uuid/v4.js'
import bcrypt from 'bcrypt'

import config from '../config.mjs'

import User from '../models/User.mjs'
import UserToken from '../models/UserToken.mjs'
import Email from './email.mjs'

export default function signup(login, password) {
  return new Promise((resolve, reject) => {
    if (
      !login
      || !password
      || login.trim().length <= 0
      || password.length <= 0
    ) {
      return reject({ id: 18 })
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
              reject({ id: 20, data: err })
            } else {
              reject({ id: 19, data: err })
            }
          })
      })
  })
}

function triggerVerifyEmail(user) {
  return new Promise((resolve, reject) => {
    const token = uuidv4()

    UserToken
      .create({ token, userId: user.id, type: 'verifyEmail' })
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
      .catch(err => reject({ id: 21, data: err }))
  })
}
