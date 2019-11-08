import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'

// Router
import globalRouter from './routes/global/index.mjs'
import usersRouter from './routes/users/index.mjs'

// Models
import './models/index.mjs'

import config from './config.mjs'
import sequelize from './db.mjs'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// TODO: Maybe replace with individual dependencies
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"]
    }
  },
  referrerPolicy: {
    policy: 'same-origin'
  },
  noCache: {}
}))

app.use(compression())

// Global routes
app.use('/', globalRouter)
app.use('/users', usersRouter)

// Start server
sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log('Server is running.')
  })
})
