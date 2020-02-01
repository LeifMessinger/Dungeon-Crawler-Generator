if(window.addEventListener) { //change canvas size when resized
  window.addEventListener('resize',resize, true); //the true is "useCapture"
} else { //The browser does not support Javascript event binding
}
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
document.addEventListener("click", registerMouseClick);
screen.onmousemove = registerMouseMove;