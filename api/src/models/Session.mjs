import Sequelize from 'sequelize'
import sequelize from '../db.mjs'

class Session extends Sequelize.Model {}

Session.init({
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  userAgent: {
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  modelName: 'Session'
})

export default Session
