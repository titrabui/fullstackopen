import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(
      voteAnecdote(id)
    )

    const targetAnecdote = anecdotes.find(a => a.id === id)
    props.store.dispatch(
      setNotification(`Voted ${targetAnecdote.content}`)
    )

    setTimeout(() => {
      props.store.dispatch(
        removeNotification()
      )
    }, 5000)
  }

  const shownAnecdote = () => {
    return anecdotes.filter(a => a.content.toLowerCase().indexOf(filter) > -1)
  }

  return (
    <div>
      {shownAnecdote().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
