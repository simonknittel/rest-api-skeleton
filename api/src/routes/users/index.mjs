import express from 'express'

// Middleware
import allowedMethods from '../../middleware/allowedMethods.mjs'
import authenticateMiddleware from '../../middleware/authenticate.mjs'
import isAllowedMiddleware from '../../middleware/isAllowed.mjs'

// Routes
import getRoute from './get.mjs'
import getAllRoute from './getAll.mjs'
import postRoute from './post.mjs'
import putRoute from './put.mjs'
import deleteRoute from './delete.mjs'

const router = express.Router()

router.route('/')
  .get(getAllRoute)
  .post(authenticateMiddleware, isAllowedMiddleware([1]), postRoute)
  .all(allowedMethods(['GET', 'POST', ]))

router.route('/:id')
  .get(getRoute)
  .put(authenticateMiddleware, putRoute)
  .delete(authenticateMiddleware, isAllowedMiddleware([1]), deleteRoute)
  .all(allowedMethods(['GET', 'PUT', 'DELETE']))

export default router
