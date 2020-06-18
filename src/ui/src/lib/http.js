'use strict'

const http = {
  response: {
    isJson: function (response) {
      return response.headers['content-type'].includes('/json')
    }
  }
}

export default http
