import error from '../../shared/error.mjs'
import requestPasswordReset from '../../shared/requestPasswordReset.mjs'

export default function requestPasswordResetRoute(req, res) {
  requestPasswordReset(req.body.login)
    .then(() => res.end())
    .catch(err => error(err, res))
}
