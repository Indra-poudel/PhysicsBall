class Gameplay {
  constructor() {
   
    this.Leftfan={
      position:{x:0,y:518},
      Top:518,
      left:0,
      Right:24,
      botton:544,
      rototation: 0,
      speed:12

    }
    this.Rightfan={
      position:{x:328,y:518},
      Top:518,
      left:328,
      Right:350,
      botton:544,
      rototation: 0,
      speed:12

    }
    this.gameplayArea = {
      Top: 86,
      Left: 27,
      Right: 323,
      Botton: 520
    };
    this.PauseIcon = {
      Top: 5,
      Bottom: 24,
      Left: 10,
      Right: 29
    };

   
  }
 
  update=()=>
  {

    this.Leftfan.rototation=this.Leftfan.rototation+this.Leftfan.speed;
    this.Rightfan.rototation=this.Rightfan.rototation+this.Rightfan.speed;



  }
  handleEvent=()=>
  {
     
  }
  draw=()=>
  {
     Canvas2D.drawImage(sprites.gameplay,{x:0,y:0},0,{x:0,y:0});
     Canvas2D.drawImage(sprites.fan,{x:12,y:531},this.Leftfan.rototation,this.Leftfan.position);
     Canvas2D.drawImage(sprites.fan,{x:340,y:531},this.Rightfan.rototation,this.Rightfan.position);
     
    // this.drawDotted();




  }
  initialize=()=>
  {  
      this.handleEvent();
      this.update();
      this.draw();
  }
}


//-----------------object of gameplay

var gameplay= new Gameplay();
//----------------------------------
//------------line drawing alogrithm Bresenham algorithm return array of coordinates-----------
function calcStraightLine(startCoordinates, endCoordinates) {
  var coordinatesArray = new Array();
  // Translate coordinates
  var x1 = startCoordinates.x;
  var y1 = startCoordinates.y;
  var x2 = endCoordinates.Targetx;
  var y2 = endCoordinates.Targety;
  // Define differences and error check
  var dx = Math.abs(x2 - x1);
  var dy = Math.abs(y2 - y1);
  var sx = (x1 < x2) ? 1 : -1;
  var sy = (y1 < y2) ? 1 : -1;
  var err = dx - dy;
  // Set first coordinates
  coordinatesArray.push(new Coordinates(y1, x1));
  // Main loop
  while (!((x1 == x2) && (y1 == y2))) {
      var e2 = err << 1;
      if (e2 > -dy) {
          err -= dy;
          x1 += sx;
      }
      if (e2 < dx) {
          err += dx;
          y1 += sy;
      }
      // Set coordinates
      coordinatesArray.push(new Coordinates(y1, x1));
  }
  // Return the result
  return coordinatesArray;
}
//---------------------------------

//-------coordinates class
class Coordinates
{
  constructor(y1,x1)
  {
    this.x=x1;
    this.y=y1;
  }
}