import React, { useState, useEffect } from 'react';
import socket from './socket';

export default function Controls() {

    function sendCommand(command) {
        return function () {
            socket.emit('command', command);
        };
    }
    function streamOn() {
        return function () {
            socket.emit('streamOn', 'streamon');
        };
    }
    function streamOff() {
        return function () {
            socket.emit('streamOff', 'streamoff');
        };
    }

    return <div><button onClick={sendCommand('command')}>Command</button>
        <button onClick={sendCommand('takeoff')}>Take Off</button>
        <button onClick={sendCommand('land')}>Land</button>
        <button onClick={streamOn()}>Stream on</button>
        <button onClick={streamOff()}>Stream off</button>
        <button onClick={sendCommand('emergency')}>EMERGENCY</button>
        <button onClick={sendCommand('battery?')}>Battery</button>
        <button onClick={sendCommand('up 20')}>up</button>
        <button onClick={sendCommand('down 20')}>down</button>
        <button onClick={sendCommand('left 20')}>left</button>
        <button onClick={sendCommand('right 20')}>right</button>
        <button onClick={sendCommand('forward 20')}>forward</button>
        <button onClick={sendCommand('back 20')}>back</button>
        <button onClick={sendCommand('cw 45')}>turn 45</button>
        <button onClick={sendCommand('ccw 45')}>turn 45</button>
        <button onClick={sendCommand('cw 90')}>turn 90</button>
        <button onClick={sendCommand('ccw 90')}>turn 90</button>
        <button onClick={sendCommand('flip l')}>flip left</button>
        <button onClick={sendCommand('flip r')}>flip right</button>
        <button onClick={sendCommand('flip f')}>flip forwards</button>
        <button onClick={sendCommand('flip b')}>flip backwards</button></div>
}
