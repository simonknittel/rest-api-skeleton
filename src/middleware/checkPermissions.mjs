import User from '../models/User'

export default function checkPermissions(allowedRanks) {
  return (req, res, next) => {
    // admin credentials has been used
    if (res.locals.userId === 0) {
      next()
      return
    }

    User
      .findOne({ where: { id: res.locals.userId } })
      .then(result => {
        if (
          result.rank !== 1 // User has admin rank
          && allowedRanks.indexOf(result.rank) < 0 // Users rank is not explicity allowed
        ) {
          return res
            .status(401)
            .end()
        }

        return next()
      })
  }
}
