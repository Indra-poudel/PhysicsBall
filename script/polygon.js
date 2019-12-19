class Polygon {
  constructor(startpos,power) {
   
    this.sideno=this.setNumberofsides();
    this.powerNo =power||this.setpower();
    this.properites = {
      
      x: startpos,
      y: 500,
    
      Orientation:this.setOrientation(),
      Noofsides: this.sideno,
      length: this.setLength(),
     
      color: Color[this.powerNo],
    };
    this.sideArray;
  
  }

  setpower=()=>
  {
    if(this.sideno==2)
    {
      return 1;
    }
    else
    {
     
      return Math.floor(Math.random()*8)+8;

    }
  }

  setLength=()=>{
    if(this.sideno>5)
    {
      return 18;
    }
    return 20;
  }
  

  setNumberofsides=()=>{
    var no =Math.floor(Math.random()*4)+3;
    var live=Math.floor(Math.random()*10);
    if(no>5)
    {
      no=45;
      this.sideno=no;
      return no;
    }
    else if(live==2){
      return live
    }
    else if(no!=2){
      this.sideno=no;
    return no;
    }
    else
    {
      return Math.floor(Math.random()*4)+3;
    }
    
    
  }

  setOrientation=()=>{
    var orientationArr=["east","west"];
    var index=Math.floor(Math.random()*orientationArr.length);
    return orientationArr[index];
  }
  checkCollision = (ball) => {
    if(this.properites.Noofsides==2)
    {
      var distX = (this.properites.x+13) - ball.position.x+ball.xunit;
      var  distY = (this.properites.y+13) - ball.position.y+ball.yunit;
      var distance = Math.sqrt( (distX*distX) + (distY*distY) );
      if(distance<=13.5+ball.Radius)
      {
        return true;
      }
      else{
        return false;
      }

    }
    else
    {
    var cx = ball.position.x+ball.xunit;
    var cy = ball.position.y+ball.yunit;
    var r = ball.Radius;
    var next = 0;
    //  console.log(ball.position.x)
    for (
      var current = 0;
      current < this.properites.Noofsides;
      current = current + 1
    ) {
      next = current + 1;
      if (next == this.sideArray.length) {
        next = 0;
      }
      var vc = this.sideArray[current];
      var vn = this.sideArray[next];
      var collision = lineCircle(vc.x, vc.y, vn.x, vn.y, cx, cy, r);
      if (collision) return true;
    }
    var centerInside = polygonPoint(this.sideArray, cx, cy);
    if (centerInside) return true;
    return false;
  }
  };

  update = function() {
    // if (this.checkCollision()) {
    // //   var dx = ball.position.x - this.properites.x;
    // //   var dy = ball.position.y - this.properites.y;
    // //   var collision_angle = Math.atan2(dy, dx);
    // //   console.log("Angle", (collision_angle * 180) / Math.PI);
    // //   ball.shootingAngle= Math.PI -collision_angle;
    // //  ball.calculateXunitYunit();
    // ball.xunit=ball.xunit*-1;
    // ball.yunit=ball.yunit*-1;
    // this.powerNo--;
    // }
  };
  handleEvent = function() {};
  draw = () => {
    this.sideArray = Canvas2D.drawPolygon(this.properites);
    if(this.sideno>2)
    {
    Canvas2D.drawText(this.powerNo.toString(),"15","Black", {x:this.properites.x-8,y:this.properites.y+5});
    }
    // console.log("drawing polygon");
  };
  initialize = () => {
    this.draw();
    this.handleEvent();
    this.update();
    // this.draw();

    // console.log(this.sideArray.length);
  };
}


//---------------------------------
polygonPoint = function(vertices, px, py) {
  var collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  var next = 0;
  for (var current = 0; current < vertices.length; current++) {
    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    var vc = vertices[current]; // c for "current"
    var vn = vertices[next]; // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (
      ((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
      px < ((vn.x - vc.x) * (py - vc.y)) / (vn.y - vc.y) + vc.x
    ) {
      collision = !collision;
    }
  }
  return collision;
};

lineCircle = function(x1, y1, x2, y2, cx, cy, r) {
  var inside1 = pointCircle(x1, y1, cx, cy, r);
  var inside2 = pointCircle(x2, y2, cx, cy, r);
  if (inside1 || inside2) return true;

  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = Math.sqrt(distX * distX + distY * distY);
  var dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(len, 2);
  var closestX = x1 + dot * (x2 - x1);
  var closestY = y1 + dot * (y2 - y1);

  var onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
  if (!onSegment) return false;

  distX = closestX - cx;
  distY = closestY - cy;
  var distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= r) {
    return true;
  }
  return false;
};

pointCircle = function(px, py, cx, cy, r) {
  var distX = px - cx;
  var distY = py - cy;
  var distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= r) {
    return true;
  }
  return false;
};

dist = function(x1, y1, x2, y2) {
  var distX = x2 - x1;
  var distY = y2 - y1;
  var distance = Math.sqrt(distX * distX + distY * distY);
  return distance;
};
linePoint = function(x1, y1, x2, y2, px, py) {
  var d1 = dist(px, py, x1, y1);
  var d2 = dist(px, py, x2, y2);
  var lineLen = dist(x1, y1, x2, y2);
  var buffer = 0.01;

  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
};
