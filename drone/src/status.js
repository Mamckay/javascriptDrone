import React, { useState, useEffect } from 'react';
import socket from './socket';

export default function Status() {

    const [status, updateStatus] = useState('Offline');
    const [video, videoStatus] = useState(null);

    useEffect(() => {
        socket.on('status', updateStatus)
    }, [])

    return <div>{status}</div>
}
