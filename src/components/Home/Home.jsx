import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Home.css'
import {URL,WSURL} from '../Utils/Utils';
import Fetch from '../Fetch/Fetch';
import Table from './Table';
import Nav from '../Nav/Nav';

const Home1 = () => {
    const ws = useRef(null);

    const [Turn, setTurn] = useState('O')

    const [call, setCall] = useState(0);

    const [moves, setMoves] = useState([]);

    const [scoreO, setscoreO] = useState(0)
    const [scoreX, setscoreX] = useState(0)

    const toggleTurn = {
        'O': 'X',
        'X': 'O'
    }

    const { roomName } = useParams();

    let nav = useNavigate()

    const wsSend = (id, action) => {
        let data = {
            'id': id,
            'turn': Turn,
            'room': roomName,
            'action': action
        }
        ws.current.send(JSON.stringify(data))
    }

    const update = (e) => {
        let id = e.currentTarget.id;
        setCall(call == 0 ? 1 : 0);
        wsSend(id, 'move')
    }

    const authenticate = async () => {
        let data = await Fetch(URL + 'auth', null, 'GET')
        if (!data.ok) {
            nav('/')
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
    }

    const reset = () => {
        wsSend('reset','reset')
    }

    const undo = () => {
        wsSend('undo','undo')
    }

    const del = async (action) =>{
        wsSend('',action)
        let body = {
            action: action,
            room: roomName
        }
        await Fetch(URL + 'delete', JSON.stringify(body), 'POST')
    }

    useEffect(() => {
        authenticate()
        ws.current = new WebSocket(WSURL + roomName);
    }, [])

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = async (event) => {
                const completedata = JSON.parse(event.data)
                if (completedata.type == 'connection.message') {
                    retrieveMoves(completedata)
                }
                else {
                    if (completedata.ok && completedata.action == 'move') {
                        let data = completedata.data;
                        updateBoard(data)
                    }
                    else if(completedata.action == 'reset'){
                        setMoves({})
                        setTurn('O')
                        window.location.reload();
                    }
                    else if(completedata.action == 'undo'){
                        let data = completedata.data
                        const newMoves = {...moves}
                        delete newMoves[data.id]
                        setMoves(newMoves)
                        setTurn(toggleTurn[data['turn']]);
                        window.location.reload();
                    }
                    else if(completedata.action == 'delete'){
                        window.location.reload()
                    }
                    if(completedata.won == 'O' || completedata.won == 'X' || completedata.won == 'draw'){
                        reset()
                    }
                }
            }
        }
    }, [call])


    return (
        <>
        <Nav del = {() => del('delete')}/>
        <div className="tblayout">
            <div className="tb">
                <div id="score">
                    <div className="scoreO" style={{ color: Turn == 'O' ? '#9ee00f' : 'red' }}>O: {scoreO}</div>
                    <div className="scoreX" style={{ color: Turn == 'X' ? '#9ee00f' : 'red' }}>X: {scoreX}</div>
                </div>
                <Table update={update}></Table>
                <div className="res">
                    <button className="btn btn-outline-warning btn-lg" style={{fontSize:'175%',fontWeight:'500',borderRadius:'3rem',borderWidth:'2px'}} type="submit" value={'Reset'}  onClick={() => { reset() }}> Reset </button>
                    <button className="btn btn-outline-warning btn-lg" type="submit" value={'Undo'} onClick={() => { undo() }} style={{fontSize:'175%',fontWeight:'500',borderRadius:'2rem',borderWidth:'2px'}}> Undo</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home1
