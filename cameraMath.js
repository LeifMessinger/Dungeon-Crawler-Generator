function updateCamera(){
  camera = {x:(-(mousePos.x-(screen.width/2))*mouseWeight)-player.x*screenScale,y:(-(mousePos.y-(screen.height/2))*mouseWeight)+player.y*screenScale};
  //draw();
}
function worldToRoom(thisX,thisY,roomSize,dungeonLength){
  return {x:Math.ceil(((thisX/roomSize.x)-.5)+(dungeonLength/2)),
        y:Math.ceil(((thisY/roomSize.y)-.5)+(dungeonLength/2))};
}
function toScreenPos(pos,size){ //pos = position relative to player
		return {x:screen.width/2-(size/2)+(camera.x)+pos.x,y:screen.height/2-(size/2)+(camera.y)-pos.y};
}
function drawRoom(room,current){
  transform = makeRoom(room);
  if(transform.pos.x + transform.scale.x +ctx.lineWidth >= 0 && transform.pos.y + transform.scale.y +ctx.lineWidth >= 0 && transform.pos.x - ctx.lineWidth<= screen.width && transform.pos.y +ctx.lineWidth <= screen.height){
    if(!performanceMode) ctx.strokeRect(transform.pos.x,transform.pos.y,transform.scale.x,transform.scale.y);
    if(current) ctx.fillStyle = 'chocolate'; else ctx.fillStyle = 'sienna';
    ctx.fillRect(transform.pos.x,transform.pos.y,transform.scale.x,transform.scale.y);
  }
  //console.log(room);
}
function drawCharacter(character){
  let size = screenScale*character.size,
  pos = makeCharacter({x:character.x,y:character.y},size);//{x:screen.width/2-(size/2)+(camera.x)+player.x,y:screen.height/2-(size/2)+(camera.y)-player.y};
  if(pos.pos.x + size >= 0 && pos.pos.y + size >= 0 && pos.pos.x <= screen.width && pos.pos.y <= screen.height){
  ctx.fillStyle = character.crawl?'rgba(255,0,0,128)':'red';
  //ctx.fillRect(pos.x,pos.y,size,size);
  if(!performanceMode) ctx.strokeRect(pos.pos.x,pos.pos.y,size,size);
    ctx.fillRect(pos.pos.x,pos.pos.y,size,size);
  }
}
function makeRoom(pos/*{x:1,y:1}*/){
  let aspectRatio = screen.width/screen.height,
    roomWidth = roomSize.x*screenScale,
    roomHeight = roomSize.y*screenScale,
  roomPos = {x:(camera.x + (screen.width/2) - (roomWidth/2) + (pos.x*roomWidth)),
    y:(camera.y + (screen.height/2) - (roomHeight/2) - (pos.y*roomHeight))}; //y positive is up
  if(performanceMode){
    roomPos.x = Math.round(roomPos.x);
    roomPos.y = Math.round(roomPos.y); //Canvas Optimisation, weirdly enough tends to slow down the game
  }
  return {pos:roomPos,scale:{x:roomWidth,y:roomHeight}}; //Pos, size room
}
function resize(){//Resize canvas to window size
  let win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
  screenScale = Math.min(x,y*(1/roomSize.y))*zoom;
  canvases = [[screen,ctx],[gui.element,gui.ctx]];
  for(let i in canvases){
    canvases[i][0].height = y;
    canvases[i][0].width = x;
    canvases[i][1].lineWidth = screenScale/100;
  }
  updateCamera();
  updateCursor();
};
function makeCharacter(pos,size){
  let aspectRatio = screen.width/screen.height,
    roomWidth = screenScale,
    roomHeight = screenScale,
  roomPos = {x:(camera.x + (screen.width/2) - (size/2) + (pos.x*roomWidth)),
    y:(camera.y + (screen.height/2) - (size/2) - (pos.y*roomHeight))}; //y positive is up
  return {pos:roomPos,scale:{x:roomWidth,y:roomHeight}}; //Pos, size room
}
/* How to create pattern for later
var img = new Image;
img.onload = imageIsReady;
img.src = "data: ....."; // full uri here

function imageIsReady() {
  var pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  // fill, etc.
}*/