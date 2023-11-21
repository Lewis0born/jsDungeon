//init canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// FPS
const FPS = 60;
const cycleDelay = Math.floor(1000 / FPS);
let oldCycleTime = 0;
let cycleCount = 0;
let fpsRate = '...';

// screen
const WIDTH = 300, HALF_WIDTH = 150;
const HEIGHT = 200, HALF_HEIGHT = 100;

// game loop
function gameLoop(){

    // calculate fps
    cycleCount++;
    if(cycleCount >= 60){
        cycleCount = 0;
    };
    let startTime = Date.now();
    let cycleTime = startTime - oldCycleTime;
    oldCycleTime = startTime;

    // calculate once per second
    if(cycleCount % 60 == 0){
        fpsRate = Math.floor(1000/ cycleTime);
    }

    // dynamic resizing of canvas
    canvas.width = window.innerWidth * 0.2;
    canvas.height = window.innerHeight * 0.2;

    // update the canvas
    context.fillStyle = 'Black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'White';
    context.fillRect(canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT, WIDTH, HEIGHT);
    

    // infinite loop
    setTimeout(gameLoop, cycleDelay);

    // show fps on screen
    context.fillStyle = 'tomato';
    context.font = '11x Monospace';
    context.fillText('FPS: ' + fpsRate, 0, 20);

}

// load before calling gameLoop
window.onload = function(){ gameLoop() };

