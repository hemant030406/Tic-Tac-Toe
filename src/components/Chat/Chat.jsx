import React, { useState, useRef, useEffect } from 'react'
import Nav from '../Nav/Nav'
import { useSelector } from 'react-redux'
import './Chat.css'
import Message from './Message'
import { GrSend } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa6";
import { useParams } from 'react-router-dom'

const Chat = (props) => {

  const visible = useSelector(state => state.visibilityReducer.visible)

  const msges = useSelector(state => state.msg.msges)

  const { name } = useParams()

  const [msg, setMsg] = useState('')

  const [atBottom, setAtBottom] = useState(false)

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
      const { scrollTop,scrollHeight,clientHeight } = msghistory.current;
      setAtBottom(Math.ceil(scrollHeight - scrollTop) === clientHeight)
    }
  };

  return (
    <div className={`chat-container ${visible ? '' : 'hidden'}`}>
      <div ref={msghistory} className="msghistory" style={{ overflowY: 'scroll' }} onScroll={getScrollPosition}>
        {
          msges.map((obj, id) => {
            if (name == obj.name) {
              return <Message key={id} msg={obj.msg} float='right' />
            }
            else {
              return <Message key={id} msg={obj.msg} float='left' />
            }
          }
          )
        }
      </div>
      {
        !atBottom &&
        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
          <div id='uparrow' className='btn btn-outline-light' style={{ marginBottom: '0.5rem', marginRight: '1rem', width: '2rem', display: 'flex', justifyContent: 'center' }} onClick={() => scrolltoBottom()}>
            <FaArrowDown />
          </div>
        </div>
      }
      <div className='chat-msg' style={{ display: 'flex', flexDirection: 'row', gap: '0.2rem', margin: '0.2rem' }}>
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
          placeholder='Message'
          style={
            { paddingLeft: '5px', height: '3rem', width: '100%', backgroundColor: 'transparent', border: '1px solid rgb(220, 220, 220)', borderRadius: '1rem', color: 'white' }
          }>
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
