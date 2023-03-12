const axios = require('axios')
const config = require('../config')

const baseUrl = config.fbDbManager

const FbDbManager = {
  updateSalesOrder: async (so_number, po_number) => {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + '/api/sales-order/update_po',
        method: 'POST',
        data: {
          num: so_number,
          po: po_number
        }
      })
      .then(response => {
        console.log(response.data)
        resolve(response.data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

module.exports = FbDbManager