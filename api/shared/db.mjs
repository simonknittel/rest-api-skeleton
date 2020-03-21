import Sequelize from 'sequelize'
import config from './config.mjs'

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    dialect: 'postgres',
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_unicode_ci'
      },
    },
  },
)

export default sequelize
