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
        const filtered = filter(item)

        resolve(filtered)
      })
      .catch(err => reject({ id: 39, data: err }))
  })
}

function filter(item) {
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
}
