import { filterSingleUser } from '../../../../shared/filters.mjs'

// Models
import User from '../../../../shared/models/User.mjs'

export default function getRoute(req, res) {
  get(req.params.id)
    .then(item => res.send(item))
    .catch(err => error(err, res))
}

function get(id) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ where: { id } })
      .then(item => {
        const filtered = filterSingleUser(item)
        resolve(filtered)
      })
      .catch(err => reject({ id: 39, data: err }))
  })
}
