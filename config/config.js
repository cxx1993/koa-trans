/**
 *
 */
module.exports = {
  env: process.env.NODE_ENV || 'dev',
  constants: {
    proxyTarget: {
      local: 'http://127.0.0.1:8000',
      dev: 'http://192.190.0.84:9015',
      'ali-testing': 'http://192.168.10.197:8000',
      uat: 'http://172.16.1.220:9015',
      prod: 'http://10.0.6.183:9015'
    }
  },
  // 请求头
  httpclient: {
    request: {
      dataType: 'json',
      timeout: 60000,
      headers: {
        Hyxf_Web_Flag: '10001'
      }
    }
  }
}
