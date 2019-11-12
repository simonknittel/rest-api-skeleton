// Dependencies
import jwt from 'jsonwebtoken'

import config from '../config.mjs'

// Models
import Session from '../models/Session.mjs'

/**
 * Verifies a provided JWT and checks it against the database. Returns the decoded JWT.
 *
 * @param {String} token
 * @returns {Object} Decoded JWT
 */
export default function authenticate(token) {
  return new Promise((resolve, reject) => {
    Session
      .findOne({ where: { token } })
      .then(result => {
        if (result === null) return reject({ id: 16 })

        jwt.verify(token, config.jwt.secret, (err, decoded) => {
          if (err) return reject({ id: 16 })
          resolve(decoded)
        })
      })
      .catch(err => reject({ id: 17, data: err }))
  })
}
