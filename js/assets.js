(function(){
  var speed = chyld.speed;
  var assets = chyld.speed.assets;

  assets.load = function(){
    assets.tileset = new Image();
    assets.tileset.addEventListener('load', speed.game.loop, false);
    assets.tileset.src = 'assets/tileset.png';

    speed.cars[0].image = new Image();
    speed.cars[0].image.src = 'assets/loki.png';

    speed.cars[1].image = new Image();
    speed.cars[1].image.src = 'assets/beast.png';

    speed.cars[2].image = new Image();
    speed.cars[2].image.src = 'assets/electron.png';

    window.addEventListener('keydown', speed.game.input, false);
    window.addEventListener('keyup', speed.game.input, false);
  }
})();
