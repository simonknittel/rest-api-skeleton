// Models
import UserToken from '../models/UserToken.mjs'
import User from '../models/User.mjs'

export default function verifyEmail(token) {
  return new Promise((resolve, reject) => {
    UserToken
      .findOne({ where: { token, type: 'verifyEmail' }, include: [{ model: User }] })
      .then(result => {
        if (result === null) return reject({ id: 7 })

        User
          .update({ emailVerified: true }, { where: { id: result.user.id } })
          .then(() => {
            // Delete token
            UserToken
              .destroy({ where: { token } })
              .then(resolve)
              .catch(err => reject({ id: 10, data: err }))
          })
          .catch(err => reject({ id: 9, data: err }))
      })
      .catch(err => reject({ id: 8, data: err }))
  })
}
