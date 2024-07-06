import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Chat.css'
import Message from './Message'
import { GrSend } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
import { BsPeopleFill } from "react-icons/bs";

const Chat = (props) => {

  const chatVisible = useSelector(state => state.visibilityReducer.visible)

  const [membersVisible,setMembersVisible] = useState(false)

  const msges = useSelector(state => state.reducers.msges)

  const users = useSelector(state => state.reducers.users)

  const { name } = useParams()

  const [msg, setMsg] = useState('')

  const [atBottom, setAtBottom] = useState(false)

  const [memberHovered,setMemberHovered] = useState(false)

  const msghistory = useRef(null);

  const scrolltoBottom = () => {
    if (msghistory.current) {
      msghistory.current.scrollTop = msghistory.current.scrollHeight;
    }
  }

  useEffect(() => {
    if (msghistory.current) {
      msghistory.current.scrollTop = msghistory.current.scrollHeight;
      setAtBottom(true)
    }
  }, [msges]);


  const getScrollPosition = () => {
    if (msghistory.current) {
      const { scrollTop, scrollHeight, clientHeight } = msghistory.current;
      setAtBottom(Math.ceil(scrollHeight - scrollTop) === clientHeight)
    }
  };

  const showMembers = () => {
    if(chatVisible){
      !membersVisible ? setMembersVisible(true) : setMembersVisible(false)
    }
  }

  useEffect(()=>{
    if(!chatVisible){
      setMembersVisible(false)
    }
  },[chatVisible])

  const memberStyle = {
        transition: 'transform 0.6s',
        cursor: 'pointer',
        transform: memberHovered ? 'scale(1.4)' : 'scale(1)',
        margin: '0.4rem',
        zIndex: 1000
    };

  return (
    <div className={`chat-container ${chatVisible ? '' : 'hidden'}`}>
      <div className={`members ${membersVisible && chatVisible ? '' : 'hidden'}`} style={{backgroundColor:'#00000099', position:'absolute', right:0, marginTop:0, paddingTop:'3rem', overflowY:'scroll'}}>
      <ul style={{listStyle:'none',color:'white'}}>
      {
        users.map((username,id) =>
          <li key={id}>{username}</li>
        )
      }
      </ul>
      </div>
      <div className={`chat-head`}>
        <h3 style={{ color: 'white' }}>Chat</h3>
        <BsPeopleFill size={25} color='white' style={memberStyle} onMouseOver={()=>setMemberHovered(true)} onMouseOut={() => setMemberHovered(false)} onClick={()=>showMembers()} />
      </div>
      <div style={{height:'26rem',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
      <div ref={msghistory} className="msghistory" style={{ overflowY: 'scroll' }} onScroll={getScrollPosition}>
        {
          msges.map((obj, id) => {
            if (name == obj.name) {
              return <Message key={id} msg={obj.msg} username={obj.name} float='right' bgcolor='rgb(37 182 173 / 80%)' usercolor={'#535353'} />
            }
            else {
              return <Message key={id} msg={obj.msg} username={obj.name} float='left' bgcolor='rgb(25 24 24 / 70%)' usercolor={'rgb(187 187 187)'} />
            }
          }
          )
        }
      </div>
      </div>
      {
        !atBottom &&
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <div id='uparrow' className='btn btn-outline-light' style={{ marginBottom: '0.5rem', marginRight: '1rem', width: '2rem', display: 'flex', justifyContent: 'center' }} onClick={() => scrolltoBottom()}>
            <FaArrowDown />
          </div>
        </div>
      }
      <div className={`chat-msg`} style={{ display: 'flex', flexDirection: 'row', gap: '0.2rem', margin: '0.2rem' }}>
        <input
          value={msg}
          onChange={
            e => setMsg(e.target.value)
          }
          onKeyDown={
            e => {
              if (e.key === 'Enter') {
                props.send(msg)
                setMsg('')
              }
            }
          }
          id='msg'
          className='chat-input'
          placeholder='Message'>
        </input>
        <div className='btn btn-outline-light' onClick={() => {
          props.send(msg)
          setMsg('')
        }} style={{ borderRadius: '1rem' }}>
          <GrSend size={20} />
        </div>
      </div>
    </div>
  )
}

export default Chat
