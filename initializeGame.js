resize();
generateDungeon(dungeonSize,.8);
player.currentRoom = characterCurrentRoom;
player.getColliders = getColliders;
function draw(){
  walk(player);
  updateCamera();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0,0,screen.width,screen.height);
  for(r in dungeon){
    for(c in dungeon[r]){
      if(dungeon[r][c]) drawRoom({x:r-Math.floor(dungeonSize/2),y:c-Math.floor(dungeonSize/2)},r == player.currentRoom().x && c == player.currentRoom().y);
    }
  }
  drawCharacter(player);
  window.requestAnimationFrame(draw);
  //drawRoom(makeRoom({x:1,y:0}));
}
draw();