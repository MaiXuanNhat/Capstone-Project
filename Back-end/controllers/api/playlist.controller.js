const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const {
    getListPlaylistsByUserId,
    getPlaylistById,
    addNewPlaylist,
    updatePlaylistById,
    deletePlaylistById,
    checkTitleExisted
} = require('../CRUD/playlist')

async function indexByUserId(request, response) {
    try {
        const requestUserId = request.userData.userId
        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            from_date: request.query.from_date
                ? request.query.from_date.trim() + ' 00:00:00'
                : '0001-01-01 00:00:00',
            to_date: request.query.to_date
                ? request.query.to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
        }

        const queryResult = await getListPlaylistsByUserId(requestUserId, params)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const playlistId = request.params.id

        const dbPlaylist = await getPlaylistById(playlistId)

        if (dbPlaylist) {
            return response.status(200).json(dbPlaylist)
        } else {
            return response.status(404).json({
                message: 'Playlist not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        // Check if playlist existed
        const isTitleExisted = await checkTitleExisted(
            request.body.title,
        )
        if (isTitleExisted) {
            return response.status(400).json({
                message: 'This title is already exists!',
            })
        }

        const newPlaylist = {
            user_id: request.userData.userId,
            title: request.body.title,
            description: request.body.description
        }

        // Validate new vehicle's data
        const validateResponse = validators.validatePlaylist(newPlaylist)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        // Create new playlist
        addNewPlaylist(newPlaylist).then(async (result) => {
            // Create song associations
            const songsIds = request.body.song_ids
            if (
                songsIds &&
                Array.isArray(songsIds) &&
                songsIds.length > 0
            ) {
                await result.setSongs(songsIds)
            }

            return response.status(200).json({
                playlistId: result.id,
                message: 'Create playlist successfully!',
            })
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        const playlistId = request.params.id

        // Check if playlist exists
        const dbPlaylist = await getPlaylistById(playlistId)
        if (dbPlaylist) {
            const updatePlaylist = {
                title: request.body.title,
                description: request.body.description
            }

            // Validate update playlist's data
            const validateResponse = validators.validatePlaylist(updatePlaylist)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update playlist's data
            await updatePlaylistById(updatePlaylist, dbPlaylist.id)

            // Update song associations
            const songIds = request.body.song_ids
            if (songIds && Array.isArray(songIds) && songIds.length > 0) {
                await dbPlaylist.setSongs(songIds)
            }

            return response.status(200).json({
                message: 'Update playlist successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Playlist not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function deleteById(request, response) {
    try {
        const playlistId = request.params.id

        // Check if vehicle exists
        const dbPlaylist = await getPlaylistById(playlistId)
        if (dbPlaylist) {
            // Delete all playlist's associations
            await dbPlaylist.setSongs([])

            // Delete playlist
            await deletePlaylistById(dbPlaylist.id)

            return response.status(200).json({
                message: 'Delete playlist successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Playlist not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    indexByUserId: indexByUserId,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}