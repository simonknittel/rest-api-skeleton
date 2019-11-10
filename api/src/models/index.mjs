import User from './User.mjs'
import './Session.mjs'
import UserToken from './UserToken.mjs'

UserToken.belongsTo(User)
