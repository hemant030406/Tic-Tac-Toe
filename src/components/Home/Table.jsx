import React from 'react'

const Table = (props) => {

    let ids = [
        ['1st','2nd','3rd'],
        ['4th','5th','6th'],
        ['7th','8th','9th']
    ]

    return (
        <table>
            <tbody>
                {
                    ids.map((row, index) =>
                        <tr key={index}>
                            {
                                row.map((col, index) =>
                                    <td key={index} className="td" id={col} onClick={props.update}>
                                    </td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    )

}

export default Table
