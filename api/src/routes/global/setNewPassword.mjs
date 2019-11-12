import error from '../../shared/error.mjs'
import setNewPassword from '../../shared/setNewPassword.mjs'

export default function setNewPasswordRoute(req, res) {
  setNewPassword(req.body.token, req.body.password)
    .then(() => res.end())
    .catch(err => error(err, res))
}
