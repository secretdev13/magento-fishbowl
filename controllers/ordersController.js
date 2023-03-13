const msg = require('../const/message')
const MagApi = require('../helpers/MagApi')
const FbDbManager = require('../helpers/FbDbManager')
const Validator = require('../helpers/validation')
const Utils = require('../helpers/Utils')

const ordersController = {
	updatedAt: async (req, res) => {
		try {
			dateString = req.params.dateString
			if (!Validator.isValidDateString(dateString)) {
				return res.json({ success: false, error: msg.error.invalid_updated_at }) 
			}
			Utils.updatedAt = dateString
			process.env.updatedAt = dateString

			return res.json({ success: true, msg: msg.success.set_updated_at })
		} catch (error) {
			return res.json({ success: false, error: error })
		}
	},

	transfer: async (req, res) => {
		try {
			const searchCriteria = {
        currentPage: 0,
        pageSize: 10,
        filters: [
          {
            field: "updated_at",
            value: Utils.updatedAt,
            conditionType: "gt"
          }
        ],
        sortOrders: [
          {
            field: "updated_at",
            direction: "asc"
          }
        ],
    	}
	    promises = []
	    var lastOrder

	    while(true) {
	    	searchCriteria.currentPage += 1
			  const query = MagApi.searchQuery(searchCriteria)
				const ordersData = await MagApi.call('orders?' + query, 'GET')
				promises.push( processOrders(ordersData.items) )

				if (ordersData.total_count <= searchCriteria.currentPage * searchCriteria.pageSize) {
					lastOrder = ordersData.items[ordersData.items.length - 1]
					break
				}
	    }

	    Promise.all(promises).then(values => {
	    	// Utils.updatedAt = lastOrder['updated_at']
	    	res.json({ success: true, data: values })
	    }).catch(error => {
				res.json({ success: false, error: error })
	    })

		} catch(error) {
			return res.json({ success: false, error: error })
		}
	}
}

const processOrders = async (orders) => {
	return new Promise((resolve, reject) => {
		promises = []
		for (i in orders) {
			const order = orders[i]
			if (!order.extension_attributes || !order.extension_attributes.payment_additional_info)
				continue

			const payment_additional_info = order.extension_attributes.payment_additional_info
			for (j in payment_additional_info) {
				info = payment_additional_info[j]
				if (info.key == 'po_number' && !Validator.isEmpty(info.value)) {
					console.log(info)
					promises.push( FbDbManager.updateSalesOrder(order.increment_id, info.value) )
					break
				}
			}
		}

		Promise.all(promises).then(values => {
			resolve(values)
		}).catch(error => {
			reject(error)
		})
	})
}

module.exports = ordersController