// Models
import Session from '../../models/Session.mjs'

export default function getAllRoute(req, res) {
  getAll()
    .then(items => res.send(items))
    .catch(err => error(err, res))
}

function getAll() {
  return new Promise((resolve, reject) => {
    Session
      .findAll()
      .then(items => {
        const filtered = filter(items)

        resolve(filtered)
      })
      .catch(err => reject({ id: 37, data: err }))
  })
}

function filter(items) {
  return items.map(item => {
    return {
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      token: item.token,
      userAgent: item.userAgent,
      lastSeen: item.lastSeen,
    }
  })
}
