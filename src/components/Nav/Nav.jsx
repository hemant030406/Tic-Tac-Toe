import React, { useEffect, useState } from 'react'
import { SiGooglemessages } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { setHidden, setVisible } from '../Reducer/VisibilityReducer';
import { BsDot } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";

const Nav = (props) => {

    const [newNotifications, setNewNotifications] = useState(false)

    const visible = useSelector(state => state.visibilityReducer.visible)

    const msges = useSelector(state => state.reducers.msges)

    const dispatch = useDispatch()

    const handleVisibility = () => {
        !visible ? dispatch(setVisible()) : dispatch(setHidden());
    }

    useEffect(() => {
        (msges.length != 0 && !visible) ? setNewNotifications(true) : setNewNotifications(false);
    }, [msges])

    useEffect(() => {
        if (visible) {
            setNewNotifications(false)
        }
    }, [visible])

    const [ischatHovered, setIsChatHovered] = useState(false);
    const [isdelHovered, setIsDelHovered] = useState(false);
    const [leaveHovered, setILeaveHovered] = useState(false);

    const chatStyle = {
        transition: 'transform 0.4s',
        cursor: 'pointer',
        transform: ischatHovered ? 'scale(1.2)' : 'scale(1)',
    };

    const delStyle = {
        transition: 'transform 0.4s',
        cursor: 'pointer',
        transform: isdelHovered ? 'scale(1.2)' : 'scale(1)',
    };

    const leaveStyle = {
        transition: 'transform 0.4s',
        cursor: 'pointer',
        transform: leaveHovered ? 'scale(1.2)' : 'scale(1)',
    };

    return (
        <nav className="navbar" style={{ padding: 0, backgroundColor: props.color, zIndex: 999 }}>
            <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: '15px' }}>

                <div style={{ backgroundImage: 'url(/images/logo.png)', float: 'left', width: '150px', height: '80px', backgroundSize: 'cover', zIndex: 999 }}></div>
                {
                    props.icons &&
                    <div style={{ float: 'right', display: 'flex', flex: 'row', gap: '1rem', zIndex: 999 }}>

                        <CiCircleRemove size={50} color='#00b1ffdb' style={leaveStyle} onMouseOver={() => setILeaveHovered(true)} onMouseOut={() => setILeaveHovered(false)} onClick={props.leave} />

                        <MdDelete size={50} color='#00b1ffdb' style={delStyle} onMouseOver={() => setIsDelHovered(true)} onMouseOut={() => setIsDelHovered(false)} onClick={props.del} />

                        {
                            newNotifications &&
                            <BsDot size={45} color='white' style={{ color: '#84f900', marginRight: '-4.8rem', marginTop: '-0.3rem', zIndex: 9, cursor: 'pointer' }} onClick={() => handleVisibility()} onMouseOver={() => setIsChatHovered(true)} onMouseOut={() => setIsChatHovered(false)} />
                        }

                        <SiGooglemessages size={50} color='#00b1ffdb' onClick={() => handleVisibility()} onMouseOver={() => setIsChatHovered(true)} onMouseOut={() => setIsChatHovered(false)} style={chatStyle} />

                    </div>
                }
            </div>
        </nav>
    )
}

export default Nav
