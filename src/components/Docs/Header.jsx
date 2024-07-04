import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { FaHome } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {

    const [isHomeHovered,setIsHomeHovered] = useState(false)

    let nav = useNavigate()

    const homeStyle = {
        transition: 'transform 0.4s',
        cursor: 'pointer',
        transform: isHomeHovered ? 'scale(1.2)' : 'scale(1)',
        float:'right',
        top: 0,
        zIndex: 1000,
        marginRight: '1rem',
        marginTop: '0.3rem',
        cursor: 'pointer'
    };

    return (
        <header className="header">
        <div style={{width:'50vw',display:'inline-block',float:'left'}}>
            <Nav icons={false} color={'transparent'} />
        </div>
            <FaHome size={50} color='#00b1ffdb' style={homeStyle} onMouseOver={() => setIsHomeHovered(true)} onMouseOut={() => setIsHomeHovered(false)} onClick={() => nav('/')} />
            <h1 style={{marginTop:'5rem'}}>Tic-Tac-Toe Game Documentation</h1>
            <p>Learn how to play and implement Tic-Tac-Toe with Django WebSocket and chat functionality.</p>
        </header>
    );
}

export default Header;