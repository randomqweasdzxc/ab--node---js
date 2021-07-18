const os = require('os')
svmchn = {
    svminf: os.userInfo(),
    uptimr: os.uptime(),
    winvrs: os.type(),
    rleass: os.release(),
    totmem: os.totalmem(),
    fremem: os.freemem(),
}
module.exports = function () {
    return Math.floor(Math.random() * 600)+100;
}


