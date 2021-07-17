var express = require('express');
var app = express();
var server = app.listen(80);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
console.log("hello");
let pids = [];
let pxs = [];
let pys = [];
let ptdb = {
    ids:0,
    xs:0,
    ys:0
};
io.sockets.on('connection', newConnection);
function newConnection(socket){
    socket.on('disconnect', function() {
        console.log('disconnect: ' + socket.id);
        pxs.splice(pids.indexOf(socket.id), 1);
        pys.splice(pids.indexOf(socket.id), 1);
        pids.splice(pids.indexOf(socket.id), 1);
    });
    pids.push(socket.id);
    ptdb.ids = pids;
    let rndX = Math.floor(Math.random() * 600) + 100;
    pxs.push(rndX);
    ptdb.xs = pxs;
    let rndY = Math.floor(Math.random() * 600) + 100;
    pys.push(rndY);
    ptdb.ys = pys;
    console.log(ptdb);
    io.sockets.emit('newPlayer', pxs, pys);
}
