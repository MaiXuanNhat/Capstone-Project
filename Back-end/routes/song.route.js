const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const songApiController = require('../controllers/api/song.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    songApiController.index,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    songApiController.showById,
)
router.get(
    '/:spotifyId',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    songApiController.showBySpotifyId,
)

module.exports = router
