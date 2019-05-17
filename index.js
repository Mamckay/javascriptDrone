const dgram = require('dgram');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 8889;
const PORT2 = 8890;
const HOST = '192.168.10.1';
const cp = require('child_process');
let ls = null;
let count = 0;
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const droneStatus = dgram.createSocket('udp4');
droneStatus.bind(PORT2);

// const droneVideo = dgram.createSocket('udp4');
// droneVideo.bind(PORT3);

const parsedata = message => {
    return message.toString().split(';').map(item => {
        return item.split(':');
    });
}

drone.on('message', message => {
    console.log(`${message}`);
    io.emit('drone', `${message}`);
});

droneStatus.on('message', message => {
    count++;
    if (count > 50) {
        count = 0;
        let temp = parsedata(message);
        io.emit('data', temp);
        console.log(temp);
    }
});

// ISSUE cannot bind to the same port with ffmpeg
// droneVideo.on('message', message => {
//     io.emit('video', `${typeof message}`);
//     console.log(`${message}`);
// });

io.on('connection', socket => {
    socket.on('command', command => {
        drone.send(command, 0, command.length, PORT, HOST, handleError);
    })
    socket.on('streamOn', command => {
        drone.send(command, 0, command.length, PORT, HOST, handleError);
        // ls = cp.spawn('ffplay', ['-fflags', 'nobuffer', '-x', '640', '-y', '480', 'udp://192.168.10.1:11111']);
        ls = cp.spawn('ffmpeg', ['-i', 'udp://192.168.10.1:11111', '-f', 'mpegts', 'result.mp4']);
    })
    socket.on('streamOff', command => {
        drone.send(command, 0, command.length, PORT, HOST, handleError);
        ls.kill();
    })
    socket.emit('status', 'CONNECTED');
});

function handleError(err) {
    if (err) {
        console.log('ERROR');
        console.log(err);
    }
}

server.listen(3001);

