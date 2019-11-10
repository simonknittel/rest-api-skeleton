import verifyEmail from '../../shared/verifyEmail.mjs'

export default function verifyEmailRoute(req, res) {
  verifyEmail(req.query.token)
    .then(() => res.end())
    .catch((err) => {
      if (err.type === 1) {
        res
          .status(401)
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
        console.error(err.data)
        res
          .status(500)
          .end()
      }
    })
}
