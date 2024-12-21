// include dependencies 
var express = require('express');
var compression = require('compression');
var proxy = require('http-proxy-middleware');
var config = require('./config');

var app = express();
app.use(compression());
app.use('/', express.static(config.staticPath, {
    'index': config.defaultFile
}));
app.use('/api', proxy(config.proxy));
app.listen(config.port);
