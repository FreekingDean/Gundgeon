var game = new Phaser.Game(660, 660, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var wallSize = 30;

function preload() {
  game.load.image('wall', 'images/tiles/wall_cbl.png');
}

function create() {
  getRoom(0, 0, 0);
}

function update() {
}

function getRoom() {
  $.get("/room/new?RoomHash="+window.hash, function(data) {
    console.log(data)
    for(x=0;x<data.Width;x++) {
      for(y=0;y<data.Height;y++) {
        center = y > 0 && y < data.Height  && x > 0 && x < data.Width - 1
        if (center) {
          y = data.Height - 1
        }
        game.add.sprite(x*30 + data.PadX*30 + 30, y*30 + data.PadY*30 + 30 , 'wall');
        window.hash = data.MD5
      }
    }
  });
}
