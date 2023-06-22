'use strict';
const {
  Model
} = require('sequelize');
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.UserInfo, { foreignKey: 'user_id' })
      Users.hasMany(models.Playlists, { foreignKey: 'user_id' })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.TINYINT,
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
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};