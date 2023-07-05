const auth = require('./auth.route')
const upload = require('./upload.route')
const user = require('./user.route')
const song = require('./song.route')
const playlist = require('./playlist.route')
const history = require('./history.route')

module.exports = {
    auth: auth,
    upload: upload,
    user: user,
    song: song,
    playlist: playlist,
    history: history,
}
