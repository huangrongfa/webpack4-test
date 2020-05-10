const NODE_ENV = process.env.NODE_ENV;
const config = {
  production: {
    baseUrl: 'http://www.dev.com/api'
  },
  development: {
    baseUrl: 'http://www.pro.com/api'
  }
}

module.exports = config[NODE_ENV]