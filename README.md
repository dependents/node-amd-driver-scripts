# node-amd-driver-scripts

Get a list of entry-point, app initialization AMD modules (i.e., driver scripts) within a directory

`npm install amd-driver-scripts`

### Usage

Getting a list of driver scripts:

```javascript
var getDriverScripts = require('amd-driver-scripts');

getDriverScripts('./js', function (drivers) {
  console.log(drivers);
});
```

Checking if a particular file is a driver script:

```javascript
var isDriverScript = require('amd-driver-scripts').isDriverScript;

var result = isDriverScript('./js/foobar.js');
```

Or via a shell command to print all driver scripts to the console.

Requires `npm install -g amd-driver-scripts`:

```bash
amd-driver-scripts directory
```
