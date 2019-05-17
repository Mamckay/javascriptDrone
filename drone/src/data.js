import React, { useState, useEffect } from 'react';
import socket from './socket';
import './data.css';


export default function Data() {
    const [data, updateData] = useState([]);
    useEffect(() => {
        socket.on('data', updateData);
    }, [])

    const formatData = data.map((item, index) => {
        if (index === data.length - 1) {

        } else {
            return <div>{item[0]} <br></br> {item[1]}</div>

        }
    })
    return <div className='data-row'>{formatData}</div>
}