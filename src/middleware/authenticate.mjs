import jwt from 'jsonwebtoken'
import config from '../config'
import JWT from '../models/JWT'

export default function authenticateMiddleware(req, res, next) {
  const authHeader = req.header('Authorization')
  if (!authHeader || authHeader.indexOf('Bearer') !== 0) {
    res
      .status(401)
      .send('No or invalid Authorization header found.')
    return
  }

  const token = authHeader.slice(7)

  authenticate(token)
    .then(userId => {
      res.locals.userId = userId
      next()
    })
    .catch(err => {
      if (err.type === 1) {
        res
          .status(401)
          .send('No or invalid Authorization header found.')
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
