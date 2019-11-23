// Models
import Session from '../../models/Session.mjs'

export default function getRoute(req, res) {
  get(req.params.id)
    .then(item => res.send(item))
    .catch(err => error(err, res))
}

function get(id) {
  return new Promise((resolve, reject) => {
    Session
      .findOne({ where: { id } })
      .then(item => {
        const filtered = filter(item)

        resolve(filtered)
      })
      .catch(err => reject({ id: 36, data: err }))
  })
}

function filter(item) {
  return {
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    token: item.token,
    userAgent: item.userAgent,
    lastSeen: item.lastSeen,
  }
}
