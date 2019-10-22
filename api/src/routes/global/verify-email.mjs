// Models
import VerifyEmailToken from '../../models/VerifyEmailToken.mjs'
import User from '../../models/User.mjs'

export default function verifyEmailRoute(req, res) {
  verifyEmail(req.query.token)
    .then(() => res.end())
    .catch((err) => {
      if (err.type === 1) {
        res
          .status(401)
          .end()
      } else if (err.type === 2) {
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 3) {
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}

function verifyEmail(token) {
  return new Promise((resolve, reject) => {
    VerifyEmailToken
      .findOne({ where: { token }, include: [{ model: User }] })
      .then(result => {
        if (result === null) return reject({ type: 1 })

        User
          .update({ emailVerified: true }, { where: { id: result.user.id } })
          .then(resolve) // TODO: Delete token fram database
          .catch(err => reject({ type: 3, data: err }))
      })
      .catch(err => reject({ type: 2, data: err }))
  })
}
