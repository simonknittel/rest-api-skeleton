import User from './User.mjs'
import './Session.mjs'
import VerifyEmailToken from './VerifyEmailToken.mjs'

VerifyEmailToken.belongsTo(User)
