'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlists extends Model {
    static associate(models) {
      Playlists.belongsTo(models.User, { foreignKey: 'user_id' })
      Playlists.hasMany(models.Songs, {through: 'SongsPlaylists'})
    }
  }
  Playlists.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    descripsion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlists',
  });
  return Playlists;
};