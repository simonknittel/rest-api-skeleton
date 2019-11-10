import jwt from 'jsonwebtoken'

import config from '../../config.mjs'
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
    .catch(err => {
      if (err.type === 1) {
        res
          .status(400)
          .json({ error: {id: 1, msg: 'E-mail address or password missing.'} })
      } else if (err.type === 2) {
        res
          .status(401)
          .json({ error: {id: 2, msg: 'E-mail address or password wrong.'} })
      } else if (err.type === 3) {
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 4) {
        res
          .status(401)
          .json({ error: {id: 4, msg: 'E-mail address is not yet verified.'} })
      }
    })
}
