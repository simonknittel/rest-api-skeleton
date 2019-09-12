import express from 'express'
import helmet from 'helmet'
import compression from 'compression'

// Router
import generalRouter from './routes/general'
import rssRouter from './routes/rss'
import twitterRouter from './routes/twitter'
import facebookRouter from './routes/facebook'

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

// General routes
app.use('/', generalRouter)
app.use('/rss', rssRouter)
app.use('/twitter', twitterRouter)
app.use('/facebook', facebookRouter)

// Start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running.')
  })
})
