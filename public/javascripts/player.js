var Player = function(){
  this.dx = 10
  this.dy = 10
  this.height = 64
  this.width = 64
  this.x = 0
  this.y = $(window).height() - this.height - 50
  this.accel = 2
  this.maxspeed = 20
  this.speed = 0
  this.$el = $('#player')
  this.animation = 'walkRight'
  this.lastFrame = new Date();
  this.animationFrame = 0;

  this.img = $('<img>').attr('src', '/images/link.large.png')[0]
}

Player.prototype.draw = function(){
  if(this.animation === null){
    Game.ctx.drawImage(this.img, 0, 0, 60, 80,
      this.x, this.y, 60, 80)
  } else {
    if(this.deltaLastFrame() > 0){
      this.animationFrame = this.animationFrame >= 1 ? 0 : this.animationFrame + 1
      this.lastFrame = new Date();
    }
    if(this.speed < 1) this.animationFrame = 0
    eval('this.' + this.animation + '()')
  }
}

Player.prototype.deltaLastFrame = function(){
  var delta = (new Date() - this.lastFrame) / 100
  return Math.floor(delta)
}

Player.prototype.walkRight = function(){
  var frameWidth = 60, frameHeight = 80
  Game.ctx.drawImage(this.img, (0 + (this.animationFrame * frameWidth)), 80, frameWidth, frameHeight,
    this.x, this.y, frameWidth, frameHeight)
}

Player.prototype.walkDown = function(){
  var frameWidth = 60, frameHeight = 80

  Game.ctx.drawImage(this.img, (0 + (this.animationFrame * frameWidth)), 0, frameWidth, frameHeight,
    this.x, this.y, frameWidth, frameHeight)
}

Player.prototype.walkUp = function(){
  var frameWidth = 60, frameHeight = 80

  Game.ctx.drawImage(this.img, (0 + (this.animationFrame * frameWidth)), 160, frameWidth, frameHeight,
    this.x, this.y, frameWidth, frameHeight)
}

Player.prototype.update = function(){
  if(this.dy > 0) this.dy -= Game.friction
  if(this.dx > 0) this.dx -= Game.friction
  if(this.dx < 0) this.dx += Game.friction
  if(this.dy < 0) this.dy += Game.friction

  if(this.speed < this.maxspeed){
    if(Game.controller.up){
      this.dy -= this.accel
      this.animation = 'walkUp'
    }
    if(Game.controller.down){
      this.dy += this.accel
      this.animation = 'walkDown'
    }
    if(Game.controller.left)  this.dx -= this.accel
    if(Game.controller.right){
      this.dx += this.accel
      this.animation = 'walkRight'
    }
  }

  this.speed = this.dy > 0 ? this.dy : (this.dy < 0) ? this.dy*(-1) : 0
  this.speed = this.dx > 0 ? this.dx : (this.dx < 0) ? this.dx*(-1) : this.speed

  this.y += this.dy
  this.x += this.dx

  this.draw()
}
