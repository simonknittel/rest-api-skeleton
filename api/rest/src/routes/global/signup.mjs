import error from '../../../../shared/methods/error.mjs'
import signup from '../../../../shared/methods/signup.mjs'

export default function signupRoute(req, res) {
  signup(req.body.login, req.body.password)
    .then(() => res.end())
    .catch(err => error(err, res))
}
