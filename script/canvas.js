var Canvas2D = {
  canvas: undefined,
  canvasContext: undefined
};

Canvas2D.initialize = function() {
  Canvas2D.canvas = document.getElementById("myCanvas");
  Canvas2D.canvasContext = Canvas2D.canvas.getContext("2d");
 
};
Canvas2D.clearCanvas = function() {
  Canvas2D.canvasContext.clearRect(
    0,
    0,
    Canvas2D.canvas.width,
    Canvas2D.canvas.height
  );
};

Canvas2D.drawImage = function(sprite, position, rotation, origin) {
  Canvas2D.canvasContext.save();
  Canvas2D.canvasContext.translate(position.x, position.y);
  Canvas2D.canvasContext.rotate((rotation * Math.PI) / 180);
  Canvas2D.canvasContext.translate(-position.x, -position.y);
  Canvas2D.canvasContext.drawImage(
    sprite,
    0,
    0,
    sprite.width,
    sprite.height,
    origin.x,
    origin.y,
    sprite.width,
    sprite.height
  );
  Canvas2D.canvasContext.restore();
};
Canvas2D.drawlive=function(sprite, x,y)
{
 // Canvas2D.canvasContext.save();
 // Canvas2D.canvasContext.translate(x,y);
  Canvas2D.canvasContext.drawImage( sprite,
    0,
    0,
    sprite.width,
    sprite.height,
    x,
    y,
    sprite.width,
    sprite.height);
   // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}
Canvas2D.drawBall = function(Radius, position, color) {
  Canvas2D.canvasContext.beginPath();
  Canvas2D.canvasContext.shadowBlur = 15;
  Canvas2D.canvasContext.shadowColor = color;
   Canvas2D.canvasContext.shadowOffsetX = 2;
   Canvas2D.canvasContext.shadowOffsetY = 2;
  Canvas2D.canvasContext.arc(
    position.x,
    position.y,
    Radius,
    0,
    Math.PI * 2,
    false
  );
  Canvas2D.canvasContext.fillStyle = color;

  Canvas2D.canvasContext.fill();
  Canvas2D.canvasContext.closePath();
  Canvas2D.canvasContext.shadowBlur = 0;
  //Canvas2D.canvasContext.shadowColor = color;
  Canvas2D.canvasContext.shadowOffsetX = 0;
  Canvas2D.canvasContext.shadowOffsetY = 0;
};
Canvas2D.drawBalldot = function(Radius, position, color) {
  Canvas2D.canvasContext.beginPath();
  Canvas2D.canvasContext.arc(
    position.x,
    position.y,
    Radius,
    0,
    Math.PI * 2,
    false
  );
  Canvas2D.canvasContext.fillStyle = color;

  Canvas2D.canvasContext.fill();
  Canvas2D.canvasContext.closePath();
 
};
Canvas2D.DrawRect = function(color) {
  Canvas2D.canvasContext.rect(
    0,
    0,
    Canvas2D.canvas.width,
    Canvas2D.canvas.height
  );
  Canvas2D.canvasContext.fillStyle = color;
  Canvas2D.canvasContext.fill();
  Canvas2D.canvasContext.closePath();
};
Canvas2D.drawPolygon=function(properties)
{
  var X=properties.x;
  var Y=properties.y;
  var l = properties.length;
  var Orientation=properties.Orientation;
  var sides=properties.Noofsides;
  var sideArray=[];
  var color=properties.color;
  
  if(properties.Noofsides==2)
  {
   
    Canvas2D.drawlive(sprites.life,X-10,Y);
    
  }
  else{
   
  Canvas2D.canvasContext.beginPath();
  if (!Orientation) {
    Orientation = "east";
  }

  var a = (Math.PI * 2) / sides;
  // the components have negative contributions
  if (Orientation === "west" || Orientation === "north") {
    l *= -1;
  }

  if (Orientation === "east" || Orientation === "west") {
    Canvas2D.canvasContext.moveTo(X + l, Y);

    var vertex = { x: X + l, y: Y };
    sideArray.push(vertex);

    for (var i = 1; i < sides + 1; i++) {
      Canvas2D.canvasContext.lineTo(
        X + l * Math.cos(a * i),
        Y + l * Math.sin(a * i)
      );
      var vertex = {
        x: X + l * Math.cos(a * i),
        y: Y + l * Math.sin(a * i)
      };
      sideArray.push(vertex);
    }
  } else if (Orientation === "south" || Orientation === "north") {
    Canvas2D.canvasContext.moveTo(Y, X + l);

    var vertex = { x: Y, y: X + l };
    sideArray.push(vertex);
    for (var i = 1; i < sides + 1; i++) {
      Canvas2D.canvasContext.lineTo(
        Y + l * Math.sin(a * i),
        X + l * Math.cos(a * i)
      );
      var vertex = {
        x: Y + l * Math.cos(a * i),
        y: X + l * Math.sin(a * i)
      };
      sideArray.push(vertex);
    }
  }
  //  context.stroke();
  Canvas2D.canvasContext.fillStyle = color;
  Canvas2D.canvasContext.fill();
  Canvas2D.canvasContext.closePath();
  return sideArray;
}
 }
Canvas2D.drawCurve = function(StartPoint, EndPoint, ControlPoint,ball) {
  var curvecollision=false;
  Canvas2D.canvasContext.beginPath();
  //Canvas2D.canvasContext.lineWidth = 5;
  Canvas2D.canvasContext.moveTo(StartPoint.x, StartPoint.y);
  Canvas2D.canvasContext.quadraticCurveTo(
    ControlPoint.x,
    ControlPoint.y,
    EndPoint.x,
    EndPoint.y
  );
  Canvas2D.canvasContext.stroke();
  Canvas2D.canvasContext.strokeStyle = "#FF0000";
  
  if (Canvas2D.canvasContext.isPointInPath(ball.x, ball.y)) {
    curvecollision=true;
    console.log("curve collision");
  };
  Canvas2D.canvasContext.closePath();
  return curvecollision;
};
Canvas2D.drawText=function(Text,size,color,pos)
{
  Canvas2D.canvasContext.font = size+ "px Comic Sans MS";
  Canvas2D.canvasContext.fillStyle = color;
  Canvas2D.canvasContext.fillText(Text,pos.x,pos.y);
}


