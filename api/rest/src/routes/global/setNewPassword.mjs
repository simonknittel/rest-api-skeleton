import error from '../../../../shared/methods/error.mjs'
import setNewPassword from '../../../../shared/methods/setNewPassword.mjs'

export default function setNewPasswordRoute(req, res) {
  setNewPassword(req.body.token, req.body.password)
    .then(() => res.end())
    .catch(err => error(err, res))
}
