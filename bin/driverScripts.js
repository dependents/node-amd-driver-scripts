#!/usr/bin/env node

'use strict';

var getDriverScripts = require('../'),
    directory = process.argv[2];

getDriverScripts(directory, function(drivers) {
  drivers.forEach(function(d) {
    console.log(d);
  });
});
