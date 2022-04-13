// 遊戲資料模組
class Model {
  constructor() {
    this._score = 0;
    this._soundOn = true;
    this._musicOn = true;
  }

  set musicOn(val) {
    this._musicOn = val;
    emitter.emit(GameConstants.MUSIC_CHANGED);
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(val) {
    this._soundOn = val;
  }

  get soundOn() {
    return this._soundOn;
  }

  // 設置分數方法
  set score(value) {
    this._score = value;
    console.log("Score update!Current value are " + this._score);
    emitter.emit(GameConstants.SCORE_UPDATED);
  }

  // 獲取分數方法
  get score() {
    return this._score;
  }
}
