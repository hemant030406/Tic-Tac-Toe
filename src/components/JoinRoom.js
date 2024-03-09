import React from "react";
import { useNavigate,Link } from "react-router-dom";
import './GlobalVariable'

const JoinRoom = () => {

    let roomName='';
    let code='';
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

            fetch("https://tictactoe-backend-utka.onrender.com/join", requestOptions)
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

    return(
        <div id="all">
        <div id="jr">
            <input type="text" placeholder="Enter Room Name" onChange={(e)=>{
                roomName = e.target.value
            }}></input><br></br>
            <input type="password" placeholder="Enter Code" onChange={(e)=>{
                code = e.target.value
            }}></input><br></br>
            <div id="crb">
                <button style={{cursor:'pointer'}} onClick={()=>{handleclick()}}>
                    Join Room</button>
            </div> 
            <div id="crtOrJn">
                Want to create a room?<Link to='/'>create room</Link>
            </div>
        </div>
        </div>
    )
}

export default JoinRoom