const msg = require('../const/message')

const ordersController = {
	transfer: async (req, res) => {
		try {
			return res.json({ success: true, msg: 'success'})
		} catch (error) {
			return res.json({ success: false, msg: msg.server.error })
		}
	}
}

module.exports = ordersController