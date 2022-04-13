var emitter;

class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {
    //load our images or sounds
  }
  create() {
    {
      // // 網格資料建立
      // var gridConfig = { rows: 5, cols: 5, scene: this };
      // var alignGrid = new AlignGrid(gridConfig);
      // // 顯示網格
      // //alignGrid.show();
      // // 顯示網格及對應的數字索引
      // alignGrid.showNumbers();
      // // 測試圖片顯示
      // this.face = this.add.sprite(0, 0, "face");
      // // 將圖放至指定網格相對位置上
      // //alignGrid.placeAt(2, 2, this.face);
      // // 將圖放至指定網格索引位置上
      // alignGrid.placeAtIndex(7, this.face);
      // // 設置網格縮放比例
      // Align.scaleToGameW(this.face, 0.2);
    }
    // 按鈕事件測試相關
    {
      // 事件監聽器?
      // emitter = new Phaser.Events.EventEmitter();
      // // 按鈕UI測試
      // var fireText = { color: "black", fontSize: 30 };
      // var flatButton = new FlatButton({
      //   scene: this,
      //   key: "button1",
      //   text: "Fire!",
      //   x: 240,
      //   y: 100,
      //   event: "button_pressed",
      //   params: "fire_lasers",
      //   textConfig: fireText,
      // });
      // var flatButton2 = new FlatButton({
      //   scene: this,
      //   key: "button2",
      //   text: "Self Descruct!",
      //   x: 240,
      //   y: 300,
      //   event: "button_pressed",
      //   params: "self_descruct",
      // });
      // // Set Toggle Button.
      // var toggleButton = new ToggleButton({
      //   scene: this,
      //   backKey: "toggleBack",
      //   onIcon: "musicOn",
      //   offIcon: "musicOff",
      //   event: GameConstants.TOGGLE_MUSIC,
      //   x: 240,
      //   y: 450,
      // });
      // // Set btn event
      // emitter.on("button_pressed", this.buttonPressed, this);
    }

    var soundButtons = new SoundButtons({ scene: this });
  }

  // buttonPressed(params) {
  //   console.log(params);
  //   this.scene.start("SceneOver");
  // }

  update() {
    //constant running loop
  }
}
