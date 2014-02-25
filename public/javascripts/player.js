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
  this.animation = 'walkRight'
  this.lastFrame = new Date();
  this.animationFrame = 0;

  this.img = $('<img>').attr('src', '/images/link.png')[0]
}

Player.prototype.draw = function(){
  if(this.animation === null){
    Game.ctx.drawImage(this.img, this.x, this.y)
  } else {
    eval('this.' + this.animation + '()')
  }
}

Player.prototype.deltaLastFrame = function(){
  var delta = (new Date() - this.lastFrame) / 80
  return Math.floor(delta)
}

Player.prototype.walkRight = function(){
  var frameWidth = 30,
      frameHeight = 30,
      frames = 9

  if(this.deltaLastFrame() > 0){
    this.animationFrame = this.animationFrame >= frames ? 0 : this.animationFrame + 1
    this.lastFrame = new Date();
  }

  Game.ctx.drawImage(this.img, (55 + (this.animationFrame * frameWidth)), 47, frameWidth, frameHeight,
    this.x, this.y, frameWidth, frameHeight)
}

Player.prototype.walkDown = function(){
  var frameWidth = 23,
      frameHeight = 33,
      frames = 9

  if(this.deltaLastFrame() > 0){
    this.animationFrame = this.animationFrame >= frames ? 0 : this.animationFrame + 1
    this.lastFrame = new Date();
  }

  Game.ctx.drawImage(this.img, (62 + (this.animationFrame * frameWidth)), 13, frameWidth, frameHeight,
    this.x, this.y, frameWidth, frameHeight)
}

Player.prototype.update = function(){
  if(this.dy > 0) this.dy -= Game.friction
  if(this.dx > 0) this.dx -= Game.friction
  if(this.dx < 0) this.dx += Game.friction
  if(this.dy < 0) this.dy += Game.friction

  if(Game.controller.up)    this.dy -= this.accel
  if(Game.controller.down){
    this.dy += this.accel
    this.animation = 'walkDown'
  }
  if(Game.controller.left)  this.dx -= this.accel
  if(Game.controller.right){
    this.dx += this.accel
    this.animation = 'walkRight'
  }
  this.y += this.dy
  this.x += this.dx
  this.draw()
}
