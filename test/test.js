var getDriverScripts = require('../'),
    isDriverScript = require('../').isDriverScript,
    testCount = 0,
    passCount = 0;

function equiv(expected, actual) {
  if (Array.isArray(expected)) {
    return expected.every(function(value, index) {
      return value === actual[index];
    });
  } else {
    return expected === actual;
  }
}

function assert(name, expected, actual) {
  // weak equivalence for array comparison
  var success = equiv(expected, actual),
      label = success ? 'PASS' : 'FAIL';

  testCount++;
  if (success) {
    passCount++;
  } else {
    console.error('expected', actual, 'to match', expected);
  }

  console.log(label, name);
}

function assertFile(filename, expected) {
  assert('Is ' + filename + ' a driver script?', expected, isDriverScript(__dirname + '/fixtures/' + filename));
}

function logResults() {
  console.log('-----------');
  if (passCount === testCount) {
    console.log('ALL TESTS PASSED');
  } else {
    console.error(passCount + '/' + testCount + ' tests passed');
  }
  console.log('-----------');
}

assertFile('driver.js', true);
assertFile('define.js', false);
assertFile('unparseable.js', false);

getDriverScripts(__dirname + '/fixtures', function(drivers) {
  var driverFileNames = drivers.map(function(filename) {
    return filename.split('/').reverse()[0];
  });

  assert('Found correct number of driver scripts', 1, drivers.length);
  assert('Found correct list of files', ['driver.js'], driverFileNames);
  logResults();
});
