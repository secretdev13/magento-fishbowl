const validation = require('validator')
const msg = require('../const/message')
var Validator = {
	isEmpty: (val) => {
		if (val === undefined
			|| val === null
			|| val.length === 0
			|| (typeof val === 'object' && Object.keys(val).length === 0))
			return true
		else return false
	}
}

module.exports = Validator