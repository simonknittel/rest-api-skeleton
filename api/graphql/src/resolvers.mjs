import signup from "../../shared/methods/signup.mjs"
import setNewPassword from "../../shared/methods/setNewPassword.mjs"
import requestPasswordReset from "../../shared/methods/requestPasswordReset.mjs"
import verifyEmail from "../../shared/methods/verifyEmail.mjs"
import login from "../../shared/methods/login.mjs"

import { filterUser } from "../../shared/filters.mjs"
import errorBasics from "../../shared/errorBasics.mjs"

import config from "../../shared/config.mjs"

// Models
import User from "../../shared/models/User.mjs"
import Session from "../../shared/models/Session.mjs"

function catchHandler(err, resolve) {
  const error = errorBasics(err)
  resolve({
    code: error.status,
    success: false,
    message: `${error.id}: ${error.msg}`,
  })
}

export default {
  Query: {
    user: (_, { id }) => {
      return new Promise((resolve) => {
        User.findOne({ where: { id } })
          .then((item) => {
            resolve(filterUser(item))
          })
          .catch((err) => catchHandler({ id: 39, data: err }, resolve))
      })
    },
  },
  Mutation: {
    signup: (_, { email, password }) => {
      return new Promise((resolve) => {
        signup(email, password)
          .then((createdUser) => {
            resolve({
              code: 200,
              success: true,
              message: "",
              user: createdUser,
            })
          })
          .catch((err) => catchHandler(err, resolve))
      })
    },
    verifyEmail: (_, { token, password }) => {
      return new Promise((resolve) => {
        setNewPassword(token, password)
          .then(() => resolve({ code: 200, success: true, message: "" }))
          .catch((err) => catchHandler(err, resolve))
      })
    },
    requestPasswordReset: (_, { email }) => {
      return new Promise((resolve) => {
        requestPasswordReset(email)
          .then(() => resolve({ code: 200, success: true, message: "" }))
          .catch((err) => catchHandler(err, resolve))
      })
    },
    verifyEmail: (_, { token }) => {
      return new Promise((resolve) => {
        verifyEmail(token)
          .then(() => resolve({ code: 200, success: true, message: "" }))
          .catch((err) => catchHandler(err, resolve))
      })
    },
    login: (_, { email, password }, { req, res }) => {
      return new Promise((resolve) => {
        const userAgent = req.headers["user-agent"]
          ? req.headers["user-agent"]
          : null

        login(email, password, { userAgent })
          .then(({ token, user }) => {
            res.cookie("session", token, {
              httpOnly: true,
              maxAge: config.session.maxAge,
              signed: true,
              secure: config.https === "true",
            })

            resolve({
              code: 200,
              success: true,
              message: "",
              user: filterUser(user),
              session: token,
            })
          })
          .catch((err) => catchHandler(err, resolve))
      })
    },
    logout: (_, {}, { req, res }) => {
      return new Promise((resolve) => {
        /**
         * BUG: cookie-parser tries to automatically convert the value of the
         * cookie into e.g. an real JavaScript object which leads to issues
         * during searching for the cookie in the database
         */
        const token = req.signedCookies.session

        // No token found -> Nothing to log out
        if (!token) {
          resolve({ code: 200, success: true, message: "" })
          return
        }

        Session.destroy({ where: { token } })
          .then(() => {
            res.clearCookie("session")
            resolve({ code: 200, success: true, message: "" })
          })
          .catch((err) => catchHandler({ id: 6, data: err }, resolve))
      })
    },
  },
}
