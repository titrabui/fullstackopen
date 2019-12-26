import React from 'react';
import './HeaderMessage.css'

const HeaderMessage = ({content}) => {
  if (content === null || content === undefined) {
    return null
  } else if (typeof content.message === 'string') {
    return (
      <div>
        <p className={content.type}>{content.message}</p>
      </div>
    );
  }
  return (
    <div className={content.type}>
      { content.message.map(item => <li key={item.key}>{item.message}</li>) }
    </div>
  )
};

export default HeaderMessage;
