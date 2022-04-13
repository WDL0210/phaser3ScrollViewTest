class Controller {
  constructor() {
    // 設置分數修改監聽事件
    emitter.on(GameConstants.SET_SCORE, this.setScore);
    emitter.on(GameConstants.SET_SCORE, this.sayFuck);
    // 設置分數增加監聽事件
    emitter.on(GameConstants.UP_POINTS, this.upPoints);
    // 設置音樂音效監聽事件
    emitter.on(GameConstants.TOGGLE_SOUND, this.toggleSound);
    emitter.on(GameConstants.TOGGLE_MUSIC, this.toggleMusic);
  }

  toggleSound(val) {
    model._soundOn = val;
  }

  toggleMusic(val) {
    model._musicOn = val;
  }

  // 設置分數委派方法，竟然去Set全域的變數...大概懂為什麼JS難維護了
  setScore(score) {
    model.score = score;
  }

  // 測試用方法，好奇JS的委派能否帶入不同參數型別的方法?
  // 測試上來說是可以的，不過若參數型別差異太大的話應該還是會出錯
  // 看來應該只適用多追加不需要參數的方法
  sayFuck() {
    console.log("Fuck UWU");
  }

  // 分數增加委派方法
  upPoints(points) {
    var score = model.score;
    score += points;
    model.score = score;
  }
}
