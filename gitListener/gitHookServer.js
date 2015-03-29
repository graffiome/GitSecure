'use strict';

var deploy = require('./deploy.js').deploy;
var processRepo = require('../server/services/processRepo.js').processRepo;
var serverConfig = require('../serverConfig.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var server = app.listen(8080, serverConfig.localURL, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('example app listening at host: http://%s  port: %s', host, port);
});

app.use(bodyParser.json());

app.post('/', function(req, res){
  console.log('request: ', req.body);
  // If this is our repo deploy
  if (req.body.repository && req.body.repository.full_name === 'graffiome/GitSecure') {
    deploy();
  } else if (req.body.repository && req.body.repository.id) { //other repo, scan
    console.log('calling processRepo!'); 
    processRepo(req.body.repository.id.toString());
  }
  res.end();
});


