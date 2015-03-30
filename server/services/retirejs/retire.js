'use strict';
var childProcess = require('child_process');

// function to scan a directory using retirejs
var retireScan = function(dir) {
  var results = childProcess.spawnSync('retire', [ '--jspath', dir, '--outputformat', 'json'], {encoding: 'utf8'});

  // returning either the 2nd or 3rd item in the results array (2nd should be STDOUT, 3rd should be STDERR)
  var output = results.output[2] ? results.output[2] : results.output[1];
  console.log('retireJS output: ', output);
  return output ? output: null;
};


// exporting the scanning function so it can be used w/ require
exports.retireScan = retireScan;