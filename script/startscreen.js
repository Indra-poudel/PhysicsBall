class startscreen {
  constructor() {
    (this.guideIcon = {}),
      (this.settingIcon = {
        Top: 5,
        Bottom: 24,
        Left: 10,
        Right: 29
      }),
      (this.ballIcon = {
        x: undefined,
        y: undefined
      }),
      (this.bestscore = {
        x: undefined,
        y: undefined
      }),
      (this.recordIcon = {
        x: undefined,
        y: undefined
      });
    this.dragline = {
      Top: 460,
      Bottom: 575,
      Left: 29,
      Right: 350
    };
    this.fingerIcon = {
      x: undefined,
      y: undefined
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
