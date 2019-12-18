class Game {
  constructor() {
    this.Ballinitialposition = { x: 175, y: 95 };
    this.noOfrow=1;  
    this.startscreen = new startscreen();
    this.gameOverscreen=new GameOverScreen();
    this.spritesStillLoading = 0;
    Mouse.initialize();
    Canvas2D.initialize();  
    this.MaxNoinOneLine=6;
    this.AllpolygonArray=[];
    this.ballarray=[];
    this.newballarray=[];
    this.ballNo=2;
    this.shootingAngle = undefined;
    this.isFired = false;
    this.generateLineOfpolygon();
    this.generateball();
    this.score=0;
  
    this.dotLine = {
      position: {
        Targetx: undefined,
        Targety: undefined
      },
      dotArray: []
    };

    
  }

 
  CheckIfAllBallsGoesUp=()=>
  {
  //  for(var i=0;i<this.ballarray.length;i++)
  //  {
  //    var temp=i;

  //    if(this.ballarray[temp].position.x==this.Ballinitialposition.x)
  //    {
  //      return false;
  //    }
     
  //  }
  //  return true
   
  if(this.ballarray[this.ballarray.length-1].increasedflag>this.noOfrow)
    {
       return true;
    }
    else false;
     
  }

  calculateAngle = (ball,target) => {
    var ballx = ball.x;
    var bally = ball.y;
    var targetx = target.Targetx;
    var targety = target.Targety;
    var dx = targetx - ballx;
    var dy = targety - bally;
    var angle = Math.atan2(dy, dx);
    this.shootingAngle = angle;
    return angle;
  };

  drawDotted = () => {
   // console.log("calling 2nd")
    if (this.isFired == false) {
      for (var i = 0; i < this.dotLine.dotArray.length; i = i + 20) {
        var x = {
          position: {
            x: this.dotLine.dotArray[i].x,
            y: this.dotLine.dotArray[i].y
          }
        };
        Canvas2D.drawBall(8 - 3, x.position, "#ffffff");
      }
    }
  };


  generateball=()=>
  {
    if(this.ballarray.length==0)
    {
    for (var i=0;i<this.ballNo;i++)
    {
      
      var ball=new Ball();
      this.ballarray.push(ball);
    }
  }else if(this.ballarray.length>0)
  {
   
  }

  }
  generateLineOfpolygon=()=>{

    var seatindex=[1,2,3,4,5,6];
    var polygonArray=[];
    var No_in_Oneline=Math.floor(Math.random()*3)+2;  
    for(var i=0;i< No_in_Oneline;i++)
    {
      var index=Math.floor(Math.random()*seatindex.length);
      var item = seatindex[index];
     var startpos=(item)*50;
      var polygon= new Polygon(startpos);
      polygonArray.push(polygon);
      seatindex.splice(index, 1);
    }
    this.AllpolygonArray.unshift(polygonArray);  
  }

  loadAssets = () => {

    var spriteFolder = "../images/";
    sprites.background = this.loadSprite(spriteFolder+"StartScreen.png");
    sprites.gameplay=this.loadSprite(spriteFolder+"gameplay.png");
    sprites.gameover=this.loadSprite(spriteFolder+"gameover.png");
    sprites.fan=this.loadSprite(spriteFolder+"fan.png");
    sprites.life=this.loadSprite(spriteFolder+"life.png");
 
  }

  loadSprite = imageName => {

    var image = new Image();
    image.src = imageName;
    this.spritesStillLoading += 1;
    image.onload = () => {
      this.spritesStillLoading -= 1;
    };
    return image;

  };

  assetLoadingLoop = () => {

    if (this.spritesStillLoading > 0) {
      console.log("loading...");
      window.requestAnimationFrame(this.assetLoadingLoop);
    } else {
      console.log("loaded");
      this.mainloop();
    }
 
  };

  strat = () => {

    this.loadAssets();
    this.assetLoadingLoop();
 
  };

  draw = () => {

   // Canvas2D.clearCanvas();

   if(GameState.currentScreen==GameState.GameOverScreen)
   {
     this.gameOverscreen.initialize();
     this.reset();
   }
    if (GameState.currentScreen == GameState.StartScreen) {    
      this.startscreen.initialize();
    }
    if(GameState.currentScreen==GameState.GamePlayScreen)
    {
      gameplay.initialize();
      for(var j=0;j<this.AllpolygonArray.length;j++)
      {
        for(var i=0;i<this.AllpolygonArray[j].length;i++)
        {      
          this.AllpolygonArray[j][i].initialize(); 
        // console.log("side array", this.AllpolygonArray[0][0].sideArray);
        }   
      }
     // ball.initialize();
     for (var i=0;i<this.ballarray.length;i++)
      {
     
      this.ballarray[i].initialize();
      }
    this.drawDotted();
    }
    
  
  };

  reset=()=>{
   // this.MaxNoinOneLine=6;
   this.score=0;
   this.noOfrow=1;  
    this.AllpolygonArray=[];
    this.ballarray=[];
    this.ballNo=2;
    this.shootingAngle = undefined;
    this.isFired = false;
    this.dotLine = {
      position: {
        Targetx: undefined,
        Targety: undefined
      },
      dotArray: []
    };
    this.generateball();
    this.generateLineOfpolygon();
    
  }

  update=()=> {
    if(GameState.currentScreen==GameState.GamePlayScreen)
    {
    for(var j=0;j<this.AllpolygonArray.length;j++)
    {
      for(var i=0;i<this.AllpolygonArray[j].length;i++)
      {  
        for(var k=0;k<this.ballarray.length;k++)
        {
          if(this.AllpolygonArray[j][i].properites.y<this.Ballinitialposition.y+20)
          {
            GameState.currentScreen=GameState.GameOverScreen;
            break;
          }
          if(this.AllpolygonArray[j][i].checkCollision(this.ballarray[k]))
          {
            
            var dx = this.AllpolygonArray[j][i].properites.x - this.ballarray[k].position.x;
            var dy = this.AllpolygonArray[j][i].properites.y - this.ballarray[k].position.y;
            var angle = Math.atan2(dy, dx);
            this.ballarray[k].xunit= Math.cos(360-angle)*this.ballarray[k].xunit;
            // this.ballarray[k].xunit=this.ballarray[k].xunit*-1;
             this.ballarray[k].yunit=this.ballarray[k].yunit*-1;
              this.AllpolygonArray[j][i].powerNo--; 
              this.AllpolygonArray[j][i].properites.color=Color[this.AllpolygonArray[j][i].powerNo];
              this.score++;
              if(localStorage.getItem("score")==null)
              {
                localStorage.setItem("score",this.score);
              }
              else{
                localStorage.setItem("score",this.score);
              }
              if(localStorage.getItem("Highscore")==null)
              {
                localStorage.setItem("Highscore",this.score);
              }
              else
              {
                if(parseInt( localStorage.getItem("Highscore"))< parseInt(localStorage.getItem("score")))
                {
                
                  localStorage.setItem("Highscore",this.score);
                }
              }
           
              if(this.AllpolygonArray[j][i].sideno==2)
            {
              var ball=new Ball();
              ball.increasedflag=this.noOfrow+1;
              this.newballarray.push(ball);
              this.ballNo++;
              console.log("increase ball",this.ballNo);
           
             // this.ballarray.push(ball);
            }
            }
        } 
        this.AllpolygonArray[j][i].properites.y= 550-(j+1)*45; 
       
        if(this.AllpolygonArray[j][i].powerNo<1)
        {
          this.AllpolygonArray[j].splice(i, 1);
        }
       
       
      }   
    }
  }
}

  // checkball=()=>
  // {
  //   for(var i=0;i<this.ballarray.length;i++)
  //   {
  //     if(this.ballarray[i].is)
  //   }
  // }

  handleInput=()=> {
   
    if (GameState.currentScreen === GameState.GamePlayScreen)
     {
    //  console.log("Calling 2nd");
    if(this.CheckIfAllBallsGoesUp()==true)
    {
      this.isFired=false;
      

    }
    if(this.ballarray[this.ballarray.length-1].increasedflag>this.noOfrow)
    {
     this.generateLineOfpolygon();
     for(var i=0;i<this.newballarray.length;i++)
     {
      this.ballarray.push(this.newballarray[i]);
     }
     this.newballarray=[];
      this.noOfrow++;
      for(var j=0;j<this.AllpolygonArray.length;j++)
      {
        for(var i=0;i<this.AllpolygonArray[j].length;i++)
        {      
          this.AllpolygonArray[j][i].initialize(); 
        // console.log("side array", this.AllpolygonArray[0][0].sideArray);
        }   
      }

    }
    if (this.isFired== false) {
     
      this.dotLine.position.Targetx = Mouse.position.x;
      this.dotLine.position.Targety = Mouse.position.y;
      this.dotLine.dotArray = calcStraightLine(
        this.Ballinitialposition,
        this.dotLine.position
      );
    }
  
    
    if (Mouse.shoot == true  &&this.isFired==false) {
    
          this.isFired = true;
         this.calculateAngle(this.Ballinitialposition,this.dotLine.position);
         for(let i=0;i<this.ballarray.length;i++)
         {
         if(this.ballarray[this.ballarray.length-1].isShoted==false)
         {
        
            setTimeout( function timer(){
              this.ballarray[i].xunit = Math.cos(this.shootingAngle) * this.ballarray[i].speed;
              this.ballarray[i].yunit = Math.sin(this.shootingAngle) * this.ballarray[i].speed;
              this.ballarray[i].isShoted=true;

            }.bind(this), i*120 );
         }
         }
          Mouse.shoot = false;   
        }
    }
}



  mainloop = () => {
    this.update();
    this.draw();
    this.handleInput();
    window.requestAnimationFrame(this.mainloop);
   if(Canvas2D.iteration<500)
   {
    Canvas2D.iteration++;
   }
  
 
  };
}
let game = new Game();
game.strat();
