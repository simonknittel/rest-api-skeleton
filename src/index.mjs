import express from 'express'
import helmet from 'helmet'
import compression from 'compression'

// Router
import globalRouter from './routes/global'

// Models
import './models'

import sequelize from './db'

const app = express()

app.use(express.urlencoded({ extended: true }))

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

// Start server
sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log('Server is running.')
  })
})
