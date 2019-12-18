function handleMouseMove(evt) {
  var rect = Canvas2D.canvas.getBoundingClientRect();
  (scaleX = Canvas2D.canvas.width / rect.width), // relationship bitmap vs. element for X
    (scaleY = Canvas2D.canvas.height / rect.height);
  var clickX = evt.clientX - rect.left;
  var clickY = evt.clientY - rect.top;
  Mouse.position = { x: clickX, y: clickY };
}

function handleMouseDown(evt) {
  if (evt.which === 1) {
    if (!Mouse.leftDown) Mouse.leftPressed = true;
    Mouse.leftDown = true;
    if(GameState.currentScreen==GameState.GamePlayScreen)
    {
      Mouse.shoot = true;
     
    }
    Mouse.clickedPos.x = Mouse.position.x;
    Mouse.clickedPos.y = Mouse.position.y;
  }
}

function handleMouseUp(evt) {
  if (evt.which === 1) {
    Mouse.leftDown = false;
    if(GameState.currentScreen==GameState.GamePlayScreen)
    {
      Mouse.shoot = false;
     
    }
    Mouse.clickedPos.x = 0;
    Mouse.clickedPos.y = 0;
  }
}
function handledrag(evt) {
  console.log("drag.event");
}

var Mouse = {
  clickedPos: { x: 0, y: 0 },
  position: { x: 0, y: 0 },
  leftDown: false,
  leftPressed: false,
  drag: false,
  shoot: false
};

Mouse.initialize = function() {
  document.onmousemove = handleMouseMove;
  document.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
};

Mouse.reset = function() {
  Mouse.leftPressed = false;
};
