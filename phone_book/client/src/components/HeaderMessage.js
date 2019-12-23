import React from 'react';
import './HeaderMessage.css'

const HeaderMessage = ({error}) => {
  if (error === null || error === undefined) {
    return null
  } else if (typeof error.message === 'string') {
    return (
      <div>
        <p className={error.type}>{error.message}</p>
      </div>
    );
  }
  return (
    <div className={error.type}>
      { error.message.map(item => <li key={item.key}>{item.message}</li>) }
    </div>
  )
};

export default HeaderMessage;
