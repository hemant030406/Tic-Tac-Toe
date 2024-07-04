import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Home.css'
import { URL, WSURL } from '../Utils/Utils';
import Fetch from '../Fetch/Fetch';
import Table from './Table';
import Nav from '../Nav/Nav';
import Chat from '../Chat/Chat';
import { useDispatch } from 'react-redux';
import { setMsges } from '../Reducer/msgReducer';
import Alert from '../CreateRoom/Alert';

const Home1 = () => {

    let timeoutId, timeoutId1;

    const ws = useRef(null);

    const [alert, setAlert] = useState(null)

    const [Turn, setTurn] = useState('O')

    const [call, setCall] = useState(0);

    const [moves, setMoves] = useState([]);

    const [scoreO, setscoreO] = useState(0)
    const [scoreX, setscoreX] = useState(0)

    const toggleTurn = {
        'O': 'X',
        'X': 'O'
    }

    const { roomName, name } = useParams();

    const dispatch = useDispatch()

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

    const wsSend = (id, action, msg) => {
        let data = {
            'id': id,
            'turn': Turn,
            'room': roomName,
            'action': action,
            'msg': msg,
            'name': name
        }
        ws.current.send(JSON.stringify(data))
    }

    const update = (e) => {
        let id = e.currentTarget.id;
        setCall(call == 0 ? 1 : 0);
        wsSend(id, 'move', '')
    }

    const authenticate = async () => {
        let body = JSON.stringify({
            'name': name
        })
        let data = await Fetch(URL + 'auth', body, 'POST')
        if (!data.ok) {
            nav('/room')
        }
        return data.ok
    }

    const updateBoard = data => {
        const par = document.getElementById(data['id'])
        if (!par.hasChildNodes()) {
            const ele = document.createElement('div')
            ele.className = data['turn']
            const node = document.createTextNode(data['turn']);
            ele.appendChild(node)
            par.appendChild(ele)
            setMoves(preMoves => ({ ...preMoves, [data['id']]: data['turn'] }))
            setTurn(turn => toggleTurn[turn]);
        }
    }

    const retrieveMoves = data => {
        let moves = data.moves;
        let scores = data.scores;
        let msges = data.msges;
        setMoves(moves)
        setTurn(moves['lastTurn'] == 'O' ? 'X' : 'O')
        setscoreO(scores['O'])
        setscoreX(scores['X'])
        Object.entries(moves).map(
            ([key, value]) => {
                let doc = document.getElementById(key)
                if (doc != null) {
                    doc.innerHTML = value;
                }
            }
        )
        msges.map(obj => {
            dispatch(setMsges({
                name: obj.username,
                msg: obj.message,
                time: obj.timestamp
            }))
        }
        )
    }

    const reset = () => {
        wsSend('reset', 'reset', '')
    }

    const undo = () => {
        wsSend('undo', 'undo', '')
    }

    const del = async (action) => {
        wsSend('', action, '')
        let body = {
            action: action,
            room: roomName
        }
        await Fetch(URL + 'delete', JSON.stringify(body), 'POST')
    }

    const chat = (msg) => {
        if (msg.trim() != '') {
            wsSend('', 'chat', msg)
        }
    }

    useEffect(() => {
        authenticate()
        ws.current = new WebSocket(WSURL + roomName + '/' + name);
    }, [])

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = async (event) => {
                const completedata = JSON.parse(event.data)
                if (completedata.type == 'connection.message') {
                    //Debouncing
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        retrieveMoves(completedata);
                    }, 300);
                }
                else {
                    if (completedata.ok && completedata.action == 'move') {
                        let data = completedata.data;
                        updateBoard(data)
                    }
                    else if (completedata.action == 'new joinee') {
                        clearTimeout(timeoutId1);
                        timeoutId1 = setTimeout(() => {
                            showAlert(` ${completedata.name} has joined`, 'Success')
                        }, 300);
                    }
                    else if (completedata.action == 'reset') {
                        setMoves({})
                        setTurn('O')
                        window.location.reload();
                    }
                    else if (completedata.action == 'undo') {
                        let data = completedata.data
                        const newMoves = { ...moves }
                        delete newMoves[data.id]
                        setMoves(newMoves)
                        setTurn(toggleTurn[data['turn']]);
                        window.location.reload();
                    }
                    else if (completedata.action == 'delete') {
                        window.location.reload()
                    }
                    else if (completedata.action == 'chat') {
                        dispatch(setMsges({
                            name: completedata.data.name,
                            msg: completedata.data.msg,
                            time: completedata.timestamp
                        }))
                    }
                    if (completedata.won == 'O' || completedata.won == 'X' || completedata.won == 'draw') {
                        reset()
                    }
                }
            }
        }
    }, [call])

    //rgb(100 15 85 / 24%)

    return (
        <>
            <Nav del={() => del('delete')} icons={true} color={'transparent'} />
            <div style={{ height: '2rem', marginTop: '1rem',display:'inline-block' }}>
                <Alert alert={alert} />
            </div>
                <Chat send={msg => chat(msg)} />
                <div className="tblayout">
                    <div className="tb">
                        <div id="score">
                            <div className="scoreO" style={{ color: Turn == 'O' ? '#9ee00f' : 'red' }}>O: {scoreO}</div>
                            <div className="scoreX" style={{ color: Turn == 'X' ? '#9ee00f' : 'red' }}>X: {scoreX}</div>
                        </div>
                        <Table update={update}></Table>
                        <div className="res">
                            <button className="btn btn-outline-warning btn-lg" style={{ fontSize: '175%', fontWeight: '500', borderRadius: '3rem', borderWidth: '2px' }} type="submit" value={'Reset'} onClick={() => { reset() }}> Reset </button>
                            <button className="btn btn-outline-warning btn-lg" type="submit" value={'Undo'} onClick={() => { undo() }} style={{ fontSize: '175%', fontWeight: '500', borderRadius: '2rem', borderWidth: '2px' }}> Undo</button>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Home1
