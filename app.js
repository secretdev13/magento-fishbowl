const express = require('express')
const winston = require('winston')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require('http')
const swaggerUi = require('swagger-ui-express')

// .env in Node
require('dotenv').config()

// Express app
const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

/**
 * CORS setting
 */
app.use(cors())
// ------------------------------------------------

/**
 * Swagger setting
 */
const swaggerDocument = require('./config/swagger.json')
var options = {
	swaggerOptions: {
		validatorUrl: null
	}
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
// ------------------------------------------------

/**
 * For Logger
 */
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
	transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

function logRequest(req, res, next) {
	logger.info(req.url)
	next()
}
function logError(err, req, res, next) {
	logger.error(err)
	next()
}

app.use(logRequest)
app.use(logError)
// ------------------------------------------------

/**
 * API routers
 */
const router = require('./routers')
router(app)
const server = http.createServer(app)
const config = require('./config')

server.listen(config.port, () => {
	console.log(`MagFish Server is listening on port ${config.port}`)
})
