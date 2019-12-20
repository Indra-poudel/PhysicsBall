class Ball {
  constructor() {
   // this.startgamesound=new Audio('sound/startGame.mp3');
    this.wall=new Audio('sound/wall.mp3');
    this.GoUp=new Audio('sound/laser.mp3')
    this.increasedflag=1;
    this.Startposition = { x: 175, y: 92 };
    this.curveCollision=false;
    this.animationspeed=7;
    this.shootingRangeAngle = {
      max: 165,
      min: 15
    };
    this.StartpositionTarget={
      Targetx:175,
      Targety:92,
    }
    this.gameplayArea = {
      Top: 86,
      Left: 27,
      Right: 323,
      Bottom: 545,
    };
    this.leftBottomPoint={
      Targetx:12,
      Targety:545,
    }
    this.RightBottomPoint={
      Targetx:338,
      Targety:545,
    }
    this.leftTopPoint={
      Targetx:12,
      Targety:8,
    }
    this.frameRate = 1/60; // Seconds
    this.frameDelay = this.frameRate * 1000;
    this.shootingAngle = undefined;
    this.position = { x: 175, y: 95 };
    this.Radius = 8;
    this.xunit = undefined;
    this.yunit = undefined;
    this.color =this.setcolor();
    this.isShoted = false;
    this.speed = 5;
    this.reflectionAngle = undefined;
    this.mass= 0.1, //kg// 1px = 1cm
    this.restitution= -2,
    this.Cd = 0.47;  // Dimensionless
    this.rho = 1.22; // kg / m^3
    this.A = Math.PI * this.Radius * this.Radius / (10000); // m^2
    this.ag = 9.81;
    this.animation=false;
    this.path1=true;
    this.path2=false;
    this.path3=false;
    
  
    //this.calculatepath();

  }
    setcolor=()=>
    {
      console.log("Why",ballSelect[0]);
      return ballSelect[0];
     
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
    this.wall.play();
      this.xunit=this.xunit*-1;
   
    }
    if(this.gameplayArea.Bottom<this.position.y+this.Radius+this.yunit)
    {
    
      this.color="Yellow";
     this.animation=true;
     this.GoUp.play();
     //this.startgamesound.play();
     
   
    }
    if(this.gameplayArea.Top>this.position.y-this.Radius+this.yunit)
    {
      this.wall.play();
      this.yunit=this.yunit*-1;
     

    }
  }
  calculateXunitYunit = () => {
    
   
     this.xunit = Math.cos(this.shootingAngle) * this.speed;
     this.yunit = Math.sin(this.shootingAngle) * this.speed;
  };

  drawDotted = () => {
   
  };

  update = function() {
    if (this.isShoted== true && this.animation==false) {    
  this.loop();
      this.wallCollision();
      
    }
    if(this.animation==true)
    {
      if(this.position.x< Canvas2D.canvas.width/2)
      {
      if(this.position.x>this.leftBottomPoint.Targetx && this.path1==true)
      {
      this.position.x=this.position.x-this.animationspeed;
      console.log("right",this.path2);
      }
      if(this.position.x<15 &&this.path1==true)
      {
         this.path1=false;
        this.path2=true;
      }
      if( this.path2==true)
      {
        console.log(this.path1,this.path2);
        this.position.y=this.position.y-this.animationspeed;
      
      }
      if(this.position.y < 0 && this.path2==true)
      {
        this.path2=false;
        this.path3=true;
        console.log(this.position.y);
      }
      if(this.path3==true)
      {
        this.path2=false;
        this.calculateAngle(this.position,this.StartpositionTarget);
        this.calculateXunitYunit();
        this.position.x=this.position.x+this.xunit;
        this.position.y=this.position.y+this.yunit;
      }
      if(this.Startposition.x-this.position.x+this.xunit<0 &&this.path3==true)
      {
        console.log("startpos",Math.abs(this.position.x-this.Startposition.x));
        this.path3=false;
        this.path1=true;
        this.animation=false;
        this.isShoted=false;     
        this.increasedflag++;
        this.color= ballSelect[0];
      }
    }
    else
    {
      if(this.position.x<this.RightBottomPoint.Targetx && this.path1==true)
      {
      this.position.x=this.position.x+this.animationspeed;
      console.log("right",this.path2);
      }
      if(this.position.x>338 &&this.path1==true)
      {
         this.path1=false;
        this.path2=true;
      }
      if( this.path2==true)
      {
        console.log(this.path1,this.path2);
        this.position.y=this.position.y-this.animationspeed;
      
      }
      if(this.position.y < 0 && this.path2==true)
      {
        this.path2=false;
        this.path3=true;
        console.log(this.position.y);
      }
      if(this.path3==true)
      {
        this.path2=false;
        this.calculateAngle(this.position,this.StartpositionTarget);
        this.calculateXunitYunit();
        this.position.x=this.position.x+this.xunit;
        this.position.y=this.position.y+this.yunit;
      }
      if(this.position.x-this.Startposition.x+this.xunit<0 &&this.path3==true)
      {
        console.log("startpos",Math.abs(this.position.x-this.Startposition.x));
        this.path3=false;
        this.path1=true;
        this.animation=false;
        this.isShoted=false;     
        this.increasedflag++;
        this.color=ballSelect[0];
      }
    }
  }
  };

  handleEvent = function() {
 
  };

  draw = () => {
 //  this.curveCollision= Canvas2D.drawCurve({x:0,y:300}, {x:323,y:300}, {x:156,y:350},{x:this.position.x,y:this.position.y+this.Radius})
    Canvas2D.drawBall(this.Radius, this.position, ballSelect[0]);
   // this.drawDotted();

  };
  initialize = () => {
   
    this.handleEvent();
    this.update();
    this.draw();
  };
}

