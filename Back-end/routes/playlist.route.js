const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const playlistApiController = require('../controllers/api/playlist.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    playlistApiController.index,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    checkOwnerMiddleware.checkPlaylistOwner,
    playlistApiController.showById,
)
router.post('/', checkAuthMiddleware.checkAuth, playlistApiController.create)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    checkOwnerMiddleware.checkPlaylistOwner,
    playlistApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    checkOwnerMiddleware.checkPlaylistOwner,
    playlistApiController.deleteById,
)

module.exports = router
