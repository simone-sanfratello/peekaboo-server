'use strict'

const format = {
  toDate: function (epoch) {
    if(!epoch) {
      return null
    }
    return (new Date(epoch)).toISOString()
  },
  toJson: function (str) {
    return JSON.stringify(str, null, 2)
  },
  // @todo
  toJs: function (str) {
    return str
  },

  url: function (url) {
    return url.replace('/url/', '')
  },
  querystring: function (query) {
    return new URLSearchParams(query).toString()
  }
}

export default format
