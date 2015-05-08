'use strict';
var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression');
var morgan = require('morgan');
var homeRouter = require('./lib/routes/home');
var program = require('commander');
var packageInfo = require('./package');
var path = require('path');

program
  .version(packageInfo.version)
  .usage('[options] <config file>')
  .parse(process.argv);

var config = {};

if (!program.args || !program.args[0]) {
  program.help();
}

var configPath = program.args[0];

if (configPath[0] === '/')
  config = require(configPath);
else
  config = require(path.join(process.cwd(), configPath));

// Initialize express application
var app = express();
app.use(morgan('combined'));

var envFolder = app.settings.env === 'production' ? 'dist' : 'app';
var publicFolder = __dirname + '/' + envFolder;
var port = config.port || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.version = config.version;

// Make public folder accessible for all routes through req.publicFolder
app.use(function(req, res, next) {
  req.publicFolder = publicFolder;
  next();
});
app.use(compression());
// app.use(favicon(path.join(publicFolder, 'favicon.ico'))); // add a favicon and then uncomment this
app.use(express.static(publicFolder, { index: false }));
app.use('/', homeRouter);

app.listen(port, function() {
  console.log('Server is listening on port %d', port);
});