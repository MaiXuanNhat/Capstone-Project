const { checkUserOwnPlaylist } = require('../controllers/CRUD/playlist')

async function checkAccountOwner(request, response, next) {
    try {
        const userId = request.params.id
        const requestUserId = request.userData.userId

        if (requestUserId != userId) {
            return response.status(400).json({
                message: 'You are not the owner of this account!',
            })
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkPlaylistOwner(request, response, next) {
    try {
        const playlistId = request.params.id
        const requestUserId = request.userData.userId

        const isUserOwnPlaylist = await checkUserOwnPlaylist(playlistId, requestUserId)

        if (!isUserOwnPlaylist) {
            return response.status(400).json({
                message: 'User is not the owner of this playlist or playlist not exists!',
            })
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    checkAccountOwner: checkAccountOwner,
    checkPlaylistOwner: checkPlaylistOwner,
}
