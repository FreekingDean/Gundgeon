var player = require('./player')

function game(name, log){
  var name = name;
  var players = {};

  return {
    addPlayer: function(new_player, socket, io){
      players[socket.id] = new(player)(new_player);
      log.DEBUG(socket.id);
      log.DEBUG(players[socket.id]);
    },
    playerRequest: function(data, socket, io){
      log.DEBUG(socket.id);
      players[socket.id].handleRequest(data, io)
      socket.emit('player_update', players[socket.id].info)
      log.DEBUG(players[socket.id]);
    },
    roomRequest: function(data, socket, io){
      log.DEBUG(socket.id);
      socket.emit('room_created', {
        Height: 10,
        Width: 15,
        PadX: 2,
        PadY: 3,
        ExitPos: {X: 5, Y: 10}
      })
      log.DEBUG(data);
    }
  }
}

module.exports = game;
