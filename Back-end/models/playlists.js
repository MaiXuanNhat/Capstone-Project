'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        static associate(models) {
            Playlist.belongsTo(models.User, { foreignKey: 'user_id' })
            Playlist.belongsToMany(models.Song, { through: 'PlaylistSong', foreignKey: 'playlist_id' })
        }
    }
    Playlist.init(
        {
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('createdAt')) {
                        return toLocaleString(this.getDataValue('createdAt'))
                    }
                    return null
                },
            },
            updatedAt: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('updatedAt')) {
                        return toLocaleString(this.getDataValue('updatedAt'))
                    }
                    return null
                },
            },
        },
        {
            sequelize,
            modelName: 'Playlist',
        },
    )
    return Playlist
}
