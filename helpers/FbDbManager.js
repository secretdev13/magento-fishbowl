const axios = require('axios')
const config = require('../config')

const baseUrl = config.fbDbManager

const FbDbManager = {
  updateSalesOrder: async (so_number, po_number) => {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + '/api/sales-order/update_po',
        method: 'POST',
        headers: {
          Authorization: process.env.FB_Authorization
        },
        data: {
          num: so_number,
          po: po_number
        }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
    })
  }
}

module.exports = FbDbManager