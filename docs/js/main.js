var game; // 遊戲核心
var model; // 遊戲模組(資料)
var emitter; // 事件廣播者(類似呼叫監聽的對象?)
var GameConstants; // 遊戲常數資料(?)
var controller; // 遊戲(事件)控制器

window.onload = function () {
  // 判斷當前使用裝置是否為手機
  var isMobile = navigator.userAgent.indexOf("Mobile");
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }

  if (isMobile == -1) {
    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 640,
      parent: "phaser-game",
      scene: [SceneLoad, SceneTitle, SceneMain, SceneOver],
    };
  } else {
    var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "phaser-game",
      scene: [SceneLoad, SceneTitle, SceneMain, SceneOver],
    };
  }

  // 新建遊戲常數資料(?)
  GameConstants = new Constants();
  // 新建遊戲模組(資料)
  model = new Model();
  model.isMobile = isMobile;
  // 新建遊戲核心
  game = new Phaser.Game(config);
};
