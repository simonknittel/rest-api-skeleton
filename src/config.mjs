const missingConfig = [];

if (!process.env.DB_HOST) missingConfig.push('DB_HOST')
if (!process.env.DB_USER) missingConfig.push('DB_USER')
if (!process.env.DB_PASS) missingConfig.push('DB_PASS')
if (!process.env.DB_NAME) missingConfig.push('DB_NAME')

if (!process.env.JWT_SECRET) missingConfig.push('JWT_SECRET')

if (missingConfig.length > 0) throw Error('Config missing: ' + missingConfig.join(', '))

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  saltRounds: 11
}

export default config
