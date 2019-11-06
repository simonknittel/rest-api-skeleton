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
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
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

/**
 * Ranks
 * 0: default (no permissions)
 * 1: admin (all permissions)
 * 2: user (standard permissions)
 */
