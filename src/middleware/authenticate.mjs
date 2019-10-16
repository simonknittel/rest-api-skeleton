import jwt from 'jsonwebtoken'
import config from '../config'
import JWT from '../models/JWT'

export default function authenticate(req, res, next) {
  const authHeader = req.header('Authorization')
  if (!authHeader || authHeader.indexOf('Bearer') !== 0) {
    res
      .status(401)
      .send('No or invalid Authorization header found.')
    return
  }

  const token = authHeader.slice(7)

  JWT
    .findOne({ where: { token } })
    .then(result => {
      if (result === null) {
        return res
          .status(401)
          .send('No or invalid Authorization header found.')
      }

      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send('No or invalid Authorization header found.')
          return
        }

        res.locals.userId = decoded.userId

        next()
      })
    })
    .catch(err => {
      console.error(err)
      res
        .status(500)
        .end()
    })
}
