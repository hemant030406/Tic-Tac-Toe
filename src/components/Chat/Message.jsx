import React from 'react'
import './Message.css'

const Message = (props) => {

  return (
    <div className='msg' style={{float:props.float}}>
        {props.msg}
    </div>
  )
}

export default Message
