const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')

router.get('/transfer', ordersController.transfer)

module.exports = router