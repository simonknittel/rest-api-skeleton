import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import User from '../../models/User.mjs'
import UserToken from '../../models/UserToken.mjs'

import config from '../../config.mjs'

import error from '../../shared/error.mjs'
import Email from '../../shared/email.mjs'
import triggerVerifyEmail from '../../shared/triggerVerifyEmail.mjs'

export default function postRoute(req, res) {
  if (
    !req.body
    || Object.keys(req.body).length === 0
  ) return error({ id: 32 }, res)

  const updates = {}

  updates.email = req.body.login

  updates.password = null
  updates.emailVerified = false
  if (req.body.password) updates.password = bcrypt.hashSync(req.body.password, config.saltRounds)
  if (!updates.password) updates.emailVerified = true // No need to verify the email address if the "set password" email is already going to that email address
  if (updates.password && req.body.emailVerified) updates.emailVerified = req.body.emailVerified === 'true' || false

  if (req.body.permissionRole) updates.permissionRole = req.body.permissionRole
  if (req.body.whitelistedPermissions) updates.whitelistedPermissions = req.body.whitelistedPermissions
  if (req.body.blacklistedPermissions) updates.blacklistedPermissions = req.body.blacklistedPermissions

  User
    .create(updates, { returning: true })
    .then(user => {
      if (!updates.password) {
        const token = uuidv4()

        UserToken
          .create({ token, userId: user.id, type: 'setPassword' })
          .then(() => {
            const email = new Email(
              user.email,
              'Please set your password',
              `<a href="${config.client.setNewPasswordRoute}?token=${token}">Click here to set your password</a>`,
            )

            email
              .send()
              .then(() => res.end())
              .catch(failure => error(failure))
          })
          .catch(err => error({ id: 33, data: err }))
      } else {
        if (updates.email && updates.emailVerified === false) {
          triggerVerifyEmail(user.id, user.email)
            .then(() => res.end())
            .catch(err => error(err, res))
        } else {
          res.end()
        }
      }
    })
    .catch(err => error({ id: 34, data: err }, res))
}
