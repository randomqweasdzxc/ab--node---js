var express = require('express');
var app = express();
var server = app.listen(80);
app.use(express.static('public'));
console.log("hello");
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);
function newConnection(socket){
    console.log('new connection: '+ socket.id);
    socket.on('mouse', mouseMsg);
    function mouseMsg(data) {
        idx = socket.id;
        console.log('id: ' + idx);
        console.log(data);
        socket.broadcast.emit('mouse', idx, data);
    }
    socket.on('keyB', keyMsg);
    function keyMsg(data){
        idx = socket.id;
        console.log('id: ' + idx);
        console.log(data);
        socket.broadcast.emit('keyB', idx, data);
    }
}
