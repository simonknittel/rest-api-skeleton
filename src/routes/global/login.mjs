// Dependencies
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../../config'

// Models
import User from '../../models/User'
import JWT from '../../models/JWT'

export default function loginRoute(req, res) {
  login(req.body.login, req.body.password)
    .then(token => {
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 31 // 31 days / 1 month
        })
        .send()
    })
    .catch((err) => {
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
      }
    })
}

function login(login, password) {
  return new Promise((resolve, reject) => {
    if (
        !login
        || !password
        || login.trim().length <= 0
        || password.length <= 0
      ) return reject({ type: 1 })

      // Bypass login with admin credentials
      if (
        process.env.NODE_ENV === 'development'
        && login.trim() === process.env.ADMIN_LOGIN
        && password === process.env.ADMIN_PASS
      ) {
        const token = jwt.sign({ userId: 0 }, config.jwt.secret)
        return resolve(token)
      }

      // Search for real user
      User
        .findOne({ where: { email: login.trim() } })
        .then(user => {
          if (user === null) return reject({ type: 2 })

          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (result === false) return reject({ type: 2 })

              // Create token (expires in 31 days / 1 month)
              const token = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: '31d' })

              JWT
                .create({ token })
                .then(() => resolve(token))
                .catch(err => reject({ type: 3, data: err }))
            })
        })
        .catch(err => reject({ type: 3, data: err }))
  })
}
