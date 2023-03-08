const msg = require('../const/message')
const Magento2Api = require('magento2-api-wrapper')

const ordersController = {
	transfer: async (req, res) => {
		try {
			console.log(process.env.Magento_Store)

			// Magento instance
			const magentoAdmin = new Magento2Api({ api: {
		    url: process.env.Magento_Store,
		    consumerKey: process.env.Magento_Consumer_Key,
		    consumerSecret: process.env.Magento_Consumer_Secret,
		    accessToken: process.env.Magento_Access_Token,
		    tokenSecret: process.env.Magento_Token_Secret
			}})

			magentoAdmin.get('orders', {
			  params: {
			    searchCriteria: {
			      currentPage: 1,
			      pageSize: 1,
			    }
			  }
			})
		  .then(data => {
		    return res.json({ success: true, msg: 'success', orders: data })
		  })
		  .catch(error => {
		    console.log(error)
		    return res.json({ success: false, msg: error })
		  })

		} catch (error) {
	    console.log(error)
			return res.json({ success: false, msg: error })
		}
	}
}

module.exports = ordersController