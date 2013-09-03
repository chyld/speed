(function(){
  window.chyld = {};
  chyld.speed = {cars: [], game: {}, keyboard: {}, assets: {}};

  var speed = chyld.speed;

  window.addEventListener('load', function(){speed.initialization();}, false);

  speed.initialization = function(){
    speed.oldtime = 0;
    speed.cars.push(new speed.car( 75,  75, 0, 13, 8));
    speed.cars.push(new speed.car(110,  50, 25, 17, 8));
    speed.cars.push(new speed.car(160, 150, 90, 15, 8));

    speed.canvas = document.getElementById('the_canvas');
    speed.context = speed.canvas.getContext('2d');

    speed.dbg_canvas = document.getElementById('dbg_canvas');
    speed.dbg_context = speed.dbg_canvas.getContext('2d');

    speed.game.initialization();
    speed.assets.load();
  }
})();
