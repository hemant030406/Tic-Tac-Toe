import React from "react"

function Main(params) {
    let is_circle = false;
    const draw = (e, idx) => {
        if (is_circle) {
            if(document.getElementById(`cross${idx}`)!=null){
                document.getElementById(`cross${idx}`).style.display = 'flex';
                is_circle = false;
            }
        }
        else {
            if(document.getElementById(`circEnc${idx}`)!=null){
                document.getElementById(`circEnc${idx}`).style.display = 'flex';
                is_circle = true;
            }
        }
    }

    return (
        <div className="tb">
            <table>
                <tr>
                    <td onClick={(e) => draw(e, 1)}>
                        <div className="circEnc">
                            <div id='circEnc1' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross1"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                    <td onClick={(e) => draw(e, 2)}>
                        <div className="circEnc">
                            <div id='circEnc2' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross2"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                    <td onClick={(e) => draw(e, 3)}>
                        <div className="circEnc">
                            <div id='circEnc3' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross3"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td onClick={(e) => draw(e, 4)}>
                        <div className="circEnc">
                            <div id='circEnc4' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross4"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                    <td onClick={(e) => draw(e, 5)}>
                        <div className="circEnc">
                            <div id='circEnc5' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross5"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                    <td onClick={(e) => draw(e, 6)}>
                        <div className="circEnc">
                            <div id='circEnc6' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross6"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td onClick={(e) => draw(e, 7)}>
                        <div className="circEnc">
                            <div id='circEnc7' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross7"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                    <td onClick={(e) => draw(e, 8)}>
                        <div className="circEnc">
                            <div id='circEnc8' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross8"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                    <td onClick={(e) => draw(e, 9)}>
                        <div className="circEnc">
                            <div id='circEnc9' style={{ display: 'none' }}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="cross">
                            <div id="cross9"
                                style={{ display: 'none' }}>
                                &#10060;&#xfe0e;
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Main;