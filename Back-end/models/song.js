'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class Song extends Model {
        static associate(models) {
            Song.belongsToMany(models.Playlist, { through: 'PlaylistSong', foreignKey: 'song_id' })
            Song.hasMany(models.LikedSong, { foreignKey: 'song_id' })
            Song.hasMany(models.History, { foreignKey: 'song_id' })
        }
    }
    Song.init(
        {
            spotify_id: DataTypes.STRING,
            title: DataTypes.STRING,
            audio_url: DataTypes.STRING,
            artists: DataTypes.TEXT,
            duration: DataTypes.INTEGER,
            release_date: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('release_date')) {
                        return toLocaleString(this.getDataValue('release_date'))
                    }
                    return null
                },
            },
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
            modelName: 'Song',
        },
    )
    return Song
}
