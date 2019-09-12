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
  saltRounds: 11,
  twitter: {
    consumerKey: process.env.TW_CONSUMER_KEY,
    consumerSecret: process.env.TW_CONSUMER_SECRET,
    accessToken: process.env.TW_ACCESS_TOKEN,
    accessTokenSecret: process.env.TW_ACCESS_TOKEN_SECRET
  },
  facebook: {
    appId: process.env.FB_APP_ID,
    appSecret: process.env.FB_APP_SECRET
  }
}

export default config
