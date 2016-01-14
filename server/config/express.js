var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');

module.exports = function(app, config) {
  app
    .use(express.static(path.join(config.rootPath, 'public')))
    .use(bodyParser.json())
    .set('view engine', 'jade')
}
