'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('./../../config.js');

/**
 * GET /home
 *
 */
router.get(/^\/(home)?$/, function(req, res) {
  var og = {
    title: 'Nodejs bootstrap app',
    description: 'Bootstrap app for Nodejs',
    site_name: 'Nodejs bootstrap app',
    locale: 'en_US'
  };
  res.render('index', { og: og });
});

module.exports = router;