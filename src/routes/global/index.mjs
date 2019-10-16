import express from 'express'

// Middleware
import allowedMethods from '../../middleware/allowedMethods'
import authenticateMiddleware from '../../middleware/authenticate'
import checkPermissionsMiddleware from '../../middleware/checkPermissions'

// Routes
import loginRoute from './login'
import logoutRoute from './logout'
import registerRoute from './register'
import robotsTxtRoute from './robots.txt';

const generalRouter = express.Router()

generalRouter.route('/login').post(loginRoute).all(allowedMethods(['POST']))
generalRouter.route('/logout').get(logoutRoute).all(allowedMethods(['GET']))
generalRouter.route('/register').post(authenticateMiddleware, checkPermissionsMiddleware([1]), registerRoute).all(allowedMethods(['POST']))

// Some special routes
generalRouter.route('/robots.txt').get(robotsTxtRoute).all(allowedMethods(['GET']))

// Some routes for testing (TODO: Get rid of in production)
generalRouter.route('/user-secured').get(authenticateMiddleware, checkPermissionsMiddleware([2]), (req, res) => { res.send('User secured.') }).all(allowedMethods(['GET']))
generalRouter.route('/admin-secured').get(authenticateMiddleware, checkPermissionsMiddleware([1]), (req, res) => { res.send('Admin secured.') }).all(allowedMethods(['GET']))

export default generalRouter
