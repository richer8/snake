// 1. 定义一个食物的构造函数
function Food(m) {
  // 食物的横向位置
  this.x = 0;
  // 食物的纵向位置
  this.y = 0; 
  // 创建一个div元素
  this.div = document.createElement('div');
  // 设置div的类名
  this.div.className = 'food';
  // 地图属性
  this.map = m;
  // 把div放进地图中
  this.map.appendChild(this.div);

}

// 2. 定义一个随机食物的方法放入原型中
Food.prototype.randomLoaction = function () { 
  // this代表谁？看将来的调用者。 this→调用者。


  // 将来横向的最大索引
  var maxX = 900 / 20 - 1;   
  // 将来纵向的最大索引
  var maxY = 600 / 20 - 1;

  // 随机出横向和纵向的位置索引
  //[0,maxX]
  var indexX = getIntNum(0, maxX);
  //[0,maxY]
  var indexY = getIntNum(0, maxY);
  // 计算位置,这里的x和y并不会直接影响div，而是保留下来为了将来和蛇头的位置对比。
  this.x = indexX * 20;
  this.y = indexY * 20;

  // 设置div的left和top值
  this.div.style.left = this.x + 'px';
  this.div.style.top = this.y + 'px';



};

// 获取n-m之间的随机数 [n,m]
function getIntNum(min, max) {
  // (max-min + 1) + min
  var num = parseInt(Math.random() * (max - min + 1) + min);
  return num;
}
