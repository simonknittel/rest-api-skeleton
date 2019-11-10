import authenticate from '../shared/authenticate.mjs'

export default function authenticateMiddleware(req, res, next) {
  if (!req.cookies.jwt) {
    res
      .status(401)
      .send('No or invalid token for authorization found.')
    return
  }

  /**
   * BUG: cookie-parser tries to automatically convert the value of the cookie
   * into e.g. an real JavaScript object which leads to issues during searching
   * for the cookie in the database
   */
  const token = req.cookies.jwt

  authenticate(token)
    .then(authentication => {
      res.locals.authentication = authentication
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
