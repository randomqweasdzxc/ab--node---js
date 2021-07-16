var express = require('express');
var app = express();
var server = app.listen(80);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
console.log("hello");
let tpdata = [];
io.sockets.on('connection', newConnection);
function newConnection(socket){
    socket.on('disconnect', function() {
        console.log('disconnect: ' + socket.id);
        tpdata.splice(tpdata.indexOf(socket.id), 1);
    });
    const rndX = Math.floor(Math.random() * 600) + 100;
    tpdata.push(socket.id);
    console.log(tpdata);
    io.sockets.emit('newPlayer', tpdata);
}
