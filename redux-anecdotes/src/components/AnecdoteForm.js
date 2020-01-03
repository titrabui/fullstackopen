import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addNew = (event) => {
    event.preventDefault()
    console.log('new anecdote', event.target.anecdote.value)
    props.store.dispatch(
      addAnecdote(event.target.anecdote.value)
    )

    props.store.dispatch(
      setNotification(`Added ${event.target.anecdote.value}`)
    )

    setTimeout(() => {
      props.store.dispatch(
        removeNotification()
      )
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
