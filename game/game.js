var player = require('./player')

function game(name, log){
  var name = name;
  var players = {};

  return {
    addPlayer: function(new_player, socket, io){
      log.DEBUG(socket.id);
      players[socket.id] = new(player)(new_player);
      log.DEBUG(players[socket.id]);
    }
  }
}

module.exports = game;
