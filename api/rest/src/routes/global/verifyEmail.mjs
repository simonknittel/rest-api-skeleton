import error from '../../../../shared/methods/error.mjs'
import verifyEmail from '../../../../shared/methods/verifyEmail.mjs'

export default function verifyEmailRoute(req, res) {
  verifyEmail(req.query.token)
    .then(() => res.end())
    .catch(err => error(err, res))
}
