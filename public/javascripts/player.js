var Player = function(){
  this.dx = 0
  this.dy = 0
  this.height = 64
  this.width = 64
  this.x = 0
  this.y = $(window).height() - this.height - 50
  this.accel = 1
  this.maxspeed = 0
  this.$el = $('#player')

  this.img = $('<img>').attr('src', '/images/ship.png')[0]
}

Player.prototype.draw = function(){
  Game.ctx.drawImage(this.img, this.x, this.y)
}

Player.prototype.update = function(){
  if(this.dy > 0) this.dy -= Game.friction
  if(this.dx > 0) this.dx -= Game.friction
  if(this.dx < 0) this.dx += Game.friction
  if(this.dy < 0) this.dy += Game.friction

  if(Game.controller.up)    this.dy -= this.accel
  if(Game.controller.down)  this.dy += this.accel
  if(Game.controller.left)  this.dx -= this.accel
  if(Game.controller.right) this.dx += this.accel
  this.y += this.dy
  this.x += this.dx
  this.draw()
}
