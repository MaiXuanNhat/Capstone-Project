'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genres extends Model {
    static associate(models) {
      Genres.hasMany(models.Songs, {through: 'SongsGenres'})
    }
  }
  Genres.init({
    title: DataTypes.STRING,
    descripsion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genres',
  });
  return Genres;
};