import Sequelize from 'sequelize'
import sequelize from '../db.mjs'

class User extends Sequelize.Model {}

User.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  permissionRole: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  whitelistedPermissions: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  blacklistedPermissions: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'user',
})

export default User
