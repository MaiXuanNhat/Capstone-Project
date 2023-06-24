'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class PlaylistSong extends Model {
        static associate(models) {
            PlaylistSong.belongsTo(models.Playlist, {
                foreignKey: 'playlist_id',
            })
            PlaylistSong.belongsTo(models.Song, {
                foreignKey: 'song_id',
            })
        }
    }
    PlaylistSong.init(
        {
            playlist_id: DataTypes.INTEGER,
            song_id: DataTypes.INTEGER,
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
            modelName: 'PlaylistSong',
        },
    )
    return PlaylistSong
}
