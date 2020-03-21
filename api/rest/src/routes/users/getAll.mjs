// Models
import User from '../../../../shared/models/User.mjs'

export default function getAllRoute(req, res) {
  getAll()
    .then(items => res.send(items))
    .catch(err => error(err, res))
}

function getAll() {
  return new Promise((resolve, reject) => {
    User
      .findAll()
      .then(items => {
        const filtered = filter(items)

        resolve(filtered)
      })
      .catch(err => reject({ id: 40, data: err }))
  })
}

function filter(items) {
  return items.map(item => {
    return {
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      email: item.email,
      permissionRole: item.permissionRole,
      whitelistedPermissions: item.whitelistedPermissions,
      blacklistedPermissions: item.blacklistedPermissions,
      emailVerified: item.emailVerified,
    }
  })
}
