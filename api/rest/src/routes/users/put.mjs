import User from '../../../../shared/models/User.mjs'

import error from '../../shared/error.mjs'
import { isAllowedByUser } from '../../../../shared/methods/isAllowed.mjs'
import triggerVerifyEmail from '../../../../shared/methods/triggerVerifyEmail.mjs'

export default function putRoute(req, res) {
  if (
    !req.params.id
    || !req.body
    || Object.keys(req.body).length === 0
  ) return error({ id: 30 }, res)

  if (
    parseInt(req.params.id) !== res.locals.authentication.id
    && !isAllowedByUser(res.locals.authentication, 'route:users:updateOthers')
  ) {
    return error({ id: 27 }, res)
  }

  const updates = {}

  if (req.body.email) {
    updates.email = req.body.email
    updates.emailVerified = false
  }

  if (isAllowedByUser(res.locals.authentication, 'route:users:updateOthers')) {
    if (req.body.permissionRole) updates.permissionRole = req.body.permissionRole
    if (req.body.whitelistedPermissions) updates.whitelistedPermissions = req.body.whitelistedPermissions
    if (req.body.blacklistedPermissions) updates.blacklistedPermissions = req.body.blacklistedPermissions
    if (req.body.emailVerified) updates.emailVerified = req.body.emailVerified
  }

  if (Object.keys(updates).length === 0) return error({ id: 30 }, res)

  User
    .update(updates, { where: { id: req.params.id }, returning: true })
    .then(result => {
      if (updates.email && updates.emailVerified === false) {
        const user = result[1][0]
        triggerVerifyEmail(user.id, user.email)
          .then(() => res.end())
          .catch(err => error(err, res))
      } else {
        res.end()
      }
    })
    .catch(err => error({ id: 28, data: err }, res))
}
