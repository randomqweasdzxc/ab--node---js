var socket;
socket = io.connect('http://148.71.6.83:80/')
socket.on('mouse', newMsg);
function newMsg(idx, data){
    console.log(idx);
    console.log(data);
}
socket.on('keyB', newMsg1);
function newMsg1(idx, data){
    console.log(idx);
    console.log(data);
}
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
}
let canvasPos = canvas.getBoundingClientRect();
console.log(canvasPos);
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPos.left;
    mouse.y = e.y - canvasPos.top;
    console.log('Mouse X , Y : ' + mouse.x + ' , ' + mouse.y);
    var data = {
        x: mouse.x,
        y: mouse.y
    }
    socket.emit('mouse', data);
})
canvas.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})
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
function keydown(e) {
    console.log(e.keyCode);
    var data = e.keyCode;
    socket.emit('keyB', data);
}
document.addEventListener('keydown', keydown);
