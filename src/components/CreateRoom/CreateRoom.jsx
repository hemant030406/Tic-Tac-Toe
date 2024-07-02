import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Fetch from "../Fetch/Fetch";
import { URL } from "../Utils/Utils"
import Alert from "./Alert";

const CreateRoom = () => {

    const [opt, setOpt] = useState('create')
    const [roomName, setroomName] = useState('')
    const [code, setCode] = useState('')
    const [alert, setAlert] = useState(null)

    let nav = useNavigate()

    const showAlert = (msg, type) => {
        setAlert({
            msg: msg,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 2500)
    }

    const changeOpt = () => {
        setOpt(opt == 'create' ? 'join' : 'create')
    }

    const handleRoom = e => {
        setroomName(e.target.value)
    }

    const handleCode = e => {
        setCode(e.target.value)
    }

    const authenticate = async () => {
        let data = await Fetch(URL + 'auth', null, 'GET')
        if (data.ok) {
            nav(`/room/${data['data'].username}`)
        }
    }

    useEffect(() => {
        authenticate()
    }, [])

    const handleclick = async () => {
        if (roomName != '') {
            let body = JSON.stringify({
                'username': roomName,
                'code': code
            })

            let data = await Fetch(URL + opt, body, 'POST')
            if (data.ok) {
                if (opt == 'join') {
                    nav(`/room/${roomName}`)
                }
                else {
                    showAlert('Room has been created.','Success')
                    setCode('')
                    setroomName('')
                }
            }
            else {
                showAlert(data.msg,data.type)
            }
        }
        else {
            nav('/')
        }
    }

    return (
        <>
        <div style={{height:'2rem'}}>
        <Alert alert={alert} />
        </div>
        <div id="all" style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div id="jr" style={{ border: '1.5px solid black', padding: '3rem', borderRadius: '2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: 'center' }}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter Room Name" aria-label="Username" aria-describedby="basic-addon1" style={{ textAlign: 'center' }} value={roomName} onChange={handleRoom} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter Room Code" aria-label="Username" aria-describedby="basic-addon1" style={{ textAlign: 'center' }} value={code} onChange={handleCode} />
                </div>
                <div id="crb">
                    <button className="btn btn-outline-light" style={{ cursor: 'pointer', borderRadius: '0.5rem', fontSize: '125%' }} onClick={() => { handleclick() }}>
                        {opt} Room</button>
                </div>
                <div id="crtOrJn">
                    Want to {opt == 'create' ? 'Join' : 'Create'} a room?<p style={{ display: 'inline', textDecoration: 'underline', color: 'blue', cursor: 'pointer', marginLeft: '0.5rem' }} onClick={() => changeOpt()}>{opt == 'create' ? 'Join' : 'Create'} room</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateRoom