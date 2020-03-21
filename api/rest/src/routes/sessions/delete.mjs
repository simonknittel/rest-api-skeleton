// Models
import Session from '../../../../shared/models/Session.mjs'

export default function deleteRoute(req, res) {
  destroy(req.params.id)
    .then(() => res.end())
    .catch(err => error(err, res))
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    Session
      .destroy({ where: { id }})
      .then(resolve)
      .catch(err => reject({ id: 35, data: err }))
  })
}
