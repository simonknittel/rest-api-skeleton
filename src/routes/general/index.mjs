import express from 'express'

// Middleware
import allowedMethods from '../../middleware/allowedMethods'
import authenticate from '../../middleware/authenticate'
import checkPermissions from '../../middleware/checkPermissions'

// Routes
import loginRoute from './login'
import logoutRoute from './logout'
import registerRoute from './register'
import robotsTxtRoute from './robots.txt';

const generalRouter = express.Router()

generalRouter.route('/login').post(loginRoute).all(allowedMethods(['POST']))
generalRouter.route('/logout').get(logoutRoute).all(allowedMethods(['GET']))
generalRouter.route('/register').post(authenticate, checkPermissions([1]), registerRoute).all(allowedMethods(['POST']))

// Some special routes
generalRouter.route('/robots.txt').get(robotsTxtRoute).all(allowedMethods(['GET']))

// Some routes for testing
generalRouter.route('/user-secured').get(authenticate, checkPermissions([2]), (req, res) => { res.send('User secured.') }).all(allowedMethods(['GET']))
generalRouter.route('/admin-secured').get(authenticate, checkPermissions([1]), (req, res) => { res.send('Admin secured.') }).all(allowedMethods(['GET']))

export default generalRouter
