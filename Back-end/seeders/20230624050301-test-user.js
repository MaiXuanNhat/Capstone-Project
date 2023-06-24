'use strict'

const hash_helper = require('../helpers/password-encrypter/hash_helper')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // await queryInterface.bulkInsert(
        //     'Users',
        //     [
        //         {
        //             name: 'Xuan Nhat',
        //             email: 'maixuannhatqbi01@gmail.com',
        //             password: hash_helper.hash('12345678'),
        //             is_verified: true,
        //         },
        //     ],
        //     {},
        // )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {})
    },
}
