var game = new Phaser.Game(660, 660, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

var wallSize = 30;

var SPEED = 200;
var GRAVITY = 900;

function preload() {
  game.load.image('wall', 'images/tiles/wall_cbl.png');
  game.load.image('door', 'images/tiles/door.png');

  game.load.image('player', 'images/sprites/player.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  walls = game.add.group();
  walls.enableBody = true;

  player = game.add.sprite(0, 0, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  getRoom();
  reset();
}

function update() {
  game.physics.arcade.collide(player, walls);
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  var cursors = game.input.keyboard.createCursorKeys();
  var speed = 150

  if (cursors.left.isDown) {
    player.body.velocity.x = -1 * speed;
  }
  if (cursors.right.isDown) {
    player.body.velocity.x = speed;
  }
  if (cursors.right.isDown && cursors.left.isDown) {
    player.body.velocity.x = 0;
  }
  if (cursors.down.isDown) {
    player.body.velocity.y = speed;
  }
  if (cursors.up.isDown) {
    player.body.velocity.y = -1 *  speed;
  }
  if (cursors.up.isDown && cursors.down.isDown) {
    player.body.velocity.y = 0;
  }
}

function reset() {
  game.gameStarted = false;
  game.gameOver = false;
  game.score = 0;
  //game.player.reset(this.world.width / 4, this.world.centerY);
}

function destroyGroupChildren(group) {
  while(group.length > 0) {
    obj = group.getAt(0);
    obj.destroy();
  }
}

function getRoom() {
  destroyGroupChildren(walls)
  $.get("/room/new?GameId="+window.gameId+"&RoomHash="+window.hash, function(data) {
    console.log(data);
    for(x=0;x<data.Width;x++) {
      for(y=0;y<data.Height;y++) {
        center = y > 0 && y < data.Height  && x > 0 && x < data.Width - 1;
        if (center) {
          y = data.Height - 1;
        }
        if (x == data.ExitPos.X-1 && y == data.ExitPos.Y-1) {
          wall = walls.create(x*30 + data.PadX*30 + 30, y*30 + data.PadY*30 + 30 , 'door');
        } else {
          var wall = walls.create(x*30 + data.PadX*30 + 30, y*30 + data.PadY*30 + 30 , 'wall');
          wall.body.immovable = true;
        }
        window.hash = data.MD5
      }
    }
  });
}
