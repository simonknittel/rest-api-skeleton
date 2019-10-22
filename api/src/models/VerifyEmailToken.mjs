import Sequelize from 'sequelize'
import sequelize from '../db.mjs'

class VerifyEmailToken extends Sequelize.Model {}

VerifyEmailToken.init({
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'verifyEmailToken',
})

export default VerifyEmailToken
