import React from 'react'
import { useField } from '../hooks'

const LoginForm = ({ login }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    login(username.props.value, password.props.value)
    username.reset()
    password.reset()
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input {...username.props}/>
        </div>
        <div>
          Password
          <input {...password.props}/>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm