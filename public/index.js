//C
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
let canvasPos = canvas.getBoundingClientRect();
//S
var socket;
socket = io.connect('http://localhost:80/');
//S.CON
socket.on('newPlayer', newPMsg);
function newPMsg(pxs, pys){
    console.log(pxs);
    console.log(pys);
    for (let i = 0; i< pxs.length; i++) {
        players.push(new Player(pxs[i], pys[i]));
        console.log(players);
    } 
}
//PLAYEWR
let players = [];
const cellSize = 100;

class Player {
    constructor(horizontalPosition,verticalPosition){
        this.x = horizontalPosition;
        this.y = verticalPosition;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw() {
        ctx.fillStyle = "rgb(204, 102, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function handlePlayer() {
    for (let i = 0; i< players.length; i++) {
        players[i].draw();
    }   
}
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handlePlayer();
    requestAnimationFrame(animate);
          
}
animate();
