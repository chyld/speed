spd.assets.load = function(){
  this.tileset = new Image();
  this.tileset.addEventListener('load', spd.game.loop, false);
  this.tileset.src = 'assets/tileset.png';

  spd.cars[0].image = new Image();
  spd.cars[0].image.src = 'assets/loki.png';

  spd.cars[1].image = new Image();
  spd.cars[1].image.src = 'assets/beast.png';

  window.addEventListener('keydown', spd.game.input, false);
  window.addEventListener('keyup', spd.game.input, false);
}
