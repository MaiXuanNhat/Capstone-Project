const { Op } = require('sequelize')

const models = require(process.cwd() + '/models/index')

const include = [
    {
        model: models.User,
        attributes: { exclude: ['password', 'updatedAt'] },
        required: true,
    },
    {
        model: models.Song,
        order: [['id', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
]

async function indexByUserId(userId, params) {
    return models.Playlist.findAndCountAll({
        include: include,
        order: [
            ['id', 'DESC'],
        ],
        where: {
            user_id: userId,
            title: { [Op.like]: `%${params.txt_search}%` },
        },
    })
}

async function showById(playlistId) {
    return models.Playlist.findByPk(playlistId, {
        include: include,
    })
}

async function create(newVehicle) {
    return models.Playlist.create(newVehicle)
}

async function update(updatePlaylist, playlistId) {
    return models.Playlist.update(updatePlaylist, { where: { id: playlistId } })
}

async function destroy(playlistId) {
    return models.Playlist.destroy({ where: { id: playlistId } })
}

async function checkTitle(title) {
    return !!(await models.Playlist.findOne({
        where: { title: title },
    }))
}

async function checkOwner(playlistId, userId) {
    return !!(await models.Playlist.findOne({
        where: { id: playlistId, user_id: userId },
    }))
}

module.exports = {
    getListPLaylistsByUserId: indexByUserId,
    getPlaylistById: showById,
    addNewPlaylist: create,
    updatePlaylistById: update,
    deletePlaylistById: destroy,
    checkTitleExisted: checkTitle,
    checkUserOwnPlaylist: checkOwner,
}