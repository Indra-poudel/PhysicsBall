class selectBall {
    constructor() {
      (this.ball1 = {
       x:15,
       y:68
      }),
        (this.ball2 = {
         
         x:134,
         y:68
        });
        this.backicon={
           x:15,
           y:18
        }
        this.selectedball={
            x:308,
            y:18
        }
        this.whiteball={
            x:55,
            y:110
        }
        this.redball={
            x:175,
            y:110
        }
      
    }
  
    update = function() {};
    handleEvent = function() {
    //------event handling in startscreen like touch drag based on the mousex and mouse y pos----
    // 1)--- click detection for setting icon in startscreen-----
  
    if(GameState.currentScreen===GameState.BallSelectScreen)
    {
      if (
        this.ball1.y < Mouse.position.y &&
        this.ball1.y+ sprites.selectedBall.height > Mouse.position.y &&
        this.ball1.x < Mouse.position.x &&
        this.ball1.x+  sprites.selectedBall.width> Mouse.position.x
      ) {
        if (Mouse.leftDown == true) {
            console.log("White ball");
            ballSelect[0]=ballSelect[1];
          
        }
      }
      if (
        this.ball2.y < Mouse.position.y &&
        this.ball2.y+ sprites.selectedBall.height > Mouse.position.y &&
        this.ball2.x < Mouse.position.x &&
        this.ball2.x+  sprites.selectedBall.width> Mouse.position.x
      ) {
        if (Mouse.leftDown == true) {
          console.log("Red Ball");
            ballSelect[0]=ballSelect[2];   
        }  
      }
      if (
        this.backicon.y < Mouse.position.y &&
        this.backicon.y+ sprites.backIcon.height > Mouse.position.y &&
        this.backicon.x < Mouse.position.x &&
        this.backicon.x+  sprites.backIcon.width> Mouse.position.x
      ) {
        if (Mouse.leftDown == true) {
         
            GameState.currentScreen=GameState.StartScreen;
            
          
        }
        
      }
    }
      // ending of 2)--------------------------------------------------
    };
    draw = () => {
      Canvas2D.DrawRect("Black");
      Canvas2D.drawImage(sprites.backIcon, {x:0,y:0}, 0, this.backicon);
      if(ballSelect[0]==ballSelect[1])
      {
      Canvas2D.drawImage( sprites.selectedBall, {x:0,y:0}, 0, this.ball1);
      Canvas2D.drawBall(8, this.whiteball, ballSelect[1])
    }
      else
      {
        Canvas2D.drawImage( sprites.unselectedBall, {x:0,y:0}, 0,this.ball1);
        Canvas2D.drawBall(8, this.whiteball , ballSelect[1])
      }
      if(ballSelect[0]==ballSelect[2])
      {
      Canvas2D.drawImage( sprites.selectedBall, {x:0,y:0}, 0, this.ball2);
      Canvas2D.drawBall(8, this.redball , ballSelect[2])
    }
      else
      {
        Canvas2D.drawImage( sprites.unselectedBall, {x:0,y:0}, 0, this.ball2);
        Canvas2D.drawBall(8, this.redball , ballSelect[2])
      }
    };
    initialize = () => {
      
      this.handleEvent();
      this.update();
      this.draw();
    };
  }
  