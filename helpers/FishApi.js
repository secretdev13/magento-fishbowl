const axios = require('axios')

const baseUrl = process.env.FB_host

const FishApi = {
  login: async () => {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + '/api/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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

  dataQuery: async (query) => {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + '/api/data-query',
        method: 'GET',
        headers: {
          'Content-Type': 'application/sql'
        },
        headers: {
          Authorization: process.env.FB_Authorization
        },
        data: query
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