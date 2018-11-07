// 游戏构造函数

function Game(m) {
  
  // 游戏中的食物
  this.food = new Food(m);
  // 游戏中的蛇
  this.snake = new Snake(m, this.food);
}

// 开始方法
Game.prototype.start = function () {
  //0. 随机一下食物
  this.food.randomLoaction();
  // this → game
  var snake = this.snake;
  // 1. 开启定时器，让蛇不断的移动
  var flag = window.setInterval(function () {
    // 2. 调用蛇的move方法
    var isDead = snake.move();
    console.log(isDead);
    // 判断是否死了
    if (isDead) {
      clearInterval(flag);
    }
  }, 100);

  // 给文档注册键盘按下事件
  document.onkeydown = function (e) {
    // 获取键码值
    var code = e.keyCode;
    // 判断四种情况，更改蛇的方向,先判断蛇的移动方向
    switch (code) {
      case 37: // 左侧
        if (snake.direction != 'right') {
          snake.direction = 'left';
        }
        break;
      case 38: // 上侧
        snake.direction = 'top';
        break;
      case 39: // 右侧
        snake.direction = 'right';
        break;
      case 40: // 下侧
        snake.direction = 'bottom';
        break;
    }
  };

};