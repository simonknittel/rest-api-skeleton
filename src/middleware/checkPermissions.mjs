import User from '../models/User.mjs'

export default function checkPermissionsMiddleware(allowedRanks) {
  return (req, res, next) => {
    checkPermissions(res.locals.userId, allowedRanks)
      .then(next)
      .catch(() => {
        return res
          .status(401)
          .end()
      })
  }
}

function checkPermissions(userId, allowedRanks) {
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
