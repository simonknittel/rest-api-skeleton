// Models
import User from '../models/User.mjs'

/**
 * Permission roles:
 * 0 - no permissions (banned, disabled, ...)
 * 1 - all permissions (admin)
 * 2 - default permissions (user)
 */

const roles = {
  2: [
    'route:global:authenticated',
  ],
}

export default function isAllowed(userId, requiredPermission) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ where: { id: userId } })
      .then(result => {
        if (result.permissionRole === 0) return reject()

        // Admin bypass
        if (result.permissionRole === 1) return resolve()

        // Allowed via permission role
        if (roles[result.permissionRole].indexOf(requiredPermission) >= 0) {
          // Rejected via blacklisted permissions
          if (result.blacklistedPermissions && result.blacklistedPermissions.indexOf(requiredPermission) >= 0) {
            return reject()
          }

          return resolve()

        // Allowed via whitelisted permissions
        } else if (result.whitelistedPermissions && result.whitelistedPermissions.indexOf(requiredPermission) >= 0) {
          return resolve()
        }

        reject()
      })
  })
}
