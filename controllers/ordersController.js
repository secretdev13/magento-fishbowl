const msg = require('../const/message')
const MagApi = require('../helpers/MagApi')

const ordersController = {
	transfer: async (req, res) => {
		try {
			searchCriteria = {
	      currentPage: 1,
	      pageSize: 10,
	    }

		  const query = MagApi.searchCriteriaQuery(searchCriteria)
			const orders = await MagApi.call('orders?' + query, 'GET')

			return res.json({ success: true, msg: 'success', orders: orders.data })

		} catch (error) {
	    console.log(error)
			return res.json({ success: false, error: error })
		}
	}
}

module.exports = ordersController