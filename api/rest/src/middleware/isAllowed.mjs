import { isAllowed } from '../../../shared/methods/isAllowed.mjs'

export default function isAllowedMiddleware(allowedRoles) {
  return (req, res, next) => {
    if (!res.locals.authentication) {
      return res
        .status(401)
        .send()
    }

    isAllowed(res.locals.authentication.id, allowedRoles)
      .then(next)
      .catch(() => {
        return res
          .status(403)
          .end()
      })
  }
}
