import error from '../shared/error.mjs'
import authenticate from '../shared/authenticate.mjs'

export default function authenticateMiddleware(req, res, next) {
  res.locals.authentication = null

  /**
   * BUG: cookie-parser tries to automatically convert the value of the cookie
   * into e.g. an real JavaScript object which leads to issues during searching
   * for the cookie in the database
   */
   const token = req.signedCookies.session

   if (!token) return next()

  authenticate(token)
    .then(authentication => {
      res.locals.authentication = authentication
      next()
    })
    .catch(err => {
      if ([17, 27].indexOf(err.id) >= 0) console.trace(err)

      res.locals.authentication = null
      next()
    })
}
