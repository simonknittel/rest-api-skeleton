import jwt from 'jsonwebtoken'

import config from '../../config.mjs'
import error from '../../shared/error.mjs'
import login from '../../shared/login.mjs'

export default function loginRoute(req, res) {
  const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : null

  login(req.body.login, req.body.password, userAgent)
    .then(token => {
      // Respond with signed token in cookie and decoded cookie in body
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        res
          .cookie('jwt', token, {
            httpOnly: true,
            maxAge: config.jwt.expiration,
          })
          .send(decoded)
      })
    })
    .catch(err => error(err, res))
}
