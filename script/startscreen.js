class startscreen {
  constructor() {
    (this.guideIcon = {
      Top: 5,
      Bottom: 24,
      Left: 320,
      Right: 340
    }),
      (this.settingIcon = {
        Top: 5,
        Bottom: 24,
        Left: 10,
        Right: 29
      }),
      (this.SelectballIcon = {
        Top: 325,
        Bottom:374,
        Left: 0,
        Right: 690
      }),
      (this.recordIcon = {
        Top: 384,
      Bottom:434 ,
      Left: 0,
      Right: 690
      });
    this.dragline = {
      Top: 460,
      Bottom: 575,
      Left: 29,
      Right: 350
    };
  }

  update = function() {};
  handleEvent = function() {
  //------event handling in startscreen like touch drag based on the mousex and mouse y pos----
  // 1)--- click detection for setting icon in startscreen-----

  if(GameState.currentScreen===GameState.StartScreen)
  {
    if (
      this.settingIcon.Top < Mouse.position.y &&
      this.settingIcon.Bottom > Mouse.position.y &&
      this.settingIcon.Left < Mouse.position.x &&
      this.settingIcon.Right > Mouse.position.x
    ) {
      if (Mouse.leftDown == true) {
        console.log("Setting Screen");
          GameState.currentScreen=GameState.settingIcon;
        
      }
    }
    if (
      this.guideIcon.Top < Mouse.position.y &&
      this.guideIcon.Bottom > Mouse.position.y &&
      this.guideIcon.Left < Mouse.position.x &&
      this.guideIcon.Right > Mouse.position.x
    ) {
      if (Mouse.leftDown == true) {
        console.log("Guide Screen");
          GameState.currentScreen=GameState.GameGuideScreen;
        
      }
    }
    if (
      this.SelectballIcon.Top < Mouse.position.y &&
      this.SelectballIcon.Bottom > Mouse.position.y &&
      this.SelectballIcon.Left < Mouse.position.x &&
      this.SelectballIcon.Right > Mouse.position.x
    ) {
      if (Mouse.leftDown == true) {
        console.log("Select ball Screen");
          GameState.currentScreen=GameState.BallSelectScreen;
        
      }
    }
    // if (
    //   this.recordIcon.Top < Mouse.position.y &&
    //   this.recordIcon.Bottom > Mouse.position.y &&
    //   this.recordIcon.Left < Mouse.position.x &&
    //   this.recordIcon.Right > Mouse.position.x
    // ) {
    //   if (Mouse.leftDown == true) {
    //     console.log("record Screen");
    //       GameState.currentScreen=GameState.RecordScreen;
        
    //   }
    }
    // ending of 1)--------------------------------
    // 2) ------drag detection in stratscreen -----------
    if (
      this.dragline.Top < Mouse.position.y &&
      this.dragline.Bottom > Mouse.position.y &&
      this.dragline.Left < Mouse.position.x &&
      this.dragline.Right > Mouse.position.x
    ) {
      if (Mouse.leftDown == true) {
        if (Mouse.clickedPos.x + 50 < Mouse.position.x) {
            console.log("GamePlayScreen");
           
          GameState.currentScreen=GameState.GamePlayScreen;
            
        }
      }
    }
}
    // ending of 2)--------------------------------------------------
  };
  draw = () => {
    Canvas2D.drawImage(sprites.background, { x: 0, y: 0 }, 0, { x: 0, y: 0 });
  };
  initialize = () => {
    
    this.handleEvent();
    this.update();
    this.draw();
  };
}
