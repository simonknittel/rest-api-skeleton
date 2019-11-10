import express from 'express'

// Middleware
import allowedMethods from '../../middleware/allowedMethods.mjs'
import authenticateMiddleware from '../../middleware/authenticate.mjs'
import isAllowedMiddleware from '../../middleware/isAllowed.mjs'

// Routes
import authenticatedRoute from './authenticated.mjs'
import loginRoute from './login.mjs'
import logoutRoute from './logout.mjs'
import signupRoute from './signup.mjs'
import verifyEmailRoute from './verifyEmail.mjs'
import requestPasswordResetRoute from './requestPasswordReset.mjs'
import setNewPasswordRoute from './setNewPassword.mjs'
import uploadAvatarGCSRoute from './uploadAvatarGCS.mjs'
import uploadAvatarCloudinaryRoute from './uploadAvatarCloudinary.mjs'
import robotsTxtRoute from './robots.txt.mjs'

const router = express.Router()

router.route('/').get((req, res) => res.end())

router.route('/authenticated').get(authenticateMiddleware, isAllowedMiddleware([2]), authenticatedRoute).all(allowedMethods(['GET']))
router.route('/login').post(loginRoute).all(allowedMethods(['POST']))
router.route('/logout').get(logoutRoute).all(allowedMethods(['GET']))
router.route('/signup').post(signupRoute).all(allowedMethods(['POST']))
router.route('/verify-email').get(verifyEmailRoute).all(allowedMethods(['GET']))
router.route('/request-password-reset').post(requestPasswordResetRoute).all(allowedMethods(['POST']))
router.route('/set-new-password').post(setNewPasswordRoute).all(allowedMethods(['POST']))

router.route('/upload/avatar-gcs').post(uploadAvatarGCSRoute).all(allowedMethods(['POST']))
router.route('/upload/avatar-cloudinary').post(uploadAvatarCloudinaryRoute).all(allowedMethods(['POST']))

// Some special routes
router.route('/robots.txt').get(robotsTxtRoute).all(allowedMethods(['GET']))

// Some routes for testing (TODO: Get rid of in production)
router.route('/admin-secured').get(authenticateMiddleware, isAllowedMiddleware([1]), (req, res) => { res.send('Admin secured.') }).all(allowedMethods(['GET']))

export default router
