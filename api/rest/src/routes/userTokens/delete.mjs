// Models
import UserToken from '../../../../shared/models/UserToken.mjs'

export default function deleteRoute(req, res) {
  destroy(req.params.id)
    .then(() => res.end())
    .catch(err => error(err, res))
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    UserToken
      .destroy({ where: { id }})
      .then(resolve)
      .catch(err => reject({ id: 41, data: err }))
  })
}
