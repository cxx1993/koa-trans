const request = require('request')
const req_config = require('../config/config.js').httpclient.request

// 请求基础参数配置
let baseRequest = request.defaults({
  ...req_config,
  cookie: true
})

module.exports = {
  get get() {
    return ({ url }) => {
      return new Promise((resolve, reject) => {
        const options = {
          url,
          dataType: 'json',
          timeout: 60000,
          headers: {
            Cookie:
              'JSESSIONID=1ad2hw3qusu1r1uo63vaqjhebg',
            Hyxf_Web_Flag: 10001
          },
          json:true
        }
        baseRequest.get(options, (error, response, body) => {
          if (error) {
            reject(error)
          }
          resolve(body)
        })
      })
    }
  },
  get post() {
    return (options, useResponse = false) => {
      return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
          if (error) {
            reject(error)
          }
          if (!useResponse) {
            resolve(body)
          }
          resolve({
            body,
            response
          })
        })
      })
    }
  }
}
