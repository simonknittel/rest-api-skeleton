import error from '../../shared/error.mjs'
import verifyEmail from '../../shared/verifyEmail.mjs'

export default function verifyEmailRoute(req, res) {
  verifyEmail(req.query.token)
    .then(() => res.end())
    .catch(err => error(err, res))
}
