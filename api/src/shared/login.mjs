import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../config.mjs'

import User from '../models/User.mjs'
import Session from '../models/Session.mjs'

import { isAllowedByUser } from './isAllowed.mjs'

/**
 * Verifies login and password. Returns a signed JWT containing the user's id and rank.
 *
 * @param {String} login
 * @param {String} password
 * @param {String} [userAgent=null]
 * @returns {String} Signed JWT
 */
export default function login(login, password, userAgent = null) {
  return new Promise((resolve, reject) => {
    if (
        !login
        || !password
        || login.trim().length <= 0
        || password.length <= 0
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

              // Create token (expires in 31 days / 1 month)
              const token = jwt.sign({ userId: user.id, permissionRole: user.permissionRole, email: user.email }, config.jwt.secret, { expiresIn: '31d' })

              Session
                .create({ token, userAgent })
                .then(() => resolve(token))
                .catch(err => reject({ id: 3, data: err }))
            })
        })
        .catch(err => reject({ id: 3, data: err }))
  })
}
