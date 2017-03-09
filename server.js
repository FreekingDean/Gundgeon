var env = process.env.NODE_ENV || 'development'
var ll = process.env.NODE_ENV || 'debug'
var port = process.env.PORT || 8081

if (env == 'development') {
  require('./static_server.js');
}

var logger = require('./logger')(env, ll);

var io = require('socket.io')(port);

var mastergame = require('./game/game.js')("Only Game", logger);

io.on('connection', function(socket) {
  socket.on('errorz', function(data) {
    logger.ERROR(data);
  });

  socket.on('join', function(data) {
    mastergame.addPlayer(data.player, socket, io);
  });

  socket.on('player_request', function(data) {
    mastergame.playerRequest(data, socket, io);
  });

  socket.on('room_request', function(data) {
    mastergame.roomRequest(data, socket, io);
  });
});
