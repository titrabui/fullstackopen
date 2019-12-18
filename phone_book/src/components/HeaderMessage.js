import React from 'react';
import './HeaderMessage.css'

const HeaderMessage = ({message}) => {
  if (message === null) return null
  return (
    <div>
      <p className={message.type}>{message.text}</p>
    </div>
  );
};

export default HeaderMessage;
