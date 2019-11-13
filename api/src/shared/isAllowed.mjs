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
    'route:users:put',
  ],
}

export function isAllowed(userId, requiredPermission) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ where: { id: userId } })
      .then(result => {
        if (isAllowedByUser(result, requiredPermission)) resolve()
        else reject()
      })
  })
}

export function isAllowedByUser(user, requiredPermission) {
  if (user.permissionRole === 0) return false

  // Admin bypass
  if (user.permissionRole === 1) return true

  // Allowed via permission role
  if (roles[user.permissionRole].indexOf(requiredPermission) >= 0) {
    // Rejected via blacklisted permissions
    if (user.blacklistedPermissions && user.blacklistedPermissions.indexOf(requiredPermission) >= 0) {
      return false
    }

    return true

  // Allowed via whitelisted permissions
  } else if (user.whitelistedPermissions && user.whitelistedPermissions.indexOf(requiredPermission) >= 0) {
    return true
  }

  return false
}
