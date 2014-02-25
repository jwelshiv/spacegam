var Util = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  collision: function(a, b) {
    var padding = 5
    return !(
        ((a.y + a.height) < (b.y + padding)) ||
        ((a.y - padding) > (b.y + b.height)) ||
        ((a.x + a.width) < b.x + padding) ||
        (a.x - padding > (b.x + b.width))
    )
  }
}

var Controller = function(){
  this.up = false
  this.down = false
  this.left = false
  this.right = false
}

var Game = {
  canvas: null,
  ctx: null,

  score: 0,

  ticks: 0,

  loopId: null,

  enemies: [],

  friction: 1.0,

  controller: new Controller(),

  player: new Player(),

  menu: $('#menu'),

  showMenu: function(){
    Game.menu.fadeIn(100)
    $('#score').hide();
  },

  hideMenu: function(){
    Game.menu.fadeOut(100)
    $('#score').show();
  },

  boot: function(){
    Game.canvas = $('#game')
    Game.canvas.attr({width: $(window).width(), height: $(window).height()})
    Game.ctx = Game.canvas[0].getContext("2d");
    Game.hideMenu()
    Game.paused = false
    Game.loop()
  },

  loop: function(){
    Game.loopId = requestAnimFrame(Game.loop)
    Game.render()
    Game.updateScore()
  },

  updateScore: function(){
    Game.ticks += 1
    if(Game.ticks % 100 == 0) Game.score += 1
    $('#score').text(Game.score)
  },

  render: function(){
    Game.clearScreen()
    updateEnemies()
    Game.player.update()
  },

  clearScreen: function(){
    Game.ctx.clearRect(0, 0, Game.canvas.width(), Game.canvas.height());
  },

  end: function(){
    Game.pause()
    Game.enemies = []
    Game.clearScreen()
    Game.menu.find('.score').text('Your last score was ' + Game.score)
    Game.score = 0
    Game.showMenu()
  },

  paused: true,

  pause: function(){
    if(Game.paused){
      Game.loop()
      Game.hideMenu();
      Game.paused = false
    } else {
      window.cancelAnimationFrame(Game.loopId)
      Game.showMenu();
      Game.paused = true
    }
  }
}


$(function(){

  $('a#start').on('click', function(e){
    Game.boot()
    return false;
  })

  // Controller bindings
  $(document).on('keydown', function(e){
    var key = e.which
    if(key == 38) Game.controller.up = true
    if(key == 40) Game.controller.down = true
    if(key == 37) Game.controller.left = true
    if(key == 39) Game.controller.right = true
  })

  $(document).on('keyup', function(e){
    var key = e.which
    if(key == 38) Game.controller.up = false
    if(key == 40) Game.controller.down = false
    if(key == 37) Game.controller.left = false
    if(key == 39) Game.controller.right = false
  })
})



// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
