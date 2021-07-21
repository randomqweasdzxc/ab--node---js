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
    socket.on('clientkeyinput', function(key){
        console.log(`socket: ${socket.id} index: ${clientid.indexOf(socket.id)} move`)
        console.log(`from x: ${clientpx[clientid.indexOf(socket.id)]}`)
        console.log(`from y: ${clientpy[clientid.indexOf(socket.id)]}`)
        console.log(`key: ${key}`)
        if(key === 37 || key === 38 || key === 39 || key === 40){
            if(key== 37 && clientpx[clientid.indexOf(socket.id)] >= 100){
                clientpx[clientid.indexOf(socket.id)] = clientpx[clientid.indexOf(socket.id)] - 100
                console.log(`moved x: ${clientpx[clientid.indexOf(socket.id)]}`)
                io.sockets.emit('serverkeyoutput', key, clientid.indexOf(socket.id), clientpx[clientid.indexOf(socket.id)])
            }
            if(key== 38 && clientpy[clientid.indexOf(socket.id)] >= 100){
                clientpy[clientid.indexOf(socket.id)] = clientpy[clientid.indexOf(socket.id)] - 100
                console.log(`moved y: ${clientpy[clientid.indexOf(socket.id)]}`)
                io.sockets.emit('serverkeyoutput', key, clientid.indexOf(socket.id), clientpy[clientid.indexOf(socket.id)])
            }
            if(key== 39 && clientpx[clientid.indexOf(socket.id)] <= 600){
                clientpx[clientid.indexOf(socket.id)] = clientpx[clientid.indexOf(socket.id)] + 100
                console.log(`moved x: ${clientpx[clientid.indexOf(socket.id)]}`)
                io.sockets.emit('serverkeyoutput', key, clientid.indexOf(socket.id), clientpx[clientid.indexOf(socket.id)])
            }
            if(key== 40 && clientpy[clientid.indexOf(socket.id)] <= 600){
                clientpy[clientid.indexOf(socket.id)] = clientpy[clientid.indexOf(socket.id)] + 100
                console.log(`moved y: ${clientpy[clientid.indexOf(socket.id)]}`)
                io.sockets.emit('serverkeyoutput', key, clientid.indexOf(socket.id), clientpy[clientid.indexOf(socket.id)])
            }
        }
    })
}
