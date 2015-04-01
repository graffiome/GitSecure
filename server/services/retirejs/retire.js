'use strict';
var childProcess = require('child_process');

// function to scan a directory using retirejs
var retireScan = function(dir) {
  var results = childProcess.spawnSync('retire', [ '--outputformat', 'json'], {encoding: 'utf8', cwd: dir});

  // returning either the 2nd or 3rd item in the results array (2nd should be STDOUT, 3rd should be STDERR)
  var output;
  if (results) {
    output = results.output[2] ? results.output[2] : results.output[1];
  } else {
    output = null;
  }
  // if output isn't an array make it null (the text isn't helpful)
  try {
    if (JSON.parse(output).length < 1) {
     output = null; 
    } 
  } catch (e) {
    console.error('retireJS returned non JSON');
    output = null;
  }
  // returning either the 2nd or 3rd item in the results array (2nd should be STDOUT, 3rd should be STDERR)
  console.log('retireJS output: ', output);
  return output;
};


// exporting the scanning function so it can be used w/ require
exports.retireScan = retireScan;
