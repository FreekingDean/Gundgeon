var dungeons = function(game){ }

dungeons.prototype = {
  preload: function(){
    game.load.image('wall', 'images/tiles/wall_cbl.png');
    game.load.image('door', 'images/tiles/door.png');

    game.load.image('player', 'images/sprites/player.png');
  },

  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.walls = game.add.group();
    this.walls.enableBody = true;

    this.doors = game.add.group();
    this.doors.enableBody = true;

    this.player = game.add.sprite(0, 0, 'player');
    game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.getRoom();
    this.reset();
  },

  update: function(){
    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.collide(this.player, this.doors, this.openDoor, null, this);
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    var cursors = game.input.keyboard.createCursorKeys();
    var speed = 150

    if (cursors.left.isDown) {
      this.player.body.velocity.x = -1 * speed;
    }
    if (cursors.right.isDown) {
      this.player.body.velocity.x = speed;
    }
    if (cursors.right.isDown && cursors.left.isDown) {
      this.player.body.velocity.x = 0;
    }
    if (cursors.down.isDown) {
      this.player.body.velocity.y = speed;
    }
    if (cursors.up.isDown) {
      this.player.body.velocity.y = -1 *  speed;
    }
    if (cursors.up.isDown && cursors.down.isDown) {
      this.player.body.velocity.y = 0;
    }
  },

  reset: function() {
    game.gameStarted = false;
    game.gameOver = false;
    game.score = 0;
    //game.player.reset(this.world.width / 4, this.world.centerY);
  },

  destroyGroupChildren: function(group) {
    while(group.length > 0) {
      obj = group.getAt(0);
      obj.destroy();
    }
  },

  getRoom: function() {
    this.destroyGroupChildren(this.walls);
    this.destroyGroupChildren(this.doors);
    _this = this;
    $.get("/room/new?GameId="+window.gameId+"&RoomHash="+window.hash, function(data) {
      console.log(data);
      for(x=0;x<data.Width;x++) {
        for(y=0;y<data.Height;y++) {
          center = y > 0 && y < data.Height  && x > 0 && x < data.Width - 1;
          if (center) {
            y = data.Height - 1;
          }
          xoffset = x*30 + data.PadX*30 + 30;
          yoffset = y*30 + data.PadY*30 + 30;
          if (x == data.ExitPos.X-1 && y == data.ExitPos.Y-1) {
            _this.door = _this.doors.create(xoffset, yoffset, 'door');
          } else {
            var wall = _this.walls.create(xoffset, yoffset, 'wall');
            wall.body.immovable = true;
          }
          window.hash = data.MD5;
        }
      }
      _this = null;
    });
  },

  openDoor: function(obj1, obj2) {
    this.getRoom();
  }
}
