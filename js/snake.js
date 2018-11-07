// 构造函数
function Snake(m, f) {
  // 蛇移动的方向 left  top right bottom
  this.direction = 'right';
  // 蛇的节数 蛇节中的第0个div是蛇头 后面其他的都是蛇身
  this.bodys = [];
  // 蛇的要追加的地图
  this.map = m;
  // 蛇要吃的食物
  this.food = f;
  // 生成蛇
  this.createBodys();
}

// 生成蛇
Snake.prototype.createBodys = function () {
  // 增加三个新蛇头，初始化为3节
  for (var i = 0; i < 3; i++) {
    this.insertNewHead();
  }


};

// 增加蛇头
Snake.prototype.insertNewHead = function () {
  // 创建一个div，表示新的蛇头
  var newHead = document.createElement('div');
  // 设置类名
  newHead.className = 'snake-head';
  // 计算新蛇头的位置
  var location = this.getNewHeadLoaction();
  // 把计算好的位置设置给新蛇头元素
  newHead.style.left = location.left + 'px';
  newHead.style.top = location.top + 'px';
  // 把新蛇头放入地图中
  this.map.appendChild(newHead);
  // 获取旧的蛇头，看是否存在，若存在，把旧的蛇头改为身体
  var oldHead = this.bodys[0];
  if (oldHead != undefined) {
    oldHead.className = 'snake-body';
  }

  // 把新蛇节放到蛇的bodys中
  this.bodys.unshift(newHead);
};

// 计算新蛇头的位置，返回两个数据
Snake.prototype.getNewHeadLoaction = function () {
  // 定义两个变量，分别表示计算后新蛇头的位置
  var x = 0; y = 0;
  // 判断是否有蛇头
  var oldHead = this.bodys[0];
  // 若没有蛇头，将来返回 {left:0,top:0}
  if (oldHead == undefined) {
    return { left: x, top: y };
  }
  // 有蛇头，则计算。 获取原有蛇头的位置
  x = oldHead.offsetLeft;
  y = oldHead.offsetTop;
  // 根据蛇移动的方向计算
  switch (this.direction) {
    case 'left':
      x = x - 20;
      break;
    case 'right':
      x = x + 20;
      break;
    case 'bottom':
      y = y + 20;
      break;
    case 'top':
      y = y - 20;
      break;
  }

  return { left: x, top: y };


};

// 蛇移动方法
Snake.prototype.move = function(){
  // 1. 计算新蛇头的位置
  var obj = this.getNewHeadLoaction();
  // 1.1 判断蛇头的位置是否已经越过边界
  if (obj.left < 0 || obj.left == 900 || obj.top < 0 || obj.top == 600) {
    alert('想不开死了');
    return true;  // 这里的返回值，主要高速定时器，蛇是否死了
  }
  // 2. 从蛇的bodys中取出最后节 pop()
  var last = this.bodys.pop();
  // 3. 设置最后一节的类名为蛇头 snake-head
  last.className = 'snake-head';
  // 4. 获取旧的蛇头
  var oldHead = this.bodys[0];
  // 5. 把旧的蛇头改为身体       snake-body
  oldHead.className = 'snake-body';
  // 6. 把最后一节追加到数组的最前面
  this.bodys.unshift(last);
  // 7. 把新蛇头的位置赋值给最后一节的left和top样式
  last.style.left = obj.left + 'px';
  last.style.top = obj.top + 'px';


  // 8 判断蛇有没有吃到食物
  if (obj.left == this.food.x && obj.top == this.food.y) {
    // console.log('吃了')
    // 8.1 蛇要增加一节
    this.insertNewHead();
    // 8.2 食物要随机一下位置
    this.food.randomLoaction();
  }

  return false;
}