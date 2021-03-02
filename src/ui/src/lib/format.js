'use strict'

const format = {
  toDate: function (epoch) {
    return (new Date(epoch)).toISOString()
  },
  toJson: function (str) {
    return JSON.stringify(str, null, 2)
  },
  // @todo
  toJs: function (str) {
    return str
  },
  querystring: function (query) {
    return new URLSearchParams(query).toString()
  }
}

export default format
