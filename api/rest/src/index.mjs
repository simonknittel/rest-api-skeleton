import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Router
import globalRouter from './routes/global/index.mjs'
import usersRouter from './routes/users/index.mjs'
import sessionsRouter from './routes/sessions/index.mjs'
import userTokensRouter from './routes/userTokens/index.mjs'

// Models
import '../../shared/models/index.mjs'

import config from '../../shared/config.mjs'
import sequelize from '../../shared/db.mjs'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(config.session.secret))

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

app.use(cors({
  origin: config.client.cors.origin,
  credentials: true,
}))

app.use(compression())

// Global routes
app.use('/', globalRouter)
app.use('/users', usersRouter)
app.use('/sessions', sessionsRouter)
app.use('/user-tokens', userTokensRouter)

// Start server
sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log('REST API is running.')
  })
})
