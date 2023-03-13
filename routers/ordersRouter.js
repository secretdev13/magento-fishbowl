const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')

router.get('/updated_at/:dateString', ordersController.updatedAt)
router.get('/transfer', ordersController.transfer)

module.exports = router