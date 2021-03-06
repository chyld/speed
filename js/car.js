(function(){
  var speed = chyld.speed;

  speed.car = function(x, y, theta, pivot_x, pivot_y){
    this.linearX = x;
    this.deltaLinearX = 0;
    this.linearY = y;
    this.deltaLinearY = 0;
    this.theta = theta;
    this.deltaTheta = 0;
    this.pivotX = pivot_x;
    this.pivotY = pivot_y;
    this.radius = Math.sqrt(Math.pow(this.pivotX, 2) + Math.pow(this.pivotY, 2));
    this.diameter = this.radius * 2;
    this.width = function(){ return this.image.width; }
    this.height = function(){ return this.image.height; }
    this.angularX = function(){ return this.radius + (this.radius * Math.cos(Math.deg2rad(180 + this.theta))); }
    this.angularY = function(){ return 0           + (this.radius * Math.sin(Math.deg2rad(180 + this.theta))); }
    this.x = function(){ return this.linearX + this.angularX(); }
    this.y = function(){ return this.linearY + this.angularY(); }
  }
})();
