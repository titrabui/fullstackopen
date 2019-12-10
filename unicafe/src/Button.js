import React from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button style={{marginRight: '5px'}} onClick={handleClick}>{text}</button>
  )
}

export default Button;
