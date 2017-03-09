function player(player_info){
  speed = 1;
  position    = {x: 0, y: 0};
  constraints = {x: 30, y: 30};

  this.name = player_info.name;

  function move(movements) {
    if (movements.left || movements.right && !(movements.left && movements.right)) {
      if (movements.left && position.x > 0) {
        position.x -= speed;
      } else if (position.x <  constraints.x) {
        position.x += speed;
      }
    }
    if (movements.up || movements.down && !(movements.up && movements.down)) {
      if(movements.up && position.y > 0) {
        position.y -= speed;
      } else if (position.y < constraints.y) {
        position.y += speed;
      }
    }
  }

  return {
    handleRequest: function(data, io){
      if (data.movements) {
        move(data.movements)
      }
    },
    info: {
      position: position
    }
  }
}

module.exports = player;
