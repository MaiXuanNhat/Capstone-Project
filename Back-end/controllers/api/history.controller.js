const validators = require(process.cwd() + '/helpers/validators')

const {
    getListHistoriesByUserId,
    getHistoryByUserIdAndSongId,
    addNewHistory,
    updateHistoryById,
} = require('../CRUD/history')

async function indexByUserId(request, response) {
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

        const requestUserId = request.userData.userId

        const queryResult = await getListHistoriesByUserId(requestUserId, startIndex, limit)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        const requestUserId = request.userData.userId
        const songId = request.body.songId
        const duration = request.body.duration

        // Check if history existed
        const dbHistory = await getHistoryByUserIdAndSongId(
            requestUserId,
            songId
        )
        if (dbHistory) {
            const updateHistory = {
                duration: duration
            }

            // Validate history's data
            const validateResponse = validators.validateHistory(updateHistory)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update history's data
            await updateHistoryById(updateHistory, dbHistory.id)

            return response.status(200).json({
                message: 'Update history successfully!',
            })
        } else {
            const newHistory = {
                user_id: requestUserId,
                song_id: songId,
                duration: duration,
            }

            // Validate new history's data
            const validateResponse = validators.validateHistory(newHistory)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Create new playlist
            addNewHistory(newHistory).then(async (result) => {
                return response.status(200).json({
                    historyId: result.id,
                    message: 'Create history successfully!',
                })
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
    create: create,
}