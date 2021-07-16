var express = require('express');
var app = express();
var server = app.listen(80);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
console.log("hello");
const allPlayers = [];
io.sockets.on('connection', newConnection);
function newConnection(socket){
    let idx = socket.id;
    socket.on('disconnect', function() {
        console.log('Got disconnect: '+idx);
        var i = allPlayers.indexOf(socket.id);
        allPlayers.splice(i, 1);
     });
    allPlayers.push(socket.id);
    const rndInt = Math.floor(Math.random() * 600) + 100;
    console.log('new connection: '+ socket.id + ' going to:' + rndInt);
    console.log(allPlayers);
    io.sockets.emit('newPlayer', idx, rndInt);
    socket.on('mouse', mouseMsg);
    function mouseMsg(data) {
        idx = socket.id;
        console.log('id: ' + idx);
        console.log(data);
        socket.broadcast.emit('mouse', idx, data);
    }
    socket.on('keyB1', keyMsg);
    function keyMsg(data){
        idx = socket.id;
        console.log('id: ' + socket.id + ' pressedKey');
        console.log(data);
        socket.broadcast.emit('keyB2', idx, data);
    }
}
