import error from '../../../../shared/methods/error.mjs'
import requestPasswordReset from '../../../../shared/methods/requestPasswordReset.mjs'

export default function requestPasswordResetRoute(req, res) {
  requestPasswordReset(req.body.login)
    .then(() => res.end())
    .catch(err => error(err, res))
}
