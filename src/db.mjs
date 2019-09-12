import Sequelize from 'sequelize'
import config from './config'

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    dialect: 'postgres'
  }
)

export default sequelize;
