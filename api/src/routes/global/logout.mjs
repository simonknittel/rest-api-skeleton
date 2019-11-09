import jwt from 'jsonwebtoken'
import config from '../../config.mjs'
import Session from '../../models/Session.mjs'

export default function logoutRoute(req, res) {
  /**
   * BUG: cookie-parser tries to automatically convert the value of the cookie
   * into e.g. an real JavaScript object which leads to issues during searching
   * for the cookie in the database
   */
  const token = req.cookies.jwt

  // No token found -> Nothing to log out
  if (!token) {
    res.end()
    return
  }

  jwt.verify(token, config.jwt.secret, (err) => {
    // Provided token invalid -> Nothing to log out
    if (err) {
      res.end()
      return
    }

    Session
      .destroy({ where: { token } })
      .then(() => {
        res
          .clearCookie('jwt')
          .end()
      })
      .catch(err => {
        console.error(err)
        res
          .status(500)
          .end()
      })
  })
}
