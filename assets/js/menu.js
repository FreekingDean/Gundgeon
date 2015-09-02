var menu = function(game){ }

menu.prototype = {
  preload: function(){
    game.socket = io('http://localhost:8081');
  },
  create: function(){
    this.start_game = game.add.text(330-150, 330-100, 'Enter Your Name', { font: '30px Arial', fill: '#fff' });
    $('<input type="text" id="playerName" style="position: fixed; left: 240px; top: 320px;">').appendTo("body");
    this.start_game_button = game.add.text(330-100, 380, 'Start Game', { font: '30px Arial', fill: '#fff' });
    this.start_game_button.inputEnabled = true;
    _this = this
    this.start_game_button.events.onInputUp.add(function() {_this.startGame()});
	},
  update: function(){
	},
  startGame: function(){
    playerName = $("#playerName").val();
    if (playerName == "") {
      alert("Please enter your name");
    } else {
      $("#playerName").remove();
      //game.name = gameName;
      game.socket.emit('join', {
        player: {
          name: playerName
        }
      });
      game.state.start("dungeon");
    }
  }
}
