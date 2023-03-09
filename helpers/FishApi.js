const axios = require('axios')

const FishApi = {
  call: async (url, method, params) => {
    return new Promise((resolve, reject) => {
      resolve({ 'success': true, 'url': url })
    })
  }
}

module.exports = FishApi