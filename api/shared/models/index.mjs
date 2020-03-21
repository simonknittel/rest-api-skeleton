import User from './User.mjs'
import Session from './Session.mjs'
import UserToken from './UserToken.mjs'

Session.belongsTo(User)
UserToken.belongsTo(User)
