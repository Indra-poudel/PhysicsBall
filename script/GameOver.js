class  GameOverScreen {
    constructor() {
    
      
      this.gameOverIcon={
        Top:396,
        Left:124,
        Right:226,
        Bottom:497,
      }
      
    }
  
    update = function() {};
    handleEvent = function()
    { 
    if(GameState.currentScreen===GameState.GameOverScreen)
    {
      if (
        this.gameOverIcon.Top < Mouse.position.y &&
        this.gameOverIcon.Bottom > Mouse.position.y &&
        this.gameOverIcon.Left < Mouse.position.x &&
        this.gameOverIcon.Right > Mouse.position.x
      ) {
        if (Mouse.leftDown == true) {
          console.log("restart");
            GameState.currentScreen=GameState.StartScreen;
          
        }
      }
  }
};
    draw = () => {
    var   score= localStorage.getItem("score");
    var  hscore= localStorage.getItem("Highscore");
      Canvas2D.drawImage(sprites.gameover, { x: 0, y: 0 }, 0, { x: 0, y: 0 });
    Canvas2D.drawText("Your score","40","White",{x:70,y:100});
    Canvas2D.drawText(score,"40","White",{x:150,y:150});
    Canvas2D.drawText("Highest Score","40","White",{x:70,y:250});
    Canvas2D.drawText(hscore,"40","White",{x:150,y:300});
    };
    initialize = () => {
      
      this.handleEvent();
      this.update();
      this.draw();
    };
  }
  