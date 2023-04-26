'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artists extends Model {
    static associate(models) {
      Artists.belongsToMany(models.Albums, {foreignKey: 'artist_id'})
      Artists.hasMany(models.Songs, {through: 'SongsArtitsts'} )
    }
  }
  Artists.init({
    artist_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artists',
  });
  return Artists;
};