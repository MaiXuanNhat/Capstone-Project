'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class LikedSong extends Model {
        static associate(models) {
            LikedSong.belongsTo(models.User, { foreignKey: 'user_id' })
            LikedSong.belongsTo(models.Song, { foreignKey: 'song_id' })
        }
    }
    LikedSong.init(
        {
            user_id: DataTypes.INTEGER,
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
            modelName: 'LikedSong',
        },
    )
    return LikedSong
}
