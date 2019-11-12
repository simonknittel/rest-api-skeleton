import error from '../../shared/error.mjs'
import signup from '../../shared/signup.mjs'

export default function signupRoute(req, res) {
  signup(req.body.login, req.body.password)
    .then(() => res.end())
    .catch(err => error(err, res))
}
