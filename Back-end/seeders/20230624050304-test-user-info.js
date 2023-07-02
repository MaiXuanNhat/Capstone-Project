'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'UserInfos',
            [
                {
                    user_id: 1,
                    avatar: 'public/images/avatars/default-avatar.png',
                    gender: 0,
                    birthday: '2001/10/16',
                    address: 'Da Nang, Viet Nam',
                    phone_number: '0354374322',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserInfos', null, {})
    },
}
