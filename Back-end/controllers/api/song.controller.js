const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const {
    getListSongs,
    getSongById,
    getSongBySpotifyId
} = require('../CRUD/song')

async function index(request, response) {
    try {
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)

        if (
            Number.isNaN(page) ||
            page < 1 ||
            Number.isNaN(limit) ||
            limit < 0
        ) {
            return response.status(400).json({
                message: 'Invalid query parameters!',
            })
        }

        const startIndex = (page - 1) * limit
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

        const queryResult = await getListSongs(
            startIndex,
            limit,
            params,
        )

        return response.status(200).json(queryResult)
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const requestUserId = request.userData.userId
        const songId = request.params.id

        const dbSong = await getSongById(songId, requestUserId)

        if (dbSong) {
            return response.status(200).json(dbSong)
        } else {
            return response.status(404).json({
                message: 'Song not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showBySpotifyId(request, response) {
    try {
        const requestUserId = request.userData.userId
        const spotifyId = request.params.spotifyId

        const dbSong = await getSongBySpotifyId(spotifyId, requestUserId)

        if (dbSong) {
            return response.status(200).json(dbSong)
        } else {
            return response.status(404).json({
                message: 'Song not found!',
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
    index: index,
    showById: showById,
    showBySpotifyId: showBySpotifyId,
}