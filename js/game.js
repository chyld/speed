(function(){
  var speed = chyld.speed;
  var game = chyld.speed.game;
  var kbd = chyld.speed.keyboard;
  var assets = chyld.speed.assets;
  var cars = chyld.speed.cars;

  game.initialization = function(){
    game.source      = {rows: 15, cols: 4}
    game.destination = {rows: 5,  cols: 15};
    game.tilesize    = 128;
    game.tiles       = [5,6,49,51,55,25,25,25,25,58,25,25,25,20,52,1,1,50,25,50,24,5,2,23,4,2,2,2,2,6,1,1,50,25,50,27,9,6,52,24,25,25,26,27,1,1,9,53,8,53,4,2,10,27,20,24,24,25,57,1,9,2,53,2,53,2,2,2,2,2,2,2,2,2,10];
    game.dimensions  = {width: game.destination.cols * game.tilesize, height: game.destination.rows * game.tilesize, border: 25, originX: 0, originY: 0};
  }

  game.input = function(e){
    switch(e.which)
    {
      case 37:
        kbd.left = e.type == 'keydown';
        break;
      case 38:
        kbd.up = e.type == 'keydown';
        break;
      case 39:
        kbd.right = e.type == 'keydown';
        break;
      case 40:
        kbd.down = e.type == 'keydown';
        break;
    }

    if(e.which > 36 && e.which < 41)
    {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  game.loop = function(timestamp){
    timestamp = isNaN(timestamp) ? 0 : timestamp;

    game.draw(timestamp);

    speed.oldtime = timestamp;
    window.requestAnimationFrame(game.loop);
  }

  game.masterCar = function(){
    return cars[0];
  }

  game.draw = function(timestamp){
    var ctx = chyld.speed.context;
    var car = game.masterCar();
    game.updatePosition(car);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    for(var dr = 0; dr < game.destination.rows; dr++)
      for(var dc = 0; dc < game.destination.cols; dc++){
        var tile = game.tiles[dc + (game.destination.cols * dr)] - 1;
        var sr = Math.floor(tile / game.source.cols);
        var sc = tile % game.source.cols;

        ctx.drawImage(assets.tileset, sc*game.tilesize, sr*game.tilesize, game.tilesize, game.tilesize, dc*game.tilesize + game.dimensions.originX, dr*game.tilesize + game.dimensions.originY, game.tilesize, game.tilesize);
      }

    for(var i = 0; i < cars.length; i++){
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(cars[i].linearX + cars[i].pivotX + game.dimensions.originX, cars[i].linearY + cars[i].pivotY + game.dimensions.originY);
      ctx.rotate(Math.deg2rad(cars[i].theta));
      ctx.drawImage(cars[i].image, 0, 0, 32, 17, -cars[i].pivotX, -cars[i].pivotY, 32, 17);
    }
  }

  game.updatePosition = function(car){
    var delta_theta = 0, delta_x = 0, delta_y = 0;

    if(kbd.left)
      delta_theta = -1;   // moves counter-clockwise
    else if(kbd.right)
      delta_theta = +1;   // moves clockwise

    if(kbd.up){
      delta_x = +1 * Math.cos(Math.deg2rad(car.theta + delta_theta));
      delta_y = +1 * Math.sin(Math.deg2rad(car.theta + delta_theta));
    }else if (kbd.down){
      delta_x = -1 * Math.cos(Math.deg2rad(car.theta + delta_theta));
      delta_y = -1 * Math.sin(Math.deg2rad(car.theta + delta_theta));
    }

    if(game.outsideBoundry(car, delta_x, delta_y)) return;

    car.deltaTheta = delta_theta;
    car.deltaLinearX = delta_x;
    car.deltaLinearY = delta_y;

    car.theta += car.deltaTheta;
    car.linearX += car.deltaLinearX;
    car.linearY += car.deltaLinearY;

    game.updateDisplay(car);
  }

  game.outsideBoundry = function(car, dx, dy){
    if(car.linearX + dx < game.dimensions.border) return true;
    if(car.linearX + dx + car.width() > game.dimensions.width - game.dimensions.border) return true;
    if(car.linearY + dy < game.dimensions.border) return true;
    if(car.linearY + dy + car.width() > game.dimensions.height - game.dimensions.border) return true;

    return false;
  }

  game.updateDisplay = function(car){
    if(car.deltaLinearX > 0)
      if(car.linearX + car.width() > speed.canvas.width - game.dimensions.border - game.dimensions.originX)
        game.dimensions.originX -= car.deltaLinearX;

    if(car.deltaLinearY > 0)
      if(car.linearY + car.width() > speed.canvas.width - game.dimensions.border - game.dimensions.originY)
        game.dimensions.originY -= car.deltaLinearY;

    if(car.deltaLinearX < 0)
      if(car.linearX < game.dimensions.border - game.dimensions.originX)
        game.dimensions.originX -= car.deltaLinearX;

    if(car.deltaLinearY < 0)
      if(car.linearY < game.dimensions.border - game.dimensions.originY)
        game.dimensions.originY -= car.deltaLinearY;
  }
})();
