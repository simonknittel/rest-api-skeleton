import Sequelize from 'sequelize'
import config from './config.mjs'

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    dialect: 'postgres'
  }
)

export default sequelize
