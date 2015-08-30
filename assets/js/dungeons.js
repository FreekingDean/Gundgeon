var dungeons = function(game){ }

dungeons.prototype = {
  preload: function(){
    game.load.image('wall', 'images/tiles/wall_cbl.png');
    game.load.image('door', 'images/tiles/door.png');

    game.load.image('player', 'images/sprites/player.png');
    this.playerSocket = new WebSocket("ws://localhost:8080/stream/player");
    this.playerSocket.onmessage = this.playerMessage;
    _this = this;
    this.playerSocket.onopen = function(){_this.playerSocketOpen = true};
    wait = true
  },

  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.walls = game.add.group();
    this.walls.enableBody = true;

    this.doors = game.add.group();
    this.doors.enableBody = true;

    this.player = game.add.sprite(0, 0, 'player');
    this.player.playerId = game.playerId;
    game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.frameSync = 60;

    this.getRoom();
    this.reset();
  },

  update: function(){
    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.collide(this.player, this.doors, this.openDoor, null, this);
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    var cursors = game.input.keyboard.createCursorKeys();
    if (this.playerSocketOpen) {
      if (this.frameSync == 60) {
        if (this.KeyDown(cursors)) {
          _this = this
          this.playerSocket.send(JSON.stringify({
            playerId: _this.player.playerId,
            movements: {
              left: cursors.left.isDown,
              right: cursors.right.isDown,
              up: cursors.up.isDown,
              down: cursors.down.isDown
            }
          }))
        }
        this.frameSync = 0;
      } else {
        this.frameSync++;
      }
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
    $.get("/room/new?GameId="+game.gameId+"&RoomHash="+window.hash, function(data) {
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
  },

  playerMessage: function(data) {
    movement = JSON.parse(data.data)
    player.body.x = movement.Position.X * 30
    player.body.x = movement.Position.y * 30
  },

  KeyDown: function(cursors) {
    return cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown
  }
}
