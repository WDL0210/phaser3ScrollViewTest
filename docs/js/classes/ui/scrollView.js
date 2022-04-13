/**
 *  config {
 *    scene: scene,
 *    maskPic: image,
 *    x: number,
 *    y: number,
 *    background: image,
 *    height: number,
 *    width: number,
 *    scrollMode: 0or1, << 0 v scroll 1 h scroll
 *    ContenChilds: Array(childObject),
 *    orientation: 'x'or'y', << x h sort, y v sort
 *    space: {
 *      item: number,
 *      top: number,
 *      bottom: number,
 *    },
 *    childClickFn: function,
 *  }
 */
class ScrollView extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    // Create mask
    this.maskBG = config.maskPic;
    this.maskBG.setVisible(false);
    this.mask = this.maskBG.createBitmapMask();

    // Create Scroll view
    var bg = config.background;

    // Add Sizer
    this.targetSizer = this.CreatePanel(config.ContenChilds,
      config.orientation,
      config.space);
    this.panel = this.scene.rexUI.add.scrollablePanel({
        x: config.x,
        y: config.y,
        background: bg,
        height: config.height,
        width: config.width,
        scrollMode: config.scrollMode,
        panel: {
          child: this.targetSizer,
          mask: false,
        },
    }).layout();
    // Create child click event
    this.panel.setChildrenInteractive({
        target: this.targetSizer,
    }).on("child.click", config.childClickFn);

    // Set oject to container
   
    this.add(this.targetSizer);
    this.add(this.maskBG);
    if (bg) {
      this.add(this.panel.children[0]);
      //this.scene.add.existing(this.panel.children[0]);
    }
    // Let sizer's child be add to container
    let contentChildrens = this.targetSizer.children;
    let childCount = contentChildrens.length;
    console.log(childCount);
    for (let i = 0; i < childCount; i ++) {
        let contentChild = this.targetSizer.children[i];
        // Set mask
        contentChild.setMask(this.mask);
        // Set to container
        this.add(contentChild);
    }
    
    // Set rexScrollableBlock to container
    this.add(this.panel.childrenMap.child);
    this.scene.add.existing(this);
    this.UpdateScrollViewPosition();
  }

  CreatePanel(childs, _orientation, _space) {
    var panel = this.scene.rexUI.add.sizer({
      orientation: _orientation,
      space: _space,
    });

    let childCount = childs.length;
    for (let i = 0; i < childCount; i++) {
      panel.add(childs[i]);
    }

    return panel;
  }

  // Every time this container change postion need call this function.
  UpdateScrollViewPosition() {
    this.mask.bitmapMask.x = this.x + this.panel.x;
    this.mask.bitmapMask.y = this.y + this.panel.y;
  }

  // Every time this container change scale need call this function.
  UpdateScrollViewScale() {
    this.mask.bitmapMask.scale = this.scale;
  }
}
