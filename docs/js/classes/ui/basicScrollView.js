class BasicScrollView extends Phaser.GameObjects.Container {
  /**
   * 
   * @param {object} config
   * {
   *    scene: gameScene,
   *    x: number,
   *    y: number,
   *    widht: number,
   *    height: number,
   *    scaleX: number,
   *    scaleY: number,
   *    testShowArea: boolen,
   *    childs: array(gameObject),
   *    childHeight: number,
   *    distenceFromCenter: number,
   *    space: number,
   *    scrollSpeed: number,
   * } 
   * 
   * 如果不知道子物件的高度且剛好子物件是container類型的話可以利用getBounds方法查找高度
   */
    constructor(config) {
      super(config.scene);

      this.scene = config.scene;
      this.posX = config.x;
      this.posY = config.y;
    
      this.scaleX = config.scaleX;
      this.scaleY = config.scaleY;
      this.displayPosX = this.posX * this.scaleX; 
      this.displayPosY = this.posY * this.scaleY;
      // Set position
      this.setPosition(this.displayPosX, this.displayPosY);
      // Create Graphics
      this.width = config.width * this.scaleX;
      this.height = config.height * this.scaleY;
      var rect =  new Phaser.Geom.Rectangle(this.displayPosX, this.displayPosY, this.width, this.height);
      this.graphics = this.scene.add.graphics({fillStyle: { color: 0x000000 }});
      if (!config.testShowArea) {
        this.graphics.alpha = 0.0001;
      }
      this.graphics.fillRectShape(rect);
      // Set graphics interactive
      this.graphics.setInteractive({
        draggable: true ,
        useHandCursor: true,
        hitArea: new Phaser.Geom.Rectangle(this.displayPosX, this.displayPosY, this.width, this.height),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      });
      console.log(this.graphics);


      // Add block interactive graphics
      var blockBottomRect =  new Phaser.Geom.Rectangle(this.displayPosX, this.displayPosY+this.height, this.width, this.height);
      this.blockBottomGraphics = this.scene.add.graphics({fillStyle: { color: 0x009900 }});
      this.blockBottomGraphics.fillRectShape(blockBottomRect);
      this.blockBottomGraphics.alpha = 0.001;
      this.blockBottomGraphics.depth = 1;

      var blockTopRect =  new Phaser.Geom.Rectangle(this.displayPosX, this.displayPosY-this.height, this.width, this.height);
      this.blockTopGraphics = this.scene.add.graphics({fillStyle: { color: 0x009900 }});
      this.blockTopGraphics.fillRectShape(blockTopRect);
      this.blockTopGraphics.alpha = 0.001;
      this.blockTopGraphics.depth = 1;
      
      // Add graphics trigger event
      this.graphics.on('drag', (pointer) => {
        var objPosY = this.posY * this.scaleY;
        var minH = objPosY;
        var maxH = objPosY +  this.height;
        var currentPosY = pointer.position.y;
        var lastPosY = pointer.prevPosition.y;
        var result = Math.sign(currentPosY - lastPosY);
        var dir = 999;
        if (result ==1 && currentPosY < maxH)
        {
          dir = 1;
        }
        else if (result == -1 && currentPosY > minH && currentPosY < maxH) {
          dir = -1;
        }

        this.Scrolling(dir);
      }, this);
      
      // Set mask
      this.mask = this.graphics.createGeometryMask();
   
      // Put child to content
      this.childs = config.childs;
      this.childHeight = config.childHeight;
      this.space = config.space;
      this.distenceFromCenter = 0;
      if (config.distenceFromCenter)
      {
        this.distenceFromCenter = config.distenceFromCenter;
      }
      this.scrollContentTop = this.distenceFromCenter; 
      this.childGroup = this.scene.add.container(0,0);
      this.childGroup.setPosition(this.width*0.5/this.scaleX, 0);
      this.moveFloor = 0; // 判斷容器的最高點，算的是容器物件的本地座標
      if (this.childs != null && this.childs != undefined) {
        this.SetChild(this.childs);
      }
      this.scrollSpeed = config.scrollSpeed;

      this.scene.add.existing(this);
      this.add(this.childGroup);
    }

    SetChild(childs) {
      const childCount = childs.length;

      // Set scroll content height
      let posY = this.scrollContentTop;
      for (let i =0; i < childCount; i++) {
        let child = childs[i];    
        child.setPosition(0, posY)
        child.setMask(this.mask);
        this.childGroup.add(child);
        posY+= this.space + this.childHeight;
      }
      
      this.scrollContentHeight = (((this.childHeight*0.5)*childCount+1) +(childCount) * this.space) -this.moveFloor;  
    }

    /**
     * 這邊只會把原捲動容器內的子物件從容器中移除，並不會做銷毀的行為
     * 使用此方法更換容器內物件時，記得自行處理舊的子物件。
     */
    ChangeChild(childs) {
      // Clear old childs
      this.childGroup.removeAll();
      this.childs = childs;
      const childCount = childs.length;
      let posY = this.scrollContentTop;
      for (let i = 0;i < childCount; i++) {
        let child = childs[i];
        child.setPosition(0, posY);
        child.setMask(this.mask);
        this.childGroup.add(child);
        posY+= this.space + this.childHeight;
      }
      this.scrollContentHeight = (((this.childHeight*0.5)*childCount+1) +(childCount) * this.space) -this.moveFloor;
    }

    Scrolling(dir) {
      if (dir == -1) {
        if (this.childGroup.y < -this.scrollContentHeight)
        {
          return;
        }
        this.childGroup.y -=1 * this.scrollSpeed;
        if (this.childGroup.y < -this.scrollContentHeight)
        {
          this.childGroup.y =-this.scrollContentHeight;
        }
        this.ObjectHideCheck(true);
      }
      else if (dir == 1) {
        if (this.childGroup.y > this.moveFloor) {
          return;
        }
        this.childGroup.y +=1 * this.scrollSpeed;
        if (this.childGroup.y > this.moveFloor) {
          this.childGroup.y=this.moveFloor;
        }
        this.ObjectHideCheck(false);
      }
    }

    ObjectHideCheck(upCheck){
      const childCount = this.childs.length;
      let rootY = this.y + this.childGroup.y * this.scaleY;
      let halfChildHeight = this.childHeight * 0.5 * this.scaleY;
      let scrollViewBottom = this.y + this.height;

      for(let i = 0; i < childCount; i++) {
        let childObj = this.childs[i];
        let checkY = rootY + (this.distenceFromCenter * this.scaleY)
        + ((this.childHeight + this.space) * i * this.scaleY);
        let visible = true;

        if (upCheck) {
          checkY += halfChildHeight;
          if (checkY < this.y) {
            visible = false;
          }
        }
        else {
          checkY -= halfChildHeight;
          if (checkY > scrollViewBottom) {
            visible = false;
          }
        }
        childObj.visible = visible; 
      }
    }

    Show() {
      this.graphics.setInteractive();
      this.SetChildsVisible(true);
    }

    Hide() {
      this.graphics.disableInteractive();
      // Hide childs
      this.SetChildsVisible(false);
    }

    SetChildsVisible(bool) {
      if (this.childs != null) {
        const childLength = this.childs.length;
        for (let i = 0; i < childLength; i++) {
          const child = this.childs[i];
          child.visible = bool;
        }
      }
    }
  }
  