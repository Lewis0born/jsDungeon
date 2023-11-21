//init canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// FPS
const FPS = 60;
const cycleDelay = Math.floor(1000 / FPS);
let oldCycleTime = 0;
let cycleCount = 0;
let fpsRate = 'calculating...';

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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // update the canvas
    context.fillStyle = 'Black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // infinite loop
    setTimeout(gameLoop, 0);

    // show fps on screen
    context.fillStyle = 'White';
    context.font = '16x Monospace';
    context.fillText('FPS: ' + fpsRate, 0, 20);

}

// load before calling gameLoop
window.onload = function(){ gameLoop() };

