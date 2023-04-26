'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.UserInfo, {foreignKey: 'user_id' })
      Users.hasMany(models.Playlists, { foreignKey: 'user_id' })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.TINYINT,
    is_verified: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};