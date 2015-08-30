var menu = function(game){ }

menu.prototype = {
  preload: function(){
  },
  create: function(){
    this.start_game = game.add.text(330-150, 330-100, 'Enter Your Name', { font: '30px Arial', fill: '#fff' });
    $('<input type="text" id="gameName" style="position: fixed; left: 240px; top: 320px;">').appendTo("body");
    this.start_game_button = game.add.text(330-100, 380, 'Start Game', { font: '30px Arial', fill: '#fff' });
    this.start_game_button.inputEnabled = true;
    _this = this
    this.start_game_button.events.onInputUp.add(function() {_this.startGame()});
	},
  update: function(){
	},
  startGame: function(){
    gameName = $("#gameName").val();
    if (gameName == "") {
      alert("Please enter your name");
    } else {
      $("#gameName").remove();
      game.name = gameName;
      $.get("/game/new?GameName="+game.name, function(data) {
        console.log(data);
        game.gameId = data.game_id;
        game.playerId = data.player_id
        game.state.start("dungeon");
      });
    }
  }
}
