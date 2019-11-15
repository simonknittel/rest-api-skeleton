import bcrypt from 'bcrypt'
import crypto from 'crypto'
import validator from 'validator'

import User from '../models/User.mjs'
import Session from '../models/Session.mjs'

import { isAllowedByUser } from './isAllowed.mjs'

/**
 * Verifies login and password. Returns a session id and corresponding user.
 *
 * @param {String} login
 * @param {String} password
 * @param {String} [userAgent=null]
 */
export default function login(login, password, options) {
  return new Promise((resolve, reject) => {
    if (
        !login
        || !password
        || login.trim().length <= 0
        || password.length <= 0
        || !validator.isEmail(login.trim())
      ) return reject({ id: 1 })

      // Search for real user
      User
        .findOne({ where: { email: login.trim() } })
        .then(user => {
          if (user === null) return reject({ id: 2 })

          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (result === false) return reject({ id: 2 })

              if (!isAllowedByUser(user, 'login')) return reject({ id: 5 })

              if (!user.emailVerified) return reject({ id: 4 })

              let userAgent = null;
              if (options.userAgent) userAgent = options.userAgent

              generateSessionToken()
                .then(token => {
                  Session
                    .create({ token, userAgent, userId: user.id })
                    .then(() => resolve({ token, user }))
                    .catch(err => reject({ id: 3, data: err }))
                })
            })
        })
        .catch(err => reject({ id: 3, data: err }))
  })
}

function generateSessionToken() {
  return new Promise(resolve => {
    crypto.randomBytes(128, (err, buf) => {
      resolve(buf.toString('hex'))
    })
  })
}
