import React from 'react'
import './Message.css'

const Message = (props) => {

    const msgStyle = {
    borderRadius: '2rem',
    width: '15rem',
    backgroundColor: 'rgba(25, 24, 24, 0.616)',
    color: 'white',
    padding: '5px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  };

  return (
    <div className='msg'>
        {props.msg}
    </div>
  )
}

export default Message
