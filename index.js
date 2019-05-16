const dgram = require('dgram');
const wait = require('waait');
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cv = require('opencv');
const fs = require('fs');
const PORT = 8889;
const PORT2 = 8890;
const PORT3 = 11111;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

// const droneStatus = dgram.createSocket('udp4');
// droneStatus.bind(PORT2);

// const droneVideo = dgram.createSocket('udp4');
// droneVideo.bind(PORT3);
drone.on('message', message => {
    io.emit('drone', `${message}`);
    console.log(`${message}`);
});

// droneStatus.on('message', message => {
//     console.log(`${message}`);
// });

// ISSUE cannot bind to the same port with ffmpeg
// droneVideo.on('message', message => {
//     io.emit('video', `${typeof message}`);
//     console.log(`${message}`);
// });

io.on('connection', socket => {
    socket.on('command', command => {
        drone.send(command, 0, command.length, PORT, HOST, handleError);
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

