class MediaManager {
  constructor(config) {
    this.scene = config.scene;
    emitter.on(GameConstants.PLAY_SOUND, this.playSound, this);
    emitter.on(GameConstants.MUSIC_CHANGED, this.musicChanged, this);
  }

  musicChanged() {
    if (this.bgm) {
      if (model.musicOn === false) {
        this.bgm.stop();
      } else {
        this.bgm.play();
      }
    }
  }

  playSound(key) {
    if (model.soundOn === true) {
      var sound = this.scene.sound.add(key);
      sound.play();
    }
  }

  setBackGroundMusic(key) {
    if (model.musicOn === true) {
      this.bgm = this.scene.sound.add(key, { volume: 0.5, loop: true });
      this.bgm.play();
    }
  }
}
