import express from 'express'

// Middleware
import allowedMethods from '../../middleware/allowedMethods.mjs'
import authenticateMiddleware from '../../middleware/authenticate.mjs'
import checkPermissionsMiddleware from '../../middleware/checkPermissions.mjs'

// Routes
import loginRoute from './login.mjs'
import logoutRoute from './logout.mjs'
import registerRoute from './register.mjs'
import verifyEmailRoute from './verify-email.mjs'
import requestPasswordResetRoute from './request-password-reset.mjs'
import setNewPasswordRoute from './set-new-password.mjs'
import robotsTxtRoute from './robots.txt.mjs'
import uploadAvatarGCSRoute from './upload-avatar-gcs.mjs'
import uploadAvatarCloudinaryRoute from './upload-avatar-cloudinary.mjs'

const generalRouter = express.Router()

generalRouter.route('/').get((req, res) => res.end())

generalRouter.route('/login').post(loginRoute).all(allowedMethods(['POST']))
generalRouter.route('/logout').get(logoutRoute).all(allowedMethods(['GET']))
generalRouter.route('/register').post(registerRoute).all(allowedMethods(['POST']))
generalRouter.route('/verify-email').get(verifyEmailRoute).all(allowedMethods(['GET']))
generalRouter.route('/request-password-reset').post(requestPasswordResetRoute).all(allowedMethods(['POST']))
generalRouter.route('/set-new-password').post(setNewPasswordRoute).all(allowedMethods(['POST']))

generalRouter.route('/upload/avatar-gcs').post(uploadAvatarGCSRoute).all(allowedMethods(['POST']))
generalRouter.route('/upload/avatar-cloudinary').post(uploadAvatarCloudinaryRoute).all(allowedMethods(['POST']))

// Some special routes
generalRouter.route('/robots.txt').get(robotsTxtRoute).all(allowedMethods(['GET']))

// Some routes for testing (TODO: Get rid of in production)
generalRouter.route('/user-secured').get(authenticateMiddleware, checkPermissionsMiddleware([2]), (req, res) => { res.send('User secured.') }).all(allowedMethods(['GET']))
generalRouter.route('/admin-secured').get(authenticateMiddleware, checkPermissionsMiddleware([1]), (req, res) => { res.send('Admin secured.') }).all(allowedMethods(['GET']))

export default generalRouter
