'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongsPlaylists extends Model {
    static associate(models) {
      SongsPlaylists.belongsTo(models.Songs, { foreignKey: 'song_id' })
      SongsPlaylists.belongsTo(models.Playlists, { foreignKey: 'playlist_id' })
    }
  }
  SongsPlaylists.init({
    song_id: DataTypes.INTEGER,
    playlist_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SongsPlaylists',
  });
  return SongsPlaylists;
};