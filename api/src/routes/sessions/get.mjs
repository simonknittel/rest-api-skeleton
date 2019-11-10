// Models
import Session from '../../models/Session.mjs'

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
    Session
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
    token: item.token,
    userAgent: item.userAgent,
  }
}
