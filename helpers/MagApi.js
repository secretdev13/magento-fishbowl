const axios = require('axios')

const baseUrl = process.env.Magento_Store
const authorization = process.env.Magento_Authorization

const MagApi = {
  searchCriteriaQuery: (params) => {
    var query = ''
    for (var key in params) {
      query += `&searchCriteria[${key}]=${params[key]}`
    }
    query = query.substring(1)
    return query
  },

  call: async (url, method, params) => {
    const response = await axios({
      url: baseUrl + '/rest/V1/' + url,
      method: method,
      headers: {
        Authorization: authorization
      },
      data: params
    })

    return response
  }
}

module.exports = MagApi