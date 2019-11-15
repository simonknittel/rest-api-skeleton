// Dependencies
import bcrypt from 'bcrypt'
import validator from 'validator'

import config from '../config.mjs'

// Models
import User from '../models/User.mjs'

import triggerVerifyEmail from './triggerVerifyEmail.mjs'

export default function signup(login, password) {
  return new Promise((resolve, reject) => {
    if (
      !login
      || !password
      || login.trim().length <= 0
      || password.length <= 0
      || !validator.isEmail(login.trim())
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
            triggerVerifyEmail(createdUser.id, createdUser.email)
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
