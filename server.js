const express = require('express')
const app = express()
const server = app.listen(80)
app.use(express.static('public'))
const socket = require('socket.io')
const io = socket(server)
console.log("hello")
const rdni = require('./commun')
let clientid = []
let clientpx = []
let clientpy = []
io.on('connection', newConnection)
function newConnection(socket){
    console.log(`connected ${socket.id}`)
    socket.emit('otherclients', clientpx, clientpy)
    clientid.push(socket.id)
    console.log(clientid)
    clientpx.push(rdni())
    console.log(clientpx)
    clientpy.push(rdni())
    console.log(clientpy)
    socket.emit('selfdraw', clientpx[clientid.indexOf(socket.id)], clientpy[clientid.indexOf(socket.id)])
    socket.broadcast.emit('connected', clientpx[clientid.indexOf(socket.id)], clientpy[clientid.indexOf(socket.id)])
    socket.on('disconnect', function() {
        console.log(`disconnected ${socket.id}`)
        socket.broadcast.emit('disconnected', clientid.indexOf(socket.id))
        clientpx.splice(clientid.indexOf(socket.id),1)
        console.log(clientpx)
        clientpy.splice(clientid.indexOf(socket.id),1)
        console.log(clientpy)
        clientid.splice(clientid.indexOf(socket.id),1)
        console.log(clientid)
    })
}

