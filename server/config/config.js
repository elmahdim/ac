var path = require('path'),
  rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/ac',
    rootPath: rootPath,
    port: process.env.PORT || 8000
  },
  production: {
    db: 'API_GOES_HERE',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}