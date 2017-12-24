const express       = require('express'),
      bodyParser    = require('body-parser'),
      morgan        = require('morgan'),
      app           = express(),
      api = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

module.exports = app;