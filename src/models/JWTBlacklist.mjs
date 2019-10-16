import Sequelize from 'sequelize'
import sequelize from '../db'

class JWTBlacklist extends Sequelize.Model {}

JWTBlacklist.init({
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'jwtBlacklist'
})

export default JWTBlacklist
