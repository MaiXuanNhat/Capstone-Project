const models = require(process.cwd() + '/models/index')

const include = [
    {
        model: models.Song,
        required: true,
    },
]

async function indexByUserId(userId, startIndex, limit) {
    return models.Song.findAndCountAll({
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
        ],
        where: { user_id: userId },
        include: include,
    })
}

module.exports = {
    getListHistoriesByUserId: indexByUserId,
}