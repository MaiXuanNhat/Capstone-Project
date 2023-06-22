'use strict';
const {
  Model
} = require('sequelize');
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
    }
  }
  History.init({
    user_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
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
    modelName: 'History',
  });
  return History;
};