import React from 'react'
import './Message.css'

const Message = (props) => {

  let cls;

  const words = props.msg.trim().split(/\s+/);
  const longWordCount = words.filter((word) => word.length > 10).length;

  if (longWordCount > 0) {
    cls = 'break-long-words';
  } else {
    cls = 'keep-all-words';
  }

  return (
    <div className={`msg ${cls}`} style={{ float: props.float, backgroundColor: props.bgcolor }}>
      <div className='username' style={{color:props.usercolor, fontWeight:'500', borderBottom:`1px solid ${props.usercolor}`}}>{props.username}</div>
      <div>
        {props.msg}
      </div>
    </div>
  )
}

export default Message
