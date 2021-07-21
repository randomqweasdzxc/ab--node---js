let canvas = document.getElementById('canvas1')
let ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 800
let clients = []
const cellSize = 100
class Player {
    constructor(horizontalPosition,verticalPosition){
        this.x = horizontalPosition
        this.y = verticalPosition
        this.width = cellSize
        this.height = cellSize
        this.speed = 2
    }
    draw() {
        ctx.fillStyle = "rgb(204, 102, 0)"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
function handlePlayer() {
    for (let i = 0; i< clients.length; i++) {
        clients[i].draw()
    }
}
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    handlePlayer()
    requestAnimationFrame(animate)
}
animate()
//NODE
var socket = io.connect('http://localhost:80/')
socket.on('disconnected', clientpopdraw)
function clientpopdraw(sx) {
    clients.splice(sx, 1)
}
socket.on('otherclients', drawothers)
function drawothers(sxa, sya) {
    for (let i = 0; i< sxa.length; i++) {
        clients.push(new Player(sxa[i], sya[i]))
    }
}
socket.on('selfdraw', selfdrawing)
function selfdrawing(selfx, selfy){
    clients.push(new Player(selfx, selfy))
}
socket.on('connected', newclientdraw)
function newclientdraw(sx, sy) {
    clients.push(new Player(sx, sy))
}
socket.on('serverkeyoutput', clientupdatedraw)
function clientupdatedraw(k, sid, sn) {
    console.log(k, sid, sn)
    console.log(clients[sid].x)
    if(k=== 37){
        while(clients[sid].x != sn && sn  >= 0){
            clients[sid].x --
        }
    }
    if(k=== 38){
        while(clients[sid].y != sn && sn  >= 0){
            clients[sid].y --
        }
    }
    if(k=== 39){
        while(clients[sid].x != sn && sn  <= 800){
            clients[sid].x ++
        }
    }
    if(k=== 40){
        while(clients[sid].y != sn && sn  <= 800){
            clients[sid].y ++
        }
    }
}
//K up38 down40 left37 right39
function keydown(e) {
    console.log(e.keyCode);
    if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
        socket.emit('clientkeyinput', e.keyCode);
    }
}
document.addEventListener('keydown', keydown);
