import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Fetch from "../Fetch/Fetch";
import { URL } from "../Utils/Utils"
import Alert from "./Alert";
import Nav from "../Nav/Nav";

const CreateRoom = () => {

    const [opt, setOpt] = useState('create')
    const [roomName, setroomName] = useState('')
    const [name, setName] = useState('')
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

    const authenticate = async () => {
        let data = await Fetch(URL + 'auth', null, 'GET')
        if (data.ok) {
            nav(`/room/${data['data'].username}/${data['username']}`)
        }
    }

    useEffect(() => {
        authenticate()
    }, [])

    const handleclick = async () => {
        if (roomName != '') {
            let body = JSON.stringify({
                'room': roomName,
                'code': code,
                'name': name
            })

            let data = await Fetch(URL + opt, body, 'POST')
            if (data.ok) {
                if (opt == 'join') {
                    nav(`/room/${roomName}/${name}`)
                }
                else {
                    showAlert('Room has been created.', 'Success')
                    setCode('')
                    setroomName('')
                    setName('')
                }
            }
            else {
                showAlert(data.msg, data.type)
            }
        }
        else {
            nav('/')
        }
    }

    return (
        <div>
            <Nav icons={false} color={'transparent'} />
            <div style={{ height: '2rem',marginTop:'1rem' }}>
                <Alert alert={alert} />
            </div>
            <div id="all" style={{ width: '100%',height:'70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div id="jr" style={{ border: '1.5px solid rgb(176, 176, 176)', padding: '3rem', borderRadius: '2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: 'center',backgroundColor: 'rgb(234 195 183 / 27%)' }}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter Username" aria-label="Username" aria-describedby="basic-addon1" style={{ textAlign: 'center' }} value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter Room Name" aria-label="Username" aria-describedby="basic-addon1" style={{ textAlign: 'center' }} value={roomName} onChange={e => setroomName(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter Room Code" aria-label="Username" aria-describedby="basic-addon1" style={{ textAlign: 'center' }} value={code} onChange={e => setCode(e.target.value)} />
                    </div>
                    <div id="crb">
                        <button className="btn btn-outline-light" style={{ cursor: 'pointer', borderRadius: '0.5rem', fontSize: '125%' }} onClick={() => { handleclick() }}>
                            {opt} Room</button>
                    </div>
                    <div id="crtOrJn" style={{color:'white'}}>
                        Want to {opt == 'create' ? 'Join' : 'Create'} a room?<p style={{ display: 'inline', textDecoration: 'underline', color: '#609afb', cursor: 'pointer', marginLeft: '0.5rem' }} onClick={() => changeOpt()}>{opt == 'create' ? 'Join' : 'Create'} room</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRoom