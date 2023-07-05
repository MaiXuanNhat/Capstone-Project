const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const playlistApiController = require('../controllers/api/playlist.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    playlistApiController.indexByUserId,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkPlaylistOwner,
    playlistApiController.showById,
)
router.post('/', checkAuthMiddleware.checkAuth, playlistApiController.create)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkPlaylistOwner,
    playlistApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkPlaylistOwner,
    playlistApiController.deleteById,
)

module.exports = router
