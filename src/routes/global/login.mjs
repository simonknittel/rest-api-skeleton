// Dependencies
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../../config'

// Models
import User from '../../models/User'
import JWT from '../../models/JWT'

export default function login(req, res) {
  if (
    !req.body.login
    || !req.body.password
    || req.body.login.trim().length <= 0
    || req.body.password.length <= 0
  ) {
    res
      .status(400)
      .json({ error: {id: 1, msg: 'E-mail address or password missing.'} })
    return
  }

  // Bypass login with admin credentials
  if (
    process.env.NODE_ENV === 'development'
    && req.body.login.trim() === process.env.ADMIN_LOGIN
    && req.body.password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ userId: 0 }, config.jwt.secret)
    res.send(token)
    return
  }

  // Search for real user
  User
    .findOne({ where: { email: req.body.login.trim() } })
    .then(user => {
      if (user === null) {
        res
          .status(401)
          .json({ error: {id: 2, msg: 'E-mail address or password wrong.'} })
        return
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then(result => {
          if (result === false) {
            res
              .status(401)
              .json({ error: {id: 2, msg: 'E-mail address or password wrong.'} })
            return
          }

          // Create token
          const token = jwt.sign({ userId: user.id }, config.jwt.secret)

          JWT
            .create({ token })
            .then(() => res.send(token))
            .catch(err => {
              console.error(err)
              res
                .status(500)
                .end()
            })
        })
    })
    .catch(err => {
      console.error(err)
      res
        .status(500)
        .end()
    })
}
