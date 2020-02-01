function registerMouseClick(event) {
				//console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
        //console.log(camera);
				//draw();
			}
function registerMouseMove(){
  mousePos = {x:event.clientX,y:event.clientY};
  updateCamera();
}
function onKeyDown(event) {
  let keyCode = event.keyCode;
  switch (keyCode) {
    case 16: //shift
      player.sprint = true;
      break;
    case 17: //shift
      player.crawl = true;
      break;
    case 67: //c
      player.crawl = true;
      break;
    case 68: //d
      player.right = true;
      break;
    case 83: //s
      player.down = true;
      break;
    case 65: //a
      player.left = true;
      break;
    case 87: //w
      player.up = true;
      break;
    case 187: //=
      zoom *= 2;
      resize();
      break;
    case 189: //-
      zoom /= 2;
      resize();
      break;
  }
  //console.log(keyCode);
}
function onKeyUp(event) {
  let keyCode = event.keyCode;
  switch (keyCode) {
    case 16: //shift
      player.sprint = false;
      break;
    case 17: //shift
      player.crawl = false;
      break;
    case 67: //c
      player.crawl = false;
      break;
    case 68: //d
      player.right = false;
      break;
    case 83: //s
      player.down = false;
      break;
    case 65: //a
      player.left = false;
      break;
    case 87: //w
      player.up = false;
      break;
  }
}