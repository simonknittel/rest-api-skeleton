import isAllowed from '../shared/isAllowed.mjs'

export default function isAllowedMiddleware(allowedRanks) {
  return (req, res, next) => {
    isAllowed(res.locals.authentication.userId, allowedRanks)
      .then(next)
      .catch(() => {
        return res
          .status(403)
          .end()
      })
  }
}
