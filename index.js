var fs     = require('fs'),
    types  = require('ast-module-types'),
    Walker = require('node-source-walk'),
    dir    = require('node-dir'),
    q      = require('q');

function isDirectory(filename) {
  return fs.lstatSync(filename).isDirectory();
}

/**
 * Resolves with an array of the JS filenames within a given directory
 * @param  {String} directory
 * @return {Promise} Resolve callback (files) -> null
 */
function getAllJSFiles(directory) {
  var deferred = q.defer();

  dir.readFiles(directory,
  {
    match: /.js$/,
    exclude: /^\./,
  },
  function (err, content, next) {
    if (err) throw err;
    next();
  },
  function(err, files) {
    if (err) throw err;
    deferred.resolve(files);
  });

  return deferred.promise;
}

/**
 * Given a list of filenames, returns only the ones that are driver scripts
 * @param  {Array} files
 * @return {Array} list of filenames of the driver scripts
 */
function filterDriverScripts(files) {
  // If given a list of filenames, filter those that are driver scripts
  var results = files.map(module.exports.isDriverScript);
  return files.filter(function(file, idx) {
    return results[idx];
  });
}

/**
 * Gets the names of the driver scripts in a directory or list of filenames
 * @param  {String|Array} filename - A directory name or list of filenames
 * @param  {Function} cb - Callback format: (filenames) -> null
 * @return {Array}    A list of driver scripts when given a directory or list of filenames
 *                    An empty list if no driver scripts were found
 */
module.exports = function(filename, cb) {
  var driverScripts = [],
      results, files;

  if(filename instanceof Array) {
    if (cb) cb(filterDriverScripts(filename));

  } else if (isDirectory(filename)) {
    // If given a directory, find all driver scripts in that dir
    getAllJSFiles(filename)
      .then(filterDriverScripts)
      .then(cb);
  }
};


/**
 * Whether or not the given file contains a top level require
 * @param  {String}   filename
 * @return {Boolean}
 */
module.exports.isDriverScript = function (filename) {
  var src = fs.readFileSync(filename).toString(),
      walker = new Walker(),
      foundTopLevelModule = false;

  walker.walk(src, function (node) {
    if (types.isTopLevelRequire(node)) {
      foundTopLevelModule = true;
      walker.stopWalking();
    }
  });

  return foundTopLevelModule;
};
