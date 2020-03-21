// Dependencies
import Sequelize from 'sequelize'

import config from '../config.mjs'

// Models
import Session from '../models/Session.mjs'
import User from '../models/User.mjs'

/**
 * Verifies a provided session id and checks it against the database. Returns the corresponding user.
 *
 * @param {String} token
 * @returns {Object} User
 */
export default function authenticate(token) {
  return new Promise((resolve, reject) => {
    Session
      .findOne({ where: { token }, include: [{ model: User }] })
      .then(result => {
        if (result === null) return reject({ id: 16 })

        // Check if session is not older than config.session.maxAge
        const createdAtTimestamp = new Date(result.createdAt).getTime()
        const expirationTimestamp = createdAtTimestamp + config.session.maxAge
        if (Date.now() > expirationTimestamp) return reject({ id: 16 })

        Session
          .update({ lastSeen: Sequelize.fn('NOW') }, { where: { id: result.id }})
          .then(() => resolve(result.user))
          .catch(err => reject({ id: 27, data: err }))
      })
      .catch(err => reject({ id: 17, data: err }))
  })
}
