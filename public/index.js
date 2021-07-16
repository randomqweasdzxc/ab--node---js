//C
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
let canvasPos = canvas.getBoundingClientRect();
console.log(canvasPos);
//S
var socket;
socket = io.connect('http://localhost:80/');
//S.CON
console.log(socket);
socket.on('newPlayer', newPMsg);
function newPMsg(tpdata){
    console.log(tpdata);
    //console.log(tpdata[socket.id]);
    //console.log('New Player: '+idx+' going to: '+rndInt);
    //players.push(new Player(tpdata[i], tpdata[i]));
}
//PLAYEWR
let players = [];
const cellSize = 100;
let frame = 0;

class Player {
    constructor(horizontalPosition,verticalPosition){
        this.x = -cellSize;
        this.y = verticalPosition;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = 2;
        this.goingTo = horizontalPosition;
    }
    update() {
        if(this.x < this.goingTo){
            this.x += this.speed;
        }       
    }
    draw() {
        ctx.fillStyle = "rgb(204, 102, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function handlePlayer() {
    for (let i = 0; i< players.length; i++) {
        players[i].update();
        players[i].draw();
    }   
}
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handlePlayer();
    frame++;
    //console.log(frame);
    requestAnimationFrame(animate);
          
}
animate();