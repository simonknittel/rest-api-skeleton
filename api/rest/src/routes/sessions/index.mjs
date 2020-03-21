import express from 'express'

// Middleware
import allowedMethods from '../../middleware/allowedMethods.mjs'
import authenticateMiddleware from '../../middleware/authenticate.mjs'
import isAllowedMiddleware from '../../middleware/isAllowed.mjs'

// Routes
import getRoute from './get.mjs'
import getAllRoute from './getAll.mjs'
import deleteRoute from './delete.mjs'

const router = express.Router()

router.route('/')
  .get(authenticateMiddleware, isAllowedMiddleware('route:sessions:getAll'), getAllRoute)
  .all(allowedMethods(['GET']))

router.route('/:id')
  .get(authenticateMiddleware, isAllowedMiddleware('route:sessions:get'), getRoute)
  .delete(authenticateMiddleware, isAllowedMiddleware('route:sessions:delete'), deleteRoute)
  .all(allowedMethods(['GET', 'DELETE']))

export default router
