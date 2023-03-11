const validation = require('validator')

const Validator = {
	isEmpty: (val) => {
		if (val === undefined
			|| val === null
			|| val.length === 0
			|| (typeof val === 'object' && Object.keys(val).length === 0))
			return true
		return false
	},

	isValidDateString: (dateString) => {
		const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
		return regex.test(dateString)
	}
}

module.exports = Validator