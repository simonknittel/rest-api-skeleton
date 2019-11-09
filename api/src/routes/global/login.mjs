// Dependencies
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../../config.mjs'

// Models
import User from '../../models/User.mjs'
import Session from '../../models/Session.mjs'

export default function loginRoute(req, res) {
  const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : null

  login(req.body.login, req.body.password, userAgent)
    .then(token => {
      // Respond with signed token in cookie and decoded cookie in body
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        res
          .cookie('jwt', token, {
            httpOnly: true,
            maxAge: config.jwt.expiration,
          })
          .send(decoded)
      })
    })
    .catch(err => {
      if (err.type === 1) {
        res
          .status(400)
          .json({ error: {id: 1, msg: 'E-mail address or password missing.'} })
      } else if (err.type === 2) {
        res
          .status(401)
          .json({ error: {id: 2, msg: 'E-mail address or password wrong.'} })
      } else if (err.type === 3) {
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 4) {
        res
          .status(401)
          .json({ error: {id: 4, msg: 'E-mail address is not yet verified.'} })
      }
    })
}

/**
 * Verifies login and password. Returns a signed JWT containing the user's id and rank.
 *
 * @param {String} login
 * @param {String} password
 * @param {String} [userAgent=null]
 * @returns {String} Signed JWT
 */
function login(login, password, userAgent = null) {
  return new Promise((resolve, reject) => {
    if (
        !login
        || !password
        || login.trim().length <= 0
        || password.length <= 0
      ) return reject({ type: 1 })

      // Bypass login with admin credentials
      if (
        process.env.NODE_ENV === 'development'
        && login.trim() === process.env.ADMIN_LOGIN
        && password === process.env.ADMIN_PASS
      ) {
        const token = jwt.sign({ userId: 0 }, config.jwt.secret)
        return resolve(token)
      }

      // Search for real user
      User
        .findOne({ where: { email: login.trim() } })
        .then(user => {
          if (user === null) return reject({ type: 2 })

          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (result === false) return reject({ type: 2 })

              if (!user.emailVerified) return reject({ type: 4 })

              // Create token (expires in 31 days / 1 month)
              const token = jwt.sign({ userId: user.id, rank: user.rank, email: user.email }, config.jwt.secret, { expiresIn: '31d' })

              Session
                .create({ token, userAgent })
                .then(() => resolve(token))
                .catch(err => reject({ type: 3, data: err }))
            })
        })
        .catch(err => reject({ type: 3, data: err }))
  })
}
