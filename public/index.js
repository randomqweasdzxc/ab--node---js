const canvas = document.getElementById('canvas1')
var ctx = canvas.getContext('2d')
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
socket.on('otherclients', drawothers)
function drawothers(sxa, sya) {
    for (let i = 0; i< sxa.length; i++) {
        clients.push(new Player(sxa[i], sya[i]))
    }
}
socket.on('selfdraw', selfdrawing)
function selfdrawing(sx, sy){
    clients.push(new Player(sx, sy))
}
socket.on('connected', newclientdraw)
function newclientdraw(sx, sy) {
    clients.push(new Player(sx, sy))
}
socket.on('disconnected', clientpopdraw)
function clientpopdraw(sx) {
    clients.splice(sx, 1)
}
