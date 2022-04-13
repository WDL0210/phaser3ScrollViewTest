class ScoreBox extends Phaser.GameObjects.Container {
  // 繼承自Phaser的Container Class

  constructor(config) {
    super(config.scene); // 填入父親建構涵式參數
    // 設置建構函式填入參數之Scene
    this.scene = config.scene;
    {
      // 分數UI建立
      this.text1 = this.scene.add.text(0, 0, "Score: 0");
      // 設置UI顯示中心點
      this.text1.setOrigin(0.5, 0.5);
      // 加入至容器中
      this.add(this.text1);
    }

    // 將容器物件顯示在Scene上
    this.scene.add.existing(this);

    // 委派事件登入
    emitter.on(GameConstants.SCORE_UPDATED, this.scoreUpdate, this);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  scoreUpdate() {
    this.text1.setText("Score: " + model.score);
  }
}
