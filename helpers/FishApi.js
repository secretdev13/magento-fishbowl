const axios = require('axios')

const baseUrl = process.env.FB_host

const FishApi = {
  login: async () => {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + '/api/login',
        method: 'POST',
        data: {
          appName: process.env.FB_appName,
          appId: process.env.FB_appId,
          username: process.env.FB_username,
          password: process.env.FB_password,
        }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
    })
  },

  call: async (url, method, params) => {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + '/api/' + url,
        method: method,
        headers: {
          Authorization: authorization
        },
        data: params
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

module.exports = FishApi