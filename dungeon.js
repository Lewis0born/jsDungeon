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

// map
const MAP_SIZE = 16;
const MAP_SCALE = 10;
const MAP_RANGE = MAP_SCALE * MAP_SIZE;
const MAP_SPEED = (MAP_SCALE / 2) / 10; // speed of player movement

let map = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,  
];

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
    context.fillStyle = 'White';
    context.fillRect(canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT, WIDTH, HEIGHT);

    // draw map
    for (let row = 0; row < MAP_SIZE; row++){
        for (let col = 0; col < MAP_SIZE; col++){
            let square = row * MAP_SIZE + col;

            // draw rect if map tile == 1
            if(map[square] == 1){
                context.fillStyle = '#555';
                context.fillRect(Math.floor(canvas.width / 2 - MAP_RANGE / 2) + col * MAP_SCALE, 
                                Math.floor(canvas.height / 2 - MAP_RANGE / 2) +row * MAP_SCALE, MAP_SCALE, MAP_SCALE);
            } else {
                context.fillStyle = '#aaa';
                context.fillRect(Math.floor(canvas.width / 2 - MAP_RANGE / 2) + col * MAP_SCALE, 
                                Math.floor(canvas.height / 2 - MAP_RANGE / 2) +row * MAP_SCALE, MAP_SCALE, MAP_SCALE);
            }
        }
    }
    
    // infinite loop
    setTimeout(gameLoop, cycleDelay);

    // show fps on screen
    context.fillStyle = 'tomato';
    context.font = '11x Monospace';
    context.fillText('FPS: ' + fpsRate, 0, 20);

}

// load before calling gameLoop
window.onload = function(){ gameLoop() };

