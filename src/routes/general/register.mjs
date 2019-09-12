import bcrypt from 'bcrypt'
import config from '../../config'
import User from '../../models/User'

export default function registerRoute(req, res) {
  if (
    !req.body.login
    || !req.body.password
    || req.body.login.trim().length <= 0
    || req.body.password.length <= 0
  ) {
    res
      .status(400)
      .json({ error: {id: 3, msg: 'E-mail address or password missing.'} })
    return
  }

  bcrypt
    .hash(req.body.password, config.saltRounds)
    .then(hash => {
      User
        .create({
          email: req.body.login.trim(),
          password: hash
        })
        .then(() => { res.end() })
        .catch(err => {
          console.error(err)
          res
            .status(500)
            .end()
        })
    })
}
