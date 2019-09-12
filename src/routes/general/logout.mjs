import jwt from 'jsonwebtoken'
import config from '../../config'
import JWTBlacklist from '../../models/JWTBlacklist'

export default function login(req, res) {
  const authHeader = req.header('Authorization')

  // No token found -> Nothing to log out
  if (!authHeader || authHeader.indexOf('Bearer') !== 0) {
    res.end()
    return
  }

  const token = authHeader.slice(7)

  jwt.verify(token, config.jwt.secret, (err) => {
    // Token not valid -> No need to add it to the blacklist
    if (err) {
      res.end()
      return
    }

    // Add token to blacklist -> Prevent token to be used in the future
    JWTBlacklist
      .create({ token })
      .then(() => { res.end() })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.end()
        } else {
          console.error(err.name)
          res
            .status(500)
            .end()
        }
      })
  })
}
