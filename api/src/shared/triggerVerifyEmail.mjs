// Dependencies
import { v4 as uuidv4 } from 'uuid'

import config from '../config.mjs'

// Models
import UserToken from '../models/UserToken.mjs'
import Email from './email.mjs'

export default function triggerVerifyEmail(userId, userEmail) {
  return new Promise((resolve, reject) => {
    const token = uuidv4()

    UserToken
      .create({ token, userId, type: 'verifyEmail' })
      .then(() => {
        const email = new Email(
          userEmail,
          'Verify your email address',
          `<a href="${config.client.verifyEmailRoute}?token=${token}">Click here to verify your email address</a>`,
        )

        email
          .send()
          .then(resolve)
          .catch(failure => reject(failure))
      })
      .catch(err => reject({ id: 21, data: err }))
  })
}
