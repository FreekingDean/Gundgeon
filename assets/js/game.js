var WALLSIZE = 30;
var SPEED = 200;

var game = new Phaser.Game(660, 660, Phaser.AUTO, 'game');
game.state.add("menu", menu.prototype);
game.state.add("dungeon", dungeons.prototype);
game.state.start("menu");
