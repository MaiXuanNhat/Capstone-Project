const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const songApiController = require('../controllers/api/song.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    songApiController.index,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    songApiController.showById,
)
router.get(
    '/get-by-spotify-id/:spotifyId',
    checkAuthMiddleware.checkAuth,
    songApiController.showBySpotifyId,
)

module.exports = router
