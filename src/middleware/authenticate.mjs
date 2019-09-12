import jwt from 'jsonwebtoken'
import config from '../config'
import JWTBlacklist from '../models/JWTBlacklist'

export default function authenticate(req, res, next) {
  const authHeader = req.header('Authorization')
  if (!authHeader || authHeader.indexOf('Bearer') !== 0) {
    res.status(401)
    res.send('No or invalid Authorization header found.')
    return
  }

  const token = authHeader.slice(7)

  JWTBlacklist
    .findOne({ where: { token } })
    .then(result => {
      if (result !== null) {
        res.status(401)
        res.send('Invalid token.')
        return
      }

      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
          res.status(401)
          res.send('No or invalid Authorization header found.')
          return
        }

        res.locals.userId = decoded.userId

        next()
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500)
      res.end()
    })
}
