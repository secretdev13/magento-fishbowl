const msg = require('../const/message')
const MagApi = require('../helpers/MagApi')
const FishApi = require('../helpers/FishApi')

const ordersController = {
	transfer: async (req, res) => {
		try {
			const searchCriteria = {
        currentPage: 0,
        pageSize: 10,
        filters: [
          {
            field: "created_at",
            value: null,
            conditionType: "gt"
          }
        ],
        sortOrders: [
          {
            field: "created_at",
            direction: "desc"
          }
        ],
    	}
	    promises = []

	    while(true) {
	    	searchCriteria.currentPage += 1
			  const query = MagApi.searchQuery(searchCriteria)
				const ordersData = await MagApi.call('orders?' + query, 'GET')
				promises.push( processOrders(ordersData.items) )

				console.log(query)
				if (ordersData.total_count <= searchCriteria.currentPage * searchCriteria.pageSize) {
					break
				}
	    }

	    Promise.all(promises).then(values => {
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
			for (i in payment_additional_info) {
				value = payment_additional_info[i]
				if (value.key == 'po_number') {
					console.log(order.increment_id)
					promises.push( FishApi.call('sales_order', 'POST', order) )
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