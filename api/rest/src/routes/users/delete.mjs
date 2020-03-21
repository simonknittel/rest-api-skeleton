// Models
import User from '../../../../shared/models/User.mjs'

export default function deleteRoute(req, res) {
  destroy(req.params.id)
    .then(() => res.end())
    .catch(err => error(err, res))
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    User
      .destroy({ where: { id }})
      .then(resolve)
      .catch(err => reject({ id: 38, data: err }))
  })
}
