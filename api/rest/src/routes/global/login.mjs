import config from "../../../../shared/config.mjs"
import error from "../../shared/error.mjs"
import login from "../../../../shared/methods/login.mjs"
import { filterUser } from "../../../../shared/filters.mjs"

export default function loginRoute(req, res) {
  const userAgent = req.headers["user-agent"] ? req.headers["user-agent"] : null

  login(req.body.login, req.body.password, { userAgent })
    .then(({ token, user }) => {
      const filteredUser = filterUser(user)

      res
        .cookie("session", token, {
          httpOnly: true,
          maxAge: config.session.maxAge,
          signed: true,
          secure: config.https === "true"
        })
        .send(filteredUser)
    })
    .catch(err => error(err, res))
}
