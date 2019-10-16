import jwt from 'jsonwebtoken'
import config from '../config'
import JWT from '../models/JWT'

export default function authenticateMiddleware(req, res, next) {
  if (!req.cookies.jwt) {
    res
      .status(401)
      .send('No or invalid token for authorization found.')
    return
  }

  const token = req.cookies.jwt

  authenticate(token)
    .then(userId => {
      res.locals.userId = userId
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

function authenticate(token) {
  return new Promise((resolve, reject) => {
    JWT
      .findOne({ where: { token } })
      .then(result => {
        if (result === null) return reject({ type: 1 })

        jwt.verify(token, config.jwt.secret, (err, decoded) => {
          if (err) return reject({ type: 1 })
          resolve(decoded.userId)
        })
      })
      .catch(err => reject({ type: 2, data: err })
  })
}
