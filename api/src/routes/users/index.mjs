import express from 'express'

// Middleware
import allowedMethods from '../../middleware/allowedMethods.mjs'
import authenticateMiddleware from '../../middleware/authenticate.mjs'
import checkPermissionsMiddleware from '../../middleware/checkPermissions.mjs'

// Routes
import getRoute from './get.mjs'
import getAllRoute from './getAll.mjs'
import postRoute from './post.mjs'
import putRoute from './put.mjs'
import deleteRoute from './delete.mjs'

const usersRouter = express.Router()

usersRouter.route('/')
  .get(getAllRoute)
  .post(authenticateMiddleware, checkPermissionsMiddleware([1]), postRoute)
  .all(allowedMethods(['GET', 'POST', ]))

usersRouter.route('/:id')
  .get(getRoute)
  .put(authenticateMiddleware, putRoute)
  .delete(authenticateMiddleware, checkPermissionsMiddleware([1]), deleteRoute)
  .all(allowedMethods(['GET', 'PUT', 'DELETE']))

export default usersRouter
