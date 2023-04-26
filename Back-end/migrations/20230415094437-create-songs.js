'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      song_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      album_id: {
        type: Sequelize.INTEGER
      },
      duration_ms: {
        type: Sequelize.INTEGER
      },
      acousticness: {
        type: Sequelize.FLOAT
      },
      danceability: {
        type: Sequelize.FLOAT
      },
      energy: {
        type: Sequelize.FLOAT
      },
      instrumentalness: {
        type: Sequelize.FLOAT
      },
      liveness: {
        type: Sequelize.FLOAT
      },
      loudness: {
        type: Sequelize.FLOAT
      },
      speechiness: {
        type: Sequelize.FLOAT
      },
      tempo: {
        type: Sequelize.FLOAT
      },
      valence: {
        type: Sequelize.FLOAT
      },
      popularity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};