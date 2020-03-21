// Models
import UserToken from '../../../../shared/models/UserToken.mjs'

export default function getRoute(req, res) {
  get(req.params.id)
    .then(item => res.send(item))
    .catch(err => error(err, res))
}

function get(id) {
  return new Promise((resolve, reject) => {
    UserToken
      .findOne({ where: { id } })
      .then(item => {
        const filtered = filter(item)

        resolve(filtered)
      })
      .catch(err => reject({ id: 42, data: err }))
  })
}

function filter(item) {
  return {
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    token: item.token,
    type: item.type,
  }
}
