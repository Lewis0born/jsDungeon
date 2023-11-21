//init canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// FPS
const FPS = 60;

// game loop
function gameLoop(){
    // dynamic resizing of canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // update the canvas
    context.fillStyle = 'Black';
    context.fillRect(0, 0, canvas.width, canvas.height);


    // infinite loop
    setTimeout(gameLoop, 0);
}

// load before calling gameLoop
window.onload = function(){ gameLoop() };

