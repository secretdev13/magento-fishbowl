const axios = require('axios')

const baseUrl = process.env.Magento_Store
const authorization = process.env.Magento_Authorization

const MagApi = {
  searchQuery: (params) => {
    query = ''
    currentPage = 'currentPage' in params ? params.currentPage : 1
    pageSize = 'pageSize' in params ? params.pageSize : 10

    query += `searchCriteria[currentPage]=${currentPage}`
    query += `&searchCriteria[pageSize]=${pageSize}`

    if ('filters' in params) {
      filters = params.filters
      for (i in filters) {
        const filter = filters[i]
        if (filter.value) {
          query += `&searchCriteria[filterGroups][0][filters][${i}][field]=${filter.field}`
          query += `&searchCriteria[filterGroups][0][filters][${i}][value]=${filter.value}`
          query += `&searchCriteria[filterGroups][0][filters][${i}][conditionType]=${filter.conditionType}`
        }
      }
    }

    if ('sortOrders' in params) {
      sortOrders = params.sortOrders
      for (i in sortOrders) {
        const sortOrder = sortOrders[i]
        query += `&searchCriteria[sortOrders][${i}][field]=${sortOrder.field}`
        query += `&searchCriteria[sortOrders][${i}][direction]=${sortOrder.direction}`
      }
    }

    return query
  },

  call: async (url, method, params) => {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + '/rest/V1/' + url,
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

module.exports = MagApi