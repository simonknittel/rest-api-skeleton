// Models
import User from '../../models/User.mjs'

export default function getRoute(req, res) {
  get(req.params.id)
    .then(item => res.send(item))
    .catch(err => {
      if (err.type === 1) {
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}

function get(id) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ where: { id } })
      .then(item => {
        const filtered = filter(item)

        resolve(filtered)
      })
      .catch(err => reject({ type: 1, data: err }))
  })
}

function filter(item) {
  return {
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    email: item.email,
    rank: item.rank,
    emailVerified: item.emailVerified,
  }
}
