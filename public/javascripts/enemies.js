var Enemy = function(){
  this.x = Util.random(0, $(window).width())
  this.y = -64
  this.height = 64
  this.width = 64
  this.speed = Util.random(6, 12)

  this.img = $('<img>').attr('src', '/images/asteroid.64.png')[0]
}

Enemy.prototype.update = function(){
  this.y += this.speed
  Game.ctx.drawImage(this.img, this.x, this.y)
}

function updateEnemies(){
  if(Util.random(0,5) == 1){
    createEnemy()
  }

  // Move enemies
  for(i=0; i<Game.enemies.length; i++){
    var enemy = Game.enemies[i]
    if(Util.collision(Game.player, enemy)){
      Game.end()
    } else {
      enemy.update()
    }
  }
}

function createEnemy(){
  Game.enemies.push(new Enemy())
}

