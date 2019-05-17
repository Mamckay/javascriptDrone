import React, { useState, useEffect } from 'react';
import './App.css';
import socket from './socket';
import Data from './data';
import Controls from './controls';
import Status from './status';

function App() {

  return (
    <div className="App">
      <Status></Status>
      <Data></Data>
      <Controls></Controls>
    </div>
  );
}

export default App;
