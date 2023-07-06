const FastestValidator = require('fastest-validator')
const validator = new FastestValidator()

// Schemas
const schemas = require('./schemas')

// Validate functions
const validateUser = (user) => validator.validate(user, schemas.userSchema)
const validateUserInfo = (userInfo) =>
    validator.validate(userInfo, schemas.userInfoSchema)
const validatePlaylist = (playlist) =>
    validator.validate(playlist, schemas.playlistSchema)
const validateHistory = (history) =>
    validator.validate(history, schemas.historySchema)

module.exports = {
    validateUser: validateUser,
    validateUserInfo: validateUserInfo,
    validatePlaylist: validatePlaylist,
    validateHistory: validateHistory,
}
