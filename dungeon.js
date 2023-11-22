/**************************************************************
 * 
 *                jsDungeon - make it sp00ky
 * 
 **************************************************************/

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
const MAP_SIZE = 32;
const MAP_SCALE = 10;
const MAP_RANGE = MAP_SCALE * MAP_SIZE;
const MAP_SPEED = (MAP_SCALE / 2) / 10; // speed of player movement

// each integer associate with different textures
let map = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

let showMap = false;

// player
let playerX = MAP_SCALE + 20;
let playerY = MAP_SCALE + 20;
// where player is initially facing
let playerAngle = Math.PI / 3;
let playerMoveX = 0;
let playerMoveY = 0;
let playerMoveAngle = 0;

// handle user inputs
document.onkeydown = function(event){
    switch(event.keyCode){
        // ArrowDown
        case 40: 
            playerMoveX = -1; 
            playerMoveY = -1;
            break;
        // ArrowUp
        case 38:
            playerMoveX = 1;
            playerMoveY = 1;
            break;
        // ArrowLeft
        case 37:
            playerMoveAngle = 1;
            break;
        // ArrowRight
        case 39:
            playerMoveAngle = -1;
            break;
        case 16:
            showMap = true;
            break;
    }
}

// reset playerMove variables to zero when key not pressed
document.onkeyup = function(event) {
    switch(event.keyCode){
        // ArrowDown
        case 40: 
        // ArrowUp
        case 38:
            playerMoveX = 0;
            playerMoveY = 0;
            break;
        // ArrowLeft
        case 37:
        // ArrowRight
        case 39:
            playerMoveAngle = 0;
            break;
        case 16:
            showMap = false;
            break;
    }
}

// camera
const DOUBLE_PIE = 2 * Math.PI;
const FOV = Math.PI / 3;
const HALF_FOV = FOV / 2;
const STEP_ANGLE = FOV / WIDTH;

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

    // update player position
    // Move forward along playerAngle (* by map_speed makes movement speed relative to map)
    var playerOffsetX = Math.sin(playerAngle) * MAP_SPEED;
    var playerOffsetY = Math.cos(playerAngle) * MAP_SPEED;

    // check for collisions before updating player position
    var mapTargetX = Math.floor((playerY + playerOffsetY) / MAP_SCALE) * MAP_SIZE + Math.floor((playerX + playerOffsetX * playerMoveX) / MAP_SCALE);
    var mapTargetY = Math.floor((playerY + playerOffsetY * playerMoveY) / MAP_SCALE) * MAP_SIZE + Math.floor(playerX / MAP_SCALE);
    // move player based on collisions
    if (playerMoveX && map[mapTargetX] == 0) {
        playerX += playerOffsetX * playerMoveX;
    }
    if (playerMoveY && map[mapTargetY] == 0) {
        playerY += playerOffsetY * playerMoveY;
    }
    if (playerMoveAngle) {
        playerAngle += 0.03 * playerMoveAngle;
    }

    // calculate map and player offsets 
    let mapOffsetX = Math.floor(canvas.width / 2) - 149;
    let mapOffsetY = 4; 
    // 
    let playerMapX = (playerX / MAP_SCALE) * 5 + mapOffsetX;
    let playerMapY = (playerY / MAP_SCALE) * 5 + mapOffsetY;

    // RAYCASTING..
    let currentAngle = playerAngle + HALF_FOV;
    let rayStartX = Math.floor(playerX / MAP_SCALE) * MAP_SCALE; //convert player position to start of tile
    let rayStartY = Math.floor(playerY / MAP_SCALE) * MAP_SCALE;

    // loop over casted rays
    for(let ray = 0; ray < WIDTH; ray++){

        // get current angle sin and cos
        let currentSin = Math.sin(currentAngle);
        currentSin = currentSin ? currentSin : 0.000001;
        let currentCos = Math.cos(currentAngle);
        currentCos = currentCos ? currentCos : 0.000001;

        // vertical line intersection
        let rayEndX, rayEndY, rayDirectionX, verticalDepth;
        if (currentSin > 0) {
            rayEndX = rayStartX + MAP_SCALE;
            rayDirectionX = 1;
        } else {
            rayEndX = rayStartX; rayDirectionX = -1;
        }

        for (let offset = 0; offset < MAP_RANGE; offset += MAP_SCALE){
            verticalDepth = (rayEndX - playerX) / currentSin;
            rayEndY = playerY + verticalDepth * currentCos;
            let mapTargetX = Math.floor(rayEndX / MAP_SCALE); //which tile?
            let mapTargetY = Math.floor(rayEndY / MAP_SCALE);
            if(currentSin <= 0){
                mapTargetX += rayDirectionX;
            }
            let targetSquare = mapTargetY * MAP_SIZE + mapTargetX;
            if(targetSquare < 0 || targetSquare > map.length - 1){
                break;
            }
            if (map[targetSquare] != 0){
                break;
            }
            rayEndX += rayDirectionX * MAP_SCALE;
        }
     
        // horizontal line intersection
        var rayDirectionY, horizontalDepth;
        if (currentCos > 0) {
            rayEndY = rayStartY + MAP_SCALE;
            rayDirectionY = 1;
        } else {
            rayEndY = rayStartY; 
            rayDirectionY = -1;
        }

        for (let offset = 0; offset < MAP_RANGE; offset += MAP_SCALE){
            horizontalDepth = (rayEndY - playerY) / currentCos;
            rayEndX = playerX + horizontalDepth * currentSin;
            let mapTargetX = Math.floor(rayEndX / MAP_SCALE); //which tile?
            let mapTargetY = Math.floor(rayEndY / MAP_SCALE);
            if(currentCos <= 0){
                mapTargetY += rayDirectionY;
            }
            let targetSquare = mapTargetY * MAP_SIZE + mapTargetX;
            if(targetSquare < 0 || targetSquare > map.length - 1){
                break;
            }
            if (map[targetSquare] != 0){
                break;
            }
            rayEndY += rayDirectionY * MAP_SCALE;
        }

        // 3D Projection (one pixel rect per ray)
        // fisheye caused by longer rays the further offcenter
        let depth = verticalDepth < horizontalDepth ? verticalDepth : horizontalDepth;
        //fix fisheye
        depth *= Math.cos(playerAngle - currentAngle);
        let wallHeight = Math.min(MAP_SCALE * 300 / (depth + 0.0001), HEIGHT);
        context.fillStyle = verticalDepth < horizontalDepth ? 'tomato': 'coral';
        context.fillRect(mapOffsetX + ray, mapOffsetY + (HEIGHT / 2 - wallHeight / 2), 1, wallHeight);

        // update current angle
        currentAngle -= STEP_ANGLE;
    }

    


    // draw map on left shift
    if(showMap){
        // draw 2d map
        for (let row = 0; row < MAP_SIZE; row++){
            for (let col = 0; col < MAP_SIZE; col++){
                let square = row * MAP_SIZE + col;

                // draw rect if map tile == 1
                if(map[square] != 0){
                    context.fillStyle = 'tomato';
                    context.fillRect(mapOffsetX + col * 5, mapOffsetY + row * 5, 5, 5);
                } else {
                    context.fillStyle = 'Black';
                    context.fillRect(mapOffsetX + col * 5, mapOffsetY + row * 5, 5, 5);
                }
            }
        }

        // Calculate endpoint coordinates based on player position, direction, and line length
        const lineLength = 5; // Adjust line length 
        const endpointX = playerX + lineLength * Math.sin(playerAngle);
        const endpointY = playerY + lineLength * Math.cos(playerAngle);

        // draw player on 2d map
        context.fillStyle = 'White';
        context.beginPath();
        context.arc(playerMapX, playerMapY, 2, 0, DOUBLE_PIE);
        context.fill();
        // draw line to show player direction
        context.strokeStyle = 'White';
        context.lineWidht = 1;
        context.beginPath();
        context.moveTo(playerMapX, playerMapY);
        context.lineTo(playerMapX + Math.sin(playerAngle) * 5, playerMapY + Math.cos(playerAngle) * 5);
        context.stroke();
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

