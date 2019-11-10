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
  .get(authenticateMiddleware, isAllowedMiddleware([1]), getAllRoute)
  .all(allowedMethods(['GET']))

router.route('/:id')
  .get(authenticateMiddleware, isAllowedMiddleware([1]), getRoute)
  .delete(authenticateMiddleware, isAllowedMiddleware([1]), deleteRoute)
  .all(allowedMethods(['GET', 'DELETE']))

export default router
