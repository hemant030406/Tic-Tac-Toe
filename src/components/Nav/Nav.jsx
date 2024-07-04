import React, { useState } from 'react'
import { SiGooglemessages } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { setHidden, setVisible } from '../Reducer/VisibilityReducer';

const Nav = (props) => {

    const visible = useSelector(state => state.visibilityReducer.visible)

    const dispatch = useDispatch()

    const handleVisibility = () => {
        !visible ? dispatch(setVisible()) : dispatch(setHidden());
    }

    const [ischatHovered, setIsChatHovered] = useState(false);
    const [isdelHovered, setIsDelHovered] = useState(false);

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

    //rgb(100 15 85 / 24%)

    return (
        <nav className="navbar" style={{ padding: 0, backgroundColor: props.color, zIndex: 999 }}>
            <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: '10px' }}>
                <div style={{ backgroundImage: 'url(/images/logo.png)', float: 'left', width: '150px', height: '80px', backgroundSize: 'cover', zIndex: 999 }}></div>
                {
                    props.icons &&
                    <div style={{ float: 'right', display: 'flex', flex: 'row', gap: '2rem', zIndex: 999 }}>
                        <MdDelete size={50} color='#00b1ffdb' style={delStyle} onMouseOver={() => setIsDelHovered(true)} onMouseOut={() => setIsDelHovered(false)} onClick={props.del} />
                        <SiGooglemessages size={50} color='#00b1ffdb' onClick={() => handleVisibility()} onMouseOver={() => setIsChatHovered(true)} onMouseOut={() => setIsChatHovered(false)} style={chatStyle} />
                    </div>}
            </div>
        </nav>
    )
}

export default Nav
