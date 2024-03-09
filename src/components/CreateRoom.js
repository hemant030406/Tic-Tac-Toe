import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './GlobalVariable'

const CreateRoom = () => {

    let roomName = '';
    let code = '';
    let nav = useNavigate()

    const handleclick = () => {
        if (roomName != '') {
            var formdata = new FormData();
            formdata.append("name", roomName);
            formdata.append("code", code);

            var requestOptions = {
                method: 'POST',
                body: formdata,
            };

            fetch("https://tictactoe-backend-utka.onrender.com/create", requestOptions)
                .then(data => data.json())
                .then(data => {
                    if (data.ok) {
                        global.authenticated = true
                        nav(`/room/${roomName}`)
                    }
                    else {
                        nav('/')
                    }
                })
        }
        else {
            nav('/')
        }
    }

    return (
        <div id="all">
            <div id="jr">
                <input type="text" placeholder="Enter Room Name" onChange={(e) => {
                    roomName = e.target.value
                }}></input><br></br>
                <input type="password" placeholder="Enter Code" onChange={(e) => {
                    code = e.target.value
                }}></input><br></br>
                <div id="crb">
                    <button style={{ cursor: 'pointer' }} onClick={() => { handleclick() }}>
                        Create Room</button>
                </div>
                <div id="crtOrJn">
                    Want to join a room?<Link to='/joinroom'>join room</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateRoom