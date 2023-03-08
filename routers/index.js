const config = require('../config')
const ordersRouter = require('./ordersRouter')

const Router = (app) => {
	app.use(config.baseURL + '/orders', ordersRouter)
}

module.exports = Router