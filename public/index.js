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
function newPMsg(idx, rndInt, allPlayers){
    console.log(allPlayers);
    console.log('New Player: '+idx+' going to: '+rndInt);
    players.push(new Player(rndInt, rndInt));
}
//PLAYEWR
const players = [];
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
//K
function keydown(e) {
    console.log(e.keyCode);
    var data = e.keyCode;
    //K.S
    socket.emit('keyB1', data);
}
document.addEventListener('keydown', keydown);
//K.S
socket.on('keyB2', newMsgk);
function newMsgk(idx, data){
    console.log(idx);
    console.log(data);
}
//M
const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
}
//M.C
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPos.left;
    mouse.y = e.y - canvasPos.top;
    console.log('Mouse X , Y : ' + mouse.x + ' , ' + mouse.y);
    var data = {
        x: mouse.x,
        y: mouse.y
    }
    //M.S
    socket.emit('mouse', data);
})
canvas.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})
//M.S
socket.on('mouse', newMsg);
function newMsg(idx, data){
    console.log(idx);
    console.log(data);
}
//q
function collision(first, second){
    if(
        !(  first.x > second.x + second.width ||
            first.x + first.width < second.x || 
            first.y > second.y + second.height ||
            first.y + first.height < second.y)
    ){
        return true;

    };
};
