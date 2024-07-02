import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import { useSelector } from 'react-redux'
import './Chat.css'
import Message from './Message'

const Chat = (props) => {

  const visible = useSelector(state => state.visibilityReducer.visible)

  const [msges, setMsges] = useState([])
  const [msg, setMsg] = useState('');

  const send = () => {
    if (msg.trim() != '') {
      setMsges(prevmsges => [...prevmsges, msg])
    }
    setMsg('')
  }

  return (
    <>
      <Nav />
      <div className={`chat-container ${visible ? '' : 'hidden'}`}>
        {/* <textarea name="msghistory" id="msghistory" cols="35" rows="25" style={{backgroundColor:'rgb(234 195 183 / 27%)',padding:'1rem'}}></textarea> */}
        <div className="msghistory">
          {/* {
            msges.map((msg) =>
              <Message msg={msg} />
            )
          } */}
              <Message msg='lorkel;ajiopfdk;ljdfiomdfjsafml,dsjnlmdfsnjsfanllllllllllllllllllllllllllllllllllllllllllllllllllll' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input
            value={msg}
            onChange={
              e => setMsg(e.target.value)
            }
            onKeyDown={
              e => {
                if (e.key === 'Enter') { send() }
              }
            }
            id='msg'
            placeholder='Message'
            style={
              { paddingLeft: '5px', height: '3rem', width: '100%' }
            }>
          </input>
          <button
            style={
              { zIndex: 999 }
            }
            onClick={() => send()}>
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default Chat
