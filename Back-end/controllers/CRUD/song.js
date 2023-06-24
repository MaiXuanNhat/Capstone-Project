const { Op } = require('sequelize')

const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

const include = [
    {
        model: models.History,
    },
    {
        model: models.LikedSong,
    },
]

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            title: { [Op.like]: `%${params.txt_search}%` },
            artists: { [Op.like]: `%${params.txt_search}%` },
        }),
        release_date: {
            [Op.between]: [params.from_date, params.to_date],
        },
    })

    return models.Song.findAndCountAll({
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
        ],
        where: selection,
    })
}

async function showById(id, userId) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$History.user_id': userId,
            '$LikedSong.user_id': userId,
        }),
    })

    return models.Song.findByPk(id, {
        include: include,
        where: selection,
    })
}

async function showBySpotifyId(spotifyId, userId) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$History.user_id': userId,
            '$LikedSong.user_id': userId,
        }),
    })

    return models.Song.findOne({
        include: include,
        where: {
            spotify_id: spotifyId,
            ...selection,
        },
    })
}

module.exports = {
    getListSongs: index,
    getSongById: showById,
    getSongBySpotifyId: showBySpotifyId,
}
