'use strict';
const {
  Model
} = require('sequelize');
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
  class SongsPlaylists extends Model {
    static associate(models) {
      SongsPlaylists.belongsTo(models.Playlists, { foreignKey: 'playlist_id' })
    }
  }
  SongsPlaylists.init({
    playlist_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER,
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
    modelName: 'PlaylistSong',
  });
  return SongsPlaylists;
};