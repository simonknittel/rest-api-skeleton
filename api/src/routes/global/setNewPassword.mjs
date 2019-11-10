import setNewPassword from '../../shared/setNewPassword.mjs'

export default function setNewPasswordRoute(req, res) {
  setNewPassword(req.body.token, req.body.password)
    .then(() => res.end())
    .catch((err) => {
      if (err.type === 1) {
        res
          .status(403)
          .end()
      } else if (err.type === 4) {
        res
          .status(403)
          .end()
      } else if (err.type === 2) {
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 3) {
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 5) {
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}
