// Models
import UserToken from '../models/UserToken.mjs'
import User from '../models/User.mjs'

export default function verifyEmail(token) {
  return new Promise((resolve, reject) => {
    UserToken
      .findOne({ where: { token, type: 'verifyEmail' }, include: [{ model: User }] })
      .then(result => {
        if (result === null) return reject({ type: 1 })

        User
          .update({ emailVerified: true }, { where: { id: result.user.id } })
          .then(() => {
            // Delete token
            UserToken
              .destroy({ where: { token } })
              .then(resolve)
              .catch(err => reject({ type: 4, data: err }))
          })
          .catch(err => reject({ type: 3, data: err }))
      })
      .catch(err => reject({ type: 2, data: err }))
  })
}
