function walk(){
  if(player.up || player.down || player.right || player.left){ //Player is moving
    let colliders = player.getColliders(),
    speeds = [player.speed,player.speed/2.0];
    if(player.crawl){
      speeds.shift();
    }else{
      if(player.sprint){
        speeds.unshift(player.speed*2.0);
      }
    }
    if(player.up) player.y += testSpeeds(colliders.up,true,player.y,speeds);
    if(player.down) player.y -= testSpeeds(colliders.down,false,player.y,speeds);
    if(player.right) player.x += testSpeeds(colliders.right,true,player.x,speeds);
    if(player.left) player.x -= testSpeeds(colliders.left,false,player.x,speeds);
    //if(colliders.left != null || colliders.right != null) console.log("BRUH");
  }else{ //Player does not move

  }
}
function generateDungeon(size,chance){
  let recurse = function(x,y,chance){
    if(x > 0){
      if(!dungeon[x-1][y]){
        if(Math.random()<chance){
          dungeon[x-1][y] = true;
          chance -= 1/size;
          recurse(x-1,y,chance);
        }
      }
    }
    if(x < dungeon.length-1){
      if(!dungeon[x+1][y]){
        if(Math.random()<chance){
          dungeon[x+1][y] = true;
          chance -= 1/size;
          recurse(x+1,y,chance);
        }
      }
    }
    if(y > 1){
      if(!dungeon[x][y-1]){
        if(Math.random()<chance){
          dungeon[x][y-1] = true;
          chance -= 1/size;
          recurse(x,y-1,chance);
        }
      }
    }
    if(y < dungeon[0].length-1){
      if(!dungeon[x][y+1]){
        if(Math.random()<chance){
          dungeon[x][y+1] = true;
          chance -= 1/size;
          recurse(x,y+1,chance);
        }
      }
    }
  }
  dungeon = [];
  for(r = 0; r < size; r++){
    row = [];
    for(c = 0; c < size; c++){
      if(r==Math.floor(size/2) && c == Math.floor(size/2)) row.push(true);
      else row.push(false);
    }
    dungeon.push(row);
  }
  recurse(Math.floor(size/2),Math.floor(size/2),1.0);
  /*for(r = 0; r < size; r++){
    row = [];
    for(c = 0; c < size; c++){
      if(r==Math.floor(size/2) && c == Math.floor(size/2)) row.push(true);
      else row.push(Math.random()<.5?false:true);
    }
    dungeon.push(row);
  }*/
  /*for(r in dungeon){
    alert(dungeon[r]);
  }*/
}
function getColliders(){
  let sizeMultiplier = .4;
  let room = this.currentRoom(),
  colliders = {};
  if(room.x < 0 || room.x >= dungeon.length) return colliders;
  if(room.y < 0 || room.y >= dungeon[0].length) return colliders;
  if(room.x > 0){
    if(!dungeon[room.x-1][room.y]){
      colliders.left = (roomSize.x*room.x-dungeon.length/2)-(.5-(this.size*sizeMultiplier));
    }
  }else{
    colliders.left = (roomSize.x*room.x-dungeon.length/2)-(.5-(this.size*sizeMultiplier));
  }
  if(room.x < dungeon.length-1){
    if(!dungeon[room.x+1][room.y]){
      colliders.right = (roomSize.x*room.x-dungeon.length/2)+(.5-(this.size*sizeMultiplier));
    }
  }else{
    colliders.right = (roomSize.x*room.x-dungeon.length/2)+(.5-(this.size*sizeMultiplier));
  }
  if(room.y > 1){
    if(!dungeon[room.x][room.y-1]){
    colliders.down = (roomSize.y*(room.y-dungeon[0].length/2)) - ((roomSize.y*.5)-(this.size*sizeMultiplier));
  }
  }else{
    colliders.down = (roomSize.y*(room.y-dungeon[0].length/2)) - ((roomSize.y*.5)-(this.size*sizeMultiplier));
  }
  if(room.y < dungeon[0].length-1){
    if(!dungeon[room.x][room.y+1]){
      colliders.up = (roomSize.y*(room.y-dungeon[0].length/2)) + ((roomSize.y*.5)-(this.size*sizeMultiplier));
    }
  }else{
    colliders.up = (roomSize.y*(room.y-dungeon[0].length/2)) + ((roomSize.y*.5)-(this.size*sizeMultiplier));
  }
  return colliders;
};
function characterCurrentRoom(){
  return worldToRoom(this.x,this.y,roomSize,dungeon.length);
}
function testSpeeds(collider, add, initial, speeds){
  if(collider == null) return speeds[0];
  if(add){
    for(s in speeds){
      if(collider >= initial + speeds[s]) return speeds[s];
    }
  }else{
    for(s in speeds){
      if(collider <= initial - speeds[s]) return speeds[s];
    }
  }
  return 0;
}