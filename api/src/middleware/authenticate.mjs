import jwt from 'jsonwebtoken'
import config from '../config.mjs'
import Session from '../models/Session.mjs'

export default function authenticateMiddleware(req, res, next) {
  if (!req.cookies.jwt) {
    res
      .status(401)
      .send('No or invalid token for authorization found.')
    return
  }

  /**
   * BUG: cookie-parser tries to automatically convert the value of the cookie
   * into e.g. an real JavaScript object which leads to issues during searching
   * for the cookie in the database
   */
  const token = req.cookies.jwt

  authenticate(token)
    .then(authentication => {
      res.locals.authentication = authentication
      next()
    })
    .catch(err => {
      if (err.type === 1) {
        res
          .status(401)
          .send('No or invalid token for authorization found.')
      } else if (err.type === 2) {
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}

/**
 * Verifies a provided JWT and checks it against the database. Returns the decoded JWT.
 *
 * @param {String} token
 * @returns {Object} Decoded JWT
 */
function authenticate(token) {
  return new Promise((resolve, reject) => {
    Session
      .findOne({ where: { token } })
      .then(result => {
        if (result === null) return reject({ type: 1 })

        jwt.verify(token, config.jwt.secret, (err, decoded) => {
          if (err) return reject({ type: 1 })
          resolve(decoded)
        })
      })
      .catch(err => reject({ type: 2, data: err }))
  })
}
