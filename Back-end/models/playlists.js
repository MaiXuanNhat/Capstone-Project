'use strict';
const {
  Model
} = require('sequelize');
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
  class Playlists extends Model {
    static associate(models) {
      Playlists.belongsTo(models.User, { foreignKey: 'user_id' })
      Playlists.hasMany(models.Songs, { through: 'SongsPlaylists' })
    }
  }
  Playlists.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    descripsion: DataTypes.STRING,
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
    modelName: 'Playlists',
  });
  return Playlists;
};