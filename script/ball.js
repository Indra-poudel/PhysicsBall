class Ball {
  constructor() {
    this.increasedflag=1;
    this.Startposition = { x: 175, y: 92 };
    this.curveCollision=false;
    this.shootingRangeAngle = {
      max: 165,
      min: 15
    };
    this.gameplayArea = {
      Top: 86,
      Left: 27,
      Right: 323,
      Bottom: 622,
    };
    this.frameRate = 1/60; // Seconds
    this.frameDelay = this.frameRate * 1000;
    this.shootingAngle = undefined;
    this.position = { x: 175, y: 95 };
    this.Radius = 8;
    this.xunit = undefined;
    this.yunit = undefined;
    this.color = "#ffffff";
    this.isShoted = false;
    this.speed = 5;
    this.reflectionAngle = undefined;
    this.mass= 0.1, //kg// 1px = 1cm
    this.restitution= -1.5,
    this.Cd = 0.47;  // Dimensionless
    this.rho = 1.22; // kg / m^3
    this.A = Math.PI * this.Radius * this.Radius / (10000); // m^2
    this.ag = 9.81;

  }

  loop=()=>
  {
    
          // Do physics
              // Drag force: Fd = -1/2 * Cd * A * rho * v * v
          var Fx = -0.5 * this.Cd * this.A * this.rho * this.xunit * this.xunit * this.xunit/ Math.abs(this.xunit);
          var Fy = -0.5 * this.Cd * this.A * this.rho * this.yunit * this.yunit * this.yunit / Math.abs(this.yunit);
          
          Fx = (isNaN(Fx) ? 0 : Fx);
          Fy = (isNaN(Fy) ? 0 : Fy);
          
              // Calculate acceleration ( F = ma )
          var ax = Fx / this.mass;
          var ay = this.ag + (Fy / this.mass);
              // Integrate to get velocity
          this.xunit += ax*this.frameRate;
          this.yunit += ay*this.frameRate;
          
              // Integrate to get position
          this.position.x += this.xunit*this.frameRate*100;
          this.position.y += this.yunit*this.frameRate*100;

       //   console.log(  this.position.x);
      
      // Handle collisions
     
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

  wallCollision=()=>{
    if(this.gameplayArea.Left>this.position.x-this.Radius+this.xunit||this.gameplayArea.Right<this.position.x+this.Radius+this.xunit)
    {
      //this.calculateXunitYunit();
     // this.xunit*= ball.restitution;
      this.xunit=this.xunit*-1;
     // this.position.x = this.gameplayArea.Top - this.r;
      // this.shootingAngle= Math.PI -this.shootingAngle;
      // this.calculateXunitYunit();
    }
    if(this.gameplayArea.Bottom<this.position.y+this.Radius)
    {
      
      this.isShoted=false;
     this.position.x=this.Startposition.x;
     this.position.y=this.Startposition.y      
     this.increasedflag++;
    }
    if(this.gameplayArea.Top>this.position.y-this.Radius+this.yunit)
    {
      this.yunit=this.yunit*-1;
      // this.shootingAngle= Math.PI*2 -this.shootingAngle;
      // this.calculateXunitYunit();

    }
  }
  calculateXunitYunit = () => {
    
   
     this.xunit = Math.cos(this.shootingAngle) * this.speed;
     this.yunit = Math.sin(this.shootingAngle) * this.speed;
  };

  drawDotted = () => {
    // if (this.isShoted == false) {
    //   for (var i = 0; i < this.dotLine.dotArray.length; i = i + 20) {
    //     var x = {
    //       position: {
    //         x: this.dotLine.dotArray[i].x,
    //         y: this.dotLine.dotArray[i].y
    //       }
    //     };
    //     Canvas2D.drawBall(ball.Radius - 3, x.position, ball.color);
    //   }
    // }
  };

  update = function() {
    if (this.isShoted== true ) {    
  this.loop();
      this.wallCollision();
      
    }
  };

  handleEvent = function() {
    // if (GameState.currentScreen === GameState.GamePlayScreen) {
    //   //----calcuclate the x and y to the particular direction and find path point
    //   if (this.isShoted == false) {
    //     // this.dotLine.position.Targetx = Mouse.position.x;
    //     // this.dotLine.position.Targety = Mouse.position.y;
    //     // this.dotLine.dotArray = calcStraightLine(
    //     //   this.position,
    //     //   this.dotLine.position
    //     // );
    //   }
    //   //------------------------------------------------------------------
    //   //-------check where mouse clicked or not to shoot the ball
    //   if (Mouse.shoot == true  &&this.isShoted==false) {
    //     this.isShoted = true;
    //    // console.log("Only one time");
        
    //     this.calculateAngle(this.position,this.dotLine.position);
    //     this.calculateXunitYunit();  
    //     Mouse.shoot = false;   
    //   }
       
    // }
  };

  draw = () => {
 //  this.curveCollision= Canvas2D.drawCurve({x:0,y:300}, {x:323,y:300}, {x:156,y:350},{x:this.position.x,y:this.position.y+this.Radius})
    Canvas2D.drawBall(this.Radius, this.position, this.color);
   // this.drawDotted();

  };
  initialize = () => {
   
    this.handleEvent();
    this.update();
    this.draw();
  };
}

let ball = new Ball();
