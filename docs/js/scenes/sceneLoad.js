class SceneLoad extends Phaser.Scene {
  constructor() {
    // 使用繼承父親的建構函式
    super("SceneLoad");
  }
  preload() {
    // 設置讀取監聽和載入進度文字和進度條
    this.bar = new Bar({
      scene: this,
      x: game.config.width / 2,
      y: game.config.height / 2,
    });
    this.progText = this.add.text(
      game.config.width / 2,
      game.config.height / 2,
      "0%",
      { color: "#ffffff", fontSize: game.config.width / 20 }
    );
    this.progText.setOrigin(0.5, 0.5);
    this.load.on("progress", this.onProgress, this);

    //load our images or sounds
    this.load.image("button1", "images/ui/buttons/2/1.png");
    this.load.image("title", "images/ui/title.png");

    this.load.image("button1", "images/ui/buttons/2/1.png");
    this.load.image("button2", "images/ui/buttons/2/5.png");
    this.load.image("button1", "images/ui/buttons/2/1.png");
    this.load.image("title", "images/ui/title.png");
    this.load.image("toggleBack", "images/ui/toggles/1.png");
    this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
    this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
    this.load.image("musicOn", "images/ui/icons/music_on.png");
    this.load.image("musicOff", "images/ui/icons/music_off.png");
    this.load.image("eroPic", "images/ero.jpg");
    this.load.image('maskPic', 'images/ero2.png');
  }

  create() {
    // 切換Scene
    console.log("Load done!");
    this.scene.start("SceneTitle");
  }

  onProgress(value) {
    this.bar.setPercentX(value);
    var per = Math.floor(value * 100);
    var outPer = per + "%";
    this.progText.setText(outPer);
    console.log(outPer);
  }
}
