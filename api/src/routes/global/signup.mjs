import signup from '../../shared/signup.mjs'

export default function signupRoute(req, res) {
  signup(req.body.login, req.body.password)
    .then(() => res.end())
    .catch(err => {
      if (err.type === 1) { // Login credentials are missing
        res
          .status(400)
          .json({ error: { id: 3, msg: 'E-mail address or password missing.' } })
      } else if (err.type === 2) { // Error in creating the user
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if ([3, 100, 101].indexOf(err.type) > -1) { // Error in triggering the email verification
        console.error(err.data)
        res
          .status(500)
          .end()
      } else if (err.type === 5) { // Login already exists
        res
          .status(400)
          .json({ error: { id: 4, msg: 'Login already in use.' } }) // TODO: This message is a security issue (information disclosure)
      }
    })
}
