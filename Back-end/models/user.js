'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.UserInfo, { foreignKey: 'user_id' })
            User.hasMany(models.Playlist, { foreignKey: 'user_id' })
            User.hasMany(models.LikedSong, { foreignKey: 'user_id' })
            User.hasMany(models.History, { foreignKey: 'user_id' })
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            is_verified: DataTypes.BOOLEAN,
            deletedAt: DataTypes.DATE,
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
            modelName: 'User',
        },
    )
    return User
}
