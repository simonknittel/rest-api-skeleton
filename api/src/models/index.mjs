import User from './User.mjs'
import './Session.mjs'
import PasswordResetToken from './PasswordResetToken.mjs'
import VerifyEmailToken from './VerifyEmailToken.mjs'

PasswordResetToken.belongsTo(User)
VerifyEmailToken.belongsTo(User)
