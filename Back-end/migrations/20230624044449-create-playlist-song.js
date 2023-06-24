'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PlaylistSongs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            playlist_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Playlists',
                    key: 'id',
                    onDelete: 'CASCADE',
                },
            },
            song_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Songs',
                    key: 'id',
                    onDelete: 'CASCADE',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PlaylistSongs')
    },
}
