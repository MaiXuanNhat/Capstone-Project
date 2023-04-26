'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs extends Model {
    static associate(models) {
      Songs.belongsToMany(models.Playlists, {through: 'SongsPlaylists'})
      Songs.belongsToMany(models.Albums, {foreignKey: 'song_id'})
      Songs.belongsToMany(models.Artists, {through: 'SongsArtists'})
      Songs.belongsToMany(models.Genres, {through: 'SongsGenres'})
    }
  }
  Songs.init({
    song_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    duration_ms: DataTypes.INTEGER,
    acousticness: DataTypes.FLOAT,
    danceability: DataTypes.FLOAT,
    energy: DataTypes.FLOAT,
    instrumentalness: DataTypes.FLOAT,
    liveness: DataTypes.FLOAT,
    loudness: DataTypes.FLOAT,
    speechiness: DataTypes.FLOAT,
    tempo: DataTypes.FLOAT,
    valence: DataTypes.FLOAT,
    popularity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Songs',
  });
  return Songs;
};