spd.game.initialization = function(){
  this.source      = {rows: 15, cols: 4}
  this.destination = {rows: 5,  cols: 15};
  this.tilesize = 128;
  this.tiles = [5,6,49,51,55,25,25,25,25,58,25,25,25,20,52,1,1,50,25,50,24,5,2,23,4,2,2,2,2,6,1,1,50,25,50,27,9,6,52,24,25,25,26,27,1,1,9,53,8,53,4,2,10,27,20,24,24,25,57,1,9,2,53,2,53,2,2,2,2,2,2,2,2,2,10];
  this.dimensions = {width: this.destination.cols * this.tilesize, height: this.destination.rows * this.tilesize, border: 25, originX: 0, originY: 0};
}

spd.game.input = function(e){
  switch(e.which)
  {
    case 37:
      spd.keyboard.left = e.type == 'keydown';
      break;
    case 38:
      spd.keyboard.up = e.type == 'keydown';
      break;
    case 39:
      spd.keyboard.right = e.type == 'keydown';
      break;
    case 40:
      spd.keyboard.down = e.type == 'keydown';
      break;
  }

  if(e.which > 36 && e.which < 41)
  {
    e.preventDefault();
    e.stopPropagation();
  }
}

spd.game.loop = function(timestamp){
  timestamp = isNaN(timestamp) ? 0 : timestamp;

  spd.game.draw(timestamp);

  spd.oldtime = timestamp;
  window.requestAnimationFrame(spd.game.loop);
}

spd.game.draw = function(timestamp){
  var car = spd.cars.main();
  this.updatePosition(car);
  spd.context.setTransform(1, 0, 0, 1, 0, 0);

  for(var dr = 0; dr < this.destination.rows; dr++)
    for(var dc = 0; dc < this.destination.cols; dc++){
      var tile = this.tiles[dc + (this.destination.cols * dr)] - 1;
      var sr = Math.floor(tile / this.source.cols);
      var sc = tile % this.source.cols;

      spd.context.drawImage(spd.assets.tileset, sc*this.tilesize, sr*this.tilesize, this.tilesize, this.tilesize, dc*this.tilesize + this.dimensions.originX, dr*this.tilesize + this.dimensions.originY, this.tilesize, this.tilesize);
    }

  for(var i = 0; i < spd.cars.length; i++){
    spd.context.setTransform(1, 0, 0, 1, 0, 0);
    spd.context.translate(spd.cars[i].linearX + spd.cars[i].pivotX + this.dimensions.originX, spd.cars[i].linearY + spd.cars[i].pivotY + this.dimensions.originY);
    spd.context.rotate(Math.deg2rad(spd.cars[i].theta));
    spd.context.drawImage(spd.cars[i].image, 0, 0, 32, 17, -spd.cars[i].pivotX, -spd.cars[i].pivotY, 32, 17);
  }
}

spd.game.updatePosition = function(car){
  var delta_theta = 0, delta_x = 0, delta_y = 0;

  if(spd.keyboard.left)
    delta_theta = -1;   // moves counter-clockwise
  else if(spd.keyboard.right)
    delta_theta = +1;   // moves clockwise

  if(spd.keyboard.up){
    delta_x = +1 * Math.cos(Math.deg2rad(car.theta + delta_theta));
    delta_y = +1 * Math.sin(Math.deg2rad(car.theta + delta_theta));
  }else if (spd.keyboard.down){
    delta_x = -1 * Math.cos(Math.deg2rad(car.theta + delta_theta));
    delta_y = -1 * Math.sin(Math.deg2rad(car.theta + delta_theta));
  }

  if(this.outsideBoundry(car, delta_x, delta_y)) return;

  car.deltaTheta = delta_theta;
  car.deltaLinearX = delta_x;
  car.deltaLinearY = delta_y;

  car.theta += car.deltaTheta;
  car.linearX += car.deltaLinearX;
  car.linearY += car.deltaLinearY;

  this.updateDisplay(car);
}

spd.game.outsideBoundry = function(car, dx, dy){
  if(car.linearX + dx < this.dimensions.border) return true;
  if(car.linearX + dx + car.width() > this.dimensions.width - this.dimensions.border) return true;
  if(car.linearY + dy < this.dimensions.border) return true;
  if(car.linearY + dy + car.width() > this.dimensions.height - this.dimensions.border) return true;

  return false;
}

spd.game.updateDisplay = function(car){
  if(car.deltaLinearX > 0)
    if(car.linearX + car.width() > spd.canvas.width - this.dimensions.border - this.dimensions.originX)
      this.dimensions.originX -= car.deltaLinearX;

  if(car.deltaLinearY > 0)
    if(car.linearY + car.width() > spd.canvas.width - this.dimensions.border - this.dimensions.originY)
      this.dimensions.originY -= car.deltaLinearY;

  if(car.deltaLinearX < 0)
    if(car.linearX < this.dimensions.border - this.dimensions.originX)
      this.dimensions.originX -= car.deltaLinearX;

  if(car.deltaLinearY < 0)
    if(car.linearY < this.dimensions.border - this.dimensions.originY)
      this.dimensions.originY -= car.deltaLinearY;
}
