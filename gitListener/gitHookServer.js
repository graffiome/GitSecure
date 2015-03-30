'use strict';

var deploy = require('./deploy.js').deploy;
var processRepo = require('../server/services/processRepo.js').processRepo;
var serverConfig = require('../serverConfig.js');
var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var privateKey  = fs.readFileSync(__dirname + '/../.certs/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/../.certs/www_gitsecure_me.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use(bodyParser.json());

app.post('/', function(req, res){
  // If this is our repo deploy
  if (req.body.repository && req.body.repository.full_name === 'graffiome/GitSecure') {
    deploy();
  } else if (req.body.repository && req.body.repository.id) { //other repo, scan
    console.log('calling processRepo!'); 
    processRepo(req.body.repository.id.toString());
  }
  res.end();
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(serverConfig.hookServerPort, serverConfig.localURL, function(){
  var host = httpsServer.address().address;
  var port = httpsServer.address().port;
  console.log('Git Hook app listening at http://%s:%s', host, port);
});
