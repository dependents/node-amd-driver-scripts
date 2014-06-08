var getDriverScripts = require('../'),
    isDriverScript = require('../').isDriverScript;

getDriverScripts(__dirname + '/example', function(drivers) {
  console.log('Driver scripts found: ', drivers);

  console.log(drivers.length === 1);
  console.log(drivers[0].indexOf('a.js') !== -1);
});

var result = isDriverScript(__dirname + '/example/a.js');
console.log('Is a.js a driver script?', result === true);
