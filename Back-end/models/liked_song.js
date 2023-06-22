'use strict';
const {
  Model
} = require('sequelize');
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
  class LikedSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LikedSong.init({
    user_id: DataTypes.INTEGER,
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
    modelName: 'LikedSong',
  });
  return LikedSong;
};