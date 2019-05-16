import React, { useState, useEffect } from 'react';
import './App.css';
import socket from './socket';

function App() {

  const [status, updateStatus] = useState('Offline');
  const [video, videoStatus] = useState(null);

  function sendCommand(command) {
    return function () {
      console.log(`Sending the command ${command}`);
      socket.emit('command', command);
    };
  }

  useEffect(() => {
    socket.on('status', updateStatus);
    socket.on('video', videoStatus);
  }, []);

  return (
    <div className="App">
      <div>
        {status}
      </div>
      <button onClick={sendCommand('command')}>Command</button>
      <button onClick={sendCommand('takeoff')}>Take Off</button>
      <button onClick={sendCommand('land')}>Land</button>
      <button onClick={sendCommand('streamon')}>Stream on</button>
      <button onClick={sendCommand('streamoff')}>Stream off</button>
      <button onClick={sendCommand('emergency')}>EMERGENCY</button>
      <button onClick={sendCommand('battery?')}>Battery</button>
    </div>
  );
}

export default App;
