import bcrypt from 'bcrypt'
import config from '../../config'
import User from '../../models/User'

export default function registerRoute(req, res) {
  register(req.body.login, req.body.password)
    .then(() => res.end())
    .catch(err => {
      if (err.type === 1) {
        res
          .status(400)
          .json({ error: {id: 3, msg: 'E-mail address or password missing.'} })
      } else if (err.type === 2) {
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}

function register(login, password) {
  return new Promise((resolve, reject) => {
    if (
      !login
      || !password
      || login.trim().length <= 0
      || password.length <= 0
    ) {
      return reject({
        type: 1
      })
    }

    bcrypt
      .hash(password, config.saltRounds)
      .then(hash => {
        User
          .create({
            email: login.trim(),
            password: hash
          })
          .then(resolve)
          .catch(err => reject({ type: 2, data: err }))
      })
  })
}
