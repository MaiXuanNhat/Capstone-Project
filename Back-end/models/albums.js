'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Albums extends Model {    
    static associate(models) {
      Albums.hasMany(models.Songs, {foreignKey: 'song_id'})
      Albums.hasMany(models.Artists, {foreignKey: 'artist_id'})
    }
  }
  Albums.init({
    artist_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    released_time: DataTypes.DATE,
    descripsion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Albums',
  });
  return Albums;
};