// Models
import User from '../models/User.mjs'

export default function isAllowed(userId, allowedRanks) {
  return new Promise((resolve, reject) => {
    // admin credentials has been used
    if (userId === 0) return resolve()

    User
      .findOne({ where: { id: userId } })
      .then(result => {
        if (
          result.rank !== 1 // User has admin rank
          && allowedRanks.indexOf(result.rank) < 0 // Users rank is not explicity allowed
        ) return reject()

        resolve()
      })
  })
}
