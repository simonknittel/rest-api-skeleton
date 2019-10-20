const missingConfig = []

if (!process.env.DB_HOST) missingConfig.push('DB_HOST')
if (!process.env.DB_USER) missingConfig.push('DB_USER')
if (!process.env.DB_PASS) missingConfig.push('DB_PASS')
if (!process.env.DB_NAME) missingConfig.push('DB_NAME')

if (!process.env.JWT_SECRET) missingConfig.push('JWT_SECRET')

if (!process.env.MAILGUN_DOMAIN) missingConfig.push('MAILGUN_DOMAIN')
if (!process.env.MAILGUN_KEY) missingConfig.push('MAILGUN_KEY')
if (!process.env.MAILGUN_FROM) missingConfig.push('MAILGUN_FROM')

if (!process.env.PORT) missingConfig.push('PORT')
if (!process.env.VERIFY_EMAIL_ROUTE) missingConfig.push('VERIFY_EMAIL_ROUTE')

if (missingConfig.length > 0) throw Error('Config missing: ' + missingConfig.join(', '))

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  saltRounds: 11,
  port: process.env.PORT,
  host: process.env.HOST,
  verifyEmailRoute: process.env.VERIFY_EMAIL_ROUTE,
  mailgun: {
    domain: process.env.MAILGUN_DOMAIN,
    key: process.env.MAILGUN_KEY,
    from: process.env.MAILGUN_FROM,
  },
}

export default config
