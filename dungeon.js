//init canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// screen
const WIDTH = 300, HALF_WIDTH = 150;
const HEIGHT = 200, HALF_HEIGHT = 100;

// FPS
const FPS = 60;
const cycleDelay = Math.floor(1000 / FPS);
let oldCycleTime = 0;
let cycleCount = 0;
let fpsRate = '...';

// map
const MAP_SIZE = 16;
const MAP_SCALE = 10;
const MAP_RANGE = MAP_SCALE * MAP_SIZE;
const MAP_SPEED = (MAP_SCALE / 2) / 10; // speed of player movement

// each integer associate with different textures
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

// player
let playerX = MAP_SCALE + 20;
let playerY = MAP_SCALE + 20;
// where player is initially facing
let playerAngle = Math.PI / 3;

// camera
const DOUBLE_PIE = 2 * Math.PI;

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
    context.fillRect(canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT, WIDTH, HEIGHT);

    // draw map
    let mapOffsetX = Math.floor(canvas.width / 2 - MAP_RANGE / 2);
    let mapOffsetY = Math.floor(canvas.height / 2 - MAP_RANGE / 2) 

    for (let row = 0; row < MAP_SIZE; row++){
        for (let col = 0; col < MAP_SIZE; col++){
            let square = row * MAP_SIZE + col;

            // draw rect if map tile == 1
            if(map[square] != 0){
                context.fillStyle = 'tomato';
                context.fillRect(mapOffsetX + col * MAP_SCALE, mapOffsetY + row * MAP_SCALE, MAP_SCALE, MAP_SCALE);
            } else {
                context.fillStyle = 'Black';
                context.fillRect(mapOffsetX + col * MAP_SCALE, mapOffsetY + row * MAP_SCALE, MAP_SCALE, MAP_SCALE);
            }
        }
    }

    // draw player
    let playerMapX = playerX + mapOffsetX;
    let playerMapY = playerY + mapOffsetY;

    context.fillStyle = 'White';
    context.beginPath();
    context.arc(playerMapX, playerMapY, 2, 0, DOUBLE_PIE);
    context.fill();

    // draw line to show player direction
    context.strokeStyle = 'White';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(playerMapX, playerMapY);

    // Calculate endpoint coordinates based on player position, direction, and line length
    const lineLength = 5; // Adjust line length 
    const endpointX = playerX + lineLength * Math.sin(playerAngle);
    const endpointY = playerY + lineLength * Math.cos(playerAngle);

    // Draw the line to the calculated endpoint
    context.lineTo(endpointX + mapOffsetX, endpointY + mapOffsetY);
    context.stroke();
    
    // infinite loop
    setTimeout(gameLoop, cycleDelay);

    // show fps on screen
    context.fillStyle = 'tomato';
    context.font = '11x Monospace';
    context.fillText('FPS: ' + fpsRate, 0, 20);

}

// load before calling gameLoop
window.onload = function(){ gameLoop() };

