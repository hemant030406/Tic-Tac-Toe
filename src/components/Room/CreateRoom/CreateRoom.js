import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import '../../Auth/GlobalVariable'

const CreateRoom = () => {

    const [opt,setOpt] = useState('Create')
    let roomName='';
    let code='';
    let nav = useNavigate()

    const changeOpt = () => {
        setOpt(opt == 'Create' ? 'Join'  : 'Create')
    }

    const handleclick = () => {
        if (roomName != '') {
            var formdata = new FormData();
            formdata.append("name", roomName);
            formdata.append("code", code);

            var requestOptions = {
                method: 'POST',
                body: formdata,
            };

            fetch(`https://tictactoe-backend-utka.onrender.com/${opt}`, requestOptions)
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
                    {opt} Room</button>
            </div> 
            <div id="crtOrJn">
                Want to {opt} a room?<p style={{display:'inline',textDecoration:'underline',color:'blue',cursor:'pointer',marginLeft:'0.5rem'}} onClick={()=>changeOpt()}>{opt} room</p>
            </div>
        </div>
        </div>
    )
}

export default CreateRoom