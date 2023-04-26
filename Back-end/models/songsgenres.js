'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongsGenres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SongsGenres.init({
    song_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER,
    descripsion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SongsGenres',
  });
  return SongsGenres;
};