let width;
let height;
let tileSize;
let canvas;
let fps;
let ctx;
let snake;      
let food;
let score;
let isPaused;
let interval;


window.addEventListener("load",function(){
    game();

});

window.addEventListener("keydown", function (evt) {
    if (evt.key === " ") {
        evt.preventDefault();
        isPaused = !isPaused;
        showPaused();
    
}
else if (evt.key === "ArrowUp") {
    evt.preventDefault();
    if (snake.velY != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
    snake.dir(0, -1);

}
else if (evt. key === "ArrowDown") {
    evt.preventDefault();
    if (snake.velY != -1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
    snake.dir(0, 1);
}

else if (evt. key === "ArrowLeft") {
    evt.preventDefault();
    if (snake.velY != 1 && snake.x >= 0 && snake.x <=width && snake.y >= 0 && snake.y <= height)
    snake.dir(-1, 0);
}

else if (evt. key === "ArrowRight") {
    evt.preventDefault();
    if (snake.velY != -1 && snake.x >= 0 && snake.x <=width && snake.y >= 0 && snake.y <= height)
    snake.dir(1, 0);
}
});

function spawnLocation(){

    let rows = width / tileSize;
    let cols = height / tileSize;

    let xPos, yPos;

    xPos = Math.floor(Math.random() * rows) * tileSize;
    yPos = Math.floor(Math.random() * cols) * tileSize;

    return { x: xPos, y: yPos };
}

function showScore(){
    ctx.textAlign = "center";
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE: " + score, width - 120, 30); 
}

function showPaused() {
    ctx.textAlign = "center";
    ctx.font = "35px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("PAUSED", width / 2, height / 2);
}

class Snake {
    constructor(pos, color) {
        this.x = pos.x;
        this.y = pos.y;
        this.tail = [{ x: pos.x = tileSize, y: pos.y }, { x: pos.x - tileSize * 2, y: pos.y }];
        this.velX = 1;
        this.velY = 0;
        this.color = color;

    }
    //Drawing of the head.
draw () {

    ctx.beginPath();
    ctx.rect(this.x, this.y, tileSize, tileSize);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
    
    // Drawing tail of the snake.
    for (var i= 0; i < this.tail.length; i++) {
        ctx.beginPath();
        ctx.rect(this.tail[i].x, this.tail[i].y, tileSize, tileSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

    }}
    move() {

        for (var i = this.tail.length -1; i > 0; i--) {
            
            this.tail[i] = this.tail[i - 1];
        }
        
        if (this.tail.length !=0)
        this.tail[0] = { x: this.x, y: this.y };

        this.x += this.velX * tileSize;
        this.y += this.velY * tileSize;
    }
    dir(dirX, dirY) {
        this.velX = dirX;
        this.velY = dirY;
    }
    
    eat() {
        if (Math.abs(this.x - food.x) < tileSize && Math.abs(this.y - food.y) < tileSize){
    
        this.tail.push({});
        return true;
    }
    
    return false;
    
    }
    
    die() {
        for (var i = 0; i < this.tail.length; i++) {
            if (Math.abs(this.x - this.tail[i].x) < tileSize && Math.abs(this.y - this.tail[i].y) < tileSize){
                
                return true;
    
            }
        }
        return false;
    }
    
    
    border(){
        if (this.x + tileSize > width && this.velX != -1 || this.x < 0 && this.velX != 1)
        this.x = width - this.x;
    
        else if (this.y + tileSize > height && this.velY != -1 || this.velY != 1 && this.y < 0)
        this.y = height - this.y;
    }
}



class Food{

    constructor(pos, color){
        this.x = pos.x;
        this.y = pos.y;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, tileSize, tileSize);
        ctx.fullStyle = this.color;
        ctx.fill();
        ctx.strokeSytle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

    }
}
function init() {
    tileSize = 20;

    width = tileSize * Math.floor(window.innerWidth / tileSize);
    height = tileSize * Math.floor(window.innerHeight / tileSize);

    fps = 10;

    canvas = document. getElementById("game-area");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    isPaused = false;
    score = 0
    ispaused = false;
    snake = new Snake({ x: tileSize * Math. floor(width / (2 * tileSize )), y:
    tileSize * Math.floor(height / (2 * tileSize)) }, "#9400D3");
    food = new Food(spawnLocation(), "pink");
} 
function update(){
    if (isPaused) {
        return;
    }
    
    if (snake.die()) {
        alert("GAME OVER!!!");
        clearInterval(interval);
        window.location.reload();
    }
    snake.border();

    if (snake.eat()) {
        score += 10;
        food = new Food(spawnLocation(), "red");
    }

    ctx.clearRect(0, 0, width, height);    
    
    food.draw();
    snake.draw();
    snake.move();
    showScore();
}
function game(){

    init();
    interval = setInterval(update,1100/fps);

}