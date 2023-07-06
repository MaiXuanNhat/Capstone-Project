const axios = require('axios')

const {
    getListSongsByIds,
    getListSongsByTitles,
} = require('../CRUD/song')

async function getSongRecommendations(request, response) {
    try {
        const requestUserId = request.userData.userId
        const query_song_ids = request.body.query_song_ids
        const limit = request.body.limit

        // Get all query songs data
        if (query_song_ids && query_song_ids.length > 0 && limit) {
            const dbSongs = await getListSongsByIds(query_song_ids, requestUserId)
            
            if (dbSongs) {
                const querySongs = dbSongs.map(song => {
                    return {
                        name: song.title,
                        year: Number.parseInt(song.release_date.slice(0, 4)),
                        artists: song.artists,
                    }
                })

                // Call flask server API to get all possible outfits compatibility
                const recommendSongs = await axios.post(
                    `${process.env.FLASK_SERVER_URL}/recommend-songs`,
                    {
                        query_songs: querySongs || [],
                        limit: limit || 10, // Default limit is 10
                    },
                )

                if (recommendSongs.status === 200) {
                    const recommendSongTitles = recommendSongs.data.map(recommendSong => recommendSong.name)
                    const recommendSongArtists = recommendSongs.data.map(recommendSong => recommendSong.artists)
                    const recommendResult = await getListSongsByTitles(recommendSongTitles, recommendSongArtists, requestUserId)
                    // Return recommend songs
                    return response.status(200).json(recommendResult)
                }
            } else {
                return response.status(404).json({
                    message: 'Song not found!',
                })
            }
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    getSongRecommendations: getSongRecommendations,
}