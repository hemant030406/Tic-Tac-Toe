import React, { useEffect, useState } from "react"
import './Home.css'
import '../Auth/GlobalVariable'
import { useNavigate } from "react-router-dom"

const Home = (props) => {
    const [moves, setMoves] = useState([])
    const [type, setType] = useState('circle')
    const [ct1, setCt1] = useState(0)
    const [ct2, setCt2] = useState(0)
    const winningCond = [['1st', '2nd', '3rd'], ['4th', '5th', '6th'], ['7th', '8th', '9th'], ['1st', '4th', '7th'], ['2nd', '5th', '8th'], ['3rd', '6th', '9th'], ['1st', '5th', '9th'], ['3rd', '5th', '7th']]

    let nav = useNavigate()

    const displayMove = (player, displayText, id, opposPlayer,currTurn,nextTurn) => {
        let turnele = document.querySelector(currTurn)
        let nextturnele = document.querySelector(nextTurn)
        if(turnele != null){
            turnele.style.color = '#9ee00f'
        }
        if(nextturnele != null){
            nextturnele.style.color = 'red'
        }
        const ele = document.createElement('div')
        ele.className = player
        const node = document.createTextNode(displayText);
        ele.appendChild(node)
        const par = document.getElementById(id)
        par.appendChild(ele)
        setType(opposPlayer)
    }

    const draw = (e, id) => {
        if (moves.includes(id)) { }
        else {
            setMoves([...moves, id])
            if (type === 'cross') {
                displayMove('cross','X',id,'circle','.scoreO','.scoreX')
            }
            else {
                displayMove('circle','O',id,'cross','.scoreX','.scoreO')
            }
        }
    }

    const reset = () => {
        for (let id in moves) {
            let ele = document.getElementById(moves[id])
            ele?.replaceChildren()
        }
        setMoves([])
    }

    const Undo = () => {
        document.getElementById(moves.at(-1))?.replaceChildren()
        let idx = moves.length - 1
        const temp = [...moves]
        temp.splice(idx, 1)
        setMoves(temp)
        if (type === 'circle') {
            setType('cross')
        }
        else {
            setType('circle')
        }
    }


    const winCheck = (arr) => {
        let countcross = 0
        let countcirc = 0
        for (let idx in arr) {
            if (document.getElementById(arr[idx]).querySelector('.cross') != null) {
                countcross += 1;
            }
            else if (document.getElementById(arr[idx]).querySelector('.circle') != null) {
                countcirc += 1;
            }
        }

        if (countcross === 3) {
            setCt1(ct1 => ct1 + 1)
            return [1, arr]
        }
        else if (countcirc === 3) {
            setCt2(ct2 => ct2 + 1)
            return [2, arr]
        }
        else {
            return [null, null]
        }

    }

    const highlightWinCond = (arr, playerType, color, width) => {
        for (let idx in arr) {
            document.getElementById(arr[idx]).querySelector(`.${playerType}`).style.color = color
            document.getElementById(arr[idx]).style.borderColor = color
            document.getElementById(arr[idx]).style.borderWidth = width
        }
    }

    const displayWinner = async (msg) => {
        document.querySelector('.winner').innerHTML = msg
        await delay(2000)
        document.querySelector('.winner').innerHTML = ''
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        if (!global.authenticated) {
            nav('/')
        }

        const func = async () => {
            let xWon = false
            let oWon = false

            console.log(moves)
            let formdata = new FormData()
            formdata.append('name', 'h1')
            formdata.append('moves', moves)

            fetch('https://tictactoe-backend-utka.onrender.com/play_on', {
                method: 'POST',
                body: formdata
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.arr.split(','))
                    // setArr(data.arr.split(','))
                })

            for (let idx in winningCond) {
                const result = winCheck(winningCond[idx])
                if (result[0] === 1) {
                    xWon = true
                    highlightWinCond(result[1], 'cross', 'white', '5px')
                    displayWinner('X WON')
                    await delay(2000)
                    highlightWinCond(result[1], 'cross', 'rgb(251 220 0)', '2px')
                    reset()
                    break
                }
                else if (result[0] === 2) {
                    oWon = true
                    highlightWinCond(result[1], 'circle', 'white', '5px')
                    displayWinner('O WON')
                    await delay(2000)
                    highlightWinCond(result[1], 'circle', 'rgb(251 220 0)', '2px')
                    reset()
                    break
                }
            }
            if ((xWon === false) && (oWon === false) && (moves.length === 9)) {
                displayWinner('MATCH DRAWN')
                await delay(2000)
                reset()
            }
        }
        func()
    }, [moves]);


    return (
        <div className="tblayout">
            {/* <h1 id='mantra'>
                ॐ भूर्भुव॒ स्सुवः॑
                तत्स॑ वि॒तुर्वरे᳚ण्यं॒
                भर्गो॑ दे॒वस्य॑ धीमहि
                धियो॒ यो नः॑ प्रचो॒दया᳚त् ॥
            </h1> */}
            {/* <div id="note">NOTE :- Please wait 2-3 seconds after the game is finished.</div> */}
            <div className="tb">
                <div className="winner"></div>
                <div id="score">
                    <div className="scoreO">O: {ct2}</div>
                    <div className="scoreX">X: {ct1}</div>
                </div>
                <table>
                    <tr>
                        <td className="td" id='1st' onClick={(e) => draw(e, '1st')}>
                        </td>
                        <td className="td" id='2nd' onClick={(e) => draw(e, '2nd')}>
                        </td>
                        <td className="td" id='3rd' onClick={(e) => draw(e, '3rd')}>
                        </td>
                    </tr>
                    <tr>
                        <td className="td" id='4th' onClick={(e) => draw(e, '4th')}>
                        </td>
                        <td className="td" id='5th' onClick={(e) => draw(e, '5th')}>
                        </td>
                        <td className="td" id='6th' onClick={(e) => draw(e, '6th')}>
                        </td>
                    </tr>
                    <tr>
                        <td className="td" id="7th" onClick={(e) => draw(e, '7th')}>
                        </td>
                        <td className="td" id="8th" onClick={(e) => draw(e, '8th')}>
                        </td>
                        <td className="td" id="9th" onClick={(e) => draw(e, '9th')}>
                        </td>
                    </tr>
                </table>
                <div className="res">
                    <input type="submit" value={'Reset'} onClick={() => { reset() }}></input>
                    <input type="submit" value={'Undo'} onClick={() => { Undo() }}></input>
                </div>
            </div>
        </div>
    )
}

export default Home;
