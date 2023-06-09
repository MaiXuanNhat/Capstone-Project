const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const historyApiController = require('../controllers/api/history.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    historyApiController.indexByUserId,
)

router.post('/', checkAuthMiddleware.checkAuth, historyApiController.create)

module.exports = router