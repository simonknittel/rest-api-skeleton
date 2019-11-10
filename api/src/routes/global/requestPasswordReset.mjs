import requestPasswordReset from '../../shared/requestPasswordReset.mjs'

export default function requestPasswordResetRoute(req, res) {
  requestPasswordReset(req.body.login)
    .then(() => res.end())
    .catch((err) => {
      if (err.type === 1) {
        res
          .status(404) // TODO: This response is a security issue (information disclosure)
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
      } else if (err.type === 4) {
        res
          .status(403)
          .json({ error: {id: 5, msg: 'Permission required.'} })
      } else if ([100, 101].indexOf(err.type) > -1) { // Error in triggering the email
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}
