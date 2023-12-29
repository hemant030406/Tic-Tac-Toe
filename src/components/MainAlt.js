import React, { useEffect, useState } from "react"

function MainAlt(params) {
    const [arr, setArr] = useState([])
    const [name, setName] = useState('circle')
    const [ct1, setCt1] = useState(0)
    const [ct2, setCt2] = useState(0)
    const draw = (e, id) => {
        if (arr.includes(id)) { }
        else {
            setArr([...arr, id])
            if (name == 'cross') {
                const ele = document.createElement('div')
                ele.className = 'cross'
                // \u2718
                const node = document.createTextNode("X");
                ele.appendChild(node)
                const par = document.getElementById(id)
                par.appendChild(ele)
                setName('circle')
            }
            else {
                const inele = document.createElement('div')
                inele.className = 'circle'
                const node = document.createTextNode("O");
                inele.appendChild(node)
                const par = document.getElementById(id)
                par.appendChild(inele)
                setName('cross')
            }
        }
    }

    const reset = () => {
        for (let id in arr) {
            let ele = document.getElementById(arr[id])
            ele?.replaceChildren()
        }
        setArr([])
    }

    const Undo = () => {
        document.getElementById(arr.at(-1))?.replaceChildren()
        let idx = arr.length - 1
        const temp = [...arr]
        temp.splice(idx, 1)
        setArr(temp)
        if (name == 'circle') {
            setName('cross')
        }
        else {
            setName('circle')
        }
    }

    const allArr = [['1st', '2nd', '3rd'], ['4th', '5th', '6th'], ['7th', '8th', '9th'], ['1st', '4th', '7th'], ['2nd', '5th', '8th'], ['3rd', '6th', '9th'], ['1st', '5th', '9th'], ['3rd', '5th', '7th']]

    const check = (arr1) => {
        let countcross = 0
        let countcirc = 0
        for (let idx in arr1) {
            if (document.getElementById(arr1[idx]).querySelector('.cross') != null) {
                countcross += 1;
            }
        }
        for (let id in arr1) {
            if (document.getElementById(arr1[id]).querySelector('.circle') != null) {
                countcirc += 1;
            }
        }
        if (countcross == 3) {
            setCt1(ct1 => ct1 + 1)
            return 'Player 1 Won'
        }
        else if (countcirc == 3) {
            setCt2(ct2 => ct2 + 1)
            return 'Player 2 Won'
        }
        else {
            return 'None'
        }

    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        const func = async () => {
            let xWon = false
            let oWon = false
            for (let idx in allArr) {
                const out = check(allArr[idx])
                if (out == 'Player 1 Won') {
                    xWon = true
                    document.querySelector('.winner').innerHTML = 'X Won'
                    await delay(2000)
                    reset()
                    document.querySelector('.winner').innerHTML = ''
                    break
                }
                else if (out == 'Player 2 Won') {
                    oWon = true
                    document.querySelector('.winner').innerHTML = `O Won`
                    await delay(2000)
                    reset()
                    document.querySelector('.winner').innerHTML = ''
                    break
                }
            }
            if ((xWon == false) && (oWon == false) && (arr.length == 9)) {
                document.querySelector('.winner').innerHTML = `Match Drawn`
                await delay(2000)
                reset()
                document.querySelector('.winner').innerHTML = ''
            }
        }
        func()
    }, [arr]);


    return (
        <>
            <h1 id='mantra'>
                ॐ भूर्भुव॒ स्सुवः॑
                तत्स॑ वि॒तुर्वरे᳚ण्यं॒
                भर्गो॑ दे॒वस्य॑ धीमहि
                धियो॒ यो नः॑ प्रचो॒दया᳚त् ॥
            </h1>
            <div id="note">NOTE :- Please wait 2-3 seconds after the game is finished.</div>
            <div className="tb">
                <div className="winner"></div>
                <div id="player">
                    <div className="player" style={{ display: 'inline'}}>X: {ct1}</div>
                    <div className="player" style={{ display: 'inline', marginLeft: '1rem' }}>O: {ct2}</div>
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
        </>
    )
}

export default MainAlt;
