import Sequelize from 'sequelize'
import sequelize from '../db'

class JWT extends Sequelize.Model {}

JWT.init({
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'JWT'
})

export default JWT
