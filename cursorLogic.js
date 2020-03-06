function updateCursor(){
  let cursorSize = 20;
  gui.ctx.clearRect(0,0,gui.element.width,gui.element.height);
  gui.ctx.beginPath();
  //gui.ctx.fillRect(mousePos.x-(cursorSize/2),mousePos.y-(cursorSize/2),cursorSize,cursorSize);
  gui.ctx.arc(mousePos.x,mousePos.y,cursorSize,0,Math.PI*2);
  gui.ctx.stroke();
}