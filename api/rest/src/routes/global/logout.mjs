import error from '../../../../shared/methods/error.mjs'
import Session from '../../../../shared/models/Session.mjs'

export default function logoutRoute(req, res) {
  /**
   * BUG: cookie-parser tries to automatically convert the value of the cookie
   * into e.g. an real JavaScript object which leads to issues during searching
   * for the cookie in the database
   */
  const token = req.signedCookies.session

  // No token found -> Nothing to log out
  if (!token) {
    res.end()
    return
  }

  Session
    .destroy({ where: { token } })
    .then(() => {
      res
        .clearCookie('session')
        .end()
    })
    .catch(err => error({ id: 6 , data: err }, res))
}
