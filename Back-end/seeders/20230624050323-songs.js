'use strict'

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const filterHeaders = [
            'id',
            'name',
            'artists',
            'duration_ms',
            'release_date',
        ]
        const filePath = 'seeders/songs_data.csv'

        try {
            const data = await readFileAsync(filePath)
            const rows = data.split('\n')
            const headers = rows[0].split(',')
            const allSongs = []
            const pattern = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/g

            for (let i = 1; i < rows.length - 1; i++) {
                const row = rows[i].split(pattern)

                const song = {}
                for (let j = 0; j < filterHeaders.length; j++) {
                    const headerIndex = headers.indexOf(filterHeaders[j])
                    song[filterHeaders[j]] = row[headerIndex]
                }

                allSongs.push({
                    spotify_id: song.id,
                    title: song.name,
                    artists: song.artists,
                    duration: parseInt(song.duration_ms),
                    release_date: new Date(song.release_date),
                })
            }

            await queryInterface.bulkInsert('Songs', allSongs, {})
        } catch (error) {
            console.error(error)
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Songs', null, {})
    },
}

function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}
