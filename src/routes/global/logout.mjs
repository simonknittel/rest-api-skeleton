import jwt from 'jsonwebtoken'
import config from '../../config.mjs'
import Session from '../../models/Session.mjs'

export default function login(req, res) {
  const authHeader = req.header('Authorization')

  // No token found -> Nothing to log out
  if (!authHeader || authHeader.indexOf('Bearer') !== 0) {
    res.end()
    return
  }

  const token = authHeader.slice(7)

  jwt.verify(token, config.jwt.secret, (err) => {
    // Provided token invalid -> Nothing to log out
    if (err) {
      res.end()
      return
    }

    Session
      .destroy({ where: { token } })
      .then(() => res.end())
      .catch(err => {
        console.error(err.name)
        res
          .status(500)
          .end()
      })
  })
}
