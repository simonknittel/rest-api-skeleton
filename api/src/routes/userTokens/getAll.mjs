// Models
import UserToken from '../../models/UserToken.mjs'

export default function getAllRoute(req, res) {
  getAll()
    .then(items => res.send(items))
    .catch(err => error(err, res))
}

function getAll() {
  return new Promise((resolve, reject) => {
    UserToken
      .findAll()
      .then(items => {
        const filtered = filter(items)

        resolve(filtered)
      })
      .catch(err => reject({ id: 43, data: err }))
  })
}

function filter(items) {
  return items.map(item => {
    return {
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      token: item.token,
      type: item.type,
    }
  })
}
