window.spd = {cars: [], game: {}, keyboard: {}, assets: {}};
window.addEventListener('load', function(){spd.initialization();}, false);

spd.initialization = function(){
  spd.oldtime = 0;
  spd.cars.push(new spd.cars.create(75, 75, 0, 13, 8, 75, 75));
  spd.cars.push(new spd.cars.create(90, 90, 0, 17, 8, 90, 90));

  spd.canvas = document.getElementById('the_canvas');
  spd.context = spd.canvas.getContext('2d');

  spd.dbg_canvas = document.getElementById('dbg_canvas');
  spd.dbg_context = spd.dbg_canvas.getContext('2d');

  spd.game.initialization();
  spd.assets.load();
}
