const performanceMode = isMobile()?true:false;
var screen = document.getElementById('screen');
var gui = {
  element:document.getElementById('gui')
}
gui.ctx = gui.element.getContext("2d",{alpha:true,
  powerPreference:"high-performance",
  depth:false,
  antialias:performanceMode,
  desynchronized: false, //Probs will break stuff
  preserveDrawingBuffer: false});
gui.ctx.linewidth = 50;
gui.ctx.fillStyle = "white";
gui.ctx.strokeStyle = "#FFFFFF";
var zoom = .125;//{x:.8,y:.8};//How large a 1x1 room is compared to the screen percent
var screenScale = 1; //Math.min(screen.width,screen.height)
const roomSize = {x:1,y:0.5625};//Size of a normal room
var mousePos = {x:0,y:0};
var mouseWeight = .2;
var camera = {x:0,y:0};
var ctx = screen.getContext("2d",{alpha:false,
powerPreference:"high-performance",
depth:false,
antialias:performanceMode,
desynchronized: false, //Probs will break stuff
preserveDrawingBuffer: false});
const backgroundColor = "dimgray";
const stroke = 'black';
ctx.strokeStyle = stroke;
var dungeon = [];
const dungeonSize = performanceMode?50:200;
var player = {x:0,y:0/*coordinates are % of a roomnScale/100*/,up:false,down:false,left:false,right:false,speed:.01,sprint:false,crawl:false,size:0.05,toString:function(){let output = '', keys = Object.keys(this);if(keys.length){for(k in keys){let key = keys[k];
if(typeof this[key] == 'function') continue; output += "" + key + ": " + this[key] + "<br/>";}}return output;}};