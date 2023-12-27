import React from "react"

function MainAlt(params) {
    let is_circle;
    var arr = []
    const draw = (e, id) => {
        console.log(arr, 'draw')
        if (arr.includes(id)) { }
        else {
            arr.push(id)
            console.log(arr, 'draw')
            if (is_circle) {
                const ele = document.createElement('div')
                ele.className = 'cross'
                // \u2718
                const node = document.createTextNode("X");
                ele.appendChild(node)
                const par = document.getElementById(id)
                par.appendChild(ele)
                is_circle = false;
            }
            else {
                const inele = document.createElement('div')
                inele.className = 'circle'
                const node = document.createTextNode("O");
                inele.appendChild(node)
                const par = document.getElementById(id)
                par.appendChild(inele)
                is_circle = true;
            }
        }
    }

    const reset = () => {
        console.log(arr)
        for (let id in arr) {
            let ele = document.getElementById(arr[id])
            ele.replaceChildren()
        }
        arr = []
    }

    const Undo = () => {
        document.getElementById(arr.at(-1))?.replaceChildren()
        arr.pop()
        if (is_circle) {
            is_circle = false
        }
        else {
            is_circle = true
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
            return 'Player 1 Won'
        }
        else if (countcirc == 3) {
            return 'Player 2 Won'
        }
        else {
            return 'None'
        }

    }

    setInterval(() => {
            for (let idx in allArr) {
                if (check(allArr[idx]) == 'Player 1 Won') {
                    document.querySelector('.winner').innerHTML = 'X Won'
                    arr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th','10th']
                    setTimeout(() => {
                        document.querySelector('.winner').innerHTML = ''
                        arr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']
                        reset()
                    }, 2000)
                    break
                }
                else if (check(allArr[idx]) == 'Player 2 Won') {
                    document.querySelector('.winner').innerHTML = `O Won`
                    arr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th','10th']
                    setTimeout(() => {
                        document.querySelector('.winner').innerHTML = ''
                        arr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']
                        reset()
                    }, 2000)
                    break
                }
                else if ((check(allArr[idx]) == 'None') && arr.length==9) {
                    document.querySelector('.winner').innerHTML = `Match Drawn`
                    setTimeout(() => {
                        document.querySelector('.winner').innerHTML = ''
                        reset()
                    }, 2000)
                    break
                }
        }
    }, 1000);


    return (
        <>
            <h1 id='mantra'>
                ॐ भूर्भुव॒ स्सुवः॑
                तत्स॑ वि॒तुर्वरे᳚ण्यं॒
                भर्गो॑ दे॒वस्य॑ धीमहि
                धियो॒ यो नः॑ प्रचो॒दया᳚त् ॥
            </h1>
            <div id="note">NOTE :- Please wait 1-2 seconds after the game is finished.</div>
            <div className="tb">
                <div className="winner"></div>
                <table>
                    <tr>
                        <td id='1st' onClick={(e) => draw(e, '1st')}>
                        </td>
                        <td id='2nd' onClick={(e) => draw(e, '2nd')}>
                        </td>
                        <td id='3rd' onClick={(e) => draw(e, '3rd')}>
                        </td>
                    </tr>
                    <tr>
                        <td id='4th' onClick={(e) => draw(e, '4th')}>
                        </td>
                        <td id='5th' onClick={(e) => draw(e, '5th')}>
                        </td>
                        <td id='6th' onClick={(e) => draw(e, '6th')}>
                        </td>
                    </tr>
                    <tr>
                        <td id="7th" onClick={(e) => draw(e, '7th')}>
                        </td>
                        <td id="8th" onClick={(e) => draw(e, '8th')}>
                        </td>
                        <td id="9th" onClick={(e) => draw(e, '9th')}>
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