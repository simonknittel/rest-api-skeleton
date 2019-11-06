import Sequelize from 'sequelize'
import sequelize from '../db.mjs'

class PasswordResetToken extends Sequelize.Model {}

PasswordResetToken.init({
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'PasswordResetToken',
})

export default PasswordResetToken
