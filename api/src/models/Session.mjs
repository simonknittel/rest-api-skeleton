import Sequelize from 'sequelize'
import sequelize from '../db.mjs'

class Session extends Sequelize.Model {}

Session.init({
  token: {
    type: Sequelize.STRING(256),
    allowNull: false,
    unique: true,
  },
  userAgent: {
    type: Sequelize.STRING,
  },
  lastSeen: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  sequelize,
  modelName: 'session'
})

export default Session
