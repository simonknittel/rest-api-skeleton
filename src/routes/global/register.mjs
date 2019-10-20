// Dependencies
import uuidv4 from 'uuid/v4.js'
import bcrypt from 'bcrypt'
import https from 'https'
import querystring from 'querystring'
import config from '../../config.mjs'
import User from '../../models/User.mjs'
import VerifyEmailToken from '../../models/VerifyEmailToken.mjs'

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
      } else if ([3, 4, 5].indexOf(err.type) > -1) { // Error in triggering the email verification
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 6) { // Login already exists
        res
          .status(400)
          .json({ error: { id: 4, msg: 'Login already in use.' } })
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
              reject({ type: 6, data: err })
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
        const req = https.request({
          hostname: 'api.eu.mailgun.net',
          path: `/v3/${config.mailgun.domain}/messages`,
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`api:${config.mailgun.key}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }, (res) => {
          let responseBody = ''
          res.on('data', d => responseBody += d)

          res.on('end', () => {
            if (res.statusCode >= 400) return reject({ type: 5, data: responseBody})
            resolve()
          })
        })

        let failure = false
        req.on('error', err => { failure = err })

        req.write(querystring.stringify({
          from: config.mailgun.from,
          to: user.email,
          subject: 'Verify your email address',
          html: `<a href="${config.verifyEmailRoute}?token=${token}">Click here to verify your email address</a>`, // TODO: Change this to client when there has been added one
        }))

        req.end()

        if (failure) reject({ type: 4, data: failure })
      })
      .catch(err => reject({ type: 3, data: err }))
  })
}
