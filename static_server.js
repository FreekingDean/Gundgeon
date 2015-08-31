var express = require('express');
var static_app = express();

static_app.use(express.static('assets'));
static_app.use(express.static('assets/view'));

static_app.get('/game', function(req, res){
  res.send('hello world');
});

static_app.listen(8080);
