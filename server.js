var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    schemas    = require('./server/schemas/all'),
    port       = 8000,
    env        = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // production

var config = require('./server/config/config')[env];
    require('./server/config/express')(app, config);
    require('./server/config/mongoose')(config);
    require('./server/config/routes')(app);

app.listen(config.port);
console.log('server running on port ' + port);