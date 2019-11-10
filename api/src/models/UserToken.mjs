import Sequelize from 'sequelize'
import sequelize from '../db.mjs'

class UserToken extends Sequelize.Model {}

UserToken.init({
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UserToken',
})

export default UserToken
