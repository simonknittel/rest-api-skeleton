import { isAllowed } from '../shared/isAllowed.mjs'

export default function isAllowedMiddleware(allowedRoles) {
  return (req, res, next) => {
    isAllowed(res.locals.authentication.id, allowedRoles)
      .then(next)
      .catch(() => {
        return res
          .status(403)
          .end()
      })
  }
}
