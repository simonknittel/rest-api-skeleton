const missingConfig = [];

if (!process.env.DB_HOST) missingConfig.push("DB_HOST");
if (!process.env.DB_USER) missingConfig.push("DB_USER");
if (!process.env.DB_PASS) missingConfig.push("DB_PASS");
if (!process.env.DB_NAME) missingConfig.push("DB_NAME");

if (!process.env.SESSION_SECRET) missingConfig.push("SESSION_SECRET");

if (!process.env.MAILGUN_DOMAIN) missingConfig.push("MAILGUN_DOMAIN");
if (!process.env.MAILGUN_KEY) missingConfig.push("MAILGUN_KEY");
if (!process.env.MAILGUN_FROM) missingConfig.push("MAILGUN_FROM");

if (!process.env.PORT) missingConfig.push("PORT");
if (!process.env.CORS_ORIGIN) missingConfig.push("CORS_ORIGIN");
if (!process.env.VERIFY_EMAIL_ROUTE) missingConfig.push("VERIFY_EMAIL_ROUTE");
if (!process.env.SET_NEW_PASSWORD_ROUTE)
  missingConfig.push("SET_NEW_PASSWORD_ROUTE");

if (!process.env.ENGINE_API_KEY) missingConfig.push("ENGINE_API_KEY");

if (missingConfig.length > 0)
  throw Error("Config missing: " + missingConfig.join(", "));

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME
  },
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 365 days / 1 year
  },
  saltRounds: 11,
  resetPasswordTokenExpiration: 15 * 60 * 1000, // 15 minutes in miliseconds
  port: process.env.PORT,
  https: process.env.HTTPS || false,
  client: {
    cors: {
      origin: process.env.CORS_ORIGIN
    },
    verifyEmailRoute: process.env.VERIFY_EMAIL_ROUTE,
    setNewPasswordRoute: process.env.SET_NEW_PASSWORD_ROUTE
  },
  mailgun: {
    domain: process.env.MAILGUN_DOMAIN,
    key: process.env.MAILGUN_KEY,
    from: process.env.MAILGUN_FROM
  },
  apollo: {
    engineApiKey: process.env.ENGINE_API_KEY
  }
};

export default config;
