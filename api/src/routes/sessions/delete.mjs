// Models
import Session from '../../models/Session.mjs'

export default function deleteRoute(req, res) {
  destroy(req.params.id)
    .then(() => res.end())
    .catch(err => {
      console.error(err)
      res
        .status(500)
        .end()
    })
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    Session
      .destroy({ where: { id }})
      .then(resolve)
      .catch(err => reject({ type: 1, data: err }))
  })
}
