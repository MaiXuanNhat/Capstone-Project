const models = require(process.cwd() + '/models/index')

const include = [
    {
        model: models.Song,
        required: true,
    },
]

async function indexByUserId(userId, startIndex, limit) {
    return models.History.findAll({
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
        ],
        where: { user_id: userId },
        include: include,
    })
}

async function showByUserIdAndSongId(userId, songId) {
    return models.History.findOne({
        include: include,
        where: {
            user_id: userId,
            song_id: songId,
        },
    })
}

async function create(newHistory) {
    return models.History.create(newHistory)
}

async function update(updateHistory, historyId) {
    return models.History.update(updateHistory, { where: { id: historyId } })
}

module.exports = {
    getListHistoriesByUserId: indexByUserId,
    getHistoryByUserIdAndSongId: showByUserIdAndSongId,
    addNewHistory: create,
    updateHistoryById: update,
}