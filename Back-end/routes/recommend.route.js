const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const recommendApiController = require('../controllers/api/recommend.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    recommendApiController.getSongRecommendations,
)

module.exports = router