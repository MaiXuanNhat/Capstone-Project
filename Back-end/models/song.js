'use strict'
const { Model } = require('sequelize')
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
            artists: DataTypes.TEXT,
            duration: DataTypes.INTEGER,
            release_date: DataTypes.DATE,
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
