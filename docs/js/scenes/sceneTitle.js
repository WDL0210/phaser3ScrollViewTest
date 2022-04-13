const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class SceneTitle extends Phaser.Scene {
  constructor() {
    super("SceneTitle");
  }

  create() {
    // 事件監聽器?初始化事件監聽器
    emitter = new Phaser.Events.EventEmitter();
    var bg = this.add.image(0,0,'eroPic').setOrigin(0);
    bg.displayWidth = 800;
    bg.displayHeight=640;
    var halfBg = this.add.image(0,0,'eroPic').setOrigin(0);
    halfBg.displayWidth = 800*0.5;
    halfBg.displayHeight= 640 *0.5;

    // Test
    // var btnA = new FlatButton({
    //   scene: this,
    //   key: "button2",
    //   text: 'Change shit!',
    //   x: 200,
    //   y: 160,
    //   event: "button_pressed3",
    //   params: 'Open Shit!',
    // }); 
    // emitter.on("button_pressed3", this.ScrollChildChange, this);

    // this.emptyImage = this.add.image(200, 160);
    // console.log(this.emptyImage);
    // this.emptyImage.texture = Phaser.Cache.DEFAULT;

    // Scroll add
    this.btns = new Array(5);
    for (let i = 0;  i < 5; i++) {
      var btn = new FlatButton({
          scene: this,
          key: "button2",
          text: "Self Descruct!"+i.toString(),
          x: 0,
          y: 0,
          event: "button_pressed",
          params: "Hola"+i.toString(),
        }); 
        this.btns[i] = btn;
    }
    emitter.on("button_pressed", this.buttonPressed, this);
    this.testSAP = new BasicScrollView({
        scene: this,
        x: 400,
        y: 320,
        width: 400,
        height: 320,
        scaleX: 0.5,
        scaleY: 0.5,
        testShowArea: true,
        childs: this.btns,
        childHeight: 30,
        distenceFromCenter: 75,
        space: 50,
        scrollSpeed: 5,
    });
    
    // Test add
    var testBTN = new FlatButton({
      scene: this,
      key: "button2",
      text: 'Add child',
      x: 400,
      y: 320,
      event: "add",
      params: 'Open Getter!',
    }); 
    emitter.on("add", this.ScrollAddChild, this);
    // Test remove
    var testBTN2 = new FlatButton({
      scene: this,
      key: "button2",
      text: 'Remove child',
      x: 400,
      y: 500,
      event: "remove",
      params: 'Open Getter!',
    }); 
    emitter.on("remove", this.ScrollRemoveChild, this);
    this.events.on('chatsubo', this.handler, this);
    console.log(this.events);
    console.log(Phaser.Events.EventEmitter);
    this.events.emit('chatsubo');
  }

  buttonPressed(params) {
    console.log(params);
  }

  ScrollAddChild(params) {
    console.log(params);

    // new btn
    var btn = new FlatButton({
      scene: this,
      key: "button2",
      text: "Self Descruct! new".toString(),
      x: 0,
      y: 0,
      event: "button_pressed",
      params: "Hola new btn",
    }); 

    this.btns.push(btn);
    console.log(this.btns.length);
    this.testSAP.ChangeChild(this.btns);
  }

  ScrollRemoveChild(params) {
    const childCount = this.btns.length;
    if (childCount == 0) {return;}

    this.btns.splice(childCount-1, 1);
    console.log(this.btns);

    this.testSAP.ChangeChild(this.btns);
  }

  handler ()
    {
        console.log('test event call');
    }
}